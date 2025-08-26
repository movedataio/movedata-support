# Recurring Post-Upsert Flow

{% hint style="info" %}
This flow is documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Recurring\_Post\
**Label:** \[MoveData] Donation: Recurring - Post Upsert\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles post-processing operations after recurring donation records are created or updated, specifically focusing on campaign member creation for recurring donors when they are associated with campaigns.

## Purpose

The flow performs post-upsert operations that:

* Create campaign member records for recurring donors
* Creates campaign member entries

## Input Variables

### Core Recurring Donation Data

| Variable           | Type                              | Required | Description                                      |
| ------------------ | --------------------------------- | -------- | ------------------------------------------------ |
| `Record`           | npe03\_\_Recurring\_Donation\_\_c | Yes      | The Recurring Donation record that was processed |
| `DonationCampaign` | Campaign SObject                  | No       | Associated campaign for the recurring donation   |
| `DonorContact`     | Contact SObject                   | No       | Contact associated with the recurring donation   |

### Campaign Processing

| Variable         | Type              | Description                                       |
| ---------------- | ----------------- | ------------------------------------------------- |
| `CampaignIdList` | String Collection | List of campaign IDs for campaign member creation |

### Configuration Variables

| Variable                                      | Type    | Default           | Description                              |
| --------------------------------------------- | ------- | ----------------- | ---------------------------------------- |
| `Config_CreateCampaignMembers`                | Boolean | true              | Enable campaign member creation          |
| `Config_CampaignMemberDeleteExistingStatuses` | Boolean | false             | Remove existing campaign member statuses |
| `Config_CampaignMemberLabelTeamLeader`        | String  | "Team Leader"     | Label for team leader status             |
| `Config_CampaignMemberLabelFundraiser`        | String  | "Fundraiser"      | Label for fundraiser status              |
| `Config_CampaignMemberLabelRecurringDonor`    | String  | "Recurring Donor" | Label for recurring donor status         |
| `Config_CampaignMemberLabelDonor`             | String  | "Donor"           | Label for donor status                   |
| `Config_CampaignMemberLabelProspect`          | String  | "Prospect"        | Label for prospect status                |

## Flow Logic

### 1. Prerequisites Validation

The flow first validates that all required conditions are met:

**Required Conditions:**

* `DonationCampaign` exists and has a valid ID
* `DonorContact` exists and has a valid ID
* `Config_CreateCampaignMembers` is set to true

**Validation Logic:**

```
IF (DonationCampaign != null AND DonationCampaign.Id != null AND
    DonorContact != null AND DonorContact.Id != null AND
    Config_CreateCampaignMembers == true)
THEN proceed with campaign member creation
ELSE skip processing
```

### 2. Campaign Member Status Initialisation

When prerequisites are met, the flow initialises campaign member statuses:

**Action:** `InitialiseCampaignMemberComponent`

**Purpose:** Ensures the campaign has the proper member status picklist values available.

### 3. Campaign Member Value Hierarchy Setup

The flow establishes a prioritised hierarchy of campaign member statuses:

**Hierarchy Order (highest to lowest priority):**

1. **Team Leader** - Campaign organisers and leaders
2. **Fundraiser** - Active fundraisers for the campaign
3. **Recurring Donor** - Contacts with recurring donations (target status for this flow)
4. **Donor** - One-time donors
5. **Prospect** - Potential donors who haven't donated yet

**Implementation:** Uses collection assignment to build `CampaignMemberValueHeirarchy` list in priority order.

### 4. Campaign Member Creation

The final step creates the actual campaign member record:

**Action:** `CreateCampaignMemberComponentWithLogs`

**Status Assignment Logic:**

* The component attempts to assign the "Recurring Donor" status
* If the contact already has a higher-priority status (Team Leader or Fundraiser), that status is preserved
* If the contact has a lower-priority status (Donor or Prospect), it gets upgraded to "Recurring Donor"
* If no existing status exists, "Recurring Donor" is assigned

## Error Handling

### Validation Failures

* **Missing Campaign**: Flow terminates gracefully if no campaign is associated
* **Missing Contact**: Flow terminates gracefully if no contact is associated
* **Disabled Feature**: Flow terminates gracefully if campaign members are disabled

## Dependencies

* `InitialiseCampaignMemberComponent` (Apex action)
* `CreateCampaignMemberComponentWithLogs` (Apex action)
