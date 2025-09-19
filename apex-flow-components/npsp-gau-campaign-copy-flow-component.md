# NPSP GAU Campaign Copy Flow Component

## Overview

**Class Name:** NpspCopyGauBetweenCampaignsFlowProxy\
**Friendly Name:** NPSP GAU Campaign Copy Proxy\
**Category:** Commerce Extensions\
**Purpose:** Provides a proxy interface to copy General Accounting Unit (GAU) allocation configurations between campaigns without creating hard dependencies on NPSP extension packages

## Class Description

The `NpspCopyGauBetweenCampaignsFlowProxy` serves as a decoupling mechanism that enables GAU allocation copying functionality while avoiding hard dependencies on the NPSP extensions package. This proxy pattern allows the Commerce extensions to conditionally invoke NPSP functionality when the package is available, ensuring the system remains functional even when NPSP components are not installed.

The class acts as an invocable method wrapper that safely attempts to instantiate and call the underlying `CopyGauBetweenCampaignsFlowComponent` through reflection. If the NPSP package is not available or the target class cannot be instantiated, the proxy gracefully handles the failure without throwing exceptions.

## Input Parameters

* `Source Campaign ID` \[`SourceCampaignId` (String)]: ID of the source campaign containing GAU allocations to copy
* `Target Campaign ID` \[`TargetCampaignId` (String)]: ID of the target campaign that will receive the GAU allocations

## Output Parameters

None

## Behaviour

### Proxy Pattern Implementation

* Uses reflection to dynamically instantiate the target NPSP component (`md_npsp_pack.CopyGauBetweenCampaignsFlowComponent`)
* Converts input parameters to a generic object map for cross-package method invocation
* Implements safe instantiation with exception handling to prevent failures when NPSP package is unavailable

### Request Processing

* Accepts a list of `CopyGauBetweenCampaignsRequest` objects through the `@InvocableMethod`
* Transforms each request into a parameter map suitable for the underlying component
* Iterates through all requests in the input list, processing each individually

### Error Handling

* Gracefully handles cases where the target NPSP class is not available
* Skips processing during test execution to avoid dependency issues
* Does not throw exceptions when the underlying component cannot be instantiated

### Delegation Behaviour

When the NPSP package is available, the proxy delegates to the underlying component which:

* Creates new `npsp__Allocation__c` records for source allocations not found in target
* Preserves existing target allocations that have exact matches in source
* Removes target allocations that have no corresponding match in source
* Ensures target campaign exactly mirrors source campaign allocation structure

## Dependencies

### Optional Dependencies

* **md\_npsp\_pack.CopyGauBetweenCampaignsFlowComponent**: The target component that performs the actual GAU copying logic
* **Campaign**: Standard Salesforce object
* **npsp\_\_Allocation\_\_c**: NPSP allocation object (when NPSP package is installed)
* **npsp\_\_General\_Accounting\_Unit\_\_c**: NPSP GAU object (when NPSP package is installed)

### Design Benefits

* **Loose Coupling**: Eliminates hard dependencies on NPSP package installation
* **Graceful Degradation**: System continues to function when NPSP components are unavailable
* **Package Independence**: Commerce extensions can be deployed independently of NPSP extensions
* **Runtime Flexibility**: Automatically utilizes NPSP functionality when available without requiring configuration changes
