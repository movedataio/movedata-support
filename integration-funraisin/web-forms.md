# Web Forms

{% hint style="info" %}
Metadata

* group=Integration
* category=Funraisin
* subtitle=A summary of Funraisin web forms
* integration=funraisin
* tags=forms
{% endhint %}

MoveData does not support Web Forms by Funraisin.

This is because Funraisin's API does not always provide a capability to return web form responses on the basis of fundraising page, donation or other such context.

Instead, we recommend you use custom fields which will allocate the response directly against the fundraising page or donation in question. This provides the necessary context and allows the integration to process the information into Salesforce without issue.

Because of the above, MoveData does not support standalone web form responses either. If you require web form responses to be processed into Salesforce, we recommend you use a DIY tool like [Zapier](https://zapier.com/) or [Make](https://www.make.com/en) to achieve this.
