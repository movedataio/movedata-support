# Catalog Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Catalog\_Post\
**Label:** \[MoveData] Commerce: Catalog - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow handles post-processing operations after catalog (Product2) records are created or updated, focusing on price book entry management to ensure products are properly configured for sales operations in Salesforce.

## Purpose

The flow performs post-upsert operations that:

* Validate the presence of an active Standard Price Book
* Create or update price book entries for catalog products
* Manage pricing information for commerce transactions with multi-currency support
* Ensure products are properly configured for sales operations
* Handle price synchronization between external platforms and Salesforce
* Log operations for debugging and audit purposes

## Salesforce Fields

This flow interacts with the Salesforce Product2 and PricebookEntry objects. Below is a mapping of all fields utilized:

| Field API Name     | Field Type           | Purpose in Flow                         |
| ------------------ | -------------------- | --------------------------------------- |
| **Product2**       |                      |                                         |
| Id                 | ID                   | Product record identifier               |
| **PricebookEntry** |                      |                                         |
| Id                 | ID                   | Price book entry identifier             |
| Pricebook2Id       | Lookup to Pricebook2 | Links to Standard Price Book            |
| Product2Id         | Lookup to Product2   | Links to product record                 |
| UnitPrice          | Currency             | Product unit price                      |
| IsActive           | Checkbox             | Indicates if price book entry is active |
| CurrencyIsoCode    | Text                 | Currency code for price book entry      |

## Input Variables

### Core Product Data

| Variable              | Type             | Required | Description                            |
| --------------------- | ---------------- | -------- | -------------------------------------- |
| `Record`              | Product2 SObject | Yes      | The Product2 record that was processed |
| `Price`               | Currency         | Yes      | Product price from external platform   |
| `StandardPriceBookId` | String           | Yes      | ID of the Standard Price Book          |
| `CurrencyType`        | String           | No       | Primary currency code for the product   |
| `Order_CurrencyType`  | String           | No       | Fallback currency code from order      |

## Output Variables

| Variable    | Type                               | Description                                      |
| ----------- | ---------------------------------- | ------------------------------------------------ |
| `Errors`    | String[]                           | Collection of error messages if processing fails |
| `Logs`      | movedata__MoveDataLogEntry[]       | Detailed log entries for debugging               |
| `LogsJson`  | String                             | JSON representation of log entries               |
| `RecordList`| String[]                           | Collection of processed record IDs               |

## Flow Logic

### 1. Standard Price Book Validation

The flow first validates that a Standard Price Book exists and is accessible:

**Validation Check:**

```
IF StandardPriceBookId IS NULL THEN
  Add Error: "Must have an active Standard Price Book."
  Terminate Processing
```

**Purpose:** Ensures that products can be properly priced and sold through Salesforce sales processes.

### 2. Currency Code Processing

The flow determines the appropriate currency code using a calculated formula:

**Currency Logic:**
```
CalculatedCurrencyType = IF(ISBLANK(CurrencyType), Order_CurrencyType, CurrencyType)
```

### 3. Price Book Entry Lookup

The flow uses an Apex action call (`GetPriceBookEntryFlowComponent`) to search for existing price book entries:

**Input Parameters:**
* **CurrencyCode**: CalculatedCurrencyType
* **Pricebook2Id**: Standard Price Book ID
* **Product2Id**: Current product record ID

**Output:** Returns complete PricebookEntry record if found

### 4. Price Book Entry Processing Decision

The flow determines the appropriate action based on existing price book entry status:

#### Scenario A: Existing Price Book Entry Found

**Condition:** PricebookEntry record exists with valid ID

**Price Comparison Logic:**

```
IF PricebookEntryRecord.UnitPrice ≠ Price THEN
  Update UnitPrice = Price
  Perform Update Operation
ELSE
  No Action Required
```

#### Scenario B: No Price Book Entry Found

**Condition:** No existing PricebookEntry record for the product

**New Entry Creation Process:**

1. **Initialize Record**: Create new PricebookEntry SObject
2. **Set Required Fields**:
   * `IsActive = true`
   * `Product2Id = Record.Id`
   * `Pricebook2Id = StandardPriceBookId`
   * `UnitPrice = Price`
3. **Currency Processing**: Determine and set currency code if available
4. **Create Record**: Insert new PricebookEntry

### 5. Currency Code Management

For new price book entries, the flow handles currency codes:

**Currency Determination:**
* Uses `movedata__CurrencyCodeComponent` to validate currency code
* Only sets CurrencyIsoCode if valid currency is determined
* Uses `movedata__SetValueComponent` to dynamically set currency field

**Decision Logic:**
```
IF CurrencyTypeLen > 0 THEN
  Set CurrencyIsoCode field
ELSE
  Skip currency assignment
```

### 6. Logging and Tracking

The flow includes comprehensive logging:

**Log Operations:**
* Currency code determination logging
* Price book entry record logging
* Uses `movedata__WriteToLogFlowComponent` and `movedata__WriteObjectToLogComponent`

**Record Tracking:**
* Adds processed price book entry IDs to RecordList
* Enables downstream processing to track created/updated records

### 7. Error Handling and Validation

**Standard Price Book Validation:**
* Critical validation that prevents processing without proper price book setup
* Returns descriptive error message for troubleshooting

**Price Book Entry Operations:**
* Uses Apex components for robust price book entry handling
* Separates create and update operations to handle different scenarios appropriately
* Handles currency validation and assignment gracefully

## Configuration Requirements

### Standard Price Book Setup

**Prerequisites:**

* Salesforce organization must have a Standard Price Book
* Standard Price Book must be active and accessible
* StandardPriceBookId must be provided to the flow

**Common Issues:**

* Missing Standard Price Book will cause flow to terminate with error
* Inactive price books cannot be used for new entries
* Price book access permissions may affect processing

### Currency Configuration

**Multi-Currency Support:**
* Flow handles currency codes dynamically
* Supports fallback currency logic (Order_CurrencyType)
* Validates currency codes before assignment

**Currency Requirements:**
* Valid currency codes must be configured in Salesforce
* CurrencyIsoCode field availability depends on multi-currency enablement

### Price Management Strategy

**Price Synchronization:**

* Flow only updates prices when they differ from existing values
* Avoids unnecessary updates when prices haven't changed
* Maintains price history through Salesforce standard tracking

**New Product Handling:**

* Automatically creates price book entries for new products
* Sets reasonable defaults for commerce operations
* Ensures products are immediately available for sales processes

## Error Scenarios

### Missing Standard Price Book

**Symptom:**

* Flow terminates with "Must have an active Standard Price Book" error

**Resolution:**

* Verify Standard Price Book exists in Setup → Products → Price Books
* Ensure Standard Price Book is marked as Standard and Active
* Check that StandardPriceBookId parameter is correctly provided

### Currency Code Issues

**Potential Causes:**
* Invalid currency codes provided
* Multi-currency not enabled when currency codes provided
* Currency code validation failures

**Troubleshooting:**
* Review currency code logging output
* Verify multi-currency settings in Salesforce
* Check that provided currency codes are active

### Price Book Entry Creation Failures

**Potential Causes:**

* Product record is inactive
* Price book permissions issues
* Invalid currency values
* Duplicate price book entries (rare)

**Troubleshooting:**

* Verify product IsActive status
* Check user permissions for price book management
* Validate price value format and currency settings
* Review detailed logs output for specific error information

## Dependencies

**Salesforce Objects:**

* Product2 (input record)
* Pricebook2 (Standard Price Book)
* PricebookEntry (managed by flow)

**Apex Components:**
* `GetPriceBookEntryFlowComponent` - Custom price book entry lookup
* `movedata__CurrencyCodeComponent` - Currency validation
* `movedata__SetValueComponent` - Dynamic field assignment
* `movedata__WriteToLogFlowComponent` - Logging operations
* `movedata__WriteObjectToLogComponent` - Object logging

**System Requirements:**

* Active Standard Price Book in organization
* Appropriate permissions for price book entry management
* Valid currency settings for price operations
* MoveData package components for logging and currency handling
