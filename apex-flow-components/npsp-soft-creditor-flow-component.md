# NPSP Soft Creditor Flow Component

## Overview

**Class Name:** OppContactRoleSoftCreditFlowComponent\
**Friendly Name:** NPSP Soft Creditor\
**Category:** MoveData: NPSP\
**Purpose:** Evaluates and manages soft credits for donations through sophisticated opportunity contact role management across multi-level campaign hierarchies

## Class Description

This component facilitates the creation and management of opportunity contact roles for soft credit attribution in complex fundraising scenarios. The class supports three-tier campaign hierarchies (Campaign/Team/Fundraiser) with intelligent role assignment based on campaign structure complexity. It provides comprehensive soft credit management with configurable role labels, duplicate prevention, and dynamic role selection algorithms that adapt to various fundraising organisational models.

## Input Parameters

### Core Opportunity Data

* `Record` \[`Record` (Opportunity)]: Opportunity record for contact role assignment
* `Opportunity ID` \[`OpportunityId` (Id)]: ID of opportunity for contact role processing
* `Prevent Deletion of Existing Roles` \[`PreventDelete` (Boolean)]: Preserve existing contact roles (default: false)

### Campaign Hierarchy Structure

* `1. A) Top Level Campaign - Campaign` \[`TopCampaign` (Campaign)]: Top-level campaign record
* `1. A) Top Level Campaign - Campaign Id` \[`TopCampaignIdString` (String)]: Top-level campaign ID as string
* `1. B) Top Level Campaign - Contact` \[`TopContact` (Contact)]: Contact associated with top-level campaign
* `2. A) Team - Campaign` \[`TeamCampaign` (Campaign)]: Team-level campaign record
* `2. A) Team - Campaign Id` \[`TeamCampaignIdString` (String)]: Team campaign ID as string
* `2. B) Team - Contact` \[`TeamContact` (Contact)]: Contact associated with team campaign
* `3. A) Fundraiser - Campaign` \[`FundraiserCampaign` (Campaign)]: Individual fundraiser campaign record
* `3. A) Fundraiser - Campaign Id` \[`FundraiserCampaignIdString2` (String)]: Fundraiser campaign ID as string
* `3. B) Fundraiser - Contact` \[`FundraiserContact` (Contact)]: Contact associated with fundraiser campaign
* `4. A) Donor - Contact` \[`DonorContact` (Contact)]: Primary donor contact

### Role Configuration - Simple Scenarios

* `1. C) Top Level Campaign - Soft Credit Role` \[`SoftCredit_Role_Campaign` (String)]: Basic campaign attribution role
* `2. C) Team - Soft Credit Role` \[`SoftCredit_Role_Team` (String)]: Basic team attribution role
* `3. C) Fundraiser - Soft Credit Role` \[`SoftCredit_Role_Fundraiser` (String)]: Basic fundraiser attribution role
* `4. B) Donor - Soft Credit Role` \[`SoftCredit_Role_Donor` (String)]: Primary donor role

### Role Configuration - Complex Scenarios

* `1. D) Top Level Campaign - Soft Credit Role (Campaign / Team / Fundraiser)` \[`SoftCredit_Role_Campaign_CampaignTeamFundraiser` (String)]: Campaign role when all three levels present
* `1. E) Top Level Campaign - Soft Credit Role (Campaign / Fundraiser)` \[`SoftCredit_Role_Campaign_CampaignFundraiser` (String)]: Campaign role when campaign and fundraiser present
* `1. F) Top Level Campaign - Soft Credit Role (Campaign / Team)` \[`SoftCredit_Role_Campaign_CampaignTeam` (String)]: Campaign role when campaign and team present
* `2. D) Team - Soft Credit Role (Campaign / Team / Fundraiser)` \[`SoftCredit_Role_Team_CampaignTeamFundraiser` (String)]: Team role when all three levels present
* `2. E) Team - Soft Credit Role (Campaign / Team)` \[`SoftCredit_Role_Team_CampaignTeam` (String)]: Team role when campaign and team present
* `3. D) Fundraiser - Soft Credit Role (Campaign / Team / Fundraiser)` \[`SoftCredit_Role_Fundraiser_CampaignTeamFundraiser` (String)]: Fundraiser role when all three levels present
* `3. E) Fundraiser - Soft Credit Role (Campaign / Fundraiser)` \[`SoftCredit_Role_Fundraiser_CampaignFundraiser` (String)]: Fundraiser role when campaign and fundraiser present

### Processing Control

* `List of Log Entries` \[`LogList` (List)]: Existing log entries to append processing logs to

## Output Parameters

* `Success` \[`Success` (Boolean)]: Processing success indicator
* `List of Log Entries` \[`LogList` (List, required)]: Updated log entries including processing details
* `Json Output of Log Entries` \[`LogJson` (String)]: JSON-encoded version of processing logs

## Behaviour

### Dynamic Role Selection Algorithm

The component uses sophisticated algorithms to determine appropriate contact roles based on campaign hierarchy complexity:

#### Campaign Contact Role Selection

```
IF Campaign + Team + Fundraiser present AND CampaignTeamFundraiser role configured:
  USE SoftCredit_Role_Campaign_CampaignTeamFundraiser
ELSE IF Campaign + Team present (no Fundraiser) AND CampaignTeam role configured:
  USE SoftCredit_Role_Campaign_CampaignTeam  
ELSE IF Campaign + Fundraiser present (no Team) AND CampaignFundraiser role configured:
  USE SoftCredit_Role_Campaign_CampaignFundraiser
ELSE:
  USE SoftCredit_Role_Campaign (default)
```

#### Team Contact Role Selection

```
IF Campaign + Team + Fundraiser present AND Team_CampaignTeamFundraiser role configured:
  USE SoftCredit_Role_Team_CampaignTeamFundraiser
ELSE IF Campaign + Team present (no Fundraiser) AND Team_CampaignTeam role configured:
  USE SoftCredit_Role_Team_CampaignTeam
ELSE:
  USE SoftCredit_Role_Team (default)
```

#### Fundraiser Contact Role Selection

```
IF Campaign + Team + Fundraiser present AND Fundraiser_CampaignTeamFundraiser role configured:
  USE SoftCredit_Role_Fundraiser_CampaignTeamFundraiser
ELSE IF Campaign + Fundraiser present (no Team) AND Fundraiser_CampaignFundraiser role configured:
  USE SoftCredit_Role_Fundraiser_CampaignFundraiser
ELSE:
  USE SoftCredit_Role_Fundraiser (default)
```

### Contact Role Management

* **Duplicate Prevention**: Ensures one role per contact by checking existing roles before creation
* **Role Updating**: Updates existing contact roles when contacts are reprocessed with different role assignments
* **Intelligent Cleanup**: Removes obsolete contact roles when campaign structures change (unless PreventDelete enabled)
* **Hierarchical Processing**: Processes roles in order: Donor, Fundraiser, Team, Campaign

## Error Handling

### Validation Requirements

* Opportunity ID must be provided (either via Record.Id or OpportunityId parameter)
* Throws `MissingParameterException` when opportunity identification fails
* Validates contact IDs exist before processing contact roles

### Campaign Structure Validation

* Gracefully handles partial campaign hierarchies (missing team or fundraiser levels)
* Supports scenarios with any combination of campaign, team, and fundraiser presence
* Falls back to default roles when specific scenario roles are not configured

## Dependencies

### Required Objects

* `Opportunity`: Standard Salesforce object for donations
* `OpportunityContactRole`: Standard Salesforce object for soft credit management
* `Contact`: Standard Salesforce object for individuals receiving credit
* `Campaign`: Standard Salesforce object for fundraising campaigns
