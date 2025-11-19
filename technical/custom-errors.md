---
description: How to raise your own errors within a flow.
---

# Custom Errors

{% hint style="info" %}
Metadata

* category=Technical
* tags=errors,custom,log,flow
{% endhint %}

MoveData supports a user raising a custom error within a Lightning Flow. To achieve this you will need to create an output-enabled, text collection variable named `Errors`.

<figure><img src="../.gitbook/assets/Errors Variable.png" alt=""><figcaption></figcaption></figure>

To set the error, you add the error message to the `Errors` collection.

<figure><img src="../.gitbook/assets/Errors Assignment.png" alt=""><figcaption></figcaption></figure>

When a flow finishes it execution with a value in the `Errors` collection, the notification will fail as demonstrated below:

<figure><img src="../.gitbook/assets/Errors Execution Example.png" alt=""><figcaption></figcaption></figure>

## Gracefully Ending a Notification <a href="#h_60ca99ab71" id="h_60ca99ab71"></a>

If you are wishing to gracefully end the execution of a notification, you can use the `Break` command as noted in the [Flow Command Reference](https://intercom.help/movedata/en/articles/9227365-flow-command-reference). This will ensure the notification is not marked as a failure.
