# Recurring

* `key`: Unique key identifying the recurring donation.
* `status`: Current status of the recurring donation (e.g., active, paused, cancelled).
* `statusReason`: Reason for the current status, if applicable.
* `amount`: Amount to be donated on each recurrence.
* `currency`: Currency code for the recurring donation.
* `feePlatform`: Total platform fee for each recurrence.
* `feePlatformPublic`: Publicly visible portion of the platform fee.
* `feePlatformPrivate`: Privately tracked portion of the platform fee.
* `startDate`: Date when the recurring donation starts.
* `endDate`: Date when the recurring donation ends.
* `nextPaymentDate`: Date of the next scheduled payment.
* `frequency`: Frequency type for the recurring donation (e.g., monthly, yearly).
* `frequencyUnit`: Number of units between each recurrence.
* `frequencyInterval`: Interval unit for the recurrence (e.g., week, month).
* `day`: Specific day for the recurrence, if applicable.
* `marketing`: Marketing metadata associated with the recurring donation.
* `custom`: Custom metadata for additional configuration.