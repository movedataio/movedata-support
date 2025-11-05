# Platform Key Syntax

{% hint style="info" %}
Metadata

* category=technical
* tags=data,data import,data migration,keys,platform keys
{% endhint %}

Identifiers are not always unique within source platforms, and can also repeat between different source platforms. Because of this, the integration will prefix identifiers with additional information as a safety mechanism. To find your identifiers, download the equivalent report from your source platform.

{% hint style="info" %}
Often organisations will have integrations installed in a sandbox before enabling in Production. In this case, you can create a report for the records in your sandbox and view the identifier values and copy across to Production.

<img src="../.gitbook/assets/SF Report.png" alt="" data-size="original">
{% endhint %}

### Raisely Syntax <a href="#h_9f462c4be7" id="h_9f462c4be7"></a>

Identifiers are prefixed with `raisely:`

| Object                                                       | Identifier            | Example                                | Value                                          |
| ------------------------------------------------------------ | --------------------- | -------------------------------------- | ---------------------------------------------- |
| Contact                                                      | Person UUID           | `6fe7fd90-100f-11ea-b92d-574a5da4fffc` | `raisely:6fe7fd90-100f-11ea-b92d-574a5da4fffc` |
| Campaign (Campaign Records)                                  | Campaign Profile UUID | `aa88bd90-562c-11eb-bf24-6bd493dd10e5` | `raisely:aa88bd90-562c-11eb-bf24-6bd493dd10e5` |
| Campaign (Organisation, Team and Fundraiser Profile records) | Profile UUID          | `74a298b0-6cdc-11eb-b501-399fd2e468ed` | `raisely:74a298b0-6cdc-11eb-b501-399fd2e468ed` |
| Recurring Donation                                           | Subscription UUID     | `b6f623c0-2a74-11ec-91e7-b9ad139ed3a4` | `raisely:b6f623c0-2a74-11ec-91e7-b9ad139ed3a4` |
| Opportunity                                                  | Donation UUID         | `55f1ef50-f15f-11ee-ad05-719b0288d1dc` | `raisely:55f1ef50-f15f-11ee-ad05-719b0288d1dc` |

### Funraisin' Syntax <a href="#h_d14049f4d3" id="h_d14049f4d3"></a>

Identifiers are prefixed with `funraisin:` and other information (like `event`, `history`) depending on the nature of the record in Funraisin'.

| Object                                 | Identifier            | Example | Value                    |
| -------------------------------------- | --------------------- | ------- | ------------------------ |
| Contact                                | Member ID             | `5478`  | `funraisin:5478`         |
| Campaign (Event records)               | Event ID              | `1`     | `funraisin:event:1`      |
| Campaign (Event ID not provided)       |                       |         | `funraisin:funraisin`    |
| Campaign (Team and Fundraiser records) | History ID            | `2938`  | `funraisin:history:2938` |
| Campaign (Page records)                | Page ID               | `49`    | `funraisin:page:49`      |
| Recurring Donation                     | Scheduled Donation ID | `29`    | `funraisin:recurring:29` |
| Opportunity                            | Donation ID           | `860`   | `funraisin:8680`         |

{% hint style="warning" %}
**Note: Funraisin Campaigns**

Where an Event ID is provided, the integration will use that event as the parent campaign and nest teams and fundraisers underneath. Where an Event ID is not provided (such as with DIY fundraisers or pages), the integration will parent the records under a generic Funriasin' campaign.
{% endhint %}

{% hint style="warning" %}
**Note: Multiple Funraisin Sites**

If you connect multiple Funraisin sites you must ensure a prefix is configured in your Funraisin integration settings. This is because Funraisin uses sequential identifiers on a site-by-site basis and, without prefixing, identifiers could overwrite eachother. If you set up a prefix of `test`, MoveData will incorporate that prefix into the below structure like `funraisin:test:event:1`, `funraisin:test:history:2938`.
{% endhint %}

### JustGiving Syntax <a href="#h_91a679ee0e" id="h_91a679ee0e"></a>

Identifiers are prefixed with `justgiving:` and other information (like `event`, `pages`) depending on the nature of the record in JustGiving.

| Object                                      | Identifier                                  | Example                                | Value                                                      |
| ------------------------------------------- | ------------------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| Contact                                     | User ID                                     | `77540128`                             | `justgiving:77540128`                                      |
| Campaign (Event records)                    | Event ID                                    | `6202476`                              | `justgiving:event:6202476`                                 |
| Campaign (Campaign records)                 | Campaign ID                                 | `fb1f8570-39e3-4253-9e0a-c2c2a16a20f9` | `justgiving:campaign:fb1f8570-39e3-4253-9e0a-c2c2a16a20f9` |
| Campaign (Event / Campaign ID not provided) |                                             |                                        | `justgiving:justgiving`                                    |
| Campaign (Team and Fundraiser records)      | Page ID                                     | `15337999`                             | `justgiving:pages:15337999`                                |
| Recurring Donation                          | User ID and Recurring Mandate Creation Date |                                        | `justgiving:53187580_20140909`                             |
| Opportunity                                 | Donation ID                                 | `299921264`                            | `justgiving:299921264`                                     |

{% hint style="warning" %}
**Note: JustGiving Campaigns**

Where an Event / Campaign ID is provided, the integration will use that event as the parent campaign and nest teams and fundraisers underneath. Where an Event / Campaign ID is not provided (such as with DIY fundraisers), the integration will parent the records under a generic JustGiving campaign.
{% endhint %}

{% hint style="warning" %}
Note: JustGiving Recurring Donations

JustGiving does not issue an identifier for recurring donations and as such you need to calculate it yourself. The identifier can be derived from the `YYYYMMDD` value of the Recurring Mandate Creation Date (like `20250101`) which is prefixed with the User ID and underscore (`_`) to create an identifier like `53187580_20140909`.
{% endhint %}

### Enthuse Syntax <a href="#h_9a4a5cd750" id="h_9a4a5cd750"></a>

Identifiers are prefixed with `enthuse:`

| Object                                      | Identifier               | Example                                | Value                                          |
| ------------------------------------------- | ------------------------ | -------------------------------------- | ---------------------------------------------- |
| Contact                                     | Supporter ID             | `883591`                               | `enthuse:883591`                               |
| Campaign (Event records)                    | Company ID               | `363`                                  | `enthuse:363`                                  |
| Campaign (Campaign records)                 | Event Page ID            | `20178`                                | `enthuse:20178`                                |
| Campaign (Event / Campaign ID not provided) |                          |                                        | `enthuse:enthuse`                              |
| Campaign (Team and Fundraiser records)      | PF ID                    | `731863`                               | `enthuse:731863`                               |
| Recurring Donation                          | Schedule ID              | `109375`                               | `enthuse:109375`                               |
| Opportunity                                 | Payment Transaction GUID | `db71c8d5-c5a8-448c-9aee-d7d72c3fcf61` | `enthuse:db71c8d5-c5a8-448c-9aee-d7d72c3fcf61` |

{% hint style="warning" %}
**Note: Enthuse Campaigns**

Where an Event / Campaign ID is provided, the integration will use that event as the parent campaign and nest teams and fundraisers underneath. Where an Event / Campaign ID is not provided (such as with DIY fundraisers), the integration will parent the records under a generic Enthuse campaign.
{% endhint %}

### Grassrootz Syntax <a href="#h_f8965eca4b" id="h_f8965eca4b"></a>

Identifiers are prefixed with `grassrootz:` and other information (like `campaign`, `team`) depending on the nature of the record in Grassrootz.

| Object                        | Identifier      | Example   | Value                          |
| ----------------------------- | --------------- | --------- | ------------------------------ |
| Contact                       | AccountId       | `469822`  | `grassrootz:469822`            |
| Campaign (Campaign Records)   | Campaign ID     | `5531`    | `grassrootz:campaign:5531`     |
| Campaign (Team records)       | Team ID         | `13042`   | `grassrootz:team:13042`        |
| Campaign (Fundraiser records) | Fundraiser ID   | `123948`  | `grassrootz:fundraiser:123948` |
| Recurring Donation            | Subscription ID | `1749`    | `grassrootz:1749`              |
| Opportunity                   | Donation ID     | `1501852` | `grassrootz:1501852`           |

### TapRaise Syntax <a href="#h_a1811e4597" id="h_a1811e4597"></a>

Identifiers are prefixed with `tapraise:`

| Object    | Identifier              | Example                                | Value                                           |
| --------- | ----------------------- | -------------------------------------- | ----------------------------------------------- |
| Contact   | Person UUID             | `a6adb3e4-9dfb-41ba-9af2-4a8326a53f84` | `tapraise:a6adb3e4-9dfb-41ba-9af2-4a8326a53f84` |
| Agreement | Transaction Origin UUID | `9eac2a84-8564-4be8-9c6d-2cee145c4e5f` | `tapraise:9eac2a84-8564-4be8-9c6d-2cee145c4e5f` |
| Payment   | Transaction UUID        | `ff5d091a-a37a-4ea2-a704-f0c1157e4501` | `tapraise:ff5d091a-a37a-4ea2-a704-f0c1157e4501` |

### Good2Give Syntax <a href="#h_0307e4fb3c" id="h_0307e4fb3c"></a>

Identifiers are prefixed with `g2g:`

| Object                                                              | Identifier                             | Example                      | Value                      |
| ------------------------------------------------------------------- | -------------------------------------- | ---------------------------- | -------------------------- |
| Contact                                                             | Good2Give Donor ID                     | `154915`                     | `g2g:154915`               |
| Account                                                             | Employer Name                          | `google`                     | `g2g:google`               |
| Campaign (Good2Give Parent)                                         |                                        |                              | `g2g:good2give`            |
| Campaign (Employer Campaign Enabled)                                | Employer Name                          | `google`                     | `g2g:google`               |
| Campaign (Charity Project Campaigns Enabled)                        | Charity Project Name                   | `special-needs`              | `g2g:special-needs`        |
| Campaign (Employer Campaigns and Charity Project Campaigns Enabled) | Employer Name and Charity Project Name | `google` and `special-needs` | `g2g:google-special-needs` |
| Opportunity                                                         | Donation Confirmation Number           | `G2GDON0007842070AU`         | `g2g:G2GDON0007842070AU`   |

{% hint style="warning" %}
**Note: Employer Name and Charity Projects**

When deriving values from Employer Name / Charity Project Name, ensure you convert values to lowercase and represent any space () characters with hyphens (`-`). In the case of Employer _and_ Charity Project campaigns being enabled, combine the Employer Name and Charity Project name with a hyphen like `[Employer Name]-[Charity Project Name]` / `google-special-needs`.
{% endhint %}

### DoGooder Syntax <a href="#h_d7fa1e1907" id="h_d7fa1e1907"></a>

Identifiers are prefixed with `dogooder:`

| Object   | Identifier                                         | Example | Value           |
| -------- | -------------------------------------------------- | ------- | --------------- |
| Contact  | DoGooder does not have the concept of a Contact ID | N/A     | N/A             |
| Campaign | Campaign ID                                        | `612`   | `dogooder:612`  |
| Action   | Action ID                                          | `7305`  | `dogooder:7305` |

{% hint style="warning" %}
**Note: DoGooder Contacts**

DoGooder does not have the concept of a contact identifier. In that scenario, given no identifier is present for the account, the integration can only use your Salesforce Duplicate Rules.
{% endhint %}
