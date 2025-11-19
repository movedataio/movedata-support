# Migrate Recurring Donations from External System

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* integration=raisely
* tags=recurring,data,data migration,data import
{% endhint %}

## Context <a href="#h_1a3c6c22eb" id="h_1a3c6c22eb"></a>

Organisations may migrate recurring donations from an external system into Raisely. In this scenario MoveData will receive information from Raisely and create recurring donation records inside Salesforce. Importantly, MoveData has no context of your existing recurring donations inside Salesforce, and thus there is a process to follow if you require your Raisely recurring donations to match your existing recurring donations inside Salesforce.

## Process <a href="#h_3f74e9588d" id="h_3f74e9588d"></a>

### 1. Identify Recurring Donations being migrated to Raisely <a href="#h_31314941a4" id="h_31314941a4"></a>

* Save a list of these records as you will need to modify them in a future step
* We recommend building this as a report in Salesforce for easy access and review throughout the process

### 2. Understand how MoveData matches Recurring Donation records <a href="#h_7dee4c466b" id="h_7dee4c466b"></a>

* Raisely recurring donations contain a Subscription UUID like `977c3600-50c6-11ed-8a6f-53e6db3905ae`
* You can export a list of Subscription UUIDs from Raisely via `Reports → Create a Report → Regular Donation Schedules`
* MoveData prefixes the Subscription ID with `raisely:` to create a value like `raisely:977c3600-50c6-11ed-8a6f-53e6db3905ae`
* MoveData stores this value on the `Platform Key` field `npe03__Recurring_Donation__c.md_npsp_pack__Platform_Key__c`
  * If a match on `Platform Key` is determined, MoveData will use the matched record
  * Otherwise, MoveData will create a new record (saving the platform key value against that record) to represent the recurring donation and use this new record ongoing
* Thus, you will need to set the `Platform Key` value for all recurring donation records identified in (1)

### 3. Understand how MoveData matches Contact records <a href="#h_e8c7007827" id="h_e8c7007827"></a>

{% hint style="info" %}
**Reference**

* [Configure Duplicate Rules](https://intercom.help/movedata/en/articles/9144672)
* [Mapping Considerations for Existing Records](https://intercom.help/movedata/en/articles/9146991)
{% endhint %}

* When processing Raisely information into Salesforce, MoveData will attempt to match against an existing contact record inside Salesforce
  * If no match is determined, a new contact record will be created to represent the information supplied by Raisely
* As such, you must ensure that contact information in the import file supplied to Raisely is aligned with the contact information associated with each recurring donation record inside Salesforce
* Failure to do so can result in duplicate contact records being created, and/or Salesforce validation errors such as [You can't change the Household Account or Contact on a Recurring Donation that has Closed Opportunities](https://intercom.help/movedata/en/articles/9147154) in NPSP

### 4. Simulate testing and implement necessary changes <a href="#h_a4ffead67c" id="h_a4ffead67c"></a>

* The standard integration business logic will apply when processing Raisely recurring donations into Salesforce and in the case of your migration you may or may not want to customise this logic
* For example, if your Salesforce recurring donation record is 12mo old, and Raisely issues a created date of `TODAY`, then the integration will set the `Date Established` field to `TODAY`
* As such your migration needs to be reviewed ahead of time, and any necessary changes identified and implemented
* To conduct your review we recommend simulating the following:
  * Create a recurring donation in your sandbox (this should be a direct copy from Production, and if you have various permutations you should replicate each)
  * Create a new recurring donation in Raisely
  * Copy the value for `md_npsp_pack__Platform_Key__c` from the Raisely-created recurring donation record and delete this record out of Salesforce
  * Apply the copied value to the recurring donation record manually created
  * Open the donation in Raisely and click `Edit → Save`
    * This will cause Raisely to re-issue the recurring donation which will now match against the manually created record
  * Identify any additional or unwanted changes the integration has made to the manually created record
  * Introduce changes to support your desired behaviour and repeat the above steps until behaviour is as expected
  * The fields which most commonly need supporting are `Date Established`, `Effective Date` and `Campaign`

### 5. Disable Raisely webhooks and import with a status of Paused <a href="#h_136fff5eb8" id="h_136fff5eb8"></a>

* Remove all `subscription` webhook events from the campaign(s) Raisely is importing into
* Instruct Raisely to import recurring donations with a status of `Paused`

### 6. Export Subscription UUIDs and set Platform Key <a href="#h_f59bd1ba38" id="h_f59bd1ba38"></a>

* Export Subscription UUIDs from Raisely and set values on `npe03__Recurring_Donation__c.md_npsp_pack__Platform_Key__c` per (2)

### 7. Enable Raisely webhooks and update status to Active <a href="#h_d84913b18e" id="h_d84913b18e"></a>

* Enable `subscription` webhooks and instruct Raisely to update subscription statuses to `Active`
* Monitor resultant records in Salesforce to ensure the desired behaviour is as expected

### Other Considerations <a href="#h_1306483891" id="h_1306483891"></a>

* Raisely requires you to supply an email address for the person record associated with each imported recurring donation.
  * If contact records associated with existing recurring donations do not contain email addresses, and you have supplied one to Raisely or Raisely has assigned one for you, you must ensure that same email address is present on the contact record per (3) above
* If you have “obscure” recurring donation schedules then we recommend testing these permutations too. This is per (4) above.
