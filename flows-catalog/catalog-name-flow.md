# Catalog Name Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Catalog\_Name\
**Label:** \[MoveData] Commerce: Catalog - Name\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This utility flow provides standardized catalog item naming for commerce records by passing through the provided name without modification, ensuring consistent naming conventions across catalog processing.

## Purpose

The flow provides catalog item naming that:

* Maintains original catalog item names from external platforms
* Provides a standardised interface for catalog naming operations
* Supports future expansion for more complex naming logic
* Ensures consistency across commerce extension processing
* Acts as a pass-through mechanism for catalog name handling

## Salesforce Fields

This flow interacts with the Salesforce Product2 object and its related fields. Below is a mapping of all fields utilized:

| Field API Name | Field Type | Purpose in Flow         |
| -------------- | ---------- | ----------------------- |
| Name           | Text (255) | Product name identifier |

## Input Variables

| Variable | Type   | Required | Description                              |
| -------- | ------ | -------- | ---------------------------------------- |
| `Name`   | String | Yes      | Catalog item name from external platform |

## Output Variables

| Variable | Type   | Description                                   |
| -------- | ------ | --------------------------------------------- |
| `Result` | String | Generated catalog name (unchanged from input) |

## Flow Logic

### 1. Direct Name Assignment

The flow performs a simple pass-through operation:

* **Input**: Receives the `Name` parameter from external platform
* **Processing**: Directly assigns the input name to the result variable
* **Output**: Returns the unchanged name value

### 2. Name Processing Strategy

Unlike the more complex campaign naming flow, this catalog naming flow uses a simplified approach:

#### Single Processing Step

```
Result = Name
```

**Example:**

* **Input**: `Name = "Premium Event Ticket"`
* **Output**: `"Premium Event Ticket"`

## Configuration Options

Currently, this flow does not include configuration options, maintaining simplicity for catalog naming operations.

## Naming Examples

### Product Items

* **Input**: `Name = "Conference Registration"`
* **Output**: `"Conference Registration"`

### Ticket Items

* **Input**: `Name = "VIP Access Pass"`
* **Output**: `"VIP Access Pass"`

### Merchandise Items

* **Input**: `Name = "Branded T-Shirt - Large"`
* **Output**: `"Branded T-Shirt - Large"`

### Service Items

* **Input**: `Name = "Photography Package"`
* **Output**: `"Photography Package"`

## Design Rationale

### Simplicity by Design

This flow is intentionally simple to:

* **Maintain Platform Names**: Preserve original naming from external commerce platforms
* **Avoid Complexity**: Prevent naming conflicts that might arise from transformation logic
* **Support Consistency**: Provide a standardised interface that can be enhanced in future versions
* **Enable Traceability**: Keep names directly traceable to their external platform sources

### Future Extensibility

The simple structure allows for future enhancements such as:

* Name transformation rules
* Character limit handling
* Special character sanitization
* Prefix/suffix addition based on catalog type
* Multi-language support

## Dependencies

None
