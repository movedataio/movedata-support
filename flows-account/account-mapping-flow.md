# Account Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Account\_Mapping\
**Label:** \[MoveData] Donation: Account - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow orchestrates the complete mapping and transformation of account data from external donation platforms into Salesforce Account records, with name protection mechanisms and comprehensive data processing.

## Purpose

The flow provides complete account mapping orchestration that:

* Implements name protection for existing account data
* Orchestrates account detail processing with configurable field controls
* Manages platform key association for external system integration
* Provides case transformation for account names
* Supports billing address processing

## Input Variables

### Core Account Data

| Variable      | Type            | Required | Description                            |
| ------------- | --------------- | -------- | -------------------------------------- |
| `Record`      | Account SObject | Yes      | The Account record being processed     |
| `Name`        | String          | Yes      | Account name from external platform    |
| `Phone`       | String          | No       | Account's phone number                 |
| `Website`     | String          | No       | Account's website URL                  |
| `Platform`    | String          | Yes      | External platform identifier           |
| `PlatformKey` | String          | Yes      | External platform's account identifier |

### Address Data

| Variable                  | Type   | Description              |
| ------------------------- | ------ | ------------------------ |
| `MailingAddress_Street`   | String | Account's street address |
| `MailingAddress_City`     | String | Account's city           |
| `MailingAddress_State`    | String | Account's state/province |
| `MailingAddress_Country`  | String | Account's country        |
| `MailingAddress_Postcode` | String | Account's postal code    |

### Configuration Variables

#### Name Processing

| Variable                         | Type    | Default | Description                      |
| -------------------------------- | ------- | ------- | -------------------------------- |
| `Config_AccountNameCase`         | Number  | 0       | Account name case transformation |
| `Config_AdvancedIgnoreMixedCase` | Boolean | false   | Ignore mixed-case detection      |

#### Field Processing Controls

| Variable                      | Type    | Default | Description             |
| ----------------------------- | ------- | ------- | ----------------------- |
| `Config_AccountIgnorePhone`   | Boolean | false   | Skip phone processing   |
| `Config_AccountIgnoreWebsite` | Boolean | false   | Skip website processing |
| `Config_AccountIgnoreAddress` | Boolean | false   | Skip address processing |
| `Config_AccountIgnoreType`    | Boolean | false   | Skip type processing    |
| `Config_AccountDefaultType`   | String  | "Other" | Default account type    |

## Output Variables

| Variable | Type            | Description                    |
| -------- | --------------- | ------------------------------ |
| `Record` | Account SObject | Fully processed account record |

## Flow Logic

### 1. Name Protection Assessment

The flow first evaluates account name protection requirements:

**Name Protection Check:**

* Checks if account has `movedata__Protect_Name__c` flag set
* Only applies to existing accounts with the protection flag enabled
* Skips name processing when protection is active

**Protection Logic:**

* **Protected**: Skips name assignment and proceeds directly to detail processing
* **Not Protected**: Processes name with case transformation and validation

### 2. Name Processing

When name protection is not active:

**Name Assignment:**

* Uses `movedata__SetValueComponent` for sophisticated name processing
* Applies case transformation based on `Config_AccountNameCase`
* Respects mixed-case detection settings via `Config_AdvancedIgnoreMixedCase`
* Sets the account name field with formatted value

### 3. Account Details Processing

Calls the Account Details Helper subflow with:

**Configuration Variables:**

* `Config_AccountIgnorePhone`: Controls phone field processing
* `Config_AccountIgnoreWebsite`: Controls website field processing
* `Config_AccountIgnoreAddress`: Controls address field processing
* `Config_AccountIgnoreType`: Controls type field processing

**Data Variables:**

* All address components (street, city, state, country, postcode)
* Phone and website information
* Account type defaulting to `Config_AccountDefaultType`

## Processing Flow

1. **Name Protection Check**: Evaluate if account name should be protected
2. **Name Processing**: Set account name with case transformation (if not protected)
3. **Details Processing**: Call helper subflow for field-level processing

## Dependencies

* `MoveData_Donation_Helper_Set_Account_Details` (Subflow)
* `MoveData_Donation_Helper_Set_Account_Platform_Key` (Subflow)
* `movedata__SetValueComponent` (Apex action)
