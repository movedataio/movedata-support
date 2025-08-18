---
description: >-
  Good2Give enables Australian and New Zealand organisations to streamline their
  workplace giving programmes by automatically processing employee and employer
  matching donations.
---

# Good2Give

## Overview

The MoveData Good2Give integration provides seamless, automated synchronisation between your Good2Give workplace giving platform and Salesforce. This comprehensive integration processes workplace giving CSV reports, ensuring that all employee donations, employer matching contributions, and supporter information are automatically transferred to your Salesforce environment, eliminating manual data entry whilst maintaining complete data accuracy.

**Key Benefits:**

* **Automated CSV processing** of Good2Give workplace giving reports
* **Intelligent employer matching** with comprehensive soft credit support
* **Flexible campaign hierarchy** supporting employer and charity project structures
* **Complete donation lifecycle** from employee contributions to employer matches

## Integration Summary

| Field     | Value                                            |
| --------- | ------------------------------------------------ |
| Product   | [https://good2give.ngo/](https://good2give.ngo/) |
| Method    | CSV File Processing                              |
| Frequency | Batch Import                                     |

## Supported Modes

Logic is required to map Good2Give notifications to your Salesforce data. To quickly and easily do so we recommend using one of the supported MoveData Extensions.

| Extension                 | Supported |
| ------------------------- | --------- |
| Fundraising and Donations | ✅         |
| Commerce                  | ❌         |

{% hint style="info" %}
The Fundraising and Donations Extension is required to process the matching of workplace giving and individual donation information in Salesforce.
{% endhint %}

## Setup

**Good2Give CSV Report Export**

To set up the Good2Give integration, you will need to your workplace giving report from Good2Give.  Typically, this is emailed to you on a monthly basis.

**MoveData Good2Give Configuration**

The Good2Give integration processes CSV files containing workplace giving data. Upload your exported Good2Give report through the Integrations tab in the MoveData application.

## Configurable Options

| Option                       | Description                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Enable Account Campaigns** | When enabled, creates employer-level campaigns for each organisation in the workplace giving programme          |
| **Enable Charity Campaigns** | When enabled, creates charity project-level campaigns for specific fundraising initiatives within each employer |

\{% hint style="info" %\} Both options can be enabled simultaneously to create a three-tier campaign hierarchy: Good2Give → Employer → Charity Project \{% endhint %\}

## File Format

Good2Give CSV files follow a specific format with header information and donation records:

```csv
Charity Name,Lodgement Reference,Payment Date,Donation Period,,,,,,,
MockOrganisationName,GOOD2GIV00000000AU,21/05/2025,15/04/2025-21/05/2025,,,,,,,
Donation Date,Good2Give Donor Id,Donor Firstname,Donor Lastname,Donor Email,Employer Name,Donation Type,Charity Project,Donor Reference,Donation Confirmation Number,Donation Amount
15/04/2025,7917312,,,,MockCompany,Employer Matched,General,,G2GDON0008358393AU,$10.00
15/05/2025,7917312,,,,MockCompany Group,Workplace Giving,General,,G2GDON0008386316AU,$10.00
21/05/2025,,,,,,Admin Deduction,,,,-$1.00
```

## Data Migration

Data migration can be completed via the file upload functionality. You will need to download and export the relevant Good2Give workplace giving reports covering your desired historical period.

## Additional Field Mappings

### Campaign Hierarchy

The Good2Give integration automatically creates a flexible campaign hierarchy in Salesforce based on your configuration:

**Default Structure (Account Campaigns Enabled):**

**Tier 1: Good2Give Platform Campaign**

* **Name**: "Good2Give"
* **Type**: Campaign
* **Purpose**: Top-level container for all Good2Give workplace giving activity

**Tier 2: Employer Campaign**

* **Name**: Based on `Employer Name` field (e.g., "REA Group", "Westpac Group")
* **Type**: Team
* **Purpose**: Groups all donations from employees of a specific organisation

**Extended Structure (Charity Campaigns Also Enabled):**

**Tier 3: Charity Project Campaign**

* **Name**: Based on `Charity Project` field (e.g., "General", "Emergency Relief")
* **Type**: Fundraiser
* **Purpose**: Represents specific fundraising initiatives within each employer

### Employer Matching

The Good2Give integration provides sophisticated handling of employer-matched donations.  Employee and Employer donation are linked together as matched donations.

**Donation Types:**

* **Workplace Giving**: Employee donations deducted from payroll
* **Employer Matched**: Matching contributions provided by the employer
* **Admin Deduction**: Platform fees (automatically excluded from processing)

**Matching Logic:**

* Employee donations are marked as `type: "donor"` in the matching structure
* Employer matches are marked as `type: "matcher"` in the matching structure
* MoveData automatically links employee donations with their corresponding employer matches
* Soft credits are created to recognise both the employee donor and employer matcher

## Reference

The following custom fields are automatically included in MoveData notifications:

#### Donation Custom Fields

| Attribute Name       | Description                                 | Example                                  |
| -------------------- | ------------------------------------------- | ---------------------------------------- |
| `paymentDate`        | Date when funds were transferred to charity | `2025-05-21`                             |
| `lodgementReference` | Good2Give payment batch reference           | `GOOD2GIV00000211AU`                     |
| `donorReference`     | Internal donor reference (when provided)    | `EMP001`                                 |
| `friendlyName`       | Human-readable notification identifier      | `[G2G] 79173 - 20250415 - M - REA Group` |

#### Campaign Custom Fields

| Attribute Name   | Description                        | Example            |
| ---------------- | ---------------------------------- | ------------------ |
| `employerName`   | Name of the employing organisation | `REA Group`        |
| `charityProject` | Specific fundraising project name  | `Emergency Relief` |

#### Contact Custom Fields

| Attribute Name     | Description                         | Example     |
| ------------------ | ----------------------------------- | ----------- |
| `good2giveDonorId` | Good2Give internal donor identifier | `79173`     |
| `employerName`     | Employee's organisation name        | `REA Group` |

#### Account Custom Fields

| Attribute Name          | Description                               | Example   |
| ----------------------- | ----------------------------------------- | --------- |
| `good2giveEmployerId`   | Good2Give organisation identifier         | `REAG001` |
| `workplaceGivingActive` | Whether organisation has active programme | `true`    |

### Data Processing Notes

**Anonymous Donations:**

* When `Donor Firstname` and `Donor Lastname` are empty, the donation is attributed to the employer organisation

**Amount Formatting:**

* All amounts are processed as AUD currency
* Dollar signs and commas are automatically removed during processing
* Negative amounts (like Admin Deductions) are excluded from donation processing

**Date Handling:**

* Donation dates use DD/MM/YYYY format in the CSV
* Payment dates represent when funds are transferred to the receiving charity
* Donation periods show the payroll period covered by the batch

## Error Handling

**Common Issues:**

* **Invalid Dates**: Malformed dates in the CSV will cause processing errors.  This can happen if the file has be resaved using Microsoft Excel.

## Other Resources

**Good2Give Platform:**\
[https://good2give.ngo/](https://good2give.ngo/)
