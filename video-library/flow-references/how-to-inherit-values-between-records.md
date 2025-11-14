---
description: >-
  Inherit field values from parent records to child records in Salesforce using
  Flow logic.
---

# How to Inherit Values between Records

{% embed url="https://vimeo.com/1136737028" %}

## Summary

In this tutorial, James from MoveData demonstrates how to inherit values between Salesforce records. The example focuses on a fundraising page scenario where a parent campaign has a "Type" field set to "Event," while the child fundraiser campaign has an empty Type field. The goal is to inherit the Type value from the parent campaign to the child campaign. The process begins by examining the notification execution to locate the campaign phase, which shows two entries: the initial campaign and the fundraiser campaign. By searching for "parent campaign" in the variables, users can see the parent campaign record with Type equals Event. An important note: if a field isn't appearing in the variable list, it must be added to the MoveData field set through Setup > Object Manager > Campaign > Field Sets. The tutorial then demonstrates creating a new decision in the flow to assess if the parent campaign exists, adding a new campaign resource variable available for input, and setting up logic where if parentCampaign.type is not null, the record.type should equal parentCampaign.type. After saving, activating, and reprocessing, both records are refreshed to confirm the child campaign successfully inherited the Event type from the parent. The tutorial also covers variations, such as only inheriting values when none exist, and demonstrates how the same concept applies to inheriting values from campaign records to opportunity records in donation mapping flows.

## Transcription

**\[00:00:05]** Hi there, it's James from MoveData. In this video I'm going to show you how to inherit values between Salesforce records.

**\[00:00:12]** So in this example, we have a fundraising page which has been created. And you can see that there is a parent campaign and a fundraiser campaign which sits under that parent.

**\[00:00:22]** And if we go to the parent campaign, you can see there is a value of event on this type field. And if we open the fundraiser campaign, you can see that the value for type is empty.

**\[00:00:34]** So in this example, we are going to inherit the type value from the parent campaign onto the child campaign.

**\[00:00:40]** So if we open up the notification and click into execution, we can scroll to the campaign phase. And you'll notice that there are two entries.

**\[00:00:51]** There's this initial entry where type equals campaign. And there is a subsequent entry where type equals fundraiser.

**\[00:01:07]** And this is because the integration is processing two campaigns into Salesforce. So for the purpose of this video we're wanting to look at the campaign which the values are going to be inherited onto.

**\[00:01:19]** And if we search for parent campaign, can expand and see that there is an entry for that parent campaign record where type equals event. Now, if you're trying to inherit a field and it is not appearing in this list,

**\[00:01:35]** then you need to make sure the field you are wanting to inherit is included in your field set. To do that, you want to head on over to setup and then click into object manager, find your object, in this case, campaign and open up field sets.

**\[00:01:55]** Then the MoveData field set and you would want to drag the particular field you're trying to inherit into the field set and click save.

**\[00:02:05]** In this case, type is one of the default Salesforce fields, so it is included in the MoveData field set by default.

**\[00:02:11]** So we can head back to our notification and copy this value parent campaign, jump into our flow and add a new decision, assess parent campaign.

**\[00:02:27]** exists parent campaign if and we can add a new resource. Parent campaign. It's a variable. It is record.

**\[00:02:40]** The object is campaign and it is available for input into this flow.

**\[00:02:47]** So if parentCampaign.type is null false, so if a value exists, then we want to inherit value where record.type equals parentCampaign.type.

**\[00:03:15]** We can save and activate this flow.

**\[00:03:23]** and head on back to our notification.

**\[00:03:28]** and click reprocess.

**\[00:03:31]** And now that this is finished reprocessing, can refresh both records. We can see that the parent campaign is obviously of type equals event and the child campaign has inherited that event value down.

**\[00:03:45]** Now there are lots of variations you could do on this. You might only want to inherit the value if a value doesn't already exist. In that case, you could add a decision, check type value.

**\[00:04:01]** Value already exists. If record.type is null false.

**\[00:04:14]** and you might only want to inherit if a value doesn't already exist.

**\[00:04:19]** Equally, maybe you're trying to inherit from the campaign record onto the opportunity record rather than between campaigns. In that case, I've got a notification here, which is for a donation.

**\[00:04:29]** If I click into execution and go to the donation phase, view variables, we have...

**\[00:04:38]** Donation campaign, which is the campaign that the donation was made towards. If I expand that, we can see that type equals event.

**\[00:04:46]** So if you're in your donation mapping flow, you could add donation campaign as a variable where donation campaign.type is event, and you could pull that onto the opportunity record.

**\[00:04:57]** So thanks for watching. Hopefully that makes it easy to inherit values between Salesforce records.
