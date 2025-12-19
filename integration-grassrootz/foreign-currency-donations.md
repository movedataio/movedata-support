# Foreign Currency Donations

{% hint style="info" %}
Metadata

* group=Integration
* category=Grassrootz
* subtitle=A summary of Grassrootz foreign currency donations
* integration=Grassrootz
* tags=currency,foreign,donation
{% endhint %}

It is possible to take foreign currency donations using Grassrootz.

In this scenario, Grassrootz will send through the foreign currency and foreign currency amount, but will not issue the amount in local currency it settles into. This causes an issue in Salesforce organisations without [multiple currencies](https://help.salesforce.com/s/articleView?id=sales.admin_currency.htm\&type=5) enabled due to no currency concept inside Salesforce.

Until functionality to expose the settled currency is made available in Grassrootz, your options outside of using "as is" are:

* Not processing foreign currency donations into Salesforce
* Creating and setting a checkbox field when a foreign currency donation is processed into Salesforce (so you can run a report to identify and update)
* Using the exchange rate provided by Grassrootz to infer the settled currency equivalent (note: this is an approximation based on the exchange rate Grassrootz provides, and there can be differences in exchange rates as well as rounding issues when comparing the information issued by Grassrootz relative to Stripe)
