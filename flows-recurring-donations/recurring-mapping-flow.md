# Recurring Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Recurring\_Mapping\
**Label:** \[MoveData] Donation: Recurring - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles the mapping and transformation of recurring donation data from external donation platforms into Salesforce NPSP (Nonprofit Success Pack) Recurring Donation records with support for both legacy and Enhanced Recurring Donations.

## Purpose

The flow processes incoming recurring donation data and maps it to appropriate Salesforce NPSP fields while handling:

* Donor relationship management (Contact/Account assignment)
* Currency validation and conversion
* Recurring donation status mapping
* Frequency and installment period configuration
* Enhanced Recurring Donations (RD2) compatibility
* Date conversions to local timezone
* Campaign associations
* Fee calculation and amount adjustments
* Platform key tracking

## Salesforce Fields

This flow interacts with the NPSP Recurring Donation object and its related fields. Below is a comprehensive mapping of all fields utilized:

| Object                                    | Field API Name                               | Field Type                              | Purpose in Flow                              |
|------------------------------------------|---------------------------------------------|-----------------------------------------|----------------------------------------------|
| **npe03__Recurring_Donation__c**         | Id                                          | ID                                      | Unique record identifier                     |
|                                          | CurrencyIsoCode                             | Picklist (if multi-currency enabled)   | Currency code for the recurring donation     |
|                                          | npe03__Amount__c                            | Currency                                | Recurring donation amount per installment    |
|                                          | npe03__Contact__c                           | Lookup to Contact                       | Primary contact for individual donors        |
|                                          | npe03__Organization__c                      | Lookup to Account                       | Organization for institutional donors        |
|                                          | npe03__Date_Established__c                  | Date                                    | Date the recurring donation was established  |
|                                          | npe03__Installment_Period__c                | Picklist                                | Frequency of recurring payments              |
|                                          | npe03__Next_Payment_Date__c                 | Date                                    | Date of the next expected payment            |
|                                          | npe03__Open_Ended_Status__c                 | Picklist                                | Whether the recurring donation has an end date |
|                                          | npe03__Recurring_Donation_Campaign__c       | Lookup to Campaign                      | Associated campaign for the recurring donation |
|                                          | npsp__Status__c                             | Picklist                                | Current status of the recurring donation     |
|                                          | npsp__StartDate__c                          | Date                                    | Enhanced Recurring Donations start date     |
|                                          | npsp__InstallmentFrequency__c               | Number                                  | Frequency multiplier for Enhanced RD         |
|                                          | npsp__Day_of_Month__c                       | Text                                    | Preferred day of month for payments          |
|                                          | md_npsp_pack__Platform_Key__c               | Text (100)                              | Platform identifier for matching            |
| **npe03__Recurring_Donations_Settings__c** | npsp__IsRecurringDonations2Enabled__c    | Checkbox                                | Indicates if Enhanced Recurring Donations enabled |

## Input Variables

### Core Recurring Donation Data

| Variable          | Type                              | Required | Description                                                        |
| ----------------- | --------------------------------- | -------- | ------------------------------------------------------------------ |
| `Record`          | npe03\_\_Recurring\_Donation\_\_c | Yes      | The Recurring Donation record being processed                      |
| `Amount`          | Currency                          | No       | Recurring donation amount per installment                          |
| `StartDate`       | DateTime                          | No       | Recurring donation start date/time                                 |
| `EndDate`         | DateTime                          | No       | Recurring donation end date/time                                   |
| `NextPaymentDate` | DateTime                          | No       | Next expected payment date                                         |
| `Status`          | String                            | No       | External platform status (active/cancelled/complete/failed/paused) |
| `Frequency`       | String                            | No       | Payment frequency (yearly/quarterly/monthly/weekly/advanced)       |
| `Day`             | Number                            | No       | Day of month for payments                                          |
| `CurrencyType`    | String                            | No       | ISO currency code                                                  |

### Platform Integration

| Variable      | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| `PlatformKey` | String | Unique platform identifier for tracking |
| `Key`         | String | External platform's unique identifier   |

### Related Records

| Variable           | Type             | Description                                   |
| ------------------ | ---------------- | --------------------------------------------- |
| `DonorContact`     | Contact SObject  | Associated contact for the recurring donation |
| `DonorAccount`     | Account SObject  | Associated account for the recurring donation |
| `DonationCampaign` | Campaign SObject | Associated campaign                           |

### Enhanced Recurring Donations (RD2) Support

| Variable            | Type   | Description                                            |
| ------------------- | ------ | ------------------------------------------------------ |
| `FrequencyInterval` | String | Interval type (week/month/year) for advanced frequency |
| `FrequencyUnit`     | Number | Number of intervals between payments                   |

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
| `IsNewRecord`                              | Boolean | -       | Flag indicating if this is a new record         |
| `Config_AnonymousContactId`                | String  | -       | ID of anonymous contact for anonymous donations |
| `Config_DonationAmountSubtractFeePlatform` | Boolean | false   | Whether to subtract platform fees from amount   |
| `Config_RecurringSuppressCampaign`         | Boolean | false   | Skip campaign assignment                        |
| `Config_RecurringSuppressStartDate`        | Boolean | false   | Skip start date setting                         |
| `Config_RecurringSuppressDateEstablished`  | Boolean | false   | Skip date established setting                   |
| `Config_RecurringSuppressDay`              | Boolean | false   | Skip day of month setting                       |
| `Config_RecurringSuppressNextPayment`      | Boolean | false   | Skip next payment date setting                  |
| `Config_RecurringIgnoreStartDateNotEmpty`  | Boolean | false   | Only set start date if empty                    |
| `Config_RecurringIgnoreDateEstNotEmpty`    | Boolean | false   | Only set date established if empty              |
| `Config_RecurringIgnoreDayNotEmpty`        | Boolean | false   | Only set day of month if empty                  |

## Output Variables

| Variable   | Type                              | Description                       |
| ---------- | --------------------------------- | --------------------------------- |
| `Record`   | npe03\_\_Recurring\_Donation\_\_c | Updated recurring donation record |
| `Logs`     | MoveDataLogEntry\[]               | Processing logs                   |
| `LogsJSON` | String                            | JSON representation of logs       |

## Flow Logic

### 1. Record Evaluation

The flow first determines if this is a new or existing record:

* **New Record**: Proceeds directly to donor determination
* **Existing Record**: Checks currency consistency to prevent NPSP conflicts

### 2. Currency Validation

For existing records, the flow validates currency consistency:

* Retrieves existing currency code using `GetValueComponent`
* Compares with incoming currency type
* **Conflict Detected**: Logs error and ends processing (NPSP doesn't support currency changes)
* **No Conflict**: Proceeds with processing

### 3. Donor Assignment

The flow determines the primary donor relationship:

| Priority | Condition                                                       | Action                        |
| -------- | --------------------------------------------------------------- | ----------------------------- |
| 1        | Both Contact and Account missing + Anonymous Contact configured | Use anonymous contact         |
| 2        | Contact provided (Account missing)                              | Assign to Contact             |
| 3        | Account provided                                                | Assign to Account             |
| 4        | Existing relationships present                                  | Preserve existing assignments |

### 4. Currency Setting

Sets the currency code on the record using the `SetCurrencyValueFlowComponent`.

### 5. Date Processing

Converts DateTime inputs to local dates:

* **Start Date**: Converted using `ConvertToLocalDateFlowComponent`
* Used for both `npsp__StartDate__c` and `npe03__Date_Established__c`

### 6. Amount Calculation

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

### 7. Status Mapping

External statuses are mapped to NPSP status values:

| External Status | NPSP Status |
| --------------- | ----------- |
| cancelled       | Closed      |
| complete        | Closed      |
| failed          | Lapsed      |
| paused          | Paused      |
| (other/success) | Active      |

### 8. Campaign Association

Campaign assignment follows this logic:

* **Skip**: If `Config_RecurringSuppressCampaign` is true
* **Assign**: If `DonationCampaign` is provided and has valid ID
* **Ignore**: Otherwise

### 9. Next Payment Date Processing

Sets the next payment date if:

* `NextPaymentDate` is provided
* Date is greater than or equal to current date
* `Config_RecurringSuppressNextPayment` is false
* Either no existing next payment date OR calculated date is newer

### 10. Frequency and Installment Configuration

The flow supports both legacy recurring donations and Enhanced Recurring Donations (RD2):

#### Standard Frequencies

| Frequency | Installment Period                                   | Notes                     |
| --------- | ---------------------------------------------------- | ------------------------- |
| yearly    | Yearly                                               | -                         |
| weekly    | Weekly                                               | -                         |
| monthly   | Monthly                                              | Default fallback          |
| quarterly | Quarterly (legacy) or Monthly with frequency 3 (RD2) | Depends on RD2 enablement |

#### Advanced Frequency (RD2 Only)

When `Frequency` is "advanced", the flow uses `FrequencyInterval` and `FrequencyUnit`:

| FrequencyInterval | Installment Period | InstallmentFrequency |
| ----------------- | ------------------ | -------------------- |
| week              | Weekly             | FrequencyUnit        |
| year              | Yearly             | FrequencyUnit        |
| month (default)   | Monthly            | FrequencyUnit        |

### 11. Day of Month Calculation

Sets `npsp__Day_of_Month__c` using this hierarchy:

1. Day from `NextPaymentDate` (if provided)
2. `Day` input parameter (if provided)
3. Day from `StartDate` (if provided)

### 12. Open Ended Status

Sets `npe03__Open_Ended_Status__c` to "Open" if the field is currently null.

### 13. Platform Key Assignment

Sets `Platform_Key__c` field for future record matching.

## Enhanced Recurring Donations (RD2) Support

The flow includes specific logic for Enhanced Recurring Donations:

### Detection Logic

* Queries `npe03__Recurring_Donations_Settings__c.npsp__IsRecurringDonations2Enabled__c`
* Adjusts frequency mapping based on enablement

### RD2-Specific Mappings

* Uses `npsp__InstallmentFrequency__c` for interval counts
* Maps quarterly to monthly with frequency of 3
* Supports advanced frequency patterns

## Error Handling

### Currency Conflict Handling

* Detects mismatched currencies between donations and recurring donations
* Logs detailed error message
* Ends processing to prevent NPSP conflicts

### Protection Mechanisms

* Respects configuration flags for suppressing field updates
* Handles null values gracefully throughout the flow
* Preserves existing field values when configured

## Dependencies

### Apex Components

* `movedata__GetValueComponent`: Retrieves existing field values
* `movedata__WriteToLogFlowComponent`: Creates log entries
* `SetCurrencyValueFlowComponent`: Sets currency on records
* `ConvertToLocalDateFlowComponent`: Converts DateTime to local Date
