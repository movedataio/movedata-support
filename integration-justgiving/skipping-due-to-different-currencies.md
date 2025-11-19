# Skipping due to Different Currencies

{% hint style="info" %}
Metadata

* group=Integration
* category=JustGiving
* integration=justgiving
* tags=currency,foreign
{% endhint %}

When a foreign currency transaction is made on JustGiving, the equivalent settled currency amount is not provided. For example:

* AU$100.00

When the payment for that transaction is released by JustGiving (i.e. at a later point in time), the settled currency amount is provided. For example:

* £51.17

In such scenarios, MoveData will skip the processing of the donation record so as not to write an erroneous `100.00` value to the Opportunity record. The record will be created when JustGiving issues the payment and will display the correct `51.17` amount (for it is only at this point in time that JustGiving makes the correct value available).
