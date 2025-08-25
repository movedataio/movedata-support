# Campaign

* `salesforceKey`: Salesforce platform key for the campaign - used for CRM integration
* `key`: Unique identifier for the campaign in the dispatching platform
* `type`: Type of fundraising campaign (campaign, organisation, team, or fundraiser)
* `name`: Display name of the fundraising campaign
* `description`: Detailed description of the campaign purpose and goals
* `pageUrl`: Public URL where the campaign page can be accessed
* `logoUrl`: URL to the campaign's logo or main image
* `status`: Current status of the campaign (draft, live, or active)
* `targetAmount`: Target fundraising amount for the campaign
* `amount`: Current amount raised for the campaign
* `currency`: Currency code for the campaign amounts (e.g., USD, EUR, AUD)
* `primaryContact`: Primary contact person or organization for the campaign [📖 Person](person.md) and [📖 Organisation](organisation.md)
* `mailingAddress`: Mailing address for the campaign organization
* `otherAddress`: Secondary or alternative address for the campaign
* `eventDate`: Date when the campaign event will take place (if applicable)
* `startDate`: Campaign start date
* `endDate`: Campaign end date
* `tribute`: Tribute information if this is a memorial or honor campaign
* `custom`: Custom key-value pairs for platform-specific data
* `questions`: Array of custom questions associated with the campaign
* `marketing`: Marketing tracking information (UTM parameters, etc.)
* `createdAt`: Timestamp when the campaign was created
* `modifiedAt`: Timestamp when the campaign was last modified