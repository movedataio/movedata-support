# Raisely

### Overview

This article summarises how to set up and maintain your Raisely integration.

#### Integration Summary

| Field     | Value                                        |
| --------- | -------------------------------------------- |
| Product   | [https://raisely.com/](https://raisely.com/) |
| Method    | Push (Webhooks)                              |
| Frequency | Real-Time                                    |

#### Demonstration Video

{% embed url="https://www.youtube.com/watch?v=udh_kNTb36A" %}

### Integration Setup

{% embed url="https://movedata.share.arcade.software/share/JMot2zEFr7vkYBuF09oL" %}

#### Raisely Events

When you register your webhook in Raisely you can choose to subscribe to specific events. If you do not select any events, then Raisely will send all events through to MoveData. Often, different events will contain similar information (for example: `subscription.updated` and `subscription.rebilled`) which Administrators might want to control. The events we recommend subscribing to are:

| Domain       | Events                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| Profile      | <ul><li>Profile Created</li><li>Profile Updated</li><li>Profile Deleted</li></ul>                                |
| Donation     | <ul><li>Donation Created</li><li>Donation Succeeded</li><li>Donation Updated</li><li>Donation Refunded</li></ul> |
| Subscription | <ul><li>Subscription Updated</li></ul>                                                                           |
| Order        | <ul><li>Order Succeeded</li></ul>                                                                                |

### Integration Settings

| Option                                                                                                                         | Description                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Processor Version                                                                                                              | <ul><li><strong>V1: Donation Only (default)</strong><br>Processes all Raisely information except Orders</li><li><strong>V2: Donation &#x26; Tickets</strong><br>All V1 functionality plus Orders</li></ul>                                                            |
| <p>Fee Allocation Method<br><br><em>Note: only available if Processor Version set to V2: Donation &#x26; Tickets</em></p>      | <ul><li><strong>Donation Only</strong><br>Fee allocated to Donation record</li><li><strong>Order Only (default)</strong><br>Fee allocated to Order record</li><li><strong>Split 50/50</strong><br>Fee distributed evenly against Donation and Order records</li></ul> |
| <p>Aggregate Order Line Items<br><br><em>Note: only available if Processor Version set to V2: Donation &#x26; Tickets</em></p> | <ul><li><strong>Retain Individual Order Lines (default)</strong><br>Creates Opportunity Product for each ticket </li><li><strong>Combine Where Product is the Same</strong><br>Creates Opportunity Product for each ticket type</li></ul>                             |
| Facebook as Standard Donations                                                                                                 | <ul><li><strong>Offline Donation (default)</strong><br>Treats Facebook Donations as Offline Donations</li><li><strong>Once-Off Anonymous Donation</strong><br>Treats Facebook Donations as Online Donations</li></ul>                                                 |
| Use Notification over Profile for Addresses                                                                                    | <ul><li><strong>Prioritise User Profile Data (default)</strong><br>Uses address from the Raisely Profile</li><li><strong>Prioritise Notification Data</strong><br>Uses address from the Raisely donation</li></ul>                                                    |

### Bulk Data Import

Bulk data import is available upon request. This is a custom service provided by MoveData and is delivered by MoveData Professional Services.

* Requires a CSV export of Raisely donation, profile and order reports
* Records will only be imported if available via the Raisely API

Please raise a ticket by emailing [support@movedata.io](mailto:support@movedata.io) if you require bulk data import.

### Custom Fields

Where possible, all fields are mapped to the appropriate schemas. Often there are fields that do not fit explicitly into a schema and these are appended as custom fields. Raisely Questions are dynamically added to Questions entries within the produced schema objects.

#### Special Custom Fields

Raisely allows users to add custom fields to their forms. Raisely's Special fields are listed below. If fields are added with specific Field IDs, MoveData will automatically enact business logic against those fields.

For example, if you add the field `company` and this field has a value, then MoveData will construct an Organisation Account record based on the `company` value.

| Attribute Name | Field Type     | Description                                                                                                                                      |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `address`      | Address Lookup | Sets Address information against the Contact                                                                                                     |
| `phone`        | Phone Number   | Sets Phone information against the Contact                                                                                                       |
| `birthday`     | Date           | Sets Date of Birth information against the Contact                                                                                               |
| `company`      | Text           | Creates an Organisation Account for the company entered and establishes an Organisation Affiliation between the Contact and Organisation Account |
| `salutation`   | Select Items   | Sets Salutation information against the Contact                                                                                                  |

#### Standard Custom Fields

The following custom fields are automatically included in MoveData notifications:

<details>

<summary>Contact Custom Fields</summary>

| Attribute Name   | Description                           | Example                            |
| ---------------- | ------------------------------------- | ---------------------------------- |
| `facebookId`     | Facebook User ID                      | `123456789`                        |
| `accessToken`    | User Access Token                     | `88985ee81ea8cb1bfbf91fd120abdb59` |
| `unsubscribedAt` | Date & Time when Contact unsubscribed | `2024-01-15T10:30:00Z`             |
| `preferredName`  | User's Preferred Name                 | `Dan`                              |

</details>

<details>

<summary>Campaign Custom Fields</summary>

| Attribute Name      | Description                        | Example               |
| ------------------- | ---------------------------------- | --------------------- |
| `type`              | Raisely Profile Type               | `GROUP`, `INDIVIDUAL` |
| `apiSource`         | Raisely Notification Type          | `profile.created`     |
| `path`              | URL Path                           | `/my-fundraiser`      |
| `grandTotal`        | Grand Total                        | `15000.00`            |
| `campaignTotal`     | Total for Profile                  | `12000.00`            |
| `feeTotal`          | Fees Paid for Profile              | `450.00`              |
| `activityTotal`     | Total activity for Profile         | `25`                  |
| `exerciseGoal`      | Exercise goal for Profile          | `100`                 |
| `exerciseGoalTime`  | Time goal for Exercise for Profile | `3600`                |
| `exerciseTotal`     | Exercise for Profile               | `85`                  |
| `exerciseTotalTime` | Time Exercising for Profile        | `3200`                |

</details>

<details>

<summary>Donation Custom Fields</summary>

| Attribute Name       | Description                                  | Example                                                                                                  |
| -------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `transactionId`      | Raisely Transaction ID                       | `fa644aa0-c0be-11ee-9ab5-95d96e0fdcf0`                                                                   |
| `apiSource`          | Raisely Notification Type                    | <p><code>profile.created</code>, <code>profile.updated</code>,</p><p><code>donation.succeeded</code></p> |
| `settlementDate`     | Transaction Settlement Date (when available) | `2024-02-05`                                                                                             |
| `ipAddress`          | Donor IP Address                             | `103.85.36.147`                                                                                          |
| `ipAddressTimezone`  | Timezone derived from IP Address             | `Australia/Sydney`                                                                                       |
| `customerId`         | Payment Gateway Customer ID                  | `cus_PTq5WeBEK9kyOL`                                                                                     |
| `giftAid`            | UK Gift Aid Flag (when relevant)             | `false`                                                                                                  |
| `processorToken`     | Payment Intent Token                         | `pi_3OesP72lDfjSkBhQ1RQ3pWox`                                                                            |
| `transactionToken`   | Balance Transaction Token                    | `txn_3OesP72lDfjSkBhQ1EwnXLBH`                                                                           |
| `responseCode`       | Response Code from Payment Gateway           | `00`                                                                                                     |
| `gatewayDescription` | Payment Gateway Transaction Description      | `Donation (18275406) of AUD22.85 from Dan RG21...`                                                       |
| `receiptDownloadUrl` | Raisely Receipt PDF Link                     | `https://api.raisely.com/v3/receipt/...pdf`                                                              |
| `cardMethodType`     | Payment Method Type                          | `card`, `apple_pay`, `google_pay`                                                                        |

</details>

<details>

<summary>Recurring Donation Custom Fields</summary>

| Attribute Name | Description                          | Example                               |
| -------------- | ------------------------------------ | ------------------------------------- |
| `status`       | Original Raisely Subscription Status | `OK`, `FAILED`, `CANCELLED`, `PAUSED` |

</details>

<details>

<summary>Catalog Custom Fields</summary>

| Attribute Name   | Description                                       | Example             |
| ---------------- | ------------------------------------------------- | ------------------- |
| `photoUrl`       | Product Photo URL                                 | `https://image.url` |
| `type`           | Raisely Product Type                              | `TICKET`            |
| `totalSold`      | Total Number Sold                                 | `150`               |
| `totalAvailable` | Max Number that can be Sold                       | `200`               |
| `startDate`      | Start Date that the Product is available for Sale | `2024-01-01`        |
| `endDate`        | Last Date that the Product is available for Sale  | `2024-12-31`        |

</details>

<details>

<summary>Order Custom Fields</summary>

| Attribute Name       | Description                                  | Example               |
| -------------------- | -------------------------------------------- | --------------------- |
| `settlementDate`     | Transaction Settlement Date (when available) | `2024-01-16`          |
| `processorToken`     | Payment Gateway Card Token                   | `card_abc123`         |
| `responseCode`       | Response Code from Payment Gateway           | `00`                  |
| `gatewayDescription` | Payment Gateway Transaction Description      | `Order via Stripe`    |
| `receiptDownloadUrl` | Raisely Receipt PDF Link                     | `https://receipt.url` |

</details>

<details>

<summary>Order Item Custom Fields</summary>

| Attribute Name     | Description       | Example     |
| ------------------ | ----------------- | ----------- |
| `status`           | Order Item Status | `CONFIRMED` |
| `attendanceStatus` | Attendance Status | `ATTENDED`  |

</details>

### Other Resources

**Raisely Data Fields:**\
[https://support.raisely.com/article/484-the-data-fields-explained](https://support.raisely.com/article/484-the-data-fields-explained)
