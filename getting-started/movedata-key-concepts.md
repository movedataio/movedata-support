---
description: Learn all about the key concepts and terms used within the MoveData platform.
---

# MoveData Key Concepts

While using MoveData, you'll encounter several important terms and concepts. This article provides clear explanations of each key term to help you navigate the platform effectively.

**Commerce Pipeline** - A MoveData processor designed specifically to process commerce transaction data into standard Salesforce objects.

**Commerce Extension** - A MoveData package that provides integration functionality specifically designed to work with core Salesforce data model.  Uses the Commerce Pipeline.

**Commerce Schema** - A Commerce Schema is the standardised data structure that MoveData uses to process and map commerce transactions consistently across different commerce platforms.

**Duplicate Rules** - Duplicate Rules are Salesforce configurations that define how the system identifies and handles potential duplicate records during data synchronisation.

**Donation -** A Donation is a financial contribution made by a supporter through a fundraising platform that MoveData synchronizes to Salesforce.

**Donation Pipeline** - A MoveData processor designed to process donation and fundraising transaction data from platforms into Salesforce.

**Donation Schema** - A Donation Schema is the standardised data structure that MoveData uses to process and map donation transactions consistently across different fundraising platforms.

**Extension** - An Extension is a MoveData module that provides specialised integration functionality for specific Salesforce data models, such as NPSP and Non-Profit Cloud.

**Event** - An Event is a fundraising campaign or activity organised on a platform where multiple fundraisers or donors can participate to support a nonprofit organisation.

**Fieldset -** A Fieldset is a set of Salesforce fields that determines which fields are retrieved when fetching a Salesforce record when processing within a pipeline.

**File Upload -** File Upload is a method of importing transaction data into MoveData by manually uploading data files (CSV, Excel, etc) from supported platforms.

**Fundraiser** - A Fundraiser is an individual who creates a campaign on a fundraising platform to collect donations for a nonprofit organisation; can be part of a team or event.

**Integration** - An Integration is a configured connection between MoveData and an external platform that enables data synchronisation to Salesforce.

**Matched Donation** - A Matched Donation is a contribution where an organisation or individual agrees to match a donor's donation.

**Notification** - A Notification is a discrete data package created by MoveData and transmitted to Salesforce for processing.

**NPC** - The Nonprofit Cloud is a Salesforce data model for nonprofit organisations that uses GiftTransactions and Person Accounts.  The current nonprofit solution from Salesforce.

**NPC Extension** - A MoveData package that provides integration functionality specifically designed to work with Salesforce's Nonprofit Cloud data model.  Uses the Commerce and Fundraising Pipeline.

**NPSP** - The _Nonprofit Success Pack_ is a Salesforce data model designed specifically for nonprofit organisations that uses Opportunities and separate Contact and Account records to manage fundraising data.  Superseded by NPC.

**NPSP Extension** - A MoveData package that provides integration functionality specifically designed to work with Salesforce's Nonprofit Success Pack data model.  Uses the Donation Pipeline.

**Permission Set** - A Permission Set is a Salesforce configuration that grants users specific access rights and capabilities needed to work with MoveData, its extensions and their associated objects and fields.

**Pipeline** - A Pipeline is a structured processor that executes a notification in a predetermined sequence.

**Pipeline Metadata** - Pipeline Metadata is the configuration data that defines how a specific Pipeline operates, including the flows, fieldsets and other general configurations.

**Platform -** A Platform is an external system that integrates with MoveData to synchronise transaction data into Salesforce.

**Platform Key** - A Platform Key is a constructed identifier that uniquely links a record from a specific platform to its corresponding record in Salesforce.

**Polling** - Polling is an automated process where MoveData periodically queries external platforms to check for and retrieve new transaction data.

**Recurring Donation** - A Recurring Donation is a scheduled gift where a donor commits to making regular, automated contributions over a specified period.

**Registration** - A registration typically refers to a fundraiser signing up with a fundraising platform to raise funds on behalf of a non-profit.

**Schema** - A Schema is the definition used by MoveData to ensure data is processed in a standard, uniform structure.

**Schema Metadata** - A metadata entry that routes a specific schema type to a pipeline or handler.

**Settings** - MoveData Settings is a configuration page that enables user authorisation, support email setup, debug options, MoveData extension installation, and configuration of installed packages.

**Supporter** - A Supporter is an individual who contributes to a nonprofit through donations, fundraising activities, or purchases on connected platforms.

**Team** - A team that is raising funds on behalf of a non-profit organisation; will typically have 1 or more fundraisers.

**Team Leader** - A Team Leader is a fundraiser who organizes and manages a group of fundraisers (a team) working together toward a collective fundraising goal.

**Tribute** - A Tribute Donation is a contribution made in honor or memory of a specific individual.  Manifests as a tribute campaign.

**Webhook** - A Webhook is a message dispatched via HTTP from a platform that triggers MoveData processing.
