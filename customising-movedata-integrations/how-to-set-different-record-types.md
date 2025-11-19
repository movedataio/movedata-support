---
description: >-
  How to configure specific record types for Salesforce records created by
  MoveData integrations.
---

# How to set Different Record Types

{% hint style="info" %}
Metadata

* category=Customising MoveData Integrations
* integration=all
* tags=record,types,flows,video
{% endhint %}

{% embed url="https://vimeo.com/1136232170" %}

## Summary

In this tutorial, James from MoveData demonstrates how to specify which record type is set on records created by an integration. By default, Salesforce assigns a particular record type, but there are scenarios where a different type is needed. For example, recurring donations might require a "Recurring Donation" record type, while one-time donations need a different type. The video walks through a practical example where a donation opportunity defaults to a "Grant" record type but needs to be changed to "Donation" instead. The process involves navigating to Flows, opening the donation mapping flow, adding an action element to get the record type by name using the API name from Salesforce, adding decision logic to verify the record type exists, and then setting the correct record type ID on the opportunity record. After saving and activating the flow, the notification is reprocessed, and the opportunity record is updated with the correct "Donation" record type. The tutorial emphasises the ease of specifying record types and the ability to add conditional logic for different scenarios.

## Transcription

**\[00:00:05]** Hi there, James from MoveData. In this video, I'm going to show you how to specify which record type is set on the records your integration is creating.

**\[00:00:13]** Now by default, Salesforce will set a particular record type, but there might be certain scenarios where you want to set something different instead.

**\[00:00:19]** For example, if you're processing a recurring donation into Salesforce, you might want the opportunity to have a record type of recurring donation,

**\[00:00:27]** whereas once-off donations should have a different record type.

**\[00:00:30]** So we have an example here where a donation has been made. And if we open the opportunity record, you can see that a record type of grant is set by default.

**\[00:00:38]** What we want to do in this example is program the integration to set donation instead of grant.

**\[00:00:44]** So if we head on over to flows.

**\[00:00:46]** We'll open up our donation mapping flow.

**\[00:00:49]** and we can click the plus icon and add an action element.

**\[00:00:54]** If we use the search bar, we can search for record type.

**\[00:00:58]** and there's an available action here called Record Type by Name.

**\[00:01:02]** Now in Salesforce, there are a number of available record types. We're going to open up the donation record type and copy the record type API name.

**\[00:01:12]** We'll then head back over to our flow and call this get donation record type. The developer name is the API name, which we just copied.

**\[00:01:23]** And in this case, the S object is opportunity.

**\[00:01:27]** if you were writing this logic in a different phase, your S object type might be campaign or contact or gift transaction or something else.

**\[00:01:35]** We can then add a decision.

**\[00:01:37]** to make sure we return a value.

**\[00:01:47]** where get donation RT record type ID exists So if it does exist under this branch, we can set donation RT where record.record type ID equals record type ID from get donation record type.

**\[00:02:14]** Save this as a new version.

**\[00:02:16]** and hit activate.

**\[00:02:18]** We can then come back to our notification and click reprocess.

**\[00:02:23]** And if we head back to our opportunity and hit refresh.

**\[00:02:30]** we can see that the opportunity record type is donation.

**\[00:02:34]** so it's really easy to specify which record type gets set when MoveData runs. You can also add conditional logic into your flow to set different record types in different scenarios.

**\[00:02:44]** Thanks and bye.
