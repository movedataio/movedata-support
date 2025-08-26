# Initialise Campaign Member Statuses Flow Component

## Overview

**Class Name:** InitialiseCampaignMemberComponent\
**Friendly Name:** Initialise Campaign Member Statuses\
**Category:** MoveData: NPSP\
**Purpose:** Creates and configures standardised Campaign Member Status records for campaigns with customisable labels and sort ordering

## Class Description

This component facilitates the standardisation of Campaign Member Status structures across campaigns by creating a consistent five-tier status hierarchy. The class manages status creation, updates existing status configurations, and optionally removes non-standard statuses to ensure uniform campaign member management. It provides comprehensive customisation options for labels and sort orders whilst maintaining the hierarchical relationship structure essential for nonprofit campaign operations.

## Input Parameters

* `Campaign Id` \[`CampaignId` (Id, required)]: Campaign to configure with standardised member statuses
* `Label: #1 - Team Leader` \[`TeamLeaderLabel` (String)]: Custom label for team leader status (default: "Team Leader")
* `Sort Order: #1 - Team Leader` \[`TeamLeaderSortOrder` (Integer)]: Sort order for team leader status (default: 8921)
* `Label: #2 - Fundraiser` \[`FundraiserLabel` (String)]: Custom label for fundraiser status (default: "Fundraiser")
* `Sort Order: #2 - Fundraiser` \[`FundraiserSortOrder` (Integer)]: Sort order for fundraiser status (default: 8931)
* `Label: #3 - Recurring Donor` \[`RecurringDonorLabel` (String)]: Custom label for recurring donor status (default: "Recurring Donor")
* `Sort Order: #3 - Recurring Donor` \[`RecurringDonorSortOrder` (Integer)]: Sort order for recurring donor status (default: 8941)
* `Label: #4 - Donor` \[`DonorLabel` (String)]: Custom label for donor status (default: "Donor")
* `Sort Order: #4 - Donor` \[`DonorSortOrder` (Integer)]: Sort order for donor status (default: 8951)
* `Label: #5 - Prospect` \[`ProspectLabel` (String)]: Custom label for prospect status (default: "Prospect")
* `Sort Order: #5 - Prospect` \[`ProspectSortOrder` (Integer)]: Sort order for prospect status (default: 8961)
* `Delete Other Campaign Member Statuses` \[`DeleteOtherCampaignMemberStatuses` (Boolean)]: Remove existing non-standard statuses (default: false)
* `Continue on Error` \[`ContinueOnError` (Boolean)]: Suppress exceptions and continue processing (default: false)

## Output Parameters

None

## Behaviour

### Status Hierarchy Creation

* Creates five standardised campaign member statuses in hierarchical order from highest to lowest priority
* Sets appropriate `HasResponded` values: true for all statuses except Prospect
* Designates Prospect as the default status (`IsDefault = true`)
* Configures sort orders to maintain proper hierarchy display in Salesforce

### Existing Status Management

* Queries existing campaign member statuses and compares against target configuration
* Preserves existing statuses that match the target label names
* Identifies non-standard statuses for potential removal based on configuration
* Updates sort orders and properties of matching existing statuses

### Status Cleanup Operations

* Optionally removes existing statuses that don't match the standardised hierarchy
* Handles deletion errors gracefully when statuses are in use by campaign members
* Ensures clean status structure when `DeleteOtherCampaignMemberStatuses` is enabled

### Default Configuration Values

The component provides sensible defaults for all status configurations:

| Status          | Default Label     | Default Sort Order | HasResponded | IsDefault |
| --------------- | ----------------- | ------------------ | ------------ | --------- |
| Team Leader     | "Team Leader"     | 8921               | true         | false     |
| Fundraiser      | "Fundraiser"      | 8931               | true         | false     |
| Recurring Donor | "Recurring Donor" | 8941               | true         | false     |
| Donor           | "Donor"           | 8951               | true         | false     |
| Prospect        | "Prospect"        | 8961               | false        | true      |

## Error Handling

### Duplicate Sort Order Management

* Detects `DUPLICATE_VALUE` errors from conflicting sort orders
* Provides specific error message guidance for sort order conflicts
* Throws `FlowComponentException` with actionable resolution steps

### DML Exception Handling

* Gracefully handles deletion failures for statuses currently in use
* Suppresses delete errors to allow status creation to proceed
* Provides debug logging for troubleshooting status management issues

### Configurable Error Suppression

* Uses `ContinueOnError` flag to suppress all exceptions when enabled
* Logs errors for debugging whilst allowing batch processing to continue
* Supports scenarios where partial success is acceptable

## Dependencies

### Required Objects

* `Campaign`: Standard Salesforce object
* `CampaignMemberStatus`: Standard Salesforce object for campaign member status configuration
