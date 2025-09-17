# Campaign Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Post\
**Label:** \[MoveData] General: Campaign - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after campaign records are created or updated, including campaign member structure initialisation, gift designation copying from parent campaigns, and campaign member creation.

## Purpose

The flow performs post-upsert operations that:

* Initialize campaign member status structures with configurable labels
* Copy gift designations from parent campaigns to child campaigns
* Create campaign member records for primary contacts
* Establish hierarchical campaign member value structures
* Identify and process campaigns for member creation based on configuration

## Salesforce Fields

This flow interacts with the Salesforce Campaign object and its related fields. Below is a mapping of all fields utilized:

| Field API Name | Field Type         | Purpose in Flow                                |
| -------------- | ------------------ | ---------------------------------------------- |
| Id             | ID                 | Unique record identifier                       |
| ParentId       | Lookup to Campaign | Links to parent campaign for gift designations |

## Input Variables

### Core Campaign Data

| Variable          | Type              | Required | Description                                                            |
| ----------------- | ----------------- | -------- | ---------------------------------------------------------------------- |
| `Record`          | Campaign SObject  | Yes      | The Campaign record being processed                                    |
| `CampaignContact` | Account SObject   | No       | Primary contact to be added as campaign member                         |
| `Type`            | String            | No       | Campaign type ('team'/'organisation' or other) affecting member status |
| `CampaignIdList`  | String Collection | No       | List of campaign IDs for member processing                             |
| `CampaignCount`   | Number            | No       | Count of campaigns in hierarchy                                        |
| `CampaignIndex`   | Number            | No       | Position in campaign hierarchy                                         |

### Campaign Member Configuration

| Variable                                      | Type    | Default           | Description                            |
| --------------------------------------------- | ------- | ----------------- | -------------------------------------- |
| `Config_CampaignMemberAll`                    | Boolean | false             | Create members for all campaigns       |
| `Config_CampaignMemberParentCampaign`         | Boolean | false             | Create members for parent campaigns    |
| `Config_CampaignMemberTopLevelCampaign`       | Boolean | false             | Create members for top-level campaigns |
| `Config_CampaignMemberDeleteExistingStatuses` | Boolean | false             | Remove existing member statuses        |
| `Config_CampaignMemberLabelTeamLeader`        | String  | "Team Leader"     | Label for team leader status           |
| `Config_CampaignMemberLabelFundraiser`        | String  | "Fundraiser"      | Label for fundraiser status            |
| `Config_CampaignMemberLabelRecurringDonor`    | String  | "Recurring Donor" | Label for recurring donor status       |
| `Config_CampaignMemberLabelDonor`             | String  | "Donor"           | Label for donor status                 |
| `Config_CampaignMemberLabelProspect`          | String  | "Prospect"        | Label for prospect status              |

### Gift Designation Configuration

| Variable                                  | Type    | Default | Description                          |
| ----------------------------------------- | ------- | ------- | ------------------------------------ |
| `Config_DonationSuppressGiftDesignations` | Boolean | false   | Disable gift designation copying     |
| `Config_DonationGiftDesignationsCache`    | Boolean | true    | Enable caching for gift designations |

## Output Variables

| Variable   | Type                        | Description                            |
| ---------- | --------------------------- | -------------------------------------- |
| `Logs`     | MoveDataLogEntry Collection | Processing logs for quality tracking   |
| `LogsJSON` | String                      | JSON representation of processing logs |

## Flow Logic

### 1. Campaign Member Structure Initialization

The flow first determines if MoveData campaign member structure should be used:

* **Formula Check**: Evaluates if any campaign member configuration is enabled
* **If enabled**: Initializes campaign member statuses with configurable labels
* **Component**: `CampaignMemberInitialiseComponent`

### 2. Gift Designation Processing

When gift designations are enabled:

* **Condition**: `Config_DonationSuppressGiftDesignations` is not true
* **Action**: Copies gift designations from parent campaign to current campaign
* **Component**: `CopyGiftDesignationsComponent`
* **Source**: Uses `Record.ParentId` as source campaign
* **Target**: Uses `Record.Id` as target campaign

### 3. Campaign Member Creation Logic

The flow processes campaign member creation when a primary contact exists:

#### Campaign Identification

* **Component**: `CampaignMemberEvaluateComponent`
* **Configuration**: Uses member creation flags to determine which campaigns to process
* **Result**: Returns list of campaign IDs for member creation

#### Member Status Determination

Uses formula logic to determine member status:

* **Team/Organisation Type**: Assigns "Team Leader" status
* **Other Types**: Assigns "Fundraiser" status

#### Campaign Member Creation

* **Component**: `CampaignMemberCreateComponent`
* **Contact**: Uses provided campaign contact
* **Status**: Applies determined member status
* **Hierarchy**: Respects value hierarchy for status precedence

### 4. Member Value Hierarchy Setup

The flow establishes a hierarchical order of campaign member statuses:

1. Team Leader (highest priority)
2. Fundraiser
3. Recurring Donor
4. Donor
5. Prospect (lowest priority)

This hierarchy ensures contacts receive the highest applicable status when added to multiple campaigns.

## Processing Flow

1. **Member Structure Check**: Determine if campaign member processing should occur
2. **Structure Initialization**: Set up campaign member statuses if enabled
3. **Gift Designation Processing**: Copy from parent campaign if enabled
4. **Contact Validation**: Check for primary contact and member creation settings
5. **Campaign Identification**: Determine which campaigns need members
6. **Campaign Iteration**: Log identified campaigns for processing
7. **Hierarchy Setup**: Establish member status precedence
8. **Member Creation**: Create campaign member records with appropriate status

## Configuration Options

### Campaign Member Creation Control

* **All Campaigns**: `Config_CampaignMemberAll = true` creates members for all campaigns
* **Parent Only**: `Config_CampaignMemberParentCampaign = true` creates members for parent campaigns
* **Top Level Only**: `Config_CampaignMemberTopLevelCampaign = true` creates members for top-level campaigns

### Gift Designation Control

* **Suppress Processing**: `Config_DonationSuppressGiftDesignations = true` disables gift designation copying
* **Cache Control**: `Config_DonationGiftDesignationsCache` controls caching behavior

### Member Status Labels

All member status labels are configurable, allowing organisations to customize campaign member terminology.

## Error Handling

### Formula-Based Processing Control

* **Create Members Check**: Uses formula to determine if any member creation is enabled
* **Status Assignment**: Uses formula to assign appropriate member status based on campaign type
* **Graceful Degradation**: Skips processing when conditions are not met

### Logging Integration

* **Component Logging**: Logs campaign identification and member creation activities
* **JSON Output**: Provides structured logging for troubleshooting
* **Process Tracking**: Maintains audit trail of campaign member operations

## Dependencies

* `CampaignMemberInitialiseComponent` (Apex action)
* `CopyGiftDesignationsComponent` (Apex action)
* `CampaignMemberEvaluateComponent` (Apex action)
* `CampaignMemberCreateComponent` (Apex action)
* `movedata__WriteToLogFlowComponent` (Apex action)
* `movedata__MoveDataLogEntry` (Apex class)
