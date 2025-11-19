---
description: Add platform-specific business rules in Salesforce using Flow decision logic.
---

# Conditional Business Rules based on Source Platform

{% hint style="info" %}
Metadata

* category=customise
* integration=all
* tags=flows,video
{% endhint %}

{% embed url="https://vimeo.com/1134015888" %}

## Summary

In this tutorial, James from Movedata demonstrates how to add conditional business rules using Salesforce Flows to set different criteria based on the source platform being integrated. The video compares donations from two different platforms (Grassrootz and Raisely) and shows how to configure the Lead Source field on opportunity records to reflect the originating platform. The process involves identifying the "platform" variable in the notification execution variables, then creating a decision element in an existing Salesforce Flow with branches for each platform (Raisely and Grassrootz). Each branch sets the Lead Source field to the corresponding platform name. The tutorial emphasizes the importance of copying and pasting values to avoid typos and casing errors, and concludes by reprocessing notifications to verify that records are correctly stamped with their respective platform values.

## Transcription

**\[00:00:05]** Hi there, it's James from Movedata and in this video I'm going to show you how to add conditional business rules using Salesforce Flows to set different criteria according to

**\[00:00:13]** the platform which you're integrating.

**\[00:00:16]** So in this example, we have a donation from Grassrootz, which has produced a few different records.

**\[00:00:21]** And in this example, we have a donation from Raisley, which has also produced its own records.

**\[00:00:27]** And if we open our opportunity record, which is created, we can see that there's a field here called lead source, which we'll be using in this video

**\[00:00:38]** And basically what we want to do is set Raisley if the platform that's sending this information through is Raisley or Grassrootz if the platform is Grassrootz.

**\[00:00:48]** So what we can do is open flows.

**\[00:00:51]** And there's already a flow which is responsible for doing some stuff when processing the opportunity into Salesforce.

**\[00:01:00]** And we can add some business rules into this flow to support setting a different value for lead source conditional on the platform.

**\[00:01:08]** So if we open up one of our notifications and click into execution and we find the appropriate phase, in this case it's going to be the donation phase, which is responsible

**\[00:01:21]** for creating the opportunity record and click on view variables.

**\[00:01:25]** We can search to see if there's anything that's going to tell us is this Raisely or is this Grassrootz.

**\[00:01:32]** So if I search for Raisely, I can see there's a field called platform, which has a value of Raisely.

**\[00:01:38]** If I do the same on Grassrootz, open up the variables and search for grass, we can see that the same variable platform, Grassrootz, platform, raised.

**\[00:01:53]** So we can use this variable platform, which I'm going to copy to filter out, is this Raisely or is this Grassrootz.

**\[00:02:01]** So back to our flow, what I can do is add a decision.

**\[00:02:05]** You can call this whatever you like.

**\[00:02:06]** I'm just going to say, assess platform.

**\[00:02:13]** Raisely if...

**\[00:02:18]** Platform, which is a variable that gets added to our flow, and it is text, and it's available for input into our flow, equals, and then I'm gonna copy across the value that's

**\[00:02:31]** present, Raisely.

**\[00:02:34]** So platform equals Raisely, or for Grassrootz, I've already added my platform, variable of platform equals, and it is important to copy and paste it.

**\[00:02:48]** so you don't get typos, casing errors, or if platform equals Grassrootz.

**\[00:02:54]** So you can see now we've got two branches, if the platform's Raisely or if the platform's Grassrootz.

**\[00:03:00]** And in the case of Raisely, I want to set lead source Raisely.

**\[00:03:08]** So record, which we've already added in this flow and is in the flow 101 videos, dot.

**\[00:03:15]** lead source.

**\[00:03:16]** In that scenario, I want to set this value to Raisley.

**\[00:03:22]** In the Grassrootz scenario, I want to set lead source.

**\[00:03:30]** Grassrootz.

**\[00:03:31]** Record.leadSource equals Grassrootz.

**\[00:03:38]** So really simple decision based on the variable platform to create a couple of different branches and then you could have, you know, as much as little business logic underneath

**\[00:03:50]** each branch as you like.

**\[00:03:52]** So I can now save this as a new version.

**\[00:03:56]** I can activate my flow.

**\[00:04:00]** and I can come back to my notifications and I can reprocess each.

**\[00:04:16]** and then I can open up the records which are produced from those reprocessed notifications.

**\[00:04:22]** So in this case, it's the Grassrootz one.

**\[00:04:27]** I can scroll down, I can see lead source equals Grassrootz.

**\[00:04:30]** In this case, it's the Raisely one.

**\[00:04:35]** can scroll down I can see lead source equals Raisely.

**\[00:04:39]** So that's how you use the variable platform to run conditional business rules based on the platform you are integrating.

**\[00:04:44]** Thanks and bye.
