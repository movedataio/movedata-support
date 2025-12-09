# Enthuse

### Overview

This article summarises how to set up and maintain your Raisely integration.

#### Integration Summary

| Field     | Value                                        |
| --------- | -------------------------------------------- |
| Product   | [https://enthuse.com/](https://enthuse.com/) |
| Method    | Pull (Polling)                               |
| Frequency | Configurable (10 minutes to 24 hours)        |

{% hint style="warning" %}
We do not currently integrate information from Enthuse's `Events` product (which has a completely separate API)
{% endhint %}

#### Demonstration Video

{% embed url="https://www.youtube.com/watch?v=IWc1n8Q4Fnw" %}

### Integration Setup

{% embed url="https://app.arcade.software/share/8wNJYApgy8AhFSMxOX4m" %}

<details>

<summary>Transcription</summary>

* Email support@enthuse.com requesting your API Key, Client ID and Secret
* Open Integrations
* Click New Integration
* Select Enthuse
* Enter a name for your Enthuse integration
* Click Next
* Enter your Enthuse Client ID
* Enter your Enthuse Client Secret
* Enter your Entuse API Key
* Click Save. Your Enthuse integration is now connected.

</details>

#### Enthuse API Credentials

To set up the Enthuse integration, you will need three credentials from Enthuse:

1. **Client ID** - Your OAuth application client identifier
2. **Client Secret** - Your OAuth application secret key
3. **API Key** - Your Enthuse reporting API access key

To obtain these credentials, please raise a support ticket directly with Enthuse requesting API access for your MoveData integration.

### Integration Settings

| Option                                  | Description                                                                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Use Display Name**                    | Controls campaign naming for fundraising pages. When enabled, uses the supporter's display name; when disabled, uses the page title.         |
| **Ignore Address2 when United Kingdom** | Enthuse pushes a duplicate of the city name in the Address2 field when the address is for the UK. Toggling this to true, ignores this value. |

### Bulk Data Import

Buld data import is available upon request. This is a custom service provided by MoveData and is delivered by MoveData Professional Services.

* Requires access to Enthuse's reporting API
* Historical data available based on your Enthuse data retention policies
* Configurable date ranges for initial data import

### **Gift Aid Processing**

The Enthuse integration includes comprehensive Gift Aid support for UK charities:

* **Automatic Gift Aid Calculation**: Gift Aid amounts are automatically calculated and tracked
* **HMRC Submission Tracking**: Monitor which donations have been submitted to HMRC
* **Gift Aid Fee Tracking**: Separate tracking of Gift Aid processing fees
* **Compliance Reporting**: Built-in fields for Gift Aid compliance and audit requirements

### Custom Fields

Where possible, all fields are mapped to the appropriate schemas. Often there are fields that do not fit explicitly into a schema and these are appended within the produced schema objects.For Raisely these fall into three categories:

| Custom Codes Field   | Custom code fields created in Enthuse              |
| -------------------- | -------------------------------------------------- |
| System Custom Fields | System level information made available by Enthuse |

#### **Custom Codes**

Enthuse allows organisations to add custom codes to fundraising pages for additional tracking and reporting. MoveData automatically includes these in the resulting notification schema.

**Custom Code Mapping**: Custom codes are mapped using the pattern `code{CodeName}` where special characters are removed from the code name.

**Example**: A custom code named "Nominal Code" with value "LM:U/4900" becomes:

```
custom.codeNominalCode = "LM:U/4900"
```

#### System Custom Fields

The following system level fields are automatically included in MoveData notifications:

<details>

<summary>Contact Custom Fields</summary>

| Attribute Name             | Description                  | Example                |
| -------------------------- | ---------------------------- | ---------------------- |
| `enthuseIsFund`            | Supporter is a fundraiser    | `true`                 |
| `enthuseIsDonor`           | Supporter has made donations | `true`                 |
| `enthuseUserGuid`          | Enthuse User GUID            | `abc123def-456...`     |
| `enthuseSupporterCurrency` | Supporter's currency         | `GBP`                  |
| `enthuseTotalFundsRaised`  | Total amount raised          | `1250.00`              |
| `enthuseLifeTimeGiftAid`   | Lifetime Gift Aid claimed    | `312.50`               |
| `enthuseLastDonationDate`  | Date of last donation        | `2024-01-15T10:30:00Z` |
| `allowedToContact`         | Marketing permission granted | `true`                 |
| `emailOptIn`               | Email marketing permission   | `true`                 |
| `phoneOptIn`               | Phone marketing permission   | `false`                |
| `smsOptIn`                 | SMS marketing permission     | `false`                |
| `postOptIn`                | Postal marketing permission  | `false`                |

</details>

<details>

<summary>Campaign Custom Fields</summary>

| Attribute Name                | Description                          | Example                        |
| ----------------------------- | ------------------------------------ | ------------------------------ |
| `enthuseOfflineDonationCount` | Number of offline donations recorded | `25`                           |
| `enthuseGiftaidAmount`        | Total Gift Aid amount                | `256.33`                       |
| `code{CustomCodeName}`        | Dynamic custom code fields           | `codeNominalCode: "LM:U/4900"` |

</details>

<details>

<summary>Donation Custom Fields</summary>

| Attribute Name       | Description                              | Example                                  |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| `enthusePaymentGuid` | Enthuse Payment Transaction GUID         | `a22b95cd-e05a-4953-ac0a-d44ada37deb5`   |
| `enthuseCheckoutId`  | Enthuse Checkout ID                      | `161472`                                 |
| `transactionType`    | Type of transaction                      | `Payment`, `Refund`                      |
| `productType`        | Product type                             | `Fundraising`                            |
| `paymentType`        | Payment type                             | `Donation`                               |
| `serviceFee`         | Platform service fee                     | `0.13`                                   |
| `giftaidAmount`      | Gift Aid amount claimed                  | `2.50`                                   |
| `giftaidFee`         | Gift Aid processing fee                  | `0.13`                                   |
| `giftaidHmrcStatus`  | HMRC submission status                   | `false`                                  |
| `giftingAmount`      | Amount processed under gifting fee model | `10.00`                                  |
| `donorCoveredAmount` | Amount of fees covered by donor          | `0.62`                                   |
| `paymentFeeModel`    | Fee model used                           | `Gifting`, `DonorFeeCover`               |
| `context`            | Integration context                      | `campaign`, `diy`, `direct`, `recurring` |
| `contextCampaign`    | Is part of a formal campaign             | `true`                                   |
| `contextDiy`         | Is a DIY fundraising page                | `false`                                  |
| `contextDirect`      | Is a direct donation                     | `false`                                  |
| `contextRecurring`   | Is a recurring donation                  | `false`                                  |

</details>

<details>

<summary>Recurring Donation Custom Fields</summary>

| Attribute Name | Description              | Example                                   |
| -------------- | ------------------------ | ----------------------------------------- |
| `status`       | Enthuse recurring status | `Active`, `Failed`, `Cancelled`, `Paused` |

</details>

### Other Resources

**Enthuse API Documentation:**\
[https://enthuse.readme.io/](https://enthuse.readme.io/)

**Enthuse Support:**\
Contact Enthuse directly for API access requests and platform-specific questions.

**MoveData Support:**\
Visit [docs.movedata.io](https://docs.movedata.io) for additional integration guides and support resources.
