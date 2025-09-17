# Recurring Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Recurring\_Post\
**Label:** \[MoveData] Donation: Recurring - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after recurring donation records are created or updated in Non-Profit Cloud, focusing on Gift Commitment Schedule management, status synchronization, and gift designation processing.

## Purpose

The flow performs post-upsert operations that:

* Create and manage Gift Commitment Schedules for recurring donations
* Synchronize Gift Commitment status with external platform status
* Process gift designations from campaigns or overrides
* Handle payment method configuration and frequency settings
* Manage outreach source code associations

## Salesforce Fields

This flow interacts with the Non-Profit Cloud Gift Commitment object and its related fields. Below is a mapping of all fields utilized:

| Field API Name | Field Type | Purpose in Flow               |
| -------------- | ---------- | ----------------------------- |
| Id             | ID         | Unique record identifier      |
| Status         | Picklist   | Gift Commitment status field  |
| CampaignId     | Lookup     | Associated campaign reference |

## Input Variables

### Core Recurring Donation Data

| Variable           | Type             | Required | Description                                    |
| ------------------ | ---------------- | -------- | ---------------------------------------------- |
| `Record`           | GiftCommitment   | Yes      | The Gift Commitment record that was processed  |
| `DonationCampaign` | Campaign SObject | No       | Associated campaign for the recurring donation |
| `Amount`           | Currency         | No       | Transaction amount for the commitment          |
| `Status`           | String           | No       | External platform status                       |

### Date and Schedule Configuration

| Variable             | Type     | Description                  |
| -------------------- | -------- | ---------------------------- |
| `StartDate`          | DateTime | Schedule start date          |
| `NextPaymentDate`    | DateTime | Next scheduled payment date  |
| `ModifiedAt`         | DateTime | Last modification timestamp  |
| `Donation_StartDate` | DateTime | Original donation start date |

### Frequency and Payment Settings

| Variable                       | Type   | Description                              |
| ------------------------------ | ------ | ---------------------------------------- |
| `Frequency`                    | String | Payment frequency (daily/weekly/monthly) |
| `FrequencyUnit`                | Number | Frequency multiplier                     |
| `FrequencyInterval`            | String | Frequency interval type                  |
| `Donation_CardInformationType` | String | Payment method type (credit card/paypal) |

### Fee Processing

| Variable                     | Type     | Description                    |
| ---------------------------- | -------- | ------------------------------ |
| `FeePlatform`                | Currency | Platform processing fee        |
| `FeePlatformPublic`          | Currency | Public platform fee            |
| `Donation_FeePlatform`       | Currency | Donation-specific platform fee |
| `Donation_FeePlatformPublic` | Currency | Donation-specific public fee   |

### Marketing and Source Tracking

| Variable                    | Type   | Description                           |
| --------------------------- | ------ | ------------------------------------- |
| `Donation_Marketing_Source` | String | Marketing source code for attribution |

### Configuration Variables

| Variable                                   | Type    | Default | Description                          |
| ------------------------------------------ | ------- | ------- | ------------------------------------ |
| `Config_DonationAmountSubtractFeePlatform` | Boolean | false   | Subtract platform fees from amount   |
| `Config_DonationGiftDesignationsCache`     | Boolean | true    | Enable gift designation caching      |
| `Config_DonationSuppressGiftDesignations`  | Boolean | false   | Suppress gift designation processing |
| `Config_MarketingSuppressSource`           | Boolean | false   | Suppress marketing source processing |
| `Config_RecurringCommitmentContinueOnErr`  | Boolean | true    | Continue processing on errors        |

### Gift Designation Override

| Variable                     | Type   | Description                  |
| ---------------------------- | ------ | ---------------------------- |
| `Override_GiftDesignationId` | String | Override gift designation ID |

## Flow Logic

### 1. Status Determination and Schedule Type Configuration

The flow first determines the appropriate Gift Commitment Schedule status and type based on the input status:

**Status Mapping:**

```
IF Status = "complete" OR "cancelled" THEN
  GCS_Status = "Closed"
  GCS_Type = "CreateTransactions"
ELSE IF Status = "failed" THEN
  GCS_Status = "Lapsed" 
  GCS_Type = "CreateTransactions"
ELSE IF Status = "paused" THEN
  GCS_Status = "Paused"
  GCS_Type = "PauseTransactions"
ELSE
  GCS_Status = "Active"
  GCS_Type = "CreateTransactions"
```

### 2. Start Date Resolution

The flow prioritizes start dates in the following order:

1. **Donation Start Date** - If `Donation_StartDate` is provided
2. **Modified Date** - If `ModifiedAt` is provided
3. **Start Date** - If `StartDate` is provided
4. **Default** - Uses current processing date

All dates are converted to local time using the `ConvertToLocalDateFlowComponent`.

### 3. Payment Schedule Configuration

**Day Calculation:**

```
Day = DAY(StartDate)
IF Day > 30 THEN Day = "30"
```

**Next Payment Date Processing:** If `NextPaymentDate` is provided:

* Convert to local time
* Extract day of month for scheduling

### 4. Transaction Period and Frequency Mapping

**Standard Frequencies:**

* **Daily**: `GCS_TransactionPeriod = "Daily"`, `GCS_TransactionInterval = 1`
* **Weekly**: `GCS_TransactionPeriod = "Weekly"`, `GCS_TransactionInterval = 1`
* **Monthly**: `GCS_TransactionPeriod = "Monthly"`, `GCS_TransactionInterval = 1`
* **Quarterly**: `GCS_TransactionPeriod = "Monthly"`, `GCS_TransactionInterval = 3`
* **Yearly**: `GCS_TransactionPeriod = "Yearly"`, `GCS_TransactionInterval = 1`

**Dynamic Frequencies:** When `FrequencyUnit` and `FrequencyInterval` are provided:

* Map `FrequencyInterval` to appropriate period (day/week/month/year)
* Set `GCS_TransactionInterval` to `FrequencyUnit` value
* Default to "Custom" period if mapping fails

### 5. Payment Method Determination

```
IF Donation_CardInformationType = "paypal" THEN
  GCS_PaymentMethod = "PayPal"
ELSE
  GCS_PaymentMethod = "Credit Card"
```

### 6. Amount Calculation with Fee Processing

```
AmountCalculated = IF Config_DonationAmountSubtractFeePlatform = true
  THEN Amount - FeePlatformCalculated
  ELSE Amount

FeePlatformCalculated = COALESCE(FeePlatformPublic, FeePlatform, Donation_FeePlatformPublic, Donation_FeePlatform, 0)
```

### 7. Campaign and Source Code Processing

**Campaign Association:** If `Record.CampaignId` is populated, set `GCS_CampaignId` for the schedule.

**Outreach Source Code Resolution:**

* Skip if `Config_MarketingSuppressSource = true`
* Use `GetOutreachSourceCodeComponent` to match `Donation_Marketing_Source`
* Set `GCS_OutreachSourceCode` if match found

### 8. Gift Commitment Schedule Management

**Schedule Creation:**

```
GiftCommitmentScheduleComponent Parameters:
- Mode: "Create"
- GiftCommitmentId: Record.Id
- All configured schedule parameters
```

**Result Processing:**

* Track original schedule ID if different from new schedule
* Add both original and new schedule IDs to result list
* Handle success/failure scenarios

### 9. Gift Commitment Status Synchronization

The flow updates the Gift Commitment record status to match the schedule status:

**Status Updates:**

```
IF Status = "closed/complete/cancelled" AND Record.Status ≠ "Closed" THEN
  Record.Status = "Closed"
ELSE IF Status = "failed" AND Record.Status ≠ "Lapsed" THEN  
  Record.Status = "Lapsed"
ELSE IF Status = "paused" AND Record.Status ≠ "Paused" THEN
  Record.Status = "Paused"  
ELSE IF Status = "success/active" AND Record.Status ≠ "Active" THEN
  Record.Status = "Active"
```

### 10. Gift Designation Processing

**Designation Source Priority:**

1. **Override**: Use `Override_GiftDesignationId` if provided
2. **Campaign**: Copy designations from `DonationCampaign` if available
3. **Default**: Apply default gift designations

**Processing Control:** Skip gift designation processing if `Config_DonationSuppressGiftDesignations = true`.

## Error Handling

### Validation Failures

* **Schedule Creation Failures**: Captured in `ScheduleErrorMessage` and added to `Errors` collection
* **Status Update Failures**: Logged separately with failure context
* **Apex Component Failures**: Fault connectors capture and process errors

### Continuation Logic

When `Config_RecurringCommitmentContinueOnErr = true`, the flow continues processing even after encountering errors, collecting all error messages for final reporting.

## Dependencies

* `ConvertToLocalDateFlowComponent` (Date/time conversion)
* `GetOutreachSourceCodeComponent` (Source code matching)
* `GiftCommitmentScheduleComponent` (Schedule management)
* `CopyGiftDesignationsComponent` (Gift designation processing)
* `WriteToLogFlowComponent` (Logging operations)
