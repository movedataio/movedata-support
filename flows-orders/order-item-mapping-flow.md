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

This flow handles the comprehensive mapping and transformation of commerce order item data from external platforms into Salesforce OpportunityLineItem records. It processes order items with price book entry relationships, pricing logic, and opportunity associations.

## Purpose

The flow processes incoming order item data and maps it to appropriate Salesforce fields while handling:

* Product relationship management through price book entries
* Opportunity relationship assignment for order items
* Flexible pricing logic with support for both unit price and total price models
* Platform key assignment for external system tracking
* Quantity and pricing calculations

## Salesforce Fields

The flow interacts with multiple Salesforce objects and their fields. Below is a comprehensive mapping of all fields utilized:

| Object                  | Field API Name     | Field Type                   | Purpose in Flow                 |
| ----------------------- | ------------------ | ---------------------------- | ------------------------------- |
| **OpportunityLineItem** | Id                 | ID                           | Primary record identifier       |
|                         | OpportunityId      | Master-Detail to Opportunity | Links line item to parent order |
|                         | PricebookEntryId   | Lookup to PricebookEntry     | Product pricing relationship    |
|                         | Quantity           | Number                       | Item quantity                   |
|                         | UnitPrice          | Currency                     | Price per unit                  |
|                         | TotalPrice         | Currency                     | Total line item price           |
|                         | Platform\_Key\_\_c | Text                         | External platform identifier    |
| **Product2**            | Id                 | ID                           | Product record identifier       |
| **Opportunity**         | Id                 | ID                           | Order record identifier         |
| **PricebookEntry**      | Id                 | ID                           | Price book entry identifier     |
|                         | Product2Id         | Lookup to Product2           | Product relationship            |
|                         | Pricebook2Id       | Lookup to Pricebook2         | Price book relationship         |

## Input Variables

### Core Order Item Data

| Variable      | Type                        | Required | Description                                    |
| ------------- | --------------------------- | -------- | ---------------------------------------------- |
| `Record`      | OpportunityLineItem SObject | Yes      | The OpportunityLineItem record being processed |
| `Quantity`    | Number                      | No       | Order item quantity                            |
| `UnitPrice`   | Currency                    | No       | Price per unit                                 |
| `Total`       | Currency                    | No       | Total line item price                          |
| `OrderTotal`  | Currency                    | No       | Total order amount                             |
| `PlatformKey` | String                      | No       | Unique platform key for record matching        |

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

## Output Variables

| Variable | Type                        | Description              |
| -------- | --------------------------- | ------------------------ |
| `Record` | OpportunityLineItem SObject | Updated line item record |

## Flow Logic

### 1. Product Relationship Management

**Product Assignment:**

* Proceeds only if CatalogRecord (Product2) is provided
* Ensures proper product relationship for line item creation

**Price Book Entry Lookup:**

* Queries PricebookEntry where Product2Id matches CatalogRecord.Id
* Filters by StandardPriceBookId for price book consistency
* Uses `getFirstRecordOnly=true` for single entry retrieval
* Sets PricebookEntryId on the line item record

### 2. Opportunity Relationship Processing

**Order Assignment:**

* Sets OpportunityId when OrderRecord is provided
* Links line item to parent opportunity/order
* Maintains order-item relationship structure

### 3. Pricing Logic Processing

The flow handles two distinct pricing models:

#### Unit Price Model

**Condition:** UnitPrice is provided and not null

**Processing:**

* Sets Quantity field from input
* Sets UnitPrice field from input
* Allows Salesforce to calculate TotalPrice automatically

#### Total Price Model

**Condition:** Total is provided and not null

**Processing:**

* Sets Quantity field from input
* Sets TotalPrice field from input
* Allows Salesforce to calculate UnitPrice automatically

**Default Behavior:**

* If neither UnitPrice nor Total is provided, proceeds without price assignment
* Maintains flexibility for different pricing scenarios

### 4. Platform Key Assignment

**Platform Key Processing:**

* Sets Platform\_Key\_\_c field with provided platform key
* Enables future matching and duplicate detection
* Supports external system integration

## Formulas

### Price Book ID Calculation

**Formula Name:** `CalculatedPriceBookId`

**Expression:** `StandardPriceBookId`

**Purpose:** Provides a standardized reference to the price book ID for consistent price book entry lookups.

## Price Book Entry Requirements

### Prerequisites

**Product Relationship:**

* CatalogRecord must be provided with valid Product2.Id
* Product must exist in Salesforce before line item creation

**Price Book Configuration:**

* StandardPriceBookId must reference an active price book
* Product must have a corresponding PricebookEntry in the standard price book
* Price book entry must be active for successful lookup

### Lookup Logic

**Query Parameters:**

* **Product2Id**: Matches CatalogRecord.Id
* **Pricebook2Id**: Matches StandardPriceBookId
* **Record Selection**: First matching record only

**Error Handling:**

* Uses `assignNullValuesIfNoRecordsFound=false` requiring valid price book entry
* Flow will fail if no matching price book entry exists
* Ensures data integrity for commerce transactions

## Error Handling

### Missing Data Scenarios

* **No Product**: Flow skips price book entry lookup and proceeds to opportunity assignment
* **No Price Book Entry**: Flow fails with error if product provided but no price book entry found
* **No Opportunity**: Flow proceeds without setting OpportunityId

### Data Quality Validation

The flow handles various data quality issues:

* **Null Values**: Graceful handling of missing optional parameters
* **Pricing Flexibility**: Supports different pricing models from external platforms
* **Relationship Integrity**: Ensures proper product-price book relationships

## Dependencies

**Salesforce Objects:**

* Product2 (input record for product relationship)
* Opportunity (input record for order relationship)
* PricebookEntry (queried for product pricing)

**System Requirements:**

* Active Standard Price Book in organization
* Valid PricebookEntry records for all products
* Appropriate permissions for OpportunityLineItem management
