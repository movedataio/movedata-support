# Could not get participant record (Key: ####)

{% hint style="info" %}
Metadata

* group=Integration
* category=Funraisin
* subtitle=A summary for Could not get participant record (Key: ####) error
* integration=funraisin
* tags=data,participant,record,key,error
{% endhint %}

Whilst uncommon, you may from time to time encounter an error like: `Could not get participant record (Key: ####)`.

In this scenario, Funraisin’s API has issued information which references a specific ID. However, when MoveData attempts to load information relating to that ID, Funraisin’s API issues an invalid response. In the majority of cases, this is because the ID referenced no longer exists inside Funraisin.

Outside of restoring the ID in Funraisin and reprocessing the notification in MoveData, there is nothing you can do to correct this error given the necessary information is not surfaced by Funraisin. As such our advice is to ignore this error.
