# Catalog Platform Key Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Catalog\_Key\
**Label:** \[MoveData] Commerce: Catalog - Platform Key\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow generates standardised platform keys for catalog records by combining platform identifiers and external keys into a consistent format. These keys are used to match existing catalog items and prevent duplicates during commerce data processing.

## Purpose

* Provide consistent keys for catalog items across different external commerce platforms
* Enable reliable catalog matching and deduplication during processing
* Support commerce extension functionality for product and ticket management

## Salesforce Fields

This flow interacts with Salesforce objects and their platform key fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type | Purpose in Flow               |
| ------------------------------ | ---------- | ----------------------------- |
| movedata\_\_Platform\_Key\_\_c | Text       | Stores generated platform key |

## Input Variables

| Variable   | Type   | Required | Description                                                   |
| ---------- | ------ | -------- | ------------------------------------------------------------- |
| `Platform` | String | Yes      | Platform identifier (e.g., "raisely", "funraisin", "shopify") |
| `Key`      | String | Yes      | External platform's unique identifier for the catalog item    |

## Output Variables

| Variable | Type   | Description                                   |
| -------- | ------ | --------------------------------------------- |
| `Result` | String | Generated platform key in standardized format |

## Flow Logic

### 1. Input Validation

The flow first checks if a key value has been provided:

#### Has Key Decision

* **Condition:** Key is not null
* **True Path:** Proceeds to platform key construction
* **False Path:** Flow terminates without generating a key

### 2. Platform Key Generation

The flow uses a simple but effective key generation approach:

#### Platform Key Format

```
Platform:Key
```

**Examples:**

* `raisely:product_12345`
* `funraisin:ticket_67890`
* `shopify:prod_ABC123`
* `eventbrite:event_789012`

### 3. Key Construction

The flow performs direct string concatenation using a formula:

* **Formula Name:** `GeneralPlatformKey`
* **Expression:** `{!Platform}&":"&{!Key}`
* Combines the platform identifier with the external key
* Uses colon (`:`) as the delimiter for consistency across all MoveData flows
* No validation or transformation applied to maintain simplicity and reliability

## Error Handling

### Input Validation

The flow includes basic validation:

* **Key Presence Check:** Verifies that the Key variable is not null before proceeding
* **Graceful Termination:** If no key is provided, the flow terminates without error

### Calling Process Responsibilities

The flow relies on calling processes to ensure:

* Platform identifier is provided and not null
* External key contains valid characters for platform key construction
* Platform identifier follows MoveData naming conventions

## Dependencies

None
