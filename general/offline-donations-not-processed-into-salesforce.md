# Offline donations not processed into Salesforce

{% hint style="info" %}
Metadata

* category=Technical
* tags=offline,offline donations
{% endhint %}

Many organisations do not wish for offline donations to be processed into Salesforce. This is because that income may already be recognised in Salesforce, and processing the offline donation could result in a double counting issue.

To allow offline donations to process into Salesforce:

* Open MoveData from the App Launcher
* Open `Settings`
* Open the relevant extension (e.g. `Fundraising & Donations`)
* Find the section titled `Donations` and set `Ignore Offline Donations` to `False`
* Click `Update` to save your changes

<figure><img src="../.gitbook/assets/Offline Setting.png" alt=""><figcaption></figcaption></figure>

MoveData will now process your offline donations into Salesforce.

Since MoveData acts on instructions from your connected platform, completing the above will not automatically process any historically ignored offline donations. To process these into Salesforce you need to either:

* Find the related notification in MoveData and click `Reprocess`
* Re-save the related donation from your source platform (which, for most platforms, will trigger a new notification and process into Salesforce)

If you require specific functionality for offline donations (such as setting the field `Type` to `Offline`) then you must [modify your integration](https://intercom.help/movedata/en/collections/9038155) to accommodate.
