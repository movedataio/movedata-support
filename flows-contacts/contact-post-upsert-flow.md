# Contact Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Contact\_Post\
**Label:** \[MoveData] Commerce: Contact - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow handles post-processing operations after contact records are created or updated, focusing specifically on platform key association for commerce transactions. The flow provides a streamlined approach to linking contacts with external platform identifiers.

## Purpose

The flow performs post-upsert operations that:

* Creates platform key associations linking contacts to external platform identifiers
* Provides configurable platform key processing with disable options
* Supports commerce platform integration through external system tracking
* Implements streamlined processing focused on platform key management

## Salesforce Fields

This flow interacts with the Salesforce Contact object and its related fields. Below is a mapping of all fields utilized:

| Field API Name | Field Type | Purpose in Flow          |
| -------------- | ---------- | ------------------------ |
| Id             | ID         | Unique record identifier |

## Input Variables

### Core Contact Data

| Variable      | Type            | Required | Description                                 |
| ------------- | --------------- | -------- | ------------------------------------------- |
| `Record`      | Contact SObject | Yes      | The Contact record that was created/updated |
| `Platform`    | String          | Yes      | External platform identifier                |
| `PlatformKey` | String          | Yes      | External platform's contact identifier      |

### Configuration Variables

| Variable                           | Type    | Default | Description                                |
| ---------------------------------- | ------- | ------- | ------------------------------------------ |
| `Config_ContactDisablePlatformKey` | Boolean | false   | Completely disable platform key processing |
| `Config_MoveDataEngine`            | Number  | -       | Engine version identifier                  |

## Output Variables

| Variable | Type              | Description                              |
| -------- | ----------------- | ---------------------------------------- |
| `Record` | Contact SObject   | Updated contact record                   |
| `Errors` | String Collection | Updated error collection from processing |

## Flow Logic

### 1. Platform Key Configuration Check

The flow begins by evaluating platform key processing settings:

* **Condition**: Checks if `Config_ContactDisablePlatformKey` is not true
* **Purpose**: Allows complete bypassing of platform key processing when disabled
* **Path Selection**: Determines whether to proceed with platform key creation or end processing

### 2. Platform Key Creation

When platform key processing is enabled:

* **Subflow Call**: Invokes `MoveData_Commerce_Helper_Set_Contact_Platform_Key`
* **Stage Parameter**: Sets processing stage to "post" for post-upsert operations
* **Input Parameters**: Passes contact record, platform details, and configuration settings
* **Output Handling**: Captures updated contact record and any errors from processing

## Processing Flow

1. **Configuration Check**: Evaluate platform key processing settings
2. **Platform Key Creation**: Create platform key association (if enabled)

## Configuration Options

### Platform Key Control

* **Complete Disable**: `Config_ContactDisablePlatformKey = true` skips all platform key processing
* **Engine Version**: `Config_MoveDataEngine` specifies the processing engine version

## Error Handling

### Platform Key Error Management

* **Error Collection**: Platform key creation failures are captured and returned in `Errors` collection
* **Subflow Integration**: Errors from the helper subflow are properly propagated to the main flow
* **Data Integrity**: Ensures complete record processing or graceful failure reporting

### Error Scenarios

Common error conditions handled:

* **Duplicate Platform Keys**: When platform key already exists for different contact
* **Invalid Platform Configuration**: When platform settings are misconfigured
* **Processing Engine Issues**: When engine version conflicts occur

## Dependencies

* `MoveData_Commerce_Helper_Set_Contact_Platform_Key` (Subflow)
