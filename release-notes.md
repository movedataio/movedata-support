# Release Notes

The below document details the release notes for MoveData Commerce Extensions.

#### Version 1.130

* Ability to protect aspects of the contact record using settings and `movedata__Protect_Name__c`.

#### Version 1.128

* Fix issue with Currency Code for Opportunities
  * Only relevant when Multi-Currency is enabled.

#### Version 1.127

* Setting to exclude Platform Fee from Opportunity Products

#### Version 1.126

* Ability to subtract Platform Fee from Total for Opportunity Name

#### Version 1.122

* Support for toggling text casing options in Settings for Accounts and Contacts.

#### Version 1.121

* Show defaults for Account and Contact options for Order name in Settings.
* **Details**
  * Contact Default Name: `{!Contact.Name} {!Amount} {!RecordType.Name} {!CloseDate}`
  * Account Default Name: `{!Account.Name} {!Amount} {!RecordType.Name} {!CloseDate}`
