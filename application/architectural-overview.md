# Architectural Overview

## Overview <a href="#how-movedata-works" id="how-movedata-works"></a>

TODO

## How MoveData works. <a href="#how-movedata-works" id="how-movedata-works"></a>

<figure><img src="../.gitbook/assets/MD_Process.drawio.png" alt=""><figcaption></figcaption></figure>

### Data Processing Architecture

The MoveData platform processes fundraising data through a sophisticated three-stage lifecycle:

#### Stage 1: Data Ingestion

TODO: Add descriptive text

* **Real-time API Events**: Instant notification processing as transactions occur in fundraising platforms
* **Scheduled Polling**: Regular data retrieval for platforms with API limitations (configurable from 10 minutes to 24 hours)
* **CSV Processing**: Batch upload capabilities for historical or bulk data import

#### Stage 2: Transformation Engine

TODO: Add descriptive text

* **Data Assembly**: Consolidation of primary event data, supporting information, supporter context, and campaign attribution
* **Field Mapping**: Automated conversion of platform-specific data fields to MoveData standards
* **Data Validation**: Comprehensive quality checks to ensure data integrity
* **Standardisation**: Creation of uniform notification format for consistent processing

#### Stage 3: Salesforce Execution

TODO: Add descriptive text

* **MoveData Extensions**: Purpose-built components for donation processing, commerce support, and data model compatibility (Standard Salesforce, NPSP and Nonprofit Cloud)
* **Custom Business Rules**: Configurable Lightning Flows for organisation-specific requirements
* **Native Lightning Application**: Real-time visibility, execution management, and comprehensive audit trails

