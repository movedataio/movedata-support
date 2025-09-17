# Recurring Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Recurring\_Key\
**Label:** \[MoveData] Donation: Recurring - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow generates standardised platform keys for recurring donation records by combining platform identifiers. These are used to match on existing records.

## Purpose

The flow creates unique platform keys that:

* Provide consistent identification for recurring donations across different donation platforms
* Enable reliable recurring donation matching and deduplication

## Salesforce Fields

This flow interacts with the NPSP Recurring Donation object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                       | Field Type | Purpose in Flow                            |
| ------------------------------------ | ---------- | ------------------------------------------ |
| md\_npsp\_pack\_\_Platform\_Key\_\_c | Text (100) | Stores unique external platform identifier |

## Input Variables

| Variable   | Type   | Required | Description                                                      |
| ---------- | ------ | -------- | ---------------------------------------------------------------- |
| `Platform` | String | Yes      | Platform identifier (e.g., "gofundme", "justgiving")             |
| `Key`      | String | Yes      | External platform's unique identifier for the recurring donation |

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

When key validation passes, the flow generates the platform key:

* **Formula**: Uses `{!Platform}:{!Key}` format
* **Assignment**: Sets result to generated platform key value

#### Platform Key Format

```
Platform:Key
```

**Example:** `gofundme:recurring123`

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
