# Catalog Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Catalog\_Mapping\
**Label:** \[MoveData] Commerce: Catalog - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 56.0\
**Status:** Active

This flow handles the mapping and transformation of catalog data from external commerce platforms into Salesforce Product2 records, with configurable field mapping and replacement rules.

## Purpose

The flow processes incoming catalog data and maps it to appropriate Salesforce Product2 fields while handling:

* Product name mapping with protection rules
* Product code assignment with conditional replacement
* SKU (Stock Keeping Unit) mapping with flexible source options
* Product description handling
* Status mapping for active/inactive products
* Currency code determination and assignment
* Platform key assignment for external system tracking
* Configurable field replacement policies

## Salesforce Fields

This flow interacts with the Salesforce Product2 object and its related fields. Below is a comprehensive mapping of all fields utilized:

| Field API Name                    | Field Type     | Purpose in Flow                            |
| --------------------------------- | -------------- | ------------------------------------------ |
| Id                                | ID             | Unique record identifier                   |
| Name                              | Text (255)     | Product name identifier                    |
| ProductCode                       | Text (255)     | Product code/identifier                    |
| StockKeepingUnit                  | Text (255)     | SKU for inventory tracking                 |
| Description                       | Long Text Area | Detailed product description               |
| IsActive                          | Checkbox       | Indicates if product is currently active   |
| CurrencyIsoCode                   | Text           | ISO currency code for multi-currency orgs |
| md_npc_pack__Platform_Key__c      | Text           | Stores unique external platform identifier |
| md_npc_pack__Protect_Name__c      | Checkbox       | Prevents automatic updates to product name |

## Input Variables

### Core Product Data

| Variable       | Type             | Required | Description                                |
| -------------- | ---------------- | -------- | ------------------------------------------ |
| `Record`       | Product2 SObject | Yes      | The Product2 record being processed        |
| `ProductName`  | String           | No       | Product name from external platform        |
| `Code`         | String           | No       | Product code/identifier                    |
| `Description`  | String           | No       | Product description                        |
| `Status`       | String           | No       | External platform status (active/inactive) |
| `CurrencyType` | String           | No       | Currency code from external platform       |
| `PlatformKey`  | String           | No       | Unique platform key                        |

### Configuration Variables

| Variable                           | Type    | Default | Description                                        |
| ---------------------------------- | ------- | ------- | -------------------------------------------------- |
| `Config_CatalogSetProductCode`     | Boolean | true    | Whether to set product code field                  |
| `Config_CatalogReplaceProductCode` | Boolean | true    | Whether to replace existing product codes          |
| `Config_CatalogSetProductSku`      | Boolean | false   | Whether to set SKU field                           |
| `Config_CatalogReplaceProductSku`  | Boolean | true    | Whether to replace existing SKUs                   |
| `Config_CatalogSetProductDesc`     | Boolean | true    | Whether to set description field                   |
| `Config_CatalogReplaceProductDesc` | Boolean | true    | Whether to replace existing descriptions           |
| `Config_CatalogProductSkuUseCode`  | Boolean | true    | Whether to use Code instead of PlatformKey for SKU |

## Output Variables

| Variable | Type             | Description             |
| -------- | ---------------- | ----------------------- |
| `Record` | Product2 SObject | Updated Product2 record |

## Flow Logic

### 1. Name Processing

The flow first determines if the product name should be updated:

* **Protection Check**: If `md_npc_pack__Protect_Name__c` is true, skips name processing
* **Name Assignment**: Sets `Name` field from `ProductName` input if provided and not protected

### 2. Product Code Mapping

Product code assignment follows conditional logic:

**Assignment Conditions:**

```
Config_CatalogSetProductCode = true 
AND (
    Config_CatalogReplaceProductCode = true 
    OR (Config_CatalogReplaceProductCode = false AND ProductCode is null)
)
```

**Logic:**

* If replacement is enabled: Always sets the product code
* If replacement is disabled: Only sets if existing ProductCode is null

### 3. SKU Processing

SKU assignment uses a formula to determine the source value:

**SKU Source Formula:**

```
CatalogProductSku = IF(Config_CatalogProductSkuUseCode == TRUE, Code, PlatformKey)
```

**Assignment Conditions:**

```
Config_CatalogSetProductSku = true 
AND (
    Config_CatalogReplaceProductSku = true 
    OR (Config_CatalogReplaceProductSku = false AND StockKeepingUnit is null)
)
```

**Examples:**

* If `Config_CatalogProductSkuUseCode = true`: SKU = Code value
* If `Config_CatalogProductSkuUseCode = false`: SKU = PlatformKey value

### 4. Description Mapping

Description assignment follows the same conditional pattern:

**Assignment Conditions:**

```
Config_CatalogSetProductDesc = true 
AND (
    Config_CatalogReplaceProductDesc = true 
    OR (Config_CatalogReplaceProductDesc = false AND Description is null)
)
```

### 5. Status Mapping

External platform statuses are mapped to Salesforce IsActive field:

| External Status | IsActive Field |
| --------------- | -------------- |
| active          | true           |
| \[all others]   | false          |

**Default Behavior**: Any status other than "active" sets IsActive to false

### 6. Currency Processing

The flow handles currency code assignment through action calls:

* **Determine Currency**: Calls `movedata__CurrencyCodeComponent` to validate and process currency code
* **Currency Assignment**: Uses `movedata__SetValueComponent` to set CurrencyIsoCode if valid currency provided
* **Length Check**: Uses `CurrencyTypeLen` formula to verify currency code exists before assignment

### 7. Platform Key Assignment

* Sets `md_npc_pack__Platform_Key__c` field with the provided platform key
* Always executed regardless of configuration settings
* Used for external system tracking and duplicate detection

## Configuration Logic Patterns

### Conditional Field Assignment

The flow uses a consistent pattern for configurable field assignment:

**Pattern:**

```
IF (
    Config_Set[Field] = true 
    AND (
        Config_Replace[Field] = true 
        OR (Config_Replace[Field] = false AND [Field] is null)
    )
) THEN
    Set [Field] = [Value]
```

**Behavior:**

* **Set = false**: Field is never updated
* **Set = true, Replace = true**: Field is always updated
* **Set = true, Replace = false**: Field is updated only if currently null

### Default Configuration Values

| Configuration                      | Default | Purpose                                       |
| ---------------------------------- | ------- | --------------------------------------------- |
| `Config_CatalogSetProductCode`     | true    | Enable product code mapping                   |
| `Config_CatalogReplaceProductCode` | true    | Allow overwriting existing codes              |
| `Config_CatalogSetProductSku`      | false   | Disable SKU mapping by default                |
| `Config_CatalogReplaceProductSku`  | true    | Allow overwriting existing SKUs when enabled  |
| `Config_CatalogSetProductDesc`     | true    | Enable description mapping                    |
| `Config_CatalogReplaceProductDesc` | true    | Allow overwriting existing descriptions       |
| `Config_CatalogProductSkuUseCode`  | true    | Use Code field for SKU instead of PlatformKey |

## Protection Mechanisms

The flow includes protection fields to prevent overwriting existing data:

* `md_npc_pack__Protect_Name__c`: Prevents name updates when enabled
* Configuration-based protection for other fields through replace flags

## Error Handling

* Uses conditional logic to handle null values gracefully
* Skips field assignment when conditions are not met
* Validates configuration settings before processing each field
* Currency code validation through dedicated components

## Dependencies

* `movedata__CurrencyCodeComponent`: Apex component for currency code validation
* `movedata__SetValueComponent`: Apex component for dynamic field assignment