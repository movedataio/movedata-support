# Fields and Objects

## Account Object

### Standard Fields

| Field Name | Type           | Purpose                              | Source Flows                                |
| ---------- | -------------- | ------------------------------------ | ------------------------------------------- |
| Name       | Text field     | Account name identifier              | [Account Mapping Flow](../flows-account/account-mapping-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Phone      | Phone field    | Primary phone number for the account | Account Details Helper Flow                 |
| Website    | URL field      | Account's primary website URL        | Account Details Helper Flow                 |
| Type       | Picklist field | Categorizes the type of account      | Account Details Helper Flow                 |
| Id         | ID field       | Unique record identifier             | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                       |

### Billing Address Fields

| Field Name        | Type           | Purpose                             | Source Flows                |
| ----------------- | -------------- | ----------------------------------- | --------------------------- |
| BillingStreet     | Textarea field | Street address for billing          | Account Details Helper Flow |
| BillingCity       | Text field     | City for billing address            | Account Details Helper Flow |
| BillingState      | Text field     | State/Province for billing address  | Account Details Helper Flow |
| BillingCountry    | Text field     | Country for billing address         | Account Details Helper Flow |
| BillingPostalCode | Text field     | Postal/ZIP code for billing address | Account Details Helper Flow |

### Shipping Address Fields

| Field Name         | Type           | Purpose                              | Source Flows                |
| ------------------ | -------------- | ------------------------------------ | --------------------------- |
| ShippingStreet     | Textarea field | Street address for shipping          | Account Details Helper Flow |
| ShippingCity       | Text field     | City for shipping address            | Account Details Helper Flow |
| ShippingState      | Text field     | State/Province for shipping address  | Account Details Helper Flow |
| ShippingCountry    | Text field     | Country for shipping address         | Account Details Helper Flow |
| ShippingPostalCode | Text field     | Postal/ZIP code for shipping address | Account Details Helper Flow |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                         | Source Flows         |
| ------------------------------------------ | -------------- | --------------------------------------------------------------- | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to the account name when set to true | [Account Mapping Flow](../flows-account/account-mapping-flow.md) |

## Contact Object

### Standard Fields

| Field Name  | Type                            | Purpose                                          | Source Flows                                                                |
| ----------- | ------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| Id          | ID field                        | Unique record identifier                         | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow                            |
| FirstName   | Text field (40 characters max)  | Contact's first name                             | Contact Details Helper Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                          |
| LastName    | Text field (80 characters max)  | Contact's last name (required field)             | Contact Details Helper Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                          |
| Name        | Formula field                   | Full name combining FirstName and LastName       | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                       |
| Salutation  | Picklist field                  | Contact's title/salutation (Mr., Ms., Dr., etc.) | Contact Details Helper Flow                                                 |
| Birthdate   | Date field                      | Contact's birth date                             | Contact Details Helper Flow                                                 |
| Email       | Email field (80 characters max) | Primary email address                            | Contact Details Helper Flow                                                 |
| Phone       | Phone field (40 characters max) | Primary phone number                             | Contact Details Helper Flow                                                 |
| HomePhone   | Phone field (40 characters max) | Home phone number                                | Contact Details Helper Flow                                                 |
| MobilePhone | Phone field (40 characters max) | Mobile phone number                              | Contact Details Helper Flow                                                 |
| AccountId   | Lookup to Account               | Links contact to associated account              | Get Account ID Helper Flow, Contact Post-Upsert Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

### Mailing Address Fields

| Field Name        | Type                                | Purpose                             | Source Flows                |
| ----------------- | ----------------------------------- | ----------------------------------- | --------------------------- |
| MailingStreet     | Textarea field (255 characters max) | Street address for mailing          | Contact Details Helper Flow |
| MailingCity       | Text field (40 characters max)      | City for mailing address            | Contact Details Helper Flow |
| MailingState      | Text field (80 characters max)      | State/Province for mailing address  | Contact Details Helper Flow |
| MailingCountry    | Text field (80 characters max)      | Country for mailing address         | Contact Details Helper Flow |
| MailingPostalCode | Text field (20 characters max)      | Postal/ZIP code for mailing address | Contact Details Helper Flow |

### Other Address Fields

| Field Name      | Type                                | Purpose                            | Source Flows                |
| --------------- | ----------------------------------- | ---------------------------------- | --------------------------- |
| OtherStreet     | Textarea field (255 characters max) | Alternative street address         | Contact Details Helper Flow |
| OtherCity       | Text field (40 characters max)      | Alternative city address           | Contact Details Helper Flow |
| OtherState      | Text field (80 characters max)      | Alternative state/province address | Contact Details Helper Flow |
| OtherCountry    | Text field (80 characters max)      | Alternative country address        | Contact Details Helper Flow |
| OtherPostalCode | Text field (20 characters max)      | Alternative postal/ZIP code        | Contact Details Helper Flow |

### NPSP Custom Fields

| Field Name                                 | Type                            | Purpose                                    | Source Flows                |
| ------------------------------------------ | ------------------------------- | ------------------------------------------ | --------------------------- |
| Do Not Contact (`npsp__Do_Not_Contact__c`) | Checkbox field                  | Flags contacts who should not be contacted | Contact Mapping Flow        |
| Home Email (`npe01__HomeEmail__c`)         | Email field (80 characters max) | Home email address (NPSP field)            | Contact Details Helper Flow |
| Work Email (`npe01__WorkEmail__c`)         | Email field (80 characters max) | Work email address (NPSP field)            | Contact Details Helper Flow |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                      | Source Flows         |
| ------------------------------------------ | -------------- | ------------------------------------------------------------ | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to contact names when set to true | Contact Mapping Flow |

## Platform Key Objects

### Account Platform Key (`movedata__Account_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | Account Platform Key Flow |

**Object Purpose:** Custom Object - Links Account records to external platform identifiers\
**Source Flows:** Account Platform Key Helper Flow

### Contact Platform Key (`movedata__Contact_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | Contact Platform Key Flow |

**Object Purpose:** Custom Object - Links Contact records to external platform identifiers\
**Source Flows:** Contact Platform Key Helper Flow

## Campaign Object

### Standard Fields

| Field Name      | Type                           | Purpose                                                       | Source Flows                                                     |
| --------------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Id              | ID field                       | Unique record identifier                                      | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow                 |
| Name            | Text field (80 characters max) | Campaign name identifier                                      | Campaign Mapping Flow, Campaign Name Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| IsActive        | Checkbox field                 | Indicates if the campaign is currently active                 | Campaign Mapping Flow                                            |
| Status          | Picklist field                 | Current status of the campaign                                | Campaign Mapping Flow                                            |
| Type            | Picklist field                 | Categorizes the type of campaign                              | Campaign Mapping Flow                                            |
| ParentId        | Lookup to Campaign             | Links to parent campaign for hierarchical campaign structures | Campaign Mapping Flow                                            |
| ExpectedRevenue | Currency field                 | Target fundraising amount for the campaign                    | Campaign Mapping Flow                                            |
| StartDate       | Date field                     | Campaign start date                                           | Campaign Mapping Flow                                            |
| EndDate         | Date field                     | Campaign end date                                             | Campaign Mapping Flow                                            |
| Description     | Long Text Area field           | Detailed campaign description                                 | Campaign Mapping Flow                                            |

### Custom Fields

| Field Name                                                       | Type           | Purpose                                                                         | Source Flows                                      |
| ---------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| Platform (`movedata__Platform__c`)                               | Text field     | Identifies the external platform or system source                               | Campaign Mapping Flow                             |
| Platform Key (`movedata__Platform_Key__c`)                       | Text field     | Stores unique external platform identifier                                      | Campaign Record Match Flow, Campaign Mapping Flow |
| Protect Name (`movedata__Protect_Name__c`)                       | Checkbox field | Prevents automatic updates to the campaign name when set to true                | Campaign Mapping Flow, Campaign Name Flow         |
| Protect Campaign Parent (`movedata__Protect_Campaign_Parent__c`) | Checkbox field | Prevents automatic updates to the parent campaign relationship when set to true | Campaign Mapping Flow                             |
| Campaign Code (`movedata__Campaign_Code__c`)                     | Text field     | Short code identifier for campaign naming conventions                           | Campaign Name Flow                                |

### Extension Custom Fields

| Field Name                                                   | Type                                  | Purpose                                                     | Source Flows                     |
| ------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| Campaign URL (`md_npsp_pack__Campaign_URL__c`)               | URL field                             | Stores the web address for online campaign pages            | Not referenced in provided flows |
| Fundraising Account (`md_npsp_pack__Fundraising_Account__c`) | Lookup relationship to Account object | Associates campaigns with organizational fundraisers        | Not referenced in provided flows |
| Fundraising Contact (`md_npsp_pack__Fundraising_Contact__c`) | Lookup relationship to Contact object | Identifies individual fundraising champions or coordinators | Not referenced in provided flows |

## Recurring Donation Object (NPSP)

**Object:** NPSP Recurring Donation object (`npe03__Recurring_Donation__c`)\
**Purpose:** Comprehensive field support for managing recurring donations with platform integration

### Standard Fields

| Field Name      | Type                                       | Purpose                                  | Source Flows                                      |
| --------------- | ------------------------------------------ | ---------------------------------------- | ------------------------------------------------- |
| Id              | ID field                                   | Unique record identifier                 | Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| CurrencyIsoCode | Picklist field (if multi-currency enabled) | Currency code for the recurring donation | Recurring Mapping Flow                            |

### NPSP Legacy Fields

| Field Name                                                            | Type               | Purpose                                         | Source Flows                                  |
| --------------------------------------------------------------------- | ------------------ | ----------------------------------------------- | --------------------------------------------- |
| Amount (`npe03__Amount__c`)                                           | Currency field     | Recurring donation amount per installment       | Recurring Mapping Flow                        |
| Contact (`npe03__Contact__c`)                                         | Lookup to Contact  | Primary contact for individual recurring donors | Recurring Mapping Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Organization (`npe03__Organization__c`)                               | Lookup to Account  | Organization for institutional recurring donors | Recurring Mapping Flow                        |
| Date Established (`npe03__Date_Established__c`)                       | Date field         | Date the recurring donation was established     | Recurring Mapping Flow                        |
| Installment Period (`npe03__Installment_Period__c`)                   | Picklist field     | Frequency of recurring payments                 | Recurring Mapping Flow                        |
| Next Payment Date (`npe03__Next_Payment_Date__c`)                     | Date field         | Date of the next expected payment               | Recurring Mapping Flow                        |
| Open Ended Status (`npe03__Open_Ended_Status__c`)                     | Picklist field     | Whether the recurring donation has an end date  | Recurring Mapping Flow                        |
| Recurring Donation Campaign (`npe03__Recurring_Donation_Campaign__c`) | Lookup to Campaign | Associated campaign for the recurring donation  | Recurring Mapping Flow                        |

### NPSP Enhanced Fields

| Field Name                                              | Type           | Purpose                                               | Source Flows           |
| ------------------------------------------------------- | -------------- | ----------------------------------------------------- | ---------------------- |
| Status (`npsp__Status__c`)                              | Picklist field | Current status of the recurring donation              | Recurring Mapping Flow |
| Start Date (`npsp__StartDate__c`)                       | Date field     | Enhanced Recurring Donations start date               | Recurring Mapping Flow |
| Installment Frequency (`npsp__InstallmentFrequency__c`) | Number field   | Frequency multiplier for Enhanced Recurring Donations | Recurring Mapping Flow |
| Day of Month (`npsp__Day_of_Month__c`)                  | Text field     | Preferred day of month for recurring payments         | Recurring Mapping Flow |

### Extension Custom Fields

| Field Name                                      | Type                        | Purpose                                                    | Source Flows                                                                                           |
| ----------------------------------------------- | --------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Platform Key (`md_npsp__pack__Platform_Key__c`) | Text field (100 characters) | Stores unique identifiers from external donation platforms | Recurring Record Match Flow, Recurring Mapping Flow, Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

## NPSP Settings Object

### Recurring Donations Settings (`npe03__Recurring_Donations_Settings__c`)

| Field Name                                                                     | Type           | Purpose                                                    | Source Flows           |
| ------------------------------------------------------------------------------ | -------------- | ---------------------------------------------------------- | ---------------------- |
| Enhanced Recurring Donations Enabled (`npsp__IsRecurringDonations2Enabled__c`) | Checkbox field | Indicates if Enhanced Recurring Donations (RD2) is enabled | Recurring Mapping Flow |

## Opportunity Object

**Object:** Standard Opportunity object\
**Purpose:** Significantly enhanced with comprehensive field support for donations, matching gifts, and financial tracking

### Standard Fields

| Field Name   | Type                            | Purpose                                   | Source Flows                                                                 |
| ------------ | ------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| Id           | ID field                        | Unique record identifier                  | Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow |
| Name         | Text field (120 characters max) | Opportunity name/title                    | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow                             |
| Amount       | Currency field                  | Donation amount                           | Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                            |
| StageName    | Picklist field                  | Current stage of the donation opportunity | Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                            |
| Probability  | Percent field                   | Probability of closing the opportunity    | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| CloseDate    | Date field                      | Date the donation was completed           | Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                            |
| Description  | Long Text Area field            | Detailed description of the donation      | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| AccountId    | Lookup to Account               | Account associated with the donation      | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| RecordTypeId | Lookup to RecordType            | Record type for the opportunity           | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| CampaignId   | Lookup to Campaign              | Campaign associated with the donation     | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |
| IsPrivate    | Checkbox field                  | Marks donation as private/anonymous       | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                                                        |

### NPSP Opportunity Fields

| Field Name                                                 | Type                                        | Purpose                                                       | Source Flows                                      |
| ---------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| Primary Contact (`npsp__Primary_Contact__c`)               | Lookup to Contact                           | Primary contact associated with the donation                  | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md)                             |
| Matching Gift (`npsp__Matching_Gift__c`)                   | Lookup to Opportunity                       | Links to the original donation being matched                  | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow  |
| Matching Gift Account (`npsp__Matching_Gift_Account__c`)   | Lookup to Account                           | Account providing the matching gift                           | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow  |
| Matching Gift Employer (`npsp__Matching_Gift_Employer__c`) | Text field                                  | Name of the matching gift employer                            | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow  |
| Matching Gift Status (`npsp__Matching_Gift_Status__c`)     | Picklist field                              | Status of the matching gift process                           | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), Donation Post-Upsert Flow  |
| Recurring Donation (`npe03__Recurring_Donation__c`)        | Lookup to npe03\_\_Recurring\_Donation\_\_c | Links individual donations to their recurring donation parent | Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

### Custom Fields

| Field Name                                 | Type       | Purpose                                           | Source Flows                                      |
| ------------------------------------------ | ---------- | ------------------------------------------------- | ------------------------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores unique identifiers from external platforms | Donation Record Match Flow, [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

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
