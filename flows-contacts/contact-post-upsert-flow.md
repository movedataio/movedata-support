# Contact Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Contact\_Post\
**Label:** \[MoveData] General: Contact - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after account records are created or updated, including platform key association and account-contact relationship establishment. The flow operates in the context of account processing but creates contact relationships and manages platform key associations.

## Purpose

The flow performs post-upsert operations that:

* Creates platform key associations linking accounts to external platform identifiers
* Establishes account-contact relationships with configurable roles
* Provides configurable platform key processing with disable options
* Supports business relationship management through AccountContactRelation objects
* Implements comprehensive error handling for platform key creation failures

## Salesforce Fields

This flow interacts with the Salesforce Account, Contact, and AccountContactRelation objects. Below is a mapping of all fields utilized:

| Object                     | Field API Name | Field Type        | Purpose in Flow                           |
| -------------------------- | -------------- | ----------------- | ----------------------------------------- |
| **Account**                | Id             | ID                | Primary account record identifier         |
| **Contact**                | Id             | ID                | Associated contact record identifier      |
|                            | AccountId      | Lookup to Account | Links contact to the account              |
| **AccountContactRelation** | Id             | ID                | Relationship record identifier            |
|                            | AccountId      | Lookup to Account | Account side of the relationship          |
|                            | ContactId      | Lookup to Contact | Contact side of the relationship          |
|                            | Roles          | Picklist          | Business relationship role classification |

## Input Variables

### Core Record Data

| Variable        | Type            | Required | Description                                   |
| --------------- | --------------- | -------- | --------------------------------------------- |
| `Record`        | Account SObject | Yes      | The Account record that was created/updated   |
| `ParentAccount` | Account SObject | No       | Parent account for relationship establishment |
| `Platform`      | String          | Yes      | External platform identifier                  |
| `PlatformKey`   | String          | Yes      | External platform's account identifier        |

### Configuration Variables

| Variable                            | Type    | Default         | Description                                    |
| ----------------------------------- | ------- | --------------- | ---------------------------------------------- |
| `Config_ContactDisablePlatformKey`  | Boolean | false           | Completely disable platform key processing     |
| `Config_AccountRelationshipDefault` | String  | "Business User" | Default role for account-contact relationships |

## Output Variables

| Variable   | Type              | Description                             |
| ---------- | ----------------- | --------------------------------------- |
| `Errors`   | String Collection | Collection of errors from processing    |
| `Logs`     | Apex Collection   | MoveDataLogEntry collection for logging |
| `LogsJSON` | String            | JSON serialized version of logs         |

## Flow Logic

### 1. Parent Account Validation

The flow begins by checking if a parent account is provided:

* **Condition**: Validates `ParentAccount` is not null and has a valid ID
* **Path Selection**: Determines whether to proceed with relationship creation or skip to platform key processing

### 2. Contact Record Retrieval

When a parent account exists:

* **Query**: Looks up contact records where `AccountId` equals the main record ID
* **Purpose**: Finds existing contacts associated with the account for relationship establishment
* **Result**: Single contact record for relationship processing

### 3. Account-Contact Relationship Management

#### Existing Relationship Check

* **Query**: Searches for existing `AccountContactRelation` records
* **Filters**:
  * `AccountId` equals parent account ID
  * `ContactId` equals found contact ID
* **Purpose**: Prevents duplicate relationship creation

#### Relationship Creation

When no existing relationship exists:

* **Object**: Creates new `AccountContactRelation` record
* **Fields**:
  * `AccountId`: Set to parent account ID
  * `ContactId`: Set to retrieved contact ID
  * `Roles`: Set to configured default role value
* **Business Rule**: Establishes formal business relationship between account and contact

### 4. Platform Key Association

#### Configuration Check

* **Condition**: Verifies `Config_ContactDisablePlatformKey` is not true
* **Purpose**: Allows complete bypassing of platform key processing when disabled

#### Platform Key Validation

* **Conditions**:
  * `Platform` is not null
  * `PlatformKey` is not null
* **Purpose**: Ensures required data exists before attempting platform key creation

#### Platform Key Creation

* **Component**: Uses `movedata__PlatformKeyCreateComponent` Apex action
* **Parameters**:
  * `ObjectId`: The account record ID
  * `Platform`: External platform identifier
  * `PlatformKey`: Platform-specific account identifier
  * `ErrorIfDifferentObjectId`: Set to true for validation
* **Error Handling**: Captures creation failures and adds to error collection

## Processing Flow

1. **Parent Account Check**: Validate parent account availability
2. **Contact Retrieval**: Find associated contact record
3. **Relationship Assessment**: Check for existing account-contact relationships
4. **Relationship Creation**: Create new relationships when needed
5. **Platform Key Processing**: Create platform key associations (if enabled)
6. **Error Collection**: Capture and report any processing failures

## Configuration Options

### Platform Key Control

* **Complete Disable**: `Config_ContactDisablePlatformKey = true` skips all platform key processing
* **Relationship Role**: `Config_AccountRelationshipDefault` sets the business role for new relationships

### Business Relationship Roles

The default role "Business User" can be customized to reflect organizational relationship types:

* Standard business contact relationships
* Vendor/supplier relationships
* Partner/alliance relationships
* Customer/client relationships

## Error Handling

### Platform Key Error Management

* **Error Collection**: Platform key creation failures are captured in `Errors` collection
* **Fault Tolerance**: Processing continues even if platform key creation fails
* **Error Attribution**: Errors include specific details about platform key creation failures

### Error Scenarios

Common error conditions handled:

* **Duplicate Platform Keys**: When platform key already exists for different record
* **Invalid Platform Configuration**: When platform settings are misconfigured
* **Record Access Issues**: When insufficient permissions exist for relationship creation

## Dependencies

* `movedata__PlatformKeyCreateComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
