# NPSP Create Campaign Members Proxy Flow Component

## Overview

**Class Name:** NpspCreateCampaignMemberProxy\
**Friendly Name:** NPSP Create Campaign Members Proxy\
**Category:** Commerce Extensions\
**Purpose:** Provides a proxy interface to create and manage Campaign Member records with hierarchical status management without creating hard dependencies on NPSP extension packages

## Class Description

The `NpspCreateCampaignMemberProxy` serves as a decoupling mechanism that enables Campaign Member creation and management functionality while avoiding hard dependencies on the NPSP extensions package. This proxy pattern allows the Commerce extensions to conditionally invoke NPSP functionality when the package is available, ensuring the system remains functional even when NPSP components are not installed.

The class acts as an invocable method wrapper that safely attempts to instantiate and call the underlying `CreateCampaignMemberComponentWithLogs` through reflection. If the NPSP package is not available or the target class cannot be instantiated, the proxy gracefully handles the failure without throwing exceptions while still returning appropriate response structures.

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

### Proxy Pattern Implementation

* Uses reflection to dynamically instantiate the target NPSP component (`md_npsp_pack.CreateCampaignMemberComponentWithLogs`)
* Converts input parameters to a generic object map for cross-package method invocation using the `ToObjectMap()` method
* Implements safe instantiation with exception handling to prevent failures when NPSP package is unavailable

### Request Processing

* Accepts a list of `CreateCampaignMemberRequest` objects through the `@InvocableMethod`
* Transforms each request into a parameter map suitable for the underlying component
* Iterates through all requests in the input list, processing each individually
* Returns a list of response objects maintaining the expected return structure

### Error Handling

* Gracefully handles cases where the target NPSP class is not available
* Skips processing during test execution to avoid dependency issues
* Does not throw exceptions when the underlying component cannot be instantiated
* Provides workaround response objects to maintain Flow compatibility

### Response Management

* Creates placeholder response objects when NPSP components are unavailable
* Maintains consistent return structure for Flow integration
* Ensures calling flows receive expected response types even when underlying functionality is unavailable

### Delegation Behaviour

When the NPSP package is available, the proxy delegates to the underlying component which:

* Uses default hierarchy if none provided: Team Leader, Fundraiser, Recurring Donor, Donor, Prospect
* Prevents status downgrades by comparing current status position against target status
* Allows status upgrades when target status has higher priority than existing status
* Creates new campaign member records when no existing relationship exists
* Performs bulk upsert operations for efficiency across all changes
* Provides comprehensive logging capabilities for processing details

## Error Handling

### Validation Requirements

* Campaign ID List must be provided (Contact ID is optional for graceful handling)
* Value (target status) must be present
* When NPSP components are available, target value must exist within the provided value hierarchy

### Graceful Contact Handling

* Silently skips processing when Contact ID is null rather than throwing exceptions
* Allows for conditional campaign member creation based on contact availability
* Supports scenarios where contact association may be optional

## Dependencies

### Optional Dependencies

* **md\_npsp\_pack.CreateCampaignMemberComponentWithLogs**: The target component that performs the actual Campaign Member creation and management logic
* **Contact**: Standard Salesforce object
* **Campaign**: Standard Salesforce object
* **CampaignMember**: Standard Salesforce object (when NPSP package is installed)
* **movedata.MoveDataLogEntry**: Logging framework for processing details

### Design Benefits

* **Loose Coupling**: Eliminates hard dependencies on NPSP package installation
* **Graceful Degradation**: System continues to function when NPSP components are unavailable
* **Package Independence**: Commerce extensions can be deployed independently of NPSP extensions
* **Runtime Flexibility**: Automatically utilizes NPSP functionality when available without requiring configuration changes
* **Flow Compatibility**: Maintains consistent response structures for seamless Flow integration
* **Logging Support**: Preserves comprehensive logging capabilities when underlying components are available
