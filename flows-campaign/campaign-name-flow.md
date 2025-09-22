# Campaign Name Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).  This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Name\
**Label:** \[MoveData] Donation: Campaign - Name\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow generates hierarchical campaign names by combining campaign names with parent campaign references, supporting multi-tier naming conventions for complex campaign structures.

## Purpose

The flow creates structured campaign names that:

* Generate hierarchical naming conventions based on campaign relationships
* Support multi-tier campaign structures with parent-child relationships
* Respect name protection settings to prevent unwanted overwrites
* Use campaign codes or names from parent campaigns for consistency
* Provide different naming formats based on campaign hierarchy depth

## Salesforce Fields

This flow interacts with the Salesforce Campaign object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                          | Field Type     | Purpose in Flow                                    |
|----------------------------------------|---------------|---------------------------------------------------|
| Name                                   | Text (80)     | Campaign name identifier                           |
| movedata__Campaign_Code__c             | Text          | Short code identifier for campaign naming          |
| movedata__Protect_Name__c              | Checkbox      | Prevents automatic updates to campaign name        |

## Input Variables

| Variable                                | Type             | Required | Description                                       |
| --------------------------------------- | ---------------- | -------- | ------------------------------------------------- |
| `Record`                                | Campaign SObject | Yes      | The Campaign record being processed               |
| `Name`                                  | String           | Yes      | Base campaign name from external platform         |
| `ParentCampaign`                        | Campaign SObject | No       | Parent campaign for hierarchical naming           |
| `CampaignIndex`                         | Number           | Yes      | Hierarchy level indicator (1, 2, or higher)       |
| `Config_CampaignNameIgnoreCampaignCode` | Boolean          | No       | Whether to ignore campaign codes (default: false) |

## Output Variables

| Variable         | Type             | Description                                                   |
| ---------------- | ---------------- | ------------------------------------------------------------- |
| `Result`         | String           | Generated campaign name with appropriate hierarchy formatting |
| `Record`         | Campaign SObject | Updated campaign record                                       |
| `ParentCampaign` | Campaign SObject | Parent campaign reference                                     |

## Flow Logic

### 1. Name Protection Check

The flow first determines if the existing name should be preserved:

* **If `movedata__Protect_Name__c` is true**: Returns existing record name unchanged
* **If name is not protected**: Proceeds to generate hierarchical name

### 2. Campaign Index Evaluation

The flow uses the `CampaignIndex` to determine naming strategy:

#### Index = 1 (Single Tier)

* Returns the provided `Name` directly
* No parent hierarchy formatting applied

#### Index = 2 (Two Tier)

* Combines parent campaign name with current name
* Uses colon separator format: `Parent: Child`

#### Index > 2 (Multi-Tier)

* Uses hyphen separator format: `Parent - Child`
* Supports deep hierarchical structures

### 3. Parent Name Determination

For hierarchical naming, the flow determines parent name source:

#### Priority Order:

1. **Campaign Code**: Uses `movedata__Campaign_Code__c` if available and not ignored
2. **Campaign Name**: Falls back to parent `Name` field

### 4. Name Format Generation

The flow applies different formatting based on hierarchy level:

#### Single-Tier Format

```
ChildName
```

**Example:** `Annual Gala`

#### Two-Tier Format

```
ParentName: ChildName
```

**Example:** `Annual Gala: Online Donations`

#### Multi-Tier Format

```
ParentName - ChildName
```

**Example:** `Annual Gala: Online Donations - Jack's Fundraiser`

## Configuration Options

### Config\_CampaignNameIgnoreCampaignCode

* **Default**: `false`
* **Purpose**: When `true`, ignores campaign codes and uses campaign names instead
* **Impact**: Affects parent name selection for hierarchical formatting

## Naming Examples

### Single Campaign (Index = 1)

* **Input**: `Name = "Emergency Relief"`
* **Output**: `"Emergency Relief"`

### Two-Tier Campaign (Index = 2)

* **Parent**: Campaign with Code "GALA2024"
* **Input**: `Name = "Online Auction"`
* **Output**: `"GALA2024: Online Auction"`

### Multi-Tier Campaign (Index > 2)

* **Parent**: `Name = "Annual Gala: Online Donations"`
* **Input**: `Name = "Jack's Fundraiser"`
* **Output**: `"Annual Gala: Online Donations - Jack's Fundraiser"`

## Dependencies

None