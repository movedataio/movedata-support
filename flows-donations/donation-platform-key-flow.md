# Donation Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Donation\_Key\
**Label:** \[MoveData] Donation: Donation - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow generates standardised platform keys for donation records by combining platform identifiers and external keys into a consistent format. These keys are used to match existing records and prevent duplicates.

## Purpose

* Provide consistent keys for donations across different external platforms
* Enable reliable donation matching and deduplication during processing

## Salesforce Fields

This flow interacts with Salesforce objects and their platform key fields. Below is a mapping of all fields utilized:

| Field API Name                | Field Type     | Purpose in Flow                          |
|------------------------------|---------------|------------------------------------------|
| movedata__Platform_Key__c     | Text          | Stores generated platform key           |

## Input Variables

| Variable   | Type   | Required | Description                                                    |
| ---------- | ------ | -------- | -------------------------------------------------------------- |
| `Platform` | String | Yes      | Platform identifier (e.g., "gofundme", "justgiving", "paypal") |
| `Key`      | String | Yes      | External platform's unique identifier for the donation         |

## Output Variables

| Variable | Type   | Description                                   |
| -------- | ------ | --------------------------------------------- |
| `Result` | String | Generated platform key in standardized format |

## Flow Logic

### 1. Platform Key Generation

The flow uses a simple but effective key generation approach:

#### Platform Key Format

```
Platform:Key
```

**Examples:**

* `gofundme:donation123456`
* `justgiving:78901234`
* `paypal:TXNID567890`
* `stripe:ch_1A2B3C4D5E6F`

### 2. Key Construction

The flow performs direct string concatenation:

* Combines the platform identifier with the external key
* Uses colon (`:`) as the delimiter for consistency across all MoveData flows
* No validation or transformation applied to maintain simplicity and reliability

## Error Handling

### Input Validation

The flow relies on calling processes to ensure:

* Platform identifier is provided and not null
* External key is provided and not null
* Both values contain valid characters for platform key construction

## Dependencies

None
