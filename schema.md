# Schema

{% hint style="info" %}
Metadata

* title=Commerce Schema Reference - Root
* schema=Commerce
{% endhint %}

* `schema`: This is always "commerce"
* `schemaVersion`: Identifies the version of the commerce schema using major, minor, and build structure
* `platform`: The platform code responsible for creating the notification (e.g., "facebook")
* `platformLabel`: The platform label responsible for creating the notification (e.g., "Facebook")
* `platformVersion`: Identifies the version of the commerce schema (same structure as schemaVersion)
* `prefix`: Notes the prefix to be appended to every key. Used to prevent overlapping keys when there are multiple instances of the same platform integrated with MoveData (e.g., "usa")
* `client`: Used when a platform inherits a specific client as part of its implementation (e.g., "csv")
* `action`: Denotes what the notification is for. Values can be: "ticket", "raffle", "sale"
* `campaign`: \[[📖 Campaign](campaign.md)] An array of Campaign objects. Each campaign represents an effort associated with the sale.
* `primaryContact`: \[[📖 Person](person.md) and [📖 Organisation](organisation.md)] Primary contact person or organization responsible for the transaction
* `catalog`: \[[📖 Catalog](catalog.md)] Represents all the products / items used in this transaction
* `order`: \[[📖 Order](order.md)] Represents all the order items used in this transaction
* `custom`: A key/value object with values that do not fit within the schema
* `global`: A key/value object with values that need to be globally available throughout a notification
* `createdAt`: The creation date/time of the notification or data contained within
* `modifiedAt`: The last updated date/time of the notification or data contained within
