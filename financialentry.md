# DonationFinancialEntry

* `currency`: ISO 4217 currency code (e.g., "USD", "EUR", "GBP").
* `amount`: The donation amount in the specified currency. This is the gross amount before any fees or taxes are deducted.
* `fee`: Total fees charged for processing the donation. This is typically the sum of feePlatform and feeGateway.
* `feePlatform`: Platform-specific fees charged by the donation platform.
* `feeGateway`: Payment gateway fees charged by the payment processor.
* `tax`: Total taxes applied to the donation. This is typically the sum of taxPlatform and taxGateway.
* `taxPlatform`: Platform-specific taxes.
* `taxGateway`: Payment gateway taxes.