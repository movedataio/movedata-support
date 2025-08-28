# Account Platform Key Helper Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Helper\_Set\_Account\_Platform\_Key\
**Label:** \[MoveData] Donation: Helper - Set Account Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This helper flow manages the creation and association of platform keys for account records, establishing the link between external platform identifiers and Salesforce account records.

## Purpose

The flow provides platform key management that:

* Creates platform key records linking accounts to external platform identifiers
* Validates platform key data integrity and prevents conflicts
* Provides error handling for platform key creation failures

## Salesforce Fields

This flow interacts with the Account Platform Key custom object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                  | Field Type     | Purpose in Flow                                  |
|---------------------------------|---------------|--------------------------------------------------|
| movedata__Platform_Key__c       | Text          | Stores external platform identifier              |

## Input Variables

| Variable      | Type            | Required | Description                                           |
| ------------- | --------------- | -------- | ----------------------------------------------------- |
| `Record`      | Account SObject | Yes      | The Account record to associate with platform key     |
| `Platform`    | String          | Yes      | Platform identifier (e.g., "gofundme", "justgiving")  |
| `PlatformKey` | String          | Yes      | External platform's unique identifier for the account |
| `Stage`       | String          | Yes      | Processing stage indicator ("pre" or "post")          |

## Output Variables

| Variable | Type              | Description                               |
| -------- | ----------------- | ----------------------------------------- |
| `Record` | Account SObject   | Updated account record                    |
| `Errors` | String Collection | Error messages from platform key creation |

## Flow Logic

### 1. Platform Key Creation

When validation passes, the flow creates the platform key association:

* **Component**: Uses `movedata__PlatformKeyCreateComponent` Apex action
* **Validation**: Includes `ErrorIfDifferentObjectId` to prevent key conflicts
  * Ensures that the same platform key is not used on another record.  Shouldn't happen as the platform should have matched earlier.
* **Association**: Set the platform key, linking it to the account record

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

* **Duplicate Platform Keys**: When the same platform key already exists for a different account

## Dependencies

* `movedata__PlatformKeyCreateComponent` (Apex action)
