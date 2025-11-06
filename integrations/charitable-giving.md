# Charitable Giving

## Overview

The MoveData Charitable Giving integration provides seamless, automated synchronisation between your Charitable Giving workplace giving platform and Salesforce. This comprehensive integration processes Charitable Giving donation reports, ensuring that all employee donations, direct giving contributions, and supporter information are automatically transferred to your Salesforce environment, eliminating manual data entry whilst maintaining complete data accuracy.

### Key Benefits:

* **Automated Excel file processing** of Charitable Giving workplace giving reports
* **Intelligent donation type detection** supporting both regular and one-off contributions
* **Comprehensive donor management** with support for both individual and corporate donors
* **Advanced banking information tracking** including sort codes and account details
* **Flexible data processing** supporting both options-based and payroll-based file exports

## Integration Summary

| Field     | Value                                                              |
| --------- | ------------------------------------------------------------------ |
| Product   | [https://charitablegiving.co.uk/](https://charitablegiving.co.uk/) |
| Method    | Excel File Processing                                              |
| Frequency | Manual Upload                                                      |

## Supported Modes

Logic is required to map Charitable Giving notifications to your Salesforce data. To quickly and easily do so, we recommend using one of the supported MoveData Extensions.

| Extension                 | Supported |
| ------------------------- | --------- |
| Fundraising and Donations | ✅         |
| Commerce                  | ❌         |

{% hint style="info" %}
The Fundraising and Donations Extension is required to process workplace giving and individual donation information in Salesforce.
{% endhint %}

## Setup

### Charitable Giving Report Export

To set up the Charitable Giving integration, you will need to export donation reports from your Charitable Giving platform. Contact your Charitable Giving administrator for specific instructions on how to:

1. Access your organisation's donation reporting functionality
2. Generate donation reports in Excel format
3. Download the complete donation report with all required fields

The exported Excel file should contain donation transaction data in Charitable Giving's standard report format.

### MoveData Charitable Giving Configuration

To create your Charitable Giving Integration:

1. Open the MoveData app and select the **Integrations** tab
2. Click **New Integration** and select **Charitable Giving** from the list of available integrations
3. Add a name for your integration and click **Save**
4. Configure the **Donation Date** that will be used for processing uploaded files
5. To upload an Excel file, click the **Upload File** button

### Excel File Processing

The Charitable Giving integration processes Excel donation files through manual upload. Upload your exported Charitable Giving donation report using the **Upload File** button in your integration configuration.

{% hint style="warning" %}
**Important**: You must set the Donation Date before uploading each file. This date will be used for all donations processed from that file upload.
{% endhint %}

## Configurable Options

| Option            | Description                                                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Donation Date** | The date that will be applied to all donations in the uploaded file. This must be set in YYYY-MM-DD format before each file upload. The integration will validate this date and prevent processing if it's missing or incorrectly formatted. |

## File Format

Charitable Giving Excel files support two different report types, which are automatically detected by the integration:

### Options Report Format

For direct giving and options-based donations:

* `DREF` - Donor reference number
* `Reference` - Donation type (e.g., "Regular Donation", "One Off Donation")
* `Employer` - Employer organisation name
* `prefix` - Donor title/salutation
* `Initial` - Donor initial
* `Surname` - Donor surname
* `Address 1` - First line of address
* `Address 2` - Second line of address
* `Address 3` - Third line of address
* `Post Code` - Postal code
* `Sort Code` - Bank sort code (masked)
* `AccountNo` - Bank account number (masked)
* `Donation` - Donation amount
* `Date Processed` - Processing date (DD/MM/YYYY format)

### Payroll Report Format

For workplace giving through payroll deduction:

* `AgencyName` - Must be "Charitable Giving"
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

Data migration can be completed via the file upload functionality. You will need to download and export the relevant Charitable Giving donation reports covering your desired historical period.

* Records are processed based on the file format automatically detected by the integration
* Set appropriate donation dates for each historical period
* Multiple files can be uploaded to cover different time periods

## Additional Field Mappings

#### Campaign Hierarchy

The Charitable Giving integration automatically creates a simple campaign hierarchy in Salesforce:

##### Top-Level Campaign:

* **Name**: "Charitable Giving"
* **Type**: Campaign
* **Purpose**: Top-level container for all Charitable Giving activity

#### Employer Handling

The Charitable Giving integration provides sophisticated handling of employer-related donations:

##### Options Report Processing:

* **Corporate Donors**: When `Employer` field is populated, creates organisation accounts with associated contact records
* **Individual Donors**: When `Employer` field is empty, creates individual contact records
* **Anonymous Handling**: When donor surname is missing, processes as anonymous donation

##### Payroll Report Processing:

* **Employee Donations**: Processed as individual donations with employer context
* **Employer Matching**: Separate donation records created for matched contributions
* **Matching Logic**: Employee and employer donations are linked through matching structures
* **Soft Credits**: Created to recognise both employee donor and employer matcher

#### Recurring Donation Support

##### Options Report:

* Regular donations automatically create recurring donation schedules
* Monthly frequency with donation date determining the payment day
* Uses donor reference (DREF) as the recurring donation key

##### Payroll Report:

* All payroll donations are treated as part of recurring monthly schedules
* Uses PGA Donor Reference Number as the recurring donation key
* Monthly frequency based on payroll cycles

## Reference

The following custom fields are automatically included in MoveData notifications:

#### Contact Custom Fields

| Attribute Name | Description          | Example |
| -------------- | -------------------- | ------- |
| `initial`      | Donor initial letter | `J`     |

#### Donation Custom Fields

##### Options Report:

| Attribute Name      | Description                      | Example                                              |
| ------------------- | -------------------------------- | ---------------------------------------------------- |
| `source`            | Integration source               | `"options"`                                          |
| `dref`              | Donor reference number           | `"1153185"`                                          |
| `donationType`      | Type of donation                 | `"Regular Donation"`, `"One Off Donation"`           |
| `employerAnonymous` | Whether employer is anonymous    | `true`, `false`                                      |
| `employerName`      | Employer organisation name       | `"Springer Verlag Ltd"`                              |
| `sortCode`          | Masked bank sort code            | `"xxxx47"`                                           |
| `accountNo`         | Masked bank account number       | `"xxxxxx95"`                                         |
| `friendlyName`      | Human-readable notification name | `"[Charitable Giving: Options] Springer Verlag Ltd"` |

##### Payroll Report:

| Attribute Name      | Description                        | Example                                       |
| ------------------- | ---------------------------------- | --------------------------------------------- |
| `source`            | Integration source                 | `"payroll"`                                   |
| `agencyName`        | Agency name                        | `"Charitable Giving"`                         |
| `employerName`      | Employer organisation name         | `"BT Group PLC"`                              |
| `pfo`               | Payroll Fundraising Organisation   | `"Charitable Giving"`                         |
| `pfoDonorRefNo`     | PFO donor reference number         | `"CG123456"`                                  |
| `pgaDonorRefNo`     | PGA donor reference number         | `"892090"`                                    |
| `charityDonorRefNo` | Charity's internal donor reference | `"DON789"`                                    |
| `totalAmount`       | Total donation amount to charity   | `250.00`                                      |
| `friendlyName`      | Human-readable notification name   | `"[Charitable Giving: Payroll] BT Group PLC"` |

#### Campaign Custom Fields

| Attribute Name | Description                         | Example                 |
| -------------- | ----------------------------------- | ----------------------- |
| `employerName` | Associated employer (if applicable) | `"Springer Verlag Ltd"` |

### Data Processing Notes

#### Anonymous Donation Handling:

* Options reports: Anonymous when surname is missing
* Payroll reports: Anonymous when donor name contains "Anonymous" or "Anon"
* Company donations: Anonymous when employer name is missing or "Anonymous"

#### Amount Processing:

* All amounts processed in GBP currency
* Fee calculations handled automatically for payroll reports
* Gross amounts used where available, with net amounts calculated

#### Address Handling:

* Multi-line addresses processed into structured format
* UK addresses with proper country and country code assignment
* Postcode validation and standardisation

#### Communication Preferences:

* Payroll reports include comprehensive preference tracking
* Yes/No values converted to boolean flags
* Support for post, email, phone, and SMS preferences

## Error Handling

### Common Issues:

* **Missing Donation Date**: Integration requires donation date to be set before file upload
* **Invalid Date Format**: Date must be in YYYY-MM-DD format
* **Unsupported File Format**: Only Excel (.xlsx) files are supported
* **Missing Required Fields**: Files must contain the expected column headers for automatic detection

## Other Resources

**Charitable Giving Platform:** [https://charitablegiving.co.uk/](https://charitablegiving.co.uk/)
