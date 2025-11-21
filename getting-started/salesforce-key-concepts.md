---
description: >-
  Learn about the underlying Salesforce platform that powers your MoveData
  integrations.
---

# Salesforce Key Concepts

MoveData has been built specifically for Salesforce, so understanding key Salesforce concepts will help you get the most out of your data integrations. This guide covers the essential knowledge you need to effectively use MoveData with your Salesforce org, whether you're using Nonprofit Cloud, NPSP, or standard Salesforce.

### The Basics

Salesforce is a powerful cloud-based customer relationship management (CRM) platform that helps organizations manage their relationships with constituents, donors, volunteers, and beneficiaries. For nonprofits, Salesforce offers specialized tools through Nonprofit Cloud and the Nonprofit Success Pack (NPSP) that are specifically designed for non-profit / for-purpose organizations.

Think of Salesforce as your organization's digital hub where all constituent interactions, donations, program data, and organizational activities are stored and managed in one central location. Because it's cloud-based, your team can access this information from anywhere with an internet connection, making collaboration seamless across your organization.

MoveData integrates directly with this platform, automatically syncing data from your external systems into Salesforce, ensuring your CRM stays current without manual data entry.

### Nonprofit Data Architecture

{% hint style="info" %}
[Nonprofit Success Pack Reference](https://support.movedata.io/reference/extension/npsp-fundraising/) / [Nonprofit Cloud Reference](https://support.movedata.io/reference/extension/non-profit-cloud/)
{% endhint %}

For nonprofit organisations, Salesforce uses specialised data models designed around the unique needs of mission-driven work. The most common architectures you'll encounter are:

**Nonprofit Success Pack (NPSP)**: This is Salesforce's original nonprofit solution, built on the standard Salesforce platform with customisations for nonprofit use cases. NPSP uses a Household Account model where individual contacts are grouped under household accounts, making it ideal for tracking family relationships and household giving patterns.

**Nonprofit Cloud**: This is Salesforce's newer, purpose-built nonprofit solution that uses Person Accounts architecture. Person Accounts combine individual contact information and account details into a single record, simplifying data management for organizations that primarily work with individuals rather than organizations.

MoveData supports both architectures out of the box, automatically detecting your org's configuration and mapping data accordingly. This means your integrations will work seamlessly regardless of which nonprofit data model you're using.

### Data Objects and Fields

In Salesforce, information is organised into "objects," which are like digital filing cabinets for different types of data. Each object contains "records" (individual entries) made up of "fields" (specific pieces of information).

**Standard Objects** are built into Salesforce and include common nonprofit data types like:

* **Contacts**: Individual people (donors, volunteers, beneficiaries)
* **Accounts**: Organisations or households / standard account records
* **Opportunities**: Donations, grants, or other fundraising activities
* **Campaigns**: Marketing campaigns or fundraising initiatives

**Custom Objects** are created to store information specific to your organisation's needs. These can be created by the organisation or as part of third-party managed packages.

MoveData can integrate data into both standard and custom objects, automatically mapping fields from your external systems to the appropriate Salesforce fields. Our platform handles field matching intelligently, ensuring data flows into the right places within your Salesforce org.

### Lightning Flows

Salesforce Lightning Flows are visual automation tools that allow you to build sophisticated business logic without writing code. Think of them as flowcharts that automate processes, make decisions based on your data, and perform actions within Salesforce. For nonprofits, Lightning Flows can automate everything from donation acknowledgment processes to donor segmentation.

MoveData leverages Lightning Flows as its primary customisation framework, allowing you to tailor how fundraising platform data becomes Salesforce records. Through configurable flows, you can implement organisation-specific business rules—such as marking high-value donors, routing notifications based on donation amounts, or creating custom relationships between records. MoveData provides turnkey flows for common nonprofit scenarios while giving you full flexibility to build custom logic using Salesforce's standard declarative tools, ensuring your integrations align perfectly with your unique processes.

### Next Steps

We recommend working through the [MoveData Learning Path](your-movedata-learning-path.md).
