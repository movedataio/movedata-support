# Settings

The Non-Profit Cloud Extension provides comprehensive configuration options to control how fundraising data integrates with your Salesforce Nonprofit Cloud org. These settings allow you to customise data processing behavior, field mappings, and business logic to match your organisation's requirements.

## Settings Overview

**Extension Name**: Nonprofit Cloud Extensions\
**Namespace**: md\_npc\_pack\
**Description**: Configure the settings for the MoveData Nonprofit Cloud Extension. Supports fundraising and donation activity in Salesforce Nonprofit Cloud.

## Configuration Tabs

### Tab 1: General Settings

#### 1. Anonymous Person Account

**Purpose**: Configure handling of donations where donor information is not provided by the fundraising platform.

**Settings**:

* **Anonymous Person Account Record ID** (`Config_AnonymousContactId`)
  * **Type**: String
  * **Default**: null
  * **Description**: An anonymous person account is used where the source platform does not provide information on the fundraiser or donor. Specify an anonymous person account to be used across your MoveData integrations.
  * **Help**: Enter the Salesforce Record ID for the Anonymous Person Account.

#### 2. Accounts

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
* **Overwrite all Address Fields when Updating** (`Config_AccountAddressOverwriteAll`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Replace all address fields | Only update fields in notification
  * **Help**: When set to true, the street, city, state, postcode and country will be set; if values are missing for these fields, they are set to empty.
* **Ignore Address Fields when not Empty** (`Config_AccountIgnoreAddressWhenNotEmpty`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Only set address field when empty | Update address field with changes
  * **Help**: When set to true, the address will only be set when there is no pre-existing address. This is useful when you are confident that your address data is likely to be a higher quality that the address data in the notification.
* **Ignore Account Name** (`Config_AccountIgnoreName`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Don't set Account Name | Set Account Name
  * **Help**: Instructs the extension to not set the Account Name.
* **Ignore Account Email** (`Config_AccountIgnoreEmail`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Don't set Account Email | Set Account Email
  * **Help**: Instructs the extension to not set the Account's Email Address.
* **Ignore Account Phone** (`Config_AccountIgnorePhone`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Don't set Account Phone | Set Account Phone
  * **Help**: Instructs the extension to not set the Account's Phone Number.
* **Ignore Account Record Type** (`Config_AccountIgnoreRecordType`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Don't set Account's Organisation Record Type | Set Account Organisation Record Type
  * **Help**: Instructs the extension to not set the Account's Record Type.
* **Default Organisation Record Type** (`Config_AccountBusinessAccountRT`)
  * **Type**: String
  * **Default**: "Business\_Account"
  * **Help**: Set this value if you want to override the default Record Type value for Accounts. Default to 'Business\_Account'.
* **Default Account / Person Relationship** (`Config_AccountRelationshipDefault`)
  * **Type**: String
  * **Default**: "Business User"
  * **Help**: Set this value if you want to override the default relationship type for account / person relationships. Default to 'Business User'.

#### 3. Person Accounts

**Purpose**: Configure how MoveData processes Person Account records into Salesforce.

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
* **Determine Address Field** (`Config_ContactAddressMailing`)
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
* **Ignore Salutation** (`Config_ContactIgnoreSalutation`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Salutation | Set Salutation
* **Ignore First Name** (`Config_ContactIgnoreFirstName`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip First Name | Set First Name
  * **Help**: Set this to true if you don't want MoveData to set the First Name field. You may want to do this if you wish to implement your own processing such as making the data upper case.
* **Ignore Last Name** (`Config_ContactIgnoreLastName`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Last Name | Set Last Name
  * **Help**: Set this to true if you don't want MoveData to set the Last Name field. You may want to do this if you wish to implement your own processing such as making the data upper case.
* **Ignore Phone** (`Config_ContactIgnorePhone`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Phone | Set Phone
  * **Help**: Set this to true if you don't want MoveData to set the Phone field when processing Contacts. Only set when `phone` is not null.
* **Ignore Email** (`Config_ContactIgnoreEmail`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Email | Set Email
  * **Help**: Set this to true if you don't want MoveData to set the Email field when processing Contacts. Only set when `email` is not null.
* **Ignore Date of Birth** (`Config_ContactIgnoreBirthday`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Date of Birth | Set Date of Birth
  * **Help**: Set this to true if you don't want MoveData to set the Birth Date field when processing Contacts. Only set when `birthday` is not null.
* **Ignore Person Account Record Type** (`Config_ContactIgnoreRecordType`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Don't set Person Account's Record Type | Set Person Account Record Type
  * **Help**: Instructs the extension to not set the Person Account's Record Type.
* **Default Person Account Record Type** (`Config_ContactPersonAccountRT`)
  * **Type**: String
  * **Default**: "PersonAccount"
  * **Help**: Set this value if you want to override the default Record Type value for Person Accounts. Default to 'PersonAccount'.
* **Record Protection** (`Config_ContactProtectLevel`)
  * **Type**: Select
  * **Default**: 1
  * **Options**:
    * Protect First Name / Last Name (1)
    * Protect First Name / Last Name + Email / Address / Phone (2)
    * Protect Record (No Updates) (3)
  * **Help**: If "Protect Name" is checked on the record, the following protections will be applied.

#### 4. Contact & Account Formatting

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
  * **Help**: Manage the casing for Contacts. "Name Case" uses some intelligence when setting the name (ie. mcdonald = McDonald).
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

### Tab 2: Marketing Settings

#### 1. Campaigns

**Purpose**: Configure how MoveData processes Campaign records into Salesforce.

**Settings**:

* **Ignore Campaign Name** (`Config_CampaignIgnoreName`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Generated Campaign Name | Set Generated Campaign Name
  * **Help**: Set this to true if you don't want MoveData to set the Name field for a Campaign. Toggle this when you set this using other rules such as Apex triggers.
* **Suppress Campaign Status generation** (`Config_CampaignIgnoreDefaultStatus`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not generate Status | MoveData to determine Status
* **Ignore Type** (`Config_CampaignIgnoreDefaultType`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Type | Set Type
  * **Help**: Set this to true if you don't want MoveData to set the Type field when processing Campaigns.
* **Default Type Value** (`Config_CampaignDefaultType`)
  * **Type**: String
  * **Default**: "Other"
  * **Help**: Set this value if you want to override the default Type value for Campaigns. Default to 'Other'.
* **Ignore Start Date** (`Config_CampaignIgnoreStartDate`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Campaign Start Date | Set Campaign Start Date
* **Ignore End Date** (`Config_CampaignIgnoreEndDate`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Campaign End Date | Set Campaign End Date
* **Suppress Campaign Code as Campaign Name Prefix** (`Config_CampaignNameIgnoreCampaignCode`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Prefix Name with Parent's Name | Prefix Name with Parent's Campaign Code
* **Suppress UTM Source to Outreach Source Code** (`Config_MarketingSuppressSource`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Suppress Source Code Match | Match Source Codes
  * **Help**: By default, MoveData will attempt to match UTM Source to any campaign associated with the same Outreach Source Code. Set this to true to disable this functionality.

#### 2. Campaign Members

**Purpose**: Configure how MoveData processes Campaign Member records into Salesforce.

**Settings**:

* **Create Campaign Members for all Campaigns** (`Config_CampaignMemberAll`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Create Campaign Members for all Campaigns | Do not create Campaign Members for all Campaigns
  * **Help**: When set to true, MoveData will create campaign member records for all Campaigns in a notification. Overrides all other Campaign Member rules.
* **Create Campaign Members for Top Level Campaign** (`Config_CampaignMemberTopLevelCampaign`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Create Campaign Members for Top Level Campaign | Do not create Campaign Members for Top Level Campaigns
  * **Help**: When set to true, MoveData will create campaign member records for the top level campaign in a notification.
* **Create Campaign Members for Parent Campaign** (`Config_CampaignMemberParentCampaign`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Create Campaign Members for Parent Campaign | Do not create Campaign Members for Parent Campaigns
  * **Help**: When set to true, MoveData will create campaign member records for the parent campaign in a notification.
* **Delete existing Campaign Member statuses** (`Config_CampaignMemberDeleteExistingStatuses`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use only MoveData-provisioned Campaign Member statuses | Co-exist with existing Campaign Member statuses
  * **Help**: Set this to true if you wish to only have MoveData-determined Campaign Member Statuses for fundraising campaigns. If you have statuses for particular reasons, like integrations with marketing tools such as Pardot or Marketing Cloud, you may want to set this to false to retain previously mapped statuses.
* **Label #1: Team Leader** (`Config_CampaignMemberLabelTeamLeader`)
  * **Type**: String
  * **Default**: "Team Leader"
  * **Help**: The value used for a Team Leader when creating Campaign Members.
* **Label #2: Fundraiser** (`Config_CampaignMemberLabelFundraiser`)
  * **Type**: String
  * **Default**: "Fundraiser"
  * **Help**: The value used for a Fundraiser when creating Campaign Members.
* **Label #3: Recurring Donor** (`Config_CampaignMemberLabelRecurringDonor`)
  * **Type**: String
  * **Default**: "Recurring Donor"
  * **Help**: The value used for a Recurring Donor when creating Campaign Members.
* **Label #4: Donor** (`Config_CampaignMemberLabelDonor`)
  * **Type**: String
  * **Default**: "Donor"
  * **Help**: The value used for a Donor when creating Campaign Members.
* **Label #5: Prospect** (`Config_CampaignMemberLabelProspect`)
  * **Type**: String
  * **Default**: "Prospect"
  * **Help**: The value used for a Prospect when creating Campaign Members.

### Tab 3: Fundraising Settings

#### 1. Recurring Donations (Gift Commitment)

**Purpose**: Configure how MoveData processes Gift Commitment records into Salesforce.

**Settings**:

* **Recurring Donation Name Pattern (Account Donor)** (`Config_RecurringNameAccount`)
  * **Type**: ASCII
  * **Default**: `{!Account.Name} - {!Amount} - {!EffectiveStartDate}`
* **Recurring Donation Name Pattern (Contact Donor)** (`Config_RecurringNameContact`)
  * **Type**: ASCII
  * **Default**: `{!Contact.Name} - {!Amount} - {!EffectiveStartDate}`
* **Ignore Start Date** (`Config_RecurringSuppressStartDate`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Start Date | Set Start Date
* **Ignore Start Date when not Empty** (`Config_RecurringIgnoreStartDateNotEmpty`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Only set Start Date when empty | Always write Start Date
  * **Help**: Sometimes there are reasons that you want the existing start date retained. Often when recurring donations are migrated to a new platform, a new start date is set. In these cases, it is often desirable to retain the original start date.
* **Ignore Name** (`Config_RecurringSuppressName`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Skip Generated Name | Generate Recurring Name
  * **Help**: Set this to true if you don't want MoveData to set the Name field for a Recurring Donation. Toggle this when you set this using other rules such as Apex or Flow triggers to set the name.
* **Ignore Campaign** (`Config_RecurringSuppressCampaign`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Campaign | Set Campaign
* **Days Offset for matching to Gift Transactions** (`Config_RecurringOffsetDays`)
  * **Type**: Number
  * **Default**: 5
  * **Range**: 1-30
  * **Help**: Used to determine how many days to offset when matching to existing transactions owned by a gift commitment.

#### 2. Donations (Gift Transaction)

**Purpose**: Configure how MoveData processes Gift Transaction records into Salesforce.

**Settings**:

* **Donation Name Pattern (Account Donor)** (`Config_DonationNameAccount`)
  * **Type**: ASCII
  * **Default**: `{!Account.Name} - {!OriginalAmount} - {!TransactionDate}`
* **Donation Name Pattern (Contact Donor)** (`Config_DonationNameContact`)
  * **Type**: ASCII
  * **Default**: `{!Contact.Name} - {!OriginalAmount} - {!TransactionDate}`
* **Retain Donation Name** (`Config_DonationNameRetain`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Retain Existing Name | Always Set Name
  * **Help**: When set to true, MoveData will retain any existing donation name.
* **Ignore Offline Donations** (`Config_DonationProcessOffline`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Create Offline Donations | Skip Offline Donations
  * **Help**: When set to true, MoveData will create any records in Salesforce for Offline Donations. An offline donation is often is used by fundraising platforms to support recording transactions completed off-system, ensuring the overall total listed reflects a complete campaign.
* **Ignore Failed Donations** (`Config_DonationProcessFailed`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Create Failed Donations | Do not process Failed Donations
  * **Help**: When set to true, MoveData will create any records in Salesforce for Failed Donations.
* **Subtract Platform Fee from Amount** (`Config_DonationAmountSubtractFeePlatform`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Subtract Platform Fee from Amount | Use Amount as provided
  * **Help**: If set to true, the Public Platform Fee will be subtracted from the Amount. If this is unavailable, the Total Platform Fee will be substituted.
* **Ignore Campaign** (`Config_DonationSuppressCampaign`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Campaign | Set Campaign
* **Inherit Campaign from Gift Schedule** (`Config_DonationInheritCampaignRecurring`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Use Campaign from Gift Schedule (if available) | Use Campaign from Notification
  * **Help**: If set to true, the campaign will be used from the gift schedule instead of what is contained in the notification. This enables a recurring donation to always allocate to a specific campaign, regardless of the notification's direction.
* **Ignore Donor** (`Config_DonationSuppressDonor`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Donor | Set Donor
* **Ignore Type** (`Config_DonationSuppressType`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Type | Set Type
* **Ignore Description** (`Config_DonationSuppressDescription`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Description | Set Description
* **Ignore Transaction Date** (`Config_DonationSuppressStartDate`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Transaction Date | Set Transaction Date
* **Ignore Donor Fee** (`Config_DonationSuppressDonorFee`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Donor Fee | Set Donor Fee
* **Ignore Gateway Fee** (`Config_DonationSuppressGatewayFee`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Gateway Fee | Set Gateway Fee
* **Ignore Gateway Reference** (`Config_DonationSuppressGatewayTxn`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Gateway Reference | Set Gateway Reference
* **Ignore Payment Identifier** (`Config_DonationSuppressPaymentId`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Payment Identifier | Set Payment Identifier
* **Ignore Payment Method** (`Config_DonationSuppressPayMeth`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Do not set Payment Method | Set Payment Method

### Tab 4: Commerce Settings

#### 1. Orders

**Purpose**: Configure how MoveData processes Opportunity records into Salesforce.

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
  * **Help**: When set to false, MoveData will not create any entries in Salesforce for Offline Orders. An offline order is often is used to support recording transactions completed off-system.
* **Exclude Platform Fee from Opportunity Products** (`Config_OrderExcludeFeePlatform`)
  * **Type**: Boolean
  * **Default**: false
  * **Options**: Exclude Platform Fee | Include Platform Fee

