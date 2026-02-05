# MoveData App (pre-1.167)

{% hint style="info" %}
Metadata

* group=Technical
* category=Technical
* subtitle=How to upgrade the MoveData app (pre-1.167)
* integration=all
* tags=config,upgrade,legacy
{% endhint %}

{% hint style="info" %}
If you use NPSP Fundraising & Donations Extension (pre-1.81) please complete the following upgrade and then return to this page:

* [Fundraising & Donations Extension (pre-1.81)](../extension-npsp/fundraising-and-donations-extension-pre-1.81.md)
{% endhint %}

MoveData App v1.167 introduces support for Commerce. This allows you to use MoveData to process ticket sales, merchandise sales, raffle ticket sales and other such information into Salesforce.

Even if you do not use Commerce, newer versions of the MoveData Extensions may have a dependency on MoveData App v 1.167 onward.

We recommend backing up your data (`Setup` → `Data Export`) before completing this upgrade, and performing in a sandbox before performing in Production.

### Upgrade the MoveData App <a href="#h_0a522d2dfe" id="h_0a522d2dfe"></a>

Install the most recent version of the MoveData App: [https://api.movedata.io/installer/app](https://api.movedata.io/installer/app)

### Perform Checks <a href="#h_b46a57bad3" id="h_b46a57bad3"></a>

When you undertake the upgrade, MoveData will execute an Apex job called `MoveDataBatchWorker`. It is important to ensure this has executed successfully. You can confirm this via `Setup` → `Apex Jobs`.

<figure><img src="../.gitbook/assets/Apex Jobs.png" alt=""><figcaption></figcaption></figure>

Depending on the volume of data, this job may run one or many times. You can consider it to have completed when all jobs are marked as `Completed` and no `MoveDataBatchWorker` job has run for 5 mins.

If you encounter an error, please submit a support ticket and we will help work through your issue.

#### Error: `Not allowed to install or modify metadata via Apex` <a href="#h_214a7443ba" id="h_214a7443ba"></a>

Open `Developer Console` and select `Debug` → `Open Execute Anonymous Window` and ru the following command:

`new movedata.MoveDataInstallHandler().onInstall(null);`

Your Apex job `MoveDataBatchWorker` will then resume.

#### Technical Checks <a href="#h_29416208f1" id="h_29416208f1"></a>

Below is a suite of SOQL checks you can execute to ensure the data has transferred cleanly.

| Account Platform Key                | `SELECT Id, md_npsp_pack__Platform_Key__c, md_npsp_pack__Platform__c, md_npsp_pack__Account__c FROM md_npsp_pack__Account_Platform_Key__c`                                                                                                        | `0 Record(s)`                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Account                             | `SELECT Id, md_npsp_pack__Protect_Name__c, movedata__Protect_Name__c FROM Account`                                                                                                                                                                | Visual Review to ensure Values are Similar |
| Campaign (Platform & Platform Keys) | `SELECT Id FROM Campaign WHERE md_npsp_pack__Platform__c <> NULL OR md_npsp_pack__Platform_Key__c <> NULL`                                                                                                                                        | `0 Record(s)`                              |
| Campaign (Campaign Code)            | `SELECT Id FROM Campaign WHERE md_npsp_pack__Campaign_Code__c <> NULL`                                                                                                                                                                            | `0 Record(s)`                              |
| Campaign (Protect Name)             | `SELECT COUNT(Id) FROM Campaign WHERE (md_npsp_pack__Protect_Name__c = TRUE AND movedata__Protect_Name__c <> TRUE) OR (md_npsp_pack__Protect_Name__c = FALSE AND movedata__Protect_Name__c <> FALSE)`                                             | `0 Record(s)`                              |
| Campaign (Protect Campaign Parent)  | `SELECT COUNT(Id) FROM Campaign WHERE (md_npsp_pack__Protect_Campaign_Parent__c = TRUE AND movedata__Protect_Campaign_Parent__c <> TRUE) OR (md_npsp_pack__Protect_Campaign_Parent__c = FALSE AND movedata__Protect_Campaign_Parent__c <> FALSE)` | `0 Record(s)`                              |
| Opportunity                         | `SELECT Id FROM Opportunity WHERE md_npsp_pack__Platform_Key__c <> NULL`                                                                                                                                                                          | `0 Record(s)`                              |

### Upgrade Extension: Fundraising & Donations <a href="#h_2ec957058c" id="h_2ec957058c"></a>

Install the most recent version of the Fundraising & Donations Extension: [https://api.movedata.io/installer/npsp-extension](https://docs.movedata.io/en/articles/9744343-fundraising-donations-extension-pre-1-81)

{% hint style="info" %}
**Related Article:** [NPSP Fundraising & Donations Extension (pre-1.81)](../extension-npsp/fundraising-and-donations-extension-pre-1.81.md)
{% endhint %}

### Update Field Sets and Page Layouts <a href="#h_584d8f2d6f" id="h_584d8f2d6f"></a>

Salesforce does not allow automatic updates to Field Sets or Page Layouts, so these need to be updated manually as part of the upgrade process.

#### Field Sets <a href="#h_0d34ddbaa9" id="h_0d34ddbaa9"></a>

Open `Setup` → `Object Manager` → `Object` (like Campaign) → `Field Sets` → `Field Set` (like `[MoveData] Donation: Campaign Fieldset`). Drag the fields listed below into the Field Set and click `Save`.

| Object      | Field Set                                | Add Field                                                                              |
| ----------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| Account     | `[MoveData] Donation: Account Fieldset`  | `Protect Name`                                                                         |
| Opportunity | `[MoveData] Opportunity Fieldset`        | `Platform Key`                                                                         |
| Campaign    | `[MoveData] Donation: Campaign Fieldset` | `Campaign Code`, `Platform`, `Platform Key`, `Protect Name`, `Protect Campaign Parent` |

#### Page Layouts <a href="#h_5f3bc5ddee" id="h_5f3bc5ddee"></a>

You are only impacted if you use fields now marked `[Deprecated]` on your page layouts. If so, replace the field marked `[Deprecated]` with the updated equivalent.

| Object   | Old Field                              | Replace With              |
| -------- | -------------------------------------- | ------------------------- |
| Account  | `[Deprecated] Protect Name`            | `Protect Name`            |
| Campaign | `[Deprecated] Protect Name`            | `Protect Name`            |
| Campaign | `[Deprecated] Protect Campaign Parent` | `Protect Campaign Parent` |
| Campaign | `[Deprecated] Platform`                | `Platform`                |

### Review Extension Flows <a href="#h_3e5b498b7f" id="h_3e5b498b7f"></a>

If you have customised MoveData, and your Extension Flows and/or Extension Field Sets reference the now deprecated fields, then these must be updated to the new field equivalents.

| Object      | Old Field                              | New Field                 |
| ----------- | -------------------------------------- | ------------------------- |
| Account     | `[Deprecated] Protect Name`            | `Protect Name`            |
| Campaign    | `[Deprecated] Protect Name`            | `Protect Name`            |
| Campaign    | `[Deprecated] Protect Campaign Parent` | `Protect Campaign Parent` |
| Campaign    | `[Deprecated] Platform`                | `Platform`                |
| Campaign    | `[Deprecated] Platform Key`            | `Platform Key`            |
| Campaign    | `[Deprecated] Campaign Code`           | `Campaign Code`           |
| Opportunity | `[Deprecated] Platform Key`            | `Platform Key`            |
