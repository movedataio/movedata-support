# Release Notes

The below document details the release notes for MoveData NPSP Extensions.

## Release Notes

### Version 1.176

* Subtract Platform Fee (Public) from Amount when configured to (as opposed to Platform Fee)

### Version 1.174

* Set Recurring Open Ended Status to Closed when Recurring Donation Status = Cancelled.

### Version 1.173

* Settings options for Opportunity Contact Roles (Soft Credits) including toggle and role names.

### Version 1.170

* Ability to protect aspects of the contact record using settings and `movedata__Protect_Name__c`.

### Version 1.167

* Support for toggling text casing options in Settings for Accounts and Contacts.

### Version 1.166

* Show defaults for Account and Contact options for Opportunity name in Settings.

### Version 1.163

* Donation Naming has changed from `Temp Value` to use a naming pattern implementation.

#### Details

* Contact Default Name: `{!Contact.Name} {!Amount} {!RecordType.Name} {!CloseDate}`
* Account Default Name: `{!Account.Name} {!Amount} {!RecordType.Name} {!CloseDate}`

### Version 1.157

* Removed deprecated fields and objects from package; these are now unmanaged by MoveData and can be deleted at your discretion.
* Support for saving each question response has been dropped as these weren't used by customers and resulted in higher data storage requirements.
* The majority of fields removed related to how platform keys are stored. These fields were deprecated around 2 years ago and are now being removed; they are superceeded by fields in the core MoveData package.

#### Details

* List of objects and fields:
  * Account
    * Platform Key (`md_pack_npsp__Platform_Key__c`)
    * Protect Name (`md_pack_npsp__Protect_Name__c`)
  * Campaign
    * Campaign Code (`md_pack_npsp__Campaign_Code__c`)
    * Platform Key (`md_pack_npsp__Platform_Key__c`)
    * Platform (`md_pack_npsp__Platform__c`)
    * Protect Campaign Parent (`md_pack_npsp__Protect_Platform_Parent__c`)
    * Protect Name (`md_pack_npsp__Protect_Name__c`)
  * Contact
    * Platform Key (`md_pack_npsp__Platform_Key__c`)
  * Opportunity
    * Platform Key (`md_pack_npsp__Platform_Key__c`)
  * Question Responses (`md_pack_npsp__Question_Response__c`)
    * (Complete object)
