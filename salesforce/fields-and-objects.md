# Fields and Objects

## Account Object

### Standard Fields

| Field Name | Type           | Purpose                              | Source Flows                                        |
| ---------- | -------------- | ------------------------------------ | --------------------------------------------------- |
| Name       | Text field     | Account name identifier              | Account Mapping Flow                                |
| Phone      | Phone field    | Primary phone number for the account | Account Details Helper Flow                         |
| Website    | URL field      | Account's primary website URL        | Account Details Helper Flow                         |
| Type       | Picklist field | Categorizes the type of account      | Account Details Helper Flow                         |
| Id         | ID field       | Unique record identifier             | Account Record Match Flow, Account Post-Upsert Flow |

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
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to the account name when set to true | Account Mapping Flow |

## Contact Object

### Standard Fields

| Field Name  | Type                            | Purpose                                          | Source Flows                                        |
| ----------- | ------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| Id          | ID field                        | Unique record identifier                         | Contact Record Match Flow, Contact Post-Upsert Flow |
| FirstName   | Text field (40 characters max)  | Contact's first name                             | Contact Details Helper Flow                         |
| LastName    | Text field (80 characters max)  | Contact's last name (required field)             | Contact Details Helper Flow                         |
| Name        | Formula field                   | Full name combining FirstName and LastName       | System-generated                                    |
| Salutation  | Picklist field                  | Contact's title/salutation (Mr., Ms., Dr., etc.) | Contact Details Helper Flow                         |
| Birthdate   | Date field                      | Contact's birth date                             | Contact Details Helper Flow                         |
| Email       | Email field (80 characters max) | Primary email address                            | Contact Details Helper Flow                         |
| Phone       | Phone field (40 characters max) | Primary phone number                             | Contact Details Helper Flow                         |
| HomePhone   | Phone field (40 characters max) | Home phone number                                | Contact Details Helper Flow                         |
| MobilePhone | Phone field (40 characters max) | Mobile phone number                              | Contact Details Helper Flow                         |
| AccountId   | Lookup to Account               | Links contact to associated account              | Contact Platform Key Helper Flow                    |

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

| Field Name                                 | Type       | Purpose                             | Source Flows                     |
| ------------------------------------------ | ---------- | ----------------------------------- | -------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | Account Platform Key Helper Flow |

**Object Purpose:** Custom Object - Links Account records to external platform identifiers\
**Source Flows:** Account Platform Key Helper Flow

### Contact Platform Key (`movedata__Contact_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows                     |
| ------------------------------------------ | ---------- | ----------------------------------- | -------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | Contact Platform Key Helper Flow |

**Object Purpose:** Custom Object - Links Contact records to external platform identifiers\
**Source Flows:** Contact Platform Key Helper Flow

## Campaign Object

### Standard Fields

| Field Name      | Type                           | Purpose                                                       | Source Flows                                          |
| --------------- | ------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------- |
| Id              | ID field                       | Unique record identifier                                      | Campaign Record Match Flow, Campaign Post-Upsert Flow |
| Name            | Text field (80 characters max) | Campaign name identifier                                      | Campaign Mapping Flow, Campaign Name Flow             |
| IsActive        | Checkbox field                 | Indicates if the campaign is currently active                 | Campaign Mapping Flow                                 |
| Status          | Picklist field                 | Current status of the campaign                                | Campaign Mapping Flow                                 |
| Type            | Picklist field                 | Categorizes the type of campaign                              | Campaign Mapping Flow                                 |
| ParentId        | Lookup to Campaign             | Links to parent campaign for hierarchical campaign structures | Campaign Mapping Flow                                 |
| ExpectedRevenue | Currency field                 | Target fundraising amount for the campaign                    | Campaign Mapping Flow                                 |
| StartDate       | Date field                     | Campaign start date                                           | Campaign Mapping Flow                                 |
| EndDate         | Date field                     | Campaign end date                                             | Campaign Mapping Flow                                 |
| Description     | Long Text Area field           | Detailed campaign description                                 | Campaign Mapping Flow                                 |

### Custom Fields

| Field Name                                                       | Type           | Purpose                                                                         | Source Flows                                      |
| ---------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| Platform (`movedata__Platform__c`)                               | Text field     | Identifies the external platform or system source                               | Campaign Mapping Flow                             |
| Platform Key (`movedata__Platform_Key__c`)                       | Text field     | Stores unique external platform identifier                                      | Campaign Record Match Flow, Campaign Mapping Flow |
| Protect Name (`movedata__Protect_Name__c`)                       | Checkbox field | Prevents automatic updates to the campaign name when set to true                | Campaign Mapping Flow, Campaign Name Flow         |
| Protect Campaign Parent (`movedata__Protect_Campaign_Parent__c`) | Checkbox field | Prevents automatic updates to the parent campaign relationship when set to true | Campaign Mapping Flow                             |
| Campaign Code (`movedata__Campaign_Code__c`)                     | Text field     | Short code identifier for campaign naming conventions                           | Campaign Name Flow                                |

### Extension Custom Fields

| Field Name                                                   | Type                                  | Purpose                                                     | Source Flows          |
| ------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------- | --------------------- |
| Campaign URL (`md_npsp_pack__Campaign_URL__c`)               | URL field                             | Stores the web address for online campaign pages            | Campaign Mapping Flow |
| Fundraising Account (`md_npsp_pack__Fundraising_Account__c`) | Lookup relationship to Account object | Associates campaigns with organizational fundraisers        | Campaign Mapping Flow |
| Fundraising Contact (`md_npsp_pack__Fundraising_Contact__c`) | Lookup relationship to Contact object | Identifies individual fundraising champions or coordinators | Campaign Mapping Flow |

## Product2 Object

### Standard Fields

| Field Name       | Type                            | Purpose                            | Source Flows                                    |
| ---------------- | ------------------------------- | ---------------------------------- | ----------------------------------------------- |
| Id               | ID field                        | Unique record identifier           | Catalog Post-Upsert Flow                        |
| Name             | Text field (255 characters max) | Product name identifier            | Catalog Mapping Flow, Catalog Name Flow         |
| ProductCode      | Text field (255 characters max) | Product code for identification    | Catalog Record Match Flow, Catalog Mapping Flow |
| Description      | Long Text Area field            | Product description                | Catalog Mapping Flow                            |
| IsActive         | Checkbox field                  | Indicates if the product is active | Catalog Mapping Flow                            |
| StockKeepingUnit | Text field (180 characters max) | SKU for inventory management       | Catalog Record Match Flow, Catalog Mapping Flow |

### Custom Fields

| Field Name                       | Type           | Purpose                                                         | Source Flows                                    |
| -------------------------------- | -------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| Platform Key (`Platform_Key__c`) | Text field     | Stores external platform identifier                             | Catalog Record Match Flow, Catalog Mapping Flow |
| Protect Name (`Protect_Name__c`) | Checkbox field | Prevents automatic updates to the product name when set to true | Catalog Mapping Flow                            |

## PricebookEntry Object

### Standard Fields

| Field Name       | Type                                         | Purpose                                    | Source Flows             |
| ---------------- | -------------------------------------------- | ------------------------------------------ | ------------------------ |
| Id               | ID field                                     | Unique record identifier                   | Catalog Post-Upsert Flow |
| IsActive         | Checkbox field                               | Indicates if the pricebook entry is active | Catalog Post-Upsert Flow |
| UnitPrice        | Currency field (18 digits, 2 decimal places) | Price for the product                      | Catalog Post-Upsert Flow |
| Product2Id       | Lookup to Product2                           | Associated product record                  | Catalog Post-Upsert Flow |
| Pricebook2Id     | Lookup to Pricebook2                         | Associated pricebook record                | Catalog Post-Upsert Flow |
| UseStandardPrice | Checkbox field                               | Whether to use standard pricing            | Catalog Post-Upsert Flow |
| ProductCode      | Formula field                                | Product code from associated product       | Catalog Post-Upsert Flow |
| Name             | Formula field                                | Product name from associated product       | Catalog Post-Upsert Flow |

## Opportunity Object

### Standard Fields

| Field Name      | Type                            | Purpose                           | Source Flows                                                    |
| --------------- | ------------------------------- | --------------------------------- | --------------------------------------------------------------- |
| Id              | ID field                        | Unique record identifier          | Commerce Order Record Match Flow, Commerce Order Finaliser Flow |
| Name            | Text field (120 characters max) | Opportunity name identifier       | Commerce Order Finaliser Flow, Commerce Order Name Flow         |
| StageName       | Picklist field                  | Current stage of the opportunity  | Commerce Order Mapping Flow, Commerce Order Finaliser Flow      |
| CloseDate       | Date field                      | Expected or actual close date     | Commerce Order Mapping Flow                                     |
| Amount          | Currency field                  | Opportunity amount/value          | Commerce Order Finaliser Flow                                   |
| AccountId       | Lookup to Account               | Associated account record         | Commerce Order Mapping Flow                                     |
| CampaignId      | Lookup to Campaign              | Associated campaign record        | Commerce Order Mapping Flow                                     |
| Description     | Long Text Area field            | Opportunity description           | Commerce Order Mapping Flow                                     |
| Pricebook2Id    | Lookup to Pricebook2            | Associated pricebook record       | Commerce Order Mapping Flow                                     |
| RecordTypeId    | Lookup to RecordType            | Record type identifier            | Commerce Order Mapping Flow                                     |
| CurrencyIsoCode | Picklist field                  | Currency code for the opportunity | Commerce Order Mapping Flow                                     |

### NPSP Custom Fields

| Field Name                                   | Type              | Purpose                                      | Source Flows                |
| -------------------------------------------- | ----------------- | -------------------------------------------- | --------------------------- |
| Primary Contact (`npsp__Primary_Contact__c`) | Lookup to Contact | Links to primary contact for the opportunity | Commerce Order Mapping Flow |

### Custom Fields

| Field Name                                 | Type       | Purpose                             | Source Flows                                                  |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------------------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | Commerce Order Record Match Flow, Commerce Order Mapping Flow |

### Extension Custom Fields

| Field Name                                             | Type           | Purpose                                    | Source Flows                |
| ------------------------------------------------------ | -------------- | ------------------------------------------ | --------------------------- |
| Fee (`md_npsp_pack__Fee__c`)                           | Currency field | Total fees associated with the opportunity | Commerce Order Mapping Flow |
| Gateway Fee (`md_npsp_pack__Gateway_Fee__c`)           | Currency field | Payment gateway processing fees            | Commerce Order Mapping Flow |
| Platform Fee (`md_npsp_pack__Platform_Fee__c`)         | Currency field | Platform-specific processing fees          | Commerce Order Mapping Flow |
| Tax (`md_npsp_pack__Tax__c`)                           | Currency field | Tax amount for the opportunity             | Commerce Order Mapping Flow |
| Platform Fee Tax (`md_npsp_pack__Platform_Fee_Tax__c`) | Currency field | Tax on platform fees                       | Commerce Order Mapping Flow |
| Gateway Fee Tax (`md_npsp_pack__Gateway_Fee_Tax__c`)   | Currency field | Tax on gateway fees                        | Commerce Order Mapping Flow |
| Receipt Number (`md_npsp_pack__Receipt_Number__c`)     | Text field     | Receipt or transaction reference number    | Commerce Order Mapping Flow |

## OpportunityLineItem Object

### Standard Fields

| Field Name       | Type                     | Purpose                           | Source Flows                          |
| ---------------- | ------------------------ | --------------------------------- | ------------------------------------- |
| Id               | ID field                 | Unique record identifier          | Commerce Order Item Record Match Flow |
| OpportunityId    | Lookup to Opportunity    | Associated opportunity record     | Commerce Order Item Mapping Flow      |
| PricebookEntryId | Lookup to PricebookEntry | Associated pricebook entry record | Commerce Order Item Mapping Flow      |
| Quantity         | Number field             | Quantity of the product/service   | Commerce Order Item Mapping Flow      |
| UnitPrice        | Currency field           | Price per unit                    | Commerce Order Item Mapping Flow      |
| TotalPrice       | Currency field           | Total price for the line item     | Commerce Order Item Mapping Flow      |

### Custom Fields

| Field Name                       | Type       | Purpose                             | Source Flows                                                            |
| -------------------------------- | ---------- | ----------------------------------- | ----------------------------------------------------------------------- |
| Platform Key (`Platform_Key__c`) | Text field | Stores external platform identifier | Commerce Order Item Record Match Flow, Commerce Order Item Mapping Flow |
