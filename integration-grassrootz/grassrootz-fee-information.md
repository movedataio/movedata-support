# Grassrootz: Fee Information

{% hint style="info" %}
Metadata

* category=Grassrootz
* integration=grassrootz
* tags=fee
{% endhint %}

There are a number of fees which can potentially be charged by Grassrootz. These are surfaced as the following parameters in the Donation phase:

| Variable             | Example                     | Comment                                                                                 |
| -------------------- | --------------------------- | --------------------------------------------------------------------------------------- |
| `Fee`                | `"Fee": 6.89`               | Sum of all Fees                                                                         |
| `FeeGateway`         | `"FeeGateway": 0.84`        | Gateway Fee                                                                             |
| `FeePlatform`        | `"FeePlatform": 6.05`       | Sum of all Platform Fees                                                                |
| `FeePlatformPublic`  | `"FeePlatformPublic": 3.85` | Platform Fee covered by the user in the transaction                                     |
| `FeePlatformPrivate` | `"FeePlatformPrivate": 2.2` | Platform Fee charged by Grassrootz (typically in relation to mass participation events) |
