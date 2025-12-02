# You can't change the Household Account or Contact on a Recurring Donation with Closed Opportunities

{% hint style="info" %}
Metadata

* group=Extension
* category=Non-Profit Success Pack
* extension=npsp
* tags=recurring
{% endhint %}

Over time, and typically due to manually modifying records in Salesforce, a scenario can occur where the source platform issues information which is different to the contact or account assigned to your recurring donation.

In this scenario, MoveData will act on the data being issued by the source platform, which can result in a contact or account being matched or created which is different to the one assigned to your recurring donation. If your recurring donation has closed opportunities, this can trigger the `You can't change the Household Account or Contact on a Recurring Donation that has Closed Opportunities` error and the notification will fail to process into Salesforce.

### Worked Example

You have a recurring donation in your source platform owned by a contact with the following information:

| First Name | Joe                                             |
| ---------- | ----------------------------------------------- |
| Last Name  | Smith                                           |
| Email      | [joesmith@gmail.com](mailto:joesmith@gmail.com) |

When MoveData encounters the recurring donation from your source platform, it will match against an equivalent contact with the same information, or create a new contact if no matched contact is determined.

Related Article

* [Step 4: Configure Duplicate Rules (5min)](https://intercom.help/movedata/en/articles/9144672-step-4-configure-duplicate-rules-5min)

For various reasons, you assign the recurring donation to another contact in Salesforce and delete the contact created by MoveData out of Salesforce. The contact you choose to assign to has the following information:

| First Name | Joseph                                            |
| ---------- | ------------------------------------------------- |
| Last Name  | Smith-Brown                                       |
| Email      | [joe@smith-brown.com](mailto:joe@smith-brown.com) |

Assuming you do not update the equivalent information in the source platform, the next time the recurring donation is processed the source platform will issue the originally supplied information:

```
    "firstName": "Joe",
    "lastName": "Smith",
    "email": "joesmith@gmail.com",
```

Depending on how your duplicate rules are configured, this may result in an inability for MoveData to match to the newly assigned contact, and result in MoveData matching or re-creating the originally assigned contact and attempting to assign to your existing recurring donation.

If your recurring donation has closed opportunities, this can trigger the `You can't change the Household Account or Contact on a Recurring Donation that has Closed Opportunities` error and the notification will fail to process into Salesforce.

### Other Possible Causes

#### Multiple “Same” Contacts detected by Duplicate Rules

The same error can also occur when the duplicate rules detect multiple contacts due to two or more of the same records being present. MoveData will use the first duplicate with the highest confidence rating as determined by Salesforce.

{% embed url="https://app.arcade.software/share/CN5x7Mk5FVcDBHwWVTk6" %}

<details>

<summary>Transcript</summary>

* The notification has failed due to a Salesforce validation rule
* Open Execution #1
* Looking through the logs, we see the integration is trying to replace the contact. This is due to differences between the existing Salesforce record and the data issued by the source platform
* Open App Launcher and Select Contact Merge
* Click Search Contacts
* Search Contacts by Name
* Select the records you would like to merge and click Next
* Select the values you would like to retain and click Merge
* Go back to your failed notification and click Reprocess
* Observe that the notification is processed successfully

</details>

??? note "Transcript #2"
    * The notification has failed due to a Salesforce validation rule
    * Open Execution #1
    * Looking through the logs, we see the integration is trying to replace the contact. This is due to differences between the existing Salesforce record and the data issued by the source platform
    * Open App Launcher and Select Contact Merge
    * Click Search Contacts
    * Search Contacts by Name
    * Select the records you would like to merge and click Next
    * Select the values you would like to retain and click Merge
    * Go back to your failed notification and click Reprocess
    * Observe that the notification is processed successfully

#### Different Contact or Organisation Account

The same error can also occur when the Account changes. For example:

* The account on your record is a household account and, based on the information supplied by the source platform, the account is updated to the supplied organisation account, or
* The account on your record is an organisation account and, based on the information supplied by the source platform, the account is updated to a different organisation account

In both scenarios, the `You can't change the Household Account or Contact on a Recurring Donation that has Closed Opportunities` error will produce due to the supplied account (`001Mp0000071e4gIAA`) being different to the existing account on the Recurring Donation record (`001Mp0000077ZBxIAM`).

<figure><img src="../.gitbook/assets/recurring-donation-different-contact-or-account.png" alt=""><figcaption></figcaption></figure>

### Remediation

To remediate this error:

* Ensure your duplicate rules are matching the same contact and/or account record as located on the recurring donation
* Ensure there are no duplicates records of the same contact or account
* Ensure the existing contact and/or account have the same key as present in the notification (see below)
* Update data on the desired record (either Salesforce or source platform) to ensure the duplicate detection returns a valid match

#### Matching to Existing Contacts and Accounts via Keys

You can also add mapping to match to existing Contact and Account records via `Platform Key`. To do this:

* Open the execution log for the failing notification
* Observe the generated platform key:

<figure><img src="../.gitbook/assets/recurring-donation-platform-key-new-contact.png" alt=""><figcaption></figcaption></figure>

* Add `Platform Key` as a related list on your Contact Page Layout
* Add the generated platform key to your existing contact:

<figure><img src="../.gitbook/assets/recurring-donation-platform-key-new-contact-platform-key.png" alt=""><figcaption></figcaption></figure>

MoveData will now match against your existing contact via key. Reprocessing the notification will cause MoveData to match to the originally assigned contact and therefore not trigger the `You can't change the Household Account or Contact on a Recurring Donation that has Closed Opportunities` error.
