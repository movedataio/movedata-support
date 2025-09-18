# Order Item Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Order\_Item\_Duplicate\
**Label:** \[MoveData] Commerce: Order Item - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow performs duplicate detection for commerce order item records by using platform keys to identify existing opportunity line items in Salesforce. It includes configurable filtering to exclude specific item types such as platform fees.

## Purpose

The flow attempts to find an existing OpportunityLineItem record for an order item to support update operations. It performs a matching strategy including:

* Match against platform key using the `Platform_Key__c` field on OpportunityLineItem records
* Optional exclusion of platform fee items based on configuration settings
* Enable reliable order item deduplication during commerce transaction processing

## Salesforce Fields

This flow interacts with Salesforce objects to match existing records. Below is a mapping of all fields utilized:

| Field API Name                         | Field Type | Purpose in Flow                                |
| -------------------------------------- | ---------- | ---------------------------------------------- |
| OpportunityLineItem.Platform\_Key\_\_c | Text       | Platform key for direct line item matching     |
| OpportunityLineItem.Id                 | ID         | Line item record identifier returned as result |

## Input Variables

### Core Matching Data

| Variable       | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| `PlatformKey`  | String | No       | Generated platform key for direct line item lookup |
| `Catalog_Type` | String | No       | Item type for exclusion filtering                  |

### Configuration Variables

| Variable                         | Type    | Default | Description                                |
| -------------------------------- | ------- | ------- | ------------------------------------------ |
| `Config_OrderExcludeFeePlatform` | Boolean | false   | Exclude platform fee items from processing |

## Output Variables

| Variable   | Type    | Description                                           |
| ---------- | ------- | ----------------------------------------------------- |
| `Result`   | String  | Salesforce Record ID of matching line item (if found) |
| `Continue` | Boolean | Flag indicating whether processing should continue    |

## Flow Logic

### 1. Type-Based Filtering

The flow first evaluates whether to skip processing based on item type:

**Skip Platform Fee Logic:**

* **Condition:** `Config_OrderExcludeFeePlatform = true` AND `Catalog_Type = "feePlatform"`
* **Action:** Sets `Continue = true` and terminates processing
* **Purpose:** Excludes platform fee items when configured

### 2. Platform Key Direct Matching

If processing continues, the flow attempts platform key matching:

**Condition:** Platform key is provided\
**Action:** Query OpportunityLineItem records where `Platform_Key__c` equals the provided platform key\
**Result:** Returns matching line item ID if found

## Error Handling

### Missing Data Scenarios

* **No Platform Key**: Flow terminates without performing lookup
* **Platform Fee Exclusion**: Flow sets Continue flag and terminates when configured to exclude fee items
* **No Match Found**: Result remains null, indicating new record should be created

### Data Quality Validation

The flow handles various data quality issues:

* **Null Values**: Graceful handling of missing platform key parameter
* **Query Failures**: Uses `assignNullValuesIfNoRecordsFound` for robust error handling
* **Configuration Control**: Respects exclusion settings for specific item types

## Dependencies

None
