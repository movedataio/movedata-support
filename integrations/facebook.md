---
description: >-
  The Facebook integration automates the transfer of fundraising donation data
  to Salesforce through CSV file processing, creating intelligent campaign
  hierarchies and supporting UK Gift Aid.
---

# Facebook

## Overview

The MoveData Facebook integration provides seamless data synchronisation between your Facebook fundraising activities and Salesforce. This powerful integration processes Facebook donation reports, ensuring that all donation activities and supporter information are automatically transferred to your Salesforce environment, eliminating manual data entry whilst maintaining complete data accuracy.

### Key Benefits

* **Automated CSV processing** of Facebook donation transaction reports
* **Intelligent campaign hierarchy** management for Facebook fundraisers
* **Advanced financial tracking** including fees and currency conversion
* **Support for peer-to-peer fundraising** campaigns and user post donations
* **Gift Aid support** for UK donations (when applicable)

## Integration Summary

| Field     | Value                                          |
| --------- | ---------------------------------------------- |
| Product   | [https://facebook.com/](https://facebook.com/) |
| Method    | CSV File Processing                            |
| Frequency | Batch Import                                   |

## Supported Modes

Logic is required to map Facebook donation notifications to your Salesforce data. To quickly and easily do so, we recommend using one of the supported MoveData Extensions.

| Extension                 | Supported |
| ------------------------- | --------- |
| Fundraising and Donations | ✅         |
| Commerce                  | ❌         |

## Setup

### Facebook Transaction Report Export

To set up the Facebook integration, you will need to export transaction reports from Facebook's fundraising platform:

1. Log in to your Facebook fundraising admin dashboard or Facebook Business Manager
2. Navigate to **Charitable Giving Tools** or **Fundraising Reports**
3. Generate and download your **Transaction Report** as a CSV file
4. Ensure the export includes all required fields (see Additional Field Mappings section below)

### MoveData Facebook Configuration

1. Open the MoveData app and select the **Integrations** tab
2. Click **New Integration** and select **Facebook** from the list of available integrations
3. Add a name for your integration and click **Save**
4. Configure your integration settings based on your requirements

### CSV File Processing

The Facebook integration processes CSV files containing transaction data. Upload your exported Facebook transaction report through the Integrations tab in the MoveData application.

## Configurable Options

There are no configurable options for the Facebook integration.

## Data Migration

Data migration can be completed via the file upload functionality. You will need to download and export the relevant Facebook donation reports.

## Additional Field Mappings

### Campaign Hierarchy

The Facebook integration automatically creates a three-tier campaign hierarchy in Salesforce:

##### Tier 1: Facebook Platform Campaign

* **Name**: "Facebook"
* **Type**: Campaign
* **Purpose**: Top-level container for all Facebook fundraising activity

##### Tier 2: Fundraiser Type Campaign

* **Name**: Based on `Fundraiser Type` field (e.g., "Personal Fundraiser", "Nonprofit Fundraiser")
* **Type**: Team
* **Purpose**: Groups fundraisers by their Facebook category

##### Tier 3: Individual Fundraiser Campaign

* **Name**: Based on `Fundraiser Title` or auto-generated from source type
* **Type**: Fundraiser
* **Purpose**: Represents the specific fundraising page or campaign
* **URL**: Links to the Facebook fundraising page via `Permalink`

## Reference

The following custom fields are automatically included in MoveData notifications:

### Donation Custom Fields

| Attribute Name     | Description                                | Example          |
| ------------------ | ------------------------------------------ | ---------------- |
| `paymentId`        | Facebook Payment ID                        | `12345678901234` |
| `chargeTime`       | Unix timestamp of transaction              | `1640995200`     |
| `chargeActionType` | Facebook charge action type                | `S` (Successful) |
| `receiptNumber`    | Payment ID used as receipt reference       | `12345678901234` |
| `senderCurrency`   | Original currency if different from payout | `USD`            |
| `netPayoutAmount`  | Net amount after Facebook fees             | `95.50`          |

### Campaign Custom Fields

| Attribute Name   | Description                            | Example                                  |
| ---------------- | -------------------------------------- | ---------------------------------------- |
| `fundraiserId`   | Extracted fundraiser ID from permalink | `fundraiser_id_123`                      |
| `sourceName`     | Facebook source type                   | `fundraiser`, `donate_button_user_posts` |
| `fundraiserType` | Category of Facebook fundraiser        | `Personal Fundraiser`                    |
| `charityId`      | Facebook charity identifier            | `987654321`                              |
| `permalinkUrl`   | Full URL to Facebook fundraising page  | `https://facebook.com/fundraisers/...`   |

### Contact Custom Fields (Gift Aid)

| Attribute Name    | Description                               | Example            |
| ----------------- | ----------------------------------------- | ------------------ |
| `giftaidEligible` | Whether donation is eligible for Gift Aid | `true`             |
| `giftaidFullName` | Full name for Gift Aid purposes           | `John Smith`       |
| `giftaidEmail`    | Email address for Gift Aid receipts       | `john@example.com` |
| `giftaidCountry`  | Country for Gift Aid eligibility          | `United Kingdom`   |
