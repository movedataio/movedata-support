---
description: >-
  Prevent MoveData from creating Salesforce records based on custom business
  logic conditions.
---

# How to Not Process Certain Information into Salesforce

{% hint style="info" %}
Metadata

* group=Customising MoveData Integration
* category=Customising MoveData Integrations
* subtitle=Demonstrates how to cancel processing specific notifications using evaluations within a flow.
* integration=all
* tags=cancel,flows,video
{% endhint %}

{% embed url="https://vimeo.com/1136736775" %}

## Summary

In this tutorial, James from MoveData demonstrates how to instruct MoveData to not process certain information into Salesforce. The example focuses on implementing business logic to prevent any records from being created in Salesforce when a donation is a recurring donation. The process involves opening an existing donation mapping flow and adding a decision element to check if the donation is recurring by examining the execution logs for a recurring donation key. A new resource variable called "recurring key" is created as a text input with a null check. If the recurring donation key exists, the flow creates a special Boolean variable called "cancel" (available for output) and sets it to true. The flow ends with the cancel variable, ensuring it's the last action executed under those conditions. After saving and activating the flow, reprocessing the notification results in no records being produced, and the execution log displays "cancel signal received from flow," confirming that MoveData successfully skipped processing based on the implemented logic.

## Transcription

**\[00:00:05]** Hi there, my name's James and in this video I'm going to show you how to instruct remove data to not process certain information into Salesforce.

**\[00:00:13]** So in this example, we have a notification which has produced a recurring donation. And the business logic that we're going to implement is to not create any records in Salesforce if the donation is a recurring donation.

**\[00:00:26]** So we can head on over to flows. We already have a donation mapping flow, which we can open up.

**\[00:00:32]** And the first thing I'm going to do is add a check to see if the donation is a recurring donation. So is recurring donation.

**\[00:00:51]** that will be on the basis of if we look through our execution logs and our parameters, let's type in recurring and we can see that there is a key for the recurring donation.

**\[00:01:05]** So I'm going to go new resource recurring key text input is null false. It's only going to be a recurring donation.

**\[00:01:18]** there is an ID or a key for the recurring donation.

**\[00:01:23]** So if yes, if this is a recurring donation, I want to not process anything into Salesforce So I can go cancel processing and I create a new variable called cancel, which is a special variable.

**\[00:01:39]** It is Boolean available for output. Cancel equals true.

**\[00:01:48]** and I can end my flow here so that cancel is the last thing that runs under those conditions. I'll save and I will activate my flow.

**\[00:02:01]** and I can then head back to my notification and click reprocess.

**\[00:02:09]** And you can see that unlike before, no records are produced. And if we open the execution and scroll down, you can see that there is an entry which says cancel signal received from flow.

**\[00:02:22]** So thanks for watching. That's how to instruct MoveData to not process certain information into Salesforce.
