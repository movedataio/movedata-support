# Sync Raisely Campaign to Salesforce prior to First Notification

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* integration=raisely
* tags=campaign
{% endhint %}

Ordinarily MoveData will sync your Raisely campaign into Salesforce when Raisely issues the first notification (e.g. donation, profile, order etc). In certain scenarios organisations may wish to sync their Raisely campaign into Salesforce before the first notification occurs. To do so:

* Open the Raisely Admin
* Navigate to `Profiles` and copy the URL (like `https://admin.raisely.com/campaigns/my-example-campaign/profiles`)
* Navigate to `API & Webhooks` and copy the value for `Campaign Profile UUID` (like `50fhyc20-f153-11ee-8f9d-87f9e6fh2e1f`)
* Combine the two to construct a new URL (like `https://admin.raisely.com/campaigns/my-example-campaign/profiles/50fhyc20-f153-11ee-8f9d-87f9e6fh2e1f`)
* Enter this URL into your web browser
* Re-save the profile by clicking `Edit` → `Save`
* Observe that a notification is generated in MoveData which syncs the Raisely campaign into Salesforce
