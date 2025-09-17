# Contact Platform Key Helper Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Helper\_Set\_Contact\_Platform\_Key\
**Label:** \[MoveData] Commerce: Helper - Set Contact Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This helper flow manages the creation and association of platform keys for contact records, establishing the link between external platform identifiers and Salesforce contact records for commerce integration purposes.

## Purpose

The flow provides platform key management that:

* Writes platform key records linking contacts to external platform identifiers
* Validates platform key data integrity and prevents conflicts
* Provides error handling for platform key creation failures
* Ensures processing only occurs during the appropriate stage

## Salesforce Fields

This flow interacts with the Contact Platform Key custom object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type | Purpose in Flow                     |
| ------------------------------ | ---------- | ----------------------------------- |
| movedata\_\_Platform\_Key\_\_c | Text       | Stores external platform identifier |

## Input Variables

| Variable                | Type              | Required | Description                                           |
| ----------------------- | ----------------- | -------- | ----------------------------------------------------- |
| `Record`                | Contact SObject   | Yes      | The Contact record to associate with platform key     |
| `Platform`              | String            | Yes      | Platform identifier (e.g., "eventbrite", "shopify")   |
| `PlatformKey`           | String            | Yes      | External platform's unique identifier for the contact |
| `Stage`                 | String            | Yes      | Processing stage indicator ("pre" or "post")          |
| `Errors`                | String Collection | No       | Existing error collection for accumulation            |
| `Config_MoveDataEngine` | Number            | No       | Engine version identifier                             |

## Output Variables

| Variable | Type              | Description                               |
| -------- | ----------------- | ----------------------------------------- |
| `Record` | Contact SObject   | Updated contact record                    |
| `Errors` | String Collection | Error messages from platform key creation |

## Flow Logic

### 1. Stage and Data Validation

The flow begins with validation checks:

* **Stage Validation**: Ensures processing only occurs during "post" stage
* **Platform Key Validation**: Checks that platform key has content (length > 0)
* **Combined Check**: Both conditions must be met for processing to continue

### 2. Platform Key Creation

When validation passes, the flow creates the platform key association:

* **Component**: Uses `movedata__PlatformKeyCreateComponent` Apex action
* **Validation**: Includes `ErrorIfDifferentObjectId` to prevent key conflicts
* **Association**: Links the platform key to the contact record
* **Parameters**:
  * `ObjectId`: Contact record ID
  * `Platform`: External platform identifier
  * `PlatformKey`: Platform-specific contact identifier
  * `ErrorIfDifferentObjectId`: Set to true for validation

### 3. Error Handling

The flow includes comprehensive error management:

* **Success Validation**: Checks if platform key creation was successful
* **Error Collection**: Adds any creation errors to the error collection
* **Error Propagation**: Returns updated error collection for upstream handling

## Processing Flow

1. **Stage Validation**: Check stage equals "post" and platform key is not empty
2. **Platform Key Creation**: Call Apex component to create platform key record
3. **Success Verification**: Verify platform key creation succeeded
4. **Error Management**: Collect and return any errors encountered

## Configuration Options

### Stage Control

* **Post-Only Processing**: Platform key creation only occurs during "post" stage
* **Engine Version**: `Config_MoveDataEngine` supports version-specific processing

## Error Handling

### Platform Key Error Management

* **Error Collection**: Platform key creation failures are captured and added to existing error collection
* **Success Validation**: Checks component success flag before proceeding
* **Error Accumulation**: Supports accumulating errors from multiple processing steps

### Error Scenarios

Common error conditions handled:

* **Duplicate Platform Keys**: When the same platform key already exists for a different contact
* **Invalid Stage**: When called during "pre" stage or with empty platform key
* **Component Failures**: When the Apex component encounters processing errors

## Dependencies

* `movedata__PlatformKeyCreateComponent` (Apex action)
