# Campaign Name Overridden

{% hint style="info" %}
Metadata

* category=Technical
* extension=all
* tags=campaign,name,protect
{% endhint %}

MoveData uses the information issued by your connected platform to create and update records in Salesforce.

* A fundraiser creates a page and names it `Judy's Running Event`
* An equivalent campaign is created in Salesforce named `Judy's Running Event`
* The fundraiser updates the name of the page to `Judy's Swimming Event`
* The integration updates the name of the equivalent campaign in Salesforce to `Judy's Swimming Event`

The same applies should you manually make changes to your campaign name in Salesforce:

* A fundraiser creates a page and names it `Judy's Running Event`
* In Salesforce, you update the name of the campaign to `2024-Events-Running-Judy`
* When the integration next encounters the campaign via your connected platform, it updates the name to `Judy's Running Event` as issued by your connected platform

To prevent this update from occurring, you must enable Protect Name (`movedata__Protect_Name__c`) on your page layout. When set to `True`, the integration will not update the name of your campaign with the value issued by your connected platform.
