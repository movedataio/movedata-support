# Unable to Lock Row Error (UNABLE\_TO\_LOCK\_ROW)

When a record is being created or updated, Salesforce places a lock on that record to prevent other operations from updating the record at the same time (which might otherwise cause inconsistencies in data).

In a MoveData context, this occurs more often when multiple "similar" notifications are dispatched by your connected source platform either simultaneously or in quick succession. For example, if you receive a donation on a regular gift, your source platform may dispatch separate notifications for the donation being made and the regular gift being updated at the same time - both which reference the same contact, campaign, recurring donation and other records).

This can result in Salesforce issuing following errors:

* `UNABLE_TO_LOCK_ROW, unable to obtain exclusive access to this record.`
* `The record you are attempting to edit, or one of its related records, is currently being modified by another user. Please try again.`

You can ignore these errors because MoveData will automatically attempt to execute the notification three times before issuing a status of `Failed`. Typically in the first execution one of your notifications will succeed and the other will fail, and on the second execution the originally failed notification will succeed (due to the row lock from the first notification being released).
