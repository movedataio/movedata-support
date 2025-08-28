# Architectural Overview

## Overview <a href="#how-movedata-works" id="how-movedata-works"></a>

MoveData operates as a modern, cloud-native integration platform specifically architected to bridge the gap between fundraising platforms and Salesforce environments for nonprofit organisations. Our platform transforms the complex challenge of data synchronisation into a seamless, automated process that respects your organisation's unique business rules whilst maintaining the highest standards of data integrity and security.

Built on enterprise-grade infrastructure and designed with nonprofit workflows in mind, MoveData eliminates the traditional barriers that prevent organisations from having real-time, accurate fundraising data in their Salesforce CRM. Rather than requiring manual data entry, complex custom development, or inflexible point-to-point integrations, MoveData provides a sophisticated yet user-friendly platform that automatically handles the intricacies of data transformation, validation, and integration.

The architecture leverages industry-leading cloud services to provide scalable, secure, and reliable data processing capabilities. Every component has been designed with the understanding that nonprofit organisations need both technical excellence and operational simplicity - delivering enterprise-level capabilities through intuitive interfaces that empower users rather than overwhelm them.

## How MoveData works. <a href="#how-movedata-works" id="how-movedata-works"></a>

MoveData's architecture follows a sophisticated three-stage lifecycle that transforms every meaningful fundraising interaction into actionable Salesforce data. This process operates continuously, handling everything from individual small donations to large-scale campaign activities with equal precision and reliability.

The platform's event-driven architecture ensures that each transaction is processed individually, maintaining complete data integrity and enabling real-time responsiveness. Unlike traditional batch processing systems, MoveData's approach means your Salesforce data reflects current supporter activity immediately, enabling timely stewardship and responsive fundraising operations.

### Data Processing Architecture

<figure><img src="../.gitbook/assets/MD_Process.drawio.png" alt=""><figcaption></figcaption></figure>

The MoveData platform processes fundraising data through a sophisticated three-stage lifecycle:

### Stage 1: Data Ingestion

The first stage captures every meaningful interaction from your fundraising ecosystem, creating a comprehensive foundation for data processing. This stage operates with intelligent redundancy and error handling to ensure no important fundraising activity is missed.

* **Real-time API Events**: Instant notification processing as transactions occur in fundraising platforms
* **Scheduled Polling**: Regular data retrieval for platforms with API limitations (configurable from 10 minutes to 24 hours)
* **CSV Processing**: Batch upload capabilities for historical or bulk data import

### Stage 2: Transformation Engine

TODO: Add descriptive text

* **Data Assembly**: Consolidation of primary event data, supporting information, supporter context, and campaign attribution
* **Field Mapping**: Automated conversion of platform-specific data fields to MoveData standards
* **Data Validation**: Comprehensive quality checks to ensure data integrity
* **Standardisation**: Creation of uniform notification format for consistent processing

### Stage 3: Salesforce Execution

TODO: Add descriptive text

* **MoveData Extensions**: Purpose-built components for donation processing, commerce support, and data model compatibility (Standard Salesforce, NPSP and Nonprofit Cloud)
* **Custom Business Rules**: Configurable Lightning Flows for organisation-specific requirements
* **Native Lightning Application**: Real-time visibility, execution management, and comprehensive audit trails

