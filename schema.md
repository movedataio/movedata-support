# Schema

* `schema`: This is always "donation"
* `schemaVersion`: Identifies the version of the donation schema using major, minor, and build structure
* `platform`: The platform responsible for creating the notification (e.g., "facebook")
* `platformLabel`: The platform responsible for creating the notification (e.g., "Facebook")
* `platformVersion`: Identifies the version of the donation schema (same structure as schemaVersion)
* `prefix`: Notes the prefix to be appended to every key. Used to prevent overlapping keys when there are multiple instances of the same platform integrated with MoveData (e.g., "usa")
* `client`: Used when a platform inherits a specific client as part of its implementation (e.g., "csv")
* `action`: Denotes what the notification is for. Values can be: "metadata" (containing metadata such as campaigns, recurring changes, fundraisers, etc.) or "donation" (containing donation information)
* `campaign`: [[📖 Campaign](campaign.md)] An array of Campaign objects.  Each campaign represents a fundraising effort associated with a donation or registration.
* `anonymous`: A boolean flag identifying if the donation is to be anonymous
* `donor`: [[📖 Person](person.md) and [📖 Organisation](organisation.md)] Primary contact person or organization responsible for the donation
* `tribute`: A Tribute entry; used to identify a donation is in memory or tribute of someone
* `matched`: A Matched entry containing information about a matching donation
* `recurring`: A Recurring entry; identifies start date, amount, frequency around a recurring donation
* `donation`: [[📖 Donation](donation.md)] A Donation entry containing dates, descriptions and financially-related information
* `newsletter`: A boolean flag (that can also be null) to identify if the subject of the notification has opted into or out of communications. Superseded by communications entries on party entries
* `custom`: A key/value object with values that do not fit within the schema
* `questions`: [[📖 Question](question.md)] An array of Question objects used to hold custom questions and answers
* `global`: A key/value object with values that need to be globally available throughout a notification
* `createdAt`: The creation date/time of the notification or data contained within
* `modifiedAt`: The last updated date/time of the notification or data contained within