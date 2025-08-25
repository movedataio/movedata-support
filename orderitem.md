# OrderItem

* `key`: Unique key for the order item.
* `code`: Code identifier for the order item.
* `status`: Status of the order item (e.g., pending, partial, complete).
* `catalogKey`: [[📖 Catalog](catalog.md)] Key referencing the associated catalog item.
* `quantity`: Quantity of the item ordered.
* `unitPrice`: Unit price of the item.
* `total`: Total price for the item.
* `cost`: Cost of the item.
* `description`: Description of the order item.
* `custom`: Custom metadata for the order item.
* `questions`: [[📖 Question](question.md)] List of questions answered for this item.
* `createdAt`: Date when the order item was created.
* `modifiedAt`: Date when the order item was last modified.