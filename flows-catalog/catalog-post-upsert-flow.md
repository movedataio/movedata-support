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
* Manage pricing information for commerce transactions
* Ensure products are properly configured for sales operations
* Handle price synchronization between external platforms and Salesforce
* Support multi-currency environments with proper currency handling
* Provide detailed logging for troubleshooting and auditing

## Salesforce Fields

This flow interacts with the Salesforce Product2 and PricebookEntry objects. Below is a mapping of all fields utilized:

| Field API Name       | Field Type           | Purpose in Flow                         |
| -------------------- | -------------------- | --------------------------------------- |
| **Product2**         |                      |                                         |
| Id                   | ID                   | Product record identifier               |
| **PricebookEntry**   |                      |                                         |
| Id                   | ID                   | Price book entry identifier             |
| Pricebook2Id         | Lookup to Pricebook2 | Links to Standard Price Book            |
| Product2Id           | Lookup to Product2   | Links to product record                 |
| UnitPrice            | Currency             | Product unit price                      |
| IsActive             | Checkbox             | Indicates if price book entry is active |
| CurrencyIsoCode      | Text                 | ISO currency code for multi-currency   |
| UseStandardPrice     | Checkbox             | Uses standard pricing                   |
| ProductCode          | Text                 | Product code (inherited from Product2)  |
| Name                 | Text                 | Product name (inherited from Product2)  |

## Input Variables

### Core Product Data

| Variable              | Type             | Required | Description                                       |
| --------------------- | ---------------- | -------- | ------------------------------------------------- |
| `Record`              | Product2 SObject | Yes      | The Product2 record that was processed           |
| `Price`               | Currency         | Yes      | Product price from external platform             |
| `StandardPriceBookId` | String           | Yes      | ID of the Standard Price Book                     |
| `CurrencyType`        | String           | No       | Primary currency code for the price book entry   |
| `Order_CurrencyType`  | String           | No       | Order-specific currency code as fallback         |

## Output Variables

| Variable     | Type                            | Description                                      |
| ------------ | ------------------------------- | ------------------------------------------------ |
| `Errors`     | String\[]                       | Collection of error messages if processing fails |
| `Logs`       | movedata__MoveDataLogEntry\[]   | Collection of log entries for troubleshooting   |
| `LogsJson`   | String                          | JSON representation of log entries              |
| `RecordList` | String\[]                       | Collection of processed record IDs               |

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

### 2. Currency Code Determination and Logging

The flow determines the appropriate currency code and logs the currency resolution process:

**Currency Calculation Logic:**
```
CalculatedCurrencyType = IF(ISBLANK(CurrencyType), Order_CurrencyType, CurrencyType)
```

**Logging:** Records currency codes for troubleshooting multi-currency scenarios.

### 3. Price Book Entry Lookup

The flow uses an Apex action to search for existing price book entries:

**Apex Component:** `GetPriceBookEntryFlowComponent`

**Input Parameters:**
* **CurrencyCode**: CalculatedCurrencyType
* **Pricebook2Id**: Standard Price Book ID
* **Product2Id**: Current product record ID

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
  Log Entry and Add to RecordList
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
3. **Currency Handling**: Determine and set currency code if applicable
4. **Create Record**: Insert new PricebookEntry

### 5. Currency Code Management

For new price book entries, the flow handles currency codes:

**Currency Determination:**
* Uses `movedata__CurrencyCodeComponent` Apex action to validate currency
* Sets CurrencyIsoCode field if valid currency code is available
* Uses `movedata__SetValueComponent` to dynamically set the currency field

### 6. Logging and Record Tracking

The flow maintains comprehensive logs:

**Log Components Used:**
* `movedata__WriteToLogFlowComponent` - General logging
* `movedata__WriteObjectToLogComponent` - Object-specific logging

**Record Tracking:**
* Adds processed PricebookEntry IDs to RecordList output
* Provides audit trail of all price book entries created or updated

### 7. Price Synchronization Logic

**Update Operation (Existing Entry):**

* Only updates when price differs from current UnitPrice
* Preserves other price book entry settings
* Maintains existing IsActive and UseStandardPrice values
* Logs the update operation

**Create Operation (New Entry):**

* Sets IsActive to true by default
* Links to Standard Price Book
* Associates with current product
* Sets price from external platform
* Handles currency code assignment for multi-currency orgs
* Logs the creation operation

### 8. Error Handling and Validation

**Standard Price Book Validation:**

* Critical validation that prevents processing without proper price book setup
* Returns descriptive error message for troubleshooting

**Price Book Entry Operations:**

* Uses Apex components for enhanced error handling
* Separates create and update operations to handle different scenarios appropriately
* Comprehensive logging for troubleshooting

## Configuration Requirements

### Standard Price Book Setup

**Prerequisites:**

* Salesforce organization must have a Standard Price Book
* Standard Price Book must be active and accessible
* StandardPriceBookId must be provided to the flow

**Multi-Currency Support:**

* For multi-currency organizations, ensure proper currency codes are provided
* CurrencyType or Order_CurrencyType should contain valid ISO currency codes
* Currency management components handle validation and assignment

**Common Issues:**

* Missing Standard Price Book will cause flow to terminate with error
* Inactive price books cannot be used for new entries
* Price book access permissions may affect processing
* Invalid currency codes may prevent proper price book entry creation

### Price Management Strategy

**Price Synchronization:**

* Flow only updates prices when they differ from existing values
* Avoids unnecessary updates when prices haven't changed
* Maintains price history through Salesforce standard tracking
* Logs all price changes for audit purposes

**New Product Handling:**

* Automatically creates price book entries for new products
* Sets reasonable defaults for commerce operations
* Ensures products are immediately available for sales processes
* Handles currency assignment for multi-currency environments

## Error Scenarios

### Missing Standard Price Book

**Symptom:**

* Flow terminates with "Must have an active Standard Price Book" error

**Resolution:**

* Verify Standard Price Book exists in Setup → Products → Price Books
* Ensure Standard Price Book is marked as Standard and Active
* Check that StandardPriceBookId parameter is correctly provided

### Price Book Entry Creation Failures

**Potential Causes:**

* Product record is inactive
* Price book permissions issues
* Invalid currency values or codes
* Duplicate price book entries (rare)
* Multi-currency configuration issues

**Troubleshooting:**

* Verify product IsActive status
* Check user permissions for price book management
* Validate price value format and currency settings
* Review flow logs in LogsJson output for detailed error information
* Verify currency code validity for multi-currency orgs

### Currency Code Issues

**Symptoms:**

* Price book entries created without proper currency codes
* Currency validation failures

**Resolution:**

* Ensure CurrencyType or Order_CurrencyType contain valid ISO codes
* Verify multi-currency is enabled if using currency features
* Check currency code validation in flow logs

## Dependencies

**Salesforce Objects:**

* Product2 (input record)
* Pricebook2 (Standard Price Book)
* PricebookEntry (managed by flow)

**Apex Components:**

* `GetPriceBookEntryFlowComponent` - Enhanced price book entry lookup
* `movedata__CurrencyCodeComponent` - Currency code validation
* `movedata__SetValueComponent` - Dynamic field value assignment
* `movedata__WriteToLogFlowComponent` - General logging
* `movedata__WriteObjectToLogComponent` - Object logging
* `movedata__MoveDataLogEntry` - Log entry data structure

**System Requirements:**

* Active Standard Price Book in organization
* Appropriate permissions for price book entry management
* Valid currency settings for price operations
* Access to MoveData managed package components
* Multi-currency enabled (if using currency features)