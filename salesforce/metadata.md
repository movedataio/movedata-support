---
description: >-
  This reference documents the custom metadata entries
  (movedata__Movedata_Pipeline__mdt) that configure the Donation Pipeline for
  Non-Profit Cloud implementations.
---

# Metadata

## Extension Configuration

### Extension Registration

The NPC Extension is registered through two core metadata entries that identify the extension namespace and enable NPC-specific processing:

#### Extension Namespace

**Metadata Entry**: `EXTENSION_DONATION_NAMESPACE`

| Field   | Value                          |
| ------- | ------------------------------ |
| Label   | `EXTENSION_DONATION_NAMESPACE` |
| Handler | `md_npc_pack`                  |
| Order   | 5                              |
| Type    | `Config`                       |

**Purpose**: Identifies the package namespace for all NPC Extension components. This namespace prefix (`md_npc_pack`) is used throughout the configuration to reference flows, fieldsets, and other extension resources.

#### Extension Mode

**Metadata Entry**: `EXTENSION_DONATION_NPC`

| Field   | Value           |
| ------- | --------------- |
| Label   | `EXTENSION_NPC` |
| Handler | `true`          |
| Order   | 5               |
| Type    | `Config`        |

**Purpose**: Activates Non-Profit Cloud-specific processing logic. When enabled, the pipeline uses NPC data models (GiftTransaction, GiftCommitment) instead of NPSP models (Opportunity, Recurring Donation).

## Pipeline Schema Registration

### Donation Schema

**Metadata Entry**: `movedata__Movedata_Schema_Map__mdt.donation`

| Field       | Value                      |
| ----------- | -------------------------- |
| MasterLabel | `donation`                 |
| Handler     | `MoveDataDonationPipeline` |
| Version     | 1                          |
| Type        | `Apex`                     |

**Purpose**: Registers the Donation Pipeline to process notifications using the `donation` schema. This is the primary entry point that routes donation notifications to the multi-stage processing engine.

### Commerce Schema

**Metadata Entry**: `movedata__Movedata_Schema_Map__mdt.commerce`

| Field       | Value                      |
| ----------- | -------------------------- |
| MasterLabel | `commerce`                 |
| Handler     | `MoveDataCommercePipeline` |
| Version     | 1                          |
| Type        | `Apex`                     |

**Purpose**: Registers the Commerce Pipeline for processing e-commerce and merchandise transactions through the NPC Extension.

## Stage 1: Account Processing

The Account stage creates or updates Account records for organisational donors, matched gift companies, and fundraising organisations. In NPC implementations, accounts may be configured as person accounts for individual donors.

### Account Disable

**Metadata Entry**: `DONATION_ACCOUNT_DISABLE`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_DONATION_ACCOUNT_DISABLE` |
| Handler | `false`                             |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: Controls whether account processing is enabled. Set to `false` by default, meaning account processing is active. Change to `true` to bypass account creation/updates entirely.

### Account Fieldset

**Metadata Entry**: `DONATION_ACCOUNT_FIELDSET_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_DONATION_ACCOUNT_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Account_Fieldset` |
| Type    | `Fieldset`                                        |

**Purpose**: Specifies the fieldset that defines which Account fields should be loaded when existing account records are located during duplicate matching. This ensures all necessary fields are available for mapping and comparison operations.

### Account Platform Key

**Metadata Entry**: `DONATION_ACCOUNT_PLATFORM_KEY_001`

| Field   | Value                                       |
| ------- | ------------------------------------------- |
| Label   | `PIPELINE_DONATION_ACCOUNT_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Account_Key` |
| Order   | 5                                           |
| Type    | `Flow`                                      |

**Purpose**: Lightning Flow that generates the unique platform identifier used to track account records across systems. This key enables reliable duplicate detection and maintains data lineage from fundraising platforms.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Key`

### Account Duplicate Detection

**Metadata Entry**: `DONATION_ACCOUNT_DUPLICATE_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_DONATION_ACCOUNT_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Account_Duplicate` |
| Order   | 5                                                 |
| Type    | `Flow`                                            |

**Purpose**: Lightning Flow that implements duplicate matching logic to locate existing account records before creating new ones. Prevents duplicate account creation by checking platform keys, external IDs, and other matching criteria.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Duplicate`

### Account Field Mapping

**Metadata Entry**: `DONATION_ACCOUNT_MAPPING_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_DONATION_ACCOUNT_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Account_Mapping` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Primary Lightning Flow that maps notification data to Account fields. Handles standard field mappings including organisation name, address information, and account type classifications.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Mapping`

### Account Post-Processing

**Metadata Entry**: `DONATION_ACCOUNT_POST_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_DONATION_ACCOUNT_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Account_Post` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Lightning Flow that executes after account records are created or updated. Handles post-upsert operations such as relationship creation, additional record updates, or triggering downstream processes.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Post`

## Stage 2: Contact Processing

The Contact stage creates or updates Contact records for individual donors, fundraisers, and tribute contacts. In Non-Profit Cloud implementations using person accounts, this stage is configured to process Account records instead of Contact records.

### Contact Disable

**Metadata Entry**: `DONATION_CONTACT_DISABLE`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_DONATION_CONTACT_DISABLE` |
| Handler | `false`                             |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: Controls whether contact processing is enabled. Set to `false` by default for active processing.

### Contact SObject Override

**Metadata Entry**: `DONATION_CONTACT_SOBJECT`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_DONATION_CONTACT_SOBJECT` |
| Handler | `Account`                           |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: **Critical for NPC implementations** - Overrides the default Contact object with Account to support person account processing. When set to `Account`, the pipeline treats individual donors as person accounts rather than traditional Contacts, aligning with Non-Profit Cloud's person account model.

### Contact Fieldset

**Metadata Entry**: `DONATION_CONTACT_FIELDSET_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_DONATION_CONTACT_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Contact_Fieldset` |
| Type    | `Fieldset`                                        |

**Purpose**: Defines which fields should be loaded when existing contact/person account records are located. In person account scenarios, this fieldset includes both standard Contact fields and Account-specific fields.

### Contact Platform Key

**Metadata Entry**: `DONATION_CONTACT_PLATFORM_KEY_001`

| Field   | Value                                       |
| ------- | ------------------------------------------- |
| Label   | `PIPELINE_DONATION_CONTACT_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Key` |
| Order   | 5                                           |
| Type    | `Flow`                                      |

**Purpose**: Generates unique platform identifiers for contact/person account records to enable cross-system tracking and duplicate prevention.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Key`

### Contact Duplicate Detection

**Metadata Entry**: `DONATION_CONTACT_DUPLICATE_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_DONATION_CONTACT_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Duplicate` |
| Order   | 5                                                 |
| Type    | `Flow`                                            |

**Purpose**: Implements duplicate matching logic for contacts/person accounts using email, name matching, and platform keys.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Duplicate`

### Contact Field Mapping

**Metadata Entry**: `DONATION_CONTACT_MAPPING_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_DONATION_CONTACT_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Mapping` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Maps notification data to Contact or person Account fields including names, contact information, and donor classifications.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Mapping`

### Contact Post-Processing

**Metadata Entry**: `DONATION_CONTACT_POST_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_DONATION_CONTACT_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Post` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Executes post-upsert operations for contact/person account records.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Post`

## Stage 3: Campaign Processing

The Campaign stage creates or updates Campaign records representing fundraising initiatives, peer-to-peer campaigns, and campaign hierarchies.

### Campaign Disable

**Metadata Entry**: `DONATION_CAMPAIGN_DISABLE`

| Field   | Value                                |
| ------- | ------------------------------------ |
| Label   | `PIPELINE_DONATION_CAMPAIGN_DISABLE` |
| Handler | `false`                              |
| Order   | 5                                    |
| Type    | `Config`                             |

**Purpose**: Controls campaign processing. Set to `false` for active processing.

### Campaign Fieldset

**Metadata Entry**: `DONATION_CAMPAIGN_FIELDSET_001`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Label   | `PIPELINE_DONATION_CAMPAIGN_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Campaign_Fieldset` |
| Type    | `Fieldset`                                         |

**Purpose**: Defines Campaign fields to load during duplicate matching and processing.

### Campaign Platform Key

**Metadata Entry**: `DONATION_CAMPAIGN_PLATFORM_KEY_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_DONATION_CAMPAIGN_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Key` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Generates unique platform identifiers for campaign records.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Key`

### Campaign Name Generation

**Metadata Entry**: `DONATION_CAMPAIGN_NAME_001`

| Field   | Value                                         |
| ------- | --------------------------------------------- |
| Label   | `PIPELINE_DONATION_CAMPAIGN_NAME`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Name` |
| Order   | 5                                             |
| Type    | `Flow`                                        |

**Purpose**: Custom campaign name generation logic that can construct campaign names based on notification data, hierarchies, or naming conventions.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Name`

### Campaign Duplicate Detection

**Metadata Entry**: `DONATION_CAMPAIGN_DUPLICATE_001`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Label   | `PIPELINE_DONATION_CAMPAIGN_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Duplicate` |
| Order   | 5                                                  |
| Type    | `Flow`                                             |

**Purpose**: Locates existing campaign records using platform keys and name matching to prevent duplicates.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Duplicate`

### Campaign Field Mapping

**Metadata Entry**: `DONATION_CAMPAIGN_MAPPING_001`

| Field   | Value                                            |
| ------- | ------------------------------------------------ |
| Label   | `PIPELINE_DONATION_CAMPAIGN_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Mapping` |
| Order   | 5                                                |
| Type    | `Flow`                                           |

**Purpose**: Maps notification data to Campaign fields including campaign type, goals, dates, and hierarchy relationships.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Mapping`

### Campaign Post-Processing

**Metadata Entry**: `DONATION_CAMPAIGN_POST_001`

| Field   | Value                                         |
| ------- | --------------------------------------------- |
| Label   | `PIPELINE_DONATION_CAMPAIGN_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Post` |
| Order   | 5                                             |
| Type    | `Flow`                                        |

**Purpose**: Handles post-upsert operations for campaigns including parent-child campaign linking and campaign member creation.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Post`

## Stage 4: Recurring Donation Processing

The Recurring Donation stage creates or updates recurring gift records. In Non-Profit Cloud, this stage processes GiftCommitment objects which represent ongoing, scheduled giving arrangements.

### Recurring Disable

**Metadata Entry**: `DONATION_RECURRING_DISABLE`

| Field   | Value                                 |
| ------- | ------------------------------------- |
| Label   | `PIPELINE_DONATION_RECURRING_DISABLE` |
| Handler | `false`                               |
| Order   | 5                                     |
| Type    | `Config`                              |

**Purpose**: Controls recurring donation processing. Set to `true` to disable processing.

### Recurring SObject Override

**Metadata Entry**: `DONATION_RECURRING_SOBJECT`

| Field   | Value                                 |
| ------- | ------------------------------------- |
| Label   | `PIPELINE_DONATION_RECURRING_SOBJECT` |
| Handler | `GiftCommitment`                      |
| Order   | 5                                     |
| Type    | `Config`                              |

**Purpose**: **Critical for NPC implementations** - Sets the SObject type to `GiftCommitment`, the Non-Profit Cloud standard object for recurring donations. This overrides the NPSP `npe03__Recurring_Donation__c` object.

### Recurring Fieldset

**Metadata Entry**: `DONATION_RECURRING_FIELDSET_001`

| Field   | Value                                               |
| ------- | --------------------------------------------------- |
| Label   | `PIPELINE_DONATION_RECURRING_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Recurring_Fieldset` |
| Type    | `Fieldset`                                          |

**Purpose**: Defines GiftCommitment fields to load during processing.

### Recurring Platform Key

**Metadata Entry**: `DONATION_RECURRING_PLATFORM_KEY_001`

| Field   | Value                                         |
| ------- | --------------------------------------------- |
| Label   | `PIPELINE_DONATION_RECURRING_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Recurring_Key` |
| Order   | 5                                             |
| Type    | `Flow`                                        |

**Purpose**: Generates unique platform identifiers for recurring donation records.

**Flow**: `md_npc_pack.MoveData_Donation_Recurring_Key`

### Recurring Duplicate Detection

**Metadata Entry**: `DONATION_RECURRING_DUPLICATE_001`

| Field   | Value                                               |
| ------- | --------------------------------------------------- |
| Label   | `PIPELINE_DONATION_RECURRING_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Recurring_Duplicate` |
| Order   | 5                                                   |
| Type    | `Flow`                                              |

**Purpose**: Locates existing GiftCommitment records to prevent duplicate recurring donation creation.

**Flow**: `md_npc_pack.MoveData_Donation_Recurring_Duplicate`

### Recurring Field Mapping

**Metadata Entry**: `DONATION_RECURRING_MAPPING_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_DONATION_RECURRING_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Recurring_Mapping` |
| Order   | 5                                                 |
| Type    | `Flow`                                            |

**Purpose**: Maps notification data to GiftCommitment fields including recurring frequency, amount, status, and schedule information.

**Flow**: `md_npc_pack.MoveData_Donation_Recurring_Mapping`

### Recurring Post-Processing

**Metadata Entry**: `DONATION_RECURRING_POST_001`

| Field   | Value                                          |
| ------- | ---------------------------------------------- |
| Label   | `PIPELINE_DONATION_RECURRING_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Recurring_Post` |
| Order   | 5                                              |
| Type    | `Flow`                                         |

**Purpose**: Executes post-upsert operations for recurring donations including schedule creation and donor relationship management.

**Flow**: `md_npc_pack.MoveData_Donation_Recurring_Post`

## Stage 5: Donation Processing

The Donation stage creates or updates individual donation transaction records. In Non-Profit Cloud, this stage processes GiftTransaction objects which represent individual monetary gifts.

### Donation Platform Key

**Metadata Entry**: `DONATION_DONATION_PLATFORM_KEY_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_DONATION_DONATION_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Donation_Key` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Generates unique platform identifiers for donation transaction records.

**Flow**: `md_npc_pack.MoveData_Donation_Donation_Key`

### Donation Fieldset

**Metadata Entry**: `DONATION_DONATION_FIELDSET_001`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Label   | `PIPELINE_DONATION_DONATION_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Donation_Fieldset` |
| Type    | `Fieldset`                                         |

**Purpose**: Defines GiftTransaction fields to load during processing.

### Donation Duplicate Detection

**Metadata Entry**: `DONATION_DONATION_DUPLICATE_001`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Label   | `PIPELINE_DONATION_DONATION_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Donation_Duplicate` |
| Order   | 5                                                  |
| Type    | `Flow`                                             |

**Purpose**: Locates existing GiftTransaction records to prevent duplicate donation creation using platform keys and transaction identifiers.

**Flow**: `md_npc_pack.MoveData_Donation_Donation_Duplicate`

### Donation Field Mapping

**Metadata Entry**: `DONATION_DONATION_MAPPING_001`

| Field   | Value                                            |
| ------- | ------------------------------------------------ |
| Label   | `PIPELINE_DONATION_DONATION_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Donation_Mapping` |
| Order   | 5                                                |
| Type    | `Flow`                                           |

**Purpose**: Maps notification data to GiftTransaction fields including amount, date, payment method, designation, and tribute information.

**Flow**: `md_npc_pack.MoveData_Donation_Donation_Mapping`

### Donation Post-Processing

**Metadata Entry**: `DONATION_DONATION_POST_001`

| Field   | Value                                         |
| ------- | --------------------------------------------- |
| Label   | `PIPELINE_DONATION_DONATION_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Donation_Post` |
| Order   | 5                                             |
| Type    | `Flow`                                        |

**Purpose**: Executes post-upsert operations for donation records including acknowledgment processing, tax receipt generation, and campaign member updates.

**Flow**: `md_npc_pack.MoveData_Donation_Donation_Post`

***

## Commerce Pipeline Configuration

The Commerce Pipeline processes e-commerce transactions, product catalog management, and order fulfillment. Like the Donation Pipeline, it follows a multi-stage architecture but is optimized for merchandise sales, event registrations, and other commercial transactions.

### Commerce Pipeline Architecture

The Commerce Pipeline operates through seven distinct stages:

1. **Configuration** - Pipeline configuration and setup
2. **Preprocess** - Pre-processing transformations (optional)
3. **Account** - Customer account management
4. **Contact** - Customer contact/person account management
5. **Campaign** - Marketing campaign association
6. **Catalog** - Product catalog management
7. **Order** - Order header processing
8. **Order Item** - Individual line item processing

### Extension Configuration

#### Commerce Extension Namespace

**Metadata Entry**: `EXTENSION_COMMERCE_NAMESPACE`

| Field   | Value                          |
| ------- | ------------------------------ |
| Label   | `EXTENSION_COMMERCE_NAMESPACE` |
| Handler | `md_npc_pack`                  |
| Order   | 5                              |
| Type    | `Config`                       |

**Purpose**: Identifies the package namespace for Commerce Pipeline components. Uses the same `md_npc_pack` namespace as the Donation Pipeline.

#### Commerce Extension Mode

**Metadata Entry**: `EXTENSION_COMMERCE_MODE`

| Field   | Value                         |
| ------- | ----------------------------- |
| Label   | `EXTENSION_COMMERCE_MODE`     |
| Handler | `single_step` or `multi_step` |
| Order   | 5                             |
| Type    | `Config`                      |

**Purpose**: Controls the commerce processing mode. When set to `single_step`, all commerce processing occurs in a single flow. When set to `multi_step` (default), the pipeline executes through all seven stages sequentially.

### Stage 0: Configuration

**Metadata Key**: `PIPELINE_COMMERCE_CONFIGURATION`

**Purpose**: Enables configuration flows that set conditional values or advanced settings not exposed through the Settings interface. Configuration flows execute before all other stages.

### Stage 1: Pre-processing

**Metadata Key**: `PIPELINE_COMMERCE_PREPROCESS`

**Purpose**: Allows transformation or enhancement of commerce notifications before main processing begins. Common use cases include:

* Notification transformation or enrichment
* Conditional routing logic
* Data validation and cleansing

### Stage 2: Commerce Account Processing

Creates or updates Account records for commerce customers and organizations.

#### Commerce Account Disable

**Metadata Entry**: `COMMERCE_ACCOUNT_DISABLE`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_COMMERCE_ACCOUNT_DISABLE` |
| Handler | `false`                             |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: Controls whether commerce account processing is enabled. Default is `false` (enabled).

#### Commerce Account Fieldset

**Metadata Entry**: `COMMERCE_ACCOUNT_FIELDSET_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ACCOUNT_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Account_Fieldset` |
| Type    | `Fieldset`                                        |

**Purpose**: Defines Account fields to load during duplicate matching. Reuses the donation account fieldset for consistency.

#### Commerce Account Platform Key

**Metadata Entry**: `COMMERCE_ACCOUNT_PLATFORM_KEY_001`

| Field   | Value                                       |
| ------- | ------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ACCOUNT_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Account_Key` |
| Order   | 5                                           |
| Type    | `Flow`                                      |

**Purpose**: Generates unique platform identifiers for commerce customer accounts.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Key`

#### Commerce Account Field Mapping

**Metadata Entry**: `COMMERCE_ACCOUNT_MAPPING_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ACCOUNT_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Account_Mapping` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Maps commerce notification data to Account fields for customer organizations.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Mapping`

#### Commerce Account Duplicate Detection

**Metadata Entry**: `COMMERCE_ACCOUNT_DUPLICATE_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ACCOUNT_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Account_Duplicate` |
| Order   | 5                                                 |
| Type    | `Flow`                                            |

**Purpose**: Locates existing customer account records to prevent duplicates.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Duplicate`

#### Commerce Account Post-Processing

**Metadata Entry**: `COMMERCE_ACCOUNT_POST_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ACCOUNT_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Account_Post` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Executes post-upsert operations for commerce customer accounts.

**Flow**: `md_npc_pack.MoveData_Donation_Account_Post`

### Stage 3: Commerce Contact Processing

Creates or updates Contact records (or person Accounts) for individual customers.

#### Commerce Contact Disable

**Metadata Entry**: `COMMERCE_CONTACT_DISABLE`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_COMMERCE_CONTACT_DISABLE` |
| Handler | `false`                             |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: Controls commerce contact processing. Default is `false` (enabled).

#### Commerce Contact SObject Override

**Metadata Entry**: `COMMERCE_CONTACT_SOBJECT`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_COMMERCE_CONTACT_SOBJECT` |
| Handler | `Account`                           |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: **Critical for NPC implementations** - Overrides default Contact object with Account to support person account processing for individual customers.

#### Commerce Contact Fieldset

**Metadata Entry**: `COMMERCE_CONTACT_FIELDSET_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CONTACT_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Contact_Fieldset` |
| Type    | `Fieldset`                                        |

**Purpose**: Defines fields to load for customer contact/person account records.

#### Commerce Contact Platform Key

**Metadata Entry**: `COMMERCE_CONTACT_PLATFORM_KEY_001`

| Field   | Value                                       |
| ------- | ------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CONTACT_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Key` |
| Order   | 5                                           |
| Type    | `Flow`                                      |

**Purpose**: Generates unique platform identifiers for customer contacts.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Key`

#### Commerce Contact Field Mapping

**Metadata Entry**: `COMMERCE_CONTACT_MAPPING_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CONTACT_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Mapping` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Maps commerce notification data to customer Contact/person Account fields.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Mapping`

#### Commerce Contact Duplicate Detection

**Metadata Entry**: `COMMERCE_CONTACT_DUPLICATE_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CONTACT_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Duplicate` |
| Order   | 5                                                 |
| Type    | `Flow`                                            |

**Purpose**: Locates existing customer contact records to prevent duplicates.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Duplicate`

#### Commerce Contact Post-Processing

**Metadata Entry**: `COMMERCE_CONTACT_POST_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CONTACT_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Contact_Post` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Executes post-upsert operations for customer contacts.

**Flow**: `md_npc_pack.MoveData_Donation_Contact_Post`

### Stage 4: Commerce Campaign Processing

Associates commerce transactions with marketing campaigns.

#### Commerce Campaign Disable

**Metadata Entry**: `COMMERCE_CAMPAIGN_DISABLE`

| Field   | Value                                |
| ------- | ------------------------------------ |
| Label   | `PIPELINE_COMMERCE_CAMPAIGN_DISABLE` |
| Handler | `false`                              |
| Order   | 5                                    |
| Type    | `Config`                             |

**Purpose**: Controls commerce campaign processing. Default is `false` (enabled).

#### Commerce Campaign Fieldset

**Metadata Entry**: `COMMERCE_CAMPAIGN_FIELDSET_001`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CAMPAIGN_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Donation_Campaign_Fieldset` |
| Type    | `Fieldset`                                         |

**Purpose**: Defines Campaign fields to load for commerce campaigns.

#### Commerce Campaign Platform Key

**Metadata Entry**: `COMMERCE_CAMPAIGN_PLATFORM_KEY_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CAMPAIGN_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Key` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Generates unique platform identifiers for commerce campaigns.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Key`

#### Commerce Campaign Name Generation

**Metadata Entry**: `COMMERCE_CAMPAIGN_NAME_001`

| Field   | Value                                         |
| ------- | --------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CAMPAIGN_NAME`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Name` |
| Order   | 5                                             |
| Type    | `Flow`                                        |

**Purpose**: Generates campaign names for commerce-related campaigns.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Name`

#### Commerce Campaign Field Mapping

**Metadata Entry**: `COMMERCE_CAMPAIGN_MAPPING_001`

| Field   | Value                                            |
| ------- | ------------------------------------------------ |
| Label   | `PIPELINE_COMMERCE_CAMPAIGN_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Mapping` |
| Order   | 5                                                |
| Type    | `Flow`                                           |

**Purpose**: Maps commerce notification data to Campaign fields.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Mapping`

#### Commerce Campaign Duplicate Detection

**Metadata Entry**: `COMMERCE_CAMPAIGN_DUPLICATE_001`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CAMPAIGN_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Duplicate` |
| Order   | 5                                                  |
| Type    | `Flow`                                             |

**Purpose**: Locates existing campaign records for commerce transactions.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Duplicate`

#### Commerce Campaign Post-Processing

**Metadata Entry**: `COMMERCE_CAMPAIGN_POST_001`

| Field   | Value                                         |
| ------- | --------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CAMPAIGN_POST`             |
| Handler | `md_npc_pack.MoveData_Donation_Campaign_Post` |
| Order   | 5                                             |
| Type    | `Flow`                                        |

**Purpose**: Executes post-upsert operations for commerce campaigns.

**Flow**: `md_npc_pack.MoveData_Donation_Campaign_Post`

### Stage 5: Product Catalog Processing

Manages product records and catalog information.

#### Catalog Disable

**Metadata Entry**: `COMMERCE_CATALOG_DISABLE`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_DISABLE` |
| Handler | `false`                             |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: Controls product catalog processing. Default is `false` (enabled).

#### Catalog SObject Override

**Metadata Entry**: `COMMERCE_CATALOG_SOBJECT`

| Field   | Value                               |
| ------- | ----------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_SOBJECT` |
| Handler | Custom product object name          |
| Order   | 5                                   |
| Type    | `Config`                            |

**Purpose**: Allows override of the default product SObject type. Can be used to specify custom product objects or alternate catalog structures.

#### Catalog Fieldset

**Metadata Entry**: `COMMERCE_CATALOG_FIELDSET_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Commerce_Product_Fieldset` |
| Type    | `Fieldset`                                        |

**Purpose**: Defines product fields to load during catalog processing.

#### Catalog Platform Key

**Metadata Entry**: `COMMERCE_CATALOG_PLATFORM_KEY_001`

| Field   | Value                                       |
| ------- | ------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Commerce_Catalog_Key` |
| Order   | 5                                           |
| Type    | `Flow`                                      |

**Purpose**: Generates unique platform identifiers for product catalog items.

**Flow**: `md_npc_pack.MoveData_Commerce_Catalog_Key`

#### Catalog Name Generation

**Metadata Entry**: `COMMERCE_CATALOG_NAME_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_NAME`             |
| Handler | `md_npc_pack.MoveData_Commerce_Catalog_Name` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Generates product names and handles product naming conventions.

**Flow**: `md_npc_pack.MoveData_Commerce_Catalog_Name`

#### Catalog Field Mapping

**Metadata Entry**: `COMMERCE_CATALOG_MAPPING_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Commerce_Catalog_Mapping` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Maps commerce notification data to product catalog fields including SKU, description, pricing, and inventory information.

**Flow**: `md_npc_pack.MoveData_Commerce_Catalog_Mapping`

#### Catalog Duplicate Detection

**Metadata Entry**: `COMMERCE_CATALOG_DUPLICATE_001`

| Field   | Value                                             |
| ------- | ------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Commerce_Catalog_Duplicate` |
| Order   | 5                                                 |
| Type    | `Flow`                                            |

**Purpose**: Locates existing product records using SKU, platform keys, or other identifiers to prevent duplicate product creation.

**Flow**: `md_npc_pack.MoveData_Commerce_Catalog_Duplicate`

#### Catalog Post-Processing

**Metadata Entry**: `COMMERCE_CATALOG_POST_001`

| Field   | Value                                        |
| ------- | -------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_CATALOG_POST`             |
| Handler | `md_npc_pack.MoveData_Commerce_Catalog_Post` |
| Order   | 5                                            |
| Type    | `Flow`                                       |

**Purpose**: Executes post-upsert operations for product catalog records including price book entries and product categorization.

**Flow**: `md_npc_pack.MoveData_Commerce_Catalog_Post`

### Stage 6: Order Processing

Manages order header records representing complete customer transactions.

#### Order Disable

**Metadata Entry**: `COMMERCE_ORDER_DISABLE`

| Field   | Value                             |
| ------- | --------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDER_DISABLE` |
| Handler | `false`                           |
| Order   | 5                                 |
| Type    | `Config`                          |

**Purpose**: Controls order header processing. Default is `false` (enabled).

#### Order SObject Override

**Metadata Entry**: `COMMERCE_ORDER_SOBJECT`

| Field   | Value                             |
| ------- | --------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDER_SOBJECT` |
| Handler | Custom order object name          |
| Order   | 5                                 |
| Type    | `Config`                          |

**Purpose**: Allows override of the default Order SObject type for custom order management implementations.

#### Order Fieldset

**Metadata Entry**: `COMMERCE_ORDER_FIELDSET_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDER_FIELDSET`              |
| Handler | `md_npc_pack__MoveData_Commerce_Order_Fieldset` |
| Type    | `Fieldset`                                      |

**Purpose**: Defines Order fields to load during processing.

#### Order Platform Key

**Metadata Entry**: `COMMERCE_ORDER_PLATFORM_KEY_001`

| Field   | Value                                     |
| ------- | ----------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDER_PLATFORM_KEY`    |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Key` |
| Order   | 5                                         |
| Type    | `Flow`                                    |

**Purpose**: Generates unique platform identifiers for order records.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Key`

#### Order Name Generation

**Metadata Entry**: `COMMERCE_ORDER_NAME_001`

| Field   | Value                                      |
| ------- | ------------------------------------------ |
| Label   | `PIPELINE_COMMERCE_ORDER_NAME`             |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Name` |
| Order   | 5                                          |
| Type    | `Flow`                                     |

**Purpose**: Generates order numbers and handles order naming conventions.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Name`

#### Order Field Mapping

**Metadata Entry**: `COMMERCE_ORDER_MAPPING_001`

| Field   | Value                                         |
| ------- | --------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDER_MAPPING`             |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Mapping` |
| Order   | 5                                             |
| Type    | `Flow`                                        |

**Purpose**: Maps commerce notification data to Order header fields including totals, status, shipping information, and payment details.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Mapping`

#### Order Duplicate Detection

**Metadata Entry**: `COMMERCE_ORDER_DUPLICATE_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDER_DUPLICATE`             |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Duplicate` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Locates existing order records using platform keys and order numbers to prevent duplicate orders.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Duplicate`

#### Order Post-Processing

**Metadata Entry**: `COMMERCE_ORDER_POST_001`

| Field   | Value                                      |
| ------- | ------------------------------------------ |
| Label   | `PIPELINE_COMMERCE_ORDER_POST`             |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Post` |
| Order   | 5                                          |
| Type    | `Flow`                                     |

**Purpose**: Executes post-upsert operations for order records.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Post`

#### Order Final Processing

**Metadata Entry**: `COMMERCE_ORDER_FINAL_001`

| Field   | Value                                       |
| ------- | ------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDER_FINAL`             |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Final` |
| Order   | 5                                           |
| Type    | `Flow`                                      |

**Purpose**: Executes final order processing after all order items have been processed. This is the last step in the commerce pipeline and handles order-level calculations, status updates, and fulfillment triggers.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Final`

### Stage 7: Order Item Processing

Manages individual line items within orders, linking products to orders with quantities and pricing.

#### Order Item Disable

**Metadata Entry**: `COMMERCE_ORDERITEM_DISABLE`

| Field   | Value                                 |
| ------- | ------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_DISABLE` |
| Handler | `false`                               |
| Order   | 5                                     |
| Type    | `Config`                              |

**Purpose**: Controls order item processing. Default is `false` (enabled).

#### Order Item SObject Override

**Metadata Entry**: `COMMERCE_ORDERITEM_SOBJECT`

| Field   | Value                                 |
| ------- | ------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_SOBJECT` |
| Handler | Custom order item object name         |
| Order   | 5                                     |
| Type    | `Config`                              |

**Purpose**: Allows override of the default OrderItem SObject type for custom order line item implementations.

#### Order Item Fieldset

**Metadata Entry**: `COMMERCE_ORDERITEM_FIELDSET_001`

| Field   | Value                                                |
| ------- | ---------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_FIELDSET`               |
| Handler | `md_npc_pack__MoveData_Commerce_Order_Item_Fieldset` |
| Type    | `Fieldset`                                           |

**Purpose**: Defines OrderItem fields to load during processing.

#### Order Item Platform Key

**Metadata Entry**: `COMMERCE_ORDERITEM_PLATFORM_KEY_001`

| Field   | Value                                          |
| ------- | ---------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_PLATFORM_KEY`     |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Item_Key` |
| Order   | 5                                              |
| Type    | `Flow`                                         |

**Purpose**: Generates unique platform identifiers for order line items.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Item_Key`

#### Order Item Name Generation

**Metadata Entry**: `COMMERCE_ORDERITEM_NAME_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_NAME`              |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Item_Name` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Generates order item names and handles line item naming conventions.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Item_Name`

#### Order Item Field Mapping

**Metadata Entry**: `COMMERCE_ORDERITEM_MAPPING_001`

| Field   | Value                                              |
| ------- | -------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_MAPPING`              |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Item_Mapping` |
| Order   | 5                                                  |
| Type    | `Flow`                                             |

**Purpose**: Maps commerce notification data to OrderItem fields including product reference, quantity, unit price, discounts, and line totals.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Item_Mapping`

#### Order Item Duplicate Detection

**Metadata Entry**: `COMMERCE_ORDERITEM_DUPLICATE_001`

| Field   | Value                                                |
| ------- | ---------------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_DUPLICATE`              |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Item_Duplicate` |
| Order   | 5                                                    |
| Type    | `Flow`                                               |

**Purpose**: Locates existing order item records to prevent duplicate line items within orders.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Item_Duplicate`

#### Order Item Post-Processing

**Metadata Entry**: `COMMERCE_ORDERITEM_POST_001`

| Field   | Value                                           |
| ------- | ----------------------------------------------- |
| Label   | `PIPELINE_COMMERCE_ORDERITEM_POST`              |
| Handler | `md_npc_pack.MoveData_Commerce_Order_Item_Post` |
| Order   | 5                                               |
| Type    | `Flow`                                          |

**Purpose**: Executes post-upsert operations for order items including inventory updates and fulfillment triggers.

**Flow**: `md_npc_pack.MoveData_Commerce_Order_Item_Post`
