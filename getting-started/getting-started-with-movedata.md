---
description: >-
  Learn about the essential tasks to complete when first setting up MoveData in
  your Salesforce org.
---

# Getting Started with MoveData



So you've installed MoveData or are working with MoveData for the first time...exciting!

We've compiled the most common initial tasks when first starting with MoveData to help you set up everything you need and ensure it works perfectly for your nonprofit's fundraising data integration. The checklist below provides an excellent foundation for success.

{% hint style="info" %}
Work through our [Quickstart guide](quickstart.md) to get up and running.
{% endhint %}

### Installation and Initial Setup

**AppExchange Installation**: MoveData installs directly from the Salesforce AppExchange as a managed package. This core application will run natively inside your Salesforce org.  You can install the application from here: [https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000PFbeXEAT](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000PFbeXEAT)

**Onboarding Wizard**: Once installed, an onboarding wizard will appear to guide you through the essential setup steps, including authorising MoveData and installing required extensions for your data model such as the Non-Profit Success Pack, Non-Profit Cloud, etc. This wizard ensures MoveData is configured correctly from the start.

**Technical Account Manager Assignment**: Every client is paired with a technical account manager who will make installation and configuration seamless. If you can't find what you need using this knowledge base, you can always reach out to your technical account manager.

### Salesforce Environment Preparation

**Data Model Compatibility**: MoveData works with both Salesforce Nonprofit Success Pack (NPSP) and the newer Nonprofit Cloud. The platform now supports Salesforce Nonprofit Cloud and automatically maps to the appropriate data model in your org.

**Duplicate Rules Configuration**: Review and configure your Salesforce duplicate rules for Contacts, Accounts, and Campaigns. MoveData uses your existing Salesforce duplicate rules to determine if a record already exists and appends data to existing records rather than creating duplicates.

**Permission Sets and User Access**: Ensure that users who need to monitor and manage integrations have appropriate access to MoveData objects and the MoveData Lightning App. Your Salesforce Administrator should review permission requirements based on your team's needs.

### Choose Your Integration Type

**API Integrations**: For supported platforms like Raisely, JustGiving, Enthuse, and Funraisin', you can set up real-time API integrations. These integrations operate in real time and typically take about two minutes to configure by connecting your platform's API key and setting up appropriate webhooks.

**CSV Integrations**: For platforms without API connectivity, MoveData supports CSV file imports. This allows you to automate data processing even when real-time sync isn't available.

**Multi-Platform Setup**: Many nonprofits use multiple fundraising platforms. MoveData's Multi API plan allows you to connect data from several sources simultaneously.

### Configure Your First Integration

**Platform Connection**: Start with your primary fundraising platform. Whether it's Raisely, JustGiving, or another supported platform, follow the platform-specific documentation to establish the connection.

**Data Mapping Review**: MoveData provides out-of-the-box field mapping that works for most organisations. Review the default mappings to ensure they align with your data structure and reporting needs.

**Test with Sample Data**: Before going live, test your integration with a small sample of data to verify that records are being created correctly and duplicate detection is working as expected.

### Customization and Business Rules

**Lightning Flow Extensions**: MoveData supplies visual workflows (Salesforce Lightning Flows) that can be easily extended to accommodate new business logic in your integration. This allows you to handle custom fields, special data transformation rules, or unique business requirements.

**Custom Field Mapping**: If you capture custom information in your fundraising platforms, configure MoveData to map this data to custom fields in Salesforce. This ensures no important donor information is lost in the integration.

**Campaign Hierarchy Setup**: For complex fundraising structures involving teams and individual fundraisers, MoveData automatically creates nested multi-level campaign hierarchies reflecting your fundraising structure and relationships.

### Monitoring and Maintenance

**Notification Setup**: Configure email notifications to alert you about integration successes, failures, or data quality issues. This helps you stay informed about your data flow without constant manual checking.

**Regular Health Checks**: Schedule periodic reviews of your integration performance, data quality, and any new requirements that may have emerged as your fundraising programs evolve.

**Error Logging and Replay**: MoveData provides comprehensive logging and the ability to easily replay events (or notifications), making troubleshooting straightforward when issues arise.

### Training and Adoption

**Team Training**: Ensure your fundraising, marketing, and reporting teams understand how MoveData enhances their Salesforce data. The automated data flow will unlock new capabilities for reporting, marketing automation, and donor stewardship.

**Documentation Access**: Familiarise yourself with MoveData's comprehensive documentation at docs.movedata.io, which includes detailed guides for each supported platform and troubleshooting resources.

**Ongoing Support**: Submit support requests through the MoveData ticketing system at docs.movedata.io, with monitoring available Monday to Friday 8am-11pm AEST.

### Going Live

**Production Deployment**: Once you've tested thoroughly in your sandbox environment, deploy your integration configuration to production. MoveData is completely free to use in Sandbox orgs and only begins subscription billing when installed in Production.

**Data Backfill Considerations**: Discuss with your technical account manager whether you need to import historical data from your fundraising platforms to establish baseline reporting in Salesforce.

**Success Metrics**: Establish metrics to measure the success of your integration, such as time saved on data entry, improved data accuracy, and enhanced reporting capabilities.

***

Following this getting started guide will ensure you maximize the value of MoveData from day one. Remember, supporting your success is a cornerstone of MoveData, so don't hesitate to reach out to your technical account manager with questions or requests for assistance.
