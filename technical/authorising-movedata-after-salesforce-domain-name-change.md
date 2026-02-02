# Authorising MoveData after Salesforce Domain Name Change

{% hint style="info" %}
Metadata

* category=Technical
* subtitle=An overview on reauthorising MoveData after a Salesforce Domain Name Change
* integration=all
* tags=salesforce,domain,name,change,authorising,movedata
{% endhint %}

When you perform a [Salesforce Domain Name change](https://help.salesforce.com/s/articleView?id=000391121\&type=1), MoveData will need to be reauthorised to maintain connectivity with your Salesforce instance.

You have two options for reauthorisation:

* **Option 1:** Reauthorise MoveData under the same System Administrator user that currently has MoveData authorised
* **Option 2:** Change to a different System Administrator user during the reauthorisation process

Learn more about the MoveData authorised user and its requirements in our article: [About the MoveData Authorised User](https://support.movedata.io/knowledgebase/general/about-the-movedata-authorised-user/)

### Reauthorisation Steps

Once you have completed your Salesforce Domain Name Change:

1. **Log in to Salesforce** under same System Administrator user that was previously authorised in MoveData
2. **Navigate to the MoveData Settings → General**&#x20;
3. **Click the Authorise button** under "Authorise MoveData" and follow the prompts
4. **You have now authorised MoveData**

### Changing the Authorised User

If you need to switch to a different System Administrator during this process, refer to our detailed guide: [Change the MoveData Authorised User](https://support.movedata.io/knowledgebase/general/change-the-movedata-authorised-user/)
