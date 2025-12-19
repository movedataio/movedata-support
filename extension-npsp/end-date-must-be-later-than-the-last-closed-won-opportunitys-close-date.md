# End Date must be later than the last Closed Won Opportunity's Close Date

{% hint style="info" %}
Metadata

* group=Extension
* category=Non-Profit Success Pack
* subtitle=A summary on End Date must be later than the last Closed Won Opportunity's Close Date error
* extension=npsp
* tags=recurring,end,date,later,close,won,error
{% endhint %}

This error can occur when recurring donation has been processed and cancelled on the same day.

* When the donation is processed into Salesforce MoveData will set a Stage (`Opportunity.StageName`) of `Closed Won` and Close Date (`Opportunity.CloseDate`) of `TODAY`
* When the regular gift is processed into Salesforce MoveData will set a Status (`npe03__Recurring_Donation__c.npsp__Status__c`) of `Cancelled`

Thus, since the Opportunity will have a Close Date of `TODAY`, and in cancelling the Recurring Donation NPSP will set an End Date (`EndDate`) of `TODAY`, the validation rule will trigger (`End Date must be later than the last Closed Won Opportunity's Close Date`) and prevent the update from saving.

To get around this is to simply reprocess the same notification the following day. NPSP will set an End Date of `Today + 1` thereby avoiding the validation error.
