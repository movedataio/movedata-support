# Account Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Account\_Mapping\
**Label:** \[MoveData] General: Account - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow orchestrates the complete mapping and transformation of account data from external donation platforms into Salesforce Account records, with comprehensive field processing, address management, and data quality controls.

## Purpose

The flow provides complete account mapping orchestration that:

* Implements comprehensive field-level processing for account data
* Manages both billing and shipping address processing
* Provides extensive configuration controls for field processing
* Applies case transformation and data quality validation
* Supports address quality indexing and overwrite controls
* Handles record type assignment for business accounts

## Salesforce Fields

This flow interacts with the Salesforce Account object and its related fields. Below is a mapping of all fields utilized:

| Field API Name     | Field Type | Purpose in Flow                |
| ------------------ | ---------- | ------------------------------ |
| Name               | Text       | Account name identifier        |
| Phone              | Text       | Account's phone number         |
| PersonEmail        | Email      | Account's email address        |
| RecordTypeId       | ID         | Account record type assignment |
| BillingStreet      | Text Area  | Billing street address         |
| BillingCity        | Text       | Billing city                   |
| BillingState       | Text       | Billing state/province         |
| BillingCountry     | Text       | Billing country                |
| BillingPostalCode  | Text       | Billing postal code            |
| ShippingStreet     | Text Area  | Shipping street address        |
| ShippingCity       | Text       | Shipping city                  |
| ShippingState      | Text       | Shipping state/province        |
| ShippingCountry    | Text       | Shipping country               |
| ShippingPostalCode | Text       | Shipping postal code           |

## Input Variables

### Core Account Data

| Variable | Type            | Required | Description                         |
| -------- | --------------- | -------- | ----------------------------------- |
| `Record` | Account SObject | Yes      | The Account record being processed  |
| `Name`   | String          | Yes      | Account name from external platform |
| `Phone`  | String          | No       | Account's phone number              |
| `Email`  | String          | No       | Account's email address             |

### Address Data

| Variable                      | Type   | Description                |
| ----------------------------- | ------ | -------------------------- |
| `MailingAddress_Street`       | String | Account's street address   |
| `MailingAddress_City`         | String | Account's city             |
| `MailingAddress_State`        | String | Account's state/province   |
| `MailingAddress_Country`      | String | Account's country          |
| `MailingAddress_Postcode`     | String | Account's postal code      |
| `MailingAddress_QualityIndex` | Number | Address data quality score |

### Configuration Variables

#### Field Processing Controls

| Variable                          | Type    | Default             | Description                  |
| --------------------------------- | ------- | ------------------- | ---------------------------- |
| `Config_AccountIgnoreName`        | Boolean | false               | Skip name processing         |
| `Config_AccountIgnorePhone`       | Boolean | false               | Skip phone processing        |
| `Config_AccountIgnoreEmail`       | Boolean | false               | Skip email processing        |
| `Config_AccountIgnoreRecordType`  | Boolean | false               | Skip record type processing  |
| `Config_AccountBusinessAccountRT` | String  | "Business\_Account" | Business account record type |

#### Address Processing Controls

| Variable                                  | Type    | Default | Description                             |
| ----------------------------------------- | ------- | ------- | --------------------------------------- |
| `Config_AccountAddressMailing`            | Boolean | true    | Use mailing address (vs shipping)       |
| `Config_AccountIgnoreAddressWhenNotEmpty` | Boolean | false   | Skip address when existing data present |
| `Config_AccountAddressOverwriteAll`       | Boolean | true    | Force overwrite all address fields      |
| `Config_AccountAddressQualityIndex`       | Number  | -       | Minimum address quality threshold       |

#### Case Transformation

| Variable                           | Type    | Default | Description                        |
| ---------------------------------- | ------- | ------- | ---------------------------------- |
| `Config_AccountNameCase`           | Number  | 0       | Account name case transformation   |
| `Config_ContactAddressStreetCase`  | Number  | 0       | Street address case transformation |
| `Config_ContactAddressCityCase`    | Number  | 0       | City case transformation           |
| `Config_ContactAddressStateCase`   | Number  | 0       | State case transformation          |
| `Config_ContactAddressCountryCase` | Number  | 0       | Country case transformation        |
| `Config_AdvancedIgnoreMixedCase`   | Boolean | false   | Ignore mixed-case detection        |

## Output Variables

| Variable   | Type                    | Description                    |
| ---------- | ----------------------- | ------------------------------ |
| `Record`   | Account SObject         | Fully processed account record |
| `Logs`     | MoveData Log Collection | Processing log entries         |
| `LogsJSON` | String                  | JSON representation of logs    |

## Flow Logic

### 1. Record Type Processing

The flow first evaluates record type requirements:

* **If Config\_AccountIgnoreRecordType is false**: Looks up and assigns business account record type
* **If existing record type**: Retains current record type
* **Default**: Assigns organisation record type based on configuration

### 2. Field Processing

Processes core account fields with configuration controls:

**Name Processing:**

* Applies case transformation using `movedata__SetValueComponent`
* Uses `Config_AccountNameCase` for formatting
* Respects `Config_AdvancedIgnoreMixedCase` setting

**Phone Processing:**

* Trims phone to 40 characters maximum
* Skips processing if `Config_AccountIgnorePhone` is true

**Email Processing:**

* Trims email to 80 characters maximum
* Sets PersonEmail field for person accounts
* Skips processing if `Config_AccountIgnoreEmail` is true

### 3. Address Quality Assessment

Evaluates address data quality before processing:

* **Quality Index Check**: Compares `MailingAddress_QualityIndex` against `Config_AccountAddressQualityIndex`
* **Below Threshold**: Logs quality concerns and may skip processing
* **Force Overwrite**: Evaluates `Config_AccountAddressOverwriteAll` setting

### 4. Address Processing

Comprehensive address field processing:

**Address Type Selection:**

* **Mailing**: Uses billing address fields when `Config_AccountAddressMailing` is true
* **Shipping**: Uses shipping address fields when `Config_AccountAddressMailing` is false

**Field-Level Processing:**

* **Street Address**: Trims to 255 characters, applies case transformation
* **City**: Trims to 40 characters, applies case transformation
* **State**: Trims to 80 characters, applies case transformation
* **Country**: Trims to 80 characters, applies case transformation
* **Postal Code**: Trims to 20 characters, converts to uppercase

**Overwrite Logic:**

* **Ignore When Not Empty**: Skips fields with existing data if configured
* **Quality Index**: Respects minimum quality thresholds
* **Force Overwrite**: Overwrites all fields when configured

## Processing Flow

1. **Record Type Assessment**: Evaluate and set record type
2. **Name Processing**: Set account name with case transformation
3. **Phone Processing**: Process phone number with validation
4. **Email Processing**: Set email with field length validation
5. **Address Quality Check**: Evaluate address data quality
6. **Address Processing**: Comprehensive address field mapping

## Dependencies

* `movedata__SetValueComponent` (Apex action)
* `movedata__WriteToLogFlowComponent` (Apex action)
