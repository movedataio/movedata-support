---
description: >-
  The Commerce Extension extends MoveData's core integration capabilities to
  handle ticketing, merchandise sales, product orders, and event registrations
  seamlessly within Salesforce.
---

# Welcome to the Commerce Extension

## Understanding Commerce Integration

### What is the Commerce Schema?

The Commerce Schema processes all commercial transaction data from fundraising and event platforms, including ticket sales, merchandise purchases, raffle sales, product orders, and event registrations. The Commerce Extension transforms this diverse commercial data into consistent Salesforce records that integrate seamlessly with your existing nonprofit workflows.

Commercial activities supported include:

* **Ticket Sales**: Event tickets, early bird pricing, group discounts, and venue-specific options
* **Merchandise & Products**: Branded items, promotional materials, and fundraising products
* **Event Registrations**: Participant sign-ups, registration add-ons, and customisation options
* **Raffle Sales**: Raffle ticket purchases, draw entries, and prize allocation tracking
* **Product Variations**: Size, colour, and style options with inventory management

### Extension Architecture

The Commerce Extension leverages Salesforce's standard and custom objects to ensure commercial data integrates correctly with your existing sales processes, campaign tracking, and supporter engagement workflows.

## Commerce-Specific Data Handling

### Contact and Account Management

**Customer Account Model**

* Creates individual and household accounts for purchasers using standard Salesforce models
* Establishes proper customer-to-account relationships for ongoing engagement
* Maintains complete purchase history through opportunity and order tracking
* Supports both one-time purchasers and repeat customers

**Organisational Purchases**

* Creates organisational accounts for corporate ticket purchases and bulk orders
* Establishes proper contact-to-account affiliations for business relationships
* Supports group registration and corporate event participation

### Order and Opportunity Processing

**Commerce Opportunity Fields** The extension populates commerce-specific opportunity fields including:

* **Product Details**: SKU, variant information, and inventory tracking
* **Pricing Information**: Unit prices, discounts, taxes, and fees
* **Fulfilment Status**: Order processing, shipping, and delivery tracking
* **Event Information**: Session details, venue information, and attendance tracking

**Order Management**

* Creates comprehensive order records linking all purchased items
* Tracks order status from placement through fulfilment
* Manages inventory allocation and availability
* Supports partial shipments and split deliveries

### Campaign and Event Integration

**Multi-Level Campaign Structure**

* Links ticket sales and registrations to parent events and campaigns
* Creates hierarchical relationships between events, sessions, and activities
* Maintains campaign member relationships for ongoing engagement
* Supports multi-event packages and season pass sales

**Event Management**

* Tracks event capacity, availability, and waitlist management
* Manages session-specific information and scheduling
* Supports venue changes, cancellations, and refund processing

### Product Catalog Management

**Product and Variant Tracking**

* Creates `Product2` records for merchandise and ticketing items
* Manages product variants including size, colour, and configuration options
* Tracks pricing tiers, discount codes, and promotional pricing
* Supports seasonal availability and limited-time offers

**Inventory Integration**

* Updates stock levels based on sales transactions
* Manages product availability across multiple sales channels
* Supports back-order processing and restock notifications

### Payment and Financial Tracking

**Transaction Processing**

* Records payment method details and transaction references
* Tracks fees, taxes, and processing charges separately
* Supports multiple payment types and instalment plans
* Manages refunds, cancellations, and exchanges

**Revenue Recognition**

* Allocates revenue across products, fees, and tax components
* Supports deferred revenue for future events and services
* Tracks commission structures for affiliate and partner sales

## Extension Configuration

### Prerequisites

Before installing the Commerce extension, ensure:

* MoveData is installed and configured
* Required Salesforce objects have appropriate permissions
* Product catalog structure meets your organisational needs
* Campaign hierarchy aligns with your event management processes

### Installation Options

The Commerce Extension supports multiple Salesforce environments:

**Standard Salesforce**: Compatible with Sales Cloud, Service Cloud, and Platform editions **Nonprofit Success Pack (NPSP)**: Full integration with NPSP opportunity and campaign models **Nonprofit Cloud**: Enhanced support for Nonprofit Cloud commerce features

### Direct Installation Links

The MoveData Commerce Extension can be installed directly from:

* Production & Developer Editions: [https://api.movedata.io/installer/commerce-extension](https://api.movedata.io/installer/commerce-extension)
* Sandbox & Scratch Orgs: [https://api.movedata.io/installer/commerce-extension?sandbox=1](https://api.movedata.io/installer/commerce-extension?sandbox=1)

## Supported Platforms

The Commerce Extension processes data from various fundraising and event platforms:

* **Funraisin**: Complete support for sales, raffles, registrations, and ticketing
* **Raisely**: Comprehensive ticket sales and merchandise integration
* **Benevity**: Workplace giving commerce activities (via CSV processing)
* **Custom Platforms**: API and webhook integration for proprietary systems

## Commerce Data Flows

### Ticket Sales Processing

1. **Event Setup**: Campaigns and products created for event tickets
2. **Purchase Processing**: Orders created with line items for each ticket type
3. **Attendee Management**: Contacts linked to events through campaign members
4. **Check-in Integration**: Attendance tracking and validation support

### Merchandise Sales

1. **Product Catalog**: Merchandise items created with variants and pricing
2. **Order Processing**: Purchase orders with shipping and fulfilment details
3. **Inventory Updates**: Stock level adjustments based on sales volume
4. **Customer Service**: Return, exchange, and warranty support integration

### Registration Management

1. **Event Configuration**: Registration types and add-on options defined
2. **Participant Signup**: Registrations processed with custom field capture
3. **Payment Processing**: Registration fees and optional extras handled
4. **Communication**: Automated confirmation and reminder workflows

## Advanced Features

### Multi-Currency Support

* Processes transactions in multiple currencies with automatic conversion
* Maintains original currency amounts alongside Salesforce converted values
* Supports currency-specific pricing and regional product availability

### Tax and Fee Management

* Separates product costs from taxes, fees, and processing charges
* Supports complex tax jurisdictions and exemption processing
* Tracks platform fees separately for accurate revenue reporting

### Discount and Promotion Handling

* Processes promotional codes, early bird pricing, and volume discounts
* Maintains discount attribution for marketing effectiveness analysis
* Supports complex pricing rules and conditional offers
