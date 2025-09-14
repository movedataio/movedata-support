# Permission Sets

## Overview

**Permission Set Name:** MoveData\_Commerce\_Extensions\
**Label:** MoveData Commerce Extensions\
**Activation Required:** No\
**Purpose:** Grants users the minimum permissions to objects accessed as part of the MoveData Commerce Extension Flows

## Description

This permission set provides the necessary field-level and object-level permissions for users who need to execute MoveData Commerce Extension Flows. It is designed to grant minimal access required for commerce integrations whilst maintaining security best practices. The authorised user for MoveData should be assigned this permission set to enable proper flow execution and data processing for ticketing, event management, and e-commerce functionality.

## Object Permissions

### Account

* **Read Access:** Yes
* **Create/Edit/Delete:** No/No/No
* **View All Records:** Yes
* **Modify All Records:** No

### Contact

* **Read Access:** Yes
* **Create/Edit/Delete:** No/No/No
* **View All Records:** Yes
* **Modify All Records:** No

### Opportunity

* **Read Access:** Yes
* **Create/Edit/Delete:** Yes/Yes/Yes
* **View All Records:** Yes
* **Modify All Records:** Yes

### Product2

* **Read Access:** Yes
* **Create/Edit/Delete:** Yes/Yes/No
* **View All Records:** No
* **Modify All Records:** No

## Apex Class Access

This permission set grants access to the following Apex classes required for commerce functionality:

| Class Name                                 | Purpose                                       |
| ------------------------------------------ | --------------------------------------------- |
| `MoveDataCommerceInstallHandler`           | Handles commerce extension installation       |
| `MoveDataCommerceInstallHandlerTest`       | Test class for installation handler           |
| `NpspCopyGauBetweenCampaignsFlowProxy`     | Campaign GAU copying functionality            |
| `NpspCopyGauBetweenCampaignsFlowProxyTest` | Test class for GAU copying                    |
| `NpspCreateCampaignMemberProxy`            | Campaign member creation                      |
| `NpspCreateCampaignMemberProxyTest`        | Test class for campaign member creation       |
| `NpspInitialiseCampaignMemberProxy`        | Campaign member initialisation                |
| `NpspInitialiseCampaignMemberProxyTest`    | Test class for campaign member initialisation |

## Field Permissions

### Account Fields

| Field                       | Read | Edit | Purpose                                          |
| --------------------------- | ---- | ---- | ------------------------------------------------ |
| `movedata__Protect_Name__c` | ✓    | ✓    | Controls name field protection during processing |

### Contact Fields

| Field                       | Read | Edit | Purpose                                          |
| --------------------------- | ---- | ---- | ------------------------------------------------ |
| `movedata__Protect_Name__c` | ✓    | ✓    | Controls name field protection during processing |

### Campaign Fields

| Field                                        | Read | Edit | Purpose                                 |
| -------------------------------------------- | ---- | ---- | --------------------------------------- |
| **MoveData Custom Fields**                   |      |      |                                         |
| `movedata__Campaign_Code__c`                 | ✓    | ✓    | Campaign identification code            |
| `movedata__Platform_Key__c`                  | ✓    | ✓    | External platform key for matching      |
| `movedata__Platform__c`                      | ✓    | ✓    | Platform identifier                     |
| `movedata__Protect_Campaign_Parent__c`       | ✓    | ✓    | Campaign parent relationship protection |
| `movedata__Protect_Name__c`                  | ✓    | ✓    | Name field protection                   |
| **Standard Campaign Statistics (Read-only)** |      |      |                                         |
| `ActualCost`                                 | ✓    | -    | Campaign actual costs                   |
| `AmountAllOpportunities`                     | ✓    | -    | Total opportunity amounts               |
| `AmountWonOpportunities`                     | ✓    | -    | Won opportunity amounts                 |
| `BudgetedCost`                               | ✓    | -    | Budgeted campaign costs                 |
| `ExpectedRevenue`                            | ✓    | -    | Expected campaign revenue               |
| `NumberOfContacts`                           | ✓    | -    | Campaign contact count                  |
| `NumberOfConvertedLeads`                     | ✓    | -    | Converted lead count                    |
| `NumberOfLeads`                              | ✓    | -    | Campaign lead count                     |
| `NumberOfOpportunities`                      | ✓    | -    | Campaign opportunity count              |
| `NumberOfResponses`                          | ✓    | -    | Campaign response count                 |
| `NumberOfWonOpportunities`                   | ✓    | -    | Won opportunity count                   |
| `NumberSent`                                 | ✓    | -    | Campaign communications sent            |
| **Hierarchy Statistics (Read-only)**         |      |      |                                         |
| `HierarchyActualCost`                        | ✓    | -    | Hierarchical actual costs               |
| `HierarchyAmountAllOpportunities`            | ✓    | -    | Hierarchical opportunity totals         |
| `HierarchyAmountWonOpportunities`            | ✓    | -    | Hierarchical won opportunity amounts    |
| `HierarchyBudgetedCost`                      | ✓    | -    | Hierarchical budgeted costs             |
| `HierarchyExpectedRevenue`                   | ✓    | -    | Hierarchical expected revenue           |
| `HierarchyNumberOfContacts`                  | ✓    | -    | Hierarchical contact counts             |
| `HierarchyNumberOfConvertedLeads`            | ✓    | -    | Hierarchical converted lead counts      |
| `HierarchyNumberOfLeads`                     | ✓    | -    | Hierarchical lead counts                |
| `HierarchyNumberOfOpportunities`             | ✓    | -    | Hierarchical opportunity counts         |
| `HierarchyNumberOfResponses`                 | ✓    | -    | Hierarchical response counts            |
| `HierarchyNumberOfWonOpportunities`          | ✓    | -    | Hierarchical won opportunity counts     |
| `HierarchyNumberSent`                        | ✓    | -    | Hierarchical communications sent        |

### Opportunity Fields

| Field                       | Read | Edit | Purpose                            |
| --------------------------- | ---- | ---- | ---------------------------------- |
| `Amount`                    | ✓    | ✓    | Opportunity amount                 |
| `Description`               | ✓    | ✓    | Opportunity description            |
| `movedata__Platform_Key__c` | ✓    | ✓    | External platform key for matching |
| `Type`                      | ✓    | ✓    | Opportunity type classification    |

### OpportunityLineItem Fields

| Field             | Read | Edit | Purpose                               |
| ----------------- | ---- | ---- | ------------------------------------- |
| `Description`     | ✓    | ✓    | Line item description                 |
| `Discount`        | ✓    | ✓    | Applied discount amount or percentage |
| `ListPrice`       | ✓    | -    | Standard list price (read-only)       |
| `Platform_Key__c` | ✓    | ✓    | External platform key for matching    |
| `ProductCode`     | ✓    | -    | Product code identifier (read-only)   |
| `ServiceDate`     | ✓    | ✓    | Date of service delivery              |
| `Subtotal`        | ✓    | -    | Line item subtotal (read-only)        |
| `TotalPrice`      | ✓    | -    | Line item total price (read-only)     |

### Product2 Fields

| Field                   | Read | Edit | Purpose                            |
| ----------------------- | ---- | ---- | ---------------------------------- |
| `Description`           | ✓    | ✓    | Product description                |
| `DisplayUrl`            | ✓    | ✓    | Product display URL                |
| `Family`                | ✓    | ✓    | Product family classification      |
| `Platform_Key__c`       | ✓    | ✓    | External platform key for matching |
| `ProductCode`           | ✓    | ✓    | Product code identifier            |
| `Protect_Name__c`       | ✓    | ✓    | Product name protection            |
| `QuantityUnitOfMeasure` | ✓    | ✓    | Unit of measure for quantities     |
| `StockKeepingUnit`      | ✓    | ✓    | SKU identifier                     |
