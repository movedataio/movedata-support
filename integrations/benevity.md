---
description: >-
  Process Benevity CSV reports automatically into Salesforce. Handles employee
  donations and employer matching with comprehensive soft credit allocation.
---

# Benevity

## Overview

The MoveData Benevity integration synchronizes your Benevity platform with Salesforce. It processes Benevity disbursement reports and transfers employee donations, employer matching contributions, and supporter information to Salesforce automatically.

### Key Benefits

* **Automated CSV processing** of Benevity disbursement reports
* **Intelligent employer matching** with comprehensive soft credit support
* **Advanced fee tracking** including platform and merchant fees
* **Complete donation lifecycle** from employee contributions to employer matches

## Integration Summary

| Field     | Value                                          |
| --------- | ---------------------------------------------- |
| Product   | [https://benevity.com/](https://benevity.com/) |
| Method    | CSV File Processing                            |
| Frequency | Manual Upload                                  |

## Supported Extensions

Logic is required to map data from Benevity into Salesforce. To do this, we recommend using one of the supported MoveData Extensions.

| Extension                 | Supported |
| ------------------------- | --------- |
| Fundraising and Donations | ✅         |
| Commerce                  | ❌         |

{% hint style="info" %}
The Fundraising and Donations Extension is required to process Benevity information into Salesforce.
{% endhint %}

## Setup

### Benevity CSV Export

To set up the Benevity integration, you will need to export disbursement reports from your Benevity platform. Please contact your Benevity administrator or refer to Benevity's documentation for specific instructions on how to:

1. Access your organisation's reporting functionality
2. Generate reports in CSV format
3. Download the complete report with all required fields

The exported CSV file should contain donation data in Benevity's standard disbursement report format.

{% hint style="info" %}
[https://causeshelp.benevity.org/hc/en-us/articles/115003003423-Where-do-I-find-my-reports](https://causeshelp.benevity.org/hc/en-us/articles/115003003423-Where-do-I-find-my-reports)
{% endhint %}

### MoveData Benevity Configuration

To create your Benevity Integration:

1. Open the MoveData app and select the **Integrations** tab
2. Click **New Integration** and select **Benevity** from the list of available integrations
3. Add a name for your integration and click **Save**
4. To upload a CSV, click the **Upload File** button

### Upload Benevity File

The Benevity integration processes CSV disbursement files through manual upload. Upload your Benevity file using the **Upload File** button via **MoveData** → **Integrations** → **Benevity** → **Upload File**.

## Configurable Options

There are no configurable options for Benevity.

## File Format

Benevity CSV files follow a specific format with header information and donation records. The integration automatically parses the file structure and processes donation data between the "Company,Project" header and "Totals,,,," footer sections.

### Required CSV Fields

* `Company` - Employer organisation name
* `Project` - Donation project or cause name
* `Donation Date` - Date when the donation was made
* `Transaction ID` - Unique transaction identifier
* `Donor First Name` - Employee's first name
* `Donor Last Name` - Employee's last name
* `Email` - Employee's email address
* `Address` - Street address
* `City` - City
* `State/Province` - State or province
* `Postal Code` - Postal/ZIP code
* `Currency` - Three-letter currency code (e.g., USD, GBP, EUR)
* `Total Donation to be Acknowledged` - Employee donation amount
* `Match Amount` - Employer matching amount
* `Cause Support Fee` - Platform fee
* `Merchant Fee` - Payment processing fee
* `Activity` - Activity or campaign name (optional)
* `Comment` - Donation message (optional)
* `Donation Frequency` - Frequency of donation
* `Source` - Payment source/method
* `Reason` - Donation reason

### Reference File

{% file src="../.gitbook/assets/benevity-example.csv" %}

## Data Migration

Data migration can be completed via the file upload functionality. You will need to download and export the relevant Benevity disbursement reports covering your desired historical period.

## Additional Field Mappings

#### Campaign Hierarchy

The Benevity integration automatically creates a flexible campaign hierarchy in Salesforce:

##### Top-Level Campaign

* **Name**: "Benevity"
* **Purpose**: Top-level container for all Benevity activity

##### Activity-Level Campaigns (When Activity Field Present)

* **Name**: Based on `Activity` field value
* **Purpose**: Represents specific activities within Benevity

#### Employer Matching

Employee and employer donations are processed as separate but linked donation records.

##### Donation Processing

* **Employee Donations**: When `Total Donation to be Acknowledged` > 0
* **Employer Matched Donations**: When `Match Amount` > 0
* **Combined Transactions**: Both employee and employer donations can occur in a single CSV row

##### Matching Logic

* Employee donations are marked as `type: "donor"` in the donation structure
* Employer matched donations are marked as `type: "match"` in the donation structure
* MoveData links employee donations with their corresponding employer matched donations
* Soft credits are created to recognise both the employee donor and employer matcher

##### Transaction Key Format

The integration can split a single line into two notifications.

* Employee donations use the original `Transaction ID`
* Employer matches use `{Transaction ID}_matched` format

## Reference

The following custom fields are automatically included in MoveData notifications:

#### Donation Custom Fields

| Attribute Name      | Description               | Example              |
| ------------------- | ------------------------- | -------------------- |
| `donationType`      | Type of donation          | `"donor"`, `"match"` |
| `donationFrequency` | Frequency of donation     | `"One Time"`         |
| `projectRemoteId`   | Project remote identifier | `"PROJ_001"`         |
| `source`            | Payment source/method     | `"BlueSnap"`         |
| `reason`            | Donation reason           | `"User Donation"`    |
| `feeComment`        | Fee-related comment       | `"Processing fee"`   |
| `postalCode`        | Donor postal code         | `"10010"`            |

#### Fee Processing

##### Fee Types

* **Platform Fees**: `Cause Support Fee` - Benevity platform charges
* **Gateway Fees**: `Merchant Fee` - Payment processing charges
* **Total Fees**: Combined platform and gateway fees

##### Fee Allocation

* Fees are allocated to employee donation records
* Employer matching contributions typically do not include fees
* Fee amounts are preserved in custom fields for reporting and reconciliation

### Data Processing Notes

##### Anonymous Donations

When donor information is marked as "Not shared by donor" or is empty, the donation is attributed appropriately based on available company information.

##### Address Handling

* Complete address information is processed into structured `mailingAddress` fields
* Address quality index is calculated based on completeness
* Postal codes are preserved in custom fields for additional reference

##### Currency Support

* Multi-currency support with currency codes preserved
* Amounts processed as numeric values with appropriate decimal precision

##### Date Processing

* Donation dates are parsed and converted to ISO format
* Validation ensures proper date formatting before processing

## Error Handling

### Common Issues

* **Invalid Dates**: Malformed dates in the CSV will cause processing errors. Ensure dates follow standard format (YYYY-MM-DD).  Avoid opening and resaving using Microsoft Excel.

## Other Resources

* **Benevity Platform:** [https://benevity.com/](https://benevity.com/)
