# Campaign Record Match Flow

{% hint style="info" %}
This flow is documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Duplicate\
**Label:** \[MoveData] Donation: Campaign - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow performs duplicate detection for campaign records by using platform keys to identify existing campaigns in Salesforce, enabling proper record matching and preventing duplicate creation during data imports.

## Purpose

The flow provides duplicate detection capabilities that:

* Uses generated platform keys to look up existing campaign records
* Checks the `movedata__Platform_Key__c` field for matches
* Returns Salesforce Record IDs when duplicates are found
* Supports both Salesforce Key and Platform Key lookup strategies
* Enables proper upsert operations during campaign imports

## Input Variables

| Variable        | Type   | Required | Description                                |
| --------------- | ------ | -------- | ------------------------------------------ |
| `SalesforceKey` | String | No       | Existing Salesforce Record ID (if known)   |
| `PlatformKey`   | String | Yes      | Generated platform key for lookup matching |

## Output Variables

| Variable | Type   | Description                                          |
| -------- | ------ | ---------------------------------------------------- |
| `Result` | String | Salesforce Record ID of matching campaign (if found) |

## Flow Logic

### 1. Salesforce Key Priority Check

The flow first determines the lookup strategy:

* **If SalesforceKey is provided**: Returns the existing Salesforce Key immediately
* **If SalesforceKey is null**: Proceeds to platform key lookup

### 2. Platform Key Lookup

When no Salesforce key exists, the flow performs platform key matching:

* Uses `movedata__PlatformKeyLookupComponent` Apex action
* Searches Campaign records by `movedata__Platform_Key__c` field
* Returns the matching Salesforce Record ID if found

## Lookup Strategy

The duplicate detection follows this hierarchy:

1. **Direct Salesforce Key**: If provided, use immediately (highest priority)
2. **Platform Key Lookup**: Search existing records using platform key matching
3. **No Match**: Returns null if no duplicate found

## Dependencies

* `movedata__PlatformKeyLookupComponent` (Apex action)
