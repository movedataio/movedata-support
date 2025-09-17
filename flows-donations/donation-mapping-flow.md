# Donation Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Donation\_Mapping\
**Label:** \[MoveData] Donation: Donation - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles the comprehensive mapping and transformation of donation data from external platforms into Salesforce Non-Profit Cloud GiftTransaction records. It processes donations across multiple statuses including successful payments, refunds, failures, pledges, and gift commitment scenarios.

## Purpose

The flow processes incoming donation data and maps it to appropriate Salesforce Non-Profit Cloud fields while handling:

* Multi-status donation processing (success, refund, failed, pledge, offline, static)
* Donor relationship management (Contact/Account assignment including anonymous donations)
* Currency setting and fee calculations with platform fee deduction options
* Gift commitment parent-child relationships
* Gift commitment schedule integration
* Date conversions and transaction date management
* Fee tracking across multiple fee types (platform, gateway, processor)
* Dynamic donation naming with configurable patterns

## Salesforce Fields

The flow interacts with multiple Non-Profit Cloud objects and their fields. Below is a comprehensive mapping of all fields utilized:

| Object                     | Field API Name           | Field Type                       | Purpose in Flow                                   |
| -------------------------- | ------------------------ | -------------------------------- | ------------------------------------------------- |
| **GiftTransaction**        | Id                       | ID                               | Primary record identifier                         |
|                            | Name                     | Text (120)                       | Donation name using dynamic patterns              |
|                            | OriginalAmount           | Currency                         | Primary donation amount                           |
|                            | Status                   | Picklist                         | Transaction status (Paid/Unpaid/Pending/Canceled) |
|                            | TransactionDate          | Date                             | Transaction completion date                       |
|                            | TransactionDueDate       | Date                             | Due date for transaction                          |
|                            | Description              | Long Text Area                   | Message/description from donation                 |
|                            | DonorId                  | Lookup to Account                | Associated donor relationship                     |
|                            | CampaignId               | Lookup to Campaign               | Campaign association                              |
|                            | GiftType                 | Picklist                         | Individual or Organizational                      |
|                            | PaymentMethod            | Picklist                         | Payment method (Credit Card/PayPal)               |
|                            | PaymentIdentifier        | Text                             | External payment identifier                       |
|                            | OutreachSourceCodeId     | Lookup to OutreachSourceCode     | Marketing source code association                 |
|                            | DonorCoverAmount         | Currency                         | Donor-covered fees                                |
|                            | GatewayTransactionFee    | Currency                         | Payment gateway fees                              |
|                            | GatewayReference         | Text                             | Gateway transaction reference                     |
|                            | ProcessorTransactionFee  | Currency                         | Payment processor fees                            |
|                            | GiftCommitmentId         | Lookup to GiftCommitment         | Parent gift commitment link                       |
|                            | GiftCommitmentScheduleId | Lookup to GiftCommitmentSchedule | Gift commitment schedule association              |
|                            | Platform\_Key\_\_c       | Text                             | External platform identifier                      |
| **Account**                | Id                       | ID                               | Donor record identifier                           |
|                            | FirstName                | Text (40)                        | Contact first name for naming                     |
|                            | LastName                 | Text (80)                        | Contact last name for naming                      |
|                            | Name                     | Formula                          | Full name for donation naming                     |
|                            | ParentId                 | Lookup to Account                | Parent account relationship                       |
| **Campaign**               | Id                       | ID                               | Campaign record identifier                        |
| **GiftCommitment**         | Id                       | ID                               | Gift commitment record identifier                 |
|                            | DonorId                  | Lookup to Account                | Gift commitment donor                             |
|                            | CampaignId               | Lookup to Campaign               | Gift commitment campaign                          |
|                            | Platform\_Key\_\_c       | Text                             | Platform identifier for matching                  |
| **GiftCommitmentSchedule** | Id                       | ID                               | Gift commitment schedule identifier               |
|                            | CampaignId               | Lookup to Campaign               | Schedule-specific campaign                        |

## Input Variables

### Core Donation Data

| Variable        | Type                    | Required | Description                                                            |
| --------------- | ----------------------- | -------- | ---------------------------------------------------------------------- |
| `Record`        | GiftTransaction SObject | Yes      | The GiftTransaction record being processed                             |
| `Amount`        | Currency                | No       | Donation amount before fee calculations                                |
| `StartDate`     | DateTime                | No       | Donation/transaction date                                              |
| `Status`        | String                  | No       | External platform status (success/refund/failed/pledge/offline/static) |
| `Message`       | String                  | No       | Donation message/description                                           |
| `ReceiptNumber` | String                  | No       | External receipt or transaction number                                 |
| `Anonymous`     | Boolean                 | No       | Flag indicating anonymous donation                                     |

### Related Records

| Variable            | Type                   | Description                          |
| ------------------- | ---------------------- | ------------------------------------ |
| `DonorContact`      | Account SObject        | Primary contact for the donation     |
| `DonorAccount`      | Account SObject        | Associated account for the donation  |
| `DonationCampaign`  | Campaign SObject       | Associated campaign                  |
| `RecurringDonation` | GiftCommitment SObject | Parent gift commitment if applicable |

### Platform Integration

| Variable      | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| `Platform`    | String | Platform identifier                     |
| `PlatformKey` | String | Unique platform key for record matching |
| `ParentKey`   | String | Parent gift commitment identifier       |

### Fee Structure

| Variable            | Type     | Description                                    |
| ------------------- | -------- | ---------------------------------------------- |
| `FeeCovered`        | Boolean  | Flag indicating donor covered fees             |
| `FeePlatform`       | Currency | Platform-specific processing fee               |
| `FeePlatformPublic` | Currency | Public platform fee (tip/donation to platform) |
| `FeeGateway`        | Currency | Payment gateway processing fee                 |

### Payment Processing

| Variable                 | Type   | Description                     |
| ------------------------ | ------ | ------------------------------- |
| `Processor`              | String | Payment processor identifier    |
| `ProcessorTransactionId` | String | Processor transaction reference |
| `CardInformationType`    | String | Card/payment type information   |

### Marketing Integration

| Variable           | Type   | Description           |
| ------------------ | ------ | --------------------- |
| `Marketing_Source` | String | Marketing source code |

### Configuration Variables

| Variable                                   | Type    | Default | Description                                 |
| ------------------------------------------ | ------- | ------- | ------------------------------------------- |
| `Config_AnonymousContactId`                | String  | -       | ID of anonymous contact record              |
| `Config_DonationAmountSubtractFeePlatform` | Boolean | false   | Subtract platform fees from donation amount |
| `Config_DonationInheritCampaignRecurring`  | Boolean | false   | Inherit campaign from gift commitment       |
| `Config_DonationProcessOffline`            | Boolean | false   | Process offline donations                   |
| `Config_DonationProcessFailed`             | Boolean | false   | Process failed donations                    |
| `Config_DonationSuppressCampaign`          | Boolean | false   | Skip campaign assignment                    |
| `Config_DonationSuppressDescription`       | Boolean | false   | Skip description processing                 |
| `Config_DonationSuppressDonor`             | Boolean | false   | Skip donor assignment                       |
| `Config_DonationSuppressDonorFee`          | Boolean | false   | Skip donor cover amount processing          |
| `Config_DonationSuppressGatewayFee`        | Boolean | false   | Skip gateway fee processing                 |
| `Config_DonationSuppressGatewayTxn`        | String  | false   | Skip gateway transaction processing         |
| `Config_DonationSuppressPaymentId`         | Boolean | false   | Skip payment identifier processing          |
| `Config_DonationSuppressPayMeth`           | Boolean | false   | Skip payment method processing              |
| `Config_DonationSuppressStartDate`         | Boolean | false   | Skip start date processing                  |
| `Config_DonationSuppressType`              | Boolean | false   | Skip gift type processing                   |
| `Config_MarketingSuppressSource`           | Boolean | false   | Skip marketing source processing            |
| `Config_DonationNameRetain`                | Boolean | false   | Retain existing donation name               |
| `Config_DonationNameContact`               | String  | (ASCII) | Naming pattern for contact-based donations  |
| `Config_DonationNameAccount`               | String  | (ASCII) | Naming pattern for account-based donations  |
| `Config_RecurringNameContact`              | String  | -       | Recurring naming pattern for contacts       |
| `Config_RecurringNameAccount`              | String  | -       | Recurring naming pattern for accounts       |
| `Custom_MovedataSkipIfNew`                 | Boolean | false   | Skip processing if new record               |

## Output Variables

| Variable       | Type                    | Description                             |
| -------------- | ----------------------- | --------------------------------------- |
| `Record`       | GiftTransaction SObject | Updated gift transaction record         |
| `Cancel`       | Boolean                 | Flag indicating processing cancellation |
| `Errors`       | String Collection       | Collection of error messages            |
| `FutureStatus` | String                  | Status to be set in post-processing     |
| `LocalKeys`    | String Collection       | Keys for post-processing context        |

## Flow Logic

### 1. Pre-Processing Validation

**Existing Record Dependency Check:**

* Validates that refund transactions have an existing gift transaction to refund against
* Sets error and terminates processing if refund attempted on new record

**Skip Processing Conditions:**

* Checks for `Custom_MovedataSkipIfNew` flag on new records
* Logs skip reason and terminates processing when conditions are met

**Anonymous Donor Resolution:**

* Attempts to resolve existing donor from gift transaction record
* Falls back to gift commitment contact if available
* Uses configured anonymous contact as final fallback

### 2. Date and Time Processing

**Local Date Conversion:**

* Converts StartDate to local date using `ConvertToLocalDateFlowComponent`
* Handles timezone conversions for accurate transaction dating

### 3. Gift Commitment Integration

**Parent Relationship Processing:**

* Generates platform key for parent gift commitment when ParentKey provided
* Looks up existing GiftCommitment record by platform key
* Sets `GiftCommitmentId` relationship on gift transaction

**Gift Commitment Schedule Processing:**

* Retrieves or creates GiftCommitmentSchedule using `GiftCommitmentScheduleComponent`
* Sets campaign from schedule when available
* Handles status changes for existing records with new schedules

### 4. Date Assignment Logic

**Transaction Date Priority:**

1. **Start Date**: Uses converted local date if provided and not suppressed
2. **Current Date**: Uses current date as fallback
3. **Status-Based Changes**: Handles existing record date modifications with status flags

**Unpaid Status Flag Management:**

* Sets UnpaidFlag when changing dates on paid transactions
* Temporarily changes status to allow date modifications
* Restores original status in post-processing

### 5. Currency Processing

**Currency Setting:**

* Sets currency ISO code using `SetValueComponent`
* Ensures consistent currency handling across multi-currency orgs

### 6. Status-Based Processing

The flow handles six distinct donation statuses:

#### Success Status

* **Status**: "Paid"
* **Amount**: Calculated amount (with optional fee deduction)

#### Offline Status

* **Configurable Skip**: Can be skipped via `Config_DonationProcessOffline`
* **Processing**: Same as success when not skipped

#### Failed Status

* **Configurable Skip**: Can be skipped via `Config_DonationProcessFailed`
* **Status**: Cleared (null) when processed

#### Pledge Status

* **Status**: "Pending"

#### Static Status

* **Behavior**: Updates existing record fields only
* **Use Case**: Field updates without status changes

#### Refund Status

* **Behavior**: Processes refund amount
* **Use Case**: Partial or full refund processing

### 7. Payment Method Processing

**Payment Method Detection:**

* **PayPal**: Detected via Processor or CardInformationType fields
* **Credit Card**: Default for other payment types
* **Configurable Suppression**: Via `Config_DonationSuppressPayMeth`

### 8. Gift Type Assignment

**Gift Type Logic:**

* **Organizational**: When DonorAccount is provided
* **Individual**: When only DonorContact is provided
* **Configurable Suppression**: Via `Config_DonationSuppressType`

### 9. Donor Assignment

**Donor Priority Resolution:**

1. **Skip**: If suppressed or existing donor present
2. **Account**: Uses DonorAccount when available
3. **Contact**: Falls back to DonorContact

### 10. Campaign Processing

**Campaign Assignment Logic:**

1. **Skip**: If suppressed via configuration
2. **Recurring Inherit**: Uses gift commitment campaign when configured
3. **Parent Campaign**: Uses provided DonationCampaign
4. **Fallback**: Maintains existing campaign assignment

### 11. Marketing Source Code Integration

**Outreach Source Code Processing:**

* Uses `GetOutreachSourceCodeComponent` to resolve marketing sources
* Validates usage type as "Fundraising"
* Ensures campaign alignment between source code and transaction
* Clears source code if validation fails

### 12. Fee Processing

**Fee Structure Handling:**

* **Donor Cover Amount**: Sets from calculated platform donor fees
* **Gateway Transaction Fee**: Sets from FeeGateway
* **Processor Transaction Fee**: Sets from FeePlatform

**Gateway Reference Processing:**

* Sets GatewayReference from ProcessorTransactionId
* Handles existing reference preservation

### 13. Amount Calculations

**Base Amount Calculation:**

```
AmountCalculated = IF(Config_DonationAmountSubtractFeePlatform, AmountDefaulted - FeePlatformCalculated, AmountDefaulted)
```

**Fee Hierarchy:**

* **Platform Fee**: FeePlatformPublic → FeePlatform (fallback)
* **Amount Modification**: Handles existing record amount changes with status management

### 14. Dynamic Naming

**Naming Pattern Processing:**

* **Contact-Based**: Uses `Config_DonationNameContact` pattern
* **Account-Based**: Uses `Config_DonationNameAccount` pattern
* **Fallback**: ASCII-encoded default patterns
* **Pattern Parser**: Uses `NamePatternParserComponent` with field merge syntax

**Default Patterns:**

* **Contact**: `{!Contact.Name} - {!OriginalAmount} - {!TransactionDate}`
* **Account**: `{!Account.Name} - {!OriginalAmount} - {!TransactionDate}`

### 15. Status Flag Management

**Unpaid Status Flag Processing:**

* Tracks when status needs temporary change to "Unpaid"
* Passes original status to post-processing via FutureStatus
* Enables field modifications on paid transactions

### 16. Final Field Assignment

**Platform Key Assignment:**

* Sets Platform\_Key\_\_c for future matching

**Status Flag Evaluation:**

* Determines if status restoration is needed in post-processing
* Sets appropriate flags and context variables

## Error Handling and Logging

### Comprehensive Error Tracking

**Error Categories:**

* Missing gift transaction for refund processing
* Gift commitment schedule lookup failures
* Currency conflicts
* Invalid donor configurations

**Detailed Logging:**

* Gift commitment processing details
* Skipped donation reasoning
* Fee calculation breakdowns
* Processing decision points
* Status change justifications

## Dependencies

### Apex Components

* **GiftCommitmentScheduleComponent**: Gift commitment schedule management
* **GetOutreachSourceCodeComponent**: Marketing source code resolution
* **movedata\_\_SetValueComponent**: Field value setting
* **movedata\_\_ConvertToLocalDateFlowComponent**: Date timezone conversion
* **movedata\_\_NamePatternParserComponent**: Dynamic name generation
* **movedata\_\_WriteToLogFlowComponent**: Comprehensive logging

### Subflows

* **MoveData\_Donation\_Recurring\_Key**: Gift commitment platform key generation
