# GiveEasy

### Overview

This article summarises how to set up and maintain your GiveEasy integration.

#### Integration Summary

| Field     | Value                                          |
| --------- | ---------------------------------------------- |
| Product   | [https://giveeasy.org/](https://giveeasy.org/) |
| Method    | Push (Webhooks)                                |
| Frequency | Real-Time                                      |

#### Demonstration Video

{% hint style="info" %}
Coming Soon
{% endhint %}

### Integration Setup

{% embed url="https://app.arcade.software/share/Sx4W4DOaEDUkKURLCU9C" %}

### Integration Settings

| Option                                     | Description                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create Pages as Fundraiser Campaigns       | <ul><li>Enabled<br>GiveEasy Pages are represented as Campaign records in Salesforce. Donations are allocated to the equivalent campaign in the hierarchy.</li><li>Disabled<br>GiveEasy Pages are not represented as Campaign records in Salesforce. Donations are allocated to a single Salesforce campaign regardless of GiveEasy Page.</li></ul> |
| Only process donations from live campaigns | <ul><li>Enabled<br>Donations made in test mode are not processed into Salesforce</li><li>Disabled<br>Donations made in test mode are processed into Salesforce</li></ul>                                                                                                                                                                           |

### Bulk Data Import

Data Migration is available upon request. This is a custom service provided by MoveData and is delivered by MoveData Professional Services.

* Requires coordination with GiveEasy for historical data access
* Records will only be imported if available via the GiveEasy API

Please raise a ticket by emailing [support@movedata.io](mailto:support@movedata.io) if you require bulk data import.

### Custom Fields

Where possible, all fields are mapped to the appropriate schemas. Often there are fields that do not fit explicitly into a schema and these are appended within the produced schema objects.

For GiveEasy these fall into two categories:

| Type                 | Description                                         |
| -------------------- | --------------------------------------------------- |
| Admin Custom Fields  | All other custom fields created in GiveEasy         |
| System Custom Fields | System level information made available by GiveEasy |

#### **Admin Custom Fields**

These are any other fields you add in GiveEasy.

For example, if you add the field `How Did You Hear About Us` and this field has a value, then this will be issued by GiveEasy like:

```json
{
  "customFields": [
    {
      "id": "0da90b67-70d4-4992-b50f-34d26233f9ce",
      "name": "How Did You Hear About Us",
      "values": ["Google"]
    }
  ]
}
```

In the MoveData schema this is available as:

```json
  "custom": {
    "fieldHowdidyouhearaboutus": "Google"
  }
```

In the MoveData variables this is available as `Custom_FieldHowdidyouhearaboutus: Google`.

#### System Custom Fields

The following system level fields are automatically included in MoveData notifications:

<details>

<summary>Campaign Custom Fields</summary>

| Attribute Name | Description            | Example                            |
| -------------- | ---------------------- | ---------------------------------- |
| `type`         | GiveEasy campaign type | `"Appeal"`, `"Event"`, `"General"` |

</details>

<details>

<summary>Donation Custom Fields</summary>

| Attribute Name        | Description                       | Example                                                                  |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| `processorToken`      | Payment gateway transaction token | `"8YT11757MG3248140"` (PayPal), `"pi_3RVroaKgwKnuLBcM0WkaObPA"` (Stripe) |
| `stripePaymentIntent` | Stripe payment intent ID          | `"pi_3RVroaKgwKnuLBcM0WkaObPA"`                                          |
| `paypalCaptureId`     | PayPal capture transaction ID     | `"8YT11757MG3248140"`                                                    |
| `isPIIPublic`         | Whether donor info can be public  | `true`, `false`                                                          |
| `ipAddress`           | Donor IP address                  | `"124.190.10.16"`                                                        |
| `userAgent`           | Donor browser user agent          | `"Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X)"`               |
| `screenSize`          | Device screen size category       | `"Desktop"`, `"Mobile"`, `"Tablet"`                                      |
| `facebookPixel`       | Facebook pixel tracking data      | `"fb.2.1750814146386.517071266419391678"`                                |
| `isLiveMode`          | Whether transaction was live      | `true`, `false`                                                          |

</details>

## Other Resources

**GiveEasy Platform:**\
[https://giveeasy.org/](https://giveeasy.org/)
