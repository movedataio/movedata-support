# About the MoveData Authorised User

{% hint style="info" %}
Metadata

* category=Technical
* tags=authorised user,user,authentication,settings
{% endhint %}

## Overview

MoveData requires permission to access your Salesforce instance. This is to facilitate the pushing of notifications from connected platforms into Salesforce. This article details the options available to an organisation regarding the authorised user and associated permissions.

There are three considerations when configuring the authorised user:

* The User that MoveData will execute under
* The Profile & Licence attached to the executing user
* The Permission Sets attached to the executing user

## Authorised User

There are two approaches to a MoveData user that organisations use:

* Dedicated MoveData User
* General System Administrator User

### Dedicated MoveData User

A dedicated MoveData user is the most secure and traceable approach. This is because a dedicated user allows your organisation to clearly see all changes made by the authorised user. It also provides greater controls around the operation of the authorised user given permissions can be focused specifically for your integration. However, this may come with a greater cost as a dedicated Salesforce Licence is required.

### General System Administrator User

A shared authorised user is a common approach, often named `System Administrator` or `System Integration`. This approach allows your organisation to share the cost of a single licence across multiple purposes and/or integrations, resulting in lower Salesforce licensing fees.

## Salesforce Profiles & Licences

MoveData will execute as the authorised user and, as required by Salesforce, a user must have a Salesforce Profile assigned. The options for this profile are listed below:

* Salesforce System Administrator Profile and Licence
* Salesforce User Profile and Licence
* Salesforce Integration Licence

### Salesforce System Administrator Profile and Licence

Most organisations will run MoveData under a user with the `System Administrator` profile. Using the `System Administrator` profile provides the lowest maintenance solution but does allow access to all data and elevated privileges in your Salesforce Org. However, this is often necessary as the authorised user will typically require access to core fields, objects and records to process notifications into Salesforce.

### Salesforce User Profile & Licence

Larger organisations may elect to use a general or existing customised profile under a standard licence for their MoveData implementation. In this scenario, the assigned profile will need to provide all required permissions for the integration to function. Core MoveData operations can be granted by assigning the MoveData-maintained permission sets which is covered in [Granting MoveData Permissions](https://intercom.help/movedata/en/articles/9151851).

### Salesforce Integration Licence

MoveData does not support the free `Salesforce Integration` licence ([link](https://help.salesforce.com/s/articleView?id=release-notes.rn_api_integration_license.htm\&release=242)). This is due to the limited API-only nature of these licences. The MoveData User must be able to an Apex Endpoint in our managed package and this is not permitted using the `Salesforce Integration` licence.

## Permission Sets

MoveData provides Permission Sets for the core application (`MoveData Application`) and Extensions (for example, `MoveData NPSP Extensions`). These are configured to provide the minimum permissions required for the MoveData application and extensions to run. However, these do not take into consideration any additional business logic you might implement into your integration. If you are reading or setting additional fields as part of your implementation, permissions to these fields and objects will need to be made available via the user's profile or additional permission sets.

### Common Configuration

It is common for organisations to have a general `System Administrator` user with the `System Administrator` profile being shared across a number of integrations and functions. With the MoveData permission sets assigned, this is user is typically ready for use.

## Authorise MoveData

To specify the user MoveData is to execute under you first need to login as the desired user. Once you have logged in, open MoveData using the Salesforce App Launcher and select the `Settings` tab. If the `MoveData` application is not visible in the App Launcher, the logged in user does not have the requisite permissions required to administer MoveData

<figure><img src="../.gitbook/assets/MoveData Settings Navigation Button.png" alt=""><figcaption><p>Settings Tab in the Salesforce MoveData App</p></figcaption></figure>

On the `General` you will see a section called `Authorise MoveData`. Click the `Authorise` button and a new tab will open to authorise MoveData under the user you are logged in as.

<figure><img src="../.gitbook/assets/settings_general_authorised_user (1).png" alt=""><figcaption><p>Authorise MoveData on Settings Page</p></figcaption></figure>

Salesforce will note that MoveData requires full access to Salesforce at any point in time. This is required for MoveData to function

<figure><img src="../.gitbook/assets/Salesforce Grant Access Screen.png" alt=""><figcaption><p>Salesforce Grant Access Screen</p></figcaption></figure>

Once you click `Allow` you will be presented with the following success screen

<figure><img src="../.gitbook/assets/MoveData OAuth Success Screen.png" alt=""><figcaption><p>MoveData OAuth Success Screen</p></figcaption></figure>

## Revoke Access

To revoke access, note the authorised user and open their User record via Setup (`Setup → Users → User`). Scroll down the page until you see `OAuth Apps`

<figure><img src="../.gitbook/assets/OAuth Apps on a Salesforce User Record.png" alt=""><figcaption><p>OAuth Apps on a Salesforce User Record</p></figcaption></figure>

Find a `MoveData` entry under Application and click the `Revoke` link. All future notifications will encounter the following error and will be marked as `Failed`:

<figure><img src="../.gitbook/assets/MoveData Notification with Revoked Access .png" alt=""><figcaption><p>MoveData Notification with Revoked Access</p></figcaption></figure>
