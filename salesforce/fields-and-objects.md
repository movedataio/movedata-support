# Fields and Objects

## Account Object

### Standard Fields

| Field Name | Type           | Purpose                              | Source Flows                                |
| ---------- | -------------- | ------------------------------------ | ------------------------------------------- |
| Name       | Text field     | Account name identifier              | [Account Mapping Flow](../flows-account/account-mapping-flow.md) |
| Phone      | Phone field    | Primary phone number for the account | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| Website    | URL field      | Account's primary website URL        | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| Type       | Picklist field | Categorizes the type of account      | [Account Details Helper Flow](../flows-account/account-details-helper-flow.md) |
| Id         | ID field       | Unique record identifier             | [Account Record Match Flow](../flows-account/account-record-match-flow.md), [Account Post-Upsert Flow](../flows-account/account-post-upsert-flow.md) |

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

| Field Name | Type           | Purpose                              | Source Flows                                |
| ---------- | -------------- | ------------------------------------ | ------------------------------------------- |
| Id         | ID field       | Unique record identifier             | [Contact Record Match Flow](../flows-contact/contact-record-match-flow.md), [Contact Post-Upsert Flow](../flows-contact/contact-post-upsert-flow.md) |
| FirstName  | Text field (40 characters max) | Contact's first name                 | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| LastName   | Text field (80 characters max) | Contact's last name (required field) | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| Name       | Formula field  | Full name combining FirstName and LastName | System-generated |
| Salutation | Picklist field | Contact's title/salutation (Mr., Ms., Dr., etc.) | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| Birthdate  | Date field     | Contact's birth date                 | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| Email      | Email field (80 characters max) | Primary email address                | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| Phone      | Phone field (40 characters max) | Primary phone number                 | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| HomePhone  | Phone field (40 characters max) | Home phone number                    | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| MobilePhone | Phone field (40 characters max) | Mobile phone number                 | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| AccountId  | Lookup to Account | Links contact to associated account  | Contact Platform Key Helper Flow |

### Mailing Address Fields

| Field Name        | Type                                | Purpose                             | Source Flows                |
| ----------------- | ----------------------------------- | ----------------------------------- | --------------------------- |
| MailingStreet     | Textarea field (255 characters max) | Street address for mailing          | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| MailingCity       | Text field (40 characters max)      | City for mailing address            | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| MailingState      | Text field (80 characters max)      | State/Province for mailing address  | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| MailingCountry    | Text field (80 characters max)      | Country for mailing address         | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |
| MailingPostalCode | Text field (20 characters max)      | Postal/ZIP code for mailing address | [Contact Details Helper Flow](../flows-contact/contact-details-helper-flow.md) |

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
| Do Not Contact (`npsp__Do_Not_Contact__c`) | Checkbox field                  | Flags contacts who should not be contacted | Contact Mapping Flow |
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
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | [Account Platform Key Helper Flow](../flows-account/account-platform-key-helper-flow.md) |

**Object Purpose:** Custom Object - Links Account records to external platform identifiers  
**Source Flows:** Account Platform Key Helper Flow

### Contact Platform Key (`movedata__Contact_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | [Contact Platform Key Helper Flow](../flows-contact/contact-platform-key-helper-flow.md) |

**Object Purpose:** Custom Object - Links Contact records to external platform identifiers  
**Source Flows:** Contact Platform Key Helper Flow

## Campaign Object

### Standard Fields

| Field Name      | Type                           | Purpose                                                       | Source Flows                                                     |
| --------------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Id              | ID field                       | Unique record identifier                                      | [Campaign Record Match Flow](../flows-campaign/campaign-record-match-flow.md), [Campaign Post-Upsert Flow](../flows-campaign/campaign-post-upsert-flow.md) |
| Name            | Text field (80 characters max) | Campaign name identifier                                      | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaign/campaign-name-flow.md) |
| IsActive        | Checkbox field                 | Indicates if the campaign is currently active                 | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Status          | Picklist field                 | Current status of the campaign                                | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Type            | Picklist field                 | Categorizes the type of campaign                              | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| ParentId        | Lookup to Campaign             | Links to parent campaign for hierarchical campaign structures | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| ExpectedRevenue | Currency field                 | Target fundraising amount for the campaign                    | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| StartDate       | Date field                     | Campaign start date                                           | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| EndDate         | Date field                     | Campaign end date                                             | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Description     | Long Text Area field           | Detailed campaign description                                 | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |

### Custom Fields

| Field Name                                                       | Type           | Purpose                                                                         | Source Flows                                      |
| ---------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| Platform (`movedata__Platform__c`)                               | Text field     | Identifies the external platform or system source                               | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Platform Key (`movedata__Platform_Key__c`)                       | Text field     | Stores unique external platform identifier                                      | [Campaign Record Match Flow](../flows-campaign/campaign-record-match-flow.md), [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Protect Name (`movedata__Protect_Name__c`)                       | Checkbox field | Prevents automatic updates to the campaign name when set to true                | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaign/campaign-name-flow.md) |
| Protect Campaign Parent (`movedata__Protect_Campaign_Parent__c`) | Checkbox field | Prevents automatic updates to the parent campaign relationship when set to true | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Campaign Code (`movedata__Campaign_Code__c`)                     | Text field     | Short code identifier for campaign naming conventions                           | [Campaign Name Flow](../flows-campaign/campaign-name-flow.md) |

### Extension Custom Fields

| Field Name                                                   | Type                                  | Purpose                                                     | Source Flows                     |
| ------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| Campaign URL (`md_npsp_pack__Campaign_URL__c`)               | URL field                             | Stores the web address for online campaign pages            | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Fundraising Account (`md_npsp_pack__Fundraising_Account__c`) | Lookup relationship to Account object | Associates campaigns with organizational fundraisers        | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |
| Fundraising Contact (`md_npsp_pack__Fundraising_Contact__c`) | Lookup relationship to Contact object | Identifies individual fundraising champions or coordinators | [Campaign Mapping Flow](../flows-campaign/campaign-mapping-flow.md) |

## Product2 Object

### Standard Fields

| Field Name           | Type                            | Purpose                              | Source Flows                                |
| -------------------- | ------------------------------- | ------------------------------------ | ------------------------------------------- |
| Id                   | ID field                        | Unique record identifier             | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Name                 | Text field (255 characters max) | Product name identifier              | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md), [Catalog Name Flow](../flows-catalog/catalog-name-flow.md) |
| ProductCode          | Text field (255 characters max) | Product code for identification      | [Catalog Record Match Flow](../flows-catalog/catalog-record-match-flow.md), [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| Description          | Long Text Area field            | Product description                  | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| IsActive             | Checkbox field                  | Indicates if the product is active   | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| StockKeepingUnit     | Text field (180 characters max) | SKU for inventory management         | [Catalog Record Match Flow](../flows-catalog/catalog-record-match-flow.md), [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |

### Custom Fields

| Field Name                          | Type           | Purpose                                                     | Source Flows         |
| ----------------------------------- | -------------- | ----------------------------------------------------------- | -------------------- |
| Platform Key (`Platform_Key__c`)    | Text field     | Stores external platform identifier                        | [Catalog Record Match Flow](../flows-catalog/catalog-record-match-flow.md), [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| Protect Name (`Protect_Name__c`)    | Checkbox field | Prevents automatic updates to the product name when set to true | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |

## PricebookEntry Object

### Standard Fields

| Field Name       | Type                              | Purpose                              | Source Flows                                |
| ---------------- | --------------------------------- | ------------------------------------ | ------------------------------------------- |
| Id               | ID field                          | Unique record identifier             | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| IsActive         | Checkbox field                    | Indicates if the pricebook entry is active | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| UnitPrice        | Currency field (18 digits, 2 decimal places) | Price for the product                | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Product2Id       | Lookup to Product2                | Associated product record            | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Pricebook2Id     | Lookup to Pricebook2              | Associated pricebook record          | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| UseStandardPrice | Checkbox field                    | Whether to use standard pricing      | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| ProductCode      | Formula field                     | Product code from associated product | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Name             | Formula field                     | Product name from associated product | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |

## Opportunity Object

### Standard Fields

| Field Name       | Type                              | Purpose                              | Source Flows                                |
| ---------------- | --------------------------------- | ------------------------------------ | ------------------------------------------- |
| Id               | ID field                          | Unique record identifier             | [Commerce Order Record Match Flow](../flows-order/commerce-order-record-match-flow.md), [Commerce Order Finaliser Flow](../flows-order/commerce-order-finaliser-flow.md) |
| Name             | Text field (120 characters max)  | Opportunity name identifier          | [Commerce Order Finaliser Flow](../flows-order/commerce-order-finaliser-flow.md), [Commerce Order Name Flow](../flows-order/commerce-order-name-flow.md) |
| StageName        | Picklist field                    | Current stage of the opportunity     | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md), [Commerce Order Finaliser Flow](../flows-order/commerce-order-finaliser-flow.md) |
| CloseDate        | Date field                        | Expected or actual close date        | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Amount           | Currency field                    | Opportunity amount/value             | [Commerce Order Finaliser Flow](../flows-order/commerce-order-finaliser-flow.md) |
| AccountId        | Lookup to Account                 | Associated account record            | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| CampaignId       | Lookup to Campaign                | Associated campaign record           | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Description      | Long Text Area field              | Opportunity description              | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Pricebook2Id     | Lookup to Pricebook2              | Associated pricebook record          | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| RecordTypeId     | Lookup to RecordType              | Record type identifier               | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| CurrencyIsoCode  | Picklist field                    | Currency code for the opportunity    | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |

### NPSP Custom Fields

| Field Name                                       | Type           | Purpose                                    | Source Flows                |
| ------------------------------------------------ | -------------- | ------------------------------------------ | --------------------------- |
| Primary Contact (`npsp__Primary_Contact__c`)    | Lookup to Contact | Links to primary contact for the opportunity | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |

### Custom Fields

| Field Name                                       | Type           | Purpose                                                | Source Flows         |
| ------------------------------------------------ | -------------- | ------------------------------------------------------ | -------------------- |
| Platform Key (`movedata__Platform_Key__c`)      | Text field     | Stores external platform identifier                   | [Commerce Order Record Match Flow](../flows-order/commerce-order-record-match-flow.md), [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |

### Extension Custom Fields

| Field Name                                       | Type           | Purpose                                    | Source Flows                |
| ------------------------------------------------ | -------------- | ------------------------------------------ | --------------------------- |
| Fee (`md_npsp_pack__Fee__c`)                     | Currency field | Total fees associated with the opportunity | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Gateway Fee (`md_npsp_pack__Gateway_Fee__c`)     | Currency field | Payment gateway processing fees            | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Platform Fee (`md_npsp_pack__Platform_Fee__c`)  | Currency field | Platform-specific processing fees         | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Tax (`md_npsp_pack__Tax__c`)                     | Currency field | Tax amount for the opportunity             | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Platform Fee Tax (`md_npsp_pack__Platform_Fee_Tax__c`) | Currency field | Tax on platform fees                | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Gateway Fee Tax (`md_npsp_pack__Gateway_Fee_Tax__c`) | Currency field | Tax on gateway fees                  | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |
| Receipt Number (`md_npsp_pack__Receipt_Number__c`) | Text field   | Receipt or transaction reference number    | [Commerce Order Mapping Flow](../flows-order/commerce-order-mapping-flow.md) |

## OpportunityLineItem Object

### Standard Fields

| Field Name       | Type                              | Purpose                              | Source Flows                                |
| ---------------- | --------------------------------- | ------------------------------------ | ------------------------------------------- |
| Id               | ID field                          | Unique record identifier             | [Commerce Order Item Record Match Flow](../flows-order/commerce-order-item-record-match-flow.md) |
| OpportunityId    | Lookup to Opportunity             | Associated opportunity record        | [Commerce Order Item Mapping Flow](../flows-order/commerce-order-item-mapping-flow.md) |
| PricebookEntryId | Lookup to PricebookEntry          | Associated pricebook entry record    | [Commerce Order Item Mapping Flow](../flows-order/commerce-order-item-mapping-flow.md) |
| Quantity         | Number field                      | Quantity of the product/service      | [Commerce Order Item Mapping Flow](../flows-order/commerce-order-item-mapping-flow.md) |
| UnitPrice        | Currency field                    | Price per unit                       | [Commerce Order Item Mapping Flow](../flows-order/commerce-order-item-mapping-flow.md) |
| TotalPrice       | Currency field                    | Total price for the line item        | [Commerce Order Item Mapping Flow](../flows-order/commerce-order-item-mapping-flow.md) |

### Custom Fields

| Field Name                           | Type       | Purpose                              | Source Flows         |
| ------------------------------------ | ---------- | ------------------------------------ | -------------------- |
| Platform Key (`Platform_Key__c`)    | Text field | Stores external platform identifier | [Commerce Order Item Record Match Flow](../flows-order/commerce-order-item-record-match-flow.md), [Commerce Order Item Mapping Flow](../flows-order/commerce-order-item-mapping-flow.md) |