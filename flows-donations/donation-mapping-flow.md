# Donation Mapping Flow

{% hint style="info" %}
This flow is documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Donation\_Mapping\
**Label:** \[MoveData] Donation: Donation - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles the comprehensive mapping and transformation of donation data from external platforms into Salesforce NPSP-enabled Opportunity records. It processes donations across multiple statuses including successful payments, refunds, failures, pledges, and matching gift scenarios.

## Purpose

The flow processes incoming donation data and maps it to appropriate Salesforce NPSP fields while handling:

* Multi-status donation processing (success, refund, failed, pledge, offline, static)
* Donor relationship management (Contact/Account assignment including anonymous donations)
* Currency setting and fee calculations with platform fee deduction options
* Recurring donation parent-child relationships
* Matching gift processing and employer attribution
* NPSP Payment record creation for refunds
* Date conversions and close date management
* Fee tracking across multiple fee types (platform, gateway, taxes)
* Dynamic donation naming with configurable patterns

## Input Variables

### Core Donation Data

| Variable        | Type                | Required | Description                                                            |
| --------------- | ------------------- | -------- | ---------------------------------------------------------------------- |
| `Record`        | Opportunity SObject | Yes      | The Opportunity record being processed                                 |
| `Amount`        | Currency            | No       | Donation amount before fee calculations                                |
| `StartDate`     | DateTime            | No       | Donation/transaction date                                              |
| `Status`        | String              | No       | External platform status (success/refund/failed/pledge/offline/static) |
| `Message`       | String              | No       | Donation message/description                                           |
| `ReceiptNumber` | String              | No       | External receipt or transaction number                                 |
| `Anonymous`     | Boolean             | No       | Flag indicating anonymous donation                                     |

### Related Records

| Variable            | Type                              | Description                             |
| ------------------- | --------------------------------- | --------------------------------------- |
| `DonorContact`      | Contact SObject                   | Primary contact for the donation        |
| `DonorAccount`      | Account SObject                   | Associated account for the donation     |
| `DonationCampaign`  | Campaign SObject                  | Associated campaign                     |
| `RecurringDonation` | npe03\_\_Recurring\_Donation\_\_c | Parent recurring donation if applicable |

### Platform Integration

| Variable      | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| `Platform`    | String | Platform identifier                     |
| `PlatformKey` | String | Unique platform key for record matching |
| `ParentKey`   | String | Parent recurring donation identifier    |

### Fee Structure

| Variable            | Type     | Description                                    |
| ------------------- | -------- | ---------------------------------------------- |
| `Fee`               | Currency | General fee amount                             |
| `FeePlatform`       | Currency | Platform-specific processing fee               |
| `FeePlatformPublic` | Currency | Public platform fee (tip/donation to platform) |
| `FeeGateway`        | Currency | Payment gateway processing fee                 |
| `Tax`               | Currency | General tax amount                             |
| `TaxPlatform`       | Currency | Tax on platform fees                           |
| `TaxGateway`        | Currency | Tax on gateway fees                            |

### Matching Gifts

| Variable         | Type            | Description                           |
| ---------------- | --------------- | ------------------------------------- |
| `MatchedContact` | Contact SObject | Contact associated with matching gift |
| `MatchedAccount` | Account SObject | Employer account for matching gift    |
| `MatchedKey`     | String          | Platform key for matched donation     |

### Configuration Variables

| Variable                                   | Type    | Default | Description                                 |
| ------------------------------------------ | ------- | ------- | ------------------------------------------- |
| `Config_AnonymousContactId`                | String  | -       | ID of anonymous contact record              |
| `Config_DonationAmountSubtractFeePlatform` | Boolean | false   | Subtract platform fees from donation amount |
| `Config_DonationAmountSuppress`            | Boolean | false   | Skip amount processing entirely             |
| `Config_DonationStageSuppress`             | Boolean | false   | Skip stage assignment                       |
| `Config_DonationSetCloseDate`              | Boolean | true    | Set close date from start date              |
| `Config_DonationSetDescription`            | Boolean | true    | Set description from message                |
| `Config_DonationSetAnonymousAsPrivate`     | Boolean | true    | Mark anonymous donations as private         |
| `Config_IgnoreOfflineDonations`            | Boolean | true    | Skip processing offline donations           |
| `Config_IgnoreFailedDonations`             | Boolean | true    | Skip processing failed donations            |
| `Config_DonationNameContact`               | String  | (ASCII) | Naming pattern for contact-based donations  |
| `Config_DonationNameAccount`               | String  | (ASCII) | Naming pattern for account-based donations  |

## Output Variables

| Variable             | Type                | Description                            |
| -------------------- | ------------------- | -------------------------------------- |
| `Record`             | Opportunity SObject | Updated opportunity record             |
| `MatchedRecordEntry` | Opportunity SObject | Matched opportunity for matching gifts |

## Flow Logic

### 1. Pre-Processing Validation

**Refund Without Original Donation Check:**

* Validates that refund transactions have an existing opportunity to refund against
* Sets error and terminates processing if refund attempted on new record

**Anonymous Donor Resolution:**

* Attempts to resolve existing donor from opportunity record
* Falls back to recurring donation contact if available
* Uses configured anonymous contact as final fallback

### 2. Donor Relationship Management

**Donor Priority Resolution:**

1. **Existing Donor**: Uses contact already on opportunity record
2. **Recurring Donor**: Inherits contact from parent recurring donation
3. **Anonymous Donor**: Uses configured anonymous contact ID
4. **Provided Donors**: Uses DonorContact or DonorAccount from input

**Account ID Resolution:**

* Calls helper subflow to determine appropriate AccountId
* Handles both direct account assignments and contact-derived accounts

### 3. Recurring Donation Integration

**Parent Relationship Processing:**

* Generates platform key for parent recurring donation when ParentKey provided
* Looks up existing recurring donation record by platform key
* Sets `npe03__Recurring_Donation__c` relationship on opportunity

### 4. Matching Gift Processing

**Matching Gift Detection:**

* Processes matched contact or account information
* Sets NPSP matching gift fields:
  * `npsp__Matching_Gift_Employer__c`: Employer name
  * `npsp__Matching_Gift_Account__c`: Employer account
  * `npsp__Matching_Gift_Status__c`: Set to "Received"

**Matched Record Linking:**

* Generates platform key for matched donation
* Links to original donation via `npsp__Matching_Gift__c` field

### 5. Date and Currency Processing

**Close Date Assignment:**

* **Skip**: If `Config_DonationSetCloseDate` is false
* **Start Date**: Converts StartDate to local date if provided
* **Current Date**: Uses current date as fallback

**Currency Setting:**

* Sets currency code using `SetCurrencyValueFlowComponent`
* Ensures consistent currency handling across multi-currency orgs

### 6. Status-Based Processing

The flow handles six distinct donation statuses:

#### Success Status

* **Stage**: "Closed Won"
* **Amount**: Calculated amount (with optional fee deduction)
* **Probability**: 100%

#### Offline Status

* **Configurable Skip**: Can be skipped via `Config_IgnoreOfflineDonations`
* **Processing**: Same as success when not skipped

#### Refund Status

**Validation Process:**

1. Checks refund amount doesn't exceed original donation amount
2. Updates existing payment records with refund amount
3. Creates negative NPSP Payment record for refund
4. Adjusts opportunity amount by subtracting refund

**Full vs Partial Refunds:**

* **Partial**: Maintains "Closed Won" status
* **Full**: Changes to "Closed Lost" status

#### Failed Status

* **Configurable Skip**: Can be skipped via `Config_IgnoreFailedDonations`
* **Stage**: "Declined" when processed
* **Amount**: Set to calculated amount

#### Pledge Status

* **Stage**: "Pledged"
* **Amount**: Set to calculated amount
* **Use Case**: Committed donations not yet collected

#### Static Status

* **Behavior**: Updates existing record amount only
* **Use Case**: Where an amount has changed but there is no supporting detail

### 7. Amount and Fee Calculations

**Base Amount Calculation:**

```
CalculatedAmount = IF(Config_DonationAmountSubtractFeePlatform, Amount - CalculatedFeePlatform, Amount)
```

**Fee Hierarchy:**

* **Platform Fee**: FeePlatformPublic → FeePlatform (fallback)
* **Fee Fields Set**: Fee, FeePlatform, FeeGateway with respective taxes

### 8. NPSP Payment Integration

**Refund Payment Creation:**

* Creates `npe01__OppPayment__c` record for refunds
* Sets negative payment amount
* Links to parent opportunity
* Uses refund transaction date

### 9. Privacy and Anonymity

**Anonymous Donation Handling:**

* Sets `IsPrivate = true` when Anonymous flag is set
* Respects `Config_DonationSetAnonymousAsPrivate` configuration
* Maintains donor privacy in public donation listings

### 10. Dynamic Naming

**Naming Pattern Processing:**

* **Contact-Based**: Uses `Config_DonationNameContact` pattern
* **Account-Based**: Uses `Config_DonationNameAccount` pattern
* **Fallback**: ASCII-encoded default patterns
* **Pattern Parser**: Supports field merge syntax like `{!Contact.Name}`

**Default Patterns:**

* **Contact**: `{!Contact.Name} {!Amount} {!RecordType.Name} {!CloseDate}`
* **Account**: `{!Account.Name} {!Amount} {!RecordType.Name} {!CloseDate}`

### 11. Record Type and Final Assembly

**Record Type Assignment:**

* Retrieves "Donation" record type ID via `GetRecordTypeComponent`
* Sets RecordTypeId on opportunity

**Final Field Assignment:**

* Campaign association
* Receipt number
* Platform key for future matching
* Description from message (if configured)

## Error Handling and Logging

### Comprehensive Error Tracking

**Error Categories:**

* Missing opportunity for refund processing
* Refund amount exceeding original donation
* Currency conflicts
* Invalid donor configurations

**Detailed Logging:**

* Refund calculation details
* Skipped donation reasoning
* Fee calculation breakdowns
* Processing decision points

## Dependencies

### Apex Components

* **SetCurrencyValueFlowComponent**: Currency management
* **ConvertToLocalDateFlowComponent**: Date timezone conversion
* **movedata\_\_GetRecordTypeComponent**: Record type resolution
* **movedata\_\_NamePatternParserComponent**: Dynamic name generation
* **movedata\_\_WriteToLogFlowComponent**: Comprehensive logging

### Subflows

* **MoveData\_Donation\_Donation\_Key**: Platform key generation
* **MoveData\_Donation\_Recurring\_Key**: Recurring donation key generation
* **MoveData\_Donation\_Helper\_Get\_Account\_ID**: Account resolution logic

