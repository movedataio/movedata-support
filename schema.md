# Schema

Notifications that use the Donation schema have the following elements:

* `schema`:  This is always `donation`
* `schemaVersion`: Identifies the version of the donation schema using the below structure:
  * `major`: The major value of the donation schema
  * `minor`: The minor value of the donation schema
  * `build`: The timestamp of the schema release in YYYYMMDD.
* `platform`: The platform responsible for creating the notification. eg. `facebook`
* `platformLabel`: The platform responsible for creating the notification. eg. `Facebook`
* `platformVersion`: Identifies the version of the donation schema (same structure as `schemaVersion`)
* `prefix`: Notes the prefix to be appended to every key. Used to prevent overlapping keys when there are multiple instances of the same platform integrated with MoveData. eg. `usa`
* `client`: Used when a platform inherits a specific client as part of its implementation.  eg. `csv`
* `action`: Denotes what the notification is for.  Values can be:
  * `metadata`: A notification containing metadata such as campaigns, recurring changes, fundraisers, etc.
  * `donation`: A notification containing donation information.
* [`campaign`](campaign.md): An array of Campaign entries.&#x20;
* `anonymous`: A boolean flag identifying if the donation is to be anonymous.
* `donor`: A Party entry for the party responsible for the donation.
* `tribute`: A Tribute entry; used to identify a donation is in memory or tribute of someone.&#x20;
* `matched`: A Matched entry containing information about a matching donation.
* `recurring`: A Recurring entry; identifies start date, amount, frequency around a recurring donation.
* `donation`: A Donation entry containing dates, descriptions and financially-related information
* `newsletter`: A boolean flag (that can also be null) to identify if the subject of the notification has opted into or out of communications.  Superseded by `communcations` entries on party entries.
* `custom`: A key/value object with values that do not fit within the schema.
* `questions`: An array of Question objects used to hold custom questions and answers.
* `global`: A key/value object with values that need to be globally available throughout a notification.
* `createdAt`: The creation date/time of the notification or data contained within.
* `modifiedAt`: The last updated date/time of the notification or data contained within.

