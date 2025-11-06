---
description: >-
  Automates Charities Trust workplace giving and partner donation data into
  Salesforce via CSV upload, supporting both payroll and other source formats.
---

# Charities Trust

## Overview

The MoveData Charities Trust integration provides seamless, automated synchronisation between your Charities Trust giving platform and Salesforce. This comprehensive integration processes Charities Trust donation reports, ensuring that all workplace giving contributions, other source donations, supporter information, and diverse funding streams are automatically transferred to your Salesforce environment, eliminating manual data entry whilst maintaining complete data accuracy.

### Key Benefits:

* **Automated CSV file processing** of Charities Trust donation reports
* **Dual donation processing** supporting both workplace giving and other funding sources
* **Flexible source tracking** including partner payments, match funding schemes, and direct payments
* **Intelligent employer matching** with comprehensive soft credit support for payroll giving
* **Advanced campaign hierarchy** management for diverse donation sources

## Integration Summary

| Field     | Value                                                      |
| --------- | ---------------------------------------------------------- |
| Product   | [https://charitiestrust.org/](https://charitiestrust.org/) |
| Method    | CSV File Processing                                        |
| Frequency | Manual Upload                                              |

## Supported Modes

Logic is required to map Charities Trust notifications to your Salesforce data. To quickly and easily do so, we recommend using one of the supported MoveData Extensions.

| Extension                 | Supported |
| ------------------------- | --------- |
| Fundraising and Donations | ✅         |
| Commerce                  | ❌         |

{% hint style="info" %}
The Fundraising and Donations Extension is required to process workplace giving and other source donation information in Salesforce.
{% endhint %}

## Setup

### Charities Trust Report Export

To set up the Charities Trust integration, you will need to export donation reports from your Charities Trust platform. Contact your Charities Trust administrator for specific instructions on how to:

1. Access your organisation's donation reporting functionality
2. Generate donation reports in CSV format
3. Download the complete donation report with all required fields

The exported CSV file should contain donation transaction data in Charities Trust's standard report format.

### MoveData Charities Trust Configuration

To create your Charities Trust Integration:

1. Open the MoveData app and select the **Integrations** tab
2. Click **New Integration** and select **Charities Trust** from the list of available integrations
3. Add a name for your integration and click **Save**
4. Configure the **Donation Date** that will be used for processing uploaded files
5. To upload a CSV file, click the **Upload File** button

### CSV File Processing

The Charities Trust integration processes CSV donation files through manual upload. Upload your exported Charities Trust donation report using the **Upload File** button in your integration configuration.

{% hint style="warning" %}
**Important**: You must set the Donation Date before uploading each file. This date will be used for all donations processed from that file upload.
{% endhint %}

## Configurable Options

| Option            | Description                                                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Donation Date** | The date that will be applied to all donations in the uploaded file. This must be set in YYYY-MM-DD format before each file upload. The integration will validate this date and prevent processing if it's missing or incorrectly formatted. |

## File Format

Charities Trust CSV files support two different report types, which are automatically detected by the integration:

### Other Sources Format

For donations from various external sources, partner organisations, and direct payments:

* `Donation Source` - Source of the donation (e.g., "Your Cause", "Nationwide Building Society Match Funding Scheme")
* `Amount` - Donation amount
* `Title` - Donor title/salutation
* `Forename` - Donor first name
* `Surname` - Donor surname
* `Address` - Donor address
* `PostCode` - Postal code
* `Type` - Donation type code
* `Type Description` - Description of donation type (e.g., "PartnerPayments (with no assoc Event)", "DirectPayments")
* `Donation Instruction` - Donation message or instructions
* `Transaction ID` - Unique transaction identifier
* `SponsorMe Organisation` - Associated organisation
* `SponsorMe Campaign` - Associated campaign
* `SponsorMe EventID` - Event identifier
* `SponsorMe EventName` - Event name
* `SponsorMe EventURL` - Event URL
* `Email` - Donor email address
* `Telephone No` - Donor telephone number
* `Preference Post` - Postal marketing preference (Yes/No)
* `Preference Email` - Email marketing preference (Yes/No)
* `Preference Phone` - Phone marketing preference (Yes/No)
* `Preference Text` - SMS marketing preference (Yes/No)
* `StatementText` - Statement text

### Payroll Giving Format

For workplace giving donations:

* `AgencyName` - Must be "Charities Trust"
* `Employer Name` - Employer organisation name
* `Title` - Donor title/salutation
* `First Name` - Donor first name
* `Last Name` - Donor surname
* `Donor Email` - Donor email address
* `Donor Tel No` - Donor telephone number
* `Address 1` - First line of address
* `Address 2` - Second line of address
* `Address 3` - Third line of address
* `Postcode` - Postal code
* `PFO` - Payroll Fundraising Organisation
* `PFO Donor Reference Number` - PFO donor reference
* `PGA Donor Ref Number` - Payroll Giving Agency donor reference
* `Charity Donor Ref Number` - Charity's internal donor reference
* `Gross Donation` - Gross donation amount
* `Admin Charge` - Administrative fees
* `Net Donation` - Net donation after fees
* `Employer Matched Donation` - Employer matching amount
* `Other Match` - Other matching contributions
* `Total Donation to Charity` - Total amount to charity
* `Donor Preference Post` - Postal marketing preference (Yes/No)
* `Donor Preference Email` - Email marketing preference (Yes/No)
* `Donor Preference Phone` - Phone marketing preference (Yes/No)
* `Donor Preference SMS` - SMS marketing preference (Yes/No)

## Data Migration

Data migration can be completed via the file upload functionality. You will need to download and export the relevant Charities Trust donation reports covering your desired historical period.

* Records are processed based on the file format automatically detected by the integration
* Set appropriate donation dates for each historical period
* Multiple files can be uploaded to cover different time periods

## Additional Field Mappings

**Campaign Hierarchy**

The Charities Trust integration automatically creates a flexible campaign hierarchy in Salesforce:

**Top-Level Campaign:**

* **Name**: "Charities Trust"
* **Key**: `ct`
* **Type**: Campaign
* **Purpose**: Top-level container for all Charities Trust activity

**Source-Level Campaigns (Other Sources):**

* **Name**: Based on donation source (e.g., "Your Cause", "Nationwide Building Society Match Funding Scheme")
* **Key**: MD5 hash of source name (e.g., `d0fc39813e2694871723498406ac1bd0` for "Your Cause")
* **Type**: Fundraiser
* **Purpose**: Groups donations from specific external sources or partner organisations

**Employer-Level Campaigns (Payroll Only):**

* **Name**: Based on employer name (e.g., "Aon", "ARM LTD")
* **Key**: Employer name converted to lowercase alphanumeric (e.g., `aon`, `armltd`)
* **Type**: Fundraiser
* **Purpose**: Groups all donations from employees of a specific organisation
* **Primary Contact**: Associated employer organisation account
* **Anonymous Handling**: No employer campaign created when employer is "Anonymous"

#### Other Sources Processing

The Charities Trust integration handles diverse donation sources through the "Other Sources" functionality:

**Source Categories:**

* **Partner Payments**: Donations from partner organisations (e.g., "Your Cause: PartnerPayments (with no assoc Event)")
* **Match Funding**: Corporate matching schemes (e.g., "Nationwide Building Society Match Funding Scheme: DirectPayments")
* **Direct Payments**: Direct contributions from various sources
* **Event-Associated**: Donations linked to specific events via SponsorMe integration

**Key Processing Features:**

* **Automatic Source Detection**: Creates fundraiser campaigns based on donation source
* **Anonymous Handling**: Supports anonymous donations when donor information is missing
* **Transaction Tracking**: Uses transaction IDs when available, otherwise generates keys based on date and sequence
* **Message Preservation**: Captures donation instructions and messages for context

#### Employer Handling (Payroll)

**Payroll Report Processing:**

* **Employee Donations**: Processed as individual donations with employer context
* **Employer Matching**: Separate donation records created for matched contributions
* **Matching Logic**: Employee and employer donations are linked through matching structures
* **Soft Credits**: Created to recognise both employee donor and employer matcher
* **Anonymous Handling**: Support for anonymous employee and employer donations

#### Recurring Donation Support

**Payroll Giving:**

* All payroll donations are treated as part of recurring monthly schedules
* Uses PGA Donor Reference Number as the recurring donation key
* Monthly frequency based on payroll cycles

**Other Sources:**

* Generally processed as one-time donations
* No automatic recurring donation creation for other sources

## Reference

The following custom fields are automatically included in MoveData notifications:

#### Donation Custom Fields

**Other Sources:**

| Attribute Name    | Description                      | Example                                                                                |
| ----------------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| `source`          | Integration source               | `"other"`                                                                              |
| `donationSource`  | Source of the donation           | `"Your Cause"`, `"Nationwide Building Society Match Funding Scheme"`                   |
| `typeDescription` | Description of donation type     | `"PartnerPayments (with no assoc Event)"`, `"DirectPayments"`                          |
| `friendlyName`    | Human-readable notification name | `"[Charities Trust: Other Sources] Your Cause: PartnerPayments (with no assoc Event)"` |

**Payroll Giving:**

| Attribute Name      | Description                        | Example             |
| ------------------- | ---------------------------------- | ------------------- |
| `source`            | Integration source                 | `"payroll"`         |
| `agencyName`        | Agency name                        | `"Charities Trust"` |
| `employerName`      | Employer organisation name         | `"Aon"`             |
| `pfo`               | Payroll Fundraising Organisation   | `"PGA"`             |
| `pfoDonorRefNo`     | PFO donor reference number         | `"PGIA143958"`      |
| `pgaDonorRefNo`     | PGA donor reference number         | `"1218503"`         |
| `charityDonorRefNo` | Charity's internal donor reference | `"DON789"`          |
| `totalAmount`       | Total donation amount to charity   | `50.00`             |

#### Campaign Custom Fields

| Attribute Name    | Description                        | Example                                   |
| ----------------- | ---------------------------------- | ----------------------------------------- |
| `donationSource`  | Associated donation source         | `"Your Cause"`                            |
| `typeDescription` | Type description for other sources | `"PartnerPayments (with no assoc Event)"` |
| `employerName`    | Associated employer (payroll only) | `"Aon"`                                   |

### Data Processing Notes

**Anonymous Donation Handling:**

* Other sources: Anonymous when donor name information is missing or empty
* Payroll donations: Anonymous when donor name contains "Anonymous" or "Anon"
* Company donations: Anonymous when employer name is missing or "Anonymous"

**Amount Processing:**

* All amounts processed in GBP currency
* Fee calculations handled automatically for payroll donations
* Other sources typically have no fees processed

**Address Handling:**

* Single address field for other sources donations
* Multi-line addresses for payroll donations processed into structured format
* UK addresses with proper country and country code assignment
* Postcode validation and standardisation

**Communication Preferences:**

* Other sources: Individual preference tracking for post, email, phone, and SMS
* Payroll donations: Individual preference tracking for post, email, phone, and SMS
* Yes/No values converted to boolean flags
* Comprehensive consent tracking for compliance

**Donation Key Generation:**

* Other sources: Uses transaction ID when available (e.g., `NAT-Q5KXZPQ1`), otherwise generates keys using donation date and sequence (e.g., `2025-01-01:1`, `2025-01-01:2`)
* Payroll giving: Composite keys using donation date, PGA donor reference, and counter (e.g., `2025-01-01:1218503:1`, `2025-01-01:GP237138/12159264:1`, `2025-01-01:1032767:1`)

**Source-Specific Processing:**

* **Your Cause**: Partner payment processing with detailed transaction messages
* **Match Funding Schemes**: Corporate matching with specific transaction references
* **Direct Payments**: Standard donation processing with source attribution
* **Event-Associated**: Additional context from SponsorMe integration when available

**Contact Key Generation:**

* Other sources: Uses source name and surname for contact matching (e.g., `yourcause:tiaa`)
* Payroll: Uses PGA donor reference number as contact key (e.g., `GP237138/12159264`, `1218503`, `1032767`)

## Error Handling

**Common Issues:**

* **Missing Donation Date**: Integration requires donation date to be set before file upload
* **Invalid Date Format**: Date must be in YYYY-MM-DD format
* **Unsupported File Format**: Only CSV files are supported

## Other Resources

**Charities Trust Platform:**\
[https://charitiesaid.org.uk/](https://charitiesaid.org.uk/)

**Charities Trust Support:**\
Contact your Charities Trust administrator for specific reporting and export guidance
