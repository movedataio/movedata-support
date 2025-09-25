# Fields and Objects

## Account Object

### Standard Fields

| Field Name | Type           | Purpose                              | Source Flows                                |
| ---------- | -------------- | ------------------------------------ | ------------------------------------------- |
| Name       | Text field     | Account name identifier              | [Account Mapping Flow](../flows-account/account-mapping-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Phone      | Phone field    | Primary phone number for the account | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)                 |
| Website    | URL field      | Account's primary website URL        | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)                 |
| Type       | Picklist field | Categorizes the type of account      | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md)                 |
| Id         | ID field       | Unique record identifier             | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                       |

### Billing Address Fields

| Field Name        | Type           | Purpose                             | Source Flows                |
| ----------------- | -------------- | ----------------------------------- | --------------------------- |
| BillingStreet     | Textarea field | Street address for billing          | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| BillingCity       | Text field     | City for billing address            | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| BillingState      | Text field     | State/Province for billing address  | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| BillingCountry    | Text field     | Country for billing address         | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| BillingPostalCode | Text field     | Postal/ZIP code for billing address | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |

### Shipping Address Fields

| Field Name         | Type           | Purpose                              | Source Flows                |
| ------------------ | -------------- | ------------------------------------ | --------------------------- |
| ShippingStreet     | Textarea field | Street address for shipping          | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| ShippingCity       | Text field     | City for shipping address            | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| ShippingState      | Text field     | State/Province for shipping address  | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| ShippingCountry    | Text field     | Country for shipping address         | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| ShippingPostalCode | Text field     | Postal/ZIP code for shipping address | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                         | Source Flows         |
| ------------------------------------------ | -------------- | --------------------------------------------------------------- | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to the account name when set to true | [Account Mapping Flow](../flows-account/account-mapping-flow.md) |

## Contact Object

### Standard Fields

| Field Name  | Type                            | Purpose                                          | Source Flows                                                                |
| ----------- | ------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| Id          | ID field                        | Unique record identifier                         | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)                            |
| FirstName   | Text field (40 characters max)  | Contact's first name                             | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)                          |
| LastName    | Text field (80 characters max)  | Contact's last name (required field)             | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)                          |
| Name        | Formula field                   | Full name combining FirstName and LastName       | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                       |
| Salutation  | Picklist field                  | Contact's title/salutation (Mr., Ms., Dr., etc.) | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)                                                 |
| Birthdate   | Date field                      | Contact's birth date                             | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)                                                 |
| Email       | Email field (80 characters max) | Primary email address                            | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)                                                 |
| Phone       | Phone field (40 characters max) | Primary phone number                             | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)                                                 |
| HomePhone   | Phone field (40 characters max) | Home phone number                                | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)                                                 |
| MobilePhone | Phone field (40 characters max) | Mobile phone number                              | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md)                                                 |
| AccountId   | Lookup to Account               | Links contact to associated account              | [Get Account ID Helper Flow](../flows-account/get-account-id-helper-flow.md), [Contact Post-Upsert Flow](../flows-contact/contact-post-upsert-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

### Mailing Address Fields

| Field Name        | Type                                | Purpose                             | Source Flows                |
| ----------------- | ----------------------------------- | ----------------------------------- | --------------------------- |
| MailingStreet     | Textarea field (255 characters max) | Street address for mailing          | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md) |
| MailingCity       | Text field (40 characters max)      | City for mailing address            | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md) |
| MailingState      | Text field (80 characters max)      | State/Province for mailing address  | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md) |
| MailingCountry    | Text field (80 characters max)      | Country for mailing address         | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md) |
| MailingPostalCode | Text field (20 characters max)      | Postal/ZIP code for mailing address | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md), [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md) |

### Other Address Fields

| Field Name      | Type                                | Purpose                            | Source Flows                |
| --------------- | ----------------------------------- | ---------------------------------- | --------------------------- |
| OtherStreet     | Textarea field (255 characters max) | Alternative street address         | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| OtherCity       | Text field (40 characters max)      | Alternative city address           | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| OtherState      | Text field (80 characters max)      | Alternative state/province address | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| OtherCountry    | Text field (80 characters max)      | Alternative country address        | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| OtherPostalCode | Text field (20 characters max)      | Alternative postal/ZIP code        | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |

### NPSP Custom Fields

| Field Name                                 | Type                            | Purpose                                    | Source Flows                |
| ------------------------------------------ | ------------------------------- | ------------------------------------------ | --------------------------- |
| Do Not Contact (`npsp__Do_Not_Contact__c`) | Checkbox field                  | Flags contacts who should not be contacted | [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md)        |
| Home Email (`npe01__HomeEmail__c`)         | Email field (80 characters max) | Home email address (NPSP field)            | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| Work Email (`npe01__WorkEmail__c`)         | Email field (80 characters max) | Work email address (NPSP field)            | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                      | Source Flows         |
| ------------------------------------------ | -------------- | ------------------------------------------------------------ | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to contact names when set to true | [Contact Mapping Flow](../flows-contact/contact-mapping-flow.md) |

## Platform Key Objects

### Account Platform Key (`movedata__Account_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | [Account Platform Key Flow](../flows-account/account-platform-key-flow.md) |

**Object Purpose:** Custom Object - Links Account records to external platform identifiers\
**Source Flows:** Account Platform Key Helper Flow

### Contact Platform Key (`movedata__Contact_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | [Contact Platform Key Flow](../flows-contact/contact-platform-key-flow.md) |

**Object Purpose:** Custom Object - Links Contact records to external platform identifiers\
**Source Flows:** Contact Platform Key Helper Flow

## Campaign Object

### Standard Fields

| Field Name      | Type                           | Purpose                                                       | Source Flows                                                     |
| --------------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Id              | ID field                       | Unique record identifier                                      | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)                 |
| Name            | Text field (80 characters max) | Campaign name identifier                                      | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaign/campaign-name-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| IsActive        | Checkbox field                 | Indicates if the campaign is currently active                 | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |
| Status          | Picklist field                 | Current status of the campaign                                | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |
| Type            | Picklist field                 | Categorizes the type of campaign                              | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |
| ParentId        | Lookup to Campaign             | Links to parent campaign for hierarchical campaign structures | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |
| ExpectedRevenue | Currency field                 | Target fundraising amount for the campaign                    | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |
| StartDate       | Date field                     | Campaign start date                                           | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |
| EndDate         | Date field                     | Campaign end date                                             | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |
| Description     | Long Text Area field           | Detailed campaign description                                 | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                                            |

### Custom Fields

| Field Name                                                       | Type           | Purpose                                                                         | Source Flows                                      |
| ---------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| Platform (`movedata__Platform__c`)                               | Text field     | Identifies the external platform or system source                               | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                             |
| Platform Key (`movedata__Platform_Key__c`)                       | Text field     | Stores unique external platform identifier                                      | [Campaign Record Match Flow](../flows-campaign/campaign-record-match-flow.md) Flow, [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Protect Name (`movedata__Protect_Name__c`)                       | Checkbox field | Prevents automatic updates to the campaign name when set to true                | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaign/campaign-name-flow.md)         |
| Protect Campaign Parent (`movedata__Protect_Campaign_Parent__c`) | Checkbox field | Prevents automatic updates to the parent campaign relationship when set to true | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md)                             |
| Campaign Code (`movedata__Campaign_Code__c`)                     | Text field     | Short code identifier for campaign naming conventions                           | [Campaign Name Flow](../flows-campaign/campaign-name-flow.md)                                |

### Extension Custom Fields

| Field Name                                                   | Type                                  | Purpose                                                     | Source Flows                     |
| ------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| Campaign URL (`md_npsp_pack__Campaign_URL__c`)               | URL field                             | Stores the web address for online campaign pages            | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Fundraising Account (`md_npsp_pack__Fundraising_Account__c`) | Lookup relationship to Account object | Associates campaigns with organizational fundraisers        | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Fundraising Contact (`md_npsp_pack__Fundraising_Contact__c`) | Lookup relationship to Contact object | Identifies individual fundraising champions or coordinators | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |

## Recurring Donation Object (NPSP)

**Object:** NPSP Recurring Donation object (`npe03__Recurring_Donation__c`)
**Purpose:** Comprehensive field support for managing recurring donations with platform integration

### Standard Fields

| Field Name      | Type                                       | Purpose                                  | Source Flows                                      |
| --------------- | ------------------------------------------ | ---------------------------------------- | ------------------------------------------------- |
| Id              | ID field                                   | Unique record identifier                 | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| CurrencyIsoCode | Picklist field (if multi-currency enabled) | Currency code for the recurring donation | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                            |

### NPSP Legacy Fields

| Field Name                                                            | Type               | Purpose                                         | Source Flows                                  |
| --------------------------------------------------------------------- | ------------------ | ----------------------------------------------- | --------------------------------------------- |
| Amount (`npe03__Amount__c`)                                           | Currency field     | Recurring donation amount per installment       | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                        |
| Contact (`npe03__Contact__c`)                                         | Lookup to Contact  | Primary contact for individual recurring donors | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Organization (`npe03__Organization__c`)                               | Lookup to Account  | Organization for institutional recurring donors | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                        |
| Date Established (`npe03__Date_Established__c`)                       | Date field         | Date the recurring donation was established     | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                        |
| Installment Period (`npe03__Installment_Period__c`)                   | Picklist field     | Frequency of recurring payments                 | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                        |
| Next Payment Date (`npe03__Next_Payment_Date__c`)                     | Date field         | Date of the next expected payment               | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                        |
| Open Ended Status (`npe03__Open_Ended_Status__c`)                     | Picklist field     | Whether the recurring donation has an end date  | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                        |
| Recurring Donation Campaign (`npe03__Recurring_Donation_Campaign__c`) | Lookup to Campaign | Associated campaign for the recurring donation  | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md)                        |

### NPSP Enhanced Fields

| Field Name                                              | Type           | Purpose                                               | Source Flows           |
| ------------------------------------------------------- | -------------- | ----------------------------------------------------- | ---------------------- |
| Status (`npsp__Status__c`)                              | Picklist field | Current status of the recurring donation              | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |
| Start Date (`npsp__StartDate__c`)                       | Date field     | Enhanced Recurring Donations start date               | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |
| Installment Frequency (`npsp__InstallmentFrequency__c`) | Number field   | Frequency multiplier for Enhanced Recurring Donations | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |
| Day of Month (`npsp__Day_of_Month__c`)                  | Text field     | Preferred day of month for recurring payments         | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |

### Extension Custom Fields

| Field Name                                      | Type                        | Purpose                                                    | Source Flows                                                                                           |
| ----------------------------------------------- | --------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Platform Key (`md_npsp_pack__Platform_Key__c`) | Text field (100 characters) | Stores unique identifiers from external donation platforms | [Recurring Record Match Flow](../flows-recurring-donations/recurring-record-match-flow.md), [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md), [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

## NPSP Settings Object

### Recurring Donations Settings (`npe03__Recurring_Donations_Settings__c`)

| Field Name                                                                     | Type           | Purpose                                                    | Source Flows           |
| ------------------------------------------------------------------------------ | -------------- | ---------------------------------------------------------- | ---------------------- |
| Enhanced Recurring Donations Enabled (`npsp__IsRecurringDonations2Enabled__c`) | Checkbox field | Indicates if Enhanced Recurring Donations (RD2) is enabled | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |

## Opportunity Object

**Object:** Standard Opportunity object\
**Purpose:** Significantly enhanced with comprehensive field support for donations, matching gifts, and financial tracking

### Standard Fields

| Field Name   | Type                            | Purpose                                   | Source Flows                                                                 |
| ------------ | ------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| Id           | ID field                        | Unique record identifier                  | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| Name         | Text field (120 characters max) | Opportunity name/title                    | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)                             |
| Amount       | Currency field                  | Donation amount                           | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                            |
| StageName    | Picklist field                  | Current stage of the donation opportunity | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                            |
| Probability  | Percent field                   | Probability of closing the opportunity    | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| CloseDate    | Date field                      | Date the donation was completed           | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                            |
| Description  | Long Text Area field            | Detailed description of the donation      | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| AccountId    | Lookup to Account               | Account associated with the donation      | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| RecordTypeId | Lookup to RecordType            | Record type for the opportunity           | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| CampaignId   | Lookup to Campaign              | Campaign associated with the donation     | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| IsPrivate    | Checkbox field                  | Marks donation as private/anonymous       | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |

### NPSP Opportunity Fields

| Field Name                                                 | Type                                        | Purpose                                                       | Source Flows                                      |
| ---------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| Primary Contact (`npsp__Primary_Contact__c`)               | Lookup to Contact                           | Primary contact associated with the donation                  | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                             |
| Matching Gift (`npsp__Matching_Gift__c`)                   | Lookup to Opportunity                       | Links to the original donation being matched                  | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)  |
| Matching Gift Account (`npsp__Matching_Gift_Account__c`)   | Lookup to Account                           | Account providing the matching gift                           | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)  |
| Matching Gift Employer (`npsp__Matching_Gift_Employer__c`) | Text field                                  | Name of the matching gift employer                            | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)  |
| Matching Gift Status (`npsp__Matching_Gift_Status__c`)     | Picklist field                              | Status of the matching gift process                           | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md)  |
| Recurring Donation (`npe03__Recurring_Donation__c`)        | Lookup to npe03\_\_Recurring\_Donation\_\_c | Links individual donations to their recurring donation parent | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

### Custom Fields

| Field Name                                 | Type       | Purpose                                           | Source Flows                                      |
| ------------------------------------------ | ---------- | ------------------------------------------------- | ------------------------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores unique identifiers from external platforms | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

### md\_npsp\_pack Fee Fields

| Field Name                                             | Type                                         | Purpose                                                                 | Source Flows          |
| ------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------- | --------------------- |
| Fee (`md_npsp_pack__Fee__c`)                           | Currency field (18 digits, 2 decimal places) | Captures aggregate processing fees before tax calculations              | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Gateway Fee (`md_npsp_pack__Gateway_Fee__c`)           | Currency field (18 digits, 2 decimal places) | Tracks payment processor charges (Stripe, PayPal, etc.)                 | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Platform Fee (`md_npsp_pack__Platform_Fee__c`)         | Currency field (18 digits, 2 decimal places) | Records charges from fundraising platforms or donation management tools | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Tax (`md_npsp_pack__Tax__c`)                           | Currency field (18 digits, 2 decimal places) | Captures overall tax amounts on donation-related charges                | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Gateway Fee Tax (`md_npsp_pack__Gateway_Fee_Tax__c`)   | Currency field (18 digits, 2 decimal places) | Specific tax calculations on payment gateway charges                    | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Platform Fee Tax (`md_npsp_pack__Platform_Fee_Tax__c`) | Currency field (18 digits, 2 decimal places) | Tax calculations specific to platform service charges                   | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Receipt Number (`md_npsp_pack__Receipt_Number__c`)     | Text field (50 characters)                   | Stores donation receipt identification numbers                          | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

## NPSP Payment Object (`npe01__OppPayment__c`)

**Object Purpose:** Tracks individual payment transactions associated with opportunities, particularly important for refund processing and payment tracking

### Standard Fields

| Field Name                                  | Type                                      | Purpose                                                        | Source Flows          |
| ------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------- | --------------------- |
| Opportunity (`npe01__Opportunity__c`)       | Master-Detail Relationship to Opportunity | Links payment records to their associated donation opportunity | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Payment Amount (`npe01__Payment_Amount__c`) | Currency field                            | Amount of the individual payment transaction                   | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Payment Date (`npe01__Payment_Date__c`)     | Date field                                | Date when the payment transaction occurred                     | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Paid (`npe01__Paid__c`)                     | Checkbox field                            | Indicates whether the payment has been completed               | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
