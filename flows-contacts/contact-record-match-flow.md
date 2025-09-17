# Contact Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Contact\_Duplicate\
**Label:** \[MoveData] Commerce: Contact - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow performs duplicate detection for contact records by using platform keys to identify existing contacts in Salesforce, enabling proper record matching and preventing duplicate creation during commerce processing.

If there is no match, MoveData will execute the Salesforce Duplicate Detection rules after the flow (if configured).

## Purpose

The flow provides duplicate detection capabilities that:

* Uses generated platform keys to look up existing contact records
* Checks the platform key lookup system for matches during commerce transactions
* Returns Salesforce Record IDs when duplicates are found
* Supports both Salesforce Key and Platform Key lookup strategies

## Salesforce Fields

This flow interacts with the Contact Platform Key system and its related fields. Below is a mapping of all fields utilized:

| Field API Name      | Field Type | Purpose in Flow                                  |
| ------------------- | ---------- | ------------------------------------------------ |
| Platform Key System | Text       | Stores external platform identifier for matching |

## Input Variables

| Variable                | Type   | Required | Description                                |
| ----------------------- | ------ | -------- | ------------------------------------------ |
| `SalesforceKey`         | String | No       | Existing Salesforce Record ID (if known)   |
| `PlatformKey`           | String | Yes      | Generated platform key for lookup matching |
| `Config_MoveDataEngine` | Number | No       | Engine version identifier                  |

## Output Variables

| Variable | Type   | Description                                         |
| -------- | ------ | --------------------------------------------------- |
| `Result` | String | Salesforce Record ID of matching contact (if found) |

## Flow Logic

### 1. Salesforce Key Priority Check

The flow first determines the lookup strategy:

* **If SalesforceKey is provided**: Returns the existing Salesforce Key immediately
* **If SalesforceKey is null**: Proceeds to platform key lookup

### 2. Platform Key Validation

The flow checks if a platform key is available:

* **If PlatformKey is provided**: Proceeds to platform key lookup
* **If PlatformKey is null**: Flow terminates without returning a match

### 3. Platform Key Lookup

When a platform key exists, the flow performs platform key matching:

* Uses `movedata__PlatformKeyLookupComponent` Apex action
* Searches Contact records using the platform key lookup system
* Returns the matching Salesforce Record ID if found

## Lookup Strategy

The duplicate detection follows this hierarchy:

1. **Direct Salesforce Key**: If provided, use immediately (highest priority)
2. **Platform Key Lookup**: Search existing records using platform key matching
3. **No Match**: Returns null if no duplicate found
4. **Salesforce Duplicate Rules**: MoveData will execute the Salesforce Duplicate Detection rules after the flow (if configured)

## Dependencies

* `movedata__PlatformKeyLookupComponent` (Apex action)
