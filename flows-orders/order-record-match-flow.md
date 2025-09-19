# Order Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Order\_Duplicate\
**Label:** \[MoveData] Commerce: Order - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow performs duplicate detection for commerce order records by using platform keys to identify existing opportunities in Salesforce. It provides a streamlined approach to order matching focused on direct platform key lookup.

## Purpose

The flow attempts to find an existing Opportunity record for a commerce order to support update operations. It performs a simple matching strategy:

* Match against platform key using the `movedata__Platform_Key__c` field on Opportunity records
* Enable reliable order deduplication during commerce transaction processing

## Salesforce Fields

This flow interacts with Salesforce objects to match existing records. Below is a mapping of all fields utilized:

| Field API Name                             | Field Type | Purpose in Flow                                  |
| ------------------------------------------ | ---------- | ------------------------------------------------ |
| Opportunity.movedata\_\_Platform\_Key\_\_c | Text       | Platform key for direct opportunity matching     |
| Opportunity.Id                             | ID         | Opportunity record identifier returned as result |

## Input Variables

### Core Matching Data

| Variable      | Type   | Required | Description                                          |
| ------------- | ------ | -------- | ---------------------------------------------------- |
| `PlatformKey` | String | No       | Generated platform key for direct opportunity lookup |

## Output Variables

| Variable | Type   | Description                                             |
| -------- | ------ | ------------------------------------------------------- |
| `Result` | String | Salesforce Record ID of matching opportunity (if found) |

## Flow Logic

### 1. Platform Key Direct Matching

The flow attempts platform key matching:

**Condition:** Platform key is provided\
**Action:** Query Opportunity records where `movedata__Platform_Key__c` equals the provided platform key\
**Result:** Returns matching opportunity ID if found

## Error Handling

### Missing Data Scenarios

* **No Platform Key**: Flow terminates without performing lookup
* **No Match Found**: Result remains null, indicating new record should be created

### Data Quality Validation

The flow handles various data quality issues:

* **Null Values**: Graceful handling of missing platform key parameter
* **Query Failures**: Uses `assignNullValuesIfNoRecordsFound` for robust error handling

## Dependencies

None
