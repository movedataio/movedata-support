---
description: Link Raisely campaigns to Salesforce campaigns using platform keys.
---

# How to map Raisely Campaigns into Salesforce

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* subtitle=Demonstrates how to map Raisely campaigns into Salesforce
* integration=raisely
* tags=campaign,video
{% endhint %}

{% embed url="https://vimeo.com/1134018954" %}

## Summary

In this tutorial, James demonstrates how to link a Raisely campaign to an existing Salesforce campaign. The process involves creating a new campaign in Salesforce, then configuring two key fields on the campaign record: Platform Key and Protect Name. The Platform Key field must be populated with the campaign profile UUID from Raisely, prefixed with "raisely:" to establish the connection between platforms. The Protect Name field should be set to true to prevent the Salesforce campaign name from being overridden by the Raisely campaign name. Once configured, the integration automatically routes donations from the specified Raisely campaign to the correct Salesforce campaign, as demonstrated by a test donation that successfully links to the mapped campaign.

## Transcription

**\[00:00:05]** Hi there, my name's James and in this video I'm going to show you how to link your Raisely campaign to an existing campaign inside Salesforce.

**\[00:00:12]** So what we're going to do is head on over to Salesforce and create a new campaign.

**\[00:00:16]** I'm going to call it test.

**\[00:00:19]** I'm going to set it to active and in progress, and I'm going to hit save.

**\[00:00:27]** Now you'll need to add to your page layout a couple of fields.

**\[00:00:31]** One is protect name and the other is platform key.

**\[00:00:34]** We're going to need to set these values so that the integration knows to connect your Raisley campaign with this Salesforce campaign.

**\[00:00:41]** So if we open up Raisley and find the campaign that we're connecting and go into settings and then into API and webhooks, You'll see that there's a field here called campaign

**\[00:00:52]** profile UUID.

**\[00:00:54]** What we want to do is copy this value.

**\[00:00:57]** and head back to our Salesforce campaign.

**\[00:01:00]** Now under platform key, we click edit and we paste this value.

**\[00:01:07]** Now importantly, we prefix this value with Raisely and a colon, just like that, and hit save.

**\[00:01:16]** The other thing you'll want to do is add the field protect name to your page layout and set it to true.

**\[00:01:30]** This protects the name of your campaign as it's named in Salesforce so that it doesn't get overridden with the name of your campaign coming from Raisely.

**\[00:01:30]** So with these two fields set, the integration will know to find this campaign in Salesforce when information from this campaign in Raisely is issued.

**\[00:01:38]** So what we can do is perform a test.

**\[00:01:41]** where we make a quick donation.

**\[00:01:47]** to the campaign in Raisely.

**\[00:02:11]** And then we can head on over to MoveData refresh the notifications, and we can see that our test test is coming through.

**\[00:02:19]** So let's open it up.

**\[00:02:21]** And we can see that it successfully found this test campaign, which we created and mapped just a minute before inside Salesforce.

**\[00:02:29]** If we open up the opportunity.

**\[00:02:38]** we can clearly see that it's made out to this test campaign.

**\[00:02:42]** So that's how you can map your Raisely campaigns to existing campaigns inside Salesforce.

**\[00:02:45]** Thanks and bye.
