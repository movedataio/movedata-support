# Recurring Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Recurring\_Key\
**Label:** \[MoveData] Donation: Recurring - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow generates standardised platform keys for recurring donation records by combining platform identifiers.  These are used to match on existing records.

## Purpose

The flow creates unique platform keys that:

* Provide consistent identification for recurring donations across different donation platforms
* Enable reliable recurring donation matching and deduplication

## Salesforce Fields

This flow interacts with the NPSP Recurring Donation object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                    | Field Type     | Purpose in Flow                                  |
|----------------------------------|---------------|--------------------------------------------------|
| md_npsp_pack__Platform_Key__c     | Text (100)    | Stores unique external platform identifier       |

## Input Variables

| Variable   | Type   | Required | Description                                                      |
| ---------- | ------ | -------- | ---------------------------------------------------------------- |
| `Platform` | String | Yes      | Platform identifier (e.g., "gofundme", "justgiving")             |
| `Key`      | String | Yes      | External platform's unique identifier for the recurring donation |
| `Result`   | String | No       | Pre-existing result value (input/output variable)                |

## Output Variables

| Variable | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `Result` | String | Generated platform key in the appropriate format |

## Flow Logic

### 1. Platform Key Generation

The flow immediately generates the platform key using direct string concatenation:

**Direct Assignment:**

* Combines Platform and Key using colon separator
* Uses formula: `{!Platform}:{!Key}`
* No validation or conditional logic

#### Platform Key Format

```
Platform:Key
```

**Example:** `gofundme:recurring123`

## Error Handling

* Uses simple string concatenation for key generation

## Dependencies

None
