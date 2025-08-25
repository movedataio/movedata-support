# Organisation

* `salesforceKey`: Salesforce ID for Organisation - included for consistency with other Salesforce records
* `key`: Dispatching Platform Key for Organisation
* `partyType`: Always set to "account" when dealing with organisations
* `name`: Organisation name - almost always required downstream
* `primaryContact`: Primary contact person for the organisation
* `phoneType`: Organisation phone type - typically "work" for business contexts
* `phone`: Organisation phone number - no validation or parsing applied
* `emailType`: Organisation email type - typically "work" for business contexts
* `email`: Organisation email address
* `website`: Organisation website URL
* `mailingAddress`: Organisation primary mailing address
* `otherAddress`: Organisation secondary or alternative address
* `custom`: Custom key-value pairs for platform-specific or industry-specific data
* `createdAt`: Creation date provided by source platform
* `modifiedAt`: Last modification date provided by source platform