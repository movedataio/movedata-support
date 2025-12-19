# Could not match on raffle ticket option

{% hint style="info" %}
Metadata

* group=Integration
* category=Funraisin
* subtitle=An overview of Could not match on raffle ticket option Funraisin error
* integration=Funraisin
* tags=match,raffle,ticket,option
{% endhint %}

Over time, and typically due to manually modifying your Funraisin raffle tickets, a scenario can occur where a contact has purchased a Funraisin ticket option which no longer exists in Funraisin.

In the following scenario, we can see Funraisin is providing the ticket option ID (`option_id`) as `13`

<figure><img src="../.gitbook/assets/Screenshot 2025-12-09 at 10.44.23 am.png" alt=""><figcaption></figcaption></figure>

However, there are no corresponding Funraisin ticket options with the same ID. Therefore, MoveData cannot match to the Ticket Option in Funraisin as it no longer exists and will trigger the `Could not match on raffle ticket option` error and the notification will fail to process into Salesforce.

<figure><img src="../.gitbook/assets/Screenshot 2025-12-09 at 10.54.06 am.png" alt=""><figcaption></figcaption></figure>

You will need to contact Funraisin Support about why the raffle has a ticket option that is no longer present.
