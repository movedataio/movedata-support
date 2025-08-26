# Fields and Objects

This article documents the custom fields added by the MoveData NPSP Fundraising & Donations Extension, along with all standard and custom fields referenced in the system flows.

## Account Object

### Standard Fields

#### Name

* **Type:** Text field
* **Purpose:** Account name identifier
* **Source Flows:** [Account Mapping Flow](../flows-account/account-mapping-flow.md), Donation Mapping Flow

#### Phone

* **Type:** Phone field
* **Purpose:** Primary phone number for the account
* **Source Flows:** Account Details Helper Flow

#### Website

* **Type:** URL field
* **Purpose:** Account's primary website URL
* **Source Flows:** Account Details Helper Flow

#### Type

* **Type:** Picklist field
* **Purpose:** Categorizes the type of account
* **Source Flows:** Account Details Helper Flow

#### Id

* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** Donation Mapping Flow

### Billing Address Fields

#### BillingStreet

* **Type:** Textarea field
* **Purpose:** Street address for billing
* **Source Flows:** Account Details Helper Flow

#### BillingCity

* **Type:** Text field
* **Purpose:** City for billing address
* **Source Flows:** Account Details Helper Flow

#### BillingState

* **Type:** Text field
* **Purpose:** State/Province for billing address
* **Source Flows:** Account Details Helper Flow

#### BillingCountry

* **Type:** Text field
* **Purpose:** Country for billing address
* **Source Flows:** Account Details Helper Flow

#### BillingPostalCode

* **Type:** Text field
* **Purpose:** Postal/ZIP code for billing address
* **Source Flows:** Account Details Helper Flow

### Shipping Address Fields

#### ShippingStreet

* **Type:** Textarea field
* **Purpose:** Street address for shipping
* **Source Flows:** Account Details Helper Flow

#### ShippingCity

* **Type:** Text field
* **Purpose:** City for shipping address
* **Source Flows:** Account Details Helper Flow

#### ShippingState

* **Type:** Text field
* **Purpose:** State/Province for shipping address
* **Source Flows:** Account Details Helper Flow

#### ShippingCountry

* **Type:** Text field
* **Purpose:** Country for shipping address
* **Source Flows:** Account Details Helper Flow

#### ShippingPostalCode

* **Type:** Text field
* **Purpose:** Postal/ZIP code for shipping address
* **Source Flows:** Account Details Helper Flow

### Custom Fields

#### Protect Name (`movedata__Protect_Name__c`)

* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to the account name when set to true
* **Source Flows:** Account Mapping Flow

## Contact Object

### Standard Fields

#### Id

* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** Donation Mapping Flow, Donation Post-Upsert Flow

#### FirstName

* **Type:** Text field (40 characters max)
* **Purpose:** Contact's first name
* **Source Flows:** Contact Details Helper Flow, Donation Mapping Flow

#### LastName

* **Type:** Text field (80 characters max)
* **Purpose:** Contact's last name (required field)
* **Source Flows:** Contact Details Helper Flow, Donation Mapping Flow

#### Name

* **Type:** Formula field
* **Purpose:** Full name combining FirstName and LastName
* **Source Flows:** Donation Mapping Flow

#### Salutation

* **Type:** Picklist field
* **Purpose:** Contact's title/salutation (Mr., Ms., Dr., etc.)
* **Source Flows:** Contact Details Helper Flow

#### Birthdate

* **Type:** Date field
* **Purpose:** Contact's birth date
* **Source Flows:** Contact Details Helper Flow

#### Email

* **Type:** Email field (80 characters max)
* **Purpose:** Primary email address
* **Source Flows:** Contact Details Helper Flow

#### Phone

* **Type:** Phone field (40 characters max)
* **Purpose:** Primary phone number
* **Source Flows:** Contact Details Helper Flow

#### HomePhone

* **Type:** Phone field (40 characters max)
* **Purpose:** Home phone number
* **Source Flows:** Contact Details Helper Flow

#### MobilePhone

* **Type:** Phone field (40 characters max)
* **Purpose:** Mobile phone number
* **Source Flows:** Contact Details Helper Flow

#### AccountId

* **Type:** Lookup to Account
* **Purpose:** Links contact to associated account
* **Source Flows:** Get Account ID Helper Flow, Contact Post-Upsert Flow, Donation Mapping Flow

### Mailing Address Fields

#### MailingStreet

* **Type:** Textarea field (255 characters max)
* **Purpose:** Street address for mailing
* **Source Flows:** Contact Details Helper Flow

#### MailingCity

* **Type:** Text field (40 characters max)
* **Purpose:** City for mailing address
* **Source Flows:** Contact Details Helper Flow

#### MailingState

* **Type:** Text field (80 characters max)
* **Purpose:** State/Province for mailing address
* **Source Flows:** Contact Details Helper Flow

#### MailingCountry

* **Type:** Text field (80 characters max)
* **Purpose:** Country for mailing address
* **Source Flows:** Contact Details Helper Flow

#### MailingPostalCode

* **Type:** Text field (20 characters max)
* **Purpose:** Postal/ZIP code for mailing address
* **Source Flows:** Contact Details Helper Flow

### Other Address Fields

#### OtherStreet

* **Type:** Textarea field (255 characters max)
* **Purpose:** Alternative street address
* **Source Flows:** Contact Details Helper Flow

#### OtherCity

* **Type:** Text field (40 characters max)
* **Purpose:** Alternative city address
* **Source Flows:** Contact Details Helper Flow

#### OtherState

* **Type:** Text field (80 characters max)
* **Purpose:** Alternative state/province address
* **Source Flows:** Contact Details Helper Flow

#### OtherCountry

* **Type:** Text field (80 characters max)
* **Purpose:** Alternative country address
* **Source Flows:** Contact Details Helper Flow

#### OtherPostalCode

* **Type:** Text field (20 characters max)
* **Purpose:** Alternative postal/ZIP code
* **Source Flows:** Contact Details Helper Flow

### NPSP Custom Fields

#### Do Not Contact (`npsp__Do_Not_Contact__c`)

* **Type:** Checkbox field
* **Purpose:** Flags contacts who should not be contacted
* **Source Flows:** Contact Mapping Flow

#### Home Email (`npe01__HomeEmail__c`)

* **Type:** Email field (80 characters max)
* **Purpose:** Home email address (NPSP field)
* **Source Flows:** Contact Details Helper Flow

#### Work Email (`npe01__WorkEmail__c`)

* **Type:** Email field (80 characters max)
* **Purpose:** Work email address (NPSP field)
* **Source Flows:** Contact Details Helper Flow

### Custom Fields

#### Protect Name (`movedata__Protect_Name__c`)

* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to contact names when set to true
* **Source Flows:** Contact Mapping Flow

## Platform Key Objects

### Account Platform Key (`movedata__Account_Platform_Key__c`)

* **Type:** Custom Object
* **Purpose:** Links Account records to external platform identifiers
* **Source Flows:** Account Platform Key Helper Flow

#### Platform Key (`movedata__Platform_Key__c`)

* **Type:** Text field
* **Purpose:** Stores external platform identifier
* **Source Flows:** Account Platform Key Flow

### Contact Platform Key (`movedata__Contact_Platform_Key__c`)

* **Type:** Custom Object
* **Purpose:** Links Contact records to external platform identifiers
* **Source Flows:** Contact Platform Key Helper Flow

#### Platform Key (`movedata__Platform_Key__c`)

* **Type:** Text field
* **Purpose:** Stores external platform identifier
* **Source Flows:** Contact Platform Key Flow

## Campaign Object

### Standard Fields

#### Id

* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** Donation Mapping Flow, Donation Post-Upsert Flow

#### Name

* **Type:** Text field (80 characters max)
* **Purpose:** Campaign name identifier
* **Source Flows:** Campaign Mapping Flow, Campaign Name Flow, Donation Mapping Flow

#### IsActive

* **Type:** Checkbox field
* **Purpose:** Indicates if the campaign is currently active
* **Source Flows:** Campaign Mapping Flow

#### Status

* **Type:** Picklist field
* **Purpose:** Current status of the campaign
* **Source Flows:** Campaign Mapping Flow

#### Type

* **Type:** Picklist field
* **Purpose:** Categorizes the type of campaign
* **Source Flows:** Campaign Mapping Flow

#### ParentId

* **Type:** Lookup to Campaign
* **Purpose:** Links to parent campaign for hierarchical campaign structures
* **Source Flows:** Campaign Mapping Flow

#### ExpectedRevenue

* **Type:** Currency field
* **Purpose:** Target fundraising amount for the campaign
* **Source Flows:** Campaign Mapping Flow

#### StartDate

* **Type:** Date field
* **Purpose:** Campaign start date
* **Source Flows:** Campaign Mapping Flow

#### EndDate

* **Type:** Date field
* **Purpose:** Campaign end date
* **Source Flows:** Campaign Mapping Flow

#### Description

* **Type:** Long Text Area field
* **Purpose:** Detailed campaign description
* **Source Flows:** Campaign Mapping Flow

### Custom Fields

#### Platform (`movedata__Platform__c`)

* **Type:** Text field
* **Purpose:** Identifies the external platform or system source
* **Source Flows:** Campaign Mapping Flow

#### Platform Key (`movedata__Platform_Key__c`)

* **Type:** Text field
* **Purpose:** Stores unique external platform identifier
* **Source Flows:** Campaign Record Match Flow, Campaign Mapping Flow

#### Protect Name (`movedata__Protect_Name__c`)

* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to the campaign name when set to true
* **Source Flows:** Campaign Mapping Flow, Campaign Name Flow

#### Protect Campaign Parent (`movedata__Protect_Campaign_Parent__c`)

* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to the parent campaign relationship when set to true
* **Source Flows:** Campaign Mapping Flow

#### Campaign Code (`movedata__Campaign_Code__c`)

* **Type:** Text field
* **Purpose:** Short code identifier for campaign naming conventions
* **Source Flows:** Campaign Name Flow

### md\_npsp\_pack Fields

#### Campaign URL (`md_npsp_pack__Campaign_URL__c`)

* **Type:** URL field
* **Purpose:** Stores the web address for online campaign pages
* **Source Flows:** Not referenced in provided flows

#### Fundraising Account (`md_npsp_pack__Fundraising_Account__c`)

* **Type:** Lookup relationship to Account object
* **Purpose:** Associates campaigns with organizational fundraisers
* **Source Flows:** Not referenced in provided flows

#### Fundraising Contact (`md_npsp_pack__Fundraising_Contact__c`)

* **Type:** Lookup relationship to Contact object
* **Purpose:** Identifies individual fundraising champions or coordinators
* **Source Flows:** Not referenced in provided flows

## Recurring Donation Object (NPSP)

The NPSP Recurring Donation object (`npe03__Recurring_Donation__c`) includes comprehensive field support for managing recurring donations with platform integration:

### Standard Fields

#### Id

* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** Donation Record Match Flow, Donation Mapping Flow

#### CurrencyIsoCode

* **Type:** Picklist field (if multi-currency enabled)
* **Purpose:** Currency code for the recurring donation
* **Source Flows:** Recurring Mapping Flow

### NPSP Legacy Fields

#### Amount (`npe03__Amount__c`)

* **Type:** Currency field
* **Purpose:** Recurring donation amount per installment
* **Source Flows:** Recurring Mapping Flow

#### Contact (`npe03__Contact__c`)

* **Type:** Lookup to Contact
* **Purpose:** Primary contact for individual recurring donors
* **Source Flows:** Recurring Mapping Flow, Donation Mapping Flow

#### Organization (`npe03__Organization__c`)

* **Type:** Lookup to Account
* **Purpose:** Organization for institutional recurring donors
* **Source Flows:** Recurring Mapping Flow

#### Date Established (`npe03__Date_Established__c`)

* **Type:** Date field
* **Purpose:** Date the recurring donation was established
* **Source Flows:** Recurring Mapping Flow

#### Installment Period (`npe03__Installment_Period__c`)

* **Type:** Picklist field
* **Purpose:** Frequency of recurring payments
* **Source Flows:** Recurring Mapping Flow

#### Next Payment Date (`npe03__Next_Payment_Date__c`)

* **Type:** Date field
* **Purpose:** Date of the next expected payment
* **Source Flows:** Recurring Mapping Flow

#### Open Ended Status (`npe03__Open_Ended_Status__c`)

* **Type:** Picklist field
* **Purpose:** Whether the recurring donation has an end date
* **Source Flows:** Recurring Mapping Flow

#### Recurring Donation Campaign (`npe03__Recurring_Donation_Campaign__c`)

* **Type:** Lookup to Campaign
* **Purpose:** Associated campaign for the recurring donation
* **Source Flows:** Recurring Mapping Flow

### NPSP Enhanced Fields

#### Status (`npsp__Status__c`)

* **Type:** Picklist field
* **Purpose:** Current status of the recurring donation
* **Source Flows:** Recurring Mapping Flow

#### Start Date (`npsp__StartDate__c`)

* **Type:** Date field
* **Purpose:** Enhanced Recurring Donations start date
* **Source Flows:** Recurring Mapping Flow

#### Installment Frequency (`npsp__InstallmentFrequency__c`)

* **Type:** Number field
* **Purpose:** Frequency multiplier for Enhanced Recurring Donations
* **Source Flows:** Recurring Mapping Flow

#### Day of Month (`npsp__Day_of_Month__c`)

* **Type:** Text field
* **Purpose:** Preferred day of month for recurring payments
* **Source Flows:** Recurring Mapping Flow

### Custom Fields

#### Platform Key (`Platform_Key__c`)

* **Type:** Text field (100 characters)
* **Purpose:** Stores unique identifiers from external donation platforms
* **Source Flows:** Recurring Record Match Flow, Recurring Mapping Flow, Donation Record Match Flow, Donation Mapping Flow

## NPSP Settings Object

### Recurring Donations Settings (`npe03__Recurring_Donations_Settings__c`)

#### Enhanced Recurring Donations Enabled (`npsp__IsRecurringDonations2Enabled__c`)

* **Type:** Checkbox field
* **Purpose:** Indicates if Enhanced Recurring Donations (RD2) is enabled
* **Source Flows:** Recurring Mapping Flow

## Opportunity Object

The standard Opportunity object has been significantly enhanced with comprehensive field support for donations, matching gifts, and financial tracking:

### Standard Fields

#### Id

* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** Donation Record Match Flow, Donation Mapping Flow, Donation Post-Upsert Flow

#### Name

* **Type:** Text field (120 characters max)
* **Purpose:** Opportunity name/title
* **Source Flows:** Donation Mapping Flow, Donation Post-Upsert Flow

#### Amount

* **Type:** Currency field
* **Purpose:** Donation amount
* **Source Flows:** Donation Record Match Flow, Donation Mapping Flow

#### StageName

* **Type:** Picklist field
* **Purpose:** Current stage of the donation opportunity
* **Source Flows:** Donation Record Match Flow, Donation Mapping Flow

#### Probability

* **Type:** Percent field
* **Purpose:** Probability of closing the opportunity
* **Source Flows:** Donation Mapping Flow

#### CloseDate

* **Type:** Date field
* **Purpose:** Date the donation was completed
* **Source Flows:** Donation Record Match Flow, Donation Mapping Flow

#### Description

* **Type:** Long Text Area field
* **Purpose:** Detailed description of the donation
* **Source Flows:** Donation Mapping Flow

#### AccountId

* **Type:** Lookup to Account
* **Purpose:** Account associated with the donation
* **Source Flows:** Donation Mapping Flow

#### RecordTypeId

* **Type:** Lookup to RecordType
* **Purpose:** Record type for the opportunity
* **Source Flows:** Donation Mapping Flow

#### CampaignId

* **Type:** Lookup to Campaign
* **Purpose:** Campaign associated with the donation
* **Source Flows:** Donation Mapping Flow

#### IsPrivate

* **Type:** Checkbox field
* **Purpose:** Marks donation as private/anonymous
* **Source Flows:** Donation Mapping Flow

### NPSP Opportunity Fields

#### Primary Contact (`npsp__Primary_Contact__c`)

* **Type:** Lookup to Contact
* **Purpose:** Primary contact associated with the donation
* **Source Flows:** Donation Mapping Flow

#### Matching Gift (`npsp__Matching_Gift__c`)

* **Type:** Lookup to Opportunity
* **Purpose:** Links to the original donation being matched
* **Source Flows:** Donation Mapping Flow, Donation Post-Upsert Flow

#### Matching Gift Account (`npsp__Matching_Gift_Account__c`)

* **Type:** Lookup to Account
* **Purpose:** Account providing the matching gift
* **Source Flows:** Donation Mapping Flow, Donation Post-Upsert Flow

#### Matching Gift Employer (`npsp__Matching_Gift_Employer__c`)

* **Type:** Text field
* **Purpose:** Name of the matching gift employer
* **Source Flows:** Donation Mapping Flow, Donation Post-Upsert Flow

#### Matching Gift Status (`npsp__Matching_Gift_Status__c`)

* **Type:** Picklist field
* **Purpose:** Status of the matching gift process
* **Source Flows:** Donation Mapping Flow, Donation Post-Upsert Flow

#### Recurring Donation (`npe03__Recurring_Donation__c`)

* **Type:** Lookup to npe03\_\_Recurring\_Donation\_\_c
* **Purpose:** Links individual donations to their recurring donation parent
* **Source Flows:** Donation Record Match Flow, Donation Mapping Flow

### Custom Fields

#### Platform Key (`movedata__Platform_Key__c`)

* **Type:** Text field
* **Purpose:** Stores unique identifiers from external platforms
* **Source Flows:** Donation Record Match Flow, Donation Mapping Flow

### md\_npsp\_pack Fee Fields

#### Fee (`md_npsp_pack__Fee__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Captures aggregate processing fees before tax calculations
* **Source Flows:** Donation Mapping Flow

#### Gateway Fee (`md_npsp_pack__Gateway_Fee__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Tracks payment processor charges (Stripe, PayPal, etc.)
* **Source Flows:** Donation Mapping Flow

#### Platform Fee (`md_npsp_pack__Platform_Fee__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Records charges from fundraising platforms or donation management tools
* **Source Flows:** Donation Mapping Flow

#### Tax (`md_npsp_pack__Tax__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Captures overall tax amounts on donation-related charges
* **Source Flows:** Donation Mapping Flow

#### Gateway Fee Tax (`md_npsp_pack__Gateway_Fee_Tax__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Specific tax calculations on payment gateway charges
* **Source Flows:** Donation Mapping Flow

#### Platform Fee Tax (`md_npsp_pack__Platform_Fee_Tax__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Tax calculations specific to platform service charges
* **Source Flows:** Donation Mapping Flow

#### Receipt Number (`md_npsp_pack__Receipt_Number__c`)

* **Type:** Text field (50 characters)
* **Purpose:** Stores donation receipt identification numbers
* **Source Flows:** Donation Mapping Flow

## NPSP Payment Object (`npe01__OppPayment__c`)

The NPSP Payment object tracks individual payment transactions associated with opportunities, particularly important for refund processing and payment tracking:

### Standard Fields

#### Opportunity (`npe01__Opportunity__c`)

* **Type:** Master-Detail Relationship to Opportunity
* **Purpose:** Links payment records to their associated donation opportunity
* **Source Flows:** Donation Mapping Flow

#### Payment Amount (`npe01__Payment_Amount__c`)

* **Type:** Currency field
* **Purpose:** Amount of the individual payment transaction
* **Source Flows:** Donation Mapping Flow

#### Payment Date (`npe01__Payment_Date__c`)

* **Type:** Date field
* **Purpose:** Date when the payment transaction occurred
* **Source Flows:** Donation Mapping Flow

#### Paid (`npe01__Paid__c`)

* **Type:** Checkbox field
* **Purpose:** Indicates whether the payment has been completed
* **Source Flows:** Donation Mapping Flow
