# Donation Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Donation\_Duplicate\
**Label:** \[MoveData] Donation: Donation - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow performs sophisticated duplicate detection for donation records by using platform keys and recurring donation relationships to identify existing GiftTransaction records in Salesforce. It handles both direct donation matching and recurring donation child transaction matching.

## Purpose

The flow attempts to find an existing GiftTransaction record for a donation to support update operations. It performs a prioritized matching strategy including:

* Direct platform key matching against existing GiftTransaction records
* Recurring donation child transaction matching for ongoing gift commitments
* Date-based matching for pending recurring transactions

## Salesforce Fields

This flow interacts with Non-Profit Cloud objects to match existing records. Below is a mapping of all fields utilized:

| Field API Name                     | Field Type               | Purpose in Flow                                  |
| ---------------------------------- | ------------------------ | ------------------------------------------------ |
| GiftTransaction.Platform\_Key\_\_c | Text                     | Platform key for direct transaction matching     |
| GiftTransaction.Status             | Picklist                 | Transaction status for pending state matching    |
| GiftTransaction.TransactionDueDate | Date                     | Due date for recurring transaction date matching |
| GiftTransaction.GiftCommitmentId   | Lookup to GiftCommitment | Links transaction to parent gift commitment      |
| GiftCommitment.Platform\_Key\_\_c  | Text                     | Platform key for recurring donation matching     |

## Input Variables

### Core Matching Data

| Variable      | Type     | Required | Description                                             |
| ------------- | -------- | -------- | ------------------------------------------------------- |
| `PlatformKey` | String   | No       | Generated platform key for direct transaction lookup    |
| `ParentKey`   | String   | No       | Parent recurring donation identifier for child matching |
| `Platform`    | String   | No       | Platform identifier (used with ParentKey)               |
| `StartDate`   | DateTime | No       | Donation start date for recurring child matching        |

### Configuration Variables

| Variable                       | Type   | Default  | Description                                               |
| ------------------------------ | ------ | -------- | --------------------------------------------------------- |
| `Config_RecurringOffsetDays`   | Number | 5        | Days offset for recurring child transaction date matching |
| `Config_RecurringPendingState` | String | "Unpaid" | Status for pending recurring donation transactions        |

## Output Variables

| Variable | Type   | Description                                                 |
| -------- | ------ | ----------------------------------------------------------- |
| `Result` | String | Salesforce Record ID of matching GiftTransaction (if found) |

## Flow Logic

### 1. Platform Key Direct Matching

The flow first attempts direct platform key matching:

**Condition:** Platform key is provided\
**Action:** Query GiftTransaction records where `Platform_Key__c` equals the provided platform key\
**Result:** Returns matching transaction ID if found

### 2. Recurring Donation Child Matching

If no direct match is found and parent key is provided:

**Conditions:**

* No result from direct matching
* `ParentKey` is provided (indicating this is a recurring donation child)

**Process:**

1. **Generate Recurring Platform Key**: Calls `MoveData_Donation_Recurring_Key` subflow
2. **Find Parent Gift Commitment**: Queries GiftCommitment by platform key
3. **Find Pending Child Transaction**: Searches for existing pending transactions

### 3. Recurring Child Transaction Search

The recurring child transaction search uses sophisticated date and status matching:

**Query Filters:**

* **Gift Commitment**: `GiftCommitmentId = RecurringObjectId`
* **Status**: `Status = Config_RecurringPendingState`
* **Date Range**: `TransactionDueDate` between calculated offset dates
* **Sort Order**: Ascending by `TransactionDueDate` (returns earliest match)

**Date Range Calculation:**

```
OffsetDate1 = DATEVALUE(StartDate) - Config_RecurringOffsetDays
OffsetDate2 = DATEVALUE(StartDate) + Config_RecurringOffsetDays
```

## Error Handling

### Missing Data Scenarios

* **No Platform Key**: Flow skips direct matching, proceeds to recurring logic
* **No Parent Key**: Flow terminates after direct matching attempt
* **No Start Date**: Date offset formulas return null, no date filtering applied
* **No Recurring Parent Found**: Flow logs but continues processing

### Data Quality Validation

The flow handles various data quality issues:

* **Null Values**: Graceful handling of missing optional parameters
* **Invalid Dates**: Formula protection against invalid date values
* **Missing Configuration**: Uses default values where appropriate

## Dependencies

* `MoveData_Donation_Recurring_Key` (Subflow)
* `movedata__WriteToLogFlowComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
