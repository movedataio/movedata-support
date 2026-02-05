# Make HTTP Callouts in Flows

{% hint style="info" %}
Metadata

* group=Technical
* category=Technical
* subtitle=How to make HTTP callouts in flows
* integration=all
* tags=flows,callout,limit,asynchronous
{% endhint %}

When MoveData processes a notification, it creates a transaction. A transaction is used to commit all changes to Salesforce, or if unsuccessful, rollback all changes so that no data is changed.

When a transaction is live and pending, Salesforce enforce a number of processing restrictions. In particular, it does not allow any callouts to external systems until the transaction is completed. If you attempt to perform an HTTP callout from Apex or Flows, you will get the following error:

`Can't perform callout because of pending uncommitted changes related to a process, flow, or Apex operation. Commit or roll back the work, and then try again.`

If you require an HTTP callout, we suggest you move this into an asynchronous flow or `after` Apex trigger. These will run after the MoveData transaction has completed.
