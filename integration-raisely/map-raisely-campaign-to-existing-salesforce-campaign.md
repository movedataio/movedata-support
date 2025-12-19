# Map Raisely Campaign to Existing Salesforce Campaign

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* subtitle=A guide for mapping Raisely campaigns to existing Salesforce campaigns
* integration=raisely
* tags=campaign,data,data migration,data import,map,existing,salesforce
{% endhint %}

When you connect a campaign from Raisely, MoveData will automatically create an equivalent campaign record in Salesforce. If you need MoveData to match to an existing campaign record then you must follow the below steps:

### Actions in Raisely <a href="#h_7ba7486c29" id="h_7ba7486c29"></a>

1. Open your campaign in Raisely Admin and click `Settings → API & Webhooks`
2. Copy the value for `Campaign Profile UUID` (like `40d8hc50-16f0-11ed-96f3-c92655dj8a2b`)
3. Prefix the copied value with `raisely:` (like `raisely:40d8hc50-16f0-11ed-96f3-c92655dj8a2b`)

### Actions in Salesforce <a href="#h_a435975e58" id="h_a435975e58"></a>

1. Open your campaign in Salesforce
2. Ensure Platform Key (`movedata__Platform_Key__c`) and Protect Name (`movedata__Protect_Name__c`) are present on your page layout
3. Set the prefixed Raisely Campaign Profile UUID value on the Platform Key field
4. Set Protect Name to True (this prevents your campaign name being updated to the equivalent value Raisely is providing)
5. Click Save

MoveData will now use the mapped campaign to represent your campaign in Raisely.

{% hint style="warning" %}
**Note: Platform Key is a Unique Field**

* If MoveData has already created the Raisely campaign in Salesforce, you will get an error when adding the Platform Key to your intended campaign
* In this scenario you must:
  * Copy the platform key value from your existing campaign
  * Delete your existing campaign
  * Copy the platform key value onto your new campaign
{% endhint %}
