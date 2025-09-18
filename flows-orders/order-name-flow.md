# Order Name Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Order\_Name\
**Label:** \[MoveData] Commerce: Order - Name\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This utility flow provides a deprecated placeholder for order naming functionality that has been moved to the Order Finaliser Phase. It returns a temporary value to maintain compatibility with existing commerce processing flows.

## Purpose

The flow serves as a deprecated placeholder that:

* Maintains backward compatibility with existing commerce processing workflows
* Returns a temporary placeholder value for order naming
* Indicates that order naming logic has been relocated to the Order Finaliser Phase
* Prevents processing errors in flows that still reference this naming component

## Salesforce Fields

This flow does not directly interact with Salesforce fields as it only returns a static placeholder value.

| Field API Name | Field Type | Purpose in Flow       |
| -------------- | ---------- | --------------------- |
| None           | -          | No field interactions |

## Input Variables

This flow does not define any input variables as it only returns a static value.

## Output Variables

| Variable | Type   | Description                             |
| -------- | ------ | --------------------------------------- |
| `Result` | String | Static placeholder value ("Temp Value") |

## Flow Logic

### 1. Temporary Value Assignment

The flow performs a single static assignment:

* **Assignment**: Sets Result to "Temp Value"
* **Purpose**: Provides placeholder output for deprecated functionality
* **Usage**: Prevents null reference errors in calling flows

## Configuration Options

This flow does not include configuration options due to its deprecated status.

## Naming Examples

### All Scenarios

* **Input**: Any input (not used)
* **Output**: `"Temp Value"`

## Dependencies

None
