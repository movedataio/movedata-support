# Salesforce Lead Object and Matching

{% hint style="info" %}
Metadata

* category=Technical
* subtitle=An overview for Salesforce lead object and matching
* integration=all
* tags=salesforce,lead,matching
{% endhint %}

{% hint style="warning" %}
Note: This is functionality is as-is.  MoveData uses standard **Salesforce** functions to convert from Leads to Contacts.\
\
This is only relevant when MoveData has access to a Lead Duplicate Detection rule.
{% endhint %}

**Lead Conversion in MoveData**

MoveData automatically converts detected Leads to Contacts to support record processing—this is required because out-of-the-box extensions use Contacts or Person Contacts in contact phases.

If you have Lead duplicate detection rules and wish to exclude this from MoveData, then exclude the MoveData Authorised User from your Lead duplicate detection rule using conditions.

**How Salesforce Handles Lead Conversion**

When Salesforce converts a Lead, it assigns the Lead's company information as the Contact's Account rather than creating a Household Account. This is standard Salesforce behaviour—not MoveData functionality.

Because MoveData uses standard Salesforce lead conversion, any customisation to this process (such as modifying account assignment) must be handled by your Salesforce Administrator or Partner.

<details>

<summary>Salesforce Code</summary>

The below code is code used to convert a Lead to a Contact:

```
LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted = true LIMIT 1];
​
Database.LeadConvert lc = new Database.LeadConvert();
lc.setLeadId(leadId);
lc.setConvertedStatus(convertStatus.MasterLabel);
lc.setDoNotCreateOpportunity(true);
Database.LeadConvertResult lcr = Database.convertLead(lc);
```

</details>

For more information, please see [Convert Leads to Contacts](https://support.movedata.io/knowledgebase/general/convert-leads-to-contacts/).
