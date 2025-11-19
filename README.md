# Missing Enthuse Data

{% hint style="info" %}
Metadata

* category=enthuse
* integration=enthuse
* tags=data
{% endhint %}

MoveData has supported integration of [Enthuse](https://enthuse.com/) data into Salesforce for a number of years. Over this time, we have encountered various issues in the Enthuse APIs which have not been fully addressed. Enthuse has plans to release a new set of APIs in the second half of 2025, and have noted that these will address the issues we have raised with them. However, until Enthuse releases their new APIs, MoveData has limited to no options to address the below issues.

### Missing Data <a href="#h_817ee6c8e8" id="h_817ee6c8e8"></a>

Enthuse has an infrequent issue with releasing data in a timely manner. Often, but not exclusively, these relate to recurring donations taken via direct debit. When MoveData queries Enthuse for transactions, we request data from the last time we had a successful pull from their API. Sometimes there is delay at the Enthuse end, and they miss the window MoveData is gathering information across. Enthuse could fix this by allowing us to get transactions by last modified date and setting this value at the time the data is made public via the API, which would mitigate delayed data being missed and is a planned feature of their new APIs. However, this is not something which is possible in their current APIs and can result in missing data.

#### Treatment <a href="#h_5f9b346eb2" id="h_5f9b346eb2"></a>

If you suspect you have missing data, please provide MoveData with the suspected date range and we will queue a catchup job. This will import all data from a specific date that is available via the API.

To help minimise the likelihood of missing data, MoveData implemented a change in April 2025 that ensures all requests to the Enthuse API will ask for all data since our last successful download _plus_ 24 hours. This means if we last successfully connected and downloaded transactions from midnight on the 5th, our next request will ask for all transaction from midnight on the 4th. This will help mop up most delays.
