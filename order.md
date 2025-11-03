# Order

{% hint style="info" %}
Metadata

* title=Commerce Schema Reference - Order
* entity=Order
* schema=Commerce
{% endhint %}

* `key`: Unique key for the order.
* `code`: Order code identifier.
* `status`: Status of the order (e.g., draft, refunded, pending, paid, complete, voided, offline).
* `receiptNumber`: Receipt number for the order.
* `description`: Description of the order.
* `currency`: Currency code used for the order.
* `fee`: Fee charged for the order.
* `feePlatform`: Platform fee charged for the order.
* `feeGateway`: Gateway fee charged for the order.
* `tax`: Total tax for the order.
* `taxCommerce`: Tax charged by commerce.
* `taxPlatform`: Tax charged by the platform.
* `taxGateway`: Tax charged by the gateway.
* `total`: Total amount for the order.
* `items`: \[[📖 Orderitem](orderitem.md)] List of items included in the order.
* `processor`: Payment processor used for the order.
* `processorTransactionId`: Transaction ID from the payment processor.
* `cardInformationType`: Type of card used for payment.
* `cardInformationCountry`: Country of the card used for payment.
* `cardInformationPan`: Masked PAN (Primary Account Number) of the card.
* `cardInformationCardholderName`: Name of the cardholder.
* `cardInformationCardholderExpiry`: Expiry date of the card in MMYY format.
* `custom`: Custom metadata for the order.
* `questions`: \[[📖 Question](question.md)] List of questions answered by the customer.
* `marketing`: \[[📖 Marketing](marketing.md)] Marketing information related to the order.
* `related`: \[[📖 Relationship](relationship.md)] Relationship information related to the order.
* `createdAt`: Date when the order was created.
* `modifiedAt`: Date when the order was last modified.
