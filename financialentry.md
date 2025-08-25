# DonationFinancialEntry

* `currency`: ISO 4217 currency code (e.g., "USD", "EUR", "GBP"). `@type: {string | null}`
* `amount`: The donation amount in the specified currency.
This is the gross amount before any fees or taxes are deducted. `@type: {number | null}`
* `fee`: Total fees charged for processing the donation.
This is typically the sum of feePlatform and feeGateway. `@type: {number | null}`
* `feePlatform`: Platform-specific fees charged by the donation platform. `@type: {number | null}`
* `feeGateway`: Payment gateway fees charged by the payment processor. `@type: {number | null}`
* `tax`: Total taxes applied to the donation.
This is typically the sum of taxPlatform and taxGateway. `@type: {number | null}`
* `taxPlatform`: Platform-specific taxes. `@type: {number | null}`
* `taxGateway`: Payment gateway taxes. `@type: {number | null}`