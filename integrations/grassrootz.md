# Grassrootz

### Overview

This article summarises how to set up and maintain your Grassrootz integration.

#### Integration Summary

| Field     | Value                                                      |
| --------- | ---------------------------------------------------------- |
| Product   | [https://www.grassrootz.com/](https://www.grassrootz.com/) |
| Method    | Push (Webhooks)                                            |
| Frequency | Real-Time                                                  |

{% hint style="danger" %}
MoveData does not support ticket sale functionality through Grassrootz. This is because this is not a commonly used Grassrootz feature so we do not yet have a business case to develop and maintain integration of ticket sale data.
{% endhint %}

#### Demo Video

{% hint style="info" %}
Coming Soon
{% endhint %}

### Integration Setup

{% embed url="https://app.arcade.software/share/cAYa6HIL2vlLVvqfEgVW" %}

<details>

<summary>Transcription</summary>

* Email support@grassrootz.com requesting your API Key and Secret
* Open Integrations
* Click New Integration
* Select Grassrootz
* Enter a name for your Grassrootz integration
* Click Next
* Copy the URL created by MoveData
* In Grassrootz, click Hi {Name}
* Open Webhooks
* Click Create Webhook
* Enter the MoveData URL into the Webhook endpoint field
* Click Save
* Go back to MoveData and click Next
* Enter your Grassrootz Client Key
* Enter your Grassrootz Secret Key
* Click Save. Grassrootz is now connected to Salesforce.

</details>

#### **Grassrootz API Credentials**

To set up the JustGiving integration, you will need four credentials from JustGiving:

1. **Client Key** - Your Grassrootz client identifier
2. **Client Secret** - Your Grassrootz secret identifier

#### Obtaining API Credentials

To access your Consumer and Data App IDs, contact Grassrootz Support ([support@grassrootz.com](mailto:support@grassrootz.com)) requesting access to your Client ID and Secret.

### Integration Settings

| Option                        | Description                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Infer Settlement Currency** | <ul><li><strong>Enabled (Default)</strong> - Uses settlement currency (typically AUD) for donation amounts and creates detailed financial breakdowns with exchange rates</li><li><strong>Disabled</strong> - Uses original transaction currency and amounts as charged</li></ul>                                                                               |
| **Exclude Donor Keys**        | <p>Used to stop replacing the details of fundraisers who donate on behalf of.<br></p><ul><li><strong>Enabled</strong> - Excludes donor key information from notifications; prevents overwriting of fundraiser details when donation on behalf of</li><li><strong>Disabled (Default)</strong> - Includes full donor key information in processed data</li></ul> |

### Bulk Data Import

Bulk data import is available upon request. This is a custom service provided by MoveData and is delivered by MoveData Professional Services.

* Requires a CSV export of the desired data
* Records will only be imported if available via the Grassrootz API

Please raise a ticket by emailing [support@movedata.io](mailto:support@movedata.io) if you require bulk data import.

### Custom Fields

Where possible, all fields are mapped to the appropriate schemas.

For Grassrootz these fall into the following category:

|                      |                                                       |
| -------------------- | ----------------------------------------------------- |
| System Custom Fields | System level information made available by JustGiving |

#### System Custom Fields

The following system level fields are automatically included in MoveData notifications:

<details>

<summary>Contact Custom Fields</summary>

| Attribute Name        | Description                              | Example             |
| --------------------- | ---------------------------------------- | ------------------- |
| `isCustomDisplayName` | Whether contact uses custom display name | `false`             |
| `displayNameOption`   | Display name preference                  | `firstName`         |
| `displayName`         | Custom display name (if used)            | `Dan's Fundraising` |
| `newsletter`          | Newsletter subscription status           | `true`              |

</details>

<details>

<summary>Campaign Custom Fields</summary>

| Attribute Name                | Description                           | Example                            |
| ----------------------------- | ------------------------------------- | ---------------------------------- |
| `raisedAmount`                | Total amount raised for campaign      | `4276.61`                          |
| `allowsFundraisers`           | Whether campaign supports fundraisers | `true`                             |
| `allowsTeams`                 | Whether campaign supports teams       | `true`                             |
| `allowsFitnessActivities`     | Whether fitness tracking is enabled   | `true`                             |
| `allowedFitnessActivityTypes` | Supported fitness activity types      | `walk, run, swim, cycle, wheel`    |
| `eventTier`                   | Event tier classification             | `primary`, `secondary`, `tertiary` |
| `activePagesCount`            | Number of active fundraising pages    | `16`                               |
| `targetAmount`                | Campaign fundraising target           | `1200000`                          |

</details>

<details>

<summary>Team Custom Fields</summary>

| Attribute Name           | Description                      | Example   |
| ------------------------ | -------------------------------- | --------- |
| `raisedAmount`           | Total amount raised by team      | `1683.10` |
| `targetAmount`           | Team fundraising target          | `750`     |
| `donationCount`          | Number of donations received     | `34`      |
| `averageDonationAmount`  | Average donation amount          | `49.50`   |
| `fundraisersCount`       | Total number of team fundraisers | `9`       |
| `fundraisersActiveCount` | Number of active fundraisers     | `7`       |

</details>

<details>

<summary>Fundraiser Custom Fields</summary>

| Attribute Name          | Description                       | Example  |
| ----------------------- | --------------------------------- | -------- |
| `raisedAmount`          | Total amount raised by fundraiser | `214.55` |
| `targetAmount`          | Fundraiser target amount          | `200`    |
| `donationCount`         | Number of donations received      | `6`      |
| `averageDonationAmount` | Average donation amount           | `35.76`  |
| `isAmbassador`          | Ambassador status                 | `false`  |
| `isPublic`              | Whether page is publicly visible  | `true`   |

</details>

<details>

<summary>Donation Custom Fields</summary>

| Attribute Name           | Description                      | Example                             |
| ------------------------ | -------------------------------- | ----------------------------------- |
| `receiptNumber`          | Grassrootz receipt number        | `H-FUA5917-27716-1519888`           |
| `processor`              | Payment processor used           | `stripe`                            |
| `processorTransactionId` | Payment processor transaction ID | `py_3PHMQOKezavzbH4m0lN7h8jF`       |
| `cardInformationType`    | Payment method type              | `visa`, `bankAccount`, `mastercard` |
| `cardInformationCountry` | Card/account country             | `AU`, `US`                          |
| `cardInformationPan`     | Masked card/account number       | `016263 *****7709`                  |
| `settlementDate`         | Transaction settlement date      | `2024-05-24`                        |
| `source`                 | Donation source                  | `gr-public`                         |
| `timezone`               | Transaction timezone             | `Australia/West`                    |
| `cardMethodType`         | Payment Method Type              | `card`, `apple_pay`, `google_pay`   |

</details>

<details>

<summary>Multi-Currency Fields (when inferSettlementCurrency is enabled)</summary>

| Attribute Name    | Description                    | Example   |
| ----------------- | ------------------------------ | --------- |
| `exchangeRate`    | Currency exchange rate applied | `1.51914` |
| `originCurrency`  | Original transaction currency  | `USD`     |
| `originAmount`    | Original transaction amount    | `21.85`   |
| `originFee`       | Original fee amount            | `3.69`    |
| `settledCurrency` | Settlement currency            | `AUD`     |
| `settledAmount`   | Settled amount                 | `33.19`   |
| `settledFee`      | Settled fee amount             | `5.61`    |

</details>

<details>

<summary>Financial Breakdown Fields</summary>

| Attribute Name                        | Description                      | Example |
| ------------------------------------- | -------------------------------- | ------- |
| `donationPaymentPlatformFee`          | Payment platform fee             | `0.96`  |
| `donationPaymentPlatformFeeTax`       | Tax on payment platform fee      | `0.09`  |
| `donationEventOrganizerFee`           | Event organiser fee              | `0.88`  |
| `donationEventOrganizerFeeTax`        | Tax on event organiser fee       | `0.08`  |
| `donationEventOrganizerFeePercentage` | Event organiser fee percentage   | `0.044` |
| `donationSilentFee`                   | Silent fee amount                | `0`     |
| `donationSilentFeeTax`                | Tax on silent fee                | `0`     |
| `donationSilentFeePercentage`         | Silent fee percentage            | `0`     |
| `donationFee`                         | Platform donation fee            | `3.55`  |
| `donationFeeTax`                      | Tax on platform donation fee     | `0.32`  |
| `donationFeePercentage`               | Platform donation fee percentage | `0.05`  |
| `donationNet`                         | Net amount after all fees        | `49.16` |

</details>

<details>

<summary>Organisation Custom Fields</summary>

| Attribute Name          | Description                | Example                               |
| ----------------------- | -------------------------- | ------------------------------------- |
| `organisationId`        | Grassrootz organisation ID | `467`                                 |
| `organisationName`      | Organisation name          | `Vinnies WA`                          |
| `organisationUrlPrefix` | Organisation URL prefix    | `vinnies-wa`                          |
| `legalName`             | Legal organisation name    | `St Vincent de Paul Society (WA) Inc` |
| `taxId`                 | Organisation tax ID        | `18332550061`                         |
| `currency`              | Organisation base currency | `AUD`                                 |
| `timezone`              | Organisation timezone      | `Australia/West`                      |

</details>

### Other Resources

**Grassrootz Platform:**\
[https://www.grassrootz.com/](https://www.grassrootz.com/)
