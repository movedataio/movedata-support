---
description: >-
  Route donations to different Salesforce campaigns using custom metadata and
  Flow logic.
---

# Use Business Rules to Select a Different Campaign

{% embed url="https://vimeo.com/1135621990" %}

## Summary

In this tutorial, James from MoveData demonstrates how to use business rules to route donations to different campaigns in Salesforce based on donation type. The video shows how to differentiate between recurring and one-off donations by checking for the presence of a recurring\_key variable. The solution involves creating a custom metadata table to store campaign mappings, building a Salesforce Flow with decision logic that queries this metadata table when a recurring key is detected, and registering the flow in the MoveData pipeline to run before the default integration. The tutorial also covers how to extend this approach with additional criteria for more complex campaign routing scenarios.

## Transcription

**\[00:00:05]** Hi there, it's James from MoveData and in this video I'm going to take you through using a different campaign to the one that integration ordinarily uses.

**\[00:00:12]** So in this example, we have a regular donation, which you can see is produced a suite of records, as well as a once-off donation, which has also produced a suite of records.

**\[00:00:22]** And you can see that common amongst both is that they both reference MoveData campaign, which is the campaign in the source system that they were taken through.

**\[00:00:31]** And in this particular worked example, we're going to say, well, if it's a recurring donation, we want to move it into a different campaign altogether.

**\[00:00:39]** So the first thing that we need to do is work out how to differentiate between the two.

**\[00:00:44]** Now we're talking about changing campaigns so open execution and scroll down to campaign.

**\[00:00:51]** We can view the available variables and I'm going to type in key to see if there's an ID to use.

**\[00:00:58]** And we can see that recurring key has a value

**\[00:01:02]** If I do the same for the once off donation and scroll to the campaign parameters and search for a recurring underscore key, there's nothing available.

**\[00:01:11]** So we can use this recurring key variable as a means to differentiate between the two.

**\[00:01:17]** Now we want to head on over to flows and create a new flow.

**\[00:01:23]** It's going to be auto launch with no trigger.

**\[00:01:27]** And we can perform a decision.

**\[00:01:29]** We can say

**\[00:01:30]** Assess recurring key.

**\[00:01:34]** exists and we can add our resource so recurring key which is text available for input into this flow is null false so if a recurring key is available it will go down this branch

**\[00:01:55]** Now in this case we want to find a particular campaign if a recurring key is present.

**\[00:02:01]** So we can go ahead and create that campaign.

**\[00:02:04]** So I'll click new.

**\[00:02:15]** recurring campaign.

**\[00:02:10]** I'll mark it as active and in progress and hit save.

**\[00:02:16]** So this is the campaign that we want to find if recurring key is present.

**\[00:02:23]** So the next thing I want to do

**\[00:02:25]** Is I want to use a metadata table.

**\[00:02:27]** click into custom metadata types.

**\[00:02:30]** I'll click new custom metadata type.

**\[00:02:32]** I'm to call this campaign mapping table Salesforce requires a plural.

**\[00:02:41]** So we can do that and hit save.

**\[00:02:45]** And there are a few custom fields that I want to add to this table.

**\[00:02:49]** So one of them is going to be a checkbox field.

**\[00:02:54]** and let's call it is Recurring.

**\[00:03:04]** And the other one is going to be a text field.

**\[00:03:08]** And let's call that campaign ID.

**\[00:03:21]** Now let's go manage campaign mapping table.

**\[00:03:25]** Let's create a new view just to get our fields on there.

**\[00:03:27]** You can call it MoveData and we can add is recurring and campaign ID.

**\[00:03:34]** We can remove some of the fields that we don't really care about and hit save.

**\[00:03:42]** Now we can add a new entry called recurring.

**\[00:03:49]** is recurring equals true and campaign ID being this one.

**\[00:03:58]** Now we can head back to our flow and we'll need to save it.

**\[00:04:03]** So I'm going use a particular naming convention.

**\[00:04:08]** You can use whatever you like.

**\[00:04:12]** Hit save.

**\[00:04:15]** And now I'm going to refresh our flow because we need to reference the metadata table that we just created.

**\[00:04:21]** So if recurring key is present.

**\[00:04:24]** I want to get that record that we just added.

**\[00:04:27]** So get recurring entry.

**\[00:04:32]** The object is going to campaign mapping table, which we just created.

**\[00:04:37]** And we want to get the entry where isRecurring equals true.

**\[00:04:47]** So we can then check.

**\[00:04:53]** see if this get found a result.

**\[00:04:57]** So found result.

**\[00:05:01]** If

**\[00:05:04]** entry for campaign ID from that row in the mapping table.

**\[00:05:11]** uh

**\[00:05:14]** exists that means we've got a result and assuming so we can set campaign to use so this requires a special resource called result which is text and available for output a result

**\[00:05:38]** equals campaign id

**\[00:05:43]** from the mapping table.

**\[00:05:46]** And there is another special resource that we need to add called break, which is Boolean available for output equals true.

**\[00:06:02]** These special resources are covered in another video, which will be linked.

**\[00:06:08]** So just to replay this flow, saying, is there a value for recurring key?

**\[00:06:15]** It's not false.

**\[00:06:17]** If so, call the mapping table where is recurring equals true.

**\[00:06:25]** Check to see if a result was found.

**\[00:06:31]** If not, just do default.

**\[00:06:33]** And if so, set result to campaign ID and break equals true.

**\[00:06:40]** So hit save.

**\[00:06:42]** And I'll hit activate.

**\[00:06:43]** So then the last thing to do is to click this gear icon and copy the flow API name because we need to register it in the MoveData pipeline.

**\[00:06:52]** So if we search for metadata types and then MoveData pipeline, we can scroll down and find the relevant entry.

**\[00:07:04]** So if I open up this one campaign duplicate, and in fact, if I copied the flow API name,

**\[00:07:11]** And I search for it

**\[00:07:14]** In the logging we can see that this flow runs

**\[00:07:17]** to find that particular record in Salesforce.

**\[00:07:20]** So if I grab that flow API name again, I can clone this and I can add the new flow in as the handler.

**\[00:07:30]** I can change the setting from 001 to EXT Some of this stuff is covered in the flow 101 videos.

**\[00:07:38]** I'm gonna change the order to 4 because I want this flow to run before the normal out of the box MoveData one does.

**\[00:07:45]** So I'll hit save.

**\[00:07:47]** which now registers the flow we just created.

**\[00:07:49]** And if I come back to my notifications, we've got our once off here, which is against MoveData campaign.

**\[00:07:57]** Now, if we reprocess this, this should not change because it doesn't have a value for a recurring key.

**\[00:08:02]** And you can see that that stays the same.

**\[00:08:04]** Now if we find our recurring donation and we hit reprocess.

**\[00:08:10]** We can scroll down and we can see it's found the recurring campaign.

**\[00:08:13]** So if you open up these two records, we can see that the recurring donation is against recurring campaign and the opportunity is also against recurring campaign.

**\[00:08:27]** Now if you wanted to add additional logic into your checks, you could definitely do that.

**\[00:08:31]** It's quite simple right now in that it's just checking, well, is it recurring?

**\[00:08:35]** If so assign to this particular campaign, you could do other things like, for example, maybe.

**\[00:08:44]** each campaign in your source platform needed to have a one-off donations and a recurring donations campaign.

**\[00:08:51]** So in that case, you know, key, this is the key of the campaign that's being processed in.

**\[00:08:57]** You might want to add key as a value in your metadata table where is recurring and key equals, you know,

**\[00:09:07]** this particular value.

**\[00:09:08]** So that could be a new custom field in your mapping table.

**\[00:09:11]** And then you would go into your flow and you would say, you know, is there a recurring key?

**\[00:09:17]** Is there also a key for the campaign?

**\[00:09:20]** If so, I'm going to get recurring entry by is recurring equals true and, you know, key.

**\[00:09:26]** is null false, key is present.

**\[00:09:29]** And then this would do a request for the row in your mapping table where is recurring equals true and key equals whatever it is.

**\[00:09:37]** And then that would have its own equivalent campaign ID.

**\[00:09:40]** So this is certainly a very simple flow, which is, you know, checking for recurring and if so grabbing that particular entry from the mapping table.

**\[00:09:50]** You could definitely extend the criteria for what you want to achieve.

**\[00:09:54]** Okay, thanks for watching that video.

**\[00:09:56]** Hopefully it sets you up to find the right campaign in scenarios which differ from the default integration.
