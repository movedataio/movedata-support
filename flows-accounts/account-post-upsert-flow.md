# Account Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Account\_Post\
**Label:** \[MoveData] General: Account - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after account records are created or updated, focusing specifically on platform key association with configuration controls and error handling.

## Purpose

The flow performs post-upsert operations that:

* Creates platform key associations linking accounts to external platform identifiers
* Provides configuration controls to disable platform key creation when needed
* Implements error handling for platform key creation failures

## Salesforce Fields

This flow interacts with the Salesforce Account object and its related fields. Below is a mapping of all fields utilized:

| Field API Name | Field Type | Purpose in Flow          |
| -------------- | ---------- | ------------------------ |
| Id             | ID         | Unique record identifier |

## Input Variables

### Core Account Data

| Variable                           | Type            | Required | Description                                         |
| ---------------------------------- | --------------- | -------- | --------------------------------------------------- |
| `Record`                           | Account SObject | Yes      | The Account record that was created/updated         |
| `Platform`                         | String          | Yes      | External platform identifier                        |
| `PlatformKey`                      | String          | Yes      | External platform's account identifier              |
| `Config_AccountDisablePlatformKey` | Boolean         | No       | Configuration flag to disable platform key creation |

## Output Variables

| Variable | Type              | Description                               |
| -------- | ----------------- | ----------------------------------------- |
| `Errors` | String Collection | Error messages from platform key creation |

## Flow Logic

### 1. Platform Key Configuration Check

The flow first evaluates whether platform key creation is enabled:

* **If Config\_AccountDisablePlatformKey is true**: Skips all platform key processing
* **If Config\_AccountDisablePlatformKey is false**: Proceeds to platform key validation

### 2. Platform Key Validation

The flow checks if platform key data is available:

* **If Platform and PlatformKey are provided**: Proceeds to platform key creation
* **If either Platform or PlatformKey is missing**: Flow terminates without creating platform key

### 3. Platform Key Creation

When validation passes, the flow creates the platform key association:

* **Component**: Uses `movedata__PlatformKeyCreateComponent` Apex action
* **Validation**: Includes `ErrorIfDifferentObjectId` to prevent key conflicts
* **Error Handling**: Captures any creation errors in the Errors collection
* **Association**: Links the platform key to the account record

## Processing Flow

1. **Configuration Check**: Evaluate if platform key creation is disabled
2. **Platform Key Validation**: Ensure platform and key data are available
3. **Platform Key Creation**: Create platform key association with error handling

## Dependencies

* `movedata__PlatformKeyCreateComponent` (Apex action)
