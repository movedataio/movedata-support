# Contact Post-Upsert Flow

{% hint style="info" %}
This flow is documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Contact\_Post\
**Label:** \[MoveData] Donation: Contact - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after contact records are created or updated, including platform key association and NPSP affiliation creation between contacts and their parent accounts.

## Purpose

The flow performs post-upsert operations that:

* Creates platform key associations linking contacts to external platform identifiers
* Establishes NPSP affiliations between contacts and their parent accounts
* Provides configurable platform key processing with disable options
* Supports nonprofit relationship management through NPSP integration

## Input Variables

### Core Contact Data

| Variable        | Type            | Required | Description                                 |
| --------------- | --------------- | -------- | ------------------------------------------- |
| `Record`        | Contact SObject | Yes      | The Contact record that was created/updated |
| `ParentAccount` | Account SObject | No       | Parent account for affiliation creation     |
| `Platform`      | String          | Yes      | External platform identifier                |
| `PlatformKey`   | String          | Yes      | External platform's contact identifier      |

### Configuration Variables

| Variable                           | Type    | Default | Description                                |
| ---------------------------------- | ------- | ------- | ------------------------------------------ |
| `Config_ContactDisablePlatformKey` | Boolean | -       | Completely disable platform key processing |
| `Config_ContactSetPlatformKey`     | Boolean | true    | Enable platform key creation               |
| `Config_MoveDataEngine`            | Number  | -       | Engine version identifier                  |

## Output Variables

| Variable | Type              | Description                              |
| -------- | ----------------- | ---------------------------------------- |
| `Record` | Contact SObject   | Updated contact record                   |
| `Errors` | String Collection | Updated error collection from processing |

## Flow Logic

### 1. Platform Key Association

When platform key processing is enabled:

* **Subflow Call**: Invokes `MoveData_Donation_Helper_Set_Contact_Platform_Key`
* **Error Collection**: Captures any errors from platform key creation

### 2. NPSP Affiliation Creation

When no errors are present and parent account exists:

* **Component**: Uses `CreateAffiliationComponent` Apex action
* **Relationship**: Creates affiliation between contact and parent account
* **Status**: Sets affiliation status to "Current"
* **NPSP Integration**: Establishes nonprofit-specific account-contact relationships

## Processing Flow

1. **Platform Key Creation**: Create platform key association (if enabled)
2. **Affiliation Creation**: Create NPSP affiliation (if no errors and parent account exists)

## Configuration Options

### Platform Key Control

* **Complete Disable**: `Config_ContactDisablePlatformKey = true` skips all platform key processing
* **Selective Disable**: `Config_ContactSetPlatformKey = false` prevents platform key creation

## Error Handling

### Platform Key Error Prevention

* **Error Detection**: Checks for platform key creation failures
* **Data Integrity**: Ensures complete record processing or graceful failure

### Error Scenarios

Common error conditions handled:

* **Duplicate Platform Keys**: When platform key already exists for different contact

## Dependencies

* [`MoveData_Donation_Helper_Set_Contact_Platform_Key`](contact-platform-key-helper-flow.md) (Subflow)
* `CreateAffiliationComponent` (Apex action)
