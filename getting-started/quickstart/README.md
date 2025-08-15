---
description: How to get MoveData installed and running in 45 minutes
---

# Quickstart

## MoveData Quickstart Guide

Get your MoveData integration up and running in Salesforce in approximately 30 - 60 minutes. This guide will walk you through the complete setup process from installation to viewing your data in Salesforce.

{% embed url="https://www.youtube.com/watch?v=qlzpclwUBoU" %}

### Prerequisites

{% hint style="info" %}
**Pro Tip**: We strongly recommend installing MoveData in a Sandbox environment first to test your integration before deploying to Production.
{% endhint %}

Before you begin, ensure you have:

* Salesforce Administrator permissions or "Download AppExchange Packages" permission
* Access to your fundraising platform's API credentials

### Step 1: Install MoveData (10 minutes)

{% hint style="info" %}
Detailed Step Instructions: [Install MoveData](install-movedata.md)
{% endhint %}

#### Install from Salesforce AppExchange

1. **Visit the AppExchange**: Navigate to [MoveData on AppExchange](https://www.movedata.io/appexchange) or search for "MoveData" directly in the AppExchange
2. **Connect your account**: Ensure your Salesforce org is connected to your Trailblazer account
3. **Get the app**: Click "Get It Now" on the MoveData listing
4. **Choose your environment**:
   * Select "Install in Sandbox" for testing (recommended)
   * Select "Install in Production" only after thorough testing
5. **Complete installation**: Follow the on-screen prompts and wait for the installation confirmation email

#### Installation Notes

* Installation typically takes 5-10 minutes
* You'll receive an email notification when installation is complete

### Step 2: Complete Setup Wizard (10 minutes)

{% hint style="info" %}
Detailed Step Instructions: Complete Setup Wizard
{% endhint %}

#### Access MoveData

1. **Open MoveData**: From your Salesforce org, navigate to the Salesforce [App Launcher](https://help.salesforce.com/s/articleView?id=xcloud.basics_app_launcher_lex.htm\&type=5) and search for "MoveData".
2. **Launch the app**: Click on the MoveData app to open it and a configuration wizard should appear.

#### Authorization and Extensions

1. **Authorize MoveData**: The setup wizard will guide you through authorizing MoveData to access your Salesforce data
2. **Install Extensions**: To get your data into Salesforce, you will need to select and install the appropriate MoveData extensions for your data model.

#### Configuration Options

* The wizard will detect your Salesforce data model (NPSP, Nonprofit Cloud, or custom)
* Select your preferred configuration based on your organization's setup

### Step 3: Configure Settings (5 minutes)

{% hint style="info" %}
Detailed Step Instructions: Configure Settings
{% endhint %}

#### Access Integration Settings

1. **Navigate to Settings**: Within the MoveData app, click on "Settings" or "Configuration"
2. **Review default settings**: MoveData provides sensible defaults for most configurations

#### Key Settings to Review

* **Anonymous Contact**: It is always a good idea to specify a contact to be used for anonymous donations.

### Step 4: Configure Duplicate Rules (5 minutes)

{% hint style="info" %}
Detailed Step Instructions: Configure Duplicate Rules
{% endhint %}

#### Understanding Duplicate Management

MoveData respects your existing Salesforce duplicate rules for record matching. Proper duplicate rule configuration ensures clean data integration.

#### Review Existing Rules

1. **Navigate to Setup**: Go to Setup > Duplicate Management > Duplicate Rules
2. **Review Contact rules**: Ensure you have appropriate duplicate rules for Contacts
3. **Review Account rules**: Check Account duplicate rules if applicable
4. **Review Opportunity rules**: Verify Opportunity duplicate detection settings

#### Recommended Configuration

* **Contact matching**: Use email address as primary matching criterion
* **Account matching**: Configure organization name matching for institutional donors
* **Flexibility**: Allow MoveData to create new records when no duplicates are found

#### Testing Duplicate Rules

* Create test records to verify duplicate detection works correctly
* Ensure rules are active and properly configured
* Adjust matching criteria as needed for your data quality requirements

### Step 5: Assign Permissions (5 minutes)

#### User Access Requirements

Users who need to view or work with MoveData-synchronized data require appropriate permissions.

#### Permission Assignment

1. **Navigate to Setup**: Go to Setup > Users > Permission Sets
2. **Locate MoveData permissions**: Find the MoveData permission set created during installation
3. **Assign to users**: Add users who need access to MoveData functionality

#### Access Levels

* **Full access**: For administrators managing integrations
* **Read-only access**: For users who only need to view synchronized data
* **Custom access**: For users with specific role-based requirements

#### License Management

1. **Check available licenses**: Go to Setup > Installed Packages
2. **Manage licenses**: Click "Manage Licenses" for MoveData
3. **Assign licenses**: Add users who need access to MoveData features

### Step 6: Connect Integrations (5 minutes)

#### Access Integrations Screen

1. **Navigate to Integrations**: In the MoveData app, click "Integrations"
2. **Create new integration**: Click "New Integration" to begin setup

#### Platform-Specific Setup

Different fundraising platforms require different connection methods:

**API-Based Integrations (Raisely, Funraisin', etc.)**

1. **Select platform**: Choose your fundraising platform from the list
2. **Enter API credentials**: Provide your platform's API key or connection details
3. **Configure webhooks**: Set up real-time sync capabilities (if supported)
4. **Test connection**: Verify the connection is working correctly

**CSV-Based Integrations**

1. **Select CSV option**: Choose "CSV Integration" for platforms without API access
2. **Configure file format**: Set up your CSV file structure and field mappings
3. **Schedule imports**: Configure automated CSV processing (if applicable)

#### Integration Testing

* Start with a small test dataset
* Verify records are created correctly in Salesforce
* Check that relationships (Contacts, Accounts, Opportunities) are properly established

### Step 7: View Resulting Records (5 minutes)

#### Monitor Sync Status

1. **Integration dashboard**: Check the MoveData dashboard for sync status
2. **Review logs**: Look for any error messages or warnings
3. **Verify data flow**: Ensure data is flowing from your platform to Salesforce

#### Validate Data Quality

**Check Contact Records**

* Navigate to Contacts in Salesforce
* Verify new donor/fundraiser records have been created
* Confirm contact information is accurate and complete

**Review Opportunity Records**

* Go to Opportunities to see donation records
* Check that opportunities are linked to correct contacts and campaigns
* Verify donation amounts and dates are accurate

**Examine Campaign Hierarchy**

* Review Campaigns to see fundraising initiatives
* For peer-to-peer fundraising, check nested campaign structures
* Confirm campaign relationships are properly established

#### Troubleshooting Common Issues

If you encounter problems:

1. **Permission errors**: Add necessary permissions or remove restrictive validations
2. **Validation failures**: Check Salesforce validation rules that might block record creation
3. **Duplicate detection**: Review and adjust duplicate rule settings
4. **Field mapping issues**: Verify custom field mappings in the configuration

#### Getting Help

* **Reprocess failed records**: Use the "Reprocess" button for records with errors
* **Documentation**: Visit the [MoveData Help Center](https://docs.movedata.io/) for detailed guides
* **Support**: Contact MoveData support for assistance with complex configurations

### What's Next?

#### Optimization

* **Custom field mapping**: Extend integrations to include custom fields from your fundraising platform
* **Workflow automation**: Set up Salesforce flows to trigger additional actions when records sync
* **Reporting setup**: Create reports and dashboards to monitor fundraising performance

#### Advanced Configuration

* **Business rules**: Implement custom logic for specific data transformation needs
* **Multiple integrations**: Connect additional fundraising platforms
* **Data enrichment**: Set up processes to enhance incoming data

#### Ongoing Maintenance

* **Regular monitoring**: Check sync status and resolve any issues promptly
* **Data quality reviews**: Periodically audit synchronized data for accuracy
* **Updates and improvements**: Stay informed about new MoveData features and platform updates

### Support and Resources

* **Knowledge Base**: [docs.movedata.io](https://docs.movedata.io/)
* **Integration Examples**: View worked examples for common customization scenarios
* **Customer Support**: Contact MoveData for technical assistance and custom configuration help
* **Community**: Connect with other MoveData users for tips and best practices

***

**Congratulations!** You've successfully set up MoveData and should now see data flowing automatically from your fundraising platforms into Salesforce. This automation will save your organization significant time and ensure your Salesforce data stays current and accurate.

_Total setup time: Approximately 45 minutes_
