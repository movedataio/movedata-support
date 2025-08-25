# Overview

## Donation Schema

The Donation Schema is produced by donation & fundraising integrations.  It supports fundraising registrations & donations, associated organisations and contacts, tributes, matched donations and recurring donations.

### Example

<details>

<summary>Example Notification</summary>

```
{
  "schema": "donation",
  "schemaVersion": {
    "major": 1,
    "minor": 16,
    "build": 20250321
  },
  "platform": "raisely",
  "platformLabel": "Raisely",
  "platformVersion": {
    "major": 1,
    "minor": 3,
    "build": 20221108
  },
  "action": "donation",
  "campaign": [
    {
      "key": "aa88bd90-562c-11eb-bf24-6bd493dd10e5",
      "type": "campaign",
      "name": "MoveData Campaign",
      "description": "",
      "pageUrl": "https://movedata-campaign.raisely.com/",
      "status": "live",
      "targetAmount": 100000,
      "amount": 76586.08,
      "currency": "AUD",
      "custom": {
        "type": "GROUP",
        "path": "movedata-campaign",
        "grandTotal": 76586.08,
        "campaignTotal": 76586.08,
        "feeTotal": 4681.13,
        "individualProfileCount": 112,
        "teamProfileCount": 28,
        "donationCount": 1223,
        "uniqueDonorCount": 533,
        "nonSelfDonationTotal": 76586.08
      },
      "marketing": {},
      "createdAt": "2021-01-14T05:52:20.458Z",
      "modifiedAt": "2024-07-17T07:38:41.368Z"
    }
  ],
  "anonymous": false,
  "donor": {
    "key": "4ad3bce0-bcbe-11ea-ba32-db6753964e68",
    "partyType": "person",
    "firstName": "Donald",
    "lastName": "Duckson",
    "email": "jgilray+dd@movedata.io",
    "custom": {
      "preferredName": "Donald",
      "accessToken": "21ca7836fd2a53bbf04f68e97bec71d1"
    },
    "createdAt": "2020-07-02T23:46:47.342Z",
    "modifiedAt": "2020-07-02T23:46:47.342Z"
  },
  "recurring": {
    "key": "0d8cfe80-5874-11f0-98c3-ebce1ef9befe",
    "status": "active",
    "amount": 105,
    "currency": "AUD",
    "feePlatform": 5,
    "feePlatformPublic": 5,
    "feePlatformPrivate": 0,
    "startDate": "2025-07-04T01:13:11.528Z",
    "nextPaymentDate": "2025-09-04T01:13:11.000Z",
    "frequency": "monthly",
    "frequencyUnit": 1,
    "frequencyInterval": "month",
    "day": 4,
    "marketing": {
      "url": "https://movedata-campaign.raisely.com/donate"
    },
    "custom": {
      "status": "OK",
      "cardMethodType": "dd_becs"
    }
  },
  "donation": {
    "key": "67b378a0-70d7-11f0-ba8a-d76948f2aace",
    "parentKey": "0d8cfe80-5874-11f0-98c3-ebce1ef9befe",
    "status": "success",
    "receiptNumber": "R-8173029",
    "amount": 105,
    "currency": "AUD",
    "fee": 6.35,
    "feePlatform": 5,
    "feePlatformPublic": 5,
    "feePlatformPrivate": 0,
    "feeGateway": 1.35,
    "feeCovered": true,
    "tax": 0.57,
    "taxPlatform": 0.45,
    "taxGateway": 0.12,
    "startDate": "2025-08-04T02:05:58.485Z",
    "processor": "stripe",
    "processorTransactionId": "py_3RsDlfBnhz9gJviA1vWSc7Jk",
    "cardInformationType": "bank transfer",
    "cardInformationCountry": "AU",
    "cardInformationPan": "000000 ****3456",
    "financials": {
      "origin": {
        "currency": "AUD",
        "amount": 105,
        "fee": 6.35,
        "feePlatform": 5,
        "feeGateway": 1.35,
        "taxPlatform": 0.45
      },
      "settled": {
        "currency": "AUD",
        "amount": 105,
        "fee": 6.35,
        "feePlatform": 5,
        "feeGateway": 1.35,
        "tax": 0.57,
        "taxPlatform": 0.45,
        "taxGateway": 0.12
      }
    },
    "marketing": {
      "url": "https://movedata-campaign.raisely.com/donate"
    }
  },
  "custom": {
    "apiSource": "donation.succeeded",
    "transactionId": "67b378a0-70d7-11f0-ba8a-d76948f2aace",
    "organisationId": 3780,
    "customerId": "cus_HZlem49ckg3FMa",
    "donationId": 23853639,
    "settlementDate": "2025-08-06",
    "processorToken": "pi_3RsDlfBnhz9gJviA1Nmo4WrS",
    "transactionToken": "txn_3RsDlfBnhz9gJviA1LZrmmvg",
    "gatewayDescription": "Transaction (23853639) of AUD105 from Donald Duckson (4ad3bce0-bcbe-11ea-ba32-db6753964e68) to MoveData Campaign (aa88bd90-562c-11eb-bf24-6bd493dd10e5) for MoveData Campaign (aa86c1c0-562c-11eb-bf24-6bd493dd10e5)",
    "receiptDownloadUrl": "https://api.raisely.com/v3/receipt/9006ce10-70d7-11f0-ba8a-d76948f2aace.pdf",
    "cardMethodType": "dd_becs",
    "itemDonationAmount": 100,
    "itemDonationQuantity": 1,
    "itemDonationDescription": "Donation"
  },
  "questions": [
    {
      "key": "isCompany",
      "text": "isCompany",
      "value": false
    }
  ],
  "createdAt": "2025-08-04T02:04:50.860Z",
  "modifiedAt": "2025-08-04T02:06:01.976Z"
}
```

</details>

### Reference

#### Schema Reference

{% content-ref url="schema-reference/schema.md" %}
[schema.md](schema-reference/schema.md)
{% endcontent-ref %}

#### Related Entities

{% content-ref url="related-entities/address.md" %}
[address.md](related-entities/address.md)
{% endcontent-ref %}

{% content-ref url="related-entities/campaign.md" %}
[campaign.md](related-entities/campaign.md)
{% endcontent-ref %}

{% content-ref url="related-entities/communication.md" %}
[communication.md](related-entities/communication.md)
{% endcontent-ref %}

{% content-ref url="related-entities/donation.md" %}
[donation.md](related-entities/donation.md)
{% endcontent-ref %}

{% content-ref url="related-entities/financial.md" %}
[financial.md](related-entities/financial.md)
{% endcontent-ref %}

{% content-ref url="related-entities/financialentry.md" %}
[financialentry.md](related-entities/financialentry.md)
{% endcontent-ref %}

{% content-ref url="related-entities/marketing.md" %}
[marketing.md](related-entities/marketing.md)
{% endcontent-ref %}

{% content-ref url="related-entities/matched.md" %}
[matched.md](related-entities/matched.md)
{% endcontent-ref %}

{% content-ref url="related-entities/organisation.md" %}
[organisation.md](related-entities/organisation.md)
{% endcontent-ref %}

{% content-ref url="related-entities/person.md" %}
[person.md](related-entities/person.md)
{% endcontent-ref %}

{% content-ref url="related-entities/question.md" %}
[question.md](related-entities/question.md)
{% endcontent-ref %}

{% content-ref url="related-entities/recurring.md" %}
[recurring.md](related-entities/recurring.md)
{% endcontent-ref %}

{% content-ref url="related-entities/relationship.md" %}
[relationship.md](related-entities/relationship.md)
{% endcontent-ref %}

{% content-ref url="related-entities/tribute.md" %}
[tribute.md](related-entities/tribute.md)
{% endcontent-ref %}
