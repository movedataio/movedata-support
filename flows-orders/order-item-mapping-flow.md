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
* Currency determination and multi-currency support
* Fee skipping logic based on configuration settings
* Error handling and reporting

## Salesforce Fields

The flow interacts with multiple Salesforce objects and their fields. Below is a comprehensive mapping of all fields utilized:

| Object                  | Field API Name                      | Field Type                   | Purpose in Flow                 |
| ----------------------- | ----------------------------------- | ---------------------------- | ------------------------------- |
| **OpportunityLineItem** | Id                                  | ID                           | Primary record identifier       |
|                         | OpportunityId                       | Master-Detail to Opportunity | Links line item to parent order |
|                         | PricebookEntryId                    | Lookup to PricebookEntry     | Product pricing relationship    |
|                         | Quantity                            | Number                       | Item quantity                   |
|                         | UnitPrice                           | Currency                     | Price per unit                  |
|                         | TotalPrice                          | Currency                     | Total line item price           |
|                         | md_npc_pack__Platform_Key__c        | Text                         | External platform identifier    |
| **Product2**            | Id                                  | ID                           | Product record identifier       |
| **Opportunity**         | Id                                  | ID                           | Order record identifier         |
| **PricebookEntry**      | Id                                  | ID                           | Price book entry identifier     |
|                         | Product2Id                          | Lookup to Product2           | Product relationship            |
|                         | Pricebook2Id                        | Lookup to Pricebook2         | Price book relationship         |

## Input Variables

### Core Order Item Data

| Variable                                | Type                        | Required | Description                                    |
| --------------------------------------- | --------------------------- | -------- | ---------------------------------------------- |
| `Record`                                | OpportunityLineItem SObject | Yes      | The OpportunityLineItem record being processed |
| `Quantity`                              | Number                      | No       | Order item quantity                            |
| `UnitPrice`                             | Currency                    | No       | Price per unit                                 |
| `Total`                                 | Currency                    | No       | Total line item price                          |
| `OrderTotal`                            | Currency                    | No       | Total order amount                             |
| `PlatformKey`                           | String                      | No       | Unique platform key for record matching        |
| `Catalog_Type`                          | String                      | No       | Type of catalog item (e.g., "fee")             |
| `OrderCurrencyType`                     | String                      | No       | Currency code for the order                    |
| `Config_OrderTotalSubtractFeePlatform`  | Boolean                     | No       | Configuration to skip fee items                |

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

| Variable   | Type                        | Description              |
| ---------- | --------------------------- | ------------------------ |
| `Record`   | OpportunityLineItem SObject | Updated line item record |
| `Continue` | Boolean                     | Whether to continue processing |
| `Errors`   | String Collection           | Collection of error messages |

## Flow Logic

### 1. Fee Skipping Logic

**Fee Evaluation:**
* Checks if `Config_OrderTotalSubtractFeePlatform` is true
* Evaluates if `Catalog_Type` equals "fee"
* If both conditions are met, sets `Continue` to true and skips processing
* Otherwise, proceeds to product relationship management

### 2. Product Relationship Management

**Product Assignment:**

* Proceeds only if CatalogRecord (Product2) is provided
* Ensures proper product relationship for line item creation

**Currency Determination:**

* Calls `movedata__CurrencyCodeComponent` Apex action to determine currency
* Processes `OrderCurrencyType` input parameter
* Returns standardized currency code for price book entry lookup

**Price Book Entry Retrieval:**

* Calls `GetPriceBookEntryFlowComponent` Apex action instead of direct SOQL lookup
* Passes CurrencyCode, Pricebook2Id, and Product2Id parameters
* Handles multi-currency scenarios through Apex component
* Returns PricebookEntry record for assignment

**Error Handling:**

* Evaluates if PricebookEntry was found
* If no entry found, adds error message to `Errors` collection
* Error message: "Could not find a Pricebook Entry."
* If found, sets PricebookEntryId on the line item record

### 3. Opportunity Relationship Processing

**Order Assignment:**

* Sets OpportunityId when OrderRecord is provided
* Links line item to parent opportunity/order
* Maintains order-item relationship structure

### 4. Pricing Logic Processing

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

### 5. Platform Key Assignment

**Platform Key Processing:**

* Sets md_npc_pack__Platform_Key__c field with provided platform key
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
* Currency must match between order and price book entry

### Lookup Logic

**Action Call Parameters:**

* **CurrencyCode**: Processed currency type from order
* **Pricebook2Id**: Matches StandardPriceBookId
* **Product2Id**: Matches CatalogRecord.Id

**Error Handling:**

* Action call handles complex lookup logic including currency matching
* Flow adds error to `Errors` collection if no matching price book entry found
* Ensures data integrity for commerce transactions

## Error Handling

### Missing Data Scenarios

* **No Product**: Flow skips price book entry lookup and proceeds to opportunity assignment
* **No Price Book Entry**: Flow adds error message to `Errors` collection instead of failing
* **No Opportunity**: Flow proceeds without setting OpportunityId
* **Fee Items**: Flow can skip processing based on configuration settings

### Data Quality Validation

The flow handles various data quality issues:

* **Null Values**: Graceful handling of missing optional parameters
* **Pricing Flexibility**: Supports different pricing models from external platforms
* **Relationship Integrity**: Ensures proper product-price book relationships
* **Currency Handling**: Processes multi-currency scenarios through dedicated components
* **Error Collection**: Accumulates errors for batch reporting instead of failing immediately

## Dependencies

**Salesforce Objects:**

* Product2 (input record for product relationship)
* Opportunity (input record for order relationship)
* PricebookEntry (retrieved through Apex action)

**Apex Components:**

* `movedata__CurrencyCodeComponent` - Currency processing
* `GetPriceBookEntryFlowComponent` - Price book entry retrieval

**System Requirements:**

* Active Standard Price Book in organization
* Valid PricebookEntry records for all products with appropriate currency settings
* Appropriate permissions for OpportunityLineItem management
* MoveData package components must be available