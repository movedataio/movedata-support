# Recurring Record Match Flow

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
* Checks the `Platform_Key__c` field on `npe03__Recurring_Donation__c` records for matches
* Returns Salesforce Record IDs when duplicates are found

## Salesforce Fields

This flow interacts with the NPSP Recurring Donation object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                    | Field Type     | Purpose in Flow                                    |
|----------------------------------|---------------|----------------------------------------------------||
| Platform_Key__c                  | Text (100)    | Stores external platform identifier for matching   |

## Input Variables

| Variable      | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| `PlatformKey` | String | Yes      | Generated platform key for lookup matching |

## Output Variables

| Variable | Type   | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| `Result` | String | Salesforce Record ID of matching recurring donation (if found) |

## Flow Logic

### 1. Platform Key Lookup

The flow immediately performs platform key matching:

* **Direct Lookup**: Queries `npe03__Recurring_Donation__c` records by `Platform_Key__c` field
* **Single Operation**: No conditional logic or validation steps
* **ID Return**: Returns matching Salesforce Record ID if found

## Lookup Strategy

The duplicate detection follows a simplified approach:

1. **Platform Key Lookup**: Search existing records using platform key matching (only option)
2. **No Match**: Returns null if no duplicate found

## Dependencies

None