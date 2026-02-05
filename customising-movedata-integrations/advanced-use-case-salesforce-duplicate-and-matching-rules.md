# Advanced Use Case: Salesforce Duplicate and Matching Rules

{% hint style="info" %}
Metadata

* group=Customising MoveData Integration
* category=Customising MoveData Integrations
* subtitle=A practical example about how to update Salesforce Duplicate and Matching Rules for MoveData
* integration=all
* tags=salesforce,duplicate, matching, rule
{% endhint %}

{% embed url="https://vimeo.com/1143665144" %}

## Summary

In this tutorial, James from MoveData demonstrates how to implement advanced use cases with Salesforce duplicate and matching rules. The video begins by explaining how standard duplicate rules match on fields like first name, last name, email, and home email based on the data MoveData creates or updates in Salesforce. The tutorial then addresses a common scenario where users want to facilitate matching against additional fields, such as work email and alternate email, without actually setting those fields on the record. To accomplish this, James demonstrates modifying the duplicate and matching rules to include these additional email fields, then opening the extension flow in the contact phase to add specialized logic. A key technique involves creating a "duplicate check" decision in the flow that sets email values to multiple Salesforce email fields (work email, alternate email) exclusively for matching purposes, without committing these values to the record. The tutorial also covers configuring MoveData settings to ignore email so that managed flows don't set email values, allowing custom extension flows to handle email logic. Additional logic is implemented to check if any existing email fields already contain the provided email value, and only sets the personal email field if none of the other fields contain it. The tutorial concludes with a practical test demonstrating how the system successfully matches on the work email field without updating it, confirming the advanced matching logic works as intended.

## Transcription

**\[00:00:05]** Hi there, it's James from MoveData. In this video, we're going to talk about implementing some advanced use cases with your Salesforce duplicate and matching rules.

**\[00:00:12]** So in Salesforce, you have duplicate and matching rules. This particular rule is configured so that it's going to match on the basis of first name exact, last name exact, and email exact, or home email exact.

**\[00:00:29]** And this matching is facilitated on the basis of the record that MoveData is creating or updating inside Salesforce. So we can see here in the execution logs that we're pushing up a contact with the first name of Sarah, the last name of Testa, and this particular email address for the home email field.

**\[00:00:47]** So this is the data that's going to be used to facilitate any matching with this particular duplicate and matching rule.

**\[00:00:53]** Now sometimes you want to facilitate matching against additional fields. So if we deactivate our duplicate rule and deactivate our matching rule.

**\[00:01:04]** Let's add work email and alternate email into the mix. So one and two and three, four or five or six. Let's hit save and activate.

**\[00:01:26]** Let's activate our duplicate rule.

**\[00:01:30]** So we have additional criteria now in this duplicate rule. However, these new fields aren't being set by the integration. So as it stands, it's not possible to match on them.

**\[00:01:40]** What we need to do is open up our extension flow in the contact phase and add a new decision where the resource type is variable, the API name is duplicate check, the data type is Boolean, and it is available for input.

**\[00:02:00]** And we can go duplicate check equals true.

**\[00:02:05]** So underneath this particular branch, we can assign any additional fields that we want to use for the purpose of the matching criteria, but we don't want to set on the record itself. So we can check email to make sure that an email exists.

**\[00:02:25]** Where email, which we've already added, that's text available for input, is null false.

**\[00:02:34]** And assuming an email exists, we can set email fields for duplicate check. Work email, alternate email equals email.

**\[00:03:11]** And on this basis, the integration is going to use the email address provided to check but not set against those fields.

**\[00:03:15]** Now if you go into this level of detail, you probably want to open up your MoveData settings and toggle ignore email to true so that the managed MoveData flows aren't setting an email.

**\[00:03:25]** You can then come back to your extension flow and write your own email logic. So we can go assess email, exists email where email is null false.

**\[00:03:47]** We can then add another decision to check email fields. So where record.email, personal email, record.work email, alternate email, and this can be OR criteria equals. And we can call this already exists.

**\[00:04:31]** So if any of these email fields contain the email value, we don't want to do anything. Otherwise, we can write our email logic here.

**\[00:04:43]** So we can go set personal email where record.personal email equals email. And maybe we also want to set preferred email in this scenario where record.preferredEmail equals personal.

**\[00:05:09]** So to summarize what we've done so far, we've got a decision to start duplicate check where duplicate check equals true. We've then got a check to see if the variable for email is provided by the platform.

**\[00:05:25]** And if so, we are setting these various Salesforce email fields to the email value. Now that is nested under the duplicate check decision, which means these are going to be used for the purpose of record matching, but they're not actually going to be set by the integration.

**\[00:05:43]** And then once we come past here, again, we're checking to see if an email exists and we are comparing the various Salesforce fields to see if they contain that email value. If they do, the integration does nothing.

**\[00:05:55]** If not, then this is where your logic exists. So I want to set the email value on the field personal email, and I want to set the preferred email at the same time too.

**\[00:06:06]** So if we save this as a new version and click activate, we can now perform a test.

**\[00:06:12]** So I've got the contact up from the notification we were just looking at and I am going to delete the contact. I'm now going to create a new contact with exactly the same information.

**\[00:06:26]** So we had a first name of Sarah, last name of Testa, and this particular email address, which I'm going to save against the work email field.

**\[00:06:48]** And then we can reprocess our notification and open the contact record up.

**\[00:07:00]** And we can see that it's exactly the same ID. So it's found that contact and it has not updated the work email. It's matched on that work email and it has not set a value for personal email.

**\[00:07:12]** So again, if we go back to the flow, it is matching on all of those different email addresses with the source platform provided email. And it is setting the personal email field, but only if none of those other email fields contain that email.

**\[00:07:30]** Thanks for watching and goodbye.
