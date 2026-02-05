---
description: >-
  Prevent specific MoveData phases from executing using custom metadata
  configuration.
---

# Disable a MoveData Phase from Running

{% hint style="info" %}
Metadata

* group=Technical
* category=Technical
* subtitle=How to disable a MoveData phase from running
* integration=all
* tags=metadata,pipeline,disable,phase,video
{% endhint %}

{% embed url="https://vimeo.com/1136736520" %}

## Summary

In this tutorial, James from MoveData demonstrates how to disable a phase in MoveData from running. The example shows a notification that has produced both a recurring donation record and an opportunity record. To prevent the recurring donation record from being created, the process involves navigating to Setup, opening Custom Metadata Types, and accessing the MoveData pipeline. Within the pipeline, users copy the label of an existing recurring entry and create a new entry with "\_disable" as the suffix. The new entry requires setting a handler value of "true" and a type of "config" before saving. After reprocessing the notification, the recurring donation record is no longer produced and the recurring phase no longer appears in the execution. This same approach can be applied to other phases by replacing "recurring" with the appropriate phase name such as contact, campaign, or other phase types.

## Transcription

**\[00:00:05]** Hi there, it's James from MoveData. In this video, I'm going to show you how to disable a phase in MoveData from running.

**\[00:00:11]** So in this example, we have a notification which has produced a recurring donation record as well as an opportunity record.

**\[00:00:18]** let's assume that you don't want the recurring donation record from running.

**\[00:00:23]** If we click into the execution and scroll through the phases, we can see that there is a recurring phase which is responsible for finding and creating or updating the recurring donation record.

**\[00:00:38]** So what we can do is disable this phase from running.

**\[00:00:43]** And to do that we want head on over to setup.

**\[00:00:47]** and open custom metadata types and then head into the MoveData pipeline.

**\[00:00:54]** We can scroll down and see that there are a number of recurring entries.

**\[00:00:58]** What we are going to do is copy the label of any one of those and create a new entry.

**\[00:01:04]** And what we're going to do is paste the value we just copied into label and change the suffix so that it says disable.

**\[00:01:12]** We will then add a handler of true and a type of config and hit save.

**\[00:01:19]** We can then head on back to our notification and click reprocess.

**\[00:01:23]** And you'll notice that the recurring donation record is no longer produced. It is also not showing up as a phase in the execution.

**\[00:01:31]** if you wanted to apply this to other phases. You would simply add different entries replacing recurring with the other appropriate phase such as contact, campaign, etc.

**\[00:01:42]** So that's how you can stop a particular phase in move data from running. Thank you.
