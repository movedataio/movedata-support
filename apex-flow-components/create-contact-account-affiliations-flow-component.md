# Create Contact / Account Affiliations Flow Component

## Overview

**Class Name:** CreateAffiliationComponent\
**Friendly Name:** Create Contact / Account Affiliations\
**Category:** MoveData: NPSP\
**Purpose:** Creates NPSP Affiliation records between accounts and contacts to establish organisational relationships

## Class Description

This component facilitates the creation of NPSP affiliation structures between contacts and accounts, typically used when establishing formal relationships such as employment, membership, or board positions. The class creates affiliation records that link contacts to organisations whilst avoiding duplicate relationships and handling primary affiliation designations for individual accounts.

## Input Parameters

* `Contact` \[`contactRecord` (Contact)]: Contact record to be affiliated with the account
* `Account` \[`accountRecord` (Account)]: Account record that will be linked to the contact
* `Role` \[`role` (String)]: Optional role designation for the affiliation relationship
* `Active Status` \[`status` (String, required)]: Status of the affiliation (e.g., "Current", "Former")

## Output Parameters

None

## Behaviour

### Affiliation Creation

* Creates new `npe5__Affiliation__c` records linking contacts to accounts
* Assigns the specified status and optional role to the affiliation
* Prevents duplicate affiliations by checking existing records with matching criteria

### Primary Affiliation Management

* Automatically sets affiliation as primary when account has no existing primary contact
* Updates account's `npe01__One2OneContact__c` field to establish primary relationship
* Supports NPSP's individual account model by linking primary contacts

### Duplicate Prevention

* Queries existing affiliations based on status, contact, account, and role
* Skips creation if matching affiliation already exists
* Ensures data integrity by preventing redundant relationship records

## Error Handling

### Validation Requirements

* Contact record must have a valid ID
* Account record must have a valid ID
* Throws `FlowComponentException` if required IDs are missing

### NPSP Dependency

* Gracefully handles missing NPSP package by checking for affiliation object existence
* Returns silently if `npe5__Affiliation__c` object is not available
* Logs debug messages for troubleshooting when NPSP objects are missing

## Dependencies

### Required Objects

* `Account`: Standard Salesforce object
* `Contact`: Standard Salesforce object
* `npe5__Affiliation__c`: NPSP affiliation object
