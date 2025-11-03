# Person

{% hint style="info" %}
Metadata

* title=Commerce Schema Reference - Person
* entity=Person
* schema=Commerce
{% endhint %}

* `salesforceKey`: Salesforce ID for Contact - used for specific anonymous user scenarios
* `key`: Dispatching Platform Key for Contacts
* `partyType`: Always set to "person" when dealing with a contact
* `salutation`: Free-text for salutation (e.g., "Mr", "Ms", "Dr")
* `firstName`: Person's first name
* `middleName`: Person's middle name
* `lastName`: Person's last name
* `gender`: Person's gender ("male", "female", or "unspecified")
* `birthday`: Person's birthday in YYYY-MM-DD format only
* `dateOfDeath`: Person's date of death in YYYY-MM-DD format only
* `phoneType`: Person's phone type ("home", "work", or "other")
* `phone`: Person's phone number - no validation or transformation applied
* `emailType`: Person's email type ("home", "work", or "other")
* `email`: Person's email address
* `photoUrl`: URL to person's photo
* `mailingAddress`: Person's primary mailing address
* `otherAddress`: Person's secondary or alternative address
* `communication`: Communication preferences and permissions
* `custom`: Custom key-value pairs for platform-specific data
* `questions`: Array of custom questions and answers associated with this person
* `createdAt`: Creation date provided by source platform
* `modifiedAt`: Last modification date provided by source platform
