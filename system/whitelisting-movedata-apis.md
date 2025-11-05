# Whitelisting MoveData APIs

{% hint style="info" %}
Metadata

* category=system
* tags=ip address,whitelisting
{% endhint %}

Some organisations will want to limit the IP address ranges that can talk with their Salesforce instance. This will reduce reduce the possible attack vector should the OAuth token hosted by MoveData become comprimised.

MoveData is configured to communicate with your Salesforce using the following IP addresses:

* `13.237.31.104`
* `3.105.105.117`

You can limit these under `Login IP Ranges` on the Profile used by the user authorised for MoveData.
