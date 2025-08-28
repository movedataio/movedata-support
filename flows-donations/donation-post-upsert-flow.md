# Donation Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).\
This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Donation\_Post\
**Label:** \[MoveData] Donation: Donation - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles comprehensive post-processing operations after donation (opportunity) records are created or updated, including campaign member creation, matching gift relationship management, and opportunity contact role processing for soft credits.

## Purpose

The flow performs post-upsert operations that:

* Attempt to clean up opportunity naming conflicts with NPSP triggers
* Create campaign member records for donors with hierarchical status management
* Establish bidirectional matching gift relationships between donations
* Process opportunity contact roles for soft credit attribution across campaign hierarchies
* Support complex fundraising attribution scenarios with fundraiser and team-based campaigns

## Salesforce Fields

This flow interacts with the Salesforce Opportunity object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                          | Field Type                  | Purpose in Flow                           |
|-----------------------------------------|-----------------------------|-------------------------------------------|
| Id                                      | ID                          | Primary record identifier                 |
| Name                                    | Text (120)                  | Opportunity name cleanup for NPSP         |
| npsp__Matching_Gift__c                  | Lookup to Opportunity       | Bidirectional matching gift relationships |
| npsp__Matching_Gift_Account__c          | Lookup to Account           | Matching gift employer account            |
| npsp__Matching_Gift_Employer__c         | Text                        | Matching gift employer name               |
| npsp__Matching_Gift_Status__c           | Picklist                    | Matching gift processing status           |

## Input Variables

### Core Donation Data

| Variable           | Type                | Required | Description                                  |
| ------------------ | ------------------- | -------- | -------------------------------------------- |
| `Record`           | Opportunity SObject | Yes      | The Opportunity record that was processed    |
| `DonorContact`     | Contact SObject     | No       | Primary contact associated with the donation |
| `DonationCampaign` | Campaign SObject    | No       | Campaign associated with the donation        |

### Campaign Member Configuration

| Variable                                      | Type    | Default           | Description                              |
| --------------------------------------------- | ------- | ----------------- | ---------------------------------------- |
| `Config_CreateCampaignMembers`                | Boolean | true              | Enable campaign member creation          |
| `Config_CampaignMemberDeleteExistingStatuses` | Boolean | false             | Remove existing campaign member statuses |
| `Config_CampaignMemberLabelTeamLeader`        | String  | "Team Leader"     | Label for team leader status             |
| `Config_CampaignMemberLabelFundraiser`        | String  | "Fundraiser"      | Label for fundraiser status              |
| `Config_CampaignMemberLabelRecurringDonor`    | String  | "Recurring Donor" | Label for recurring donor status         |
| `Config_CampaignMemberLabelDonor`             | String  | "Donor"           | Label for donor status                   |
| `Config_CampaignMemberLabelProspect`          | String  | "Prospect"        | Label for prospect status                |

### Campaign Hierarchy Structure

| Variable                     | Type              | Description                                 |
| ---------------------------- | ----------------- | ------------------------------------------- |
| `Campaign_CampaignRecord`    | Campaign SObject  | Top-level campaign record                   |
| `Campaign_CampaignContact`   | Contact SObject   | Contact associated with top-level campaign  |
| `Campaign_TeamRecord`        | Campaign SObject  | Team-level campaign record                  |
| `Campaign_TeamContact`       | Contact SObject   | Contact associated with team campaign       |
| `Campaign_FundraiserRecord`  | Campaign SObject  | Individual fundraiser campaign record       |
| `Campaign_FundraiserContact` | Contact SObject   | Contact associated with fundraiser campaign |
| `CampaignIdList`             | String Collection | List of campaign IDs for member creation    |

### Soft Credit Configuration

| Variable                                          | Type    | Default       | Description                                  |
| ------------------------------------------------- | ------- | ------------- | -------------------------------------------- |
| `Config_DonationOpportunityContactRoleSoftCredit` | Boolean | true          | Enable opportunity contact role soft credits |
| `Config_DonationSoftCredit_PreventDel`            | Boolean | false         | Prevent deletion of existing contact roles   |
| `Config_DonationSoftCredit_Role_Donor`            | String  | "Donor"       | Contact role for primary donor               |
| `Config_DonationSoftCredit_Role_Fundraiser`       | String  | "Soft Credit" | Contact role for fundraiser attribution      |
| `Config_DonationSoftCredit_Role_Team`             | String  | "Soft Credit" | Contact role for team attribution            |
| `Config_DonationSoftCredit_Role_Campaign`         | String  | "Soft Credit" | Contact role for campaign attribution        |

### Advanced Soft Credit Roles

| Variable                                                           | Type   | Description                                   |
| ------------------------------------------------------------------ | ------ | --------------------------------------------- |
| `Config_DonationSoftCredit_Role_Fundraiser_CampaignFundraiser`     | String | Role when donor has fundraiser campaign       |
| `Config_DonationSoftCredit_Role_Fundraiser_CampaignTeamFundraiser` | String | Role when donor has team+fundraiser campaigns |
| `Config_DonationSoftCredit_Role_Team_CampaignTeam`                 | String | Role when donor has team campaign             |
| `Config_DonationSoftCredit_Role_Team_CampaignTeamFundraiser`       | String | Role when donor has team+fundraiser campaigns |
| `Config_DonationSoftCredit_Role_Campaign_CampaignFundraiser`       | String | Role when donor has campaign+fundraiser       |
| `Config_DonationSoftCredit_Role_Campaign_CampaignTeam`             | String | Role when donor has campaign+team             |
| `Config_DonationSoftCredit_Role_Campaign_CampaignTeamFundraiser`   | String | Role when donor has all three levels          |

## Output Variables

| Variable   | Type                | Description                            |
| ---------- | ------------------- | -------------------------------------- |
| `Logs`     | MoveDataLogEntry\[] | Processing logs from all operations    |
| `LogsJSON` | String              | JSON representation of processing logs |

## Flow Logic

### 1. NPSP Name Field Cleanup

**Problem Resolution:** NPSP triggers automatically generate opportunity names based on donor and amount information. When MoveData sets custom names during mapping, this can create conflicts with NPSP's naming logic.

**Solution Process:**

1. **Detection**: Checks if the opportunity record has a Name field that was set during processing
2. **Field Clearing**: Uses `ClearFieldFlowComponent` to remove the Name field from the record
3. **NPSP Integration**: Allows NPSP triggers to generate appropriate names post-commit

**Technical Implementation:**

```
IF Record.Name WasSet THEN
  Add "Name" to FieldList
  Clear Name field from Record
```

### 2. Campaign Member Management

**Prerequisites Validation:** The flow validates all required conditions before creating campaign members:

* Campaign exists with valid ID
* Contact exists with valid ID
* Campaign member creation is enabled

**Campaign Member Status Initialisation:**

```
InitialiseCampaignMemberComponent Parameters:
- CampaignId: DonationCampaign.Id
- DeleteOtherCampaignMemberStatuses: Config setting
- Status Labels: All configurable member status labels
```

**Hierarchical Status Management:** The flow establishes a prioritised hierarchy:

1. **Team Leader** (highest priority)
2. **Fundraiser**
3. **Recurring Donor**
4. **Donor** (target status for this flow)
5. **Prospect** (lowest priority)

**Campaign Member Creation Logic:**

* Attempts to assign "Donor" status to the contact
* Respects existing higher-priority statuses (Team Leader, Fundraiser, Recurring Donor)
* Upgrades lower-priority statuses (Prospect)
* Uses `CreateCampaignMemberComponentWithLogs` for detailed logging

### 3. Matching Gift Relationship Processing

**Matching Gift Detection:** The flow identifies when a donation is part of a matching gift relationship:

```
IF Record.npsp__Matching_Gift__c WasSet AND
   Record.npsp__Matching_Gift__c IsNotNull
```

**Bidirectional Relationship Establishment:** **Step 1 - Retrieve Matched Donation:**

* Queries the matched donation record by ID
* Retrieves current matching gift relationship fields

**Step 2 - Validate Relationship Direction:**

* Checks if matched donation already links back to current record
* Prevents circular or duplicate relationship creation

**Step 3 - Update Matched Donation:**

* Sets `npsp__Matching_Gift__c` on matched donation to point to current record
* Creates bidirectional matching gift relationship

**NPSP Matching Gift Fields:**

* `npsp__Matching_Gift__c`: Links to the related donation
* `npsp__Matching_Gift_Account__c`: Employer account
* `npsp__Matching_Gift_Employer__c`: Employer name
* `npsp__Matching_Gift_Status__c`: Matching gift status

### 4. Opportunity Contact Role Soft Credit Processing

**Multi-Level Campaign Attribution:** The flow supports complex campaign hierarchies with three levels:

* **Top Campaign**: Overall campaign or cause
* **Team Campaign**: Team or group within the campaign
* **Fundraiser Campaign**: Individual fundraiser within team

**Contact Role Assignment Logic:** The `OppContactRoleSoftCreditFlowComponent` processes multiple scenarios:

**Scenario 1 - Direct Donor:**

* Primary donor gets "Donor" role
* Most common scenario for individual donations

**Scenario 2 - Single-Level Attribution:**

* Campaign organizer gets "Soft Credit" role
* Team leader gets "Soft Credit" role
* Individual fundraiser gets "Soft Credit" role

**Scenario 3 - Multi-Level Attribution:**

* Supports combinations of campaign/team/fundraiser
* Uses specialized role configurations for complex scenarios
* Prevents duplicate role assignments

**Role Configuration Matrix:** The flow uses different role labels based on campaign hierarchy complexity:

| Donor Campaign Level  | Assigned Contact   | Role Configuration Variable                                      |
| --------------------- | ------------------ | ---------------------------------------------------------------- |
| Campaign Only         | Campaign Contact   | `Config_DonationSoftCredit_Role_Campaign`                        |
| Team Only             | Team Contact       | `Config_DonationSoftCredit_Role_Team`                            |
| Fundraiser Only       | Fundraiser Contact | `Config_DonationSoftCredit_Role_Fundraiser`                      |
| Campaign + Team       | Both Contacts      | `Config_DonationSoftCredit_Role_Campaign_CampaignTeam`           |
| Campaign + Fundraiser | Both Contacts      | `Config_DonationSoftCredit_Role_Campaign_CampaignFundraiser`     |
| Team + Fundraiser     | Both Contacts      | `Config_DonationSoftCredit_Role_Team_CampaignTeam`               |
| All Three Levels      | All Contacts       | `Config_DonationSoftCredit_Role_Campaign_CampaignTeamFundraiser` |

**Soft Credit Prevention:**

* `Config_DonationSoftCredit_PreventDel`: Prevents deletion of existing contact roles
* Preserves manually created contact role assignments

## Error Handling

### NPSP Integration Protection

* Field clearing prevents naming conflicts with NPSP triggers
* Matching gift relationships use NPSP standard fields
* Contact role assignments follow NPSP soft credit patterns

### Relationship Validation

* Validates matching gift relationships before creation
* Prevents circular references in matching gifts
* Checks for existing relationships before updates

### Campaign Member Deduplication

* Uses hierarchical status system to prevent duplicate statuses
* Respects existing higher-priority campaign member statuses
* Provides detailed logging for status assignment decisions

## Dependencies

### Apex Components

* **movedata\_\_ClearFieldFlowComponent**: Field cleanup for NPSP integration
* **InitialiseCampaignMemberComponent**: Campaign member status setup
* **CreateCampaignMemberComponentWithLogs**: Campaign member creation with logging
* **OppContactRoleSoftCreditFlowComponent**: Complex soft credit role processing
