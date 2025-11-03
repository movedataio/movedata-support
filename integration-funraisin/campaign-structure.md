---
description: >-
  An explainer about the different options that influence the structure of
  Funraisin campaigns
---

# Campaign Structure

The Funraisin campaign configuration and resulting Salesforce structure desired by a customer can vary between implementation. Therefore, it is important to understand how specific configuration items can alter this structure.

There are three types of campaigns within Funraisin: an offline event, offline event and a DIY (do-it-yourself) event.

### Offline Event <a href="#h_d16db5b7d5" id="h_d16db5b7d5"></a>

Offline Events will be treated the same as other events. By default, MoveData will filter these unless the `Ignore Offline Donations` toggle is set to `false`.

<figure><img src="../.gitbook/assets/Offline Event.png" alt=""><figcaption></figcaption></figure>

### Online Event <a href="#h_d98811537f" id="h_d98811537f"></a>

Online Events will be produced in the following hierarchy by default:

* Event
  * Team (if present)
    * Fundraiser

This is a standard model and is not modified by any MoveData configurations.

### DIY Events <a href="#h_b593c42590" id="h_b593c42590"></a>

{% hint style="warning" %}
Please contact Funraisin to learn when to use DIY events.
{% endhint %}

Campaigns can also be configured as DIY events. When this occurs, an event will be marked with an event type of `diy` and an event category.

```
"event_type": "diy", 
"event_category": "shavechallenge",
```

MoveData will dispatch a notification with the following hierarchy:

* Event: Name = "funraisin"
  * Team: Name = DIY Event Name
    * Fundraiser: Name = Fundraiser's Name

#### Rollup DIY Campaigns <a href="#h_86180f3b2a" id="h_86180f3b2a"></a>

Often an organisation using Funraisin does not want to a DIY campaign to have a team and fundraiser record; they perceive this as a single campaign. To address this, MoveData will compress the event and fundraiser record into a single campaign. This results in the following structure:

* Event: Name = "funraisin"
  * Fundraiser: Name = DIY Event Name

To enable this setting, please open the Funraisin integration in the MoveData app and enable `Rollup DIY Campaigns`.

<figure><img src="../.gitbook/assets/FR DIY Campaigns.png" alt=""><figcaption></figcaption></figure>

### Organisations in Funraisin <a href="#h_1dbbd2d54e" id="h_1dbbd2d54e"></a>

Presently, MoveData does not support Organisations as part of campaigns.
