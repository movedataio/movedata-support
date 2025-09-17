# Campaign Record Match Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

### Overview

**Flow Name:** MoveData\_Donation\_Campaign\_Duplicate\
**Label:** \[MoveData] General: Campaign - Record Match\
**Type:** Auto-Launched Flow Template\
**API Version:** 49.0\
**Status:** Active

This utility flow performs duplicate detection for campaign records by using multiple matching strategies to identify existing campaigns in Salesforce, enabling proper record matching and preventing duplicate creation during data imports.

### Purpose

The flow provides duplicate detection capabilities that:

* Uses generated platform keys to look up existing campaign records
* Supports marketing source code matching through outreach components
* Returns Salesforce Record IDs when duplicates are found
* Supports multiple lookup strategies with hierarchical priority
* Enables proper upsert operations during campaign imports
* Provides break functionality for custom processing control

### Salesforce Fields

This flow interacts with the Salesforce Campaign object and its related fields. Below is a mapping of all fields utilized:

| Field API Name                 | Field Type | Purpose in Flow                                  |
| ------------------------------ | ---------- | ------------------------------------------------ |
| movedata\_\_Platform\_Key\_\_c | Text       | Stores external platform identifier for matching |

### Input Variables

| Variable                         | Type    | Required | Description                                       |
| -------------------------------- | ------- | -------- | ------------------------------------------------- |
| `SalesforceKey`                  | String  | No       | Existing Salesforce Record ID (if known)          |
| `PlatformKey`                    | String  | Yes      | Generated platform key for lookup matching        |
| `Donation_Marketing_Source`      | String  | No       | Marketing source code for outreach matching       |
| `Custom_MovedataBreak`           | Boolean | No       | Custom break flag for processing control          |
| `Config_MarketingSuppressSource` | Boolean | No       | Configuration to suppress marketing source lookup |

### Output Variables

| Variable     | Type              | Description                                          |
| ------------ | ----------------- | ---------------------------------------------------- |
| `Result`     | String            | Salesforce Record ID of matching campaign (if found) |
| `Break`      | Boolean           | Indicates if processing should break early           |
| `PostUpsert` | Boolean           | Indicates if post-upsert processing is required      |
| `RecordList` | String Collection | Collection of all matched record IDs                 |

### Flow Logic

#### 1. Salesforce Key Priority Check

The flow first determines the lookup strategy:

* **If SalesforceKey is provided**: Evaluates break conditions before proceeding
* **If Custom\_MovedataBreak is true**: Sets break flag and uses Salesforce key
* **Otherwise**: Proceeds to marketing source lookup

#### 2. Marketing Source Code Matching

When no direct Salesforce key match and marketing source is available:

* **Configuration Check**: Respects `Config_MarketingSuppressSource` setting
* **Outreach Component**: Uses `GetOutreachSourceCodeComponent` for source code lookup
* **Campaign Association**: Checks if matched outreach has associated campaign
* **Result Priority**: Marketing source matches take precedence over platform key lookup

#### 3. Platform Key Lookup

As the final matching strategy:

* Uses `movedata__PlatformKeyLookupComponent` Apex action
* Searches Campaign records by `movedata__Platform_Key__c` field
* Returns the matching Salesforce Record ID if found

### Processing Flow

1. **Salesforce Key Check**: Verify if direct Salesforce key is available
2. **Break Evaluation**: Check for custom break conditions
3. **Marketing Source Lookup**: Attempt outreach source code matching (if enabled)
4. **Campaign Association**: Verify outreach has associated campaign
5. **Platform Key Lookup**: Fallback to platform key matching
6. **Result Assembly**: Compile matched records and set processing flags

### Configuration Options

#### Marketing Source Control

* **Suppress Source**: `Config_MarketingSuppressSource = true` skips marketing source lookup
* **Source Priority**: Marketing source matches override platform key matches

#### Processing Control

* **Custom Break**: `Custom_MovedataBreak = true` enables early termination with existing key
* **Post-Upsert Flag**: Automatically set when marketing source match found

### Error Handling

#### Lookup Strategy Hierarchy

The duplicate detection follows this priority order:

1. **Direct Salesforce Key**: If provided, use immediately (highest priority)
2. **Marketing Source Code**: Outreach component matching with campaign association
3. **Platform Key Lookup**: Search existing records using platform key matching
4. **No Match**: Returns null if no duplicate found

#### Marketing Source Processing

* **Configuration Respect**: Honors suppression settings
* **Campaign Validation**: Ensures outreach has associated campaign before using match
* **Fallback Logic**: Continues to platform key lookup if marketing source fails

### Dependencies

* `movedata__PlatformKeyLookupComponent` (Apex action)
* `GetOutreachSourceCodeComponent` (Apex action)
