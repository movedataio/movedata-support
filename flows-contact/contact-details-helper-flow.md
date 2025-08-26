# Contact Details Helper Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Helper\_Set\_Contact\_Details\
**Label:** \[MoveData] Donation: Helper - Set Contact Details\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This comprehensive helper flow handles the transformation and validation of contact data from external platforms, with sophisticated data quality controls, field formatting, and address processing capabilities.

## Purpose

The flow provides complete contact data processing that:

* Validates and formats contact names with case transformation
* Handles phone number formatting and type classification
* Processes email addresses with type-specific mapping
* Implements sophisticated address quality scoring and validation
* Supports both Mailing and Other address field sets
* Includes protection mechanisms to preserve existing data

## Input Variables

### Core Contact Data

| Variable     | Type            | Required | Description                                  |
| ------------ | --------------- | -------- | -------------------------------------------- |
| `Record`     | Contact SObject | Yes      | The Contact record being processed           |
| `Salutation` | String          | No       | Contact salutation/title                     |
| `FirstName`  | String          | No       | Contact's first name                         |
| `LastName`   | String          | No       | Contact's last name                          |
| `Birthday`   | Date            | No       | Contact's birth date                         |
| `Email`      | String          | No       | Contact's email address                      |
| `EmailType`  | String          | No       | Email type classification (work/home)        |
| `Phone`      | String          | No       | Contact's phone number                       |
| `PhoneType`  | String          | No       | Phone type classification (mobile/work/home) |

### Address Data

| Variable                      | Type    | Description                                          |
| ----------------------------- | ------- | ---------------------------------------------------- |
| `MailingAddress_Street`       | String  | Street address                                       |
| `MailingAddress_City`         | String  | City                                                 |
| `MailingAddress_State`        | String  | State/Province                                       |
| `MailingAddress_Country`      | String  | Country                                              |
| `MailingAddress_Postcode`     | String  | Postal/ZIP code                                      |
| `MailingAddress_QualityIndex` | Number  | Data quality score (0-100)                           |
| `Use_Mailing_Address`         | Boolean | Use mailing vs. other address fields (Default: true) |

### Configuration Variables

#### Name Processing

| Variable                         | Type    | Default | Description                    |
| -------------------------------- | ------- | ------- | ------------------------------ |
| `Config_ContactIgnoreFirstName`  | Boolean | false   | Skip first name processing     |
| `Config_ContactIgnoreLastName`   | Boolean | false   | Skip last name processing      |
| `Config_ContactIgnoreSalutation` | Boolean | false   | Skip salutation processing     |
| `Config_ContactNameFirstCase`    | Number  | 0       | First name case transformation |
| `Config_ContactNameLastCase`     | Number  | 0       | Last name case transformation  |

#### Communication Processing

| Variable                           | Type    | Default | Description                   |
| ---------------------------------- | ------- | ------- | ----------------------------- |
| `Config_ContactIgnoreEmail`        | Boolean | -       | Skip email processing         |
| `Config_ContactIgnorePhone`        | Boolean | -       | Skip phone processing         |
| `Config_ContactPhoneTransform`     | Boolean | false   | Enable phone formatting       |
| `Config_ContactPhoneTransformE164` | Boolean | false   | Use E164 international format |
| `Config_ContactPhoneTransformSep`  | String  | -       | Phone number separator        |

#### Address Processing

| Variable                                  | Type    | Default | Description                        |
| ----------------------------------------- | ------- | ------- | ---------------------------------- |
| `Config_ContactIgnoreAddress`             | Boolean | -       | Skip all address processing        |
| `Config_ContactIgnoreAddressWhenNotEmpty` | Boolean | false   | Skip when existing data present    |
| `Config_ContactAddressOverwriteAll`       | Boolean | true    | Force overwrite existing addresses |
| `Config_ContactAddressQualityIndex`       | Number  | -       | Minimum quality threshold (0-100)  |
| `Config_ContactAddressQualityWriteNew`    | Boolean | false   | Write when no existing address     |
| `Config_ContactPostcodeTransform`         | Boolean | false   | Enable postcode formatting         |

#### Case Transformation

| Variable                           | Type    | Default | Description                 |
| ---------------------------------- | ------- | ------- | --------------------------- |
| `Config_ContactAddressCityCase`    | Number  | 0       | City case transformation    |
| `Config_ContactAddressStateCase`   | Number  | 0       | State case transformation   |
| `Config_ContactAddressStreetCase`  | Number  | 0       | Street case transformation  |
| `Config_ContactAddressCountryCase` | Number  | 0       | Country case transformation |
| `Config_AdvancedIgnoreMixedCase`   | Boolean | false   | Ignore mixed-case detection |

## Output Variables

| Variable   | Type                        | Description                                |
| ---------- | --------------------------- | ------------------------------------------ |
| `Record`   | Contact SObject             | Updated contact record with processed data |
| `Logs`     | MoveDataLogEntry Collection | Processing logs for quality tracking       |
| `LogsJSON` | String                      | JSON representation of processing logs     |

## Flow Logic

### 1. Name Processing

The flow processes contact names with protection and formatting:

* **Salutation**: Sets contact salutation with configurable case transformation
* **First Name**: Handles first name with length validation (40 chars max)
* **Last Name**: Processes last name with fallback to "\[Unknown]" if missing

### 2. Birthday and Phone Processing

* **Birthday**: Sets birthdate if provided
* **Phone Formatting**: Optional phone number transformation with international formatting
* **Phone Type Classification**: Routes phone to appropriate field based on type:
  * Mobile: Australian number detection (04, +61 4, +614 patterns)
  * Work: Business phone classification
  * Home: Residential phone classification
  * Default: Falls back to mobile classification

### 3. Email Processing

Email handling with type-specific routing:

* **Work Email**: Routes to standard Email field and NPSP Work Email
* **Home Email**: Routes to standard Email field and NPSP Home Email
* **Default**: Uses standard Email field
* **NPSP Integration**: Populates `npe01__WorkEmail__c` and `npe01__HomeEmail__c`

### 4. Address Quality Assessment

Sophisticated address quality system:

* **Quality Index Scoring**: Compares incoming data quality score against threshold
* **Existing Data Detection**: Checks for existing address field values
* **Force Overwrite Logic**: Configurable forced overwriting of existing addresses
* **Quality-Based Decisions**: Skips updates for low-quality data

### 5. Address Field Processing

Dual address support with smart field routing:

#### Address Field Selection

* **Mailing Address**: Primary address fields (MailingStreet, MailingCity, etc.)
* **Other Address**: Secondary address fields (OtherStreet, OtherCity, etc.)
* **Field Selection**: Based on `Use_Mailing_Address` configuration

#### Address Validation Rules

Each address component includes:

* **Null Value Handling**: Sets fields to NULL when no data provided
* **Length Trimming**: Enforces Salesforce field length limits
* **Case Transformation**: Configurable case formatting
* **Quality Thresholds**: Respects address quality scoring
* **Existing Data Protection**: Optional preservation of existing values

## Data Quality Features

### Protection Mechanisms

* **Field-Level Protection**: Protect names and other field flags
* **Conditional Updates**: Quality-based update decisions
* **Existing Data Preservation**: Configurable protection of existing values

### Quality Scoring

* **Address Quality Index**: 0-100 scoring system for address data quality
* **Threshold Enforcement**: Configurable minimum quality requirements
* **Quality-Based Routing**: Different handling based on data quality scores

### Logging and Auditing

* **Comprehensive Logging**: Tracks all processing decisions
* **Quality Decisions**: Logs address quality assessments
* **Force Overwrite Tracking**: Logs when data is forcibly overwritten
* **Configuration Logging**: Records configuration values used

## Australian Phone Number Support

Special handling for Australian phone numbers:

* **Mobile Detection**: Recognises 04, +61 4, 4, +614 patterns
* **Automatic Classification**: Routes Australian mobiles to MobilePhone field
* **Format Preservation**: Maintains original formatting when appropriate

## Error Handling

* **Null Value Management**: Graceful handling of empty/null values
* **Length Enforcement**: Automatic field length compliance
* **Quality Thresholds**: Skips processing for below-threshold data
* **Protection Respect**: Honors all data protection flags

## Dependencies

* `movedata__SetValueComponent` (Apex action)
* `movedata__PhoneNumberFormatterComponent` (Apex action)
* `movedata__PostcodeFormatterComponent` (Apex action)
* `movedata__WriteToLogFlowComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
