# Permission Sets

## Overview

**Permission Set Name:** MoveData\_NPSP\_Extensions\
**Label:** MoveData NPSP Extensions\
**Activation Required:** No\
**Purpose:** Grants users the minimum permissions to objects accessed as part of the MoveData NPSP Extension Flows

## Description

This permission set provides the necessary field-level and object-level permissions for users who need to execute MoveData NPSP Extension Flows. It is designed to grant minimal access required for the integration whilst maintaining security best practices. The authorised user for MoveData should be assigned this permission set to enable proper flow execution and data processing.

## Object Permissions

### Account

* **Read Access:** Yes
* **Create/Edit/Delete:** No
* **View All Records:** Yes
* **Modify All Records:** No

### Contact

* **Read Access:** Yes
* **Create/Edit/Delete:** No
* **View All Records:** Yes
* **Modify All Records:** No

## Field Permissions

### Account Fields

| Field                       | Read | Edit | Purpose                                          |
| --------------------------- | ---- | ---- | ------------------------------------------------ |
| `movedata__Protect_Name__c` | ✓    | ✓    | Controls name field protection during processing |

### Campaign Fields

| Field                                        | Read | Edit | Purpose                                 |
| -------------------------------------------- | ---- | ---- | --------------------------------------- |
| **MoveData Custom Fields**                   |      |      |                                         |
| `movedata__Campaign_Code__c`                 | ✓    | ✓    | Campaign identification code            |
| `Campaign_URL__c`                            | ✓    | ✓    | Campaign webpage URL                    |
| `Fundraising_Account__c`                     | ✓    | ✓    | Associated fundraising account          |
| `Fundraising_Contact__c`                     | ✓    | ✓    | Associated fundraising contact          |
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
| `NumberOfOpportunities`                      | ✓    | -    | Campaign opportunity count              |
| `NumberOfResponses`                          | ✓    | -    | Campaign response count                 |
| `NumberOfWonOpportunities`                   | ✓    | -    | Won opportunity count                   |
| **Hierarchy Statistics (Read-only)**         |      |      |                                         |
| `HierarchyActualCost`                        | ✓    | -    | Hierarchical actual costs               |
| `HierarchyAmountAllOpportunities`            | ✓    | -    | Hierarchical opportunity totals         |
| `HierarchyExpectedRevenue`                   | ✓    | -    | Hierarchical expected revenue           |
| `HierarchyNumberOfContacts`                  | ✓    | -    | Hierarchical contact counts             |

### Contact Fields

| Field                       | Read | Edit | Purpose                                          |
| --------------------------- | ---- | ---- | ------------------------------------------------ |
| `movedata__Protect_Name__c` | ✓    | ✓    | Controls name field protection during processing |

### Opportunity Fields

| Field                       | Read | Edit | Purpose                                |
| --------------------------- | ---- | ---- | -------------------------------------- |
| **Fee Tracking Fields**     |      |      |                                        |
| `Fee__c`                    | ✓    | ✓    | General transaction fees               |
| `Gateway_Fee__c`            | ✓    | ✓    | Payment gateway processing fees        |
| `Gateway_Fee_Tax__c`        | ✓    | ✓    | Tax on gateway fees                    |
| `Platform_Fee__c`           | ✓    | ✓    | Platform service fees                  |
| `Platform_Fee_Tax__c`       | ✓    | ✓    | Tax on platform fees                   |
| `Tax__c`                    | ✓    | ✓    | General tax amounts                    |
| **Integration Fields**      |      |      |                                        |
| `movedata__Platform_Key__c` | ✓    | ✓    | External platform key for matching     |
| `Receipt_Number__c`         | ✓    | ✓    | External receipt or transaction number |

### Recurring Donation Fields (npe03\_\_Recurring\_Donation\_\_c)

| Field                                   | Read | Edit | Purpose                                   |
| --------------------------------------- | ---- | ---- | ----------------------------------------- |
| **Core Recurring Donation Fields**      |      |      |                                           |
| `npe03__Amount__c`                      | ✓    | ✓    | Recurring donation amount                 |
| `npe03__Contact__c`                     | ✓    | ✓    | Associated contact                        |
| `npe03__Organization__c`                | ✓    | ✓    | Associated organisation                   |
| `npe03__Date_Established__c`            | ✓    | ✓    | Date recurring donation established       |
| `npe03__Installment_Period__c`          | ✓    | ✓    | Payment frequency (Monthly, Yearly, etc.) |
| `npe03__Next_Payment_Date__c`           | ✓    | ✓    | Next expected payment date                |
| `npe03__Open_Ended_Status__c`           | ✓    | ✓    | Open-ended status (Open, Closed)          |
| `npe03__Recurring_Donation_Campaign__c` | ✓    | ✓    | Associated campaign                       |
| **Enhanced Recurring Donations Fields** |      |      |                                           |
| `npsp__Day_of_Month__c`                 | ✓    | ✓    | Day of month for payments                 |
| `npsp__EndDate__c`                      | ✓    | ✓    | Recurring donation end date               |
| `npsp__InstallmentFrequency__c`         | ✓    | ✓    | Payment frequency number                  |
| `npsp__StartDate__c`                    | ✓    | ✓    | Recurring donation start date             |
| `npsp__Status__c`                       | ✓    | ✓    | Enhanced recurring donation status        |
| `npsp__RecurringType__c`                | ✓    | ✓    | Type of recurring donation                |
| `npsp__ClosedReason__c`                 | ✓    | ✓    | Reason for closure                        |
| **Integration Fields**                  |      |      |                                           |
| `Platform_Key__c`                       | ✓    | ✓    | External platform key for matching        |
