# Contact Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Contact\_Key\
**Label:** \[MoveData] General: Contact - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 49.0\
**Status:** Active

This utility flow generates standardised platform keys for contact records by combining platform identifiers and keys into a consistent format for tracking and integration purposes. These are used to match on existing records.

## Purpose

The flow creates unique platform keys that:

* Provide consistent identification for contacts across different donation platforms
* Enable reliable contact matching and deduplication

## Salesforce Fields

This flow interacts with the Contact Platform Key custom object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type | Purpose in Flow                     |
| ------------------------------ | ---------- | ----------------------------------- |
| movedata\_\_Platform\_Key\_\_c | Text       | Stores external platform identifier |

## Input Variables

| Variable   | Type   | Required | Description                                           |
| ---------- | ------ | -------- | ----------------------------------------------------- |
| `Platform` | String | Yes      | Platform identifier (e.g., "gofundme", "justgiving")  |
| `Key`      | String | Yes      | External platform's unique identifier for the contact |

## Output Variables

| Variable | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `Result` | String | Generated platform key in the appropriate format |

## Flow Logic

### 1. Key Existence Check

The flow first determines whether a key is provided:

* **If Key is present**: Proceeds to generate platform key
* **If Key is null**: Flow terminates without generating a key

### 2. Platform Key Generation

The flow uses the following key format:

#### Platform Key Format

```
Platform:Key
```

**Example:** `gofundme:user123`

## Error Handling

* Gracefully handles null Key values
* Uses simple string concatenation for reliable key generation

## Dependencies

None
