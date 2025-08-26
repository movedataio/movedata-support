---
description: >-
  The NPSP Fundraising & Donations Extension extends MoveData's core integration
  capabilities to work seamlessly with Salesforce's Nonprofit Success Pack
  (NPSP).
---

# Welcome to the NPSP Fundraising & Donations Extension

## Understanding NPSP Integration

### What is Nonprofit Success Pack (NPSP)?

Nonprofit Success Pack (NPSP) is Salesforce's free managed package that provides nonprofit organisations with enhanced data models, automation, and functionality specifically designed for fundraising operations. NPSP includes:

* **Enhanced Contact and Account Models**: Household accounts, organizational affiliations, and relationship tracking
* **Opportunity Management**: Donation tracking with nonprofit-specific fields and rollup calculations
* **Campaign Hierarchy**: Multi-level campaign structures for events, appeals, and peer-to-peer fundraising
* **Recurring Donations**: Automated pledge and installment management
* **General Accounting Units (GAUs)**: Program designation and allocation tracking

### Extension Architecture

The NPSP Fundraising & Donations Extension leverages NPSP's data model and automation to ensure fundraising data integrates correctly with your existing nonprofit workflows.

## NPSP-Specific Data Handling

### Contact and Account Management

**Household Account Model**

* Automatically creates household accounts using NPSP's standard model
* Respects NPSP contact-to-account relationships
* Maintains proper address management through NPSP's address framework
* Uses NPSP duplicate rules for contact matching and merging

**Organisational Accounts**

* Creates organisational accounts for corporate donations
* Establishes proper contact-to-account affiliations
* Supports NPSP's organisational account structure

### Opportunity Processing

**NPSP Opportunity Fields** The extension populates NPSP-specific opportunity fields including:

* `npsp__Primary_Contact__c`: Links the primary donor contact
* `npsp__Honoree_Name__c`: Captures tribute donation information
* `npsp__Tribute_Type__c`: Memorial, honour, or celebration designations
* NPSP opportunity naming conventions for consistency

**Contact Roles**

* Leverages NPSP's automatic contact role creation through the Primary Contact field
* Eliminates duplicate contact role creation
* Maintains proper donor-to-opportunity relationships

### Campaign Hierarchy

**Multi-Level Structure**

* Creates nested campaign hierarchies to reflect fundraising platform structures
* Parents individual fundraising pages under team campaigns
* Links team campaigns to parent events or appeals
* Maintains campaign member relationships through NPSP automation

### Recurring Donations

**NPSP Recurring Donation Objects**

* Creates `npe03__Recurring_Donation__c` records for subscription-based giving
* Generates pledged opportunities using NPSP's instalment framework
* Updates opportunities from "Pledged" to "Closed Won" as payments process
* Supports various recurring donation statuses and frequencies

### General Accounting Units (GAUs)

**Program Designation Integration**

* Maps fundraising platform program designations to NPSP GAUs
* Creates `npsp__General_Accounting_Unit__c` records as needed
* Generates `npsp__Allocation__c` records linking GAUs to opportunities
* Supports percentage-based allocations for multi-program donations

## Extension Configuration

### Prerequisites

Before installing the NPSP extension, ensure:

* MoveData is installed
* Salesforce NPSP is installed and configured
* NPSP settings are properly configured for your organisation
* Required NPSP objects have appropriate permissions

### Direct Installation Links

The MoveData NPSP Fundraising & Donations Extension can be installed directly from:

* Production & Developer Editions: [https://api.movedata.io/installer/npsp-extension](https://api.movedata.io/installer/npsp-extension)
* Sandbox & Scratch Orgs: [https://api.movedata.io/installer/npsp-extension?sandbox=1](https://api.movedata.io/installer/npsp-extension?sandbox=1)
