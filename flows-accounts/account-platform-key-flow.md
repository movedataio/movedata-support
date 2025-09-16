# Account Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Account\_Key\
**Label:** \[MoveData] General: Account - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 49.0\
**Status:** Active

This utility flow generates standardised platform keys for account records by combining platform identifiers and keys into a consistent format for tracking and integration purposes. These platform keys are essential for matching existing records during donation processing across multiple fundraising platforms.

## Purpose

The flow creates unique platform keys that:

* Provide consistent identification for accounts across different donation platforms
* Enable reliable account matching and deduplication during donation processing
* Support the MoveData donation pipeline's record matching capabilities
* Maintain data integrity across multiple fundraising platform integrations

## Salesforce Fields

This flow interacts with Account records and their platform-specific identifiers. The generated platform keys are used by the MoveData system for record matching operations.

| Field Usage             | Purpose in Flow                                                        |
| ----------------------- | ---------------------------------------------------------------------- |
| Platform Key Generation | Creates standardised keys for external platform account identification |

## Input Variables

| Variable   | Type   | Required | Description                                                      |
| ---------- | ------ | -------- | ---------------------------------------------------------------- |
| `Platform` | String | Yes      | Platform identifier (e.g., "gofundme", "justgiving", "donorbox") |
| `Key`      | String | Yes      | External platform's unique identifier for the account            |

## Output Variables

| Variable | Type   | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| `Result` | String | Generated platform key in the standardised format Platform:Key |

## Flow Logic

### 1. Key Existence Check

The flow first determines whether a key value has been provided:

* **Condition**: Checks if `Key` variable is not null
* **If Key is present**: Proceeds to generate the platform key
* **If Key is null**: Flow terminates without generating a key (follows default "No" path)

### 2. Platform Key Generation

When a valid key is provided, the flow generates a standardised platform key using the `GeneralPlatformKey` formula:

#### Platform Key Format

The formula creates keys in the format:

```
Platform:Key
```

**Examples:**

* `gofundme:account123` - GoFundMe account identifier
* `justgiving:org456` - JustGiving organisation identifier
* `donorbox:donor789` - Donorbox donor identifier

#### Formula Logic

The `GeneralPlatformKey` formula concatenates:

* Platform identifier
* Colon separator (`:`)
* External platform key

This standardised format ensures consistent key generation across all donation platforms integrated with MoveData.

## Error Handling

The flow implements basic error handling:

* **Null Key Handling**: Gracefully terminates when no key is provided
* **String Concatenation**: Uses reliable Salesforce formula syntax for key generation

## Dependencies

None
