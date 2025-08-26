# Create Campaign Members Flow Component

## Overview

**Class Name:** CreateCampaignMemberComponent\
**Friendly Name:** Create Campaign Members\
**Category:** MoveData: NPSP\
**Purpose:** Creates and manages Campaign Member records with hierarchical status management and intelligent status upgrading.

## Class Description

This component facilitates the creation and management of Campaign Member relationships between contacts and campaigns, with sophisticated hierarchical status management. The class prevents status downgrades by maintaining a priority-based system whilst allowing status upgrades and new member creation. It includes comprehensive logging capabilities and supports bulk processing across multiple campaigns simultaneously.

## Input Parameters

* `Contact ID` \[`ContactId` (Id)]: ID of the contact to be added as a campaign member
* `Campaign ID List` \[`CampaignIdList` (List, required)]: All campaigns to be assigned to the contact
* `Value Hierarchy` \[`ValueHeirarchy` (List)]: Prioritised list of campaign member statuses from highest to lowest priority
* `Value` \[`Value` (String, required)]: Target campaign member status to assign
* `List of Log Entries` \[`LogList` (List)]: Existing log entries to append processing logs to

## Output Parameters

* `List of Log Entries` \[`LogList` (List, required)]: Updated log entries including processing details
* `Json Output of Log Entries` \[`LogJson` (String)]: JSON-encoded version of the flow's log entries

## Behaviour

### Status Hierarchy Management

* Uses default hierarchy if none provided: Team Leader, Fundraiser, Recurring Donor, Donor, Prospect
* Prevents status downgrades by comparing current status position against target status
* Allows status upgrades when target status has higher priority than existing status
* Maintains existing status when it matches target status

### Campaign Member Processing

* Queries existing campaign members across all specified campaigns for the contact
* Creates new campaign member records when no existing relationship exists
* Updates existing members only when target status represents an upgrade
* Performs bulk upsert operation for efficiency across all changes

### Default Status Hierarchy

The component uses a standard five-tier hierarchy when none is provided:

1. **Team Leader** (Index 0, highest priority)
2. **Fundraiser** (Index 1)
3. **Recurring Donor** (Index 2)
4. **Donor** (Index 3)
5. **Prospect** (Index 4, lowest priority)

This hierarchy supports common nonprofit campaign member classifications from organisational leadership down to potential supporters.

### Logging Integration

* Creates detailed log entries for new campaign member creation

## Error Handling

### Validation Requirements

* Campaign ID List must be provided (Contact ID is optional for graceful handling)
* Value (target status) must be present
* Target value must exist within the provided value hierarchy
* Throws `FlowComponentException` for validation failures

### Graceful Contact Handling

* Silently skips processing when Contact ID is null rather than throwing exceptions
* Allows for conditional campaign member creation based on contact availability
* Supports scenarios where contact association may be optional

## Dependencies

### Required Objects

* `Contact`: Standard Salesforce object
* `Campaign`: Standard Salesforce object
* `CampaignMember`: Standard Salesforce object

### Supporting Classes

**CreateCampaignMemberComponentWithLogs**

* **Class Name:** CreateCampaignMemberComponentWithLogs
* **Friendly Name:** Create Campaign Members (with Logging Support)
* **Purpose:** Callable wrapper that provides enhanced logging capabilities and Flow integration
