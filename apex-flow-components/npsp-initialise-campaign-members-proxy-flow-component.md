# NPSP Initialise Campaign Members Proxy Flow Component

## Overview

**Class Name:** NpspInitialiseCampaignMemberProxy\
**Friendly Name:** NPSP Initialise Campaign Member Statuses Proxy\
**Category:** Commerce Extensions\
**Purpose:** Provides a proxy interface to create and configure standardised Campaign Member Status records without creating hard dependencies on NPSP extension packages

## Class Description

The `NpspInitialiseCampaignMemberProxy` serves as a decoupling mechanism that enables Campaign Member Status standardisation functionality while avoiding hard dependencies on the NPSP extensions package. This proxy pattern allows the Commerce extensions to conditionally invoke NPSP functionality when the package is available, ensuring the system remains functional even when NPSP components are not installed.

The class acts as an invocable method wrapper that safely attempts to instantiate and call the underlying `InitialiseCampaignMemberComponent` through reflection. If the NPSP package is not available or the target class cannot be instantiated, the proxy gracefully handles the failure without throwing exceptions, ensuring campaign operations continue uninterrupted.

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

### Proxy Pattern Implementation

* Uses reflection to dynamically instantiate the target NPSP component (`md_npsp_pack.InitialiseCampaignMemberComponent`)
* Converts input parameters to a generic object map for cross-package method invocation using the `ToObjectMap()` method
* Implements safe instantiation with exception handling to prevent failures when NPSP package is unavailable

### Request Processing

* Accepts a list of `InitialiseCampaignMemberRequest` objects through the `@InvocableMethod`
* Transforms each request into a parameter map suitable for the underlying component
* Iterates through all requests in the input list, processing each individually
* Maintains parameter integrity across all status configuration options

### Error Handling

* Gracefully handles cases where the target NPSP class is not available
* Skips processing during test execution to avoid dependency issues
* Does not throw exceptions when the underlying component cannot be instantiated
* Ensures campaign operations continue even when NPSP status standardisation is unavailable

### Parameter Mapping

* Comprehensively maps all status configuration parameters including labels and sort orders
* Preserves boolean flags for cleanup operations and error handling preferences
* Maintains parameter defaults through the underlying component when NPSP package is available

### Delegation Behaviour

When the NPSP package is available, the proxy delegates to the underlying component which:

* Creates five standardised campaign member statuses in hierarchical order
* Sets appropriate `HasResponded` values and designates Prospect as default status
* Queries and manages existing campaign member statuses
* Optionally removes non-standard statuses based on configuration
* Handles duplicate sort order conflicts with specific error messaging
* Provides configurable error suppression for batch processing scenarios

### Default Status Hierarchy

When successfully delegated, the component creates the following standardised hierarchy:

| Status          | Default Label     | Default Sort Order | HasResponded | IsDefault |
| --------------- | ----------------- | ------------------ | ------------ | --------- |
| Team Leader     | "Team Leader"     | 8921               | true         | false     |
| Fundraiser      | "Fundraiser"      | 8931               | true         | false     |
| Recurring Donor | "Recurring Donor" | 8941               | true         | false     |
| Donor           | "Donor"           | 8951               | true         | false     |
| Prospect        | "Prospect"        | 8961               | false        | true      |

## Error Handling

### Validation Requirements

* Campaign ID must be provided for status configuration
* When NPSP components are available, comprehensive validation occurs for status configuration conflicts

### Graceful Degradation

* Silently skips processing when NPSP package is unavailable rather than throwing exceptions
* Allows campaigns to function with standard Salesforce statuses when NPSP standardisation is not possible
* Supports scenarios where status standardisation may be optional

## Dependencies

### Optional Dependencies

* **md\_npsp\_pack.InitialiseCampaignMemberComponent**: The target component that performs the actual Campaign Member Status standardisation logic
* **Campaign**: Standard Salesforce object
* **CampaignMemberStatus**: Standard Salesforce object for campaign member status configuration

### Design Benefits

* **Loose Coupling**: Eliminates hard dependencies on NPSP package installation
* **Graceful Degradation**: System continues to function when NPSP components are unavailable
* **Package Independence**: Commerce extensions can be deployed independently of NPSP extensions
* **Runtime Flexibility**: Automatically utilizes NPSP functionality when available without requiring configuration changes
* **Configuration Preservation**: Maintains all customisation options for labels and sort orders when underlying components are available
* **Error Isolation**: Prevents NPSP package availability issues from affecting core campaign functionality
