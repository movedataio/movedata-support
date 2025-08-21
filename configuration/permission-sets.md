# Permission Sets

## Overview

MoveData uses Salesforce permission sets to control user access to the application and its features. Proper permission assignment ensures that your team members can access MoveData functionality whilst maintaining appropriate security controls within your Salesforce org.

{% hint style="info" %}
**Quick Check**: If you can open MoveData from the App Launcher and successfully process notifications, your permissions are already configured correctly for your account and you can skip this step.
{% endhint %}

## Understanding MoveData Permissions

MoveData permissions are organised into two main categories:

**Application Permissions**: Core access to the MoveData Lightning App and basic functionality **Extension Permissions**: Specific access required for each MoveData extension you've installed (such as Fundraising and Donations, Commerce, etc)

Both permission types must be assigned to users who need to work with MoveData in your organisation.

## Assign Application Permissions

<figure><img src="../.gitbook/assets/Permission Sets in Salesforce Setup .png" alt=""><figcaption></figcaption></figure>

### Access Permission Sets

1. **Navigate to Setup**: From your Salesforce org, click the gear icon and select "Setup"
2. **Find Permission Sets**: Go to Setup → Users → Permission Sets
3. **Locate MoveData Application**: Find and open the "MoveData Application" permission set

### Add Users to Application Permissions

1. **Manage Assignments**: Click "Manage Assignments" within the MoveData Application permission set
2. **Add Users**: Click "Add Assignments" and select users who need access to MoveData
3. **Save Changes**: Confirm your selections and save the assignments

### Application Permission Features

The MoveData Application permission set provides:

* **MoveData App**: Makes MoveData visible in the Salesforce App Launcher
* **Basic Object Access**: Read and write permissions for core MoveData objects
* **Navigation Rights**: Access to MoveData tabs and Lightning App components

## Assign Extension Permissions

<figure><img src="../.gitbook/assets/Examples of MoveData Extension Permission Sets.png" alt=""><figcaption></figcaption></figure>

### Identify Required Extensions

Extension permission sets are created automatically when you install MoveData extensions during the setup wizard. Common extensions include:

* **MoveData NPSP Extensions**: For Nonprofit Success Pack data models
* **MoveData Nonprofit Cloud Extensions**: For Nonprofit Cloud data models
* **MoveData Commerce Extensions**: For ticketing and commerce functionality

### Locate Extension Permission Sets

1. **Return to Permission Sets**: Navigate to Setup → Users → Permission Sets
2. **Find Extension Sets**: Look for permission sets beginning with "MoveData" followed by your extension name
3. **Select Appropriate Set**: Choose the permission set corresponding to your installed extensions

### Assign Extension Permissions

1. **Open Extension Permission Set**: Click on the relevant MoveData extension permission set
2. **Manage Assignments**: Click "Manage Assignments"
3. **Add Authorised User**: Add the MoveData authorised user (found in MoveData → Settings → General → Authorise MoveData)
4. **Add Additional Users**: Include any other users who need to work with the specific extension functionality

## Common Permission Issues

### MoveData Not Visible in App Launcher

**Cause**: User not assigned to MoveData Application permission set **Solution**: Add user to the MoveData Application permission set following the steps above

### Integration Processing Errors

**Cause**: Authorised user missing extension permission sets **Solution**: Verify the authorised user has all relevant MoveData extension permission sets assigned

### Insufficient Object Permissions

**Cause**: Users lack access to underlying Salesforce objects (Contacts, Opportunities, etc.) **Solution**: Review and assign appropriate Salesforce object permissions through profiles or permission sets
