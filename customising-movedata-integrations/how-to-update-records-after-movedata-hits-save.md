---
description: >-
  Update downstream Salesforce records created after MoveData processing using
  Flows.
---

# How to Update Records after MoveData Hits Save

{% hint style="info" %}
Metadata

* category=Customising MoveData Integrations
* integration=all
* tags=post-upsert,flows,video
{% endhint %}

{% embed url="https://vimeo.com/1135962383" %}

## Summary

In this tutorial, James from MoveData demonstrates how to update records that Salesforce creates after MoveData runs, specifically focusing on NPSP payment records that are created downstream of opportunity records. The video shows how to build an auto-launch Salesforce Flow that uses the opportunity record (created by MoveData) as a reference point to locate and update related payment records. The flow includes decision logic to verify the opportunity exists, a GET element to retrieve associated payment records, validation to ensure a result was found, and an update element to set values on custom payment fields. The tutorial concludes with registering the flow in the MoveData pipeline as a post-entry action and testing the configuration by reprocessing a notification to verify the payment record is successfully updated.

## Transcription

**\[00:00:05]** Hi there, it's James from MoveData.

**\[00:00:07]** In this video, I'm gonna show you how to update records Salesforce creates after MoveData runs.

**\[00:00:12]** So in this example, we have a donation which has been processed into Salesforce.

**\[00:00:16]** If we open the donation up, we can see that a payment record has been created by NPSP downstream of this opportunity record.

**\[00:00:24]** This payment record is not created by MoveData but we want to find it and set a value

**\[00:00:29]** on this custom payment field.

**\[00:00:31]** To do this, we need to open flows and create a new flow.

**\[00:00:37]** The type is auto launch flow no trigger.

**\[00:00:40]** And the first thing we need to consider is how we can find this payment record.

**\[00:00:45]** We can see that there's a linkage here to the opportunity record, which was created by MoveData.

**\[00:00:51]** So we can head on over to our flow and create a new resource called record, which is from our flows 101 video.

**\[00:01:01]** And the object for this is in this case, opportunity, which we can mark as available for input and for output.

**\[00:01:13]** And we can do a check to see if

**\[00:01:16]** the opportunity exists.

**\[00:01:24]** where record.id is null false.

**\[00:01:33]** So if there is an ID for an opportunity, the flow will go down this branch.

**\[00:01:38]** Assuming so, we can do a GET

**\[00:01:41]** where we look up the payments.

**\[00:01:46]** via the field opportunity equals record.id.

**\[00:01:58]** We can then check to ensure we found a result.

**\[00:02:19]** And assuming so, we can set fields on our payment record.

**\[00:02:29]** So in this case, payment from get payment, custom payment field equals XYZ.

**\[00:02:39]** We will then need to update our payment record with these values.

**\[00:02:52]** and we can close this and hit save.

**\[00:02:55]** We're going to use a particular naming convention, but you can use what works for you.

**\[00:03:07]** and we can then activate our flow.

**\[00:03:09]** We now need to register this flow in the MoveData pipeline.

**\[00:03:13]** So copy the API name that you just added and head on over to custom metadata types and then MoveData pipeline and click manage records.

**\[00:03:24]** In this case, we're working in the donation phase and the update is happening after the opportunity is created.

**\[00:03:30]** So we can find this donation post entry and click clone.

**\[00:03:35]** to our new flow API name and we can change the pipeline setting name to ext as the suffix and the order we will use is 6.

**\[00:03:48]** So let's hit save.

**\[00:03:50]** and our flow has been registered.

**\[00:03:53]** So if we head on over to the notification again and click reprocess.

**\[00:03:57]** We can then click into execution and search for our flow API name and we can see that our flow is running.

**\[00:04:04]** So if we head on back over to the payment record and hit refresh, you'll see that our XYZ value has been saved against the custom payment field.

**\[00:04:13]** So thanks for watching and hopefully that helps with updating records which are produced after MoveData runs.
