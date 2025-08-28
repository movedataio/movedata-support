---
description: >-
  MoveData's cloud-native AWS-hosted integration engine provides secure,
  scalable data processing for nonprofits with multi-region availability and
  compliance.
---

# Platform Architecture

## Overview

MoveData operates as a modern, cloud-native integration platform specifically designed for nonprofit organisations using Salesforce. Our architecture leverages industry-leading cloud infrastructure to provide secure, scalable, and reliable data processing capabilities that bridge fundraising platforms with Salesforce environments.

The central platform is built on Amazon Web Services (AWS) infrastructure with a multi-region, highly available configuration that ensures maximum uptime and data resilience. This document outlines the key architectural components, security measures, and operational practices that underpin the MoveData service.

More can be found at our listing on the [Cloud Security Alliance' Security, Trust, Assurance and Risk (STAR) registry](https://cloudsecurityalliance.org/star/registry/movedata/services/movedata).&#x20;

## Architectural Principles

MoveData's platform is built upon the following core architectural principles:

### Cloud-Native Design

The entire platform is designed to leverage cloud-native services and capabilities, utilising AWS services for scalability, reliability, and security rather than building custom infrastructure components.

### Infrastructure as Code

All platform configurations, settings, and deployments are implemented using Infrastructure as Code (IaC) principles. This ensures consistent, repeatable deployments and eliminates configuration drift whilst maintaining complete audibility of all system changes.

### Multi-Region High Availability

The platform operates in an active-active, multi-region configuration to minimise the impact of natural or man-made disasters and ensure continuous service availability for our nonprofit customers.

### Zero-Touch Operations

The platform is designed for automated operations with no manual "click-ops" required for system administration, reducing human error and ensuring consistent security posture.

## Platform Components

### Core Infrastructure

**Hosting Platform**: Amazon Web Services (AWS)\
**Architecture Pattern**: Microservices with event-driven processing\
**Deployment Model**: Multi-region active-active configuration\
**Infrastructure Management**: Infrastructure as Code using AWS native tooling

### Security Architecture

#### Data Protection

* **Encryption**: All data encrypted in-transit and at-rest using AES-256-GCM via AWS KMS
* **Key Management**: Automated key rotation using AWS Key Management Service (KMS) and AWS Secrets Manager
* **Access Control**: Role-based access control (RBAC) with principle of least privilege
* **Multi-Factor Authentication**: Required for access to all critical systems

#### Network Security

* **Secure Communications**: All platform communications use industry-standard secure protocols
* **Environment Isolation**: Explicit separation between production and non-production environments
* **Network Monitoring**: Comprehensive monitoring of all inter-environment communications
* **Vulnerability Management**: Continuous vulnerability scanning using AWS security services and GitHub Dependabot

#### Compliance and Auditing

* **CSA STAR Level 1**: Certified through the Cloud Security Alliance STAR self-assessment program
* **Salesforce AppExchange**: Continuously assessed as a certified member of the Salesforce AppExchange
* **Audit Trail**: Complete logging of all platform activities with secure, read-only audit logs
* **Policy Management**: Formal policies and procedures reviewed annually and available at [movedata.io/legal](https://www.movedata.io/legal/)

### Data Management

#### Storage Architecture

* **Primary Database**: Multi-site replicated database with automated backups
* **Notification Storage**: Distributed storage system with built-in redundancy
* **Data Retention**: Baked in retention policies, hard limited to 90 days

#### Data Processing

* **Customer Isolation**: Explicit logical isolation and segregation between customer environments
* **Shared Infrastructure**: Efficient resource utilisation whilst maintaining complete data separation
* **Scalable Processing**: Dynamic scaling based on workload demands using AWS native services
* **Quality Assurance**: Comprehensive data validation and error handling throughout the processing pipeline

## Operational Excellence

### Development and Deployment

#### DevOps Pipeline

* **Source Control**: Git-based version control with mandatory peer review processes
* **Automated Testing**: Comprehensive test suites including unit tests, integration tests, and security scans
* **Continuous Integration/Continuous Deployment**: Fully automated deployment pipeline with rollback capabilities

#### Change Management

* **Controlled Deployments**: All changes deployed through staging environments before production
* **Rollback Capability**: Git-based rollback mechanisms for rapid recovery (excluding structural database changes)
* **Configuration Management**: All configuration managed through Infrastructure as Code

### Monitoring and Alerting

#### System Monitoring

* **Real-time Metrics**: Comprehensive monitoring of system performance and availability
* **Automated Alerting**: Proactive notifications for system anomalies and performance thresholds
* **Log Analysis**: Machine learning-powered log analysis for security and operational insights
* **Capacity Management**: Proactive scaling based on usage patterns and forecasted demand

#### Security Monitoring

* **Threat Detection**: Continuous monitoring for security threats and anomalies
* **Security Metrics**: Regular analysis of security metrics and compliance posture
* **Penetration Testing**: Mandated security assessments by Salesforce

### Business Continuity

#### Disaster Recovery

* **Multi-Region Design**: Active-active configuration across multiple AWS regions
* **Automated Failover**: Seamless failover capabilities with minimal service disruption
* **Data Replication**: Real-time data replication across geographically distributed locations
* **Recovery Testing**: Annual disaster recovery testing and plan validation

#### Backup and Recovery

* **Automated Backups**: Daily automated backups of all critical data
* **Point-in-Time Recovery**: Granular recovery capabilities for data restoration
* **Cross-Region Backup**: Geographically distributed backup storage
* **Backup Validation**: Regular testing of backup integrity and restoration procedures

## Performance and Scalability

### Scalability Design

#### Horizontal Scaling

* **Microservices Architecture**: Independent scaling of individual service components
* **Load Distribution**: Automatic load distribution across multiple processing nodes
* **Queue-Based Processing**: Asynchronous processing using managed queue services
* **Auto-Scaling**: Dynamic resource allocation based on real-time demand

#### Performance Optimisation

* **Caching Strategies**: Intelligent caching to reduce latency and improve response times
* **Database Optimisation**: Optimised database queries and indexing strategies
* **Content Delivery**: Geographically distributed content delivery for optimal performance
* **Resource Monitoring**: Continuous monitoring and optimisation of resource utilisation

### Capacity Management

* **Proactive Scaling**: Capacity planning and scaling based on usage analytics and forecasting
* **Performance Metrics**: Real-time monitoring of key indicators

## Compliance and Certifications

### Industry Standards

* **CSA STAR Level 1**: Self-assessment certification demonstrating adherence to Cloud Security Alliance standards
* **Salesforce Security Review**: Continuous compliance with Salesforce AppExchange security requirements
* **GDPR Compliance**: Full compliance with General Data Protection Regulation requirements

***

This platform architecture documentation reflects MoveData's commitment to providing a secure, scalable, and reliable integration platform for nonprofit organisations. Our architecture is continuously evolving to meet the changing needs of our customers whilst maintaining the highest standards of security, performance, and reliability.
