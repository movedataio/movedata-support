# Map to Existing Records: NPC

There may be times when you want the integration to attach to existing records inside Salesforce. This is most common in "Go Live" scenarios where records from your source platforms might already exist in Salesforce, and you need the integration to attach to those existing records instead of creating new ones. This article details how to do this.

{% hint style="warning" %}
**Important Notes**

* If you don't do this, the integration may be unable to identify existing Salesforce records and duplicate records could be created as a result
* MoveData cannot perform this function for you. This is because we do not know what those records you have already created in Salesforce are.
* This is a general article. It is to be read in conjunction with [Map to Existing Records: Platform Key Syntax](https://docs.movedata.io/en/articles/9678950) which provides specifics for the source platforms you are seeking to connect.
{% endhint %}

### Minimum Approach <a href="#h_69c516602a" id="h_69c516602a"></a>

Many organisations will want MoveData to create all records from scratch and in this case you do not need to continue reading this article.

If your organisation does wish to map to existing records, then the minimum recommended approach is to map campaign and gift commitment records. This is because those records tend to persist over time, and:

* Person Accounts match automatically using your Salesforce Duplicate Rules
* Organisation Accounts match automatically matched using your Salesforce Duplicate Rules
* Gift Transactions are rarely updated after they have been created

### Map Campaign Records <a href="#h_d3669f53dc" id="h_d3669f53dc"></a>

Add the following to your campaign record in Salesforce:

| Salesforce Field            | Comment                                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `movedata__Platform_Key__c` | ID of the page record in the source platform                                                                                                                     |
| `movedata__Protect_Name__c` | Set `True` if you wish to protect the name of the campaign in Salesforce (else, the integration may update the name to the value issued by the source platform). |

### Map Gift Commitment Records <a href="#h_089fc931ee" id="h_089fc931ee"></a>

Add the following to your gift commitment record in Salesforce:

| Salesforce Field               | Comment                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| `md_npc_pack__Platform_Key__c` | ID of the recurring donation record in the source platform |

### Map Gift Transaction Records <a href="#h_5446545376" id="h_5446545376"></a>

Add the following to your gift transaction record in Salesforce:

| Salesforce Field               | Comment                                          |
| ------------------------------ | ------------------------------------------------ |
| `md_npc_pack__Platform_Key__c` | ID of the donation record in the source platform |

### Map Person Account Records <a href="#h_ad6b065c93" id="h_ad6b065c93"></a>

Person Accounts can contain multiple identifiers (for example, if the same person account exists across multiple different source platforms). As such, identifiers for person account records are stored on the child object Account Platform Key `movedata__Account_Platform_Key__c`. To map person account, create the Account Platform Key record in Salesforce:

| Salesforce Field            | Comment                                                |
| --------------------------- | ------------------------------------------------------ |
| `movedata__Account__c`      | ID of the person account record in Salesforce          |
| `movedata__Platform_Key__c` | ID of the person account record in the source platform |

### Map Organisation Account Records <a href="#h_6e7e1a951d" id="h_6e7e1a951d"></a>

Accounts can contain multiple identifiers (for example, if the same account exists across multiple different source platforms). As such, identifiers for account records are stored on the child object Account Platform Key `movedata__Account_Platform_Key__c`. To map account records, create the Account Platform Key record in Salesforce:

| Salesforce Field            | Comment                                         |
| --------------------------- | ----------------------------------------------- |
| `movedata__Account__c`      | ID of the account record in Salesforce          |
| `movedata__Platform_Key__c` | ID of the account record in the source platform |

{% hint style="warning" %}
**Notes: Map Organisation Account Records**

* Not all source platforms will provide an ID for the account. Often this is provided as metadata on the donation (for example, "Company Name") which the integration uses to find / create the account record. In that scenario, given no identifier is present for the account, the integration can only use your Salesforce Duplicate Rules.
{% endhint %}

### Map Opportunity Records <a href="#h_9e56d80b54" id="h_9e56d80b54"></a>

Add the following to your opportunity record in Salesforce:

| Salesforce Field            | Comment                                      |
| --------------------------- | -------------------------------------------- |
| `movedata__Platform_Key__c` | ID of the sale record in the source platform |

{% hint style="warning" %}
**Notes: Map Opportunity Records**

* NPC uses the Gift Transaction object to represent donations
* Opportunities are only used for non-donation transactions, such as merchandise sales, paid event registrations, raffle ticket sales etc
{% endhint %}
