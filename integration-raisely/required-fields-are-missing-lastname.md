# Required fields are missing: \[LastName]

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* integration=raisely
* tags=data
{% endhint %}

Across your various Raisely forms, you can specify `First Name` and `Last Name` as optional or mandatory.

In the case where these are set to optional, it is possible for the user to enter an email but not enter name information. Given `Last Name` is mandatory in Salesforce, processing this information through to Salesforce will cause the error `REQUIRED_FIELD_MISSING, Required fields are missing: [LastName]`.

To fix this, ensure you set `First Name` and `Last Name` as mandatory in Raisely. If you have already received donations where `First Name` and `Last Name` information is missing, you can edit the donation and add this information in. In doing so, the donation is re-saved and Raisely will push the updated information through to Salesforce.

<figure><img src="../.gitbook/assets/Raisely Donation Form.png" alt=""><figcaption></figcaption></figure>
