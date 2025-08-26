# Fields and Objects

This article documents the custom fields added by the MoveData NPSP Fundraising & Donations Extension. &#x20;

## Campaign Object

The standard Salesforce Campaign object has been extended with three custom fields to support advanced fundraising operations:

### Campaign URL (`movedata__Campaign_URL__c`)

* **Type:** URL field
* **Purpose:** Stores the web address for online campaign pages
* **Use Case:** Links Salesforce campaign records to external donation portals, crowdfunding pages, or event registration sites
* **Required:** No
* **Implementation Note:** Enables direct navigation from Salesforce to active campaign websites for quick access by fundraising teams

### Fundraising Account (`movedata__Fundraising_Account__c`)

* **Type:** Lookup relationship to Account object
* **Relationship Name:** FundraisingCampaigns
* **Delete Constraint:** SetNull (preserves campaign data if fundraising account is deleted)
* **Purpose:** Associates campaigns with organizational fundraisers
* **Use Case:** Tracks which corporate partners, foundations, or institutional accounts are leading specific fundraising initiatives
* **Required:** No

### Fundraising Contact (`movedata__Fundraising_Contact__c`)

* **Type:** Lookup relationship to Contact object
* **Relationship Name:** FundraisingCampaigns
* **Delete Constraint:** SetNull
* **Purpose:** Identifies individual fundraising champions or coordinators
* **Use Case:** Links specific people responsible for campaign management, enabling targeted communication and accountability tracking
* **Required:** No

## Recurring Donation Object (NPSP)

The NPSP Recurring Donation object (`npe03__Recurring_Donation__c`) includes one critical custom field for platform integration:

### Platform Key (`movedata__Platform_Key__c`)

* **Type:** Text field (100 characters)
* **Purpose:** Stores unique identifiers from external donation platforms
* **Use Case:** Enables synchronization between Salesforce and third-party recurring donation processors
* **Required:** No
* **Tracking:** History and trending tracking disabled for performance
* **Implementation Note:** Essential for maintaining data integrity across integrated donation systems

## Opportunity Object

The standard Opportunity object has been significantly enhanced with seven custom fields focused on comprehensive financial tracking and fee management:

### Core Fee Fields

#### Fee (`movedata__Fee__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Description:** "The total fees (excluding tax) for the donation"
* **Purpose:** Captures aggregate processing fees before tax calculations
* **Use Case:** Primary field for understanding total cost of donation processing
* **Required:** No

#### Gateway Fee (`movedata__Gateway_Fee__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Tracks payment processor charges (Stripe, PayPal, etc.)
* **Use Case:** Isolates costs specifically related to payment gateway services
* **Required:** No

#### Platform Fee (`movedata__Platform_Fee__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Records charges from fundraising platforms or donation management tools
* **Use Case:** Separates platform service costs from payment processing fees
* **Required:** No

### Tax Tracking Fields

#### Tax (`movedata__Tax__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Captures overall tax amounts on donation-related charges
* **Use Case:** Ensures compliance with tax reporting requirements
* **Required:** No

#### Gateway Fee Tax (`movedata__Gateway_Fee_Tax__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Specific tax calculations on payment gateway charges
* **Use Case:** Detailed tax breakdown for financial reporting and reconciliation
* **Required:** No

#### Platform Fee Tax (`movedata__Platform_Fee_Tax__c`)

* **Type:** Currency field (18 digits, 2 decimal places)
* **Purpose:** Tax calculations specific to platform service charges
* **Use Case:** Complete tax attribution across all fee types
* **Required:** No

### Administrative Fields

#### Receipt Number (`movedata__Receipt_Number__c`)

* **Type:** Text field (50 characters)
* **Purpose:** Stores donation receipt identification numbers
* **Use Case:** Links Salesforce records to issued donor receipts for audit trails and donor services
* **Required:** No
* **Tracking:** Feed history and trending disabled
