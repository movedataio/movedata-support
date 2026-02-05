# Salesforce Lead Object and Matching

{% hint style="info" %}
Metadata

* category=Technical
* subtitle=An overview for Salesforce lead object and matching
* integration=all
* tags=salesforce,lead,matching
{% endhint %}

{% hint style="warning" %}
Note: This is **not** a recommended by MoveData
{% endhint %}

When working with Salesforce Lead objects in MoveData, it is important to understand how Salesforce handles lead conversion and account assignment.

When you create a lead in Salesforce, you must supply company information. This is a standard Salesforce requirement for the Lead object.&#x20;

When Salesforce determines a match from the Lead object and converts it, the system will apply the lead's company information as the Contact's Account rather than creating a Household Account. This behaviour is built into Salesforce's standard lead conversion process and is standard Salesforce functionality, not MoveData functionality.

Any requirement to customise this behaviour **cannot** be attended to by MoveData. If you need to modify how leads are converted or how accounts are assigned during the conversion process, please consult with your Salesforce Administrator or Partner to explore available customisation options within Salesforce.
