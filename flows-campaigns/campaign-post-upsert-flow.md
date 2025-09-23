# Campaign Post-Upsert Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Campaign\_Post\
**Label:** \[MoveData] Commerce: Campaign - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 57.0\
**Status:** Active

This flow handles post-processing operations after campaign records are created or updated, including campaign member structure initialisation, GAU (General Accounting Unit) copying from parent campaigns, and campaign member creation with commerce-specific status handling.

## Purpose

The flow performs post-upsert operations that:

* Initialize NPSP campaign member status structures with configurable labels
* Copy GAU allocations from parent campaigns to child campaigns
* Create campaign member records for primary contacts
* Establish hierarchical campaign member value structures
* Support commerce-specific member statuses (Sale, Ticket Holder)

## Salesforce Fields

This flow interacts with the Salesforce Campaign object and its related fields. Below is a mapping of all fields utilized:

| Field API Name | Field Type | Purpose in Flow          |
| -------------- | ---------- | ------------------------ |
| Id             | ID         | Unique record identifier |

## Input Variables

### Core Campaign Data

| Variable            | Type              | Required | Description                                             |
| ------------------- | ----------------- | -------- | ------------------------------------------------------- |
| `Record`            | Campaign SObject  | Yes      | The Campaign record being processed                     |
| `ParentCampaign`    | Campaign SObject  | No       | Parent campaign for inheritance operations              |
| `CampaignContact`   | Contact SObject   | No       | Primary contact to be added as campaign member          |
| `Type`              | String            | No       | Campaign type ('team' or other) affecting member status |
| `Action`            | String            | No       | Commerce action type ('ticket' or other)                |
| `IsNewRecord`       | Boolean           | Yes      | Indicates if this is a new campaign creation            |
| `HasParentCampaign` | Boolean           | Yes      | Flag indicating parent campaign presence                |
| `CampaignIdList`    | String Collection | No       | List of campaign IDs for member processing              |

### Campaign Member Configuration

| Variable                                      | Type    | Default           | Description                      |
| --------------------------------------------- | ------- | ----------------- | -------------------------------- |
| `Config_CreateCampaignMembers`                | Boolean | true              | Enable campaign member creation  |
| `Config_CampaignMemberDeleteExistingStatuses` | Boolean | false             | Remove existing member statuses  |
| `Config_CampaignMemberLabelTeamLeader`        | String  | "Team Leader"     | Label for team leader status     |
| `Config_CampaignMemberLabelFundraiser`        | String  | "Fundraiser"      | Label for fundraiser status      |
| `Config_CampaignMemberLabelRecurringDonor`    | String  | "Recurring Donor" | Label for recurring donor status |
| `Config_CampaignMemberLabelCommerce`          | String  | "Sale"            | Label for commerce transactions  |
| `Config_CampaignMemberLabelTicket`            | String  | "Ticket Holder"   | Label for ticket purchases       |
| `Config_CampaignMemberLabelProspect`          | String  | "Prospect"        | Label for prospect status        |

### Sort Order Configuration

| Variable                                 | Type   | Default | Description                    |
| ---------------------------------------- | ------ | ------- | ------------------------------ |
| `Config_CampaignMemberSortOrderCommerce` | Number | 9011    | Sort order for commerce status |
| `Config_CampaignMemberSortOrderTicket`   | Number | 9012    | Sort order for ticket status   |

## Output Variables

| Variable | Type             | Description             |
| -------- | ---------------- | ----------------------- |
| `Record` | Campaign SObject | Updated campaign record |

## Flow Logic

### 1. Campaign Member Structure Initialization

The flow first determines if MoveData campaign member structure should be used:

* **If `Config_CreateCampaignMembers` is true**: Proceeds with action-based status configuration
* **If disabled**: Skips member structure setup

### 2. Action-Based Status Configuration

The flow evaluates the commerce action type to determine appropriate labels:

#### Ticket Action Processing

* **Condition**: `Action = "ticket"`
* **Label Assignment**: Sets commerce label to ticket holder value
* **Sort Order**: Uses ticket-specific sort order (9012)

#### Default Commerce Processing

* **Condition**: All other actions
* **Label Assignment**: Uses default commerce label ("Sale")
* **Sort Order**: Uses commerce sort order (9011)

### 3. NPSP Campaign Member Structure Setup

When enabled, the flow calls `NpspInitialiseCampaignMemberProxy` with:

* Configurable status labels for different member types
* Commerce-specific sort order to prevent conflicts with NPSP statuses
* Optional deletion of existing campaign member statuses

### 4. GAU Inheritance Processing

For new records with parent campaigns:

* **Condition**: `IsNewRecord = true` AND `HasParentCampaign = true`
* **Action**: Copies GAU allocations from parent to child campaign
* **Component**: `NpspCopyGauBetweenCampaignsFlowProxy`

### 5. Campaign Member Creation

When a primary contact is provided:

* **Condition**: `CampaignContact` exists AND `Config_CreateCampaignMembers = true`
* **Process**: Creates campaign member record with appropriate status
* **Status Logic**: Uses formula to determine member status based on campaign type

### 6. Member Value Hierarchy Setup

The flow establishes a hierarchical order of campaign member statuses:

1. Team Leader
2. Fundraiser
3. Recurring Donor
4. Commerce/Sale/Ticket Holder (configurable)
5. Prospect

## Processing Flow

1. **Member Structure Check**: Determine if campaign member processing should occur
2. **Action Evaluation**: Configure labels and sort order based on commerce action
3. **NPSP Structure Initialization**: Set up campaign member statuses with NPSP integration
4. **GAU Inheritance**: Copy GAU allocations from parent if new record
5. **Contact Validation**: Check for primary contact and member creation settings
6. **Hierarchy Setup**: Establish member status precedence
7. **Member Creation**: Create campaign member records with appropriate status

## Configuration Options

### Campaign Member Labels

All member status labels are configurable, with commerce-specific options:

* **Sale**: Default commerce transaction status
* **Ticket Holder**: Event ticket purchase status
* **Standard Labels**: Team Leader, Fundraiser, Recurring Donor, Prospect

### Sort Order Management

* **Commerce Sort Order**: 9011 (prevents conflicts with NPSP standard statuses)
* **Ticket Sort Order**: 9012 (distinct from general commerce transactions)

### Processing Controls

* Enable/disable campaign member creation
* Control existing status deletion
* Configure GAU inheritance behavior

## Error Handling

### Action-Based Processing

* **Action Detection**: Evaluates action type to determine commerce label
* **Default Handling**: Uses standard commerce label when action is not "ticket"
* **Sort Order Assignment**: Ensures proper NPSP integration with distinct sort orders

### NPSP Integration

* **Proxy Components**: Uses NPSP proxy components for seamless integration
* **Status Management**: Prevents conflicts with existing NPSP campaign member statuses
* **GAU Processing**: Handles GAU copying with proper error handling

## Dependencies

* `NpspInitialiseCampaignMemberProxy` (Apex action)
* `NpspCopyGauBetweenCampaignsFlowProxy` (Apex action)
* `NpspCreateCampaignMemberProxy` (Apex action)