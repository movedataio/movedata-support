# Campaign Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Campaign\_Key\
**Label:** \[MoveData] Commerce: Campaign - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow generates standardised platform keys for campaign records by combining platform identifiers and keys into a consistent format for tracking and integration purposes. These are used to match on existing records.

## Purpose

The flow creates unique platform keys that:

* Provide consistent identification for campaigns across different commerce platforms
* Enable reliable campaign matching and deduplication
* Support both typed and untyped platform key formats based on available data

## Salesforce Fields

This flow interacts with the Salesforce Campaign object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type | Purpose in Flow                            |
| ------------------------------ | ---------- | ------------------------------------------ |
| movedata\_\_Platform\_Key\_\_c | Text       | Stores unique external platform identifier |

## Input Variables

| Variable        | Type   | Required | Description                                                 |
| --------------- | ------ | -------- | ----------------------------------------------------------- |
| `Platform`      | String | Yes      | Platform identifier (e.g., "eventbrite", "shopify")         |
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
* **If SalesforceKey is null**: Proceeds to generate platform key using appropriate format

### 2. Platform Key Generation

The flow uses different key formats based on available data:

#### Typed Platform Key Format

When both Type and Key are present:

```
Platform:Type:Key
```

**Example:** `eventbrite:conference:abc123`

#### Untyped Platform Key Format

When only Key is present (Type is null):

```
Platform:Key
```

**Example:** `shopify:xyz789`

### 3. Type-Based Routing

The flow evaluates available data to determine the appropriate format:

* **Has Type and Key**: Uses typed format with three components
* **Has Key but no Type**: Uses untyped format with two components
* **No Key**: Flow terminates without generating a platform key

## Processing Flow

1. **Salesforce Key Check**: Verify if existing Salesforce key should be preserved
2. **Type and Key Validation**: Check availability of Type and Key parameters
3. **Format Selection**: Choose typed or untyped format based on available data
4. **Key Generation**: Create platform key using selected format

## Configuration Options

The flow automatically selects the appropriate key format based on available input data, requiring no manual configuration.

## Error Handling

* Gracefully handles null Type values by using untyped format
* Respects existing Salesforce keys to prevent overwrites
* Terminates processing when no Key is provided
* Uses simple string concatenation for reliable key generation

## Dependencies

None
