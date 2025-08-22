# Salesforce Architecture

## Overview

MoveData is built to run within Salesforce as a managed package, providing a comprehensive integration platform designed exclusively for nonprofits. The architecture supports extensive configuration and customisation pathways including Apex and Lightning Flow extensibility, enabling organisations to implement business rules tailored to their specific needs.

The platform operates as a native Salesforce application that transforms fundraising platform events into actionable Salesforce data. The following architecture ensures seamless integration with your existing Salesforce environment whilst maintaining the flexibility to adapt to unique organisational requirements.

## Core Architecture Components

### Salesforce Managed Package

MoveData operates as a Salesforce managed package, which provides several key advantages:

* **Native Integration**: Runs natively entirely within your Salesforce org
* **Data Integrity**: Rolls back changes when an error occurs
* **Security**: Leverages Salesforce's enterprise-grade security model
* **Upgrades**: Updates and improvements delivered through the managed package
* **Customisation**: Full access to Salesforce's declarative customisation tools

### Schema-Driven Processing

MoveData employs a schema-driven approach that standardises data from diverse fundraising platforms into unified structures, delivering significant operational and cost benefits for nonprofit organisations.

**Standardisation Benefits:**

Rather than building separate integrations for each fundraising platform's unique data format, MoveData transforms all incoming data into standardised schemas. This approach provides several critical advantages:

* **Reduced Integration Complexity**: A single set of business rules handles data from multiple platforms, eliminating the need to develop and maintain platform-specific processing logic
* **Lower Maintenance Costs**: Updates to business rules apply across all integrated platforms simultaneously, rather than requiring separate modifications for each integration
* **Faster Implementation**: New platform integrations leverage existing schema processing, dramatically reducing setup time from weeks to hours
* **Consistent Data Quality**: Standardised validation and transformation rules ensure uniform data quality regardless of source platform

**Core Schema Types:**

* **Donation Schema**: Processes individual gifts, recurring donations, matched gifts, tributes, pledges and fundraiser registrations from fundraising platforms into consistent Salesforce donation records
* **Commerce Schema**: Handles ticket sales, merchandise, and event registrations across different platforms, creating uniform commerce records in Salesforce

**Cost and Complexity Reduction:**

This schema-driven architecture means that adding an additional fundraising platform requires minimal additional effort compared to traditional point-to-point integrations. The standardisation layer absorbs platform differences, allowing your organisation to focus on fundraising strategy rather than technical integrations.

### Extension Architecture

**Deployment and Maintenance Benefits:**

The extension architecture delivers significant operational advantages:

* **Rapid Implementation**: Extensions install with pre-configured business rules, field mappings, and processing logic, reducing setup time from weeks to hours
* **Feature Upgrades**: Extensions receive continuous improvements and new features through managed package updates, ensuring your integrations stay current with platform developments
* **Best Practice Implementation**: Extensions incorporate nonprofit industry best practices and lessons learned from hundreds of implementations

**Extensibility and Customisation:**

Each extension serves as a foundation that can be extended with complimentary flow:

* **Lightning Flow Integration**: Add additional flows to the existing processing logic using MoveData's execution pipeline.
* **Business Rule Customisation**: Implement unique organisational requirements whilst maintaining the benefits of standardised processing
* **Modular Enhancement**: Combine multiple extensions or add custom components to create comprehensive processing pipelines

This approach ensures that organisations can deploy proven solutions immediately whilst retaining the flexibility to adapt and evolve their integrations as requirements change.

**Out-of-the-box Extensions:**

MoveData's modular extension system provides out-of-the-box support for different Salesforce data models:

* **NPSP Fundraising and Donations Extension**: Comprehensive processing for Nonprofit Success Pack environments
* **Nonprofit Cloud Extension**: Native support for Salesforce's purpose-built nonprofit solution
* **Commerce Extension**: Specialised handling for ticketing and product sales

If the above extensions are not suitable, custom handlers using Apex and Lightning Flows can be developed.

## Notification Processing Pipeline

The diagram below illustrates the processing of a MoveData notification, using a donation notification processed by the NPSP Fundraising and Donations extension as an example.

<figure><img src="../.gitbook/assets/development_flow.png" alt=""><figcaption></figcaption></figure>

### Processing Flow

1. **Notification Dispatch**: A notification is dispatched to the MoveData engine hosted within Salesforce, triggered by events from integrated fundraising platforms.
2. **Schema Identification**: The engine interrogates the notification to identify the schema type. In this example, the notification uses the donation schema.
3. **Pipeline Registration Lookup**: A lookup into the MoveData Schema Metadata (`movedata__Movedata_Schema_Map__mdt`) identifies that the donation schema has a pipeline registered by the NPSP Fundraising and Donations extension.
4. **Phase Initialisation**: The appropriate pipeline is loaded and begins processing the notification through its defined phases (Account, Contact, Campaigns, Recurring Donations, Donations).  The notification has no account but contains the Contact who made the donation. The pipeline triggers the Contact phase and begins working through the provided data.
5. **Enable / Disabled Checked**: The pipeline checks the MoveData Pipeline Metadata (`movedata__MoveData_Pipeline__mdt`) to see if the Contact phase is disabled. It is not, so the pipeline advances to the next action.
6. **Determine SObject Type**: The pipeline checks the MoveData Pipeline Metadata to see if the SObject used in the Contact phase is overridden. This can be done by noting the SObject in the metadata or trigger a flow to dynamically determine the SObject type.  In this example, there is no entry so pipeline defaults to `Contact` SObject type.
7. **Fieldset Loading**: The pipeline reads the MoveData Pipeline Metadata to identify any fieldsets that need to be loaded. If fieldset references exist, they instruct the pipeline which fields to retrieve from Salesforce when matching existing records, ensuring all fields referenced in flows are preloaded to prevent execution failures.  If you reference a field in a flow / decision and depend on it's data, you need to ensure it has been preloaded.
8. **Duplicate Detection**: MoveData performs comprehensive duplicate checking using Lightning Flows and Salesforce Duplicate Rules to determine if an existing record matches the incoming data. MoveData will attempt to match on existing keys and if there is no match, will execute the organisation's Salesforce Duplicate Rules.
9. **Populate Record**: Regardless of whether an existing record is found, mapping rules execute to apply additions and changes to the Contact record. This stage contains the majority of business logic and field transformation rules.
10. **Record Persistence**: The processed record is returned from the mapping action, and the pipeline performs an `upsert` operation to persist the Contact data to Salesforce.
11. **Post-Processing Activities**: Following the `upsert`, additional actions handle post-processing requirements such as linking the contact record to other objects and creating related child records.
12. **Phase Progression**: The pipeline advances to the next phase once all contact entries in the notification have been processed successfully. In this scenario, the pipeline would proceed to address Campaign information in the notification.
13. **Completion and Logging**: Once all phases have been processed successfully, MoveData persists execution logs and results, marking the notification as successful and providing comprehensive audit trails.

## Customisation Framework

### Metadata-Driven Configuration

The platform uses Salesforce Custom Metadata Types for configuration management:

* **Schema Mapping**: `movedata__Movedata_Schema_Map__mdt` defines processing pipelines
* **Pipeline Configuration**: `movedata__MoveData_Pipeline__mdt` controls phase behaviour

These keys for these entries can be found in the Reference for each extension.

### Externalised Business Rules

MoveData's architecture leverages Salesforce Lightning Flows for business rule implementation:

* **Declarative Configuration**: Visual Lightning Flow builder for complex business logic
* **Organisational Customisation**: Tailored rules specific to nonprofit requirements
* **Turnkey Templates**: Pre-built flows for common nonprofit scenarios
* **Full Extensibility**: Business logic & rules are externalise as Flows to support custom rules

## Performance and Scalability

### Efficient Processing

* **Batch Processing**: Handles high-volume events efficiently
* **Intelligent Caching**: Reduces database queries through smart caching strategies

### Error Handling and Recovery

* **Comprehensive Logging**: Detailed execution logs for troubleshooting
* **Automatic Retry**: Intelligent retry mechanisms for transient failures
* **Manual Replay**: Ability to reprocess failed notifications
* **Exception Management**: Graceful handling of data quality issues

## Security and Compliance

### Salesforce Security Model

MoveData leverages Salesforce's enterprise security framework:

* **Field-Level Security**: Respects existing field access controls
* **Object Permissions**: Integrates with Salesforce permission sets
* **Sharing Rules**: Maintains data visibility requirements
* **Audit Trails**: Comprehensive logging for compliance requirements

### Data Protection

* **Encryption**: Data transmitted to Salesforce is encrypted in transit
* **Access Controls**: Role-based access to integration functionality
* **Compliance**: Supports GDPR, CCPA, and other privacy regulations

## Monitoring and Maintenance

The MoveData Lightning Application provides comprehensive monitoring capabilities:

* **Notification Dashboard**: Real-time view of processing status
* **Execution Logs**: Detailed logs on each notification
* **Error Reporting**: Immediate notification of processing issues
