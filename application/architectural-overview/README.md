# Architectural Overview

## Overview <a href="#how-movedata-works" id="how-movedata-works"></a>

TODO

## How MoveData works. <a href="#how-movedata-works" id="how-movedata-works"></a>

<figure><img src="../../.gitbook/assets/MD_Process.drawio.png" alt=""><figcaption></figcaption></figure>

#### Ingest <a href="#ingest" id="ingest"></a>

* MoveData listens to or requests data from integrated platforms (known as Integrations).
  * This could be a donation from a fundraiser, a registration to an event or an online product sale.

#### Transform <a href="#transform" id="transform"></a>

* MoveData transforms this data into a standardised structure (known as a Schema).
  * The benefits of using a standardised structure is that once an organisation supports a schema, they can use all platforms that send information in the same schema. For example, support one fundraising platform and you have support for tens of fundraising platforms.
* Once the data is standardised, the data is forwarded into the MoveData engine; we refer to this as a Notification.
  * When a notification arrives, this data is processed using a business rules engine and saved to your organisation’s Salesforce instance. Business rules are typically implemented using Salesforce Lightning Flows, allowing power users and system administrators to maintain their rules and data mapping. Salesforce Apex can also be used.

#### Process <a href="#process" id="process"></a>

For more information about how MoveData processes a notification within Salesforce, please see the [Architecture](https://movedata.atlassian.net/wiki/spaces/MVDT/pages/1601339417) page within the [Development](https://movedata.atlassian.net/wiki/spaces/MVDT/pages/1601110324) section.

* MoveData processes the Notification using Lightning Flows or Apex.
  * To accelerate the processing of a Notification, MoveData makes available pre-built handlers such as Donations and Fundraising that come fully loaded and usually enable an organisation to be successfully processing data within minutes. These are a great place to start and can easily be extended while remaining upgradable.
* During the execution / processing of a Notification, MoveData extensively logs its actions, ensuring a clear record of what has taken place.
* So there was a failure due to a validation rule or scheduled update? MoveData provides an interface that enables you to view and reprocess a Notification.
