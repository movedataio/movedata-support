# OAuth Error: Approve Uninstalled Connected Apps

{% hint style="info" %}
Metadata

* group=Technical
* category=Technical
* subtitle=Resolve the Salesforce OAuth error "OAUTH\_APPROVAL\_ERROR\_GENERIC" when authorising MoveData, caused by a user profile lacking permission to approve uninstalled connected apps.
* tags=salesforce,oauth,authorise
{% endhint %}

### Overview

When authorising MoveData via **Settings → General → Authorise MoveData** or during the **Setup Wizard**, you may encounter a Salesforce OAuth error page preventing authentication from completing.

This error occurs when the Salesforce user's profile does not have permission to approve access to connected apps that are not installed in the current organisation.

### Error Details

<figure><img src="../.gitbook/assets/Screenshot 2026-02-11 at 1.31.21 pm.png" alt=""><figcaption></figcaption></figure>

**URL Pattern:**

```
https://<mydomain>.my.salesforce.com/setup/secur/RemoteAccessErrorPage.apexp?error=invalid_client&error_description=app+must+be+installed+into+org
```

**Error Message:**

```
We can't authorize you because of an OAuth error. For more information, contact your Salesforce administrator.

OAUTH_APPROVAL_ERROR_GENERIC : An unexpected error has occured during authentication. Please try again.
```

### Cause

The Salesforce user profile assigned to the user attempting to authorise MoveData does not have the **Approve Uninstalled Connected Apps** system permission enabled. This permission is required for MoveData to establish an OAuth connection with Salesforce.

### Resolution

#### Step 1: Enable the Profile Permission

{% hint style="info" %}
**Tip**: If you are unsure which profile the user has, navigate to **Setup → Users**, locate the user, and check their assigned profile.&#x20;
{% endhint %}

1. Navigate to **Setup → Users → Profiles**
2. Open the profile assigned to the user who is authorising MoveData
3. Click **System Permissions**
4. Enable **Approve Uninstalled Connected Apps**
5. Click **Save**

#### Step 2: Authorise MoveData

1. Navigate to **MoveData → Settings → General**
2. Click **Authorise**
3. Log in as the desired user when prompted
4. Grant the necessary permissions
5. Verify the new user appears in the **Authorised User** field

#### Step 3: Restore the Profile Permission

Once MoveData has been successfully authorised, restore the profile permission to its original state:

1. Navigate to **Setup → Users → Profiles**
2. Open the same profile modified in Step 1
3. Click **System Permissions**
4. Disable **Approve Uninstalled Connected Apps**
5. Click **Save**

{% hint style="warning" %}
**Security Best Practice**: Only enable this permission temporarily for the duration of the authorisation process. Disable it once authorisation is complete to maintain your organisation's security posture.
{% endhint %}

### Additional Resources

* [Salesforce Known Issue: OAuth Error with Uninstalled Connected Apps](https://help.salesforce.com/s/articleView?id=005132365\&type=1)
