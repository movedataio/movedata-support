# Ticket Refunds

{% hint style="info" %}
Metadata

* group=Integration
* category=Funraisin
* integration=funraisin
* tags=refund,commerce
{% endhint %}

When a ticket purchase is made, Funraisin attributes this as a "raffle" object when pushing through to MoveData for processing. However, when a refund is made for the same ticket purchase, Funraisin attributes this refund as a "donation" object with no association towards the originating transaction. This is how it is categorised in the source platform, and is a limitation on Funraisin's side.

Due to this, MoveData is unable to match ticket refunds towards the original ticket transaction's Opportunity record in Salesforce and will error when processing.

Note: Donation refunds are not affected by this functionality.
