# Salesforce Architecture

## Overview

MoveData is built to run within Salesforce as a managed package, providing a comprehensive integration platform designed exclusively for nonprofits. The architecture supports extensive configuration and customisation pathways including Apex and Lightning Flow extensibility, enabling organisations to implement business rules tailored to their specific needs.

The platform operates as a native Salesforce application that transforms fundraising platform events into actionable Salesforce data. The following architecture ensures seamless integration with your existing Salesforce environment whilst maintaining the flexibility to adapt to unique organisational requirements.

## Core Architecture Components

### Managed Package Foundation

MoveData operates as a Salesforce managed package, which provides several key advantages:

* **Native Integration**: Runs entirely within your Salesforce org with no external dependencies
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

MoveData's modular extension system provides out-of-the-box support for different Salesforce data models:

* **NPSP Fundraising and Donations Extension**: Comprehensive processing for Nonprofit Success Pack environments
* **Nonprofit Cloud Extension**: Native support for Salesforce's purpose-built nonprofit solution
* **Commerce Extension**: Specialised handling for ticketing and product sales
* **Custom Extensions**: Framework for organisation-specific processing requirements

## Notification Processing Pipeline

The diagram below illustrates the processing of a MoveData notification, using a donation notification processed by the NPSP Fundraising and Donations extension as an example.

<figure><img src="../.gitbook/assets/development_flow.png" alt=""><figcaption></figcaption></figure>

### Processing Flow

1. **Notification Dispatch**: A notification is dispatched to the MoveData engine hosted within Salesforce, triggered by events from integrated fundraising platforms.
2. **Schema Identification**: The engine interrogates the notification to identify the schema type. In this example, the notification uses the donation schema.
3. **Pipeline Registration Lookup**: A lookup into the MoveData Schema Metadata (`movedata__Movedata_Schema_Map__mdt`) identifies that the donation schema has a pipeline registered by the NPSP Fundraising and Donations extension.
4. **Pipeline Initialisation**: The appropriate pipeline is loaded and begins processing the notification through its defined phases.
5. **Phase Processing**: The NPSP Fundraising and Donations extension pipeline processes through five phases (Account, Contact, Campaign, Recurring Donation, and Donation) to handle the notification comprehensively.
6. **Contact Phase Initiation**: Since this notification contains Contact information for the donor, the pipeline triggers the Contact phase and begins working through the provided data.
7. **Phase Status Check**: The pipeline checks the MoveData Pipeline Metadata (`movedata__MoveData_Pipeline__mdt`) to determine if the Contact phase is disabled. Finding it active, the pipeline advances to the next action.
8. **SObject Override Verification**: The pipeline checks the MoveData Pipeline Metadata to see if the SObject used in the Contact phase is overridden. With no override present, the pipeline defaults to the Contact object.
9. **Fieldset Loading**: The pipeline reads the MoveData Pipeline Metadata to identify any fieldsets that need to be loaded. If fieldset references exist, they instruct the pipeline which fields to retrieve from Salesforce when matching existing records, ensuring all fields referenced in flows are preloaded to prevent execution failures.
10. **Duplicate Detection**: MoveData performs comprehensive duplicate checking using Lightning Flows and Salesforce Duplicate Rules to determine if an existing record matches the incoming data. This process respects your organisation's existing duplicate management configuration.
11. **Business Rules Application**: Regardless of whether an existing record is found, mapping rules execute to apply additions and changes to the Contact record. This stage contains the majority of business logic and field transformation rules.
12. **Record Persistence**: The processed record is returned from the mapping action, and the pipeline performs an upsert operation to persist the Contact data to Salesforce.
13. **Post-Processing Activities**: Following the upsert, additional actions handle post-processing requirements such as linking the contact record to other objects, creating related child records, or triggering subsequent workflows.
14. **Phase Progression**: The pipeline advances to the next phase once all contact entries in the notification have been processed successfully. In this scenario, the pipeline would proceed to address Campaign information in the notification.
15. **Completion and Logging**: Once all phases have been processed successfully, MoveData persists execution logs and results, marking the notification as successful and providing comprehensive audit trails.

## Data Flow Architecture

### Three-Stage Lifecycle

MoveData's architecture implements a comprehensive three-stage lifecycle:

**Stage 1: Action**

* Captures events from fundraising platforms through real-time APIs, polling, or CSV processing
* Handles donations, event registrations, supporter updates, peer-to-peer activities, and product sales
* Provides event intelligence with rich contextual information

**Stage 2: Transformation & Standardisation**

* Assembles primary event data with supporting information and supporter context
* Applies field mapping, data validation, and business logic
* Creates standardised notifications independent of source platform

**Stage 3: Execution**

* Processes notifications through MoveData extensions and custom business rules
* Implements Lightning Flow-based business logic
* Creates and updates Salesforce records with complete audit trails

### Integration Methods

The architecture supports multiple integration approaches:

* **Real-time Webhooks**: Instant processing of platform events as they occur
* **API Polling**: Regular synchronisation for platforms supporting API access
* **CSV Processing**: Batch processing for platforms with limited connectivity options

## Customisation Framework

### Lightning Flow Integration

MoveData's architecture leverages Salesforce Lightning Flows for business rule implementation:

* **Declarative Configuration**: Visual workflow builder for complex business logic
* **Organisational Customisation**: Tailored rules specific to nonprofit requirements
* **Turnkey Templates**: Pre-built flows for common nonprofit scenarios

### Metadata-Driven Configuration

The platform uses Salesforce Custom Metadata Types for configuration management:

* **Schema Mapping**: `movedata__Movedata_Schema_Map__mdt` defines processing pipelines
* **Pipeline Configuration**: `movedata__MoveData_Pipeline__mdt` controls phase behaviour
* **Field Mapping**: Flexible field-to-field mapping configuration
* **Business Rules**: Declarative rule definition and management

### Extension Points

The architecture provides multiple extension points for customisation:

* **Pre-Processing Hooks**: Custom logic before record processing
* **Transformation Rules**: Custom field mapping and data transformation
* **Post-Processing Actions**: Additional logic after record creation/update
* **Custom Schemas**: Support for organisation-specific data structures

## Performance and Scalability

### Efficient Processing

* **Batch Processing**: Handles high-volume events efficiently
* **Intelligent Caching**: Reduces database queries through smart caching strategies
* **Asynchronous Execution**: Non-blocking processing for optimal performance

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

* **Encryption**: Data encrypted at rest and in transit
* **Privacy Controls**: Supports data privacy and consent management
* **Access Controls**: Role-based access to integration functionality
* **Compliance**: Supports GDPR, CCPA, and other privacy regulations

## Monitoring and Maintenance

### Real-time Visibility

The MoveData Lightning Application provides comprehensive monitoring capabilities:

* **Integration Dashboard**: Real-time view of processing status
* **Performance Metrics**: Detailed analytics on integration performance
* **Error Reporting**: Immediate notification of processing issues
* **Data Quality Insights**: Monitoring of data transformation accuracy

### Operational Excellence

* **Health Checks**: Automated monitoring of integration health
* **Performance Optimisation**: Continuous improvement recommendations
* **Capacity Planning**: Insights for scaling integration capacity
* **Best Practices**: Guidance for optimal configuration and usage

This architecture ensures that MoveData provides a robust, scalable, and highly customisable integration platform that grows with your organisation's needs whilst maintaining the reliability and security expected in enterprise nonprofit environments.
