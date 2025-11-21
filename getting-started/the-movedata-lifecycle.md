---
description: >-
  Learn about the comprehensive MoveData lifecycle that transforms how
  nonprofits manage their data ecosystem.
---

# The MoveData Lifecycle

## The MoveData Lifecycle

Learn about the comprehensive MoveData execution lifecycle that transforms fundraising activity into actionable Salesforce data.

### The MoveData Lifecycle in 90 seconds

TODO: Insert Video

MoveData follows a real-time execution lifecycle that captures every meaningful activity from your fundraising platforms and transforms them into actionable data within your Salesforce org. Our lifecycle ensures seamless data flow from the moment a supporter takes action through to complete execution in your CRM system.

### The MoveData Lifecycle Description

MoveData views data processing as a continuous execution cycle rather than a static integration. This means that every donation, registration, update, or interaction in your fundraising platforms triggers a sophisticated transformation and execution process that respects your organisation's unique business rules and data requirements.

The lifecycle operates as a dynamic system that processes individual events through multiple stages, creating a reliable bridge between your fundraising activities and your Salesforce ecosystem.

### Lifecycle Execution Flow

{% hint style="info" %}
**References** **Article:** [MoveData Architecture](https://support.movedata.io/developer/movedata/architectural-overview/) / **Video:** [Architecture 101](https://support.movedata.io/knowledgebase/technical/architecture-101/)
{% endhint %}

<figure><img src="../.gitbook/assets/movedata_lifecycle_svg (1).svg" alt=""><figcaption></figcaption></figure>

#### Stage 1: Action

**Transaction/Event in Fundraising Platform**

Every interaction in your fundraising ecosystem triggers the MoveData lifecycle:

**Event Types:**

* **Donations** - One-time gifts, recurring donations, pledges
* **Event Registrations** - Fundraising events, volunteer signups, program enrolment
* **Supporter Updates** - Profile changes, preference updates, contact information
* **Peer-to-Peer Activities** - Fundraising page creation, team participation
* **Product Sales** - Merchandise, tickets, raffles

**Capture Methods:**

* **Real-time API Events** - Instant notification as transactions occur
* **Polling** - Regular checks for new or updated records (10 mins to 24 hours)
* **CSV File Processing** - Batch uploads of historical or bulk data

**Event Intelligence:** Each captured event contains rich contextual information including transaction details, supporter data, campaign attribution, timing information, and any custom fields specific to your fundraising platform.

#### Stage 2: Transformation & Standardisation

**Transformation into MoveData Notification**

Raw fundraising platform data undergoes sophisticated transformation to create standardised notifications:

**Data Assembly:**

* **Primary Event Data** - Core transaction or interaction details
* **Supporting Data** - Associated / related data
* **Supporter Context** - Complete donor/participant profile information
* **Campaign Attribution** - Source tracking and marketing attribution
* **Platform Metadata** - Additional Fundraising platform-specific data

**Standardisation Process:**

* **Field Mapping** - Converting platform-specific fields to MoveData standards
* **Data Validation** - Ensuring data quality and completeness
* **Business Logic Application** - Applying predefined transformation rules
* **Notification Packaging** - Creating standardised notification format

**Intelligent Enhancement:** MoveData enriches each notification with additional context to produce a standalone / atomic notification with no dependencies on previous data (ie. a notification for a donation will contain all data regarding the campaign and donor).

#### Stage 3: Execution

**Execution of Notification in MoveData**

Standardised notifications undergo sophisticated business rule processing before commitment to Salesforce:

**MoveData Extensions:**

* **Donation Support** - Comprehensive processing for one-time, recurring, matched and similar donations
* **Commerce Support** - Ticket sales, event registrations, merchandise, and enrollments
* **Data Model Compatibility** - Out-of-the-box support for both NPSP and Nonprofit Cloud architectures
* **Managed Updates** - Extensions supported and continuously upgraded by MoveData

**Custom Business Rules:**

* **Lightning Flow Implementation** - Business logic built using standard Salesforce declarative tools
* **Organisational Logic** - Custom rules tailored to your nonprofit's specific requirements
* **Turnkey Configuration** - Pre-built business rules for common nonprofit scenarios, ready to deploy

**Native Lightning Application:**

* **Real-time Visibility** - View integration performance and data flow
* **Execution Management** - User-friendly interface for handling processing exceptions & execution logging
* **Audit Trail Access** - Complete visibility into data transformation and processing history

The MoveData lifecycle ensures that every supporter interaction, regardless of where it occurs in your fundraising ecosystem, becomes valuable, actionable data that drives your organisation's mission forward.
