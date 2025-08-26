# Campaign Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Post\
**Label:** \[MoveData] Donation: Campaign - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after campaign records are created or updated, including campaign member structure initialisation, GAU (General Accounting Unit) copying from parent campaigns, and campaign member creation.

## Purpose

The flow performs post-upsert operations that:

* Initialize campaign member status structures with configurable labels
* Copy GAU allocations from parent campaigns to child campaigns
* Create campaign member records for primary contacts
* Establish hierarchical campaign member value structures

## Input Variables

### Core Campaign Data

| Variable            | Type             | Required | Description                                             |
| ------------------- | ---------------- | -------- | ------------------------------------------------------- |
| `Record`            | Campaign SObject | Yes      | The Campaign record being processed                     |
| `ParentCampaign`    | Campaign SObject | No       | Parent campaign for inheritance operations              |
| `CampaignContact`   | Contact SObject  | No       | Primary contact to be added as campaign member          |
| `Type`              | String           | No       | Campaign type ('team' or other) affecting member status |
| `IsNewRecord`       | Boolean          | Yes      | Indicates if this is a new campaign creation            |
| `HasParentCampaign` | Boolean          | Yes      | Flag indicating parent campaign presence                |

### Campaign Member Configuration

| Variable                                      | Type    | Default           | Description                      |
| --------------------------------------------- | ------- | ----------------- | -------------------------------- |
| `Config_CreateCampaignMembers`                | Boolean | true              | Enable campaign member creation  |
| `Config_CampaignMemberDeleteExistingStatuses` | Boolean | false             | Remove existing member statuses  |
| `Config_CampaignMemberLabelTeamLeader`        | String  | "Team Leader"     | Label for team leader status     |
| `Config_CampaignMemberLabelFundraiser`        | String  | "Fundraiser"      | Label for fundraiser status      |
| `Config_CampaignMemberLabelRecurringDonor`    | String  | "Recurring Donor" | Label for recurring donor status |
| `Config_CampaignMemberLabelDonor`             | String  | "Donor"           | Label for donor status           |
| `Config_CampaignMemberLabelProspect`          | String  | "Prospect"        | Label for prospect status        |

### Processing Variables

| Variable         | Type              | Description                                                       |
| ---------------- | ----------------- | ----------------------------------------------------------------- |
| `CampaignIdList` | String Collection | List of campaign IDs for the current and previous campaign phases |

## Flow Logic

### 1. Campaign Member Structure Initialization

The flow first determines if MoveData campaign member structure should be used:

* **If `Config_CreateCampaignMembers` is true**: Initializes campaign member statuses
* **If disabled**: Skips member structure setup

### 2. Campaign Member Status Setup

When enabled, the flow calls `InitialiseCampaignMemberComponent` with:

* Configurable status labels for different member types
* Optional deletion of existing campaign member statuses
* Campaign-specific member status initialization

### 3. GAU Inheritance Processing

For new records with parent campaigns:

* **Condition**: `IsNewRecord = true` AND `HasParentCampaign = true`
* **Action**: Copies GAU allocations from parent to child campaign
* **Component**: `CopyGauBetweenCampaignsFlowComponent`

### 4. Campaign Member Creation

When a primary contact is provided:

* **Condition**: `CampaignContact` exists AND `Config_CreateCampaignMembers = true`
* **Process**: Creates campaign member record with appropriate status
* **Status Logic**: Uses formula to determine member status based on campaign type

### 5. Member Value Hierarchy Setup

The flow establishes a hierarchical order of campaign member statuses:

1. Team Leader
2. Fundraiser
3. Recurring Donor
4. Donor
5. Prospect

A contact associated with the campaign will receive only one of the these statuses.

## Configuration Options

### Campaign Member Labels

All member status labels are configurable, allowing organisations to customize campaign member labels.

### Processing Controls

* Enable/disable campaign member creation
* Control existing status deletion
* Configure GAU inheritance behavior

## Dependencies

* `InitialiseCampaignMemberComponent` (Apex action)
* `CopyGauBetweenCampaignsFlowComponent` (Apex action)
* `CreateCampaignMemberComponentWithLogs` (Apex action)
