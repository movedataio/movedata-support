# Contact Platform Key Helper Flow

{% hint style="info" %}
This flow is documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Helper\_Set\_Contact\_Platform\_Key\
**Label:** \[MoveData] Donation: Helper - Set Contact Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This helper flow manages the creation and association of platform keys for contact records, establishing the link between external platform identifiers and Salesforce contact records for  integration purposes.

## Purpose

The flow provides platform key management that:

* Writes platform key records linking contacts to external platform identifiers
* Validates platform key data integrity and prevents conflicts
* Provides error handling for platform key creation failures

## Input Variables

| Variable      | Type            | Required | Description                                           |
| ------------- | --------------- | -------- | ----------------------------------------------------- |
| `Record`      | Contact SObject | Yes      | The Contact record to associate with platform key     |
| `Platform`    | String          | Yes      | Platform identifier (e.g., "gofundme", "justgiving")  |
| `PlatformKey` | String          | Yes      | External platform's unique identifier for the contact |
| `Stage`       | String          | Yes      | Processing stage indicator ("pre" or "post")          |

## Output Variables

| Variable | Type              | Description                               |
| -------- | ----------------- | ----------------------------------------- |
| `Record` | Contact SObject   | Updated contact record                    |
| `Errors` | String Collection | Error messages from platform key creation |

## Flow Logic

### 1. Platform Key Creation

When validation passes, the flow creates the platform key association:

* **Component**: Uses `movedata__PlatformKeyCreateComponent` Apex action
* **Validation**: Includes `ErrorIfDifferentObjectId` to prevent key conflicts
  * Ensures that the same platform key is not used on another record.  Shouldn't happen as the platform should have matched earlier.
* **Association**: Set the platform key, linking it to the contact record

### 2. Error Handling

The flow includes comprehensive error management:

* **Success Validation**: Checks if platform key creation was successful
* **Error Logging**: Captures error messages for troubleshooting

## Processing Flow

1. **Validation**: Check stage equals "post" and platform key is not empty
2. **Creation**: Call Apex component to create platform key record
3. **Success Check**: Verify platform key creation succeeded
4. **Error Handling**: Collect and return any errors encountered

## Error Scenarios

Common error conditions handled:

* **Duplicate Platform Keys**: When the same platform key already exists for a different contact

## Dependencies

* `movedata__PlatformKeyCreateComponent` (Apex action)
