# Donation Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).\
This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Donation\_Post\
**Label:** \[MoveData] Donation: Donation - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 63.0\
**Status:** Active

This flow handles comprehensive post-processing operations after gift transaction records are created or updated, including status restoration, refund processing, soft credit creation, campaign member management, tribute handling, matching gift relationships, and gift designation copying.

## Purpose

The flow performs post-upsert operations that:

* Restore transaction status when temporary changes were made during mapping
* Process refunds by creating GiftRefund records and updating transaction status
* Create soft credit relationships for campaign attribution
* Manage campaign member records with hierarchical status systems
* Handle tribute donations (memorial and honor gifts) with notification processing
* Establish matching gift relationships between employer and employee transactions
* Copy gift designations from gift commitments, campaigns, or override sources

## Salesforce Fields

This flow interacts with Non-Profit Cloud objects and their fields. Below is a mapping of all fields utilized:

| Field API Name                                | Field Type                | Purpose in Flow                           |
| --------------------------------------------- | ------------------------- | ----------------------------------------- |
| GiftTransaction.Id                            | ID                        | Primary record identifier                 |
| GiftTransaction.Status                        | Picklist                  | Transaction status management             |
| GiftTransaction.OriginalAmount                | Currency                  | Amount for refund comparison              |
| GiftTransaction.CurrentAmount                 | Currency                  | Current amount for gift designations      |
| GiftTransaction.MatchingEmployerTransactionId | Lookup to GiftTransaction | Bidirectional matching gift relationships |
| GiftRefund.Amount                             | Currency                  | Refund amount                             |
| GiftRefund.Date                               | Date                      | Refund transaction date                   |
| GiftRefund.GiftTransactionId                  | Lookup to GiftTransaction | Parent transaction link                   |
| GiftRefund.ProcessorTransactionFee            | Currency                  | Refund processing fee                     |
| GiftRefund.Status                             | Picklist                  | Refund status                             |
| GiftTribute.TributeType                       | Picklist                  | Memorial or Honor designation             |
| GiftTribute.HonoreeContactId                  | Lookup to Account         | Honoree contact reference                 |
| GiftTribute.HonoreeName                       | Text                      | Honoree name                              |
| GiftTribute.NotificationContactId             | Lookup to Account         | Notification recipient                    |
| GiftTribute.NotificationContactName           | Text                      | Notification recipient name               |
| GiftTribute.NotificationEmail                 | Email                     | Notification email address                |
| GiftTribute.GiftTransactionId                 | Lookup to GiftTransaction | Parent transaction link                   |

## Input Variables

### Core Transaction Data

| Variable            | Type                    | Required | Description                                   |
| ------------------- | ----------------------- | -------- | --------------------------------------------- |
| `Record`            | GiftTransaction SObject | Yes      | The GiftTransaction record that was processed |
| `DonorContact`      | Account SObject         | No       | Primary contact associated with the donation  |
| `DonationCampaign`  | Campaign SObject        | No       | Campaign associated with the donation         |
| `DonorAccount`      | Account SObject         | No       | Account associated with the donation          |
| `RecurringDonation` | GiftCommitment SObject  | No       | Parent gift commitment                        |

### Status Management

| Variable       | Type   | Description                               |
| -------------- | ------ | ----------------------------------------- |
| `FutureStatus` | String | Status to restore after temporary changes |
| `Status`       | String | External platform status for processing   |

### Fee and Amount Processing

| Variable            | Type     | Description                                    |
| ------------------- | -------- | ---------------------------------------------- |
| `Amount`            | Currency | Transaction amount                             |
| `FeePlatform`       | Currency | Platform-specific processing fee               |
| `FeePlatformPublic` | Currency | Public platform fee (tip/donation to platform) |
| `ModifiedAt`        | Date     | Modification date for refund processing        |

### Campaign Hierarchy Structure

| Variable                     | Type              | Description                                 |
| ---------------------------- | ----------------- | ------------------------------------------- |
| `Campaign_CampaignContact`   | Account SObject   | Contact associated with top-level campaign  |
| `Campaign_TeamContact`       | Account SObject   | Contact associated with team campaign       |
| `Campaign_FundraiserContact` | Account SObject   | Contact associated with fundraiser campaign |
| `CampaignIdList`             | String Collection | List of campaign IDs for member creation    |

### Campaign Member Configuration

| Variable                                      | Type    | Default           | Description                              |
| --------------------------------------------- | ------- | ----------------- | ---------------------------------------- |
| `Config_CampaignMemberAll`                    | Boolean | false             | Create members for all campaigns         |
| `Config_CampaignMemberParentCampaign`         | Boolean | false             | Create members for parent campaigns      |
| `Config_CampaignMemberTopLevelCampaign`       | Boolean | false             | Create members for top-level campaigns   |
| `Config_CampaignMemberDeleteExistingStatuses` | Boolean | false             | Remove existing campaign member statuses |
| `Config_CampaignMemberLabelTeamLeader`        | String  | "Team Leader"     | Label for team leader status             |
| `Config_CampaignMemberLabelFundraiser`        | String  | "Fundraiser"      | Label for fundraiser status              |
| `Config_CampaignMemberLabelRecurringDonor`    | String  | "Recurring Donor" | Label for recurring donor status         |
| `Config_CampaignMemberLabelDonor`             | String  | "Donor"           | Label for donor status                   |
| `Config_CampaignMemberLabelProspect`          | String  | "Prospect"        | Label for prospect status                |

### Soft Credit Configuration

| Variable                            | Type    | Default | Description                  |
| ----------------------------------- | ------- | ------- | ---------------------------- |
| `Config_DonationSuppressSoftCredit` | Boolean | false   | Disable soft credit creation |

### Tribute Processing

| Variable              | Type            | Description                        |
| --------------------- | --------------- | ---------------------------------- |
| `Tribute_TributeType` | String          | Type of tribute (honor/memory)     |
| `TributeContact`      | Account SObject | Contact being honored/memorialized |

### Matching Gift Processing

| Variable                     | Type            | Description                           |
| ---------------------------- | --------------- | ------------------------------------- |
| `MatchedContact`             | Account SObject | Contact associated with matching gift |
| `MatchedKey`                 | String          | Platform key for matched donation     |
| `MatchedMatchedDonationType` | String          | Type of matched donation relationship |
| `Platform`                   | String          | Platform identifier                   |

### Gift Designation Configuration

| Variable                                   | Type    | Default | Description                           |
| ------------------------------------------ | ------- | ------- | ------------------------------------- |
| `Config_DonationSuppressGiftDesignations`  | Boolean | false   | Disable gift designation processing   |
| `Config_DonationGiftDesignationsCache`     | Boolean | true    | Enable caching for gift designations  |
| `Override_GiftDesignationId`               | String  | -       | Override source for gift designations |
| `Config_DonationAmountSubtractFeePlatform` | Boolean | false   | Subtract platform fees from amount    |

### Record Context

| Variable      | Type    | Description                |
| ------------- | ------- | -------------------------- |
| `IsNewRecord` | Boolean | Flag indicating new record |

## Output Variables

| Variable     | Type                | Description                            |
| ------------ | ------------------- | -------------------------------------- |
| `Logs`       | MoveDataLogEntry\[] | Processing logs from all operations    |
| `LogsJSON`   | String              | JSON representation of processing logs |
| `RecordList` | String Collection   | List of created/updated record IDs     |

## Flow Logic

### 1. Status Restoration Management

**Future Status Processing:** The flow checks if a temporary status change was made during mapping and needs restoration:

```
IF FutureStatus IsNotNull THEN
  Update Record.Status = FutureStatus
  Log status restoration
```

**Use Case:** When field changes on paid transactions require temporary "Unpaid" status, this restores the original intended status.

### 2. Refund Processing

**Refund Detection:** The flow identifies refund transactions and processes them accordingly:

```
IF Status = "refund" THEN
  Set RefundAmount = AmountCalculated
  Set RefundProcessorFee = FeePlatformDonorCalculated
```

**GiftRefund Record Creation:** Creates dedicated refund records with:

* **Amount**: Calculated refund amount
* **Date**: Uses ModifiedAt or current date
* **GiftTransactionId**: Links to parent transaction
* **ProcessorTransactionFee**: Refund processing fees
* **Status**: Set to "Completed"

**Full Refund Detection:** Compares refund amount to original transaction:

```
IF RefundAmount >= Record.OriginalAmount THEN
  Update Record.Status = "Fully Refunded"
```

### 3. Soft Credit Creation

**Soft Credit Enablement Check:** Validates if soft credit processing should occur:

```
IF Config_DonationSuppressSoftCredit != true THEN
  Process soft credits
```

**Matched Donor Integration:** Handles matching gift scenarios with additional donor attribution:

```
IF MatchedMatchedDonationType = "donor" THEN
  Call CreateSoftCreditComponent with MatchedDonorContactRecord
ELSE
  Call CreateSoftCreditComponent without matched donor
```

**Multi-Level Attribution:** The `CreateSoftCreditComponent` processes:

* **Donor Attribution**: Primary donor gets donor role
* **Campaign Attribution**: Campaign contacts get soft credit roles
* **Team Attribution**: Team contacts get soft credit roles
* **Fundraiser Attribution**: Individual fundraiser contacts get soft credit roles

### 4. Campaign Member Management

**Campaign Member Enablement:** Uses formula to determine if campaign members should be created:

```
CreateCampaignMembers = 
  Config_CampaignMemberAll == TRUE || 
  Config_CampaignMemberParentCampaign == TRUE || 
  Config_CampaignMemberTopLevelCampaign == TRUE
```

**Prerequisites Validation:** Ensures required data exists:

* Campaign exists with valid ID
* Contact exists with valid ID
* Campaign member creation is enabled

**Campaign Member Initialization:** Sets up campaign member structure with configurable status labels:

```
CampaignMemberInitialiseComponent Parameters:
- CampaignId: DonationCampaign.Id
- DeleteOtherCampaignMemberStatuses: Config setting
- Status Labels: All configurable member status labels
```

**Campaign Evaluation:** Determines which campaigns should have members created based on configuration.

**Hierarchical Status Management:** Establishes prioritized hierarchy:

1. **Team Leader** (highest priority)
2. **Fundraiser**
3. **Recurring Donor**
4. **Donor** (target status for this flow)
5. **Prospect** (lowest priority)

**Campaign Member Creation:** Uses `CampaignMemberCreateComponent` with value hierarchy to ensure proper status assignment.

### 5. Tribute Processing

**Tribute Detection:** Identifies tribute donations requiring special processing:

```
IF Tribute_TributeType IsNotNull AND TributeContact IsNotNull THEN
  Process tribute
```

**GiftTribute Record Management:** Retrieves or creates GiftTribute record linked to the transaction.

**Tribute Type Assignment:** Sets appropriate tribute type based on input:

* **"memory"** → **"Memorial"**
* **"honor"** → **"Honor"**

**Honoree Contact Processing:** Links tribute to the honored/memorialized contact:

```
Gift_Tribute_Record.HonoreeContactId = TributeContact.Id
Gift_Tribute_Record.HonoreeName = "{TributeContact.FirstName} {TributeContact.LastName}"
```

**Notification Contact Assignment:** Sets fundraiser as notification recipient when available:

```
IF Campaign_FundraiserContact IsNotNull THEN
  Gift_Tribute_Record.NotificationContactId = Campaign_FundraiserContact.Id
  Gift_Tribute_Record.NotificationContactName = "{FirstName} {LastName}"
  Gift_Tribute_Record.NotificationEmail = Campaign_FundraiserContact.PersonEmail
```

**Tribute Record Upsert:** Commits changes to GiftTribute record and tracks in RecordList.

### 6. Matching Gift Relationship Processing

**Matching Gift Detection:** Identifies when transaction is part of matching gift relationship:

```
IF MatchedMatchedDonationType = "donor" AND MatchedKey IsNotNull
```

**Platform Key Generation:** Creates platform key for matched donation lookup:

```
Matched_Donation_Platform_Key Subflow:
- Key: MatchedKey
- Platform: Platform
```

**Matched Transaction Lookup:** Retrieves the matched transaction record by platform key.

**Bidirectional Relationship Establishment:** Sets employer transaction reference on matched donation:

```
IF Get_Matched_Donation_Record.MatchingEmployerTransactionId != Record.Id THEN
  Get_Matched_Donation_Record.MatchingEmployerTransactionId = Record.Id
  Update matched donation record
```

**Relationship Validation:** Prevents duplicate or circular relationships.

### 7. Gift Designation Processing

**Gift Designation Enablement:** Checks if gift designation processing is enabled:

```
IF Config_DonationSuppressGiftDesignations != true
```

**Amount Determination:** Sets appropriate amount for gift designation allocation:

* **New Records**: Uses OriginalAmount
* **Existing Records**: Uses CurrentAmount from database lookup

**Source Priority Resolution:** Applies gift designations in priority order:

1. **Override Source**: Uses Override\_GiftDesignationId when provided
2. **Gift Commitment**: Copies from parent GiftCommitment
3. **Campaign**: Copies from associated Campaign
4. **Default**: Applies system default gift designations

**Gift Designation Copying:** Uses `CopyGiftDesignationsComponent` with:

* **Amount**: Calculated designation amount
* **EnableCache**: Configuration-driven caching
* **SourceRecordId**: Determined by priority logic
* **TargetRecordId**: Current transaction ID

## Error Handling

### Status Management Protection

* Validates FutureStatus before restoration
* Logs all status changes for audit trail
* Handles missing or invalid status values

### Refund Processing Validation

* Compares refund amounts against original transaction amounts
* Prevents negative refund amounts
* Handles missing or invalid refund data

### Relationship Integrity

* Validates matching gift relationships before creation
* Prevents circular references in matching gifts
* Checks for existing relationships before updates

### Campaign Member Deduplication

* Uses hierarchical status system to prevent duplicate statuses
* Respects existing higher-priority campaign member statuses
* Provides detailed logging for status assignment decisions

## Dependencies

### Apex Components

* **CopyGiftDesignationsComponent**: Gift designation management and copying
* **CreateSoftCreditComponent**: Soft credit relationship creation
* **CampaignMemberInitialiseComponent**: Campaign member structure setup
* **CampaignMemberEvaluateComponent**: Campaign selection logic
* **CampaignMemberCreateComponent**: Campaign member creation with hierarchy
* **movedata\_\_WriteToLogFlowComponent**: Comprehensive logging

### Subflows

* **MoveData\_Donation\_Donation\_Key**: Platform key generation for matching gift lookup
