# Fields and Objects

## Account Object

### Standard Fields

| Field Name   | Type                 | Purpose                              | Source Flows                                        |
| ------------ | -------------------- | ------------------------------------ | --------------------------------------------------- |
| Id           | ID field             | Unique record identifier             | Account Record Match Flow, Account Post-Upsert Flow |
| Name         | Text field           | Account name identifier              | Account Mapping Flow                                |
| Phone        | Phone field          | Primary phone number for the account | Account Mapping Flow                                |
| PersonEmail  | Email field          | Email address for person accounts    | Account Mapping Flow                                |
| RecordTypeId | Lookup to RecordType | Record type identifier               | Account Mapping Flow                                |

### Billing Address Fields

| Field Name        | Type           | Purpose                             | Source Flows         |
| ----------------- | -------------- | ----------------------------------- | -------------------- |
| BillingStreet     | Textarea field | Street address for billing          | Account Mapping Flow |
| BillingCity       | Text field     | City for billing address            | Account Mapping Flow |
| BillingState      | Text field     | State/Province for billing address  | Account Mapping Flow |
| BillingCountry    | Text field     | Country for billing address         | Account Mapping Flow |
| BillingPostalCode | Text field     | Postal/ZIP code for billing address | Account Mapping Flow |

### Shipping Address Fields

| Field Name         | Type           | Purpose                              | Source Flows         |
| ------------------ | -------------- | ------------------------------------ | -------------------- |
| ShippingStreet     | Textarea field | Street address for shipping          | Account Mapping Flow |
| ShippingCity       | Text field     | City for shipping address            | Account Mapping Flow |
| ShippingState      | Text field     | State/Province for shipping address  | Account Mapping Flow |
| ShippingCountry    | Text field     | Country for shipping address         | Account Mapping Flow |
| ShippingPostalCode | Text field     | Postal/ZIP code for shipping address | Account Mapping Flow |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                         | Source Flows         |
| ------------------------------------------ | -------------- | --------------------------------------------------------------- | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to the account name when set to true | Account Mapping Flow |

## Platform Key Objects

### Account Platform Key (`movedata__Account_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows                                        |
| ------------------------------------------ | ---------- | ----------------------------------- | --------------------------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | Account Platform Key Flow, Account Post-Upsert Flow |

**Object Purpose:** Custom Object - Links Account records to external platform identifiers **Source Flows:** Account Platform Key Flow, Account Post-Upsert Flow

## RecordType Object

### Standard Fields

| Field Name    | Type       | Purpose                                | Source Flows         |
| ------------- | ---------- | -------------------------------------- | -------------------- |
| Id            | ID field   | Unique record type identifier          | Account Mapping Flow |
| DeveloperName | Text field | API name of the record type            | Account Mapping Flow |
| SobjectType   | Text field | Object type the record type applies to | Account Mapping Flow |

**Object Purpose:** Standard Object - Defines different record types for Account object **Source Flows:** Account Mapping Flow

## Contact Object (Person Accounts)

### Standard Fields

| Field Name      | Type                            | Purpose                                          | Source Flows                                        |
| --------------- | ------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| Id              | ID field                        | Unique record identifier                         | Contact Record Match Flow, Contact Post-Upsert Flow |
| FirstName       | Text field (40 characters max)  | Contact's first name                             | Contact Mapping Flow                                |
| LastName        | Text field (80 characters max)  | Contact's last name (required field)             | Contact Mapping Flow                                |
| Salutation      | Picklist field                  | Contact's title/salutation (Mr., Ms., Dr., etc.) | Contact Mapping Flow                                |
| PersonBirthdate | Date field                      | Contact's birth date                             | Contact Mapping Flow                                |
| PersonEmail     | Email field                     | Primary email address                            | Contact Mapping Flow                                |
| Phone           | Phone field (40 characters max) | Primary phone number                             | Contact Mapping Flow                                |
| RecordTypeId    | Lookup to RecordType            | Record type identifier                           | Contact Mapping Flow                                |
| AccountId       | Lookup to Account               | Links contact to associated account              | Contact Post-Upsert Flow                            |

### Person Mailing Address Fields

| Field Name              | Type                                | Purpose                             | Source Flows         |
| ----------------------- | ----------------------------------- | ----------------------------------- | -------------------- |
| PersonMailingStreet     | Textarea field (255 characters max) | Street address for mailing          | Contact Mapping Flow |
| PersonMailingCity       | Text field (40 characters max)      | City for mailing address            | Contact Mapping Flow |
| PersonMailingState      | Text field (80 characters max)      | State/Province for mailing address  | Contact Mapping Flow |
| PersonMailingCountry    | Text field (80 characters max)      | Country for mailing address         | Contact Mapping Flow |
| PersonMailingPostalCode | Text field (20 characters max)      | Postal/ZIP code for mailing address | Contact Mapping Flow |

### Person Other Address Fields

| Field Name            | Type                                | Purpose                            | Source Flows         |
| --------------------- | ----------------------------------- | ---------------------------------- | -------------------- |
| PersonOtherStreet     | Textarea field (255 characters max) | Alternative street address         | Contact Mapping Flow |
| PersonOtherCity       | Text field (40 characters max)      | Alternative city address           | Contact Mapping Flow |
| PersonOtherState      | Text field (80 characters max)      | Alternative state/province address | Contact Mapping Flow |
| PersonOtherCountry    | Text field (80 characters max)      | Alternative country address        | Contact Mapping Flow |
| PersonOtherPostalCode | Text field (20 characters max)      | Alternative postal/ZIP code        | Contact Mapping Flow |

### Custom Fields

| Field Name                                 | Type           | Purpose                                                      | Source Flows         |
| ------------------------------------------ | -------------- | ------------------------------------------------------------ | -------------------- |
| Protect Name (`movedata__Protect_Name__c`) | Checkbox field | Prevents automatic updates to contact names when set to true | Contact Mapping Flow |

## Contact Platform Key Objects

### Contact Platform Key (`movedata__Contact_Platform_Key__c`)

| Field Name                                 | Type       | Purpose                             | Source Flows                                        |
| ------------------------------------------ | ---------- | ----------------------------------- | --------------------------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier | Contact Platform Key Flow, Contact Post-Upsert Flow |

**Object Purpose:** Custom Object - Links Contact records to external platform identifiers **Source Flows:** Contact Platform Key Flow, Contact Post-Upsert Flow

## AccountContactRelation Object

### Standard Fields

| Field Name | Type              | Purpose                                   | Source Flows             |
| ---------- | ----------------- | ----------------------------------------- | ------------------------ |
| Id         | ID field          | Unique relationship identifier            | Contact Post-Upsert Flow |
| AccountId  | Lookup to Account | Account side of the relationship          | Contact Post-Upsert Flow |
| ContactId  | Lookup to Contact | Contact side of the relationship          | Contact Post-Upsert Flow |
| Roles      | Picklist field    | Business relationship role classification | Contact Post-Upsert Flow |

**Object Purpose:** Standard Object - Manages relationships between Account and Contact records **Source Flows:** Contact Post-Upsert Flow

## Campaign Object

### Standard Fields

| Field Name      | Type                           | Purpose                                                       | Source Flows                                          |
| --------------- | ------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------- |
| Id              | ID field                       | Unique record identifier                                      | Campaign Record Match Flow, Campaign Post-Upsert Flow |
| Name            | Text field (80 characters max) | Campaign name identifier                                      | Campaign Mapping Flow, Campaign Name Flow             |
| IsActive        | Checkbox field                 | Indicates if the campaign is currently active                 | Campaign Mapping Flow                                 |
| Status          | Picklist field                 | Current status of the campaign                                | Campaign Mapping Flow                                 |
| Type            | Picklist field                 | Categorizes the type of campaign                              | Campaign Mapping Flow                                 |
| ParentId        | Lookup to Campaign             | Links to parent campaign for hierarchical campaign structures | Campaign Mapping Flow, Campaign Post-Upsert Flow      |
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

## CampaignMember Object

### Standard Fields

| Field Name | Type               | Purpose                           | Source Flows              |
| ---------- | ------------------ | --------------------------------- | ------------------------- |
| Id         | ID field           | Unique campaign member identifier | Campaign Post-Upsert Flow |
| CampaignId | Lookup to Campaign | Links member to campaign          | Campaign Post-Upsert Flow |
| ContactId  | Lookup to Contact  | Links member to contact           | Campaign Post-Upsert Flow |
| Status     | Picklist field     | Member status within the campaign | Campaign Post-Upsert Flow |

**Object Purpose:** Standard Object - Manages contact membership and participation in campaigns **Source Flows:** Campaign Post-Upsert Flow

## CampaignMemberStatus Object

### Standard Fields

| Field Name | Type               | Purpose                                 | Source Flows              |
| ---------- | ------------------ | --------------------------------------- | ------------------------- |
| Id         | ID field           | Unique member status identifier         | Campaign Post-Upsert Flow |
| CampaignId | Lookup to Campaign | Links status to campaign                | Campaign Post-Upsert Flow |
| Label      | Text field         | Display name for the member status      | Campaign Post-Upsert Flow |
| SortOrder  | Number field       | Determines display order of statuses    | Campaign Post-Upsert Flow |
| IsDefault  | Checkbox field     | Indicates if this is the default status | Campaign Post-Upsert Flow |

**Object Purpose:** Standard Object - Defines available statuses for campaign members **Source Flows:** Campaign Post-Upsert Flow

## GiftCommitment Object

### Standard Fields

| Field Name         | Type               | Purpose                                        | Source Flows                                            |
| ------------------ | ------------------ | ---------------------------------------------- | ------------------------------------------------------- |
| Id                 | ID field           | Unique record identifier                       | Recurring Record Match Flow, Recurring Post-Upsert Flow |
| Name               | Text field         | Generated name for the gift commitment         | Recurring Mapping Flow                                  |
| DonorId            | Lookup to Account  | Primary donor (Contact or Account)             | Recurring Mapping Flow                                  |
| CampaignId         | Lookup to Campaign | Associated campaign for the recurring donation | Recurring Mapping Flow, Recurring Post-Upsert Flow      |
| EffectiveStartDate | Date field         | Date the recurring donation starts             | Recurring Mapping Flow                                  |
| Status             | Picklist field     | Current status of the recurring donation       | Recurring Mapping Flow, Recurring Post-Upsert Flow      |
| ScheduleType       | Picklist field     | Type of schedule (set to "Recurring")          | Recurring Mapping Flow                                  |

### Custom Fields

| Field Name                       | Type       | Purpose                                          | Source Flows                                        |
| -------------------------------- | ---------- | ------------------------------------------------ | --------------------------------------------------- |
| Platform Key (`Platform_Key__c`) | Text field | Stores external platform identifier for matching | Recurring Record Match Flow, Recurring Mapping Flow |

**Object Purpose:** Standard Object - Manages recurring donation commitments in Non-Profit Cloud **Source Flows:** Recurring Platform Key Flow, Recurring Record Match Flow, Recurring Mapping Flow, Recurring Post-Upsert Flow

## GiftCommitmentSchedule Object

### Standard Fields

| Field Name | Type               | Purpose                             | Source Flows               |
| ---------- | ------------------ | ----------------------------------- | -------------------------- |
| Id         | ID field           | Gift commitment schedule identifier | Recurring Post-Upsert Flow |
| CampaignId | Lookup to Campaign | Schedule-specific campaign          | Recurring Post-Upsert Flow |

**Object Purpose:** Standard Object - Manages Gift Commitment Schedules for recurring donations **Source Flows:** Recurring Post-Upsert Flow

## GiftTransaction Object

### Standard Fields

| Field Name                    | Type                             | Purpose                                         | Source Flows                                                                 |
| ----------------------------- | -------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| Id                            | ID field                         | Unique record identifier                        | Donation Record Match Flow, Donation Post-Upsert Flow                        |
| Name                          | Text field                       | Generated name for the gift transaction         | Donation Mapping Flow                                                        |
| DonorId                       | Lookup to Account                | Primary donor (Contact or Account)              | Donation Mapping Flow                                                        |
| CampaignId                    | Lookup to Campaign               | Associated campaign for the donation            | Donation Mapping Flow, Donation Post-Upsert Flow                             |
| GiftCommitmentId              | Lookup to GiftCommitment         | Associated recurring donation commitment        | Donation Mapping Flow                                                        |
| GiftCommitmentScheduleId      | Lookup to GiftCommitmentSchedule | Associated commitment schedule                  | Donation Mapping Flow                                                        |
| OriginalAmount                | Currency field                   | Original donation amount before adjustments     | Donation Mapping Flow, Donation Post-Upsert Flow                             |
| CurrentAmount                 | Currency field                   | Current donation amount after refunds           | Donation Post-Upsert Flow                                                    |
| Status                        | Picklist field                   | Current status of the donation transaction      | Donation Record Match Flow, Donation Mapping Flow, Donation Post-Upsert Flow |
| TransactionDate               | Date field                       | Date the transaction occurred                   | Donation Mapping Flow                                                        |
| TransactionDueDate            | Date field                       | Date the transaction was due                    | Donation Record Match Flow, Donation Mapping Flow                            |
| PaymentMethod                 | Picklist field                   | Payment method used (Credit Card, PayPal, etc.) | Donation Mapping Flow                                                        |
| PaymentIdentifier             | Text field                       | External payment/receipt identifier             | Donation Mapping Flow                                                        |
| GiftType                      | Picklist field                   | Type of gift (Individual, Organizational)       | Donation Mapping Flow                                                        |
| Description                   | Long Text Area field             | Donation message or description                 | Donation Mapping Flow                                                        |
| DonorCoverAmount              | Currency field                   | Amount donor covered for platform fees          | Donation Mapping Flow                                                        |
| GatewayTransactionFee         | Currency field                   | Gateway processing fee                          | Donation Mapping Flow                                                        |
| GatewayReference              | Text field                       | Gateway transaction reference                   | Donation Mapping Flow                                                        |
| ProcessorTransactionFee       | Currency field                   | Processor transaction fee                       | Donation Mapping Flow                                                        |
| OutreachSourceCodeId          | Lookup to OutreachSourceCode     | Marketing source code reference                 | Donation Mapping Flow                                                        |
| MatchingEmployerTransactionId | Lookup to GiftTransaction        | Reference to employer matching transaction      | Donation Post-Upsert Flow                                                    |

### Custom Fields

| Field Name                       | Type       | Purpose                                          | Source Flows                                      |
| -------------------------------- | ---------- | ------------------------------------------------ | ------------------------------------------------- |
| Platform Key (`Platform_Key__c`) | Text field | Stores external platform identifier for matching | Donation Record Match Flow, Donation Mapping Flow |

**Object Purpose:** Standard Object - Manages donation transactions in Non-Profit Cloud **Source Flows:** Donation Platform Key Flow, Donation Record Match Flow, Donation Mapping Flow, Donation Post-Upsert Flow

## GiftRefund Object

### Standard Fields

| Field Name              | Type                      | Purpose                                       | Source Flows              |
| ----------------------- | ------------------------- | --------------------------------------------- | ------------------------- |
| Id                      | ID field                  | Unique refund identifier                      | Donation Post-Upsert Flow |
| GiftTransactionId       | Lookup to GiftTransaction | Links refund to original donation transaction | Donation Post-Upsert Flow |
| Amount                  | Currency field            | Refund amount                                 | Donation Post-Upsert Flow |
| Date                    | Date field                | Date the refund was processed                 | Donation Post-Upsert Flow |
| Status                  | Picklist field            | Refund status (typically "Completed")         | Donation Post-Upsert Flow |
| ProcessorTransactionFee | Currency field            | Processor fee for the refund                  | Donation Post-Upsert Flow |

**Object Purpose:** Standard Object - Manages refunds for donation transactions **Source Flows:** Donation Post-Upsert Flow

## GiftTribute Object

### Standard Fields

| Field Name              | Type                      | Purpose                                   | Source Flows              |
| ----------------------- | ------------------------- | ----------------------------------------- | ------------------------- |
| Id                      | ID field                  | Unique tribute identifier                 | Donation Post-Upsert Flow |
| GiftTransactionId       | Lookup to GiftTransaction | Links tribute to donation transaction     | Donation Post-Upsert Flow |
| TributeType             | Picklist field            | Type of tribute (Honor, Memorial)         | Donation Post-Upsert Flow |
| HonoreeContactId        | Lookup to Contact         | Contact being honored/memorialized        | Donation Post-Upsert Flow |
| HonoreeName             | Text field                | Name of person being honored/memorialized | Donation Post-Upsert Flow |
| NotificationContactId   | Lookup to Contact         | Contact to notify about the tribute       | Donation Post-Upsert Flow |
| NotificationContactName | Text field                | Name of contact to notify                 | Donation Post-Upsert Flow |
| NotificationEmail       | Email field               | Email address for tribute notification    | Donation Post-Upsert Flow |

**Object Purpose:** Standard Object - Manages tribute donations (in honor/memory of someone) **Source Flows:** Donation Post-Upsert Flow

## Product2 Object

### Standard Fields

| Field Name       | Type                 | Purpose                            | Source Flows                                        |
| ---------------- | -------------------- | ---------------------------------- | --------------------------------------------------- |
| Id               | ID field             | Unique record identifier           | Catalog Record Match Flow, Catalog Post-Upsert Flow |
| Name             | Text field           | Product name                       | Catalog Mapping Flow, Catalog Name Flow             |
| ProductCode      | Text field           | Product code identifier            | Catalog Record Match Flow, Catalog Mapping Flow     |
| StockKeepingUnit | Text field           | Product SKU identifier             | Catalog Record Match Flow, Catalog Mapping Flow     |
| Description      | Long Text Area field | Product description                | Catalog Mapping Flow                                |
| IsActive         | Checkbox field       | Indicates if the product is active | Catalog Mapping Flow                                |

### Custom Fields

| Field Name                       | Type           | Purpose                                                         | Source Flows                                    |
| -------------------------------- | -------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| Platform Key (`Platform_Key__c`) | Text field     | Stores external platform identifier for matching                | Catalog Record Match Flow, Catalog Mapping Flow |
| Protect Name (`Protect_Name__c`) | Checkbox field | Prevents automatic updates to the product name when set to true | Catalog Mapping Flow                            |

**Object Purpose:** Standard Object - Manages product catalog in Salesforce Commerce **Source Flows:** Catalog Platform Key Flow, Catalog Record Match Flow, Catalog Name Flow, Catalog Mapping Flow, Catalog Post-Upsert Flow

## PricebookEntry Object

### Standard Fields

| Field Name       | Type                 | Purpose                           | Source Flows             |
| ---------------- | -------------------- | --------------------------------- | ------------------------ |
| Id               | ID field             | Unique pricebook entry identifier | Catalog Post-Upsert Flow |
| Product2Id       | Lookup to Product2   | Links entry to product            | Catalog Post-Upsert Flow |
| Pricebook2Id     | Lookup to Pricebook2 | Links entry to pricebook          | Catalog Post-Upsert Flow |
| UnitPrice        | Currency field       | Product price in the pricebook    | Catalog Post-Upsert Flow |
| IsActive         | Checkbox field       | Indicates if the entry is active  | Catalog Post-Upsert Flow |
| UseStandardPrice | Checkbox field       | Uses standard price if true       | Catalog Post-Upsert Flow |
| ProductCode      | Text field           | Product code from related product | Catalog Post-Upsert Flow |
| Name             | Text field           | Entry name from related product   | Catalog Post-Upsert Flow |

**Object Purpose:** Standard Object - Manages product pricing in pricebooks **Source Flows:** Catalog Post-Upsert Flow

## Opportunity Object (Commerce Orders)

### Standard Fields

| Field Name      | Type                 | Purpose                            | Source Flows                                                |
| --------------- | -------------------- | ---------------------------------- | ----------------------------------------------------------- |
| Id              | ID field             | Unique record identifier           | Commerce Order Record Match Flow, Commerce Order Final Flow |
| Name            | Text field           | Order name identifier              | Commerce Order Mapping Flow, Commerce Order Final Flow      |
| Amount          | Currency field       | Total order amount                 | Commerce Order Final Flow                                   |
| AccountId       | Lookup to Account    | Associated account for the order   | Commerce Order Mapping Flow, Commerce Order Final Flow      |
| StageName       | Picklist field       | Current stage of the opportunity   | Commerce Order Mapping Flow, Commerce Order Final Flow      |
| CloseDate       | Date field           | Order close/completion date        | Commerce Order Mapping Flow                                 |
| CampaignId      | Lookup to Campaign   | Associated campaign for the order  | Commerce Order Mapping Flow                                 |
| Description     | Long Text Area field | Order description or notes         | Commerce Order Mapping Flow                                 |
| Pricebook2Id    | Lookup to Pricebook2 | Associated pricebook for the order | Commerce Order Mapping Flow                                 |
| RecordTypeId    | Lookup to RecordType | Record type identifier             | Commerce Order Mapping Flow                                 |
| CurrencyIsoCode | Picklist field       | Currency code for the order        | Commerce Order Mapping Flow                                 |

### Custom Fields

| Field Name                                 | Type       | Purpose                                          | Source Flows                                                  |
| ------------------------------------------ | ---------- | ------------------------------------------------ | ------------------------------------------------------------- |
| Platform Key (`movedata__Platform_Key__c`) | Text field | Stores external platform identifier for matching | Commerce Order Record Match Flow, Commerce Order Mapping Flow |

### NPSP Extension Fields

| Field Name                                   | Type              | Purpose                             | Source Flows                |
| -------------------------------------------- | ----------------- | ----------------------------------- | --------------------------- |
| Primary Contact (`npsp__Primary_Contact__c`) | Lookup to Contact | Primary contact for the opportunity | Commerce Order Mapping Flow |

### MoveData NPSP Extension Fields

| Field Name                                             | Type           | Purpose                | Source Flows                |
| ------------------------------------------------------ | -------------- | ---------------------- | --------------------------- |
| Fee (`md_npsp_pack__Fee__c`)                           | Currency field | Total fee amount       | Commerce Order Mapping Flow |
| Platform Fee (`md_npsp_pack__Platform_Fee__c`)         | Currency field | Platform fee amount    | Commerce Order Mapping Flow |
| Gateway Fee (`md_npsp_pack__Gateway_Fee__c`)           | Currency field | Gateway processing fee | Commerce Order Mapping Flow |
| Tax (`md_npsp_pack__Tax__c`)                           | Currency field | Tax amount             | Commerce Order Mapping Flow |
| Platform Fee Tax (`md_npsp_pack__Platform_Fee_Tax__c`) | Currency field | Tax on platform fee    | Commerce Order Mapping Flow |
| Gateway Fee Tax (`md_npsp_pack__Gateway_Fee_Tax__c`)   | Currency field | Tax on gateway fee     | Commerce Order Mapping Flow |
| Receipt Number (`md_npsp_pack__Receipt_Number__c`)     | Text field     | Receipt identifier     | Commerce Order Mapping Flow |

**Object Purpose:** Standard Object - Manages commerce orders as opportunities in Salesforce **Source Flows:** Commerce Order Platform Key Flow, Commerce Order Record Match Flow, Commerce Order Mapping Flow, Commerce Order Final Flow

## OpportunityLineItem Object (Order Items)

### Standard Fields

| Field Name       | Type                     | Purpose                              | Source Flows                          |
| ---------------- | ------------------------ | ------------------------------------ | ------------------------------------- |
| Id               | ID field                 | Unique line item identifier          | Commerce Order Item Record Match Flow |
| OpportunityId    | Lookup to Opportunity    | Links line item to order             | Commerce Order Item Mapping Flow      |
| PricebookEntryId | Lookup to PricebookEntry | Links to product pricing information | Commerce Order Item Mapping Flow      |
| Quantity         | Number field             | Quantity of product ordered          | Commerce Order Item Mapping Flow      |
| UnitPrice        | Currency field           | Price per unit                       | Commerce Order Item Mapping Flow      |
| TotalPrice       | Currency field           | Total price for the line item        | Commerce Order Item Mapping Flow      |

### Custom Fields

| Field Name                       | Type       | Purpose                                          | Source Flows                                                            |
| -------------------------------- | ---------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| Platform Key (`Platform_Key__c`) | Text field | Stores external platform identifier for matching | Commerce Order Item Record Match Flow, Commerce Order Item Mapping Flow |

**Object Purpose:** Standard Object - Manages individual items within commerce orders **Source Flows:** Commerce Order Item Platform Key Flow, Commerce Order Item Record Match Flow, Commerce Order Item Mapping Flow
