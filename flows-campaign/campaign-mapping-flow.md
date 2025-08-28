# Campaign Mapping Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Mapping\
**Label:** \[MoveData] Donation: Campaign - Mapping\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This flow handles the mapping and transformation of campaign data from external donation platforms into Salesforce Campaign records, with support for NPSP (Nonprofit Success Pack) integration.

## Purpose

The flow processes incoming campaign data and maps it to appropriate Salesforce Campaign fields while handling:

* Campaign naming and protection rules
* Status mapping based on external platform states
* Date conversions to local timezone
* Parent-child campaign relationships
* Platform-specific field mappings
* NPSP integration fields

## Salesforce Fields

This flow interacts with the Salesforce Campaign object and its related fields. Below is a comprehensive mapping of all fields utilized:

| Field API Name                                           | Field Type                     | Purpose in Flow                                    |
|---------------------------------------------------------|-------------------------------|---------------------------------------------------|
| Id                                                      | ID                            | Unique record identifier                           |
| Name                                                    | Text (80)                     | Campaign name identifier                           |
| IsActive                                                | Checkbox                      | Indicates if campaign is currently active          |
| Status                                                  | Picklist                      | Current status of the campaign                     |
| Type                                                    | Picklist                      | Categorizes the type of campaign                   |
| ParentId                                                | Lookup to Campaign            | Links to parent campaign                           |
| ExpectedRevenue                                         | Currency                      | Target fundraising amount                          |
| StartDate                                               | Date                          | Campaign start date                                |
| EndDate                                                 | Date                          | Campaign end date                                  |
| Description                                             | Long Text Area                | Detailed campaign description                      |
| movedata__Platform__c                                   | Text                          | External platform identifier                       |
| movedata__Platform_Key__c                               | Text                          | Stores unique external platform identifier         |
| movedata__Protect_Name__c                               | Checkbox                      | Prevents automatic updates to campaign name        |
| movedata__Protect_Campaign_Parent__c                    | Checkbox                      | Prevents automatic updates to parent relationship  |
| md_npsp_pack__Campaign_URL__c                           | URL                           | Stores web address for online campaign pages       |
| md_npsp_pack__Fundraising_Account__c                    | Lookup to Account             | Associates campaigns with organizational fundraisers |
| md_npsp_pack__Fundraising_Contact__c                    | Lookup to Contact             | Identifies individual fundraising champions         |

## Input Variables

### Core Campaign Data

| Variable       | Type             | Required | Description                                             |
| -------------- | ---------------- | -------- | ------------------------------------------------------- |
| `Record`       | Campaign SObject | Yes      | The Campaign record being processed                     |
| `CampaignName` | String           | No       | Name of the campaign from external platform             |
| `Name`         | String           | No       | Alternative name field                                  |
| `Description`  | String           | No       | Campaign description                                    |
| `Status`       | String           | No       | External platform status (draft/live/archive/completed) |
| `TargetAmount` | Currency         | No       | Campaign fundraising goal                               |
| `StartDate`    | DateTime         | No       | Campaign start date/time                                |
| `EndDate`      | DateTime         | No       | Campaign end date/time                                  |
| `CreatedAt`    | DateTime         | No       | Original creation timestamp                             |
| `ModifiedAt`   | DateTime         | No       | Last modification timestamp                             |
| `PageUrl`      | String           | No       | Campaign page URL                                       |

### Platform Integration

| Variable        | Type   | Default | Description                |
| --------------- | ------ | ------- | -------------------------- |
| `Platform`      | String | -       | Platform identifier        |
| `PlatformKey`   | String | -       | Unique platform key        |
| `PlatformLabel` | String | -       | Display label for platform |

### Related Records

| Variable             | Type             | Description                                 |
| -------------------- | ---------------- | ------------------------------------------- |
| `ParentCampaign`     | Campaign SObject | Parent campaign for hierarchical structures |
| `CampaignContact`    | Contact SObject  | Associated contact for NPSP integration     |
| `CampaignAccount`    | Account SObject  | Associated account for NPSP integration     |
| `HasCampaignContact` | Boolean          | Flag indicating contact association         |
| `HasCampaignAccount` | Boolean          | Flag indicating account association         |

### Configuration Variables

| Variable                             | Type    | Default | Description                |
| ------------------------------------ | ------- | ------- | -------------------------- |
| `Config_CampaignDefaultType`         | String  | "Other" | Default campaign type      |
| `Config_CampaignSetStartDate`        | Boolean | true    | Whether to set start dates |
| `Config_CampaignSetEndDate`          | Boolean | true    | Whether to set end dates   |
| `Config_CampaignSetEndDateForce`     | Boolean | false   | Force end date setting     |
| `Config_IgnoreCampaignName`          | Boolean | false   | Skip name processing       |
| `Config_IgnoreDefaultCampaignStatus` | Boolean | -       | Skip default status logic  |
| `Config_IgnoreDefaultCampaignType`   | Boolean | -       | Skip default type logic    |
| `Config_MoveDataEngine`              | Number  | -       | Engine version identifier  |

## Flow Logic

### 1. Name Processing

The flow first determines if the campaign name should be updated:

* Checks if name protection is enabled (`movedata__Protect_Name__c`)
* Handles name trimming (limits to 80 characters with "..." suffix)
* Uses configuration flags to skip name processing if needed

### 2. Campaign Type Assignment

Campaign type is set based on hierarchy:

1. **Ignore**: If `Config_IgnoreDefaultCampaignType` is true
2. **Inherit**: Use parent campaign's type if available
3. **Default**: Use `Config_CampaignDefaultType` (typically "Other")

### 3. Parent Campaign Relationship

* Checks for parent campaign protection (`movedata__Protect_Campaign_Parent__c`)
* Sets `ParentId` if parent campaign is provided and not protected

### 4. Status Mapping

External platform statuses are mapped to Salesforce campaign statuses:

| External Status | Salesforce Status | IsActive |
| --------------- | ----------------- | -------- |
| draft           | Planned           | false    |
| live            | In Progress       | true     |
| archive         | Completed         | false    |
| completed       | Completed         | false    |
| aborted         | (preserved)       | -        |

Special handling:

* Respects existing "Aborted" status
* Can be bypassed with `Config_IgnoreDefaultCampaignStatus`

### 5. Amount and Date Processing

* **Target Amount**: Maps to `ExpectedRevenue` field
* **Start Date**: Converts to local date using `movedata__ConvertToLocalDateFlowComponent`
* **End Date**: Converts to local date with optional forcing via configuration

Date Formula Logic:

```
StartDate = StartDate || EndDate || NotificationDate (where CreatedAt || ModifiedAt)
```

### 6. NPSP Integration

When NPSP fields are available:

* Sets `md_npsp_pack__Campaign_URL__c` from `PageUrl`
* Sets `md_npsp_pack__Fundraising_Contact__c` from associated contact
* Sets `md_npsp_pack__Fundraising_Account__c` from associated account

### 7. Platform Tracking

* Sets `movedata__Platform__c` field with platform identifier or label
* Sets `movedata__Platform_Key__c` for external system tracking

## Protection Mechanisms

The flow includes several protection fields to prevent overwriting existing data:

* `movedata__Protect_Name__c`: Prevents name updates
* `movedata__Protect_Campaign_Parent__c`: Prevents parent relationship changes

## Error Handling

* Uses conditional logic to handle null values gracefully
* Includes default connectors for decision elements
* Validates required relationships before setting

## Dependencies

* `movedata__ConvertToLocalDateFlowComponent` (Apex action)
* `movedata__SetValueComponent` (Apex action)
