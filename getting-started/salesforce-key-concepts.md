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

For nonprofit organizations, Salesforce uses specialized data models designed around the unique needs of mission-driven work. The most common architectures you'll encounter are:

**Nonprofit Success Pack (NPSP)**: This is Salesforce's original nonprofit solution, built on the standard Salesforce platform with customizations for nonprofit use cases. NPSP uses a Household Account model where individual contacts are grouped under household accounts, making it ideal for tracking family relationships and household giving patterns.

**Nonprofit Cloud**: This is Salesforce's newer, purpose-built nonprofit solution that uses Person Accounts architecture. Person Accounts combine individual contact information and account details into a single record, simplifying data management for organizations that primarily work with individuals rather than organizations.

MoveData supports both architectures out of the box, automatically detecting your org's configuration and mapping data accordingly. This means your integrations will work seamlessly regardless of which nonprofit data model you're using.

TODO: Add note about any data model

### Data Objects and Fields

In Salesforce, information is organized into "objects," which are like digital filing cabinets for different types of data. Each object contains "records" (individual entries) made up of "fields" (specific pieces of information).

**Standard Objects** are built into Salesforce and include common nonprofit data types like:

* **Contacts**: Individual people (donors, volunteers, beneficiaries)
* **Accounts**: Organizations or households
* **Opportunities**: Donations, grants, or other fundraising activities
* **Campaigns**: Marketing campaigns or fundraising initiatives

**Custom Objects** are created to store information specific to your organization's needs, such as:

* TODO: Change objects
* Program participants
* Volunteer hours
* Grant applications
* Event registrations

MoveData can integrate data into both standard and custom objects, automatically mapping fields from your external systems to the appropriate Salesforce fields. Our platform handles field matching intelligently, ensuring data flows into the right places within your Salesforce org.

### TODO: Refer to SF learning path and end here

### Data Integration and Automation

Understanding how data flows into Salesforce is crucial for maximizing MoveData's value. When you set up a MoveData integration, the platform:

1. **Connects** to your external data source (CSV files, APIs, databases)
2. **Transforms** the data to match Salesforce's expected format and field types
3. **Maps** external data fields to the correct Salesforce object fields
4. **Syncs** data in real-time or on scheduled intervals
5. **Validates** data integrity and handles any conflicts or duplicates

This automated process eliminates manual data entry while ensuring your Salesforce records remain accurate and up-to-date. MoveData's intelligent mapping recognizes common nonprofit data patterns and suggests appropriate field matches, while also allowing for custom business rules and transformations.

### User Interface and Navigation

Salesforce organizes functionality into "Apps" - collections of related objects and features. For nonprofits, you might work primarily in:

* **Nonprofit Cloud** app for comprehensive constituent management
* **Fundraising** app for donation tracking and donor stewardship
* **Program Management** app for service delivery tracking
* **Marketing** app for constituent engagement

Within each app, you'll work with **List Views** (tables showing multiple records) and **Detail Pages** (comprehensive views of individual records). MoveData-synced data appears seamlessly in these standard Salesforce views, meaning your team can work with integrated data using familiar Salesforce interfaces.

**Related Lists** show connections between different types of records - for example, all donations from a specific contact, or all program participants in a particular campaign. MoveData maintains these relationships when syncing data, ensuring you get a complete picture of each constituent's engagement with your organization.

### Getting Started with MoveData

Now that you understand these key Salesforce concepts, you're ready to set up your MoveData integrations. The platform automatically handles the technical complexities of Salesforce data models, field mapping, and relationship management, allowing you to focus on your mission rather than data management.

Your integrated data will flow seamlessly into your existing Salesforce workflows, appearing in reports, dashboards, and automation processes just like manually entered data - but without the manual work.
