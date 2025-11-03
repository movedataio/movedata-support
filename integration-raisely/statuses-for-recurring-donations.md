# Statuses for Recurring Donations

When a donor makes a recurring donation in Raisely, the status of that recurring donation can change over time.

MoveData maps the Raisely status to the Status field (`npsp__Status__c`) which will update according to the following conditions:

| Status in Raisely    | Status in Salesforce |
| -------------------- | -------------------- |
| Paused               | `Paused`             |
| Cancelled            | `Closed`             |
| Failed               | `Lapsed`             |
| \[None of the above] | `Active`             |

If you need to set additional information beyond the above you can do so by [adding logic to your MoveData flows](https://intercom.help/movedata/en/collections/9038155-modify-integrations). For example, you may wish to write the decline code to a custom field on your Recurring Donation record:

<figure><img src="../.gitbook/assets/Decline Code.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Assess Decline Code.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Set Decline Code.png" alt=""><figcaption></figcaption></figure>

MoveData will not update pledged opportunity records in Salesforce until the corresponding donation is received in Raisely. This is because MoveData requires a donation record in Raisely to trigger logic to find an update a pledged opportunity associated with that recurring donation.
