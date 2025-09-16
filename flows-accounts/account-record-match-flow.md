# Account Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Account\_Duplicate\
**Label:** \[MoveData] General: Account - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 49.0\
**Status:** Active

This flow performs duplicate detection for account records by using platform keys to identify existing accounts in Salesforce, enabling proper record matching and preventing duplicate creation.

If there is no match, MoveData will execute the Salesforce Duplicate Detection rules after the flow (if configured).

## Purpose

The flow provides duplicate detection capabilities that:

* Uses generated platform keys to look up existing account records
* Checks the platform key lookup system for matches
* Returns Salesforce Record IDs when existing records are found
* Supports both Salesforce Key and Platform Key lookup strategies
* Implements MoveData break functionality for advanced flow control

## Salesforce Fields

This flow interacts with the Account Platform Key system and its related fields. Below is a mapping of all fields utilized:

| Field API Name      | Field Type | Purpose in Flow                                  |
| ------------------- | ---------- | ------------------------------------------------ |
| Platform Key System | Text       | Stores external platform identifier for matching |

## Input Variables

| Variable               | Type    | Required | Description                                |
| ---------------------- | ------- | -------- | ------------------------------------------ |
| `SalesforceKey`        | String  | No       | Existing Salesforce Record ID (if known)   |
| `PlatformKey`          | String  | Yes      | Generated platform key for lookup matching |
| `Custom_MovedataBreak` | Boolean | No       | MoveData break control flag                |

## Output Variables

| Variable     | Type              | Description                                         |
| ------------ | ----------------- | --------------------------------------------------- |
| `Result`     | String            | Salesforce Record ID of matching account (if found) |
| `Break`      | Boolean           | Break flag for flow control                         |
| `RecordList` | String Collection | List of matching record IDs                         |

## Flow Logic

### 1. Salesforce Key Priority Check

The flow first determines the lookup strategy:

* **If SalesforceKey is provided**: Evaluates break conditions and returns the existing Salesforce Key
* **If SalesforceKey is null**: Proceeds to platform key lookup

### 2. Break Evaluation

When a Salesforce Key exists, the flow evaluates break conditions:

* **If Custom\_MovedataBreak is true**: Sets break flag and adds record to result list
* **If Custom\_MovedataBreak is false**: Proceeds without break handling

### 3. Platform Key Validation

The flow checks if a platform key is available:

* **If PlatformKey is provided**: Proceeds to platform key lookup
* **If PlatformKey is null**: Flow terminates without returning a match

### 4. Platform Key Lookup

When a platform key exists, the flow performs platform key matching:

* Uses `movedata__PlatformKeyLookupComponent` Apex action
* Searches Account records using the platform key lookup system
* Returns the matching Salesforce Record ID if found

## Lookup Strategy

The duplicate detection follows this hierarchy:

1. **Direct Salesforce Key**: If provided, use immediately (highest priority)
2. **Break Evaluation**: Process MoveData break functionality if applicable
3. **Platform Key Lookup**: Search existing records using platform key matching
4. **No Match**: Returns null if no duplicate found
5. **Salesforce Duplicate Rules**: MoveData will execute the Salesforce Duplicate Detection rules after the flow (if configured)

## Dependencies

* `movedata__PlatformKeyLookupComponent` (Apex action)
