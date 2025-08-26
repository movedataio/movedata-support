# Campaign Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Key\
**Label:** \[MoveData] Donation: Campaign - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow generates standardised platform keys for campaign records by combining platform identifiers and keys into a consistent format for tracking and integration purposes.  These are used to match on existing records.

## Purpose

The flow creates unique platform keys that:

* Provide consistent identification for campaigns across different donation platforms
* Enable reliable campaign matching and deduplication

## Input Variables

| Variable        | Type   | Required | Description                                                 |
| --------------- | ------ | -------- | ----------------------------------------------------------- |
| `Platform`      | String | Yes      | Platform identifier (e.g., "gofundme", "justgiving")        |
| `Key`           | String | Yes      | External platform's unique identifier for the campaign      |
| `Type`          | String | No       | Campaign type or category from the external platform        |
| `SalesforceKey` | String | No       | Existing Salesforce key (if present, flow terminates early) |

## Output Variables

| Variable | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `Result` | String | Generated platform key in the appropriate format |

## Flow Logic

### 1. Salesforce Key Check

The flow first determines whether a Salesforce key already exists:

* **If SalesforceKey is present**: Flow terminates without generating a new key
* **If SalesforceKey is null**: Proceeds to generate platform key using untyped format

### 2. Platform Key Generation

The flow uses the following key format based on available data:

#### Untyped Platform Key Format

```
Platform:Key
```

**Example:** `gofundme:abc123`

## Error Handling

* Gracefully handles null Type values
* Respects existing Salesforce keys to prevent overwrites
* Uses simple string concatenation for reliable key generation

## Dependencies

None
