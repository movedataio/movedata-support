# Campaign Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Key\
**Label:** \[MoveData] General: Campaign - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow generates standardised platform keys for campaign records by combining platform identifiers and keys into a consistent format for tracking and integration purposes. These are used to match on existing records.

## Purpose

The flow creates unique platform keys that:

* Provide consistent identification for campaigns across different platforms
* Enable reliable campaign matching and deduplication
* Support integration with external fundraising and commerce platforms

## Salesforce Fields

This flow interacts with the Salesforce Campaign object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type | Purpose in Flow                            |
| ------------------------------ | ---------- | ------------------------------------------ |
| movedata\_\_Platform\_Key\_\_c | Text       | Stores unique external platform identifier |

## Input Variables

| Variable   | Type   | Required | Description                                            |
| ---------- | ------ | -------- | ------------------------------------------------------ |
| `Platform` | String | Yes      | Platform identifier (e.g., "eventbrite", "gofundme")   |
| `Key`      | String | Yes      | External platform's unique identifier for the campaign |
| `Type`     | String | No       | Campaign type or category from the external platform   |

## Output Variables

| Variable | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `Result` | String | Generated platform key in the appropriate format |

## Flow Logic

### 1. Key Validation

The flow first validates that a key is provided:

* **If Key is present**: Proceeds to generate platform key using standard format
* **If Key is null**: Flow terminates without generating a key

### 2. Platform Key Generation

The flow uses the following key format:

#### Standard Platform Key Format

```
Platform:Key
```

**Example:** `eventbrite:123456789`

The key is generated using a simple formula that concatenates the platform identifier with the key, separated by a colon.

## Processing Flow

1. **Key Validation**: Check if external platform key is provided
2. **Key Generation**: Create standardized platform key using format `Platform:Key`
3. **Result Assignment**: Set generated key as the output result

## Configuration Options

The flow uses a simple, standardized approach with no configuration options, ensuring consistency across all platform integrations.

## Error Handling

* Gracefully handles null Key values by not generating a platform key
* Uses simple string concatenation for reliable key generation
* No complex error scenarios due to straightforward processing logic

## Dependencies

None
