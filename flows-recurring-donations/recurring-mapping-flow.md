# Recurring Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Recurring\_Mapping\
**Label:** \[MoveData] Donation: Recurring - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles the mapping and transformation of recurring donation data from external donation platforms into Salesforce Non-Profit Cloud GiftCommitment records with support for comprehensive donor management and name pattern generation.

## Purpose

The flow processes incoming recurring donation data and maps it to appropriate Salesforce Non-Profit Cloud fields while handling:

* Donor relationship management (Contact/Account assignment)
* Anonymous donor configuration and lookup
* Recurring donation status mapping
* Fee calculation and amount adjustments
* Start date conversions to local timezone
* Campaign associations
* Name pattern generation using configurable templates
* Platform key tracking

## Salesforce Fields

This flow interacts with the Non-Profit Cloud GiftCommitment object and its related fields. Below is a comprehensive mapping of all fields utilized:

| Object             | Field API Name     | Field Type         | Purpose in Flow                                |
| ------------------ | ------------------ | ------------------ | ---------------------------------------------- |
| **GiftCommitment** | Id                 | ID                 | Unique record identifier                       |
|                    | DonorId            | Lookup to Account  | Primary donor (Contact or Account)             |
|                    | CampaignId         | Lookup to Campaign | Associated campaign for the recurring donation |
|                    | EffectiveStartDate | Date               | Date the recurring donation starts             |
|                    | Status             | Picklist           | Current status of the recurring donation       |
|                    | ScheduleType       | Picklist           | Type of schedule (set to "Recurring")          |
|                    | Name               | Text               | Generated name for the gift commitment         |
|                    | Platform\_Key\_\_c | Text               | Platform identifier for matching               |
| **Account**        | Id                 | ID                 | Contact/Account identifier                     |
|                    | Name               | Text               | Contact/Account name                           |
|                    | FirstName          | Text               | Contact first name                             |
|                    | LastName           | Text               | Contact last name                              |

## Input Variables

### Core Recurring Donation Data

| Variable       | Type           | Required | Description                                                        |
| -------------- | -------------- | -------- | ------------------------------------------------------------------ |
| `Record`       | GiftCommitment | Yes      | The GiftCommitment record being processed                          |
| `Amount`       | Currency       | No       | Recurring donation amount per installment                          |
| `StartDate`    | DateTime       | No       | Recurring donation start date/time                                 |
| `Status`       | String         | No       | External platform status (active/cancelled/complete/failed/paused) |
| `CurrencyType` | String         | No       | ISO currency code                                                  |

### Platform Integration

| Variable      | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| `PlatformKey` | String | Unique platform identifier for tracking |

### Related Records

| Variable           | Type             | Description                                   |
| ------------------ | ---------------- | --------------------------------------------- |
| `DonorContact`     | Account SObject  | Associated contact for the recurring donation |
| `DonorAccount`     | Account SObject  | Associated account for the recurring donation |
| `DonationCampaign` | Campaign SObject | Associated campaign                           |

### Fee Calculation

| Variable                     | Type     | Description                      |
| ---------------------------- | -------- | -------------------------------- |
| `FeePlatform`                | Currency | Platform processing fee          |
| `FeePlatformPublic`          | Currency | Public platform fee              |
| `Donation_FeePlatform`       | Currency | Associated donation platform fee |
| `Donation_FeePlatformPublic` | Currency | Associated donation public fee   |

### Configuration Variables

| Variable                                   | Type    | Default | Description                                     |
| ------------------------------------------ | ------- | ------- | ----------------------------------------------- |
| `Config_AnonymousContactId`                | String  | -       | ID of anonymous contact for anonymous donations |
| `Config_DonationAmountSubtractFeePlatform` | Boolean | false   | Whether to subtract platform fees from amount   |
| `Config_RecurringSuppressCampaign`         | Boolean | false   | Skip campaign assignment                        |
| `Config_RecurringSuppressStartDate`        | Boolean | false   | Skip start date setting                         |
| `Config_RecurringSuppressName`             | Boolean | false   | Skip name generation                            |
| `Config_RecurringIgnoreStartDateNotEmpty`  | Boolean | false   | Only set start date if empty                    |
| `Config_RecurringNameContact`              | String  | Default | Name pattern template for contact donors        |
| `Config_RecurringNameAccount`              | String  | Default | Name pattern template for account donors        |

## Output Variables

| Variable   | Type                | Description                    |
| ---------- | ------------------- | ------------------------------ |
| `Record`   | GiftCommitment      | Updated gift commitment record |
| `Errors`   | String\[]           | Error collection               |
| `Logs`     | MoveDataLogEntry\[] | Processing logs                |
| `LogsJSON` | String              | JSON representation of logs    |

## Flow Logic

### 1. Donor Assignment

The flow determines the primary donor relationship using this hierarchy:

| Priority | Condition                                                       | Action                       |
| -------- | --------------------------------------------------------------- | ---------------------------- |
| 1        | Existing donor relationship present                             | Preserve existing assignment |
| 2        | Both Contact and Account missing + Anonymous Contact configured | Use anonymous contact        |
| 3        | Contact provided (Account missing)                              | Assign to Contact            |
| 4        | Account provided                                                | Assign to Account            |

#### Anonymous Contact Handling

For anonymous donations:

* **Configuration Check**: Validates `Config_AnonymousContactId` is provided
* **Contact Lookup**: Retrieves anonymous contact record
* **Error Handling**: Sets appropriate errors if configuration missing or contact not found

### 2. Date Processing

Converts start date from DateTime to local date:

* **Component**: Uses `ConvertToLocalDateFlowComponent`
* **Assignment**: Sets `EffectiveStartDate` field
* **Configuration**: Respects `Config_RecurringSuppressStartDate` and `Config_RecurringIgnoreStartDateNotEmpty`

### 3. Status Mapping

Maps external platform statuses to Non-Profit Cloud values:

| External Status | Non-Profit Cloud Status |
| --------------- | ----------------------- |
| cancelled       | Closed                  |
| complete        | Closed                  |
| failed          | Lapsed                  |
| paused          | Paused                  |
| (other/success) | Active                  |

### 4. Amount Calculation

Calculates the final amount using the formula:

```
CalculatedAmount = IF(Config_DonationAmountSubtractFeePlatform, Amount - FeePlatform, Amount)
```

Fee calculation hierarchy:

1. `FeePlatformPublic` (if provided)
2. `Donation_FeePlatformPublic` (if provided)
3. `FeePlatform` (if provided)
4. `Donation_FeePlatform` (if provided)
5. 0 (default)

### 5. Campaign Association

Campaign assignment logic:

* **Skip**: If `Config_RecurringSuppressCampaign` is true
* **Assign**: If `DonationCampaign` is provided and has valid ID
* **Ignore**: Otherwise

### 6. Name Generation

The flow uses configurable name patterns based on donor type:

#### Pattern Selection

* **Contact Donors**: Uses `Config_RecurringNameContact` template
* **Account Donors**: Uses `Config_RecurringNameAccount` template
* **Fallback**: Uses ASCII-encoded default patterns if configuration is empty

#### Name Pattern Processing

* **Component**: Uses `NamePatternParserComponent` for template processing
* **Variables**: Supports Contact, Account, Amount, and date placeholders
* **Fallback**: Uses calculated name formula if pattern parsing fails

#### Default Name Patterns

* **Contact**: `{!Contact.Name} - {!Amount} - {!EffectiveStartDate}`
* **Account**: `{!Account.Name} - {!Amount} - {!EffectiveStartDate}`

### 7. Record Finalization

Final processing steps:

* **Schedule Type**: Sets to "Recurring"
* **Platform Key**: Assigns for future record matching

## Processing Flow

1. **Donor Evaluation**: Determine donor assignment strategy
2. **Anonymous Handling**: Process anonymous contact configuration if needed
3. **Date Conversion**: Convert start date to local timezone
4. **Status Mapping**: Map external status to Non-Profit Cloud values
5. **Campaign Assignment**: Associate with campaign if provided
6. **Name Generation**: Create record name using patterns or fallback
7. **Record Finalization**: Set schedule type and platform key

## Configuration Options

### Donor Management

* **Anonymous Contact**: `Config_AnonymousContactId` specifies fallback contact for anonymous donations

### Field Processing Control

* **Suppress Campaign**: Skip campaign assignment entirely
* **Suppress Start Date**: Skip start date processing
* **Suppress Name**: Skip name generation
* **Conditional Start Date**: Only set if field is currently empty

### Name Pattern Configuration

* **Contact Template**: Configurable pattern for contact-based donors
* **Account Template**: Configurable pattern for account-based donors
* **Default Fallback**: ASCII-encoded patterns used when configuration is empty

### Fee Processing

* **Platform Fee Subtraction**: Optionally subtract fees from donation amount
* **Fee Hierarchy**: Supports multiple fee sources with priority ordering

## Error Handling

### Anonymous Contact Errors

* **Missing Configuration**: Error when anonymous contact ID not configured
* **Contact Not Found**: Error when configured contact cannot be retrieved

### Name Generation Errors

* **Pattern Parsing Failure**: Falls back to calculated name formula
* **Error Logging**: Logs pattern parsing failures for troubleshooting

### Data Validation

* **Null Value Handling**: Graceful handling of missing donor information
* **Existing Record Preservation**: Protects existing donor relationships

## Dependencies

* `movedata__ConvertToLocalDateFlowComponent` (Apex action)
* `movedata__NamePatternParserComponent` (Apex action)
* `movedata__WriteToLogFlowComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
