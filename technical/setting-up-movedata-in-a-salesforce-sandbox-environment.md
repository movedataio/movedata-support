# Setting Up MoveData in a Salesforce Sandbox Environment

{% hint style="info" %}
Metadata

* category=Technical
* subtitle=An overview for setting up MoveData in a Salesforce sandbox environment
* integration=all
* tags=salesforce,sandbox,environment,movedata,configuration
{% endhint %}

{% hint style="warning" %}
Note: Salesforce Sandboxes are separate environments, configuration, authentication, and integration setup must be performed independently from your production instance.
{% endhint %}

Once you have [created a sandbox](https://help.salesforce.com/s/articleView?id=platform.data_sandbox_create.htm\&type=5) from your Production Salesforce environment, MoveData and all necessary configuration will be copied onto the sandbox. However, you must re-authenticate MoveData as your production authentication will not carry over.

When re-authenticating MoveData in the sandbox, pay careful attention to:

* **Authorised User**: Ensure the MoveData is authorised under a user with the necessary permissions. For additional information, please see [About the Authorised MoveData User](https://support.movedata.io/knowledgebase/general/about-the-movedata-authorised-user/). If you need to change the authorised user, please refer to [Change the MoveData Authorised User](https://support.movedata.io/knowledgebase/general/change-the-movedata-authorised-user/).&#x20;
* **User Permissions**: Verify all necessary [MoveData permissions](https://support.movedata.io/user_guide/configuration/permission-sets/) are in place.
* **Duplicate Rules**: Review any [Duplicate Rules](https://support.movedata.io/user_guide/configuration/duplicate-rules/) that may affect data processing.
* **Supporting Configuration**: Be aware of configuration dependencies. For example, if using Payment2Us functionality, ensure the same merchant facilities exist in your sandbox or adjust your configuration accordingly.

After re-authenticating MoveData, you can configure your integrations following the same process used in production. This ensures consistency between environments and helps identify issues before they affect your live system.

For more information on connecting your Integration, please see our [User Guide](https://support.movedata.io/user_guide/) and locate your integration platform.
