---
description: Set up webhook integration between Raisely and Salesforce via MoveData.
---

# Connect Raisely Campaigns into Salesforce

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* integration=raisely
* tags=campaign,video
{% endhint %}

{% embed url="https://vimeo.com/1134018154" %}

## Summary

In this tutorial, James demonstrates how to connect a Raisely campaign to Salesforce through the MoveData integration platform. The process begins by accessing the MoveData integrations tab to locate and copy the MoveData integration URL from an existing Raisely integration. This URL is then used to configure a webhook in Raisely by navigating to the campaign settings and adding a new webhook under API and webhooks. Once the webhook is added, the connection can be verified in MoveData's notifications tab, where a webhook registration event confirms the successful integration between Raisely and Salesforce.

## Transcription

**\[00:00:06]** it's James here showing you how to connect your Raisely campaign into Salesforce.

**\[00:00:28]** the first thing you want to do is head on over to MoveData and open the integrations tab.

**\[00:00:14]** You can then open your Raisely integration, which you've already created.

**\[00:00:20]** Here you'll find your MoveData integration URL, which you can copy and then head on over to Raisely.

**\[00:00:29]** Open your Raisely campaign, click into settings and then API and webhooks and add a new webhook

**\[00:00:38]** where you can paste the value you just copied into the URL field and subscribe to a number of events, which are donation created, succeeded, updated, refunded, profile created,

**\[00:00:52]** deleted, updated, subscription updated, and order succeeded.

**\[00:01:02]** You can then click add webhook.

**\[00:01:07]** And if you head on back to MoveData and open the notifications tab, you can click refresh.

**\[00:01:13]** and you'll see that you will get an event webhook registration.

**\[00:01:17]** This means that your Raisley campaign is now connected into Salesforce.

**\[00:01:21]** Thanks and bye.
