# Contact Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Contact\_Mapping\
**Label:** \[MoveData] General: Contact - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow orchestrates the complete mapping and transformation of contact data from external donation platforms into Salesforce Person Account records, with sophisticated protection mechanisms, comprehensive address processing, and extensive data validation.

## Purpose

The flow provides complete contact mapping orchestration that:

* Implements multi-level protection for existing contact data
* Manages Person Account record type assignment and validation
* Handles comprehensive address processing with dual field support (Mailing vs Other)
* Provides extensive configuration controls for field processing
* Supports sophisticated address quality indexing and overwrite controls
* Implements case transformation for names and address fields

## Salesforce Fields

This flow interacts with the Salesforce Person Account object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type           | Purpose in Flow                             |
| ------------------------------ | -------------------- | ------------------------------------------- |
| Id                             | ID                   | Unique record identifier                    |
| FirstName                      | Text (40)            | Contact's first name                        |
| LastName                       | Text (80)            | Contact's last name (required field)        |
| Salutation                     | Picklist             | Contact's title/salutation                  |
| PersonBirthdate                | Date                 | Contact's birth date                        |
| PersonEmail                    | Email (80)           | Primary email address                       |
| Phone                          | Phone (40)           | Primary phone number                        |
| RecordTypeId                   | Lookup to RecordType | Person Account record type                  |
| PersonMailingStreet            | Textarea (255)       | Street address for mailing                  |
| PersonMailingCity              | Text (40)            | City for mailing address                    |
| PersonMailingState             | Text (80)            | State/Province for mailing address          |
| PersonMailingCountry           | Text (80)            | Country for mailing address                 |
| PersonMailingPostalCode        | Text (20)            | Postal/ZIP code for mailing address         |
| PersonOtherStreet              | Textarea (255)       | Alternative street address                  |
| PersonOtherCity                | Text (40)            | Alternative city address                    |
| PersonOtherState               | Text (80)            | Alternative state/province address          |
| PersonOtherCountry             | Text (80)            | Alternative country address                 |
| PersonOtherPostalCode          | Text (20)            | Alternative postal/ZIP code                 |
| movedata\_\_Protect\_Name\_\_c | Checkbox             | Prevents automatic updates to contact names |

## Input Variables

### Core Contact Data

| Variable     | Type            | Required | Description                               |
| ------------ | --------------- | -------- | ----------------------------------------- |
| `Record`     | Account SObject | Yes      | The Person Account record being processed |
| `FirstName`  | String          | No       | Contact's first name                      |
| `LastName`   | String          | No       | Contact's last name                       |
| `Salutation` | String          | No       | Contact salutation/title                  |
| `Birthday`   | Date            | No       | Contact's birth date                      |
| `Email`      | String          | No       | Contact's email address                   |
| `Phone`      | String          | No       | Contact's phone number                    |

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

| Variable         | Type    | Default | Description                                      |
| ---------------- | ------- | ------- | ------------------------------------------------ |
| `DuplicateCheck` | Boolean | false   | Indicates if this is during duplicate processing |

### Configuration Variables

#### Protection Configuration

| Variable                     | Type   | Default | Description                                         |
| ---------------------------- | ------ | ------- | --------------------------------------------------- |
| `Config_ContactProtectLevel` | Number | 1       | Protection level (1=Names, 2=Names+Other, 3=Record) |

#### Name Processing Configuration

| Variable                         | Type    | Default      | Description                          |
| -------------------------------- | ------- | ------------ | ------------------------------------ |
| `Config_ContactIgnoreFirstName`  | Boolean | false        | Skip first name processing           |
| `Config_ContactIgnoreLastName`   | Boolean | false        | Skip last name processing            |
| `Config_ContactIgnoreSalutation` | Boolean | false        | Skip salutation processing           |
| `Config_ContactDefaultLastName`  | String  | "\[Unknown]" | Default last name when none provided |
| `Config_ContactNameFirstCase`    | Number  | 0            | First name case transformation       |
| `Config_ContactNameLastCase`     | Number  | 0            | Last name case transformation        |

#### Field Processing Controls

| Variable                         | Type    | Default         | Description                               |
| -------------------------------- | ------- | --------------- | ----------------------------------------- |
| `Config_ContactIgnoreBirthday`   | Boolean | false           | Skip birthday processing                  |
| `Config_ContactIgnorePhone`      | Boolean | false           | Skip phone processing                     |
| `Config_ContactIgnoreEmail`      | Boolean | false           | Skip email processing                     |
| `Config_ContactIgnoreRecordType` | Boolean | false           | Skip record type processing               |
| `Config_ContactPersonAccountRT`  | String  | "PersonAccount" | Person Account record type developer name |

#### Address Configuration

| Variable                                  | Type    | Default | Description                                   |
| ----------------------------------------- | ------- | ------- | --------------------------------------------- |
| `Config_ContactAddressMailing`            | Boolean | true    | Use mailing vs. other address fields          |
| `Config_ContactIgnoreAddress`             | Boolean | false   | Skip all address processing                   |
| `Config_ContactIgnoreAddressWhenNotEmpty` | Boolean | false   | Skip address when existing data present       |
| `Config_ContactAddressOverwriteAll`       | Boolean | true    | Force overwrite all address fields            |
| `Config_ContactAddressQualityIndex`       | Number  | -       | Minimum address quality threshold             |
| `Config_ContactAddressQualityWriteNew`    | Boolean | false   | Ignore quality index when no existing address |

#### Address Case Transformation

| Variable                           | Type    | Default | Description                        |
| ---------------------------------- | ------- | ------- | ---------------------------------- |
| `Config_ContactAddressStreetCase`  | Number  | 0       | Street address case transformation |
| `Config_ContactAddressCityCase`    | Number  | 0       | City case transformation           |
| `Config_ContactAddressStateCase`   | Number  | 0       | State case transformation          |
| `Config_ContactAddressCountryCase` | Number  | 0       | Country case transformation        |
| `Config_AdvancedIgnoreMixedCase`   | Boolean | false   | Ignore mixed-case detection        |

## Output Variables

| Variable   | Type                        | Description                           |
| ---------- | --------------------------- | ------------------------------------- |
| `Record`   | Account SObject             | Fully processed Person Account record |
| `Logs`     | MoveDataLogEntry Collection | Processing logs                       |
| `LogsJSON` | String                      | JSON representation of logs           |

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

### 2. Record Type Processing

Handles Person Account record type assignment:

* **Configuration Check**: Skips if `Config_ContactIgnoreRecordType = true`
* **Existing Type**: Retains current record type if already set
* **Type Lookup**: Searches for record type by developer name
* **Assignment**: Sets Person Account record type when found
* **Error Logging**: Logs warnings when specified record type not found

### 3. Field Processing

Processes core contact fields with protection validation:

**Salutation Processing:**

* Skips if protected or configuration disabled
* Sets salutation when provided

**Name Processing:**

* Uses `movedata__SetValueComponent` for sophisticated name handling
* Applies case transformation based on configuration
* Respects name protection settings
* Provides default last name when none provided

**Birthday Processing:**

* Skips if configuration disabled
* Sets PersonBirthdate field when provided

**Phone Processing:**

* Trims phone to 40 characters maximum
* Skips if protected or configuration disabled

**Email Processing:**

* Trims email to 80 characters maximum
* Sets PersonEmail field
* Skips if protected or configuration disabled

### 4. Address Quality Assessment

Evaluates address data quality before processing:

* **Quality Index Check**: Compares against `Config_ContactAddressQualityIndex`
* **Below Threshold**: Logs quality concerns and may skip processing
* **Force Overwrite**: Evaluates `Config_ContactAddressOverwriteAll` setting
* **No Data Override**: Can ignore quality index when no existing address

### 5. Address Processing

Comprehensive address field processing with dual field support:

**Address Type Selection:**

* **Mailing**: Uses PersonMailing address fields when `Config_ContactAddressMailing` is true
* **Other**: Uses PersonOther address fields when `Config_ContactAddressMailing` is false

**Field-Level Processing:**

* **Street Address**: Trims to 255 characters, applies case transformation
* **City**: Trims to 40 characters, applies case transformation
* **State**: Trims to 80 characters, applies case transformation
* **Country**: Trims to 80 characters, applies case transformation
* **Postal Code**: Trims to 20 characters, converts to uppercase

**Advanced Logic:**

* **Ignore When Not Empty**: Skips fields with existing data if configured
* **Quality Index**: Respects minimum quality thresholds for each field
* **Force Overwrite**: Overwrites all fields when configured
* **Null Handling**: Sets fields to null when input data is empty

## Processing Flow

1. **Protection Assessment**: Evaluate contact protection requirements
2. **Protection Application**: Set appropriate protection flags and logging
3. **Record Type Processing**: Handle Person Account record type assignment
4. **Name and Field Processing**: Process salutation, names, birthday, phone, email
5. **Address Quality Assessment**: Evaluate address data quality
6. **Address Processing**: Comprehensive address field mapping with quality controls

## Dependencies

* `movedata__SetValueComponent` (Apex action)
* `movedata__WriteToLogFlowComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
