---
description: >-
  The Non-Profit Cloud Extension extends MoveData's core integration
  capabilities to work seamlessly with Salesforce's Non-Profit Cloud
  and Person Account architecture.
---

# Welcome to the Non-Profit Cloud Extension

## Understanding MoveData' Non-Profit Cloud Extensions

### What is Salesforce Non-Profit Cloud?

Salesforce Non-Profit Cloud is Salesforce's purpose-built non-profit solution that uses Person Account architecture to simplify constituent management. Unlike traditional Salesforce models that separate Contacts and Accounts, Non-Profit Cloud combines individual information into unified Person Account records, streamlining data management for organizations that primarily work with individuals rather than organizations.

Non-Profit Cloud includes:

* **Person Account Model**: Unified records combining contact and account information for individual constituents
* **Gift Transaction Management**: Native donation tracking with comprehensive gift processing capabilities
* **Campaign Management**: Integrated campaign tracking for appeals, events, and peer-to-peer fundraising
* **Recurring Gift Processing**: Automated recurring donation management with flexible scheduling
* **Program Management**: Tools for tracking program participation and outcomes
* **Engagement Plans**: Automated constituent engagement and stewardship workflows

### Extension Architecture

The Non-Profit Cloud Extension leverages Non-Profit Cloud's native data model and automation to ensure fundraising data integrates seamlessly with your existing constituent management and program delivery workflows.

## Non-Profit Cloud-Specific Data Handling

### Person Account Management

**Unified Constituent Records**

* Creates Person Account records that combine individual donor and contact information
* Maintains comprehensive constituent profiles with integrated giving history
* Supports household relationship tracking through native Non-Profit Cloud features
* Uses Non-Profit Cloud duplicate rules for constituent matching and merging

**Organizational Account Processing**

* Creates Business Account records for corporate donations and partnerships
* Establishes proper contact-to-account affiliations for organizational relationships
* Supports complex organizational structures and multi-contact relationships

### Gift Transaction Processing

**Non-Profit Cloud Gift Fields** The extension populates Non-Profit Cloud-specific gift transaction fields including:

* `npc__Amount__c`: Primary gift amount with currency support
* `npc__Account__c`: Links to the constituent Person Account
* `npc__Donor_Name__c`: Captures donor attribution and recognition preferences
* `npc__Gift_Date__c`: Records the actual gift transaction date
* `npc__Designation__c`: Links gifts to specific programs or funds

**Gift Processing Workflow**

* Leverages Non-Profit Cloud's native gift processing automation
* Creates appropriate gift transaction records with full audit trails
* Handles complex gift scenarios including tributes, memorials, and matching gifts
* Supports gift modifications, refunds, and adjustments through standard workflows

### Campaign Integration

**Non-Profit Cloud Campaign Model**

* Creates campaigns using Non-Profit Cloud's enhanced campaign structure
* Supports hierarchical campaign relationships for complex fundraising initiatives
* Links campaign members through native Non-Profit Cloud automation
* Maintains campaign attribution and source tracking

**Multi-Channel Campaign Support**

* Processes peer-to-peer fundraising campaigns with proper hierarchy
* Handles event campaigns with registration and attendance tracking
* Supports appeal campaigns with response and engagement metrics

### Recurring Gift Management

**Native Recurring Gift Objects**

* Creates `npc__Recurring_Gift__c` records for subscription-based giving
* Generates scheduled gift transactions using Non-Profit Cloud's scheduling framework
* Updates gift statuses and processes installments automatically
* Supports flexible recurring gift frequencies and amounts

**Recurring Gift Lifecycle**

* Handles recurring gift creation, modification, and cancellation
* Processes payment method updates and failed payment recovery
* Manages recurring gift pausing and reactivation scenarios

### Program and Fund Designation

**Program Integration**

* Maps fundraising platform designations to Non-Profit Cloud programs
* Creates `npc__Program__c` relationships for gift allocation tracking
* Supports multi-program allocations with percentage distributions
* Tracks program-specific metrics and reporting

**Fund Management**

* Links gifts to specific funds using `npc__Fund__c` relationships
* Handles restricted and unrestricted gift processing
* Supports endowment and capital campaign fund tracking

## Extension Configuration

### Prerequisites

Before installing the Non-Profit Cloud extension, ensure:

* MoveData is installed and configured
* Salesforce Non-Profit Cloud is properly set up in your org
* Person Account model is enabled and configured
* Required Non-Profit Cloud objects have appropriate permissions
* Duplicate rules are configured for Person Accounts and Business Accounts

### Non-Profit Cloud Compatibility

The Non-Profit Cloud Extension is specifically designed for:

* **Non-Profit Cloud Base**: Core non-profit functionality with Person Accounts
* **Non-Profit Cloud Case Management**: Enhanced case and program management
* **Non-Profit Cloud Fundraising**: Advanced fundraising and donor management features

### Direct Installation Links

The MoveData Non-Profit Cloud Extension can be installed directly from:

* Production & Developer Editions: [https://api.movedata.io/installer/nonprofit-cloud-extension](https://api.movedata.io/installer/nonprofit-cloud-extension)
* Sandbox & Scratch Orgs: [https://api.movedata.io/installer/nonprofit-cloud-extension?sandbox=1](https://api.movedata.io/installer/nonprofit-cloud-extension?sandbox=1)

## Non-Profit Cloud Data Flows

### Donation Processing Workflow

1. **Constituent Identification**: Person Accounts created or matched for donors
2. **Gift Transaction Creation**: Native gift transactions created with full attribution
3. **Campaign Attribution**: Gifts linked to appropriate campaigns and sources
4. **Program Allocation**: Gifts allocated to designated programs or funds
5. **Acknowledgment Processing**: Integration with Non-Profit Cloud's acknowledgment workflows

### Recurring Gift Setup

1. **Recurring Gift Creation**: Recurring gift schedules established in Non-Profit Cloud
2. **Payment Method Setup**: Payment information secured and linked to recurring gifts
3. **Schedule Processing**: Automatic gift transaction generation based on schedule
4. **Payment Processing Integration**: Integration with payment processors for automatic collection

### Campaign Member Management

1. **Campaign Creation**: Fundraising campaigns created with proper hierarchy
2. **Member Registration**: Constituents registered as campaign members with appropriate roles
3. **Engagement Tracking**: Campaign member responses and engagement tracked
4. **Performance Analytics**: Campaign effectiveness measured through native reporting

## Advanced Features

### Data Integration Capabilities

**Anonymous Gift Handling**

* Processes anonymous donations with configurable Anonymous Person Account
* Maintains donor privacy while preserving gift attribution and reporting
* Supports anonymous recurring gifts and pledge processing

**Complex Gift Scenarios**

* Handles tribute and memorial gifts with honoree tracking
* Processes matching gifts with employer attribution
* Supports in-kind gifts and gift-in-kind valuations
* Manages pledge payments and pledge fulfillment tracking

### Duplicate Management

**Intelligent Matching**

* Uses Non-Profit Cloud's native duplicate rules for Person Account matching
* Prevents duplicate constituent creation while maintaining data quality
* Handles complex matching scenarios including name variations and contact methods
* Supports manual review and merge processes for edge cases

### Multi-Currency and International Support

**Global Operations**

* Processes gifts in multiple currencies with automatic conversion
* Maintains original currency amounts alongside converted values
* Supports international address formats and validation
* Handles regional tax and compliance requirements

### Integration Flexibility

**Customization Support**

* Supports custom fields on Gift Transactions and Person Accounts
* Integrates with custom Non-Profit Cloud objects and processes
* Allows for organization-specific business rules and workflows
* Provides hooks for custom post-processing and integrations

**Audit and Compliance**

* Maintains comprehensive audit trails for all gift processing
* Supports compliance reporting and regulatory requirements
* Integrates with Non-Profit Cloud's built-in security and privacy controls
* Provides data retention and archival support