# Settings

The NPSP Fundraising & Donations Extension provides comprehensive configuration options to control how fundraising data integrates with your Salesforce NPSP org. These settings allow you to customize data processing behavior, field mappings, and business logic to match your organization's requirements.

## Settings Overview

**Tab**: Fundraising & Donations\
**Header**: Settings: Fundraising & Donations\
**Description**: Configure the settings for the MoveData Fundraising & Donations Extension. Supports fundraising and donation activity in Salesforce and used in the following integrations: Facebook, GoFundMe, JustGiving, PayPal Giving Fund, Good2Give, Raisely, Funraisin', Grassrootz, Frontstream, Pixo, Everyday Hero.

## Configuration Sections

### 1. Anonymous Contact

**Purpose**: Configure handling of donations where donor information is not provided by the fundraising platform.

**Settings**:

* **Anonymous Contact** (`Config_AnonymousContactId`)
  * **Type**: Contact Lookup
  * **Default**: null
  * **Description**: An anonymous contact is used where the source platform does not provide information on the fundraiser or donor. Specify an anonymous contact to be used across your MoveData integrations (create and then link here if you don't already have one).

### 2. Accounts

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
* **Use State Code for Address State** (`Config_AccountUseStateCode`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use State Code | Use State Name
  * **Help**: Instructs the extension to use the State Code for the Address State field when available.
* **Use Country Code for Address Country** (`Config_AccountUseCountryCode`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use Country Code | Use Country Name
  * **Help**: Instructs the extension to use the Country Code for the Address Country field when available.
* **Default Type Value** (`Config_AccountDefaultType`)
  * **Type**: String
  * **Default**: "Other"
  * **Help**: Set this value if you want to override the default Type value for Accounts. Default to 'Other'.

### 3. Contacts

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
* **Inherit Account Address** (`Config_ContactAddressInheritAccount`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use Address from Account (if missing on Contact) | Do not use Address from Account
  * **Help**: Set this to true if you want to use the Address from the Parent Account when there is no address provided as part of the Contact notification.
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
* **Ignore Email** (`Config_ContactIgnoreEmail`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Email | Set Email
  * **Help**: Set this to true if you don't want MoveData to set the Email field when processing Contacts. Only set when `email` is not null.
* **Use State Code for Address State** (`Config_ContactUseStateCode`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use State Code | Use State Name
  * **Help**: Instructs the extension to use the State Code for the Address State field when available.
* **Use Country Code for Address Country** (`Config_ContactUseCountryCode`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use Country Code | Use Country Name
  * **Help**: Instructs the extension to use the Country Code for the Address Country field when available.
* **Record Protection** (`Config_ContactProtectLevel`)
  * **Type**: Select
  * **Default**: 1
  * **Options**:
    * Protect First Name / Last Name (1)
    * Protect First Name / Last Name + Email / Address / Phone (2)
    * Protect Record (No Updates) (3)
  * **Help**: If "Protect Name" is checked on the record, the following protections will be applied.

### 4. Contact & Account Formatting

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

### 5. Campaigns

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

### 6. Donations

**Purpose**: Configure how MoveData processes Opportunity records into Salesforce.

**Settings**:

* **Donation Name Pattern (Account Donor)** (`Config_DonationNameAccount`)
  * **Type**: ASCII
  * **Default**: `{!Account.Name} {!Amount} {!RecordType.Name} {!CloseDate}`
  * **Help**: If NPSP Opportunity Names are configured, then this pattern will be overwritten.
* **Donation Name Pattern (Contact Donor)** (`Config_DonationNameContact`)
  * **Type**: ASCII
  * **Default**: `{!Contact.Name} {!Amount} {!RecordType.Name} {!CloseDate}`
  * **Help**: If NPSP Opportunity Names are configured, then this pattern will be overwritten.
* **Ignore Offline Donations** (`Config_IgnoreOfflineDonations`)
  * **Type**: Boolean
  * **Default**: true
  * **Options**: Do not process Offline Donations | Create Offline Donations
  * **Help**: When set to true, MoveData will not create any entries in Salesforce for Offline Donations. An offline donation is often is used by fundraising platforms to support recording transactions completed off-system, ensuring the overall total listed reflects a complete campaign.
* **Ignore Failed Donations** (`Config_IgnoreFailedDonations`)
  * **Type**: Boolean
  * **Default**: true
  * **Options**: Do not process Failed Donations | Create Failed Donations
  * **Help**: When set to true, MoveData will not create any entries in Salesforce for Failed Donations.
* **Do not mark as Private** (`Config_DonationSetAnonymousAsPrivate`)
  * **Type**: Boolean
  * **Default**: true
  * **Options**: Mark as Private | Do not mark as Private
* **Create Soft Credit** (`Config_DonationOpportunityContactRoleSoftCredit`)
  * **Type**: Boolean
  * **Default**: true
  * **Options**: Create Opportunity Contact Role (Soft Credit) | Do not create Soft Credit
* **Subtract Platform Fee from Amount** (`Config_DonationAmountSubtractFeePlatform`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Subtract Platform Fee from Amount | Use Amount as provided
  * **Help**: If set to true, the Public Platform Fee will be subtracted from the Amount. If this is unavailable, the Total Platform Fee will be substituted.

### 7. Recurring Donations

**Purpose**: Configure how MoveData processes Recurring Donation records into Salesforce.

**Settings**:

* **Ignore Date Established when not Empty** (`Config_RecurringIgnoreDateEstNotEmpty`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Only set Date Established field when empty | Update Date Established field with changes
* **Ignore Effective Date when not Empty** (`Config_RecurringIgnoreStartDateNotEmpty`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Only set Effective Date field when empty | Update Effective Date field with changes
* **Disable Day of Month** (`Config_RecurringSuppressDay`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Day of Month | Set Day of Month
* **Disable Next Payment Date** (`Config_RecurringSuppressNextPayment`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Next Payment Date | Set Next Payment Date
* **Days Offset for matching to Opportunities** (`Config_DonationRecurringOffsetDays`)
  * **Type**: Number
  * **Default**: 5
  * **Range**: 1-30
  * **Help**: Used to determine how many days to offset when matching to existing opportunities owned by a recurring donation.

### 8. Campaign Members

**Purpose**: Configure how MoveData processes Campaign Member records into Salesforce.

**Settings**:

* **Create Fundraising-specific Campaign Members** (`Config_CreateCampaignMembers`)
  * **Type**: Boolean
  * **Default**: true
  * **Options**: Generate Campaign Members | Do not create Campaign Members
  * **Help**: Set this to false if you wish to skip MoveData creating fundraising-specific campaign members. You may need to disable this if you are getting issues; these can be caused by other logic and apps that manipulate Campaign Members.
* **Delete existing Campaign Member statuses** (`Config_CampaignMemberDeleteExistingStatuses`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use only MoveData-provisioned Campaign Member statuses | Co-exist with existing Campaign Member statuses
  * **Help**: Set this to true if you wish to only have MoveData-determined Campaign Member Statuses for fundraising campaigns. If you have statuses for particular reasons, like integrations with marketing tools such as Pardot or Marketing Cloud, you may want to set this to false to retain previously mapped statuses.

### 9. Opportunity Contact Roles (Soft Credits)

**Purpose**: Configure how MoveData works with Opportunity Contact Roles, used for Soft Credits. This logic runs in addition to the soft credit records created by the Non-Profit Success Pack.

**Settings**:

* **Create Soft Credits** (`Config_DonationOpportunityContactRoleSoftCredit`)
  * **Type**: Boolean
  * **Default**: true
  * **Options**: Generate Soft Credits | Do not create Soft Credits
  * **Help**: Set this to false if you wish to skip MoveData creating fundraising-specific soft credits.
* **Soft Credit Role for Top-Level Campaign** (`Config_DonationSoftCredit_Role_Campaign`)
  * **Type**: String
  * **Default**: "Soft Credit"
  * **Help**: If a top-level campaign in a MoveData notification has a primary contact, then a soft credit will be created against the opportunity.
* **Soft Credit Role for Team** (`Config_DonationSoftCredit_Role_Team`)
  * **Type**: String
  * **Default**: "Soft Credit"
  * **Help**: If a team campaign in a MoveData notification has a primary contact, then a soft credit will be created against the opportunity.
* **Soft Credit Role for Fundraiser** (`Config_DonationSoftCredit_Role_Fundraiser`)
  * **Type**: String
  * **Default**: "Soft Credit"
  * **Help**: If a fundraiser campaign in a MoveData notification has a primary contact, then a soft credit will be created against the opportunity.
