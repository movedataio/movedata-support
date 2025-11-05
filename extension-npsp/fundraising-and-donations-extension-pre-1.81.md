# Fundraising & Donations Extension (pre-1.81)

{% hint style="info" %}
Metadata

* category=NPSP
* extension=npsp
* tags=upgrade,legacy
{% endhint %}

Fundraising & Donations Extension v1.81 introduces a new and improved concept for Platform Keys. If you are utilising a prior version, you will need to migrate your Platform Key records to this new structure. Failure to do so could result in duplicate records created due to this new structure.

We recommend backing up your data (`Setup` → `Data Export`) before completing this upgrade, and performing in a sandbox before performing in Production.

### Perform Migration <a href="#h_db239c843f" id="h_db239c843f"></a>

1\. Install the most recent version of the Fundraising & Donations Extension: [https://api.movedata.io/installer/npsp-extension](https://docs.movedata.io/en/articles/9744343-fundraising-donations-extension-pre-1-81)

2\. Once this has completed, open Developer Console and select Debug → Open Execute Anonymous Window

<figure><img src="../.gitbook/assets/Developer Console Exec.png" alt=""><figcaption></figcaption></figure>

3\. Paste the below script into the `Enter Apex Code` window. When you do this, ensure the `Open Log` checkbox is ticked. This will open a log to enable us to see if the job is complete. Click `Execute` to run the script.

```
List<md_npsp_pack__Contact_Platform_Key__c> lstContact = new List<md_npsp_pack__Contact_Platform_Key__c>();
List<md_npsp_pack__Account_Platform_Key__c> lstAccount = new List<md_npsp_pack__Account_Platform_Key__c>();

List<md_npsp_pack__Platform_Key__c> lst = [SELECT Id, Name, md_npsp_pack__Platform__c, md_npsp_pack__Platform_Key__c, md_npsp_pack__Contact__c, md_npsp_pack__Account__c FROM md_npsp_pack__Platform_Key__c LIMIT 2000];

System.Debug('List Size: ' + lst.size());

for (md_npsp_pack__Platform_Key__c item : lst) {
    if (item.md_npsp_pack__Contact__c != null) {
        md_npsp_pack__Contact_Platform_Key__c record = new md_npsp_pack__Contact_Platform_Key__c();
        record.md_npsp_pack__Platform__c = item.md_npsp_pack__Platform__c;
        record.md_npsp_pack__Platform_Key__c = item.md_npsp_pack__Platform_Key__c;
        record.md_npsp_pack__Contact__c = item.md_npsp_pack__Contact__c;
        lstContact.add(record);
    }

    if (item.md_npsp_pack__Account__c != null) {
        md_npsp_pack__Account_Platform_Key__c record = new md_npsp_pack__Account_Platform_Key__c();
        record.md_npsp_pack__Platform__c = item.md_npsp_pack__Platform__c;
        record.md_npsp_pack__Platform_Key__c = item.md_npsp_pack__Platform_Key__c;
        record.md_npsp_pack__Account__c = item.md_npsp_pack__Account__c;
        lstAccount.add(record);
    }
}

System.Debug('Contact List Size: ' + lstContact.size());
System.Debug('Account List Size: ' + lstAccount.size());

if (lstContact.size() > 0) insert lstContact;
if (lstAccount.size() > 0) insert lstAccount;

delete lst;
```

4\. Once the execution has completed, the log should open automatically. Click the `Debug Only` toggle to identify the number of records which have been migrated in that execution. If `List Size` in the debug output is greater than `0`, then rerun the script. Rerun until you get to `0`. Once all records are migrated, the Debug Log (with the `Debug Only` toggle checked) will look like this:

<figure><img src="../.gitbook/assets/Exec Result 0.png" alt=""><figcaption></figcaption></figure>

### System.DmlException in Migration <a href="#h_ebb202e45c" id="h_ebb202e45c"></a>

In rare cases you may get the following error when performing your migration:

```
System.DmlException: Insert failed. First exception on row 440; first error: DUPLICATE_VALUE, duplicate value found: md_npsp_pack__Platform_Key__c duplicates value on record with id: a1t980000003zBr
```

In this scenario, perform the following to remove the offending record:

* Open the offending record
  * If the ID is `a1t980000003zBr`, and your Salesforce domain is `domain.lightning.salesforce.com`, then open `domain.lightning.salesforce.com/a1t980000003zBr`
* Note the value for Platform Key
  * For example, `funraisin:2242`
* Open `Developer Console` and select `Query Editor` nd enter the following (substituting `funraisin:2242` for your specific Platform Key)

```
SELECT Id, Name, md_npsp_pack__Platform__c, md_npsp_pack__Platform_Key__c, md_npsp_pack__Contact__c, md_npsp_pack__Account__c FROM md_npsp_pack__Platform_Key__c WHERE md_npsp_pack__Platform_Key__c = 'funraisin:2242'
```

* Copy the ID to open the record
  * If the ID is `b6h560000007jFm`, and your Salesforce domain is `domain.lightning.salesforce.com`, then open `domain.lightning.salesforce.com/b6h560000007jFm`
* Delete the record
* Rerun the script to complete your migration
