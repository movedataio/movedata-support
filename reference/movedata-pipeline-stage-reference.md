# MoveData Pipeline Stage Reference

## Overview

A multi-stage pipeline enables the execution of specific domains using pre-defined phases.  For example, the Donation pipeline has the following phases:  Account, Contact, Campaign, Recurring and Donation stages.  These pipelines handle the administration and complexity associated with each phase, enabling the abstraction of business rules.

Each phase is made up of "stages".  Each stage has a specific set of characteristics so the pipeline can predictably interface with each implementation.  Pipelines typically interface with Salesforce Lightning Flows to enable visible, configurable logic.

## Multi-Stage Pipelines

{% hint style="info" %}
More about how pipelines can be found at [processing-pipelines.md](../application/salesforce-architecture/processing-pipelines.md "mention").
{% endhint %}

A pipeline implements a schema.  The Donation pipeline implements the `donation` schema, while the Commerce pipeline implements the `commerce` schema.  These are registered with MoveData in the Schema Mapping metadata.  Once registered, a pipeline will will execute when a notification with the registered schema type arrives.  This will direct the pipeline to execute it's phases; within each phase, it will contain a number of stages that are linked to metadata values or Salesforce Lightning flows.

MoveData provides two multi-stage pipelines out of the box.  These multi-stage pipelines are:

* MoveData Donation Pipeline (`MoveDataDonationPipeline` - handles `donation` schema)
* MoveData Commerce Pipeline (`MoveDataCommercePipeline` - handles `commerce` schema)

### MoveData Extensions

<figure><img src="../.gitbook/assets/movedata-flows.png" alt=""><figcaption></figcaption></figure>

These pipelines are implemented by the following extensions using a series of flows:

* MoveData NPSP Fundraising & Donations Extension (Donation pipeline)
* MoveData Commerce Extension (Commerce pipeline)
* MoveData Non-Profit Cloud Extension (Donation & Commerce pipelines)

## Phase Order

* Disable Phase: Identifies if the stage should run.
* SObject Phase: Determines the SObject type for the `Record`.
* Fieldset Phase: Tells MoveData what fields should be loaded when an existing record is found.
* Platform Key Phase: Constructs a unique key for the stage.
* Record Match Phase: Logic that attempts to match with an existing record.
* Mapping Phase: Maps the stage's data to the SObject `Record`.
* Post-Upsert Phase: Executes logic that runs after the `Record` is created or updated.

## Reference

The following section details each of the possible phases for a stage.  This includes implementation options and input & output parameters of these phases.

### Disable Phase

If you wish to disable a phase completely, you can do that through a metadata entry in the pipeline configuration metadata object (`movedata__MoveData_Pipeline__mdt)`. &#x20;

### SObject Phase



