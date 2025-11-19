# Organisation Accounts created as Anonymous Households

{% hint style="info" %}
Metadata

* group=Extension
* category=Non-Profit Success Pack
* extension=npsp
* tags=record type
{% endhint %}

When MoveData processes company information into Salesforce it will ordinarily match or create an Organisation Account record to represent that company.

Depending upon how your Salesforce has been configured, occasionally this can create an Anonymous Household record instead. To fix this:

* Open Setup → Users → Profiles
* Open the profile associated with the MoveData Authorised User (usually System Administrator)
* Locate the area used for Object Management and click into Account
* Locate the area used for Record Types and ensure `Organisation` is set as the default Record Type
* Click Save

You can now reprocess the notification which previously resulted in an Anonymous Household, and observe it now creates an Organisation Account record to represent the company instead.
