# Unable to connect to Data API

{% hint style="info" %}
Metadata

* group=Integration
* category=JustGiving
* subtitle=An overview for Unable to connect to Data API error
* integration=justgiving
* tags=config,unable,connect,data,api,error
{% endhint %}

To connect your JustGiving account you must provide the following information:

| Resource        | Comment                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------- |
| Charity ID      | Your JustGiving Charity ID                                                                |
| Data App ID     | Obtain by emailing [JG-Developer@blackbaud.co.uk](mailto:%20JG-Developer@blackbaud.co.uk) |
| Consumer App ID | Obtain by emailing [JG-Developer@blackbaud.co.uk](mailto:%20JG-Developer@blackbaud.co.uk) |
| Username        | Your JustGiving Username                                                                  |
| Password        | Your JustGiving Password                                                                  |

Occasionally you may get an error connecting despite entering seemingly valid credentials. In this scenario please check all of the following:

1. Ensure the JustGiving account you are connecting under is listed as an Admin on your charity account\
   ​
2. Ensure the password for the JustGiving account you are connecting under conforms to the pattern established at [https://justgiving-developer.zendesk.com/hc/en-us/articles/25502027782417--Unauthorized-error-in-my-3rd-Party-Application-after-connecting-to-Blackbaud-ID-when-details-are-correct](https://justgiving-developer.zendesk.com/hc/en-us/articles/25502027782417--Unauthorized-error-in-my-3rd-Party-Application-after-connecting-to-Blackbaud-ID-when-details-are-correct) (namely: use numbers and letters and only a full stop (`.`) as the special character)\
   ​
3. Reset your JustGiving password at [https://www.justgiving.com/sso/ResetPassword/](https://www.justgiving.com/sso/ResetPassword/) (even if your credentials conform to the above points)

If you perform the above steps, you should be able to then connect successfully.
