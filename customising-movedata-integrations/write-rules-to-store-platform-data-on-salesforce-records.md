---
description: Map platform data to Salesforce records using Flow decision logic.
---

# Write Rules to Store Platform Data on Salesforce Records

{% hint style="info" %}
Metadata

* category=Customising MoveData Integrations
* subtitle=Showcases how to set additional data for a MoveData notification using marketing / UTM data as an example.
* integration=all
* tags=flows,video
{% endhint %}

{% embed url="https://vimeo.com/1135621526" %}

## Summary

In this tutorial, James from Movedata demonstrates how to map data from connected platforms to Salesforce records using donation mapping flows. The video shows a practical example of setting three fields on an opportunity record: Gateway (picklist), Gateway ID, and UTM Source. The process involves identifying available variables from the connected platform (such as processor, processor\_transaction\_id, and marketing\_source), then editing an existing Salesforce Flow to add decision logic that checks for these variables and sets them on the appropriate fields. The tutorial concludes with reprocessing a notification to verify that the values are correctly populated in Salesforce.

## Transcription

**\[00:00:05]** Hi there, James from Movedata, and in this video, I'm gonna show you how to use information from your connected platform to set against records inside Salesforce.

**\[00:00:13]** So in this example, we have a donation which has built out a suite of records I've got the opportunity up here.

**\[00:00:20]** And we can see that there's a field called gateway, which is actually a picklist gateway ID and UTM source, which don't have any values.

**\[00:00:30]** I know that they being captured in this example.

**\[00:00:33]** We can pull up our notification, click into execution.

**\[00:00:38]** We want them to save against the opportunity record so it's the donation phase and we can view our variables.

**\[00:00:44]** Now I know that the gateway is Stripe.

**\[00:00:48]** I can see that's available under the variable of processor.

**\[00:00:52]** I know that for Stripe for that gateway ID, they often start with ch underscore.

**\[00:00:57]** So can see that's available in a variable called processor transaction ID.

**\[00:01:02]** And I know that for this particular donation, I added a UTM source of test.

**\[00:01:09]** I can see that that's available in marketing underscore source.

**\[00:01:12]** So we have a few different variables we can use to set these fields on the opportunity record.

**\[00:01:18]** Now in this case we already have a donation mapping flow in existence so we can simply edit it to include this new logic and the first thing I'll do is add a decision

**\[00:01:30]** got this up.

**\[00:01:31]** So let's copy marketing underscore source.

**\[00:01:35]** And we can go assess marketing source exists.

**\[00:01:47]** And we can add a new resource variable marketing underscore source, which is text available for input into this flow is null false.

**\[00:02:02]** So if there's a value for marketing source, we want to set it

**\[00:02:08]** set utm source where record.utm source equals marketing underscore source and then if we go back to stripe the variable is processor so we can go assess processor

**\[00:02:36]** It's going to be Stripe.

**\[00:02:41]** variable processor again text available for input equals stripe so processor equals stripe we want to set the field gateway to stripe

**\[00:03:10]** And if you're using multiple processors, you might want to add multiple decision trees here.

**\[00:03:15]** Now the third one was

**\[00:03:17]** Stripe charge which comes through as processor transaction ID so in our flow we can add another decision assess processor transaction ID exists process the transaction ID if the

**\[00:03:38]** variable process the transaction ID which is text input

**\[00:03:46]** is now false.

**\[00:03:50]** So if it exists, I want to set record.gateway ID to process a transaction ID set gateway ID.

**\[00:04:04]** So we'll save this as a new version.

**\[00:04:09]** Hit activate.

**\[00:04:12]** And again, just to summarize, checking if there's a value for UTM source.

**\[00:04:17]** If so, we're setting it on the field UTM source.

**\[00:04:21]** We're then checking if the variable processor equals stripe.

**\[00:04:25]** If so, we're setting that on the field gateway, which is a picklist.

**\[00:04:29]** And then we're checking for the processor transaction ID and assuming it exists, we're setting that on the custom field gateway ID.

**\[00:04:38]** So now that we've added that saved and activated our flow, we can reprocess our notification.

**\[00:04:47]** And now that that has succeeded, we can refresh our opportunity record.

**\[00:04:54]** and observe that gateway is Stripe gateway ID has a value and UTM source equals test.

**\[00:05:02]** So in that sense, it's pretty easy to map values from your source platforms across to Salesforce.

**\[00:05:07]** Thank you.
