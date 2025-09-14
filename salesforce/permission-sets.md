# Permission Sets

## Overview

**Permission Set Name:** MoveData\_Nonprofit\_Extensions\
**Label:** MoveData Nonprofit Cloud Extensions\
**Activation Required:** No\
**Purpose:** Grants users the minimum permissions to objects accessed as part of the MoveData Nonprofit Cloud Extension Flows

## Description

This permission set provides the necessary field-level and object-level permissions for users who need to execute MoveData Nonprofit Cloud Extension Flows. It is designed to grant minimal access required for the integration whilst maintaining security best practices. The authorised user for MoveData should be assigned this permission set to enable proper flow execution and data processing with Salesforce Nonprofit Cloud data models.

## Object Permissions

### Account

* **Read Access:** Yes
* **Create/Edit/Delete:** Yes/Yes/No
* **View All Records:** Yes
* **Modify All Records:** No

### Contact

* **Read Access:** Yes
* **Create/Edit/Delete:** Yes/Yes/No
* **View All Records:** Yes
* **Modify All Records:** No

### Campaign

* **Read Access:** Yes
* **Create/Edit/Delete:** Yes/Yes/No
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

### GiftCommitment

* **Read Access:** Yes
* **Create/Edit/Delete:** Yes/Yes/No
* **View All Records:** Yes
* **Modify All Records:** No

### GiftTransaction

* **Read Access:** Yes
* **Create/Edit/Delete:** Yes/Yes/No
* **View All Records:** Yes
* **Modify All Records:** No

## Field Permissions

### Account Fields

| Field                       | Read | Edit | Purpose                                          |
| --------------------------- | ---- | ---- | ------------------------------------------------ |
| `PersonHasOptedOutOfEmail`  | ✓    | ✓    | Email opt-out status for person accounts         |
| `movedata__Protect_Name__c` | ✓    | ✓    | Controls name field protection during processing |
| `Phone`                     | ✓    | ✓    | Account phone number                             |

### Contact Fields

| Field                | Read | Edit | Purpose                         |
| -------------------- | ---- | ---- | ------------------------------- |
| `AccountId`          | ✓    | ✓    | Associated account relationship |
| `Email`              | ✓    | ✓    | Contact email address           |
| `HasOptedOutOfEmail` | ✓    | ✓    | Email opt-out preference        |
| `Phone`              | ✓    | ✓    | Contact phone number            |
| `Title`              | ✓    | ✓    | Contact job title               |

### Campaign Fields

| Field                                        | Read | Edit | Purpose                                 |
| -------------------------------------------- | ---- | ---- | --------------------------------------- |
| **MoveData Custom Fields**                   |      |      |                                         |
| `movedata__Campaign_Code__c`                 | ✓    | ✓    | Campaign identification code            |
| `Campaign_URL__c`                            | ✓    | ✓    | Campaign webpage URL                    |
| `Fundraising_Account__c`                     | ✓    | ✓    | Associated fundraising account          |
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

### GiftCommitment Fields

| Field             | Read | Edit | Purpose                            |
| ----------------- | ---- | ---- | ---------------------------------- |
| `Platform_Key__c` | ✓    | ✓    | External platform key for matching |

### GiftTransaction Fields

| Field             | Read | Edit | Purpose                            |
| ----------------- | ---- | ---- | ---------------------------------- |
| `Platform_Key__c` | ✓    | ✓    | External platform key for matching |

## Key Differences from NPSP Extensions

The MoveData Nonprofit Cloud Extensions permission set differs from the NPSP Extensions in several important ways:

### Enhanced Object Permissions

* **Create/Edit Access:** Provides create and edit permissions for Account, Contact, Campaign, and Opportunity objects (NPSP Extensions only grants read access)
* **Opportunity Management:** Full permissions including delete access for Opportunity records
* **Product Management:** Includes Product2 and OpportunityLineItem objects for commerce functionality

### Nonprofit Cloud Specific Objects

* **GiftCommitment:** Access to Nonprofit Cloud's gift commitment functionality
* **GiftTransaction:** Access to Nonprofit Cloud's transaction tracking

### Additional Standard Fields

* **Communication Preferences:** Email opt-out fields for both Account and Contact objects
* **Contact Details:** Extended contact information including phone and title fields
* **Opportunity Details:** Standard opportunity fields like Amount, Description, and Type

This permission set is specifically designed for organizations using Salesforce Nonprofit Cloud data models and requires more comprehensive object access to support the enhanced functionality of the Nonprofit Cloud platform.
