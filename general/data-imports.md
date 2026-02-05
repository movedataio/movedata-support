# Data Imports

{% hint style="info" %}
Metadata

* group=Business
* category=Business
* subtitle=An overview of MoveData data imports
* integration=all
* tags=data,data import,data migration
{% endhint %}

MoveData will only import information when instructed to do so by the source platform.

In practice, the source platform will not issue updates against historical information for MoveData to automatically receive and process into Salesforce. Thus, technical effort from MoveData is required to process historical information into Salesforce at a point-in-time basis.

### Fees <a href="#h_ced63372bc" id="h_ced63372bc"></a>

MoveData provides data import services at a fixed rate of 4h, per platform, per environment. Thus if you were import data from one platform into Production only, the fee would be 4h (4 x 1 x 1) charged at your local rate. If you were to import data from two platforms, into Sandbox and then into Production, the fee would be 16h (4 x 2 x 2) charged at your local rate.

### Terms <a href="#h_d101b4e10f" id="h_d101b4e10f"></a>

MoveData requires a Statement of Work in place for data imports, and the data import will be performed according to the terms in your Statement of Work. Specifically for data imports please note the following terms as extracted from our Statement of Work:

* **Development Environment**\
  \&#xNAN;_You will provide access to a development environment which is an accurate reflection of Production. If MoveData functionality passes Acceptance Testing in the development environment, and that same MoveData functionality is deployed to Production, and an error occurs in Production which does not occur in the development environment, then you will be responsible for remediating this issue and MoveData shall have no liability in this case._
*   **Testing is Final**

    _When Acceptance Testing is passed in the development environment, your integration will be deployed into your production environment. If there are any errors in your production environment due to configuration difference, lack of testing, different dataset etc versus the development environment, then MoveData is not responsible for remediating, correcting or rectifying any records which have already been processed into that environment._
*   **Existing Records**

    _MoveData does not map to existing records by default. If you need MoveData to map to existing records, please contact your Project Manager who will provide documentation and advice on how you can map MoveData to existing records. This is a task which you, and not MoveData, will need to perform (for we have no context of your existing records). MoveData is not responsible for scenarios where an existing record is not matched, or for any error or modification which might occur against a matched record._
*   **Data Imports**

    _If your project contains a requirement to import historical information then this is performed on an as-is basis. MoveData has no control over how information has been captured or surfaced historically by yourself or the platform being integrated. MoveData is not responsible for making changes to accommodate data which has been captured or surfaced in a historically different manner, nor is responsible for any errors which may occur for this reason._
*   **No control over Source Platform Data**

    _MoveData has no control over the data the source platform issues. Whenever data is issued by the source platform, it will be received by MoveData and processed into Salesforce. As an integration tool MoveData trusts that information the source platform issues is accurate, and will process that information into Salesforce accordingly. MoveData is not responsible for any errors which may occur due to information being issued incorrectly, or not issued at all, by the source platform._
*   **Source Platform Functionality**

    _MoveData does not warrant that it integrates every single aspect of the source platform. Please check that the information you are seeking to integrate is supported by MoveData. MoveData takes no responsibility for information which is not integrated due to not being supported by MoveData._

### Imports with Large Volume of Records <a href="#h_e28037a0f3" id="h_e28037a0f3"></a>

MoveData reserves the right to refuse to perform a data import. In practice, this is where you may have a large volume of notifications to be imported (e.g. X00,000) and MoveData may not the right tool for the job.

If you require a data import, please contact your Account Manager. The mechanics for data imports differ between source platforms and your Account Manager will share with you what is required to import data from your desired platform(s).
