# Donation Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Donation\_Duplicate\
**Label:** \[MoveData] Donation: Donation - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow performs sophisticated duplicate detection for donation records by using platform keys and recurring donation relationships to identify existing opportunities in Salesforce. It handles both direct donation matching and recurring donation child opportunity matching.

## Purpose

The flow provides comprehensive duplicate detection capabilities that:

* Uses platform keys to identify existing donation records
* Finds pending opportunities associated with recurring donations within date ranges
* Prevents duplicate creation through intelligent record matching

## Input Variables

### Core Matching Data

| Variable      | Type     | Required | Description                                             |
| ------------- | -------- | -------- | ------------------------------------------------------- |
| `PlatformKey` | String   | No       | Generated platform key for direct opportunity lookup    |
| `ParentKey`   | String   | No       | Parent recurring donation identifier for child matching |
| `Platform`    | String   | No       | Platform identifier (used with ParentKey)               |
| `StartDate`   | DateTime | No       | Donation start date for recurring child matching        |
| `Amount`      | Currency | No       | Donation amount (for context/logging)                   |
| `Status`      | String   | No       | Donation status (for context/logging)                   |

### Configuration Variables

| Variable                               | Type   | Default   | Description                                               |
| -------------------------------------- | ------ | --------- | --------------------------------------------------------- |
| `Config_DonationRecurringOffsetDays`   | Number | 5         | Days offset for recurring child opportunity date matching |
| `Config_DonationRecurringPendingState` | String | "Pledged" | Stage name for pending recurring donation opportunities   |

## Output Variables

| Variable | Type   | Description                                             |
| -------- | ------ | ------------------------------------------------------- |
| `Result` | String | Salesforce Record ID of matching opportunity (if found) |

## Flow Logic

### 1. Platform Key Direct Matching

The flow first attempts direct platform key matching:

**Condition:** Platform key is provided\
**Action:** Query Opportunity records where `movedata__Platform_Key__c` equals the provided platform key\
**Result:** Returns matching opportunity ID if found

### 2. Recurring Donation Child Matching

If no direct match is found and parent key is provided:

**Conditions:**

* No result from direct matching
* `ParentKey` is provided (indicating this is a recurring donation child)

**Process:**

1. **Generate Recurring Platform Key**: Calls `MoveData_Donation_Recurring_Key` subflow
2. **Find Parent Recurring Donation**: Queries recurring donation by platform key
3. **Find Pending Child Opportunity**: Searches for existing pending opportunities

### 3. Recurring Child Opportunity Search

The recurring child opportunity search uses sophisticated date and status matching:

**Query Filters:**

* **Recurring Donation**: `npe03__Recurring_Donation__c = RecurringObjectId`
* **Stage**: `StageName = Config_DonationRecurringPendingState`
* **Date Range**: `CloseDate` between calculated offset dates
* **Sort Order**: Ascending by `CloseDate` (returns earliest match)

**Date Range Calculation:**

```
OffsetDate1 = DATEVALUE(StartDate) - Config_DonationRecurringOffsetDays
OffsetDate2 = DATEVALUE(StartDate) + Config_DonationRecurringOffsetDays
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
