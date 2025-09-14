# Settings

The Commerce Extension provides comprehensive configuration options to control how commerce and event data integrates with your Salesforce org. These settings allow you to customize data processing behavior, field mappings, and business logic for event registrations, product sales, and order management.

## Settings Overview

**Extension Name**: Commerce Extensions\
**Namespace**: md\_comm\_pack\
**Tab**: Commerce\
**Header**: Settings: Commerce\
**Description**: Configure the settings for the MoveData Commerce Extension. Supports event registrations, product sales, ticketing, and commerce activity in Salesforce.

## Configuration Sections

### 1. General Settings

**Purpose**: Suite of general configuration options for Commerce processing.

**Settings**:

* **Map Commerce variables to Donation Schema** (`Config_CommerceIncludeDonationVars`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Map to Donation Schema | Do not map to Donation Schema
  * **Description**: Some variables such as "CreatedAt" on an Order are analogous to "StartDate" on a Donation. By ensuring the Order processor also supports common Donation variables, you can develop single flow extensions that target Donations and Orders.

### 2. Anonymous Contact

**Purpose**: Configure handling of orders where customer information is not provided by the source platform.

**Settings**:

* **Anonymous Contact** (`Config_AnonymousContactId`)
  * **Type**: Contact Lookup
  * **Default**: null
  * **Description**: An anonymous contact is used where the source platform does not provide information on the customer. Specify an anonymous contact to be used across your MoveData integrations (create and then link here if you don't already have one).

### 3. Accounts

**Purpose**: Configure how MoveData processes Organization Account records into Salesforce.

**Settings**:

* **Disable Platform Key Match** (`Config_AccountDisablePlatformKey`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Platform Key | Match on Platform Key
  * **Description**: Controls whether MoveData uses platform-specific identifiers to match existing accounts.
* **Disable Salesforce Duplicate Match** (`Config_AccountDisableDupMatch`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Duplicate Match | Perform Duplicate Match
  * **Description**: Controls whether MoveData uses Salesforce duplicate rules when creating/updating accounts.
* **Skip Type** (`Config_AccountIgnoreType`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Type | Set Type
  * **Help**: Set this to true if you don't want MoveData to set the Type field when processing Accounts.
* **Default Type Value** (`Config_AccountDefaultType`)
  * **Type**: String
  * **Default**: "Other"
  * **Help**: Set this value if you want to override the default Type value for Accounts. Default to 'Other'.

### 4. Contacts

**Purpose**: Configure how MoveData processes Contact records into Salesforce.

**Settings**:

* **Disable Platform Key Match** (`Config_ContactDisablePlatformKey`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Platform Key | Match on Platform Key
* **Disable Salesforce Duplicate Match** (`Config_ContactDisableDupMatch`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Duplicate Match | Perform Duplicate Match
* **Ignore Address** (`Config_ContactIgnoreAddress`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Address | Set Address
  * **Help**: Set this to true if you don't want MoveData to set the Address field when processing Contacts.
* **Determine Address Field** (`Config_ContactUseMailingAddress`)
  * **Type**: Boolean
  * **Default**: true
  * **Options**: Mailing Address | Shipping Address
* **Overwrite all Address Fields when Updating** (`Config_ContactAddressOverwriteAll`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Replace all address fields | Only update fields in notification
  * **Help**: When set to true, the street, city, state, postcode and country will be set; if values are missing for these fields, they are set to empty.
* **Ignore Address Fields when not Empty** (`Config_ContactIgnoreAddressWhenNotEmpty`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Only set address field when empty | Update address field with changes
  * **Help**: When set to true, the address will only be set when there is no pre-existing address. This is useful when you are confident that your address data is likely to be a higher quality that the address data in the notification.
* **Ignore Email** (`Config_ContactIgnoreEmail`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Email | Set Email
  * **Help**: Set this to true if you don't want MoveData to set the Email field when processing Contacts. Only set when `email` is not null.
* **Ignore Phone** (`Config_ContactIgnorePhone`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Phone | Set Phone
  * **Help**: Set this to true if you don't want MoveData to set the Phone field when processing Contacts. Only set when `phone` is not null.
* **Skip DoNotContact** (`Config_ContactIgnoreDoNotContact`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip DoNotContact | Set DoNotContact
  * **Help**: Set this to true if you don't want MoveData to set the DoNotContact field when processing Contacts. Only set when `newsletter` = false.
* **Record Protection** (`Config_ContactProtectLevel`)
  * **Type**: Select
  * **Default**: 1
  * **Options**:
    * Protect First Name / Last Name (1)
    * Protect First Name / Last Name + Email / Address / Phone (2)
    * Protect Record (No Updates) (3)
  * **Help**: If "Protect Name" is checked on the record, the following protections will be applied.

### 5. Contact & Account Formatting

**Purpose**: Configure the formatting for Contacts and Accounts.

**Account Settings**:

* **Account Name Casing** (`Config_AccountNameCase`)
  * **Type**: Select
  * **Default**: 0 (None)
  * **Options**: None (0) | Name Case (1) | Proper Case (2) | Upper Case (3)

**Contact Settings**:

* **First Name Casing** (`Config_ContactNameFirstCase`)
  * **Type**: Select
  * **Default**: 0 (None)
  * **Options**: None (0) | Name Case (1) | Proper Case (2) | Upper Case (3)
* **Last Name Casing** (`Config_ContactNameLastCase`)
  * **Type**: Select
  * **Default**: 0 (None)
  * **Options**: None (0) | Name Case (1) | Proper Case (2) | Upper Case (3)

**Address Settings**:

* **Address Street Name Casing** (`Config_ContactAddressStreetCase`)
  * **Type**: Select
  * **Default**: 0 (None)
  * **Options**: None (0) | Name Case (1) | Proper Case (2) | Upper Case (3)
* **Address City Casing** (`Config_ContactAddressCityCase`)
  * **Type**: Select
  * **Default**: 0 (None)
  * **Options**: None (0) | Name Case (1) | Proper Case (2) | Upper Case (3)
* **Address State Casing** (`Config_ContactAddressStateCase`)
  * **Type**: Select
  * **Default**: 0 (None)
  * **Options**: None (0) | Name Case (1) | Proper Case (2) | Upper Case (3)
* **Address Country Casing** (`Config_ContactAddressCountryCase`)
  * **Type**: Select
  * **Default**: 0 (None)
  * **Options**: None (0) | Name Case (1) | Proper Case (2) | Upper Case (3)

**Advanced Options**:

* **Apply case formatting when mixed case is provided by source platform** (`Config_AdvancedIgnoreMixedCase`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not apply case changes when mixed case is provided by the source platform | Always apply case changes
  * **Help**: Only applies to Name Case and Proper Case changes. If Upper Case is selected this toggle will be ignored.

### 6. Campaigns

**Purpose**: Configure how MoveData processes Campaign records into Salesforce.

**Settings**:

* **Ignore Campaign Name** (`Config_IgnoreCampaignName`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Generated Campaign Name | Set Generated Campaign Name
  * **Help**: Set this to true if you don't want MoveData to set the Name field for a Campaign. Toggle this when you set this using other rules such as Apex triggers.
* **Suppress Campaign Status generation** (`Config_IgnoreDefaultCampaignStatus`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not generate Status | MoveData to determine Status
* **Ignore Type** (`Config_IgnoreDefaultCampaignType`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Type | Set Type
  * **Help**: Set this to true if you don't want MoveData to set the Type field when processing Campaigns.
* **Default Type Value** (`Config_CampaignDefaultType`)
  * **Type**: String
  * **Default**: "Other"
  * **Help**: Set this value if you want to override the default Type value for Campaigns. Default to 'Other'.

### 7. Orders

**Purpose**: Configure how MoveData processes Opportunity records into Salesforce for commerce transactions.

**Settings**:

* **Order Name Pattern (Account)** (`Config_OrderNameAccount`)
  * **Type**: ASCII
  * **Default**: `{!Account.Name} {!CloseDate} {!Amount} {!RecordType.Name}`
  * **Help**: If NPSP Opportunity Names are configured, then this pattern could be overwritten.
* **Order Name Pattern (Contact)** (`Config_OrderNameContact`)
  * **Type**: ASCII
  * **Default**: `{!Contact.Name} {!CloseDate} {!Amount} {!RecordType.Name}`
  * **Help**: If NPSP Opportunity Names are configured, then this pattern could be overwritten.
* **Process Offline Orders** (`Config_OrderProcessOffline`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Create Offline Orders | Do not process Offline Orders
  * **Help**: When set to false, MoveData will not create any entries in Salesforce for Offline Orders. An offline order is often used to support recording transactions completed off-system.
* **Exclude Platform Fee from Opportunity Products** (`Config_OrderExcludeFeePlatform`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Exclude Platform Fee | Include Platform Fee
  * **Description**: Controls whether platform fees are included as line items in Opportunity Products.
* **Subtract Platform Fee from Total (Name Only)** (`Config_OrderTotalSubtractFeePlatform`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Subtract Platform Fee from Total | Use Total as provided
  * **Help**: Only applies to the record's Name; does not impact totals.

## Data Model Compatibility

The Commerce Extension works with both:

* **Standard Salesforce**: Uses standard Salesforce objects (Account, Contact, Opportunity, Campaign)
* **Nonprofit Success Pack (NPSP)**: Leverages NPSP-specific functionality where available

Not Compatible with:

* **Nonprofit Cloud**: Do not install if using the Nonprofit Cloud as this functionality is built into the NPC extensions.

