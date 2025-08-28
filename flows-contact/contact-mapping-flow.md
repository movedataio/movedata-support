# Contact Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Contact\_Mapping\
**Label:** \[MoveData] Donation: Contact - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow orchestrates the complete mapping and transformation of contact data from external donation platforms into Salesforce Contact records, with sophisticated protection mechanisms, address inheritance, and comprehensive data processing.

## Purpose

The flow provides complete contact mapping orchestration that:

* Implements multi-level protection for existing contact data
* Manages address inheritance from parent accounts
* Handles NPSP "Do Not Contact" flag management based on newsletter preferences
* Orchestrates contact detail processing and platform key management
* Supports both key contacts (actors) and general contacts

## Salesforce Fields

This flow interacts with the Salesforce Contact object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                      | Field Type          | Purpose in Flow                                  |
|------------------------------------|---------------------|--------------------------------------------------|
| Id                                 | ID                  | Unique record identifier                         |
| FirstName                          | Text (40)           | Contact's first name                             |
| LastName                           | Text (80)           | Contact's last name (required field)            |
| Salutation                         | Picklist            | Contact's title/salutation                       |
| Birthdate                          | Date                | Contact's birth date                             |
| Email                              | Email (80)          | Primary email address                            |
| Phone                              | Phone (40)          | Primary phone number                             |
| HomePhone                          | Phone (40)          | Home phone number                                |
| MobilePhone                        | Phone (40)          | Mobile phone number                              |
| AccountId                          | Lookup to Account   | Links contact to associated account              |
| MailingStreet                      | Textarea (255)      | Street address for mailing                       |
| MailingCity                        | Text (40)           | City for mailing address                         |
| MailingState                       | Text (80)           | State/Province for mailing address              |
| MailingCountry                     | Text (80)           | Country for mailing address                      |
| MailingPostalCode                  | Text (20)           | Postal/ZIP code for mailing address             |
| OtherStreet                        | Textarea (255)      | Alternative street address                       |
| OtherCity                          | Text (40)           | Alternative city address                         |
| OtherState                         | Text (80)           | Alternative state/province address               |
| OtherCountry                       | Text (80)           | Alternative country address                      |
| OtherPostalCode                    | Text (20)           | Alternative postal/ZIP code                      |
| npsp__Do_Not_Contact__c            | Checkbox            | Flags contacts who should not be contacted       |
| npe01__HomeEmail__c                | Email (80)          | Home email address (NPSP field)                 |
| npe01__WorkEmail__c                | Email (80)          | Work email address (NPSP field)                 |
| movedata__Protect_Name__c          | Checkbox            | Prevents automatic updates to contact names      |

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

### Parent Account Address Data

| Variable                                    | Type            | Description                   |
| ------------------------------------------- | --------------- | ----------------------------- |
| `ParentAccount`                             | Account SObject | Associated parent account     |
| `ParentAccount_MailingAddress_Street`       | String          | Account's street address      |
| `ParentAccount_MailingAddress_City`         | String          | Account's city                |
| `ParentAccount_MailingAddress_State`        | String          | Account's state               |
| `ParentAccount_MailingAddress_Country`      | String          | Account's country             |
| `ParentAccount_MailingAddress_Postcode`     | String          | Account's postal code         |
| `ParentAccount_MailingAddress_QualityIndex` | Number          | Account address quality score |

### Control and Classification Variables

| Variable         | Type    | Default | Description                                      |
| ---------------- | ------- | ------- | ------------------------------------------------ |
| `IsActor`        | Boolean | false   | Indicates if contact is a key contact/actor      |
| `Newsletter`     | Boolean | -       | Newsletter subscription preference               |
| `DuplicateCheck` | Boolean | false   | Indicates if this is during duplicate processing |
| `Platform`       | String  | Yes     | External platform identifier                     |
| `PlatformKey`    | String  | Yes     | External platform's contact identifier           |
| `Key`            | String  | No      | Additional key reference                         |

### Configuration Variables

#### Protection Configuration

| Variable                     | Type   | Default | Description                                         |
| ---------------------------- | ------ | ------- | --------------------------------------------------- |
| `Config_ContactProtectLevel` | Number | 1       | Protection level (1=Names, 2=Names+Other, 3=Record) |

#### Address Configuration

| Variable                              | Type    | Default | Description                                    |
| ------------------------------------- | ------- | ------- | ---------------------------------------------- |
| `Config_ContactAddressInheritAccount` | Boolean | false   | Enable address inheritance from parent account |
| `Config_ContactUseMailingAddress`     | Boolean | true    | Use mailing vs. other address fields           |
| `Config_ContactIgnoreDoNotContact`    | Boolean | false   | Skip Do Not Contact processing                 |

#### All Contact Detail Helper Configurations

The flow passes through all configuration variables to the [Contact Details Helper Flow](contact-details-helper-flow.md).

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

**Record Protection Check:**

* Checks if contact has `movedata__Protect_Name__c` flag set
* Determines protection level from configuration

**Protection Levels:**

* **Level 1**: Protect First Name and Last Name only
* **Level 2**: Protect Names + Email/Address/Phone
* **Level 3**: Protect entire record (skip all processing)

### 2. Key Contact Processing

For contacts identified as key contacts (`IsActor = true`):

**NPSP Do Not Contact Management:**

* **Newsletter = true**: Sets `npsp__Do_Not_Contact__c = false`
* **Newsletter = false**: Sets `npsp__Do_Not_Contact__c = true`
* **Configuration Override**: Can be disabled via `Config_ContactIgnoreDoNotContact`

### 3. Address Source Determination

The flow intelligently determines the best address source:

#### Address Inheritance Logic

When `Config_ContactAddressInheritAccount = true`:

* **Contact has no address** AND **Account has address**: Uses account address
* **Contact has address**: Uses contact address
* **Neither has address**: No address processing

#### Address Source Selection

1. **Account Address**: When inheritance conditions are met
   * Copies all address fields from parent account
   * Inherits account's address quality score
   * Logs: "Inherit Address from Account = true"
2. **Contact Address**: Default behavior
   * Uses provided contact address fields
   * Uses contact's quality score

### 4. Contact Details Processing

Calls the Contact Details Helper subflow with:

* All configuration variables passed through
* Determined address values (either from contact or account)
* Protection flags set based on protection level
* All contact data fields

## Processing Flow

1. **Protection Assessment**: Evaluate contact protection requirements
2. **Protection Application**: Set appropriate protection flags and logging
3. **Key Contact Processing**: Handle NPSP Do Not Contact for key contacts
4. **Address Source Resolution**: Determine best address source (contact vs account)
5. **Address Inheritance**: Copy account address if inheritance is enabled
6. **Contact Details Processing**: Call helper subflow for complete data transformation

## Dependencies

* [`MoveData_Donation_Helper_Set_Contact_Details`](contact-details-helper-flow.md) (Subflow)
* [`MoveData_Donation_Helper_Set_Contact_Platform_Key`](contact-platform-key-helper-flow.md) (Subflow)
* `movedata__WriteToLogFlowComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
