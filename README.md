# Overview

## Commerce Schema

The Commerce Schema is produced by integrations that deal with sales.  The can be product sales, raffle sales, merchandise, etc.

### Example

<details>

<summary>Example Notification</summary>

```
{
  "schema": "commerce",
  "schemaVersion": {
    "major": 1,
    "minor": 1,
    "build": 20200627
  },
  "platform": "raisely",
  "platformLabel": "Raisely",
  "platformVersion": {
    "major": 1,
    "minor": 3,
    "build": 20221108
  },
  "action": "ticket",
  "campaign": [
    {
      "key": "43d8ac50-11f0-11ed-93f3-c92602dd5a2b",
      "type": "campaign",
      "name": "MoveData Tickets P2P",
      "description": "",
      "pageUrl": "https://movedata-tickets-p2p.raisely.com/",
      "status": "live",
      "targetAmount": 1000,
      "amount": 1230,
      "currency": "AUD",
      "custom": {
        "type": "GROUP",
        "path": "movedata-tickets-p2p",
        "grandTotal": 2480,
        "campaignTotal": 2480,
        "feeTotal": 186.98,
        "individualProfileCount": 18,
        "teamProfileCount": 4,
        "donationCount": 23,
        "uniqueDonorCount": 8,
        "nonSelfDonationTotal": 1230
      },
      "marketing": {},
      "createdAt": "2022-08-01T23:18:34.646Z",
      "modifiedAt": "2022-08-01T23:18:34.646Z"
    },
    {
      "key": "167e8070-7c5c-11f0-8835-f7626ee78b71",
      "type": "fundraiser",
      "name": "Test3 Test3",
      "pageUrl": "https://movedata-tickets-p2p.raisely.com/test3-test3",
      "status": "live",
      "targetAmount": 350,
      "amount": 0,
      "currency": "AUD",
      "primaryContact": {
        "key": "fc111767-04b9-4857-8e30-6de5410f8c76",
        "partyType": "person",
        "firstName": "Test3",
        "lastName": "Test3",
        "email": "jgilray+test3@movedata.io",
        "createdAt": "2025-08-18T17:52:20.346Z",
        "modifiedAt": "2025-08-18T17:52:20.346Z"
      },
      "custom": {
        "type": "INDIVIDUAL",
        "path": "test3-test3",
        "exerciseGoal": 1000,
        "exerciseGoalTime": 1000
      },
      "questions": [
        {
          "key": "coverPhoto",
          "text": "coverPhoto",
          "value": "https://raisely-images.imgix.net/charity-challenge/uploads/campaign-image-jpg-fbbf10.jpg"
        }
      ],
      "marketing": {
        "url": "https://movedata-tickets-p2p.raisely.com/signup"
      },
      "createdAt": "2025-08-18T17:52:20.472Z",
      "modifiedAt": "2025-08-18T17:52:20.472Z"
    }
  ],
  "primaryContact": {
    "key": "fc111767-04b9-4857-8e30-6de5410f8c76",
    "partyType": "person",
    "firstName": "Test3",
    "lastName": "Test3",
    "email": "jgilray+test3@movedata.io",
    "custom": {
      "preferredName": "Test3",
      "accessToken": "f9c8914cd75eeeaa855a390bd6c5a014"
    },
    "createdAt": "2025-08-18T17:52:20.346Z",
    "modifiedAt": "2025-08-18T17:52:20.346Z"
  },
  "catalog": [
    {
      "key": "6ed1f470-11f0-11ed-8a36-e3647ae37c84",
      "code": "GEN-TICKET-001",
      "name": "Ticket",
      "status": "active",
      "type": "ordinary",
      "price": 100,
      "custom": {
        "type": "TICKET",
        "soldCount": 23
      }
    },
    {
      "key": "DISCOUNT",
      "code": "DISCOUNT",
      "name": "Discount",
      "status": "active",
      "type": "discount",
      "price": -1
    }
  ],
  "order": {
    "key": "16610d60-7c5c-11f0-8835-f7626ee78b71",
    "code": "ORD-352847",
    "status": "complete",
    "total": 0,
    "items": [
      {
        "key": "166245e0-7c5c-11f0-8835-f7626ee78b71",
        "code": "T-12003517",
        "status": "complete",
        "catalogKey": "6ed1f470-11f0-11ed-8a36-e3647ae37c84",
        "quantity": 1,
        "unitPrice": 100,
        "total": 100,
        "description": "Ticket",
        "custom": {
          "status": "ISSUED",
          "attendance": "VALID"
        }
      },
      {
        "key": "16668ba0-7c5c-11f0-8835-f7626ee78b71",
        "code": "T-12003518",
        "status": "complete",
        "catalogKey": "DISCOUNT",
        "quantity": 1,
        "unitPrice": -100,
        "total": -100,
        "description": "Discount",
        "custom": {
          "status": "ISSUED",
          "attendance": "VALID"
        }
      }
    ],
    "processor": "generic",
    "custom": {},
    "createdAt": "2025-08-18T17:52:20.279Z"
  },
  "custom": {
    "apiSource": "order.succeeded",
    "transactionId": "16610d60-7c5c-11f0-8835-f7626ee78b71"
  }
}
```

</details>

### Reference

#### Schema Reference

{% content-ref url="schema.md" %}
[schema.md](schema.md)
{% endcontent-ref %}

#### Related Entities

{% content-ref url="address.md" %}
[address.md](address.md)
{% endcontent-ref %}

{% content-ref url="brand.md" %}
[brand.md](brand.md)
{% endcontent-ref %}

{% content-ref url="campaign.md" %}
[campaign.md](campaign.md)
{% endcontent-ref %}

{% content-ref url="catalog.md" %}
[catalog.md](catalog.md)
{% endcontent-ref %}

{% content-ref url="communication.md" %}
[communication.md](communication.md)
{% endcontent-ref %}

{% content-ref url="marketing.md" %}
[marketing.md](marketing.md)
{% endcontent-ref %}

{% content-ref url="order.md" %}
[order.md](order.md)
{% endcontent-ref %}

{% content-ref url="orderitem.md" %}
[orderitem.md](orderitem.md)
{% endcontent-ref %}

{% content-ref url="organisation.md" %}
[organisation.md](organisation.md)
{% endcontent-ref %}

{% content-ref url="person.md" %}
[person.md](person.md)
{% endcontent-ref %}

{% content-ref url="question.md" %}
[question.md](question.md)
{% endcontent-ref %}

{% content-ref url="relationship.md" %}
[relationship.md](relationship.md)
{% endcontent-ref %}
