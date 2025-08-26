# GAU Campaign Copy Flow Component

## Overview

**Class Name:** CopyGauBetweenCampaignsFlowComponent\
**Friendly Name:** GAU Campaign Copy\
**Category:** MoveData: NPSP\
**Purpose:** Copies General Accounting Unit (GAU) allocation configurations from a source campaign to a target campaign

## Class Description

This component facilitates the inheritance of NPSP allocation structures between campaigns, typically used when creating child campaigns that should inherit the GAU allocation patterns from their parent campaigns. The class synchronises allocation records by copying missing allocations from source to target and removing allocations that exist in target but not in source.

## Input Parameters

* `Source Campaign ID` \[`SourceCampaignId` (String)]: ID of the source campaign containing GAU allocations to copy
* `Target Campaign ID` \[`TargetCampaignId` (String)]: ID of the target campaign that will receive the GAU allocations

## Output Parameters

None

## Behaviour

### Allocation Creation

* Creates new `npsp__Allocation__c` records for source allocations not found in target
* Assigns target campaign ID to new allocation records
* Preserves all allocation properties (amount, percent, GAU reference)

### Allocation Preservation

* Keeps existing target allocations that have exact matches in source
* Maintains existing record IDs for matched allocations

### Allocation Deletion

* Removes target allocations that have no corresponding match in source
* Ensures target campaign exactly mirrors source campaign allocation structure

## Dependencies

### Required Objects

* **Campaign**: Standard Salesforce object
* **npsp\_\_Allocation\_\_c**: NPSP allocation object
* **npsp\_\_General\_Accounting\_Unit\_\_c**: NPSP GAU object
