# Order Item Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Order\_Item\_Mapping\
**Label:** \[MoveData] Commerce: Order Item - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow handles the comprehensive mapping and transformation of commerce order item data from external platforms into Salesforce OpportunityLineItem records. It processes order items with price book entry relationships, pricing logic, and configurable fee handling.

## Purpose

The flow processes incoming order item data and maps it to appropriate Salesforce fields while handling:

* Fee type filtering with configurable exclusion of platform fees
* Currency determination for multi-currency environments
* Price book entry lookup and assignment for product relationships with enhanced error handling
* Opportunity relationship management for order items
* Pricing logic with support for both unit price and total price models
* Platform key assignment for external system tracking
* Quantity and pricing calculations

## Salesforce Fields

The flow interacts with multiple Salesforce objects and their fields. Below is a comprehensive mapping of all fields utilized:

| Object                  | Field API Name                        | Field Type                   | Purpose in Flow                 |
| ----------------------- | ------------------------------------- | ---------------------------- | ------------------------------- |
| **OpportunityLineItem** | Id                                    | ID                           | Primary record identifier       |
|                         | OpportunityId                         | Master-Detail to Opportunity | Links line item to parent order |
|                         | PricebookEntryId                      | Lookup to PricebookEntry     | Product pricing relationship    |
|                         | Quantity                              | Number                       | Item quantity                   |
|                         | UnitPrice                             | Currency                     | Price per unit                  |
|                         | TotalPrice                            | Currency                     | Total line item price           |
|                         | md_comm_pack__Platform_Key__c         | Text                         | External platform identifier    |
| **Product2**            | Id                                    | ID                           | Product record identifier       |
| **Opportunity**         | Id                                    | ID                           | Order record identifier         |
| **PricebookEntry**      | Id                                    | ID                           | Price book entry identifier     |
|                         | Product2Id                            | Lookup to Product2           | Product relationship            |
|                         | Pricebook2Id                          | Lookup to Pricebook2         | Price book relationship         |

## Input Variables

### Core Order Item Data

| Variable            | Type                        | Required | Description                                    |
| ------------------- | --------------------------- | -------- | ---------------------------------------------- |
| `Record`            | OpportunityLineItem SObject | Yes      | The OpportunityLineItem record being processed |
| `Catalog_Type`      | String                      | No       | Item type for fee filtering                    |
| `Quantity`          | Number                      | No       | Order item quantity                            |
| `UnitPrice`         | Currency                    | No       | Price per unit                                 |
| `Total`             | Currency                    | No       | Total line item price                          |
| `OrderTotal`        | Currency                    | No       | Total order amount                             |
| `PlatformKey`       | String                      | No       | Unique platform key for record matching        |
| `OrderCurrencyType` | String                      | No       | Currency code for order                        |

### Related Records

| Variable        | Type                | Description                  |
| --------------- | ------------------- | ---------------------------- |
| `CatalogRecord` | Product2 SObject    | Associated product           |
| `OrderRecord`   | Opportunity SObject | Associated order/opportunity |

### Platform Integration

| Variable              | Type   | Description            |
| --------------------- | ------ | ---------------------- |
| `StandardPriceBookId` | String | Standard price book ID |
| `PriceBookEntryId`    | String | Price book entry ID    |

### Configuration Variables

| Variable                               | Type    | Default | Description                                |
| -------------------------------------- | ------- | ------- | ------------------------------------------ |
| `Config_OrderTotalSubtractFeePlatform` | Boolean | false   | Exclude platform fee items from processing |

## Output Variables

| Variable   | Type                        | Description                             |
| ---------- | --------------------------- | --------------------------------------- |
| `Record`   | OpportunityLineItem SObject | Updated line item record                |
| `Continue` | Boolean                     | Flag indicating processing continuation |
| `Errors`   | String Collection           | Error messages from processing          |

## Flow Logic

### 1. Pre-Processing Validation

**Fee Type Filtering:**

* Checks if item type is "fee" and `Config_OrderTotalSubtractFeePlatform` is true
* Sets Continue flag and skips processing for excluded fee items
* Allows configurable exclusion of platform fee line items

### 2. Product Relationship Management

**Product Assignment:**

* Proceeds only if CatalogRecord (Product2) is provided
* Ensures proper product relationship for line item creation

**Currency Determination:**

* Uses CurrencyCodeComponent to determine appropriate currency
* Processes OrderCurrencyType input to standardize currency handling
* Supports multi-currency organizations

**Price Book Entry Lookup:**

* Uses GetPriceBookEntryFlowComponent with currency support
* Passes CurrencyCode, Pricebook2Id, and Product2Id parameters
* Enhanced error handling for missing price book entries
* Sets PricebookEntryId on the line item record when found
* Adds error to Errors collection if price book entry not found

### 3. Opportunity Relationship Processing

**Order Assignment:**

* Sets OpportunityId when OrderRecord is provided
* Links line item to parent opportunity/order
* Maintains order-item relationship structure

### 4. Pricing Logic Processing

The flow handles two distinct pricing models:

#### Unit Price Model

**Condition:** UnitPrice is provided and not null **Processing:**

* Sets Quantity field from input
* Sets UnitPrice field from input
* Allows Salesforce to calculate TotalPrice automatically

#### Total Price Model

**Condition:** Total is provided and not null **Processing:**

* Sets Quantity field from input
* Sets TotalPrice field from input
* Allows Salesforce to calculate UnitPrice automatically

**Default Behavior:**

* If neither UnitPrice nor Total is provided, proceeds without price assignment
* Maintains flexibility for different pricing scenarios

### 5. Platform Key Assignment

**Platform Key Processing:**

* Sets md_comm_pack__Platform_Key__c field with provided platform key
* Enables future matching and duplicate detection
* Supports external system integration

## Error Handling and Logging

### Comprehensive Error Tracking

**Error Categories:**

* Missing product relationships
* Price book entry lookup failures
* Invalid pricing data
* Configuration conflicts
* Currency determination issues

**Enhanced Error Collection:**

* Missing Pricebook Entry errors added to Errors collection
* Detailed error messages for troubleshooting
* Error collection supports multiple error scenarios

**Detailed Logging:**

* Fee exclusion reasoning
* Price book entry resolution
* Pricing model selection
* Processing decision points

## Dependencies

* CurrencyCodeComponent (movedata__CurrencyCodeComponent)
* GetPriceBookEntryFlowComponent