# Different Address on Donation vs Person Record

{% hint style="info" %}
Metadata

* group=Integration
* category=Raisely
* subtitle=A guide to correcting a different address on donations versus Salesforce person record
* integration=raisely
* tags=data,contact,different,address,salesforce,person,record
{% endhint %}

Sometimes in Raisely you will encounter a scenario where address information on the donation record is different to address information on the person record.

In this scenario, there is no ability to tell which address is the "more correct" one to use, and MoveData will use the address on the person record ahead of the address on the donation record.

If you encounter this scenario and require the address on the donation record to process into Salesforce we recommend the following:

* Open the person record in Raisely
* Modify address information to the desired value and click `Save`
* Open the donation record in Raisely
* Click `Edit → Save`

This will cause Raisely to issue a new notification for the donation in question, and MoveData will process the updated address on the Raisely person record.
