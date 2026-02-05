# How MoveData Onboards New Clients

{% hint style="info" %}
Metadata

* group=Business
* category=Business
* subtitle=An in-depth guide to MoveData's onboarding process
* integration=all
* tags=movedata, onboarding, new, clients
{% endhint %}

{% embed url="https://vimeo.com/1143705214" %}

## Summary

In this tutorial, James from MoveData explains the comprehensive two-step onboarding process for setting up Salesforce integrations. Step one involves connecting integrations into a sandbox environment, where MoveData identifies custom fields, objects, business rules, and third-party apps that need support, then compiles a Google Sheets template documenting all customizations with recommendations based on best practices from hundreds of integrations. Step two involves implementing the approved business rules using highly maintainable Salesforce flows, followed by internal testing, client acceptance testing, and deployment to production via change sets. The typical timeline is two to four weeks (one to two weeks per stage), though actual implementation effort may only take one to two days, with the extended timeline accommodating the back and forth of obtaining access, meetings, and email exchanges. Client input is primarily limited to approving the review phase and passing testing, making it a smooth, thorough process that MoveData manages end-to-end.

## Transcription

**\[00:00:05]** Hi there, my name is James and in this video I'm going to talk to you about MoveData's onboarding process. So you're definitely welcome to set the MoveData integrations up yourself or with your Salesforce administrator or partner.

**\[00:00:16]** In practice, we do a lot of the setups ourselves just because we have such familiarity with the MoveData application and also with Salesforce.

**\[00:00:23]** This usually works as a two-step process where in step one, we are connecting the integrations into a sandbox environment and reviewing them with you. And step two, where we are implementing any customizations into your integration.

**\[00:00:36]** The reason for this is that you might capture specific information inside the source platforms that you're connecting, or you might have custom fields or custom objects or particular business rules or third-party apps, things like that installed in Salesforce.

**\[00:00:48]** And you need the integration to behave in a particular manner with regards to those customizations.

**\[00:00:53]** So as the first step, we'll get system administrator access to a sandbox environment and connect those integrations you're looking to use.

**\[00:00:59]** When activities occur inside those platforms, they will dispatch information which MoveData is going to receive and translate into a series of records inside Salesforce.

**\[00:01:09]** So in this example, we've got a donor, which has been created as a contact record, who has made a $100 donation, created as an opportunity record, to a fundraising page, created as a campaign record, which is owned by this other contact.

**\[00:01:22]** And those campaigns are built into a hierarchical structure where you've got the parent campaign and the team and the fundraiser. And there's another contact here who is the contact behind this team fundraising page.

**\[00:01:33]** And if we open the opportunity record up, scroll down and we can see that there are some custom fields. For example, there's a custom field here for the identifier from the payment gateway.

**\[00:01:43]** There's also a field lead source here with particular values. There's a field for net amount. UTM information and so on and so forth.

**\[00:01:50]** So in this first step where we're connecting your platforms, we'll notice that these fields exist and that they're empty, and that you need your integration to support them.

**\[00:01:56]** What we do is compile a template in Google Sheets which lists out those custom fields or objects and contains a comment on what we think we need to do.

**\[00:02:04]** For example, on the contact object, there is a field called monetary donor, which is a custom field. And if this contact has made a donation, we need to set this field to true.

**\[00:02:13]** Similarly, there's a field for monthly donor. And if the person has made a recurring donation, we need to set this field to true.

**\[00:02:18]** This particular client is integrating Raisely. There's a field called Donor Source. If the contact has no value for Donor Source, we need to set this to Raisely. But this could also be JustGiving or Enthuse or Grassroots or Fundraising or whichever platforms you're using.

**\[00:02:31]** And we can also see there's a field here called last transaction date, and the client wants us to record the date of the last donation on this field.

**\[00:02:36]** The same kind of business rules operate against campaign records, opportunity records, and any other records which are applicable in your Salesforce instance.

**\[00:02:45]** We'll also include what we consider to be best practice from doing hundreds of these integrations for other customers. For example, with Raisely, they issue a nice PDF receipt, which people tend to like recorded on a receipt URL custom field, which we can add for you.

**\[00:02:58]** For our UK friends who are integrating JustGiving, you might have or we'll suggest fields for gift aid amount, gift aid fee, the gift aid reference, the gift aid payment date, and these kinds of things.

**\[00:03:07]** So once we've produced this document, we'll share it with you and either organize a meeting to go through it together or produce a screen share to share with you over email.

**\[00:03:14]** You can then annotate with your feedback and we can align on exactly what your integration needs to do.

**\[00:03:18]** Now depending on the nature of what does or does not need to be done, there may be a small setup fee associated with the development work to write those business rules into your integration.

**\[00:03:27]** Everything up until now is done free of charge, and is for review and approval.

**\[00:03:32]** Once approved, it's back to MoveData to implement your business rules, which is typically done using Salesforce flows. Flows are a highly maintainable way to implement logic inside Salesforce and is easy for Salesforce administrators or partners who you work with to pick up if needed in the future.

**\[00:03:46]** So based on your business rules, we'll be implementing a series of flows which will look something like this. This particular flow applies to the opportunity record in NPSP or the gift transaction record in NPC.

**\[00:03:55]** And there's some logic here to check if it's a recurring donation, if it is to cancel processing, to grab a particular record type and set it on the donation opportunity or gift transaction, to check for specific platforms and implement logic accordingly.

**\[00:04:10]** Check for marketing information and set UTM values inside Salesforce, and a variety of other things.

**\[00:04:16]** Once everything has been implemented, we will undertake internal testing and provide examples for every single feature that you've requested working correctly in your sandbox environment.

**\[00:04:24]** You can then undertake as much or as little acceptance testing as you want, and we're good for deployment.

**\[00:04:29]** At that stage, we'll get access to your production environment and deploy MoveData and the associated changes we've made using change sets.

**\[00:04:35]** So it's a really smooth process, which MoveData definitely manages for you.

**\[00:04:39]** Your input is typically limited to okaying the review phase of the project and also passing testing once functionality has been implemented.

**\[00:04:46]** And from a timing perspective, we usually allow between one to two weeks for each of those two stages of the project to run. This produces a typical project timeline of between two and four weeks, even if the actual amount of effort to set your integration up is between one and two days.

**\[00:05:00]** This is due to the back and forth of obtaining access and trading emails, doing meetings, this kind of thing during the setup process.

**\[00:05:06]** So I hope that explains the setup process. It's very thorough, very accurate and provides for an excellent integration which does everything you need it to.

**\[00:05:13]** And if you're after firsthand feedback about our onboarding program, head on over to Salesforce App Exchange and check out our reviews.

**\[00:05:19]** Thanks and bye.
