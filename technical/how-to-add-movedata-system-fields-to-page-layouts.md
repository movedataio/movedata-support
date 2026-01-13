# How to add MoveData System Fields to Page Layouts

{% hint style="info" %}
Metadata

* group=Technical
* category=Technical
* subtitle=An overview of MoveData System Fields and how to add these to Salesforce page layouts
* integration=all
* tags=system,fields,add,salesforce,page,layout&#x20;
{% endhint %}

MoveData has specific system fields which allow access to out-of-the-box functionality. To utilise MoveData system fields and make these available, you will need to ensure these are added to your Salesforce object's page layouts.

{% embed url="https://app.arcade.software/share/ll789MUFU3GoAxiIDMvG" %}

#### Transcription

* Navigate to Setup
* Click Object Manager
* Locate the object you would like to add MoveData system fields to the page layout
* Navigate to Page Layouts
* Open Page Layout Assignment
* Select the page layout for the record type you would like the MoveData system fields to be applied to
* Search for the MoveData system fields to be added to the page layout
* Drag the MoveData System field to the page layout
* Click Save. Repeat this process to add the MoveData system fields for all record types currently in use
* Observe the MoveData system field is now applied to your page layout

For more information, please visit [Salesforce Trailhead: Configure Page Layouts and Create Record Types](https://trailhead.salesforce.com/content/learn/projects/set-up-salesforce-knowledge/configure-page-layouts-create-record-types)

### MoveData System Fields

#### Nonprofit Success Pack

<details>

<summary>Account</summary>

|              |                                |                                                                                          |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------------- |
| Protect Name | movedata\_\_Protect\_Name\_\_c | When ticked to true, protects the account name from being overwritten by the integration |

</details>

<details>

<summary>Contact</summary>

| Name         | Salesforce API Name            | Description                                                                              |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------------- |
| Protect Name | movedata\_\_Protect\_Name\_\_c | When ticked to true, protects the contact name from being overwritten by the integration |

</details>

<details>

<summary>Campaign</summary>

| Name                    | Salesforce API Name                         | Description                                                                                 |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Platform                | movedata\_\_Platform\_\_c                   | Stores the platform name/identifier (e.g. "raisely")                                        |
| Platform Key            | movedata\_\_Platform\_Key\_\_c              | Unique identifier used to match existing Salesforce campaign records                        |
| Protect Name            | movedata\_\_Protect\_Name\_\_c              | When ticked to true, protects the campaign name from being overwritten by the integration   |
| Protect Campaign Parent | movedata\_\_Protect\_Campaign\_Parent\_\_c  | When ticked to true, protects the campaign parent from being overwritten by the integration |
| Contact (Fundraiser)    | md\_npsp\_pack\_\_Fundraising\_Contact\_\_c | Primary fundraiser contact provided by source platform                                      |
| Account (Fundraiser)    | md\_npsp\_pack\_\_Fundraising\_Account\_\_c | Primary fundraiser account provided by source platform                                      |
| Campaign URL            | md\_npsp\_pack\_\_Campaign\_URL\_\_c        | External Campaign URL provided by source platform                                           |

</details>

<details>

<summary>Recurring Donation</summary>

|              |                                      |                                                                         |
| ------------ | ------------------------------------ | ----------------------------------------------------------------------- |
| Platform Key | md\_npsp\_pack\_\_Platform\_Key\_\_c | Unique identifier used to match existing Salesforce recurring donations |

</details>

<details>

<summary>Opportunity</summary>

|                  |                                           |                                                                         |
| ---------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| Fee              | md\_npsp\_pack\_\_Fee\_\_c                | Total fees provided by source platform                                  |
| Gateway Fee      | md\_npsp\_pack\_\_Gateway\_Fee\_\_c       | Gateway fee provided by source platform                                 |
| Gateway Fee Tax  | md\_npsp\_pack\_\_Gateway\_Fee\_Tax\_\_c  | Gateway fee tax provided by source platform                             |
| Platform Fee     | md\_npsp\_pack\_\_Platform\_Fee\_\_c      | Platform fee provided by source platform                                |
| Platform Fee Tax | md\_npsp\_pack\_\_Platform\_Fee\_Tax\_\_c | Platform fee tax provided by source platform                            |
| Receipt Number   | md\_npsp\_pack\_\_Receipt\_Number\_\_c    | Receipt Number provided by source platform                              |
| Tax              | md\_npsp\_pack\_\_Tax\_\_c                | Tax amount provided by source platform                                  |
| Platform Key     | movedata\_\_Platform\_Key\_\_c            | Unique identifier used to match existing Salesforce opportunity records |

</details>

#### Nonprofit Cloud

<details>

<summary>Organisation Account</summary>

|              |                                |                                                                                          |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------------- |
| Protect Name | movedata\_\_Protect\_Name\_\_c | When ticked to true, protects the account name from being overwritten by the integration |

</details>

<details>

<summary>Person Account</summary>

| Name         | Salesforce API Name            | Description                                                                              |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------------- |
| Protect Name | movedata\_\_Protect\_Name\_\_c | When ticked to true, protects the contact name from being overwritten by the integration |

</details>

<details>

<summary>Campaign</summary>

| Name                    | Salesforce API Name                        | Description                                                                                 |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Platform                | movedata\_\_Platform\_\_c                  | Stores the platform name/identifier (e.g. "raisely")                                        |
| Platform Key            | movedata\_\_Platform\_Key\_\_c             | Unique identifier used to match existing Salesforce campaign records                        |
| Protect Name            | movedata\_\_Protect\_Name\_\_c             | When ticked to true, protects the campaign name from being overwritten by the integration   |
| Protect Campaign Parent | movedata\_\_Protect\_Campaign\_Parent\_\_c | When ticked to true, protects the parent campaign from being overwritten by the integration |
| Campaign Code           | movedata\_\_Campaign\_Code\_\_c            | Stores a short code identifier for campaign naming conventions                              |
| Fundraiser              | md\_npc\_pack\_\_Fundraising\_Account\_\_c | Primary fundraiser account provided by source platform                                      |
| Campaign URL            | md\_npsp\_pack\_\_Campaign\_URL\_\_c       | External Campaign URL provided by source platform                                           |

</details>

<details>

<summary>Gift Commitment</summary>

|              |                                      |                                                                             |
| ------------ | ------------------------------------ | --------------------------------------------------------------------------- |
| Platform Key | md\_npsp\_pack\_\_Platform\_Key\_\_c | Unique identifier used to match existing Salesforce gift commitment records |

</details>

<details>

<summary>Gift Transaction</summary>

|                     |                                |                                                                         |
| ------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| Gateway Transaction | GatewayTransactionFee          | Gateway fee provided by source platform                                 |
| Gateway Reference   | GatewayReference               | Gateway fee tax provided by source platform                             |
| Donor Cover Amount  | DonorCoverAmount               | Platform fee provided by source platform                                |
| Payment Identifier  | PaymentIdentifier              | Receipt Number provided by source platform                              |
| Platform Key        | movedata\_\_Platform\_Key\_\_c | Unique identifier used to match existing Salesforce opportunity records |

</details>
