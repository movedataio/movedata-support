# Duplicate Campaigns created for Events

{% hint style="info" %}
Metadata

* category=JustGiving
* integration=justgiving
* tags=data,campaign
{% endhint %}

Occasionally you can receive two copies of the same JustGiving event created as Campaign records in Salesforce. This occurs when JustGiving attaches one Fundraiser to an Event and another fundraiser to a Campaign.

JustGiving Payload with Campaign Information Absent

```
{
  "scope": "fundraiser",
  "event": {
    "name": "London Marathon 2024",
    "description": "",
    "id": 8149436,
    "completionDate": "/Date(1713657600000+0000)/",
    "expiryDate": "/Date(1721520000000+0000)/",
    "startDate": "/Date(1713657600000+0000)/",
    "eventType": "Running_Marathons",
    "location": ""
  },
  "campaign": null,
```

JustGiving Payload with Campaign Information Present

```
{
  "scope": "fundraiser",
  "event": {
    "name": "London Marathon 2024",
    "description": "",
    "id": 8149436,
    "completionDate": "/Date(1713657600000+0000)/",
    "expiryDate": "/Date(1721520000000+0000)/",
    "startDate": "/Date(1713657600000+0000)/",
    "eventType": "Running_Marathons",
    "location": ""
  },
  "campaign": {
    "BrandingGuid": "00000000-0000-0000-0000-000000000000",
    "CampaignGuid": "14de24fc-1a16-4e9c-8b2c-0463371a2fe0",
    "Charities": [
      {
        "Id": 2135
      }
    ],
    "Currency": {
      "CurrencyCode": "GBP",
      "CurrencySymbol": "£"
    },
    "DonationSummary": {
      "DirectDonationAmount": 50,
      "DirectDonationGiftAid": 12.5,
      "FundraiserRaisedAmount": 16749.82,
      "NumberOfDirectDonations": 1,
      "NumberOfFundraiserDonations": 455,
      "OfflineAmountUpdated": "/Date(1713008330586+0000)/",
      "TotalAmount": 16799.82,
      "TotalGiftAid": 2694.28,
      "TotalNumberOfDonations": 456,
      "offlineAmount": 0
    },
    "EndDate": "/Date(1718668799999)/",
    "EventRegistrationLink": null,
    "Fundraising": {
      "Defaults": {
        "HeroImage": {
          "ImageName": "8797af7c-c406-426b-a28e-8599343d36a3.jpg",
          "Title": ""
        },
        "Story": "I am running the London Marathon 2024 for Family Holiday Charity. \n\nFamily Holiday Charity sends families facing tough times on a much-needed holiday. Many families they support are struggling with additional caring responsibilities, bereavement, long-term illness, isolation, and mental health challenges, or are survivors of abuse. \n\nThis year, my fundraising target is £1,854 to reflect the 1,854 families they sent on a life-changing holiday in 2022. Donate now to help me reach my target and to support Family Holiday Charity to help even more families in 2024.\n\nThank you! ",
        "TargetAmount": 1854,
        "Title": "London Marathon 2024"
      },
      "FundraisingPageUrl": "",
      "IsEnabled": true,
      "IsTargetHidden": false,
      "StartFundraisingUrl": "https://www.justgiving.com/create-page?campaignGuid=14de24fc-1a16-4e9c-8b2c-0463371a2fe0"
    },
    "LandingPageUrl": null,
    "OfflineAmount": 0,
    "OfflineAmountUpdated": "/Date(1713008330586+0000)/",
    "ShortName": "familyholidaylondonmarathon",
    "StartDate": "/Date(1684972800000)/",
    "Status": "ACTIVE",
    "Story": "[{\"type\":\"paragraph\",\"nodes\":[{\"ranges\":[{\"text\":\"The atmosphere on the day is electric with crowds of people cheering you on. Family Holiday Charity will have two dedicated cheer spots at Mile 6 and Mile 24 to cheer you on as well.\"}],\"type\":\"text\"}]},{\"type\":\"paragraph\",\"nodes\":[{\"ranges\":[{\"text\":\"TCS London Marathon is Family Holiday Charity’s biggest challenge race. We offer some special benefits for participants including a post-race pizza party (where you can celebrate with your family and friends afterward), a leg massage to help you keep moving, and our cheer points along the way are a great focal point to help you find your loved ones in the crowd!\"}],\"type\":\"text\"}]},{\"type\":\"paragraph\",\"nodes\":[{\"ranges\":[{\"text\":\"Holidays give families space and time together – to laugh and have fun – as well as rethink, rebuild and refresh. Breaks open up a world of possibilities, bringing long-lasting impact and bringing smiles all around.\"}],\"type\":\"text\"}]}]",
    "Summary": "In 2024, our Team of #HolidayHeroes, made up of 42 runners, will tackle the iconic 26.2-mile route set around the river Thames in the London Marathon. \n\nThe money they raise will help families facing tough times feel the lasting impact of a holiday.",
    "TargetAmount": 78000,
    "ThankYouMessage": "Thank you so much for supporting Family Holiday Charity. \r\n\r\nSpread the word about our current Ice Cream Campaign and download one of our digital badges to share on your social media: https://familyholidaycharity.org.uk/icecream/badges \r\n\r\nYour gift will help children who've never seen the sea, and parents having to choose between a day out and a pair of school shoes. \r\nYou'll help young carers, grandparent carers, and families facing illness, isolation, or bereavement. \r\n\r\nThank you.",
    "Title": "London Marathon 2024"
  },
```

You can choose to suppress this behaviour by opening `MoveData → Integrations → JustGiving → Edit` and setting `Priority for Top-Level Campaign` to `False: Use JG Charity Events over JG Campaigns`.

| Setting                         | Behaviour if True                                                                                        | Behaviour if False                                                                                       |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Priority for Top-Level Campaign | When a value for Campaign is present, and a value for Event is present, uses the Campaign over the Event | When a value for Campaign is present, and a value for Event is present, uses the Event over the Campaign |

The integration will now ignore the Campaign issued by JustGiving and attach both fundraisers to the Event instead.
