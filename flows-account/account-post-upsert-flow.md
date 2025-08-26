# Account Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Account\_Post\
**Label:** \[MoveData] Donation: Account - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after account records are created or updated, focusing specifically on platform key association.

## Purpose

The flow performs post-upsert operations that:

* Creates platform key associations linking accounts to external platform identifiers

## Input Variables

### Core Account Data

| Variable                | Type            | Required | Description                                 |
| ----------------------- | --------------- | -------- | ------------------------------------------- |
| `Record`                | Account SObject | Yes      | The Account record that was created/updated |
| `Platform`              | String          | Yes      | External platform identifier                |
| `PlatformKey`           | String          | Yes      | External platform's account identifier      |
| `Config_MoveDataEngine` | Number          | No       | Engine version identifier                   |

## Output Variables

| Variable | Type            | Description            |
| -------- | --------------- | ---------------------- |
| `Record` | Account SObject | Updated account record |

## Flow Logic

### 1. Platform Key Association

The flow immediately processes platform key creation:

* **Subflow Call**: Invokes `MoveData_Donation_Helper_Set_Account_Platform_Key`

## Processing Flow

1. **Platform Key Creation**: Create platform key association

## Dependencies

* `MoveData_Donation_Helper_Set_Account_Platform_Key` (Subflow)
