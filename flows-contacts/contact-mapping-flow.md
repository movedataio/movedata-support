# Contact Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Contact\_Mapping\
**Label:** \[MoveData] Commerce: Contact - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 49.0\
**Status:** Active

This flow orchestrates the complete mapping and transformation of contact data from external commerce platforms into Salesforce Contact records, with protection mechanisms and comprehensive data processing.

## Purpose

The flow provides complete contact mapping orchestration that:

* Implements multi-level protection for existing contact data
* Orchestrates contact detail processing with configurable field controls
* Manages platform key association for external system integration
* Supports commerce-specific contact processing requirements
* Provides case transformation for contact names and addresses

## Salesforce Fields

This flow interacts with the Salesforce Contact object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type | Purpose in Flow                             |
| ------------------------------ | ---------- | ------------------------------------------- |
| Id                             | ID         | Unique record identifier                    |
| movedata\_\_Protect\_Name\_\_c | Checkbox   | Prevents automatic updates to contact names |

## Input Variables

### Core Contact Data

| Variable     | Type            | Required | Description                        |
| ------------ | --------------- | -------- | ---------------------------------- |
| `Record`     | Contact SObject | Yes      | The Contact record being processed |
| `FirstName`  | String          | No       | Contact's first name               |
| `LastName`   | String          | No       | Contact's last name                |
| `Salutation` | String          | No       | Contact salutation/title           |
| `Birthday`   | Date            | No       | Contact's birth date               |
| `Email`      | String          | No       | Contact's email address            |
| `EmailType`  | String          | No       | Email type classification          |
| `Phone`      | String          | No       | Contact's phone number             |
| `PhoneType`  | String          | No       | Phone type classification          |

### Address Data

| Variable                      | Type   | Description                   |
| ----------------------------- | ------ | ----------------------------- |
| `MailingAddress_Street`       | String | Contact's street address      |
| `MailingAddress_City`         | String | Contact's city                |
| `MailingAddress_State`        | String | Contact's state/province      |
| `MailingAddress_Country`      | String | Contact's country             |
| `MailingAddress_Postcode`     | String | Contact's postal code         |
| `MailingAddress_QualityIndex` | Number | Contact address quality score |

### Control and Classification Variables

| Variable         | Type            | Default | Description                                      |
| ---------------- | --------------- | ------- | ------------------------------------------------ |
| `IsActor`        | Boolean         | false   | Indicates if contact is a key contact/actor      |
| `Newsletter`     | Boolean         | -       | Newsletter subscription preference               |
| `DuplicateCheck` | Boolean         | false   | Indicates if this is during duplicate processing |
| `Platform`       | String          | Yes     | External platform identifier                     |
| `PlatformKey`    | String          | Yes     | External platform's contact identifier           |
| `Key`            | String          | No      | Additional key reference                         |
| `ParentAccount`  | Account SObject | No      | Associated parent account                        |

### Configuration Variables

#### Protection Configuration

| Variable                     | Type   | Default | Description                                         |
| ---------------------------- | ------ | ------- | --------------------------------------------------- |
| `Config_ContactProtectLevel` | Number | 1       | Protection level (1=Names, 2=Names+Other, 3=Record) |

#### Field Processing Controls

| Variable                                  | Type    | Default | Description                             |
| ----------------------------------------- | ------- | ------- | --------------------------------------- |
| `Config_ContactIgnorePhone`               | Boolean | -       | Skip phone processing                   |
| `Config_ContactIgnoreEmail`               | Boolean | false   | Skip email processing                   |
| `Config_ContactIgnoreAddress`             | Boolean | false   | Skip address processing                 |
| `Config_ContactIgnoreAddressWhenNotEmpty` | Boolean | false   | Skip address when existing data present |
| `Config_ContactIgnoreDoNotContact`        | Boolean | false   | Skip Do Not Contact processing          |

#### Address Configuration

| Variable                            | Type    | Default | Description                          |
| ----------------------------------- | ------- | ------- | ------------------------------------ |
| `Config_ContactUseMailingAddress`   | Boolean | true    | Use mailing vs. other address fields |
| `Config_ContactAddressOverwriteAll` | Boolean | false   | Force overwrite all address fields   |
| `Config_ContactAddressQualityIndex` | Number  | -       | Minimum address quality threshold    |

#### Case Transformation

| Variable                           | Type    | Default | Description                        |
| ---------------------------------- | ------- | ------- | ---------------------------------- |
| `Config_ContactNameFirstCase`      | Number  | 0       | First name case transformation     |
| `Config_ContactNameLastCase`       | Number  | 0       | Last name case transformation      |
| `Config_ContactAddressStreetCase`  | Number  | 0       | Street address case transformation |
| `Config_ContactAddressCityCase`    | Number  | 0       | City case transformation           |
| `Config_ContactAddressStateCase`   | Number  | 0       | State case transformation          |
| `Config_ContactAddressCountryCase` | Number  | 0       | Country case transformation        |
| `Config_AdvancedIgnoreMixedCase`   | Boolean | false   | Ignore mixed-case detection        |

## Output Variables

| Variable   | Type                        | Description                                  |
| ---------- | --------------------------- | -------------------------------------------- |
| `Record`   | Contact SObject             | Fully processed contact record               |
| `Continue` | Boolean                     | Indicates whether processing should continue |
| `Errors`   | String Collection           | Error messages from processing               |
| `Logs`     | MoveDataLogEntry Collection | Processing logs                              |
| `LogsJSON` | String                      | JSON representation of logs                  |

## Flow Logic

### 1. Protection Level Assessment

The flow first evaluates contact protection requirements:

**Protection Check:**

* Checks if contact has `movedata__Protect_Name__c` flag set
* Only applies during non-duplicate check processing
* Determines protection level from configuration

**Protection Levels:**

* **Level 1**: Protect First Name and Last Name only
* **Level 2**: Protect Names + Email/Address/Phone
* **Level 3**: Protect entire record (skip all processing)

### 2. Contact Details Processing

Calls the Contact Details Helper subflow with:

* All configuration variables passed through
* All contact data fields
* Protection flags set based on protection level
* Address processing configuration

### 3. Platform Key Association

Calls the Platform Key Helper subflow to:

* Create platform key associations linking contacts to external platform identifiers
* Handle error collection and reporting
* Set stage to "pre" for processing timing

## Processing Flow

1. **Protection Assessment**: Evaluate contact protection requirements
2. **Protection Application**: Set appropriate protection flags and logging
3. **Contact Details Processing**: Call helper subflow for complete data transformation
4. **Platform Key Association**: Create platform key linkage

## Dependencies

* `MoveData_Commerce_Helper_Set_Contact_Details` (Subflow)
* `MoveData_Commerce_Helper_Set_Contact_Platform_Key` (Subflow)
* `movedata__WriteToLogFlowComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
