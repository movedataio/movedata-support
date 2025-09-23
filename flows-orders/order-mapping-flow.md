# Order Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Order\_Mapping\
**Label:** \[MoveData] Commerce: Order - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow handles the comprehensive mapping and transformation of commerce order data from external platforms into Salesforce NPSP-enabled Opportunity records. It processes orders with configurable offline order handling, price book management, and comprehensive fee tracking.

## Purpose

The flow processes incoming order data and maps it to appropriate Salesforce NPSP fields while handling:

* Order status processing with configurable offline order handling
* Customer relationship management (Contact/Account assignment)
* Price book assignment and validation
* Date conversions and close date management
* Fee tracking across multiple fee types (platform, gateway, taxes)
* Currency setting and NPSP field integration
* Order naming and description processing

## Salesforce Fields

The flow interacts with multiple Salesforce objects and their fields. Below is a comprehensive mapping of all fields utilized:

| Object          | Field API Name                            | Field Type           | Purpose in Flow                   |
| --------------- | ----------------------------------------- | -------------------- | --------------------------------- |
| **Opportunity** | Id                                        | ID                   | Primary record identifier         |
|                 | Name                                      | Text (120)           | Order name                        |
|                 | StageName                                 | Picklist             | Order stage assignment            |
|                 | CloseDate                                 | Date                 | Transaction/completion date       |
|                 | Description                               | Long Text Area       | Order description                 |
|                 | AccountId                                 | Lookup to Account    | Associated account relationship   |
|                 | CampaignId                                | Lookup to Campaign   | Campaign association              |
|                 | Pricebook2Id                              | Lookup to Pricebook2 | Price book assignment             |
|                 | RecordTypeId                              | Lookup to RecordType | Order record type assignment      |
|                 | CurrencyIsoCode                           | Picklist             | Order currency                    |
|                 | npsp\_\_Primary\_Contact\_\_c             | Lookup to Contact    | NPSP primary contact relationship |
|                 | movedata\_\_Platform\_Key\_\_c            | Text                 | External platform identifier      |
|                 | md\_npsp\_pack\_\_Fee\_\_c                | Currency             | Aggregate processing fees         |
|                 | md\_npsp\_pack\_\_Gateway\_Fee\_\_c       | Currency             | Payment processor charges         |
|                 | md\_npsp\_pack\_\_Platform\_Fee\_\_c      | Currency             | Commerce platform charges         |
|                 | md\_npsp\_pack\_\_Tax\_\_c                | Currency             | Overall tax amounts               |
|                 | md\_npsp\_pack\_\_Gateway\_Fee\_Tax\_\_c  | Currency             | Tax on gateway charges            |
|                 | md\_npsp\_pack\_\_Platform\_Fee\_Tax\_\_c | Currency             | Tax on platform charges           |
|                 | md\_npsp\_pack\_\_Receipt\_Number\_\_c    | Text (50)            | Order receipt number              |
| **Contact**     | Id                                        | ID                   | Contact record identifier         |
|                 | AccountId                                 | Lookup to Account    | Account relationship resolution   |
| **Account**     | Id                                        | ID                   | Account record identifier         |
| **Campaign**    | Id                                        | ID                   | Campaign record identifier        |

## Input Variables

### Core Order Data

| Variable        | Type                | Required | Description                              |
| --------------- | ------------------- | -------- | ---------------------------------------- |
| `Record`        | Opportunity SObject | Yes      | The Opportunity record being processed   |
| `OrderName`     | String              | No       | Order name from external platform        |
| `Status`        | String              | No       | External platform status (offline/other) |
| `Description`   | String              | No       | Order description                        |
| `ReceiptNumber` | String              | No       | External receipt or transaction number   |
| `CreatedAt`     | DateTime            | No       | Order/transaction date                   |
| `Code`          | String              | No       | Order code identifier                    |
| `CurrencyType`  | String              | No       | Currency code                            |
| `Processor`     | String              | No       | Payment processor identifier             |

### Related Records

| Variable         | Type             | Description                      |
| ---------------- | ---------------- | -------------------------------- |
| `PrimaryContact` | Contact SObject  | Primary contact for the order    |
| `PrimaryAccount` | Account SObject  | Associated account for the order |
| `OrderCampaign`  | Campaign SObject | Associated campaign              |

### Platform Integration

| Variable              | Type   | Description                             |
| --------------------- | ------ | --------------------------------------- |
| `PlatformKey`         | String | Unique platform key for record matching |
| `OrderRecordTypeId`   | String | Record type ID for orders               |
| `StandardPriceBookId` | String | Standard price book ID                  |

### Fee Structure

| Variable      | Type     | Description                      |
| ------------- | -------- | -------------------------------- |
| `Fee`         | Currency | General fee amount               |
| `FeePlatform` | Currency | Platform-specific processing fee |
| `FeeGateway`  | Currency | Payment gateway processing fee   |
| `Tax`         | Currency | General tax amount               |
| `TaxPlatform` | Currency | Tax on platform fees             |
| `TaxGateway`  | Currency | Tax on gateway fees              |

### Configuration Variables

| Variable                       | Type    | Default       | Description                   |
| ------------------------------ | ------- | ------------- | ----------------------------- |
| `Config_OrderProcessOffline`   | Boolean | false         | Process offline orders        |
| `Config_OrderSetDescription`   | Boolean | true          | Set description from message  |
| `Config_OrderStageNameDefault` | String  | "Prospecting" | Default stage name for orders |

## Output Variables

| Variable   | Type                | Description                             |
| ---------- | ------------------- | --------------------------------------- |
| `Record`   | Opportunity SObject | Updated opportunity record              |
| `Cancel`   | Boolean             | Flag indicating processing cancellation |
| `Errors`   | String\[]           | Collection of error messages            |
| `Logs`     | MoveDataLogEntry\[] | Processing logs                         |
| `LogsJSON` | String              | JSON representation of processing logs  |

## Flow Logic

### 1. Pre-Processing Validation

**Offline Order Handling:**

* Checks if status is "offline" and `Config_OrderProcessOffline` is false
* Logs skip reason and sets Cancel flag to terminate processing
* Allows configurable processing of offline orders

### 2. Customer Relationship Management

**Customer Priority Resolution:**

1. **Direct Assignment**: Uses provided PrimaryContact or PrimaryAccount
2. **Account Resolution**: Determines AccountId from contact relationship
3. **Account Lookup**: Queries contact record if AccountId not directly available

**Account ID Resolution Logic:**

* If PrimaryAccount exists: Uses PrimaryAccount.Id
* If PrimaryContact has AccountId: Uses PrimaryContact.AccountId
* If neither: Looks up Contact record to get AccountId

### 3. Order Name and Price Book Processing

**New Record Processing:**

* Sets order name from OrderName input for new records only
* Prevents overwriting names on existing records

**Price Book Assignment:**

* Uses existing Pricebook2Id if already set
* Falls back to StandardPriceBookId if configured
* Logs error if no active Standard Price Book available

### 4. Date and Currency Processing

**Close Date Assignment:**

* **CreatedAt Date**: Converts CreatedAt to local date if provided
* **Current Date**: Uses current date as fallback

**Currency Setting:**

* Determines currency using `CurrencyCodeComponent`
* Validates currency code length before setting CurrencyIsoCode
* Sets CurrencyIsoCode using `SetValueComponent` only when valid currency provided
* Ensures consistent currency handling across multi-currency orgs

### 5. Stage Assignment

**Stage Processing:**

* Preserves existing StageName if already set
* Uses `Config_OrderStageNameDefault` ("Prospecting") as fallback
* Supports configurable default stage assignment

### 6. Contact and Account Assignment

**NPSP Primary Contact:**

* Sets `npsp__Primary_Contact__c` when PrimaryContact provided
* Enables NPSP contact role and relationship processing

**Account Relationship:**

* Sets AccountId from resolved PrimaryAccountId
* Maintains account-opportunity relationships

### 7. Fee Processing

The flow processes comprehensive fee structure:

**Fee Categories:**

* **General Fee**: `md_npsp_pack__Fee__c`
* **Platform Fee**: `md_npsp_pack__Platform_Fee__c`
* **Gateway Fee**: `md_npsp_pack__Gateway_Fee__c`
* **General Tax**: `md_npsp_pack__Tax__c`
* **Platform Tax**: `md_npsp_pack__Platform_Fee_Tax__c`
* **Gateway Tax**: `md_npsp_pack__Gateway_Fee_Tax__c`

**Fee Assignment Logic:**

Each fee type follows conditional assignment:

* Only sets field if corresponding input variable is not null
* Uses `SetValueComponent` for proper NPSP field handling

### 8. Description and Campaign Processing

**Description Assignment:**

* Sets Description field when provided and `Config_OrderSetDescription` is true
* Preserves existing descriptions when configuration disabled

**Campaign Association:**

* Sets CampaignId when OrderCampaign provided
* Enables campaign attribution and reporting

### 9. Receipt Number and Record Type

**Receipt Number:**

* Sets `md_npsp_pack__Receipt_Number__c` when provided
* Maintains external receipt tracking

**Record Type Assignment:**

* Sets RecordTypeId when OrderRecordTypeId provided
* Enables proper record type categorization

### 10. Final Platform Key Assignment

**Platform Key Processing:**

* Sets `movedata__Platform_Key__c` for future matching
* Enables duplicate detection and record updates

## Error Handling and Logging

### Comprehensive Error Tracking

**Error Categories:**

* Missing Standard Price Book
* Account resolution failures
* Currency conflicts

**Detailed Logging:**

* Offline order skip reasons
* Processing decision points
* Fee assignment tracking

## Dependencies

### Apex Components

* **movedata\_\_ConvertToLocalDateFlowComponent**: Date timezone conversion
* **movedata\_\_CurrencyCodeComponent**: Currency determination
* **movedata\_\_SetValueComponent**: Dynamic field assignment
* **movedata\_\_WriteToLogFlowComponent**: Comprehensive logging