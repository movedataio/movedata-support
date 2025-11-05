# JustGiving Campaign Logic

{% hint style="info" %}
Metadata

* category=JustGiving
* integration=justgiving
* tags=campaign
{% endhint %}

JustGiving is a difficult platform to extract data from. MoveData use a suite of APIs to piece together a reasonably complete view of a transaction. As part of this, MoveData must create the following campaign structure:

* Campaign (aka top level campaign)
  * Team
    * Fundraiser

To determine the the top-level campaign MoveData employs the following rules:

* If there is a Campaign record provided by JustGiving, use this entry.
  * Schema Reference
    * `campaign`
* If there is an Event that has not been created by a user, use this entry.
  * Schema Reference
    * `page.Event.IsUserCreated` = true; or
    * `payment.transaction.FundraisingPage.Event.IsUserCreated` = true; or
    * `payment.giftaid.FundraisingPage.Event.IsUserCreated` = true
* Use a generic `justgiving` campaign if the above criteria is not met.

Note: If a campaign and event are present, the selected record is determined by the "Priority for Top-Level Campaign" toggle. If true, MoveData will use JustGiving Campaigns over JustGiving Charity Events. If false, MoveData will use JustGiving Charity Events over JustGiving Campaigns.

**Minor Changes to Logic**

This logic was cleaned up and consolidated on the 20th January 2025.
