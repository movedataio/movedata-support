# Get Account ID Helper Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows).\
This document is to support working through a visual flow.  Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Donation\_Helper\_Get\_Account\_ID\
**Label:** \[MoveData] Donation: Helper - Get Account ID\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This utility flow determines and returns account IDs using a hierarchical lookup strategy.

## Purpose

The flow provides account ID resolution that:

* Retrieves account IDs from multiple data sources with priority hierarchy
* Handles missing account data gracefully with fallback mechanisms

## Salesforce Fields

This flow interacts with the Salesforce Account and Contact objects and their related fields. Below is a mapping of all fields utilized:

| Object              | Field API Name | Field Type          | Purpose in Flow                          |
|--------------------|---------------|--------------------|-----------------------------------------|
| **Account**        | Id            | ID                 | Primary account identifier               |
| **Contact**        | Id            | ID                 | Contact record identifier                |
| **Contact**        | AccountId     | Lookup to Account  | Links contact to associated account      |

## Input Variables

| Variable       | Type            | Required | Description                                        |
| -------------- | --------------- | -------- | -------------------------------------------------- |
| `DonorAccount` | Account SObject | No       | Direct account object (if available)               |
| `DonorContact` | Contact SObject | No       | Contact object with potential account relationship |

## Output Variables

| Variable       | Type            | Description                             |
| -------------- | --------------- | --------------------------------------- |
| `Result`       | String          | Resolved account ID                     |
| `DonorAccount` | Account SObject | Updated account object with resolved ID |
| `DonorContact` | Contact SObject | Contact object (passed through)         |

## Flow Logic

### 1. Account Availability Check

The flow first determines the primary data source:

**Account Priority Assessment:**

* **If DonorAccount exists**: Uses direct account ID extraction
* **If DonorAccount is null**: Proceeds to contact-based account resolution

### 2. Direct Account ID Extraction

When DonorAccount is available:

**Direct ID Assignment:**

* Extracts `DonorAccount.Id` directly
* Assigns to Result variable
* Proceeds to account object update

### 3. Contact-Based Account Resolution

When DonorAccount is missing, uses contact data:

**Contact Account ID Check:**

* **Contact Exists AND AccountId is Set AND AccountId is Not Null**: Uses `DonorContact.AccountId`
* **Contact Missing OR AccountId Not Set OR AccountId is Null**: Performs database lookup

### 4. Database Account Lookup

When contact exists but AccountId is not readily available:

**Contact Lookup Operation:**

* Queries Contact object using `DonorContact.Id`
* Retrieves AccountId field from database
* Handles null values if no account relationship exists
* Assigns result to Result variable

### 5. Account Object Update

Final step for all resolution paths:

**ID Assignment:**

* Sets `DonorAccount.Id` to the resolved account ID
* Ensures account object contains proper ID reference
* Supports downstream processing requirements

## Lookup Hierarchy

The flow follows a clear priority hierarchy for account ID resolution:

1. **Direct Account ID**: `DonorAccount.Id` (highest priority)
2. **Contact Account ID**: `DonorContact.AccountId` (if readily available)
3. **Database Lookup**: Query Contact.AccountId (fallback option)
4. **Null Result**: No account relationship found

## Dependencies

None
