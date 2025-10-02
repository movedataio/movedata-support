# Fields and Objects

## Account Object

### Standard Fields

| Field Name | Type           | Purpose                              | Source Flows                                |
| ---------- | -------------- | ------------------------------------ | ------------------------------------------- |
| Name       | Text field     | Account name identifier              | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| Phone      | Phone field    | Primary phone number for the account | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| PersonEmail | Email field   | Email address for person accounts    | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| RecordTypeId | Lookup to RecordType | Record type identifier        | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| Id         | ID field       | Unique record identifier             | [Account Record Match Flow](../flows-accounts/account-record-match-flow.md), [Account Post-Upsert Flow](../flows-accounts/account-post-upsert-flow.md) |

### Billing Address Fields

| Field Name        | Type           | Purpose                             | Source Flows                |
| ----------------- | -------------- | ----------------------------------- | --------------------------- |
| BillingStreet     | Textarea field | Street address for billing          | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| BillingCity       | Text field     | City for billing address            | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| BillingState      | Text field     | State/Province for billing address  | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| BillingCountry    | Text field     | Country for billing address         | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| BillingPostalCode | Text field     | Postal/ZIP code for billing address | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |

### Shipping Address Fields

| Field Name         | Type           | Purpose                              | Source Flows                |
| ------------------ | -------------- | ------------------------------------ | --------------------------- |
| ShippingStreet     | Textarea field | Street address for shipping          | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| ShippingCity       | Text field     | City for shipping address            | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| ShippingState      | Text field     | State/Province for shipping address  | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| ShippingCountry    | Text field     | Country for shipping address         | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| ShippingPostalCode | Text field     | Postal/ZIP code for shipping address | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                         | Source Flows         |
| ------------------------------------------ | -------------- | --------------------------------------------------------------- | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to the account name when set to true | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |

## Platform Key Objects

### Account Platform Key (`movedata__Account_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | [Account Platform Key Flow](../flows-accounts/account-platform-key-flow.md), [Account Post-Upsert Flow](../flows-accounts/account-post-upsert-flow.md) |

**Object Purpose:** Custom Object - Links Account records to external platform identifiers
**Source Flows:** Account Platform Key Flow, Account Post-Upsert Flow

## RecordType Object

### Standard Fields

| Field Name    | Type       | Purpose                                | Source Flows              |
| ------------- | ---------- | -------------------------------------- | ------------------------- |
| Id            | ID field   | Unique record type identifier          | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| DeveloperName | Text field | API name of the record type            | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |
| SobjectType   | Text field | Object type the record type applies to | [Account Mapping Flow](../flows-accounts/account-mapping-flow.md) |

**Object Purpose:** Standard Object - Defines different record types for Account object
**Source Flows:** Account Mapping Flow

## Contact Object (Person Accounts)

### Standard Fields

| Field Name | Type           | Purpose                              | Source Flows                                |
| ---------- | -------------- | ------------------------------------ | ------------------------------------------- |
| Id         | ID field       | Unique record identifier             | [Contact Record Match Flow](../flows-contacts/contact-record-match-flow.md), [Contact Post-Upsert Flow](../flows-contacts/contact-post-upsert-flow.md) |
| FirstName  | Text field (40 characters max) | Contact's first name          | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| LastName   | Text field (80 characters max) | Contact's last name (required field) | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| Salutation | Picklist field | Contact's title/salutation (Mr., Ms., Dr., etc.) | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonBirthdate | Date field | Contact's birth date                | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonEmail | Email field   | Primary email address               | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| Phone      | Phone field (40 characters max) | Primary phone number         | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| RecordTypeId | Lookup to RecordType | Record type identifier        | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| AccountId  | Lookup to Account | Links contact to associated account | [Contact Post-Upsert Flow](../flows-contacts/contact-post-upsert-flow.md) |

### Person Mailing Address Fields

| Field Name                | Type           | Purpose                             | Source Flows                |
| ------------------------- | -------------- | ----------------------------------- | --------------------------- |
| PersonMailingStreet       | Textarea field (255 characters max) | Street address for mailing | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonMailingCity         | Text field (40 characters max) | City for mailing address     | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonMailingState        | Text field (80 characters max) | State/Province for mailing address | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonMailingCountry      | Text field (80 characters max) | Country for mailing address | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonMailingPostalCode   | Text field (20 characters max) | Postal/ZIP code for mailing address | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |

### Person Other Address Fields

| Field Name              | Type           | Purpose                            | Source Flows                |
| ----------------------- | -------------- | ---------------------------------- | --------------------------- |
| PersonOtherStreet       | Textarea field (255 characters max) | Alternative street address | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonOtherCity         | Text field (40 characters max) | Alternative city address    | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonOtherState        | Text field (80 characters max) | Alternative state/province address | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonOtherCountry      | Text field (80 characters max) | Alternative country address | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |
| PersonOtherPostalCode   | Text field (20 characters max) | Alternative postal/ZIP code | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                      | Source Flows         |
| ------------------------------------------ | -------------- | ------------------------------------------------------------ | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to contact names when set to true | [Contact Mapping Flow](../flows-contacts/contact-mapping-flow.md) |

## Contact Platform Key Objects

### Contact Platform Key (`movedata__Contact_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | [Contact Platform Key Flow](../flows-contacts/contact-platform-key-flow.md), [Contact Post-Upsert Flow](../flows-contacts/contact-post-upsert-flow.md) |

**Object Purpose:** Custom Object - Links Contact records to external platform identifiers
**Source Flows:** Contact Platform Key Flow, Contact Post-Upsert Flow

## AccountContactRelation Object

### Standard Fields

| Field Name | Type                  | Purpose                           | Source Flows              |
| ---------- | --------------------- | --------------------------------- | ------------------------- |
| Id         | ID field              | Unique relationship identifier    | [Contact Post-Upsert Flow](../flows-contacts/contact-post-upsert-flow.md) |
| AccountId  | Lookup to Account     | Account side of the relationship  | [Contact Post-Upsert Flow](../flows-contacts/contact-post-upsert-flow.md) |
| ContactId  | Lookup to Contact     | Contact side of the relationship  | [Contact Post-Upsert Flow](../flows-contacts/contact-post-upsert-flow.md) |
| Roles      | Picklist field        | Business relationship role classification | [Contact Post-Upsert Flow](../flows-contacts/contact-post-upsert-flow.md) |

**Object Purpose:** Standard Object - Manages relationships between Account and Contact records
**Source Flows:** Contact Post-Upsert Flow

## Campaign Object

### Standard Fields

| Field Name      | Type                           | Purpose                                                       | Source Flows                                                     |
| --------------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Id              | ID field                       | Unique record identifier                                      | [Campaign Record Match Flow](../flows-campaigns/campaign-record-match-flow.md), [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| Name            | Text field (80 characters max) | Campaign name identifier                                      | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaigns/campaign-name-flow.md) |
| IsActive        | Checkbox field                 | Indicates if the campaign is currently active                 | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Status          | Picklist field                 | Current status of the campaign                                | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Type            | Picklist field                 | Categorizes the type of campaign                              | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| ParentId        | Lookup to Campaign             | Links to parent campaign for hierarchical campaign structures | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md), [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| ExpectedRevenue | Currency field                 | Target fundraising amount for the campaign                    | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| StartDate       | Date field                     | Campaign start date                                           | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| EndDate         | Date field                     | Campaign end date                                             | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Description     | Long Text Area field           | Detailed campaign description                                 | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |

### Custom Fields

| Field Name                                                       | Type           | Purpose                                                                         | Source Flows                                      |
| ---------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| Platform (`movedata__Platform__c`)                               | Text field     | Identifies the external platform or system source                               | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Platform Key (`movedata__Platform_Key__c`)                       | Text field     | Stores unique external platform identifier                                      | [Campaign Record Match Flow](../flows-campaigns/campaign-record-match-flow.md), [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Protect Name (`movedata__Protect_Name__c`)                       | Checkbox field | Prevents automatic updates to the campaign name when set to true                | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md), [Campaign Name Flow](../flows-campaigns/campaign-name-flow.md) |
| Protect Campaign Parent (`movedata__Protect_Campaign_Parent__c`) | Checkbox field | Prevents automatic updates to the parent campaign relationship when set to true | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Campaign Code (`movedata__Campaign_Code__c`)                     | Text field     | Short code identifier for campaign naming conventions                           | [Campaign Name Flow](../flows-campaigns/campaign-name-flow.md) |

### Extension Custom Fields

| Field Name                                                   | Type                                  | Purpose                                                     | Source Flows                     |
| ------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| Campaign URL (`md_npsp_pack__Campaign_URL__c`)               | URL field                             | Stores the web address for online campaign pages            | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Fundraising Account (`md_npsp_pack__Fundraising_Account__c`) | Lookup relationship to Account object | Associates campaigns with organizational fundraisers        | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |
| Fundraising Contact (`md_npsp_pack__Fundraising_Contact__c`) | Lookup relationship to Contact object | Identifies individual fundraising champions or coordinators | [Campaign Mapping Flow](../flows-campaigns/campaign-mapping-flow.md) |

## CampaignMember Object

### Standard Fields

| Field Name | Type              | Purpose                               | Source Flows              |
| ---------- | ----------------- | ------------------------------------- | ------------------------- |
| Id         | ID field          | Unique campaign member identifier     | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| CampaignId | Lookup to Campaign | Links member to campaign             | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| ContactId  | Lookup to Contact | Links member to contact              | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| Status     | Picklist field    | Member status within the campaign    | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |

**Object Purpose:** Standard Object - Manages contact membership and participation in campaigns
**Source Flows:** Campaign Post-Upsert Flow

## CampaignMemberStatus Object

### Standard Fields

| Field Name | Type              | Purpose                                | Source Flows              |
| ---------- | ----------------- | -------------------------------------- | ------------------------- |
| Id         | ID field          | Unique member status identifier        | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| CampaignId | Lookup to Campaign | Links status to campaign              | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| Label      | Text field        | Display name for the member status     | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| SortOrder  | Number field      | Determines display order of statuses   | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |
| IsDefault  | Checkbox field    | Indicates if this is the default status | [Campaign Post-Upsert Flow](../flows-campaigns/campaign-post-upsert-flow.md) |

**Object Purpose:** Standard Object - Defines available statuses for campaign members
**Source Flows:** Campaign Post-Upsert Flow

## GiftCommitment Object

### Standard Fields

| Field Name          | Type                  | Purpose                                 | Source Flows                                |
| ------------------- | --------------------- | --------------------------------------- | ------------------------------------------- |
| Id                  | ID field              | Unique record identifier                | [Recurring Record Match Flow](../flows-recurring-donations/recurring-record-match-flow.md), [Recurring Post-Upsert Flow](../flows-recurring-donations/recurring-post-upsert-flow.md) |
| Name                | Text field            | Generated name for the gift commitment  | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |
| DonorId             | Lookup to Account     | Primary donor (Contact or Account)      | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |
| CampaignId          | Lookup to Campaign    | Associated campaign for the recurring donation | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md), [Recurring Post-Upsert Flow](../flows-recurring-donations/recurring-post-upsert-flow.md) |
| EffectiveStartDate  | Date field            | Date the recurring donation starts      | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |
| Status              | Picklist field        | Current status of the recurring donation | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md), [Recurring Post-Upsert Flow](../flows-recurring-donations/recurring-post-upsert-flow.md) |
| ScheduleType        | Picklist field        | Type of schedule (set to "Recurring")   | [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |

### Custom Fields

| Field Name                                 | Type       | Purpose                                         | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------------------- | ------------------------- |
| Platform Key (`Platform_Key__c`)           | Text field | Stores external platform identifier for matching | [Recurring Record Match Flow](../flows-recurring-donations/recurring-record-match-flow.md), [Recurring Mapping Flow](../flows-recurring-donations/recurring-mapping-flow.md) |

**Object Purpose:** Standard Object - Manages recurring donation commitments in Non-Profit Cloud
**Source Flows:** Recurring Platform Key Flow, Recurring Record Match Flow, Recurring Mapping Flow, Recurring Post-Upsert Flow

## GiftCommitmentSchedule Object

### Standard Fields

| Field Name      | Type              | Purpose                               | Source Flows              |
| --------------- | ----------------- | ------------------------------------- | ------------------------- |
| Id              | ID field          | Gift commitment schedule identifier   | [Recurring Post-Upsert Flow](../flows-recurring-donations/recurring-post-upsert-flow.md) |
| CampaignId      | Lookup to Campaign | Schedule-specific campaign           | [Recurring Post-Upsert Flow](../flows-recurring-donations/recurring-post-upsert-flow.md) |

**Object Purpose:** Standard Object - Manages Gift Commitment Schedules for recurring donations
**Source Flows:** Recurring Post-Upsert Flow

## GiftTransaction Object

### Standard Fields

| Field Name                      | Type                  | Purpose                                         | Source Flows                                |
| ------------------------------- | --------------------- | ----------------------------------------------- | ------------------------------------------- |
| Id                              | ID field              | Unique record identifier                        | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| Name                            | Text field            | Generated name for the gift transaction         | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| DonorId                         | Lookup to Account     | Primary donor (Contact or Account)              | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| CampaignId                      | Lookup to Campaign    | Associated campaign for the donation            | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| GiftCommitmentId                | Lookup to GiftCommitment | Associated recurring donation commitment     | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| GiftCommitmentScheduleId        | Lookup to GiftCommitmentSchedule | Associated commitment schedule         | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| OriginalAmount                  | Currency field        | Original donation amount before adjustments     | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| CurrentAmount                   | Currency field        | Current donation amount after refunds           | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| Status                          | Picklist field        | Current status of the donation transaction      | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md), [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| TransactionDate                 | Date field            | Date the transaction occurred                   | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| TransactionDueDate              | Date field            | Date the transaction was due                    | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| PaymentMethod                   | Picklist field        | Payment method used (Credit Card, PayPal, etc.) | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| PaymentIdentifier               | Text field            | External payment/receipt identifier             | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| GiftType                        | Picklist field        | Type of gift (Individual, Organizational)       | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| Description                     | Long Text Area field  | Donation message or description                 | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| DonorCoverAmount               | Currency field        | Amount donor covered for platform fees          | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| GatewayTransactionFee          | Currency field        | Gateway processing fee                          | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| GatewayReference               | Text field            | Gateway transaction reference                   | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| ProcessorTransactionFee        | Currency field        | Processor transaction fee                       | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| OutreachSourceCodeId           | Lookup to OutreachSourceCode | Marketing source code reference           | [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |
| MatchingEmployerTransactionId  | Lookup to GiftTransaction | Reference to employer matching transaction    | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |

### Custom Fields

| Field Name                                 | Type       | Purpose                                         | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------------------- | ------------------------- |
| Platform Key (`Platform_Key__c`)           | Text field | Stores external platform identifier for matching | [Donation Record Match Flow](../flows-donations/donation-record-match-flow.md), [Donation Mapping Flow](../flows-donations/donation-mapping-flow.md) |

**Object Purpose:** Standard Object - Manages donation transactions in Non-Profit Cloud
**Source Flows:** Donation Platform Key Flow, Donation Record Match Flow, Donation Mapping Flow, Donation Post-Upsert Flow

## GiftRefund Object

### Standard Fields

| Field Name              | Type                     | Purpose                                    | Source Flows              |
| ----------------------- | ------------------------ | ------------------------------------------ | ------------------------- |
| Id                      | ID field                 | Unique refund identifier                   | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| GiftTransactionId       | Lookup to GiftTransaction | Links refund to original donation transaction | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| Amount                  | Currency field           | Refund amount                              | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| Date                    | Date field               | Date the refund was processed              | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| Status                  | Picklist field           | Refund status (typically "Completed")      | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| ProcessorTransactionFee | Currency field           | Processor fee for the refund               | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |

**Object Purpose:** Standard Object - Manages refunds for donation transactions
**Source Flows:** Donation Post-Upsert Flow

## GiftTribute Object

### Standard Fields

| Field Name              | Type                     | Purpose                                    | Source Flows              |
| ----------------------- | ------------------------ | ------------------------------------------ | ------------------------- |
| Id                      | ID field                 | Unique tribute identifier                  | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| GiftTransactionId       | Lookup to GiftTransaction | Links tribute to donation transaction     | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| TributeType             | Picklist field           | Type of tribute (Honor, Memorial)          | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| HonoreeContactId        | Lookup to Contact        | Contact being honored/memorialized         | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| HonoreeName             | Text field               | Name of person being honored/memorialized  | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| NotificationContactId   | Lookup to Contact        | Contact to notify about the tribute        | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| NotificationContactName | Text field               | Name of contact to notify                  | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |
| NotificationEmail       | Email field              | Email address for tribute notification     | [Donation Post-Upsert Flow](../flows-donations/donation-post-upsert-flow.md) |

**Object Purpose:** Standard Object - Manages tribute donations (in honor/memory of someone)
**Source Flows:** Donation Post-Upsert Flow

## Product2 Object

### Standard Fields

| Field Name          | Type              | Purpose                                    | Source Flows                                |
| ------------------- | ----------------- | ------------------------------------------ | ------------------------------------------- |
| Id                  | ID field          | Unique record identifier                   | [Catalog Record Match Flow](../flows-catalog/catalog-record-match-flow.md), [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Name                | Text field        | Product name                               | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md), [Catalog Name Flow](../flows-catalog/catalog-name-flow.md) |
| ProductCode         | Text field        | Product code identifier                    | [Catalog Record Match Flow](../flows-catalog/catalog-record-match-flow.md), [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| StockKeepingUnit    | Text field        | Product SKU identifier                     | [Catalog Record Match Flow](../flows-catalog/catalog-record-match-flow.md), [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| Description         | Long Text Area field | Product description                     | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| IsActive            | Checkbox field    | Indicates if the product is active         | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |

### Custom Fields

| Field Name                                 | Type           | Purpose                                         | Source Flows              |
| ------------------------------------------ | -------------- | ----------------------------------------------- | ------------------------- |
| Platform Key (`Platform_Key__c`)           | Text field     | Stores external platform identifier for matching | [Catalog Record Match Flow](../flows-catalog/catalog-record-match-flow.md), [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |
| Protect Name (`Protect_Name__c`)           | Checkbox field | Prevents automatic updates to the product name when set to true | [Catalog Mapping Flow](../flows-catalog/catalog-mapping-flow.md) |

**Object Purpose:** Standard Object - Manages product catalog in Salesforce Commerce
**Source Flows:** Catalog Platform Key Flow, Catalog Record Match Flow, Catalog Name Flow, Catalog Mapping Flow, Catalog Post-Upsert Flow

## PricebookEntry Object

### Standard Fields

| Field Name         | Type                   | Purpose                                    | Source Flows              |
| ------------------ | ---------------------- | ------------------------------------------ | ------------------------- |
| Id                 | ID field               | Unique pricebook entry identifier          | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Product2Id         | Lookup to Product2     | Links entry to product                     | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Pricebook2Id       | Lookup to Pricebook2   | Links entry to pricebook                   | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| UnitPrice          | Currency field         | Product price in the pricebook             | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| IsActive           | Checkbox field         | Indicates if the entry is active           | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| UseStandardPrice   | Checkbox field         | Uses standard price if true                | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| ProductCode        | Text field             | Product code from related product          | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |
| Name               | Text field             | Entry name from related product            | [Catalog Post-Upsert Flow](../flows-catalog/catalog-post-upsert-flow.md) |

**Object Purpose:** Standard Object - Manages product pricing in pricebooks
**Source Flows:** Catalog Post-Upsert Flow

## Opportunity Object (Commerce Orders)

### Standard Fields

| Field Name    | Type              | Purpose                                      | Source Flows                                |
| ------------- | ----------------- | -------------------------------------------- | ------------------------------------------- |
| Id            | ID field          | Unique record identifier                     | [Commerce Order Record Match Flow](../flows-orders/order-record-match-flow.md), [Commerce Order Final Flow](../flows-orders/order-finaliser-flow.md) |
| Name          | Text field        | Order name identifier                        | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md), [Commerce Order Final Flow](../flows-orders/order-finaliser-flow.md) |
| Amount        | Currency field    | Total order amount                           | [Commerce Order Final Flow](../flows-orders/order-finaliser-flow.md) |
| AccountId     | Lookup to Account | Associated account for the order             | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md), [Commerce Order Final Flow](../flows-orders/order-finaliser-flow.md) |
| StageName     | Picklist field    | Current stage of the opportunity             | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md), [Commerce Order Final Flow](../flows-orders/order-finaliser-flow.md) |
| CloseDate     | Date field        | Order close/completion date                  | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| CampaignId    | Lookup to Campaign | Associated campaign for the order           | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Description   | Long Text Area field | Order description or notes                 | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Pricebook2Id  | Lookup to Pricebook2 | Associated pricebook for the order        | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| RecordTypeId  | Lookup to RecordType | Record type identifier                     | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| CurrencyIsoCode | Picklist field   | Currency code for the order                  | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |

### Custom Fields

| Field Name                                 | Type       | Purpose                                         | Source Flows              |
| ------------------------------------------ | ---------- | ----------------------------------------------- | ------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier for matching | [Commerce Order Record Match Flow](../flows-orders/order-record-match-flow.md), [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |

### NPSP Extension Fields

| Field Name                                     | Type                  | Purpose                                    | Source Flows              |
| ---------------------------------------------- | --------------------- | ------------------------------------------ | ------------------------- |
| Primary Contact (`npsp__Primary_Contact__c`)  | Lookup to Contact     | Primary contact for the opportunity        | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |

### MoveData NPSP Extension Fields

| Field Name                                       | Type           | Purpose                                  | Source Flows              |
| ------------------------------------------------ | -------------- | ---------------------------------------- | ------------------------- |
| Fee (`md_npsp_pack__Fee__c`)                     | Currency field | Total fee amount                         | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Platform Fee (`md_npsp_pack__Platform_Fee__c`)  | Currency field | Platform fee amount                      | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Gateway Fee (`md_npsp_pack__Gateway_Fee__c`)    | Currency field | Gateway processing fee                   | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Tax (`md_npsp_pack__Tax__c`)                     | Currency field | Tax amount                               | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Platform Fee Tax (`md_npsp_pack__Platform_Fee_Tax__c`) | Currency field | Tax on platform fee               | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Gateway Fee Tax (`md_npsp_pack__Gateway_Fee_Tax__c`)   | Currency field | Tax on gateway fee                | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |
| Receipt Number (`md_npsp_pack__Receipt_Number__c`)     | Text field     | Receipt identifier                | [Commerce Order Mapping Flow](../flows-orders/order-mapping-flow.md) |

**Object Purpose:** Standard Object - Manages commerce orders as opportunities in Salesforce
**Source Flows:** Commerce Order Platform Key Flow, Commerce Order Record Match Flow, Commerce Order Mapping Flow, Commerce Order Final Flow

## OpportunityLineItem Object (Order Items)

### Standard Fields

| Field Name        | Type                     | Purpose                                    | Source Flows                                |
| ----------------- | ------------------------ | ------------------------------------------ | ------------------------------------------- |
| Id                | ID field                 | Unique line item identifier                | [Commerce Order Item Record Match Flow](../flows-orders/order-item-record-match-flow.md) |
| OpportunityId     | Lookup to Opportunity    | Links line item to order                   | [Commerce Order Item Mapping Flow](../flows-orders/order-item-mapping-flow.md) |
| PricebookEntryId  | Lookup to PricebookEntry | Links to product pricing information       | [Commerce Order Item Mapping Flow](../flows-orders/order-item-mapping-flow.md) |
| Quantity          | Number field             | Quantity of product ordered                | [Commerce Order Item Mapping Flow](../flows-orders/order-item-mapping-flow.md) |
| UnitPrice         | Currency field           | Price per unit                             | [Commerce Order Item Mapping Flow](../flows-orders/order-item-mapping-flow.md) |
| TotalPrice        | Currency field           | Total price for the line item              | [Commerce Order Item Mapping Flow](../flows-orders/order-item-mapping-flow.md) |

### Custom Fields

| Field Name                        | Type       | Purpose                                         | Source Flows              |
| --------------------------------- | ---------- | ----------------------------------------------- | ------------------------- |
| Platform Key (`Platform_Key__c`) | Text field | Stores external platform identifier for matching | [Commerce Order Item Record Match Flow](../flows-orders/order-item-record-match-flow.md), [Commerce Order Item Mapping Flow](../flows-orders/order-item-mapping-flow.md) |

**Object Purpose:** Standard Object - Manages individual items within commerce orders
**Source Flows:** Commerce Order Item Platform Key Flow, Commerce Order Item Record Match Flow, Commerce Order Item Mapping Flow
