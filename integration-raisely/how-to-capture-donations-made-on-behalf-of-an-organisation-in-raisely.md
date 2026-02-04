# How to Capture Donations Made on Behalf of an Organisation in Raisely

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* subtitle=Demonstrates how to capture Donations Made on Behalf of an Organisation in Raisely
* integration=raisely
* tags=organisation,account,raisely
{% endhint %}

This guide shows you how to set up custom fields in Raisely to capture Organisation information. This is processed into Salesforce as Account records with affiliations established between Contact and Account.

{% embed url="https://app.arcade.software/share/UghGKpFIIYqz0tfv7C3T" %}

### Transcription

* Inside your Raisely account open Settings
* Click Custom Fields
* Click Add New
* Enter a name for your field. This can be anything you wish (e.g. "Organisation Name")
* Ensure you set the Field ID to **company** (lowercase). If this value is not explicitly company then the following logic will not apply.
* Set Type to Text
* Click Save
* To apply your new field, open a campaign and click Settings
* Select Donation Form
* Click Fields
* Click Add New
* Select the Company field
* Click Save
* Your new field will look something like this. You can reorder your donation form and apply conditional logic as you require (e.g. only show this field when another field "I'm donating on behalf of a company" is checked).
* This results in an Account record matched / created in Salesforce
* MoveData will also create an Affiliation linkage between Contact and Account
