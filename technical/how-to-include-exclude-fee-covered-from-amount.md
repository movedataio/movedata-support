---
description: >-
  Configure MoveData settings to include or exclude platform fees from
  opportunity amounts for donations and orders.
---

# How to Include / Exclude Fee Covered From Amount

{% hint style="info" %}
Metadata

* group=Technical
* category=Technical
* subtitle=Shows you how to include / exclude cover fee from opportunity amount.
* integration=all
* tags=cover,fee,include,exclude,settings,video
{% endhint %}

{% embed url="https://app.arcade.software/share/pS0d7dvXpXMVjJWL8lw9" %}

{% embed url="https://vimeo.com/1138770830" %}

## Summary

In this tutorial, Lenny from MoveData demonstrates how to include or exclude the covered fee from the opportunity amount using two different examples. The first example involves a Raisely donation where the transaction total is $53.15 but the actual donation total is $50. By default, MoveData sets the transaction amount to the opportunity amount field. To change this behavior for donations, users navigate to MoveData settings, select the Fundraising and Donations tab, locate the Donations section, and enable the "Subtract Platform Fee Amount" toggle setting before clicking Update. After deleting and reprocessing the opportunity record, the opportunity amount correctly reflects the donation amount provided by Raisely. The second example demonstrates a Raisely ticket purchase where the transaction total is $115.45 and the order total is $110. To ensure MoveData sets the order total to the opportunity amount, users navigate to MoveData settings, go to the Commerce tab, find the Orders section, and enable two key toggle settings: "Exclude platform fee from Opportunity Products" and "Subtract platform fee from Total Name Owners." After clicking Update, deleting the opportunity record, and reprocessing in MoveData, the opportunity amount correctly represents the order total instead of the transaction total.

## Transcription

**\[00:00:05]** Hi, I'm Lenny from MoveDay and in this video you'll learn how to include or exclude the cover feed from the opportunity amount.

**\[00:00:12]** In this video, we'll be working with two different examples. The first is a Raisley donation.

**\[00:00:17]** In this test donation, you can see that the transaction total is 53.15 and the donation total is actually $50.

**\[00:00:26]** The corresponding opportunity record, you can see that MoveData's default setting is to set the transaction amount to the opportunity amount field.

**\[00:00:36]** To ensure that MoveData sets the donation amount for donation examples, please navigate to the move data settings.

**\[00:00:46]** Under the Fundraising and Donations tab, there is a section called Donations. Here you can find the Subtract Platform Fee Amount toggle setting.

**\[00:00:56]** Tick this to true and then sure to click Update so that move data saves this setting.

**\[00:01:01]** If we head back to the opportunity record, we'll now delete this opportunity record to push through to move data for reprocessing.

**\[00:01:09]** Now that the notification has successfully reprocessed, we can take a look at the move data setting we just updated. Here you can see the opportunity amount is now the donation amount provided by Raisely.

**\[00:01:23]** For our second example, we'll be working with a Raisely ticket purchase. Here you can see the transaction total is 115.45 and the order total is 110.

**\[00:01:35]** The corresponding opportunity record shows the transaction total as the opportunity amount. To ensure Move Data sets the order total to the opportunity amount, navigate to the Move Data settings.

**\[00:01:49]** Under the Commerce tab, you'll find the Orders section. Here, there are two key settings toggles.

**\[00:01:57]** The Exclude platform fee from Opportunity Products and Subtract platform fee from Total Name Owners.

**\[00:02:06]** Click update to ensure move data saves the settings. To review the move data setting we've just updated, we'll delete this opportunity record and queue for reprocessing in move data.

**\[00:02:17]** Now that the ticket purchase notification has been reprocessed, we can see that the opportunity amount represents the order total.

**\[00:02:25]** This is how you can update the move data settings to ensure that the donation or order amount is set to the opportunity amount instead of the transaction total. Thanks for watching and bye.
