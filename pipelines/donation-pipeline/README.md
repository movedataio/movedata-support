---
description: >-
  A managed processing engine transforming donation notifications into
  Salesforce records.
---

# Donation Pipeline

## Overview

The MoveData Donation Pipeline (`MoveDataDonationPipeline`) is a sophisticated multi-stage processing engine that transforms donation notifications from fundraising platforms into structured Salesforce records. It implements the `donation` schema and provides comprehensive support for complex fundraising scenarios including peer-to-peer campaigns, recurring donations, matched gifts, and tribute donations.

The pipeline operates through a series of sequential stages, each handling specific aspects of the donation processing workflow, ensuring data integrity and maintaining relationships between donors, campaigns, and donations.

## Implementations

The Donation Pipeline is implemented through MoveData Extensions that provide out-of-the-box processing flows for different Salesforce data models.  These extensions register their processing handlers with the pipeline through metadata configuration, providing turnkey functionality whilst allowing for customisation through Lightning Flows and custom business rules.

### MoveData NPSP Fundraising & Donations Extension

{% hint style="info" %}
See [MoveData NPSP Fundraising & Donations Extension Reference](https://www.google.com)
{% endhint %}

Provides comprehensive processing flows for organisations using the Nonprofit Success Pack (NPSP) data model.&#x20;

### MoveData Nonprofit Cloud Extension

{% hint style="info" %}
See [MoveData Non-Profit Cloud Extension Reference](https://www.google.com)
{% endhint %}

Enables processing for organisations using Salesforce Nonprofit Cloud data architecture.

## Pipeline Architecture

The Donation Pipeline supports two execution modes:

### Multi-Step Processing (Default)

Processes notifications through discrete, sequential stages with full relationship management and complex business rule support.  This executes the stages listed below sequentially and is suitable for 99% of implementations.

### Single-Step Processing (Alternative)

Provides a streamlined processing approach where all business logic is handled within a single flow or Apex handler.  There are few cases where this makes sense; one example is where an organisation has invested heavily in importing from a Salesforce staging object and would like MoveData to write to this object.

If using a single-step, you need to direct the pipeline by create the following metadata entry:

* Label: `EXTENSION_DONATION_MODE`
* Handler: `single_step`
* Type: `Config`

## Single-Step Stage

**Configuration Key**: `PIPELINE_DONATION_SINGLE_STEP`

When the extension mode is set to `single_step`, the pipeline bypasses the multi-stage process and executes all business logic within a single Lightning Flow. This approach is suitable for:

* Simple integration requirements
* Legacy system compatibility
* Performance-optimised scenarios using Apex

## Multi-Step Pipeline Stages

The multi-step pipeline processes notifications through six distinct stages:

* Pre-Processing
* Accounts
* Contacts
* Campaigns
* Recurring Donations
* Donations

### Stage 0: Configuration

{% hint style="info" %}
**Detailed Example**: [adding-a-configuration-flow.md](../../development-guides/table-of-contents/adding-a-configuration-flow.md "mention")
{% endhint %}

**Purpose**: Enables the setting `Config_` values that are either conditional (ie. if `Platform` is `x`, then) or are more advanced configuration settings that aren't exposed via the Settings interface.

**Metadata Key**: `PIPELINE_DONATION_CONFIGURATION`

### Stage 1: Pre-processing (Optional)

{% hint style="info" %}
**Detailed Example**: [implementing-a-pre-processor.md](../../development-guides/table-of-contents/implementing-a-pre-processor.md "mention")
{% endhint %}

**Purpose**: Allows transformation or enhancement of the notification before main processing begins.

**Metadata Key**: `PIPELINE_DONATION_PREPROCESS`

**Use Cases**:

* Transformation of a notification (eg. Delete all team campaigns)

### Stage 2: Account Processing

**Purpose**: Creates or updates Account records for organisational donors and matched gift companies.

**Default SObject**: `Account`

| Configuration Phase      | Metadata Key                             | Description                                 |
| ------------------------ | ---------------------------------------- | ------------------------------------------- |
| Disable                  | `PIPELINE_DONATION_ACCOUNT_DISABLE`      | Disables account processing entirely        |
| SObject Type             | `PIPELINE_DONATION_ACCOUNT_SOBJECT`      | Overrides default Account SObject type      |
| Field Set                | `PIPELINE_DONATION_ACCOUNT_FIELDSET`     | Defines fields to load for existing records |
| Platform Key             | `PIPELINE_DONATION_ACCOUNT_PLATFORM_KEY` | Generates unique platform identifier        |
| Record Matching          | `PIPELINE_DONATION_ACCOUNT_DUPLICATE`    | Locates existing account records            |
| Field Mapping            | `PIPELINE_DONATION_ACCOUNT_MAPPING`      | Primary field mapping logic                 |
| Field Mapping (Extended) | `PIPELINE_DONATION_ACCOUNT_MAPPING_EXT`  | Additional field mapping logic              |
| Post-Processing          | `PIPELINE_DONATION_ACCOUNT_POST`         | Post-upsert processing logic                |

**Processing Context**:

* Campaign-related accounts (fundraising organisations)
* Donor accounts (organisational donors)
* Matched gift company accounts
* Tribute organisation accounts

### Stage 3: Contact Processing

**Purpose**: Creates or updates Contact records for individual donors, fundraisers, and tribute contacts.

**Default SObject**:&#x20;

* Non-Profit Success Pack (or Other): `Contact`
* Nonprofit Cloud - Person Accounts: `Account`

| Configuration Phase      | Metadata Key                             | Description                                 |
| ------------------------ | ---------------------------------------- | ------------------------------------------- |
| Disable                  | `PIPELINE_DONATION_CONTACT_DISABLE`      | Disables contact processing entirely        |
| SObject Type             | `PIPELINE_DONATION_CONTACT_SOBJECT`      | Overrides default Contact SObject type      |
| Field Set                | `PIPELINE_DONATION_CONTACT_FIELDSET`     | Defines fields to load for existing records |
| Platform Key             | `PIPELINE_DONATION_CONTACT_PLATFORM_KEY` | Generates unique platform identifier        |
| Record Matching          | `PIPELINE_DONATION_CONTACT_DUPLICATE`    | Locates existing contact records            |
| Field Mapping            | `PIPELINE_DONATION_CONTACT_MAPPING`      | Primary field mapping logic                 |
| Field Mapping (Extended) | `PIPELINE_DONATION_CONTACT_MAPPING_EXT`  | Additional field mapping logic              |
| Post-Processing          | `PIPELINE_DONATION_CONTACT_POST`         | Post-upsert processing logic                |

**Processing Context**:

* Individual fundraisers & team captains
* Matched gift contact persons
* Tribute contacts and memorial contacts
* Donors (One-off & Recurring)

### Stage 4: Campaign Processing

**Purpose**: Creates or updates Campaign records representing fundraising initiatives and peer-to-peer hierarchies.

**Default SObject**: `Campaign`

| Configuration Phase      | Metadata Key                              | Description                                 |
| ------------------------ | ----------------------------------------- | ------------------------------------------- |
| Disable                  | `PIPELINE_DONATION_CAMPAIGN_DISABLE`      | Disables campaign processing entirely       |
| SObject Type             | `PIPELINE_DONATION_CAMPAIGN_SOBJECT`      | Overrides default Campaign SObject type     |
| Field Set                | `PIPELINE_DONATION_CAMPAIGN_FIELDSET`     | Defines fields to load for existing records |
| Platform Key             | `PIPELINE_DONATION_CAMPAIGN_PLATFORM_KEY` | Generates unique platform identifier        |
| Campaign Name            | `PIPELINE_DONATION_CAMPAIGN_NAME`         | Custom campaign name generation logic       |
| Record Matching          | `PIPELINE_DONATION_CAMPAIGN_DUPLICATE`    | Locates existing campaign records           |
| Field Mapping            | `PIPELINE_DONATION_CAMPAIGN_MAPPING`      | Primary field mapping logic                 |
| Field Mapping (Extended) | `PIPELINE_DONATION_CAMPAIGN_MAPPING_EXT`  | Additional field mapping logic              |
| Post-Processing          | `PIPELINE_DONATION_CAMPAIGN_POST`         | Post-upsert processing logic                |

**Special Features**:

* Hierarchical campaign relationship management
* Parent-child campaign linking / Multi-level peer-to-peer structure

### Stage 5: Recurring Donation Processing

**Purpose**: Creates or updates recurring donation records for subscription-based giving.

**Default SObject**:

* Non-Profit Success Pack: `npe03__Recurring_Donation__c`&#x20;
* Non-Profit Cloud:  `GiftCommitment`&#x20;

| Configuration Phase      | Metadata Key                               | Description                                       |
| ------------------------ | ------------------------------------------ | ------------------------------------------------- |
| Disable                  | `PIPELINE_DONATION_RECURRING_DISABLE`      | Disables recurring donation processing entirely   |
| SObject Type             | `PIPELINE_DONATION_RECURRING_SOBJECT`      | Overrides default recurring donation SObject type |
| Field Set                | `PIPELINE_DONATION_RECURRING_FIELDSET`     | Defines fields to load for existing records       |
| Platform Key             | `PIPELINE_DONATION_RECURRING_PLATFORM_KEY` | Generates unique platform identifier              |
| Record Matching          | `PIPELINE_DONATION_RECURRING_DUPLICATE`    | Locates existing recurring donation records       |
| Field Mapping            | `PIPELINE_DONATION_RECURRING_MAPPING`      | Primary field mapping logic                       |
| Field Mapping (Extended) | `PIPELINE_DONATION_RECURRING_MAPPING_EXT`  | Additional field mapping logic                    |
| Post-Processing          | `PIPELINE_DONATION_RECURRING_POST`         | Post-upsert processing logic                      |

### Stage 6: Donation Processing

**Purpose**: Creates or updates individual donation records (Opportunities or Gift Transactions).

**Default SObject**:

* Non-Profit Success Pack:  `Opportunity`&#x20;
* Non-Profit Cloud: `GiftTransaction`

| Configuration Phase      | Metadata Key                              | Description                                 |
| ------------------------ | ----------------------------------------- | ------------------------------------------- |
| Disable                  | `PIPELINE_DONATION_DONATION_DISABLE`      | Disables donation processing entirely       |
| SObject Type             | `PIPELINE_DONATION_DONATION_SOBJECT`      | Overrides default donation SObject type     |
| Field Set                | `PIPELINE_DONATION_DONATION_FIELDSET`     | Defines fields to load for existing records |
| Platform Key             | `PIPELINE_DONATION_DONATION_PLATFORM_KEY` | Generates unique platform identifier        |
| Record Matching          | `PIPELINE_DONATION_DONATION_DUPLICATE`    | Locates existing donation records           |
| Field Mapping            | `PIPELINE_DONATION_DONATION_MAPPING`      | Primary field mapping logic                 |
| Field Mapping (Extended) | `PIPELINE_DONATION_DONATION_MAPPING_EXT`  | Additional field mapping logic              |
| Post-Processing          | `PIPELINE_DONATION_DONATION_POST`         | Post-upsert processing logic                |

**Relationship Management**:

* Links to donor contacts/accounts
* Associates with relevant campaigns
* Connects to recurring donation records
* Handles matched gift relationships

## Context Variables

Each stage receives contextual variables to assist with implentation complexities:

### Account Stage Context

* `Context_AccountType`: `donor` | `fundraiser` | `matchedDonor` | `recurringDonor`
* `Context_Fundraiser`: Boolean indicating fundraising organisation
* `Context_Donor`: Boolean indicating donation source
* `Context_RecurringDonor`: Boolean indicating recurring donor
* `Context_MatchedDonor`: Boolean indicating matched gift company

### Contact Stage Context

* `Context_ContactType`: `donor` | `fundraiser` | `matchedDonor` | `recurringDonor` | `tributeContact`
* `Context_Fundraiser`: Boolean indicating individual fundraiser
* `Context_Donor`: Boolean indicating individual donor
* `Context_RecurringDonor`: Boolean indicating recurring donor contact
* `Context_MatchedDonor`: Boolean indicating matched gift contact
* `Context_TributeContact`: Boolean indicating tribute/memorial contact

### Campaign Stage Context

* `CampaignIndex`: Position within campaign hierarchy
* `CampaignCount`: Total campaigns in hierarchy
* `CampaignIdList`: Previously processed campaign IDs
* `HasCampaignAccount`: Boolean indicating linked account
* `HasCampaignContact`: Boolean indicating linked contact
* `HasParentCampaign`: Boolean indicating parent campaign
