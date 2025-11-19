# Map to Existing Records: NPSP

{% hint style="info" %}
Metadata

* group=Extension
* category=Non-Profit Success Pack
* extension=npsp
* tags=data,data import,data migration,keys,platform keys
{% endhint %}

There may be times when you want the integration to attach to existing records inside Salesforce. This is most common in "Go Live" scenarios where records from your source platforms might already exist in Salesforce, and you need the integration to attach to those existing records instead of creating new ones. This article details how to do this.

{% hint style="info" %}
**Important Notes**

* If you don't do this, the integration may be unable to identify existing Salesforce records and duplicate records could be created as a result
* MoveData cannot perform this function for you. This is because we do not know what those records you have already created in Salesforce are.
* This is a general article. It is to be read in conjunction with [Map to Existing Records: Platform Key Syntax](https://docs.movedata.io/en/articles/9678950) which provides specifics for the source platforms you are seeking to connect.
{% endhint %}

### Minimum Approach <a href="#h_d6c5c9ac2e" id="h_d6c5c9ac2e"></a>

Many organisations will want MoveData to create all records from scratch and in this case you do not need to continue reading this article.

If your organisation does wish to map to existing records, then the minimum recommended approach is to map campaign and recurring donation records. This is because those records tend to persist over time, and:

* Contacts match automatically using your Salesforce Duplicate Rules
* Accounts match automatically matched using your Salesforce Duplicate Rules
* Opportunities are rarely updated after they have been created

### Map Campaign Records <a href="#h_b34976ee0d" id="h_b34976ee0d"></a>

Add the following to your campaign record in Salesforce:

| Salesforce Field                                                 | Comment                                                                                                                                                                             |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>Platform Key</p><p><code>movedata__Platform_Key__c</code></p> | Identifier for the fundraising page record in your source platform                                                                                                                  |
| <p>Protect Name</p><p><code>movedata__Protect_Name__c</code></p> | Set `True` if you wish to retain the name of your existing campaign in Salesforce. Otherwise the integration may update the name based on the value issued by your source platform. |

### Map Recurring Donation Records <a href="#h_9d8fec05f1" id="h_9d8fec05f1"></a>

Add the following to your recurring donation record in Salesforce:

| Salesforce Field                                                     | Comment                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <p>Platform Key</p><p><code>md_npsp_pack__Platform_Key__c</code></p> | Identifier for the recurring donation record in your source platform |

### Map Opportunity Records <a href="#h_d29959aa48" id="h_d29959aa48"></a>

Add the following to your opportunity record in Salesforce:

| Salesforce Field                                                 | Comment                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------- |
| <p>Platform Key</p><p><code>movedata__Platform_Key__c</code></p> | Identifier for the transaction record in your source platform |

### Map Contact Records <a href="#h_d01278bd8b" id="h_d01278bd8b"></a>

Contacts can contain multiple identifiers (for example, if the same contact exists across multiple different source platforms). As such, identifiers for contact records are stored on the child object Contact Platform Key `movedata__Contact_Platform_Key__c`. To map contact records, create the Contact Platform Key record in Salesforce:

| Salesforce Field                                                 | Comment                                                   |
| ---------------------------------------------------------------- | --------------------------------------------------------- |
| <p>Contact</p><p><code>movedata__Contact__c</code></p>           | Identifier for the contact record in Salesforce           |
| <p>Platform Key</p><p><code>movedata__Platform_Key__c</code></p> | Identifier for the contact record in your source platform |

### Map Account Records <a href="#h_ff0e69cf3f" id="h_ff0e69cf3f"></a>

Accounts can contain multiple identifiers (for example, if the same account exists across multiple different source platforms). As such, identifiers for account records are stored on the child object Account Platform Key `movedata__Account_Platform_Key__c`. To map account records, create the Account Platform Key record in Salesforce:

| Salesforce Field                                                 | Comment                                                   |
| ---------------------------------------------------------------- | --------------------------------------------------------- |
| <p>Account</p><p><code>movedata__Account__c</code></p>           | Identifier for the account record in Salesforce           |
| <p>Platform Key</p><p><code>movedata__Platform_Key__c</code></p> | Identifier for the account record in your source platform |

{% hint style="warning" %}
**Notes: Map Account Records**

* The integration does not directly interface with Household Accounts. These are managed by NPSP when a contact is created or updated. The above applies to organisation accounts only.
* Not all source platforms will provide an ID for the account. Often this is provided as metadata on the donation (for example, "Company Name") which the integration uses to find / create the account record. In that scenario, given no identifier is present for the account, the integration can only use your Salesforce Duplicate Rules.
{% endhint %}
