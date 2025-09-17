# Campaign Name Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Name\
**Label:** \[MoveData] General: Campaign - Name\
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

| Field API Name                  | Field Type | Purpose in Flow                             |
| ------------------------------- | ---------- | ------------------------------------------- |
| Name                            | Text (80)  | Campaign name identifier                    |
| movedata\_\_Campaign\_Code\_\_c | Text       | Short code identifier for campaign naming   |
| movedata\_\_Protect\_Name\_\_c  | Checkbox   | Prevents automatic updates to campaign name |

## Input Variables

| Variable                                | Type             | Required | Description                                       |
| --------------------------------------- | ---------------- | -------- | ------------------------------------------------- |
| `Record`                                | Campaign SObject | Yes      | The Campaign record being processed               |
| `Name`                                  | String           | Yes      | Base campaign name from external platform         |
| `ParentCampaign`                        | Campaign SObject | No       | Parent campaign for hierarchical naming           |
| `CampaignIndex`                         | Number           | Yes      | Hierarchy level indicator (1, 2, or higher)       |
| `CampaignCount`                         | Number           | No       | Total number of campaigns in hierarchy            |
| `Type`                                  | String           | No       | Campaign type classification                      |
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

## Processing Flow

1. **Protection Check**: Verify if name protection is enabled
2. **Index Evaluation**: Determine hierarchy level and naming strategy
3. **Parent Name Selection**: Choose between campaign code and name
4. **Format Application**: Apply appropriate separator and structure
5. **Result Generation**: Return formatted campaign name

## Configuration Options

### Config\_CampaignNameIgnoreCampaignCode

* **Default**: `false`
* **Purpose**: When `true`, ignores campaign codes and uses campaign names instead
* **Impact**: Affects parent name selection for hierarchical formatting

## Error Handling

### Name Protection

* **Protection Respect**: Honors `movedata__Protect_Name__c` flag to prevent overwrites
* **Graceful Fallback**: Uses existing record name when protection is enabled

### Parent Campaign Processing

* **Campaign Code Priority**: Prefers campaign codes over names when available
* **Configuration Override**: Respects ignore campaign code setting
* **Null Handling**: Gracefully handles missing parent campaign data

## Dependencies

None
