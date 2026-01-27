# How to use Salesforce Formulas in MoveData Flows

{% hint style="info" %}
Metadata

* category=Technical
* subtitle=Demonstrates how to use Salesforce formulas in MoveData flows
* integration=all
* tags=salesforce,formula,flows
{% endhint %}

{% embed url="https://vimeo.com/1159000271?fe=ci&fl=sv&share=copy" %}

## Summary

In this tutorial, Lenny from MoveData demonstrates how to implement Salesforce formulas within MoveData flows through two practical examples. The first example shows how to calculate a net amount by subtracting fees from the total donation amount using custom logic in the donation mapping extension flow. The second example demonstrates how to truncate text values to prevent exceeding Salesforce's maximum character limits, specifically for donor first name and donor last name fields. The tutorial covers the essential steps of accessing MoveData variables, creating decision components to check for required values, and building formula resources with proper syntax validation. The process concludes with reprocessing notifications to verify that the formulas correctly populate the fields in Salesforce.

## Transcription

**\[00:00:05]** Hi, I'm Lenny from MoveData. In this video, I'm going to show you how you can use Salesforce formulas in your MoveData flows. This should provide a framework for using Salesforce formulas in your MoveData flows.

**\[00:00:24]** The two examples we'll be working through today are how to calculate net amount and how to truncate text values so they don't exceed the Salesforce maximum character limit.

**\[00:00:36]** Firstly, to calculate net amount, we'll need to add custom logic to the donation mapping extension flow for MoveData. Before we write the Salesforce formula, I'll need to ensure that the MoveData variables are accessible within this flow.

**\[00:00:53]** You can find the MoveData variables by navigating to your notification under the execution log. Here we're working with the donation stage and I know we need amount. I'm going to add this variable to the MoveData flow by clicking new resource, selecting variable as the resource type, copying and pasting the API name and the data type expected. Please ensure you tick available for input before clicking done.

**\[00:01:20]** I also know that I need the fee variable, so we're going to create a new variable for fee. Tick available for input, select done. Now that we have the variables, we can write the Salesforce formula.

**\[00:01:34]** Firstly, I'm going to add a decision component to assess that we've received the fee value. Select the resource which is the variable we've added. IsNull, false.

**\[00:01:51]** Now we can write the Salesforce formula logic to set the net amount field. I'm going to select an assignment component and set net amount as the label. Find the field record.net amount and for the value we're going to create a new resource. Under the type we'll select formula. The data type should be currency, and here we can use the variables that we added previously: amount minus fee. Before saving this formula, please always check syntax.

**\[00:02:35]** In the next example, I will show you how to use Salesforce formulas to truncate text values so they don't exceed the Salesforce character limit.

**\[00:02:45]** We'll be setting donor first name and donor last name fields. Add these as new resource variables with data type as text and available for input. Before we write the Salesforce formula, we'll need to first check that these values are provided by the source platform. We'll create a decision component to assess donor name exists, checking that donor first name and donor last name are not null.

**\[00:03:30]** Now we can add our Salesforce formula. We'll create an assignment component, set donor first name. For the value we're going to create a Salesforce formula with data type as text.

**\[00:03:48]** For the Salesforce formula, we'll be using the IF function to compare if a value is true or not. For the logical test, we'll use the LEN function to determine the length of the donor first name and check if it's greater than 40 characters.

**\[00:04:09]** If the value of the donor's first name is longer than 40 characters, we'll need to truncate the value using the LEFT function. We'll ensure it only goes up to 37 characters and append dot dot dot behind. If the donor first name is less than 40 characters, we can just set the donor first name value. Always check syntax and click done.

**\[00:04:41]** We'll do the same for the donor last name. Create an assignment component, set the data type to text, and use the IF function to check the length using the LEN function. If greater than 40, we will truncate the value. Check the syntax and save. Ensure you save your flow and activate.

**\[00:05:18]** To test this updated logic, you can navigate back to the notification and click reprocess. Once the notification is finished reprocessing, you can go back to your record, refresh the page and observe that now net amount, donor first name and donor last name are all being set.

**\[00:05:37]** This is how you can use Salesforce formulas in your MoveData flows. Thanks so much for watching and bye.
