# Catalog Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Catalog\_Duplicate\
**Label:** \[MoveData] Commerce: Catalog - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow performs sophisticated duplicate detection for catalog records by using multiple matching strategies to identify existing Product2 records in Salesforce. It handles platform keys, product codes, and SKU matching with configurable options for different matching priorities.

## Purpose

The flow attempts to find an existing Product2 record for a catalog item to support update operations. It performs a prioritized matching strategy including:

* Primary match against platform key through the `Platform_Key__c` field
* Secondary match against Product Code using the `ProductCode` field
* Tertiary match against Stock Keeping Unit using the `StockKeepingUnit` field
* Optional filtering to exclude specific item types (e.g., platform fees)

## Salesforce Fields

This flow interacts with Salesforce objects to match existing records. Below is a mapping of all fields utilized:

| Field API Name              | Field Type | Purpose in Flow                              |
| --------------------------- | ---------- | -------------------------------------------- |
| Product2.Platform\_Key\_\_c | Text       | Platform key for primary product matching    |
| Product2.ProductCode        | Text       | Product code for secondary matching          |
| Product2.StockKeepingUnit   | Text       | SKU for tertiary matching                    |
| Product2.Id                 | ID         | Product record identifier returned as result |

## Input Variables

### Core Matching Data

| Variable      | Type   | Required | Description                                      |
| ------------- | ------ | -------- | ------------------------------------------------ |
| `PlatformKey` | String | No       | Generated platform key for direct product lookup |
| `Code`        | String | No       | Product code from external platform              |
| `Type`        | String | No       | Item type (used for filtering exclusions)        |

### Configuration Variables

| Variable                          | Type    | Default | Description                                      |
| --------------------------------- | ------- | ------- | ------------------------------------------------ |
| `Config_CatalogMatchProductCode`  | Boolean | true    | Enable matching by Product Code                  |
| `Config_CatalogMatchProductSku`   | Boolean | false   | Enable matching by Stock Keeping Unit            |
| `Config_CatalogProductSkuUseCode` | Boolean | true    | Use Code instead of PlatformKey for SKU matching |
| `Config_OrderExcludeFeePlatform`  | Boolean | false   | Exclude platform fee items from processing       |

## Output Variables

| Variable   | Type    | Description                                         |
| ---------- | ------- | --------------------------------------------------- |
| `Result`   | String  | Salesforce Record ID of matching product (if found) |
| `Continue` | Boolean | Flag indicating whether processing should continue  |

## Flow Logic

### 1. Type-Based Filtering

The flow first evaluates whether to skip processing based on item type:

**Skip Platform Fee Logic:**

* **Condition:** `Config_OrderExcludeFeePlatform = true` AND `Type = "feePlatform"`
* **Action:** Sets `Continue = true` and terminates processing
* **Purpose:** Excludes platform fee items when configured

### 2. Platform Key Matching (Primary)

The flow attempts primary matching using platform key:

**Condition:** Platform key is provided\
**Action:** Query Product2 records where `Platform_Key__c` equals the provided platform key\
**Result:** Returns matching product ID if found, proceeds to next step if not found

### 3. Product Code Matching (Secondary)

If no platform key match is found and product code matching is enabled:

**Conditions:**

* No result from platform key matching
* `Config_CatalogMatchProductCode = true`
* `Code` is provided

**Process:**

1. **Query by Product Code**: Searches Product2 where `ProductCode = Code`
2. **Result Check**: If match found, returns product ID
3. **Continue Logic**: Proceeds to SKU matching if no result

### 4. SKU Matching (Tertiary)

If no previous matches found and SKU matching is enabled:

**Conditions:**

* No result from previous matching attempts
* `Config_CatalogMatchProductSku = true`
* `Code` is provided

**Process:**

1. **Calculate SKU Value**: Uses `CatalogProductSku` formula
2. **Query by SKU**: Searches Product2 where `StockKeepingUnit = CatalogProductSku`
3. **Result**: Returns matching product ID if found

### 5. SKU Value Calculation

The `CatalogProductSku` formula determines which value to use for SKU matching:

**Formula Logic:**

```
IF(Config_CatalogProductSkuUseCode == TRUE, Code, PlatformKey)
```

**Examples:**

* If `Config_CatalogProductSkuUseCode = true`: Uses the `Code` value
* If `Config_CatalogProductSkuUseCode = false`: Uses the `PlatformKey` value

## Error Handling

### Missing Data Scenarios

* **No Platform Key**: Flow skips platform key matching, proceeds to product code logic
* **No Product Code**: Flow skips product code and SKU matching
* **Configuration Disabled**: Matching steps are bypassed based on configuration flags

### Data Quality Validation

The flow handles various data quality issues:

* **Null Values**: Graceful handling of missing optional parameters
* **Configuration Flexibility**: Multiple configuration options for different matching strategies
* **Prioritized Matching**: Ensures most reliable matches are attempted first

### Processing Control

* **Continue Flag**: Provides mechanism for upstream processes to determine if further processing should occur
* **Early Termination**: Allows flow to exit early when matches are found or items should be excluded

## Dependencies

None
