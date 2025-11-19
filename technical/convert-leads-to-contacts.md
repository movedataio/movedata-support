---
description: >-
  You can configure your duplicate rules to query against existing leads and,
  where a match is found, convert that lead into a contact.
---

# Convert Leads to Contacts

{% hint style="info" %}
Metadata

* category=general
* tags=duplicate,convert,leads
{% endhint %}

{% hint style="warning" %}
### Warning: Salesforce Converts Lead into Contact and Organisation Account <a href="#h_5d8c66850f" id="h_5d8c66850f"></a>
{% endhint %}

Salesforce forces you to add a company information to your lead record:

<figure><img src="../.gitbook/assets/Lead Example.png" alt=""><figcaption></figcaption></figure>

When converted, Salesforce will assign the resulting contact against an organisation rather than household account (if using NPSP Households):

<figure><img src="../.gitbook/assets/Lead Converted.png" alt=""><figcaption></figcaption></figure>

This behaviour is inherent to Salesforce, so if you use duplicate rules to convert leads please keep this in mind. If you need to get your resulting contact into the household account structure, then you would need to write your own business logic to do so after the Salesforce logic has fired. Custom logic to do this for you does not exist in MoveData.

### Worked Example <a href="#h_6fd99339f7" id="h_6fd99339f7"></a>

#### Create a Lead Matching Rule <a href="#h_5cca22b20a" id="h_5cca22b20a"></a>

Open Setup → Matching Rules and create a matching rule for the Lead object. In this scenario our rule looks at First Name, Last Name and Postcode.

<figure><img src="../.gitbook/assets/Lead Matching Rule.png" alt=""><figcaption></figcaption></figure>

#### Create a Contact Duplicate Rule <a href="#h_8d1725ed28" id="h_8d1725ed28"></a>

Create a duplicate rule for the Contact object which references the Lead matching rule. Ensure you set on create / edit to `Allow`, and operations on create / edit to `Report`. More information is available here: [Configure Duplicate Rules](https://docs.movedata.io/en/articles/9144672).

<figure><img src="../.gitbook/assets/Contact Matching Rules for Leads.png" alt=""><figcaption></figcaption></figure>

#### Observe Successful Match <a href="#h_66599cd4b6" id="h_66599cd4b6"></a>

For review purposes, create a scenario where you have added a lead in Salesforce and generate an equivalent notification through your connected platform. You will observe that a match is detected, and the lead converted into a contact.

<figure><img src="../.gitbook/assets/Converted Lead.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Converted Lead Log.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/Converted Lead Contact.png" alt=""><figcaption></figcaption></figure>
