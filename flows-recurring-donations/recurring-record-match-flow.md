# Recurring Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Recurring\_Duplicate\
**Label:** \[MoveData] Donation: Recurring - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow performs duplicate detection for recurring donation records by using platform keys to identify existing recurring donations in Salesforce, enabling proper record matching and preventing duplicate creation during data imports.

## Purpose

The flow provides duplicate detection capabilities that:

* Uses generated platform keys to look up existing recurring donation records
* Checks the `Platform_Key__c` field on `GiftCommitment` records for matches
* Returns Salesforce Record IDs when duplicates are found
* Supports Non-Profit Cloud GiftCommitment object integration

## Salesforce Fields

This flow interacts with the Non-Profit Cloud GiftCommitment object and its related fields. Below is a mapping of all fields utilized:

| Field API Name     | Field Type | Purpose in Flow                                    |
| ------------------ | ---------- | -------------------------------------------------- |
| Platform\_Key\_\_c | Text       | Stores external platform identifier for matching   |
| Id                 | ID         | Unique record identifier returned when match found |

## Input Variables

| Variable      | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| `PlatformKey` | String | Yes      | Generated platform key for lookup matching |

## Output Variables

| Variable | Type   | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| `Result` | String | Salesforce Record ID of matching recurring donation (if found) |

## Flow Logic

### 1. Platform Key Validation

The flow first validates that a platform key is provided:

* **If PlatformKey is present**: Proceeds to perform lookup on GiftCommitment records
* **If PlatformKey is null**: Flow terminates without performing lookup

### 2. Platform Key Lookup

When validation passes, the flow performs record matching:

* **Object**: Queries `GiftCommitment` records
* **Filter**: `Platform_Key__c` equals provided platform key
* **Result**: Returns ID of matching record if found
* **Null Handling**: Returns null if no matching record exists

## Processing Flow

1. **Platform Key Check**: Verify if platform key is provided
2. **Record Lookup**: Search GiftCommitment records using platform key matching
3. **Result Return**: Provide matched Salesforce Record ID or null if no match

## Configuration Options

The flow uses a simple, standardized approach with no configuration options, ensuring consistent lookup behavior across all platform integrations.

## Error Handling

### Lookup Strategy

The duplicate detection follows a simplified approach:

1. **Platform Key Lookup**: Search existing records using platform key matching (only option)
2. **No Match**: Returns null if no duplicate found

### Data Validation

* **Null Key Handling**: Gracefully handles scenarios where no platform key is provided
* **Record Not Found**: Uses `assignNullValuesIfNoRecordsFound=true` for clean null handling
* **Single Record Return**: Designed to return single matching record ID

## Dependencies

None
