# Charities Aid Foundation

## Overview

The MoveData Charities Aid Foundation (CAF) integration provides seamless, automated synchronisation between your CAF giving platform and Salesforce. This comprehensive integration processes CAF donation reports, ensuring that all direct donations, workplace giving contributions, Gift Aid payments, and supporter information are automatically transferred to your Salesforce environment, eliminating manual data entry whilst maintaining complete data accuracy.

**Key Benefits:**

* **Automated CSV file processing** of CAF donation reports
* **Comprehensive Gift Aid support** with separate payment tracking and compliance features
* **Dual donation processing** supporting both direct CAF account donations and workplace giving
* **Intelligent employer matching** with comprehensive soft credit support for payroll giving
* **Advanced fee tracking** including platform charges and Gift Aid processing fees

## Integration Summary

| Field     | Value                                            |
| --------- | ------------------------------------------------ |
| Product   | [https://cafonline.org/](https://cafonline.org/) |
| Method    | CSV File Processing                              |
| Frequency | Manual Upload                                    |

## Supported Modes

Logic is required to map CAF notifications to your Salesforce data. To quickly and easily do so, we recommend using one of the supported MoveData Extensions.

| Extension                 | Supported |
| ------------------------- | --------- |
| Fundraising and Donations | ✅         |
| Commerce                  | ❌         |

{% hint style="info" %}
The Fundraising and Donations Extension is required to process direct giving, workplace giving, and Gift Aid information in Salesforce.
{% endhint %}

## Setup

### CAF Report Export

To set up the CAF integration, you will need to export donation reports from your CAF platform. Contact your CAF administrator for specific instructions on how to:

1. Access your organisation's donation reporting functionality
2. Generate donation reports in CSV format
3. Download the complete donation report with all required fields

The exported CSV file should contain donation transaction data in CAF's standard report format.

### MoveData CAF Configuration

To create your CAF Integration:

1. Open the MoveData app and select the **Integrations** tab
2. Click **New Integration** and select **Charities Aid Foundation** from the list of available integrations
3. Add a name for your integration and click **Save**
4. Configure the **Donation Date** that will be used for processing uploaded files
5. To upload a CSV file, click the **Upload File** button

### CSV File Processing

The CAF integration processes CSV donation files through manual upload. Upload your exported CAF donation report using the **Upload File** button in your integration configuration.

{% hint style="warning" %}
**Important**: You must set the Donation Date before uploading each file. This date will be used for all donations processed from that file upload.
{% endhint %}

## Configurable Options

| Option            | Description                                                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Donation Date** | The date that will be applied to all donations in the uploaded file. This must be set in YYYY-MM-DD format before each file upload. The integration will validate this date and prevent processing if it's missing or incorrectly formatted. |

## File Format

CAF CSV files support two different report types, which are automatically detected by the integration:

### Direct Donations Format

For CAF account and direct donations:

* `DonorName` - Full donor name
* `Title` - Donor title/salutation
* `FirstName` - Donor first name
* `Surname` - Donor surname
* `Email` - Donor email address
* `TelephoneNumber` - Donor telephone number
* `Address1` - First line of address
* `Address2` - Second line of address
* `Address3` - Third line of address
* `Address4` - Fourth line of address
* `TownCity` - Town or city
* `Country` - Country (typically 'GB')
* `Postcode` - Postal code
* `DonationReference` - Unique donation reference
* `ObjectDateTime` - Transaction date (DD/MM/YYYY format)
* `PaymentDate` - Payment settlement date (DD/MM/YYYY format)
* `DonationAmount` - Donation amount
* `Charge` - Platform fee charged
* `GiftAidAmount` - Gift Aid amount (if applicable)
* `Anonymous` - Anonymous donation flag
* `DonorGAD` - Gift Aid declaration status
* `DonationMethod` - Payment method used
* `DonationType` - Type of donation
* `DonationTypeReference` - Reference for recurring donations
* `ChargeType` - Type of charge applied
* `CAFRef` - CAF transaction reference
* `GiftAidStatus` - Gift Aid processing status
* `SpecialInstruction` - Donation message or instructions
* `CampaignCode` - Campaign identifier
* `Source` - Donation source
* `MarketingPreference` - Marketing consent preferences
* `RemittanceAdviceReference` - Remittance reference

### Payroll Giving Format

For workplace giving through CAF payroll:

* `AgencyName` - Must be "CAF"
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
* `Initials` - Donor initials
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
* `Payment Date` - Payment settlement date
* `Remittance Advice Reference` - Remittance reference
* `Bank Sort Code` - Bank sort code
* `Bank Account Number` - Bank account number
* `Remittance Total` - Total remittance amount
* `Beneficiary Account Number` - Beneficiary account identifier

## Data Migration

Data migration can be completed via the file upload functionality. You will need to download and export the relevant CAF donation reports covering your desired historical period.

* Records are processed based on the file format automatically detected by the integration
* Set appropriate donation dates for each historical period
* Multiple files can be uploaded to cover different time periods

## Additional Field Mappings

**Campaign Hierarchy**

The CAF integration automatically creates a flexible campaign hierarchy in Salesforce:

**Top-Level Campaign:**

* **Name**: "Charities Aid Foundation"
* **Type**: Campaign
* **Purpose**: Top-level container for all CAF activity

**Employer-Level Campaigns (Payroll Only):**

* **Name**: Based on employer name (e.g., "J Sainsbury PLC")
* **Type**: Fundraiser
* **Purpose**: Groups all donations from employees of a specific organisation
* **Primary Contact**: Associated employer organisation account
* **Anonymous Handling**: No employer campaign created when employer is "Anonymous"

**Gift Aid Processing**

The CAF integration provides comprehensive Gift Aid support for UK charities:

**Gift Aid Features:**

* **Automatic Gift Aid Detection**: Identifies eligible donations and processes Gift Aid amounts separately
* **Dual Record Creation**: Creates both transaction and Gift Aid payment records where applicable
* **Compliance Tracking**: Maintains full audit trail for Gift Aid submission requirements
* **Fee Allocation**: Separates Gift Aid processing fees from transaction fees
* **Status Monitoring**: Tracks Gift Aid status from submission through to receipt

**Gift Aid Processing Logic:**

* **Automatic Consolidation**: Gift Aid records are automatically linked to their parent donation transactions during preprocessing (where possible)
* **Combined Processing**: When both donation and Gift Aid amounts exist with the same reference, they're merged into a single comprehensive record
* **Gift Aid-Only Records**: Created when `GiftAidAmount` > 0 and `DonationAmount` is null or zero
* **Separate Settlement**: Different settlement dates tracked for donations and Gift Aid payments
* **HMRC Status Tracking**: Monitors Gift Aid submission and receipt status for compliance
* **Skip Processing Flag**: `movedataSkipIfNew` custom field prevents duplicate processing of Gift Aid enhancements

**Employer Handling**

**Payroll Report Processing:**

* **Employee Donations**: Processed as individual donations with employer context
* **Campaign Structure**: Creates two-tier hierarchy with employer fundraiser campaigns under main CAF campaign
* **Recurring Donations**: All payroll donations automatically create recurring monthly schedules
* **Anonymous Employers**: When employer name is "Anonymous", no employer campaign is created
* **Donation Keys**: Composite keys using donation date, PGA donor reference, and counter for uniqueness (e.g., `2025-01-01:929660:1`)
* **PFO Tracking**: Payroll Fundraising Organisation information captured when available (e.g., "Payroll Giving in Action")

**Recurring Donation Support**

**Direct Donations:**

* CAF Account Regular Donations and Standing Order Donations create recurring schedules
* Monthly frequency with payment date determining the payment day
* Uses donation type reference as the recurring donation key

**Payroll Giving:**

* All payroll donations are treated as part of recurring monthly schedules
* Uses PGA Donor Reference Number as the recurring donation key
* Monthly frequency based on payroll cycles

## Reference

The following custom fields are automatically included in MoveData notifications:

**Contact Custom Fields**

**Direct Donations:**

Contact records are generated using composite keys based on postcode, first name, and surname for accurate matching and deduplication.

**Donation Custom Fields**

**Direct Donations:**

| Attribute Name              | Description                       | Example                          |
| --------------------------- | --------------------------------- | -------------------------------- |
| `source`                    | Integration source                | `"direct"`                       |
| `donorName`                 | Full donor name from CAF          | `"Mr John Smith"`                |
| `donorGAD`                  | Gift Aid declaration status       | `true`, `false`                  |
| `donationMethod`            | Payment method used               | `"Online"`                       |
| `donationType`              | Type of donation                  | `"CAF Account Regular Donation"` |
| `chargeType`                | Type of charge applied            | `"Standard"`                     |
| `donationTypeReference`     | Reference for recurring donations | `"REF123456"`                    |
| `objectDateTime`            | Original transaction timestamp    | `2024-01-15T10:30:00.000Z`       |
| `remittanceAdviceReference` | Remittance reference              | `"REM2024001"`                   |
| `giftaidAmount`             | Gift Aid amount                   | `2.50`                           |
| `giftaidFee`                | Gift Aid processing fee           | `0.13`                           |
| `giftaidHmrcStatus`         | HMRC receipt status               | `true`, `false`                  |
| `giftaidStatus`             | Gift Aid processing status        | `"Received"`, `"Pending"`        |
| `giftaidPaymentDate`        | Gift Aid payment date             | `2024-02-15T00:00:00.000Z`       |
| `giftaidPaymentRef`         | Gift Aid payment reference        | `"GA789012"`                     |
| `giftaidRelatedRef`         | Related donation reference        | `"DON123456"`                    |

**Payroll Giving:**

| Attribute Name      | Description                        | Example           |
| ------------------- | ---------------------------------- | ----------------- |
| `source`            | Integration source                 | `"payroll"`       |
| `agencyName`        | Agency name                        | `"CAF"`           |
| `employerName`      | Employer organisation name         | `"Microsoft Ltd"` |
| `pfo`               | Payroll Fundraising Organisation   | `"CAF"`           |
| `pfoDonorRefNo`     | PFO donor reference number         | `"CAF123456"`     |
| `pgaDonorRefNo`     | PGA donor reference number         | `"892090"`        |
| `charityDonorRefNo` | Charity's internal donor reference | `"DON789"`        |
| `totalAmount`       | Total donation amount to charity   | `250.00`          |

**Campaign Custom Fields**

| Attribute Name | Description                 | Example        |
| -------------- | --------------------------- | -------------- |
| `campaignCode` | CAF campaign identifier     | `"APPEAL2024"` |
| `source`       | Campaign source information | `"Online"`     |

#### Data Processing Notes

**Amount Processing:**

* All amounts processed in GBP currency
* Fee calculations handled automatically for both donation types
* Gift Aid amounts processed separately from main donations
* Net amounts calculated from gross amounts minus fees

**Address Handling:**

* Multi-line addresses processed into structured format
* UK addresses with proper country and country code assignment
* Postcode validation and standardisation
* Support for up to 4 address lines in direct donations
* Contact matching uses composite keys: postcode + first name + surname

**Communication Preferences:**

* Direct donations: Marketing preferences parsed from `MarketingPreference` field (email consent automatically detected)
* Payroll donations: Individual preference tracking for post, email, phone, and SMS
* Yes/No values converted to boolean flags
* Comprehensive consent tracking for compliance# Charities Aid Foundation

**Anonymous Donation Handling:**

* Direct donations: Anonymous when `Anonymous` field is true, or when surname is missing from donor information
* Payroll donations: Anonymous when donor name contains "Anonymous" or "Anon"
* Company donations: Anonymous when employer name is missing or "Anonymous"

**Marketing Attribution Processing:**

* Campaign codes automatically create marketing attribution structures when present
* Source information creates campaign-specific attribution (e.g., "CAF-GEN" source with "GEN" campaign)
* Content tracking captures additional attribution details (e.g., "FRSCAFGAD")

**Donation Type Processing:**

* **Recurring Donation Types**: "CAF Account Regular Donation" and "Standing Order Donation" automatically create recurring donation schedules
* **One-off Donations**: "CAF Account Donation", "CAF Account Voucher" processed as individual transactions
* **Monthly Frequency**: Recurring donations use payment date to determine monthly payment day

## Error Handling

**Common Issues:**

* **Missing Donation Date**: Integration requires donation date to be set before file upload
* **Invalid Date Format**: Date must be in YYYY-MM-DD format
* **Unsupported File Format**: Only CSV files are supported

## Other Resources

**CAF Platform:**\
[https://cafonline.org/](https://cafonline.org/)

**CAF Donor Services:**\
[https://www.cafonline.org/charities](https://www.cafonline.org/charities)
