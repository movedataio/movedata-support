# Account Object

## Standard Fields

### Name
* **Type:** Text field
* **Purpose:** Account name identifier
* **Source Flows:** [Account Mapping Flow](../flows-account/account-mapping-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Phone
* **Type:** Phone field
* **Purpose:** Primary phone number for the account
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### Website
* **Type:** URL field
* **Purpose:** Account's primary website URL
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### Type
* **Type:** Picklist field
* **Purpose:** Categorizes the type of account
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### Id
* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

## Billing Address Fields

### BillingStreet
* **Type:** Textarea field
* **Purpose:** Street address for billing
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### BillingCity
* **Type:** Text field
* **Purpose:** City for billing address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### BillingState
* **Type:** Text field
* **Purpose:** State/Province for billing address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### BillingCountry
* **Type:** Text field
* **Purpose:** Country for billing address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### BillingPostalCode
* **Type:** Text field
* **Purpose:** Postal/ZIP code for billing address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

## Shipping Address Fields

### ShippingStreet
* **Type:** Textarea field
* **Purpose:** Street address for shipping
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### ShippingCity
* **Type:** Text field
* **Purpose:** City for shipping address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### ShippingState
* **Type:** Text field
* **Purpose:** State/Province for shipping address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### ShippingCountry
* **Type:** Text field
* **Purpose:** Country for shipping address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

### ShippingPostalCode
* **Type:** Text field
* **Purpose:** Postal/ZIP code for shipping address
* **Source Flows:** [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)

## Custom Fields

### Protect Name (`movedata__Protect_Name__c`)
* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to the account name when set to true
* **Source Flows:** [Account Mapping Flow](../flows-account/account-mapping-flow.md)

# Contact Object

## Standard Fields

### Id
* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### FirstName
* **Type:** Text field (40 characters max)
* **Purpose:** Contact's first name
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### LastName
* **Type:** Text field (80 characters max)
* **Purpose:** Contact's last name (required field)
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Name
* **Type:** Formula field
* **Purpose:** Full name combining FirstName and LastName
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Salutation
* **Type:** Picklist field
* **Purpose:** Contact's title/salutation (Mr., Ms., Dr., etc.)
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### Birthdate
* **Type:** Date field
* **Purpose:** Contact's birth date
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### Email
* **Type:** Email field (80 characters max)
* **Purpose:** Primary email address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### Phone
* **Type:** Phone field (40 characters max)
* **Purpose:** Primary phone number
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### HomePhone
* **Type:** Phone field (40 characters max)
* **Purpose:** Home phone number
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### MobilePhone
* **Type:** Phone field (40 characters max)
* **Purpose:** Mobile phone number
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### AccountId
* **Type:** Lookup to Account
* **Purpose:** Links contact to associated account
* **Source Flows:** [Get Account ID Helper Flow](../flows-account/get-account-id-helper-flow.md), [Contact Post-Upsert Flow](../flows-contact/contact-post-upsert-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

## Mailing Address Fields

### MailingStreet
* **Type:** Textarea field (255 characters max)
* **Purpose:** Street address for mailing
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### MailingCity
* **Type:** Text field (40 characters max)
* **Purpose:** City for mailing address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### MailingState
* **Type:** Text field (80 characters max)
* **Purpose:** State/Province for mailing address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### MailingCountry
* **Type:** Text field (80 characters max)
* **Purpose:** Country for mailing address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### MailingPostalCode
* **Type:** Text field (20 characters max)
* **Purpose:** Postal/ZIP code for mailing address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

## Other Address Fields

### OtherStreet
* **Type:** Textarea field (255 characters max)
* **Purpose:** Alternative street address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### OtherCity
* **Type:** Text field (40 characters max)
* **Purpose:** Alternative city address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### OtherState
* **Type:** Text field (80 characters max)
* **Purpose:** Alternative state/province address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### OtherCountry
* **Type:** Text field (80 characters max)
* **Purpose:** Alternative country address
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### OtherPostalCode
* **Type:** Text field (20 characters max)
* **Purpose:** Alternative postal/ZIP code
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

## NPSP Custom Fields

### Do Not Contact (`npsp__Do_Not_Contact__c`)
* **Type:** Checkbox field
* **Purpose:** Flags contacts who should not be contacted
* **Source Flows:** [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)

### Home Email (`npe01__HomeEmail__c`)
* **Type:** Email field (80 characters max)
* **Purpose:** Home email address (NPSP field)
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

### Work Email (`npe01__WorkEmail__c`)
* **Type:** Email field (80 characters max)
* **Purpose:** Work email address (NPSP field)
* **Source Flows:** [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)

## Custom Fields

### Protect Name (`movedata__Protect_Name__c`)
* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to contact names when set to true
* **Source Flows:** [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)

# Platform Key Objects

## Account Platform Key (`movedata__Account_Platform_Key__c`)
* **Type:** Custom Object
* **Purpose:** Links Account records to external platform identifiers
* **Source Flows:** [Account Platform Key Helper Flow](../flows-account/account-platform-key-helper-flow.md)

### Platform Key (`movedata__Platform_Key__c`)
* **Type:** Text field
* **Purpose:** Stores external platform identifier
* **Source Flows:** [Account Platform Key Flow](../flows-account/account-platform-key-flow.md)

## Contact Platform Key (`movedata__Contact_Platform_Key__c`)
* **Type:** Custom Object
* **Purpose:** Links Contact records to external platform identifiers
* **Source Flows:** [Contact Platform Key Helper Flow](../flows-contact/contact-platform-key-helper-flow.md)

### Platform Key (`movedata__Platform_Key__c`)
* **Type:** Text field
* **Purpose:** Stores external platform identifier
* **Source Flows:** [Contact Platform Key Flow](../flows-contact/contact-platform-key-flow.md)

# Campaign Object

## Standard Fields

### Id
* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### Name
* **Type:** Text field (80 characters max)
* **Purpose:** Campaign name identifier
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaign/campaign-name-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### IsActive
* **Type:** Checkbox field
* **Purpose:** Indicates if the campaign is currently active
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### Status
* **Type:** Picklist field
* **Purpose:** Current status of the campaign
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### Type
* **Type:** Picklist field
* **Purpose:** Categorizes the type of campaign
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### ParentId
* **Type:** Lookup to Campaign
* **Purpose:** Links to parent campaign for hierarchical campaign structures
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### ExpectedRevenue
* **Type:** Currency field
* **Purpose:** Target fundraising amount for the campaign
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### StartDate
* **Type:** Date field
* **Purpose:** Campaign start date
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### EndDate
* **Type:** Date field
* **Purpose:** Campaign end date
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### Description
* **Type:** Long Text Area field
* **Purpose:** Detailed campaign description
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

## Custom Fields

### Platform (`movedata__Platform__c`)
* **Type:** Text field
* **Purpose:** Identifies the external platform or system source
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### Platform Key (`movedata__Platform_Key__c`)
* **Type:** Text field
* **Purpose:** Stores unique external platform identifier
* **Source Flows:** [Campaign Record Match Flow](../flows-campaign/campaign-record-match-flow.md), [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### Protect Name (`movedata__Protect_Name__c`)
* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to the campaign name when set to true
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaign/campaign-name-flow.md)

### Protect Campaign Parent (`movedata__Protect_Campaign_Parent__c`)
* **Type:** Checkbox field
* **Purpose:** Prevents automatic updates to the parent campaign relationship when set to true
* **Source Flows:** [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)

### Campaign Code (`movedata__Campaign_Code__c`)
* **Type:** Text field
* **Purpose:** Short code identifier for campaign naming conventions
* **Source Flows:** [Campaign Name Flow](../flows-campaign/campaign-name-flow.md)

## md_npsp_pack Fields

### Campaign URL (`md_npsp_pack__Campaign_URL__c`)
* **Type:** URL field
* **Purpose:** Stores the web address for online campaign pages
* **Source Flows:** Not referenced in provided flows

### Fundraising Account (`md_npsp_pack__Fundraising_Account__c`)
* **Type:** Lookup relationship to Account object
* **Purpose:** Associates campaigns with organizational fundraisers
* **Source Flows:** Not referenced in provided flows

### Fundraising Contact (`md_npsp_pack__Fundraising_Contact__c`)
* **Type:** Lookup relationship to Contact object
* **Purpose:** Identifies individual fundraising champions or coordinators
* **Source Flows:** Not referenced in provided flows

# Recurring Donation Object (NPSP)

The NPSP Recurring Donation object (`npe03__Recurring_Donation__c`) includes comprehensive field support for managing recurring donations with platform integration:

## Standard Fields

### Id
* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### CurrencyIsoCode
* **Type:** Picklist field (if multi-currency enabled)
* **Purpose:** Currency code for the recurring donation
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

## NPSP Legacy Fields

### Amount (`npe03__Amount__c`)
* **Type:** Currency field
* **Purpose:** Recurring donation amount per installment
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Contact (`npe03__Contact__c`)
* **Type:** Lookup to Contact
* **Purpose:** Primary contact for individual recurring donors
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Organization (`npe03__Organization__c`)
* **Type:** Lookup to Account
* **Purpose:** Organization for institutional recurring donors
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Date Established (`npe03__Date_Established__c`)
* **Type:** Date field
* **Purpose:** Date the recurring donation was established
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Installment Period (`npe03__Installment_Period__c`)
* **Type:** Picklist field
* **Purpose:** Frequency of recurring payments
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Next Payment Date (`npe03__Next_Payment_Date__c`)
* **Type:** Date field
* **Purpose:** Date of the next expected payment
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Open Ended Status (`npe03__Open_Ended_Status__c`)
* **Type:** Picklist field
* **Purpose:** Whether the recurring donation has an end date
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Recurring Donation Campaign (`npe03__Recurring_Donation_Campaign__c`)
* **Type:** Lookup to Campaign
* **Purpose:** Associated campaign for the recurring donation
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

## NPSP Enhanced Fields

### Status (`npsp__Status__c`)
* **Type:** Picklist field
* **Purpose:** Current status of the recurring donation
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Start Date (`npsp__StartDate__c`)
* **Type:** Date field
* **Purpose:** Enhanced Recurring Donations start date
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Installment Frequency (`npsp__InstallmentFrequency__c`)
* **Type:** Number field
* **Purpose:** Frequency multiplier for Enhanced Recurring Donations
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

### Day of Month (`npsp__Day_of_Month__c`)
* **Type:** Text field
* **Purpose:** Preferred day of month for recurring payments
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

## Custom Fields

### Platform Key (`Platform_Key__c`)
* **Type:** Text field (100 characters)
* **Purpose:** Stores unique identifiers from external donation platforms
* **Source Flows:** [Recurring Record Match Flow](../flows-recurring-donations/recurring-record-match-flow.md), [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md), [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

# NPSP Settings Object

## Recurring Donations Settings (`npe03__Recurring_Donations_Settings__c`)

### Enhanced Recurring Donations Enabled (`npsp__IsRecurringDonations2Enabled__c`)
* **Type:** Checkbox field
* **Purpose:** Indicates if Enhanced Recurring Donations (RD2) is enabled
* **Source Flows:** [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)

# Opportunity Object

The standard Opportunity object has been significantly enhanced with comprehensive field support for donations, matching gifts, and financial tracking:

## Standard Fields

### Id
* **Type:** ID field
* **Purpose:** Unique record identifier
* **Source Flows:** [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### Name
* **Type:** Text field (120 characters max)
* **Purpose:** Opportunity name/title
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### Amount
* **Type:** Currency field
* **Purpose:** Donation amount
* **Source Flows:** [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### StageName
* **Type:** Picklist field
* **Purpose:** Current stage of the donation opportunity
* **Source Flows:** [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Probability
* **Type:** Percent field
* **Purpose:** Probability of closing the opportunity
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### CloseDate
* **Type:** Date field
* **Purpose:** Date the donation was completed
* **Source Flows:** [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Description
* **Type:** Long Text Area field
* **Purpose:** Detailed description of the donation
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### AccountId
* **Type:** Lookup to Account
* **Purpose:** Account associated with the donation
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### RecordTypeId
* **Type:** Lookup to RecordType
* **Purpose:** Record type for the opportunity
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### CampaignId
* **Type:** Lookup to Campaign
* **Purpose:** Campaign associated with the donation
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### IsPrivate
* **Type:** Checkbox field
* **Purpose:** Marks donation as private/anonymous
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

## NPSP Opportunity Fields

### Primary Contact (`npsp__Primary_Contact__c`)
* **Type:** Lookup to Contact
* **Purpose:** Primary contact associated with the donation
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Matching Gift (`npsp__Matching_Gift__c`)
* **Type:** Lookup to Opportunity
* **Purpose:** Links to the original donation being matched
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### Matching Gift Account (`npsp__Matching_Gift_Account__c`)
* **Type:** Lookup to Account
* **Purpose:** Account providing the matching gift
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### Matching Gift Employer (`npsp__Matching_Gift_Employer__c`)
* **Type:** Text field
* **Purpose:** Name of the matching gift employer
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### Matching Gift Status (`npsp__Matching_Gift_Status__c`)
* **Type:** Picklist field
* **Purpose:** Status of the matching gift process
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)

### Recurring Donation (`npe03__Recurring_Donation__c`)
* **Type:** Lookup to npe03__Recurring_Donation__c
* **Purpose:** Links individual donations to their recurring donation parent
* **Source Flows:** [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

## Custom Fields

### Platform Key (`movedata__Platform_Key__c`)
* **Type:** Text field
* **Purpose:** Stores unique identifiers from external platforms
* **Source Flows:** [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

## md_npsp_pack Fee Fields

### Fee (`md_npsp_pack__Fee__c`)
* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Captures aggregate processing fees before tax calculations
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Gateway Fee (`md_npsp_pack__Gateway_Fee__c`)
* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Tracks payment processor charges (Stripe, PayPal, etc.)
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Platform Fee (`md_npsp_pack__Platform_Fee__c`)
* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Records charges from fundraising platforms or donation management tools
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Tax (`md_npsp_pack__Tax__c`)
* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Captures overall tax amounts on donation-related charges
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Gateway Fee Tax (`md_npsp_pack__Gateway_Fee_Tax__c`)
* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Specific tax calculations on payment gateway charges
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Platform Fee Tax (`md_npsp_pack__Platform_Fee_Tax__c`)
* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Tax calculations specific to platform service charges
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Receipt Number (`md_npsp_pack__Receipt_Number__c`)
* **Type:** Text field (50 characters)
* **Purpose:** Stores donation receipt identification numbers
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

# NPSP Payment Object (`npe01__OppPayment__c`)

The NPSP Payment object tracks individual payment transactions associated with opportunities, particularly important for refund processing and payment tracking:

## Standard Fields

### Opportunity (`npe01__Opportunity__c`)
* **Type:** Master-Detail Relationship to Opportunity
* **Purpose:** Links payment records to their associated donation opportunity
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Payment Amount (`npe01__Payment_Amount__c`)
* **Type:** Currency field
* **Purpose:** Amount of the individual payment transaction
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Payment Date (`npe01__Payment_Date__c`)
* **Type:** Date field
* **Purpose:** Date when the payment transaction occurred
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)

### Paid (`npe01__Paid__c`)
* **Type:** Checkbox field
* **Purpose:** Indicates whether the payment has been completed
* **Source Flows:** [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)
