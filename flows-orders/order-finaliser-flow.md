# Order Finaliser Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Order\_Final\
**Label:** \[MoveData] Commerce: Order - Finaliser\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow handles comprehensive post-processing operations after commerce order records are created or updated, including stage finalization, dynamic order naming, amount calculation with fee deduction, and campaign member creation for commerce transactions.

## Purpose

The flow performs post-upsert operations that:

* Finalize opportunity stage assignment from default to "Closed Won" for completed orders
* Generate dynamic order names using configurable patterns for contacts and accounts
* Handle temporary amount assignment for name parsing when amounts are not set
* Create campaign member records for customers with commerce-specific or ticket-based status management
* Support action-based campaign member labeling (ticket vs general commerce)
* Clear temporary fields after processing to maintain data integrity

## Salesforce Fields

This flow interacts with the Salesforce Opportunity object and its related fields. Below is a mapping of all fields utilized:

| Field API Name | Field Type | Purpose in Flow                   |
| -------------- | ---------- | --------------------------------- |
| Id             | ID         | Unique record identifier          |
| Name           | Text (120) | Order name using dynamic patterns |
| StageName      | Picklist   | Order stage finalization          |
| Amount         | Currency   | Order total with fee calculations |

## Input Variables

### Core Order Data

| Variable      | Type                | Required | Description                               |
| ------------- | ------------------- | -------- | ----------------------------------------- |
| `Record`      | Opportunity SObject | Yes      | The Opportunity record that was processed |
| `OrderName`   | String              | No       | Order name from external platform         |
| `Action`      | String              | No       | Order action type (e.g., "ticket")        |
| `Code`        | String              | No       | Order code identifier                     |
| `Description` | String              | No       | Order description                         |
| `CreatedAt`   | DateTime            | No       | Order creation timestamp                  |
| `PlatformKey` | String              | No       | Platform key for tracking                 |

### Related Records

| Variable            | Type             | Description                      |
| ------------------- | ---------------- | -------------------------------- |
| `PrimaryContact`    | Contact SObject  | Primary contact for the order    |
| `PrimaryAccount`    | Account SObject  | Associated account for the order |
| `PrimaryContactAlt` | Account SObject  | Person Account alternative       |
| `OrderCampaign`     | Campaign SObject | Associated campaign              |

### Fee Structure

| Variable      | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `Total`       | Currency | Order total amount      |
| `FeePlatform` | Currency | Platform processing fee |

### Campaign Member Configuration

| Variable                                      | Type    | Default           | Description                              |
| --------------------------------------------- | ------- | ----------------- | ---------------------------------------- |
| `Config_CreateCampaignMembers`                | Boolean | true              | Enable campaign member creation          |
| `Config_CampaignMemberDeleteExistingStatuses` | Boolean | false             | Remove existing campaign member statuses |
| `Config_CampaignMemberLabelTeamLeader`        | String  | "Team Leader"     | Label for team leader status             |
| `Config_CampaignMemberLabelFundraiser`        | String  | "Fundraiser"      | Label for fundraiser status              |
| `Config_CampaignMemberLabelRecurringDonor`    | String  | "Recurring Donor" | Label for recurring donor status         |
| `Config_CampaignMemberLabelCommerce`          | String  | "Sale"            | Label for commerce status                |
| `Config_CampaignMemberLabelTicket`            | String  | "Ticket Holder"   | Label for ticket holder status           |
| `Config_CampaignMemberLabelProspect`          | String  | "Prospect"        | Label for prospect status                |

### Naming Configuration

| Variable                         | Type    | Default       | Description                             |
| -------------------------------- | ------- | ------------- | --------------------------------------- |
| `Config_OrderStageNameDefault`   | String  | "Prospecting" | Default stage name for orders           |
| `Config_OrderExcludeFeePlatform` | Boolean | false         | Subtract platform fees from order total |
| `Config_OrderNameContact`        | String  | (ASCII)       | Naming pattern for contact-based orders |
| `Config_OrderNameAccount`        | String  | (ASCII)       | Naming pattern for account-based orders |

### Campaign Member Sort Orders

| Variable                                 | Type   | Default | Description                    |
| ---------------------------------------- | ------ | ------- | ------------------------------ |
| `Config_CampaignMemberSortOrderCommerce` | Number | 9011.0  | Sort order for commerce status |
| `Config_CampaignMemberSortOrderTicket`   | Number | 9012.0  | Sort order for ticket status   |

## Output Variables

| Variable   | Type                | Description                            |
| ---------- | ------------------- | -------------------------------------- |
| `Record`   | Opportunity SObject | Updated opportunity record             |
| `Errors`   | String\[]           | Collection of error messages           |
| `Logs`     | MoveDataLogEntry\[] | Processing logs from all operations    |
| `LogsJSON` | String              | JSON representation of processing logs |

## Flow Logic

### 1. Stage Finalization

**Default Stage Detection:**

* Checks if current StageName equals `Config_OrderStageNameDefault` ("Prospecting")
* Updates stage to "Closed Won" for completed commerce orders
* Preserves existing stages that have been explicitly set

### 2. Dynamic Order Naming

**Name Processing Decision:**

* Proceeds with naming only if Name is null or equals "Temp Value"
* Logs order record details using `WriteObjectToLogComponent` for audit purposes

**Customer Type Resolution:**

* **Contact-Based Naming**: When PrimaryContact or PrimaryContactAlt exists
* **Account-Based Naming**: When neither contact option exists, defaults to account

**Naming Pattern Selection:**

For Contact-Based Orders:

* Uses `Config_OrderNameContact` if configured and not blank
* Falls back to default contact pattern (ASCII encoded): `{!Contact.Name} {!CloseDate} {!Amount} {!RecordType.Name}`

For Account-Based Orders:

* Uses `Config_OrderNameAccount` if configured and not blank
* Falls back to default account pattern (ASCII encoded): `{!Account.Name} {!CloseDate} {!Amount} {!RecordType.Name}`

### 3. Amount Processing for Naming

**Temporary Amount Assignment:**

When Amount is not set on the record:

* Calculates temporary amount using `CalculatedTotal` formula
* Sets amount temporarily for name parsing
* Flags `TempSetAmount` for cleanup after name generation

**Amount Calculation Formulas:**

```
DefaultedTotal = IF(ISBLANK(Total), 0, Total)
DefaultedFeePlatform = IF(ISBLANK(FeePlatform), 0, FeePlatform)
CalculatedTotal = IF(Config_OrderExcludeFeePlatform==TRUE, DefaultedTotal - DefaultedFeePlatform, DefaultedTotal)
```

**Field Cleanup:**

* Removes Amount field from record after name parsing when `TempSetAmount` is true
* Uses `ClearFieldFlowComponent` to maintain data integrity
* Prevents unintended amount assignment

### 4. Order Name Generation

**Pattern Parsing:**

Uses `NamePatternParserComponent` with different approaches:

**Standard Contact/Account Processing:**

* Supports Contact and Account reference merging
* Uses PrimaryContact and PrimaryAccount for standard relationships

**Person Account Processing:**

* Uses PrimaryContactAlt for Person Account scenarios
* Maps Person Account as both Contact and Account references

**Error Handling:**

* Provides fault connectors for pattern parsing failures
* Falls back to "Temp Value" when name generation fails
* Uses `Missing_Name` decision for recovery scenarios

### 5. Campaign Member Management

**Prerequisites Validation:**

* Campaign exists with valid ID
* Contact exists with valid ID
* Campaign member creation is enabled (`Config_CreateCampaignMembers = true`)

**Action-Based Status Assignment:**

* **Ticket Action**:
  * Sets status to `Config_CampaignMemberLabelTicket` ("Ticket Holder")
  * Uses `Config_CampaignMemberSortOrderTicket` (9012.0)
* **Default Commerce**:
  * Uses `Config_CampaignMemberLabelCommerce` ("Sale")
  * Uses `Config_CampaignMemberSortOrderCommerce` (9011.0)

**Campaign Member Status Hierarchy:**

The flow establishes a prioritized hierarchy:

1. **Team Leader** (highest priority)
2. **Fundraiser**
3. **Recurring Donor**
4. **Commerce/Ticket Holder** (target status for this flow)
5. **Prospect** (lowest priority)

## Formulas

### Amount Calculation Formulas

**DefaultedTotal Formula:**

```
IF(ISBLANK(Total), 0, Total)
```

Provides zero default for null total values.

**DefaultedFeePlatform Formula:**

```
IF(ISBLANK(FeePlatform), 0, FeePlatform)
```

Provides zero default for null platform fee values.

**CalculatedTotal Formula:**

```
IF(Config_OrderExcludeFeePlatform==TRUE, DefaultedTotal - DefaultedFeePlatform, DefaultedTotal)
```

Conditionally subtracts platform fees from order total based on configuration.

## Constants

### Naming Pattern Constants

**OrderNameContact:** ASCII-encoded string representing: `{!Contact.Name} {!CloseDate} {!Amount} {!RecordType.Name}`

**OrderNameAccount:** ASCII-encoded string representing: `{!Account.Name} {!CloseDate} {!Amount} {!RecordType.Name}`

**TEMP\_NAME:** Constant value "Temp Value" used as placeholder during name generation.

## Error Handling

### Name Processing Protection

* Uses fault connectors for name parsing failures
* Falls back to "Temp Value" when name generation fails
* Maintains processing continuity despite naming errors
* Handles both standard and Person Account naming scenarios

### Amount Field Management

* Tracks temporary amount assignment with `TempSetAmount` boolean flag
* Ensures proper cleanup of temporary fields using field collection
* Prevents data corruption from incomplete processing

### Campaign Member Validation

* Validates all required relationships before processing
* Handles missing campaign or contact scenarios gracefully
* Provides detailed logging for troubleshooting

## Dependencies

### Apex Components

* **movedata\_\_ClearFieldFlowComponent**: Field cleanup for temporary values
* **movedata\_\_WriteObjectToLogComponent**: Order record logging
* **movedata\_\_NamePatternParserComponent**: Dynamic name generation with reference support