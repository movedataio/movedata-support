# Account Details Helper Flow

{% hint style="info" %}
This flow is self-documenting and should be viewed within Salesforce (Setup -> Process Automations -> Flows). This document is to support working through a visual flow. Please Note: The flow commentary is produced using AI.
{% endhint %}

## Overview

**Flow Name:** MoveData\_Commerce\_Helper\_Set\_Account\_Details\
**Label:** \[MoveData] Commerce: Helper - Set Account Details\
**Type:** Auto-Launched Flow Template\
**API Version:** 60.0\
**Status:** Active

This helper flow handles the transformation and validation of account data from external commerce platforms, providing field formatting and dual address processing capabilities for both billing and shipping addresses.

## Purpose

The flow provides account data processing that:

* Sets basic account information (phone, website, type)
* Processes address data with dual field routing (billing vs shipping)

## Salesforce Fields

This flow interacts with the Salesforce Account object and its related fields. Below is a mapping of all fields utilized:

| Field API Name     | Field Type | Purpose in Flow                 |
| ------------------ | ---------- | ------------------------------- |
| Name               | Text       | Account name identifier         |
| Phone              | Phone      | Primary phone number            |
| Website            | URL        | Account's primary website URL   |
| Type               | Picklist   | Categorizes the type of account |
| BillingStreet      | Textarea   | Street address for billing      |
| BillingCity        | Text       | City for billing address        |
| BillingState       | Text       | State/Province for billing      |
| BillingCountry     | Text       | Country for billing address     |
| BillingPostalCode  | Text       | Postal/ZIP code for billing     |
| ShippingStreet     | Textarea   | Street address for shipping     |
| ShippingCity       | Text       | City for shipping address       |
| ShippingState      | Text       | State/Province for shipping     |
| ShippingCountry    | Text       | Country for shipping address    |
| ShippingPostalCode | Text       | Postal/ZIP code for shipping    |

## Input Variables

### Core Account Data

| Variable  | Type            | Required | Description                        |
| --------- | --------------- | -------- | ---------------------------------- |
| `Record`  | Account SObject | Yes      | The Account record being processed |
| `Phone`   | String          | No       | Account's phone number             |
| `Website` | String          | No       | Account's website URL              |
| `Type`    | String          | No       | Account type classification        |

### Address Data

| Variable                  | Type   | Description     |
| ------------------------- | ------ | --------------- |
| `MailingAddress_Street`   | String | Street address  |
| `MailingAddress_City`     | String | City            |
| `MailingAddress_State`    | String | State/Province  |
| `MailingAddress_Country`  | String | Country         |
| `MailingAddress_Postcode` | String | Postal/ZIP code |

### Configuration Variables

| Variable                      | Type    | Default | Description                             |
| ----------------------------- | ------- | ------- | --------------------------------------- |
| `Config_AccountIgnorePhone`   | Boolean | false   | Skip phone processing                   |
| `Config_AccountIgnoreWebsite` | Boolean | false   | Skip website processing                 |
| `Config_AccountIgnoreAddress` | Boolean | false   | Skip all address processing             |
| `IgnoreType`                  | Boolean | false   | Skip type processing                    |
| `Use_Billing_Address`         | Boolean | true    | Use billing vs. shipping address fields |

## Output Variables

| Variable | Type            | Description                                |
| -------- | --------------- | ------------------------------------------ |
| `Record` | Account SObject | Updated account record with processed data |

## Flow Logic

### 1. Phone Processing

The flow first processes the phone number:

* **Null Check**: Uses `PhoneLength` formula to validate phone presence
* **Configuration Check**: Skips if `Config_AccountIgnorePhone = true`
* **Field Assignment**: Sets `Record.Phone` when phone exists

### 2. Website Processing

Handles website URL assignment:

* **Null Check**: Uses `WebsiteLength` formula to validate website presence
* **Configuration Check**: Skips if `Config_AccountIgnoreWebsite = true`
* **Field Assignment**: Sets `Record.Website` when website exists

### 3. Type Processing

Manages account type classification:

* **Configuration Check**: Skips if `IgnoreType = true`
* **Null Check**: Only sets type when provided and account type is empty
* **Conditional Logic**: Uses complex condition to check if Record.Type needs updating
* **Field Assignment**: Sets `Record.Type` with provided type value

### 4. Address Field Processing

Comprehensive address handling with dual field support:

#### Address Field Selection

The flow routes address data to either billing or shipping fields based on `Use_Billing_Address`:

* **Billing Address**: BillingStreet, BillingCity, BillingState, BillingCountry, BillingPostalCode
* **Shipping Address**: ShippingStreet, ShippingCity, ShippingState, ShippingCountry, ShippingPostalCode

## Processing Flow

1. **Phone Processing**: Set phone number if present and not ignored
2. **Website Processing**: Set website URL if present and not ignored
3. **Type Processing**: Set account type if present, not ignored, and record type is empty
4. **Address Processing**: Route to billing/shipping fields

## Configuration Options

### Field Processing Controls

* **Phone Control**: `Config_AccountIgnorePhone` disables phone processing
* **Website Control**: `Config_AccountIgnoreWebsite` disables website processing
* **Address Control**: `Config_AccountIgnoreAddress` disables all address processing

## Error Handling

* **Null Value Management**: Graceful handling of empty/null values through length validation

## Dependencies

None
