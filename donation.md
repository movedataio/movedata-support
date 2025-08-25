# Donation

* `key`: Unique key identifying the donation.
* `parentKey`: [[📖 Recurring](recurring.md)] Key referencing the recurring donation entity, if applicable.
* `status`: Current status of the donation (e.g., success, refunded, pledge).
* `receiptNumber`: Receipt number associated with the donation.
* `amount`: Total amount donated.
* `currency`: Currency code for the donation amount.
* `fee`: Total fee charged for the donation.
* `feePlatform`: Platform fee portion of the total fee.
* `feePlatformPublic`: Publicly visible portion of the platform fee.
* `feePlatformPrivate`: Privately tracked portion of the platform fee.
* `feeGateway`: Gateway fee charged by the payment processor.
* `feeCovered`: Indicates if the donor covered the fees.
* `tax`: Total tax applied to the donation.
* `taxPlatform`: Platform portion of the tax.
* `taxGateway`: Gateway portion of the tax.
* `startDate`: Date when the donation process started.
* `endDate`: Date when the donation process ended.
* `processor`: Name of the payment processor used.
* `processorTransactionId`: Transaction ID provided by the payment processor.
* `message`: Optional message included with the donation.
* `cardInformationType`: Type of card used for the donation (e.g., credit, debit).
* `cardInformationCountry`: Country of the card issuer.
* `cardInformationPan`: Masked Primary Account Number (PAN) of the card.
* `cardInformationCardholderName`: Name of the cardholder.
* `cardInformationCardholderExpiry`: Expiry date of the card in MMYY format.
* `financials`: [[📖 Financial](financial.md)] Financial breakdown and details for the donation.
* `marketing`: [[📖 Marketing](marketing.md)] Marketing metadata associated with the donation.
* `related`: [[📖 Relationship](relationship.md)] A link to related transactions.