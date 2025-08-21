---
description: How to get MoveData installed and running in 45 minutes
---

# Quickstart

## Overview

Get your MoveData integration up and running in Salesforce in 30-60 minutes. This guide follows the exact process demonstrated in our setup video, walking you through a complete integration with Raisely as an example.

{% embed url="https://www.youtube.com/watch?v=qlzpclwUBoU" %}

Follow along with James Kent as he demonstrates the complete setup process

## What You'll Accomplish

By completing this quickstart, you'll have:

* ✅ MoveData installed and authorised in your Salesforce org
* ✅ Raisely (or your chosen platform) connected
* ✅ Live demonstration of donations flowing automatically into Salesforce
* ✅ Understanding of how MoveData transforms fundraising data into Salesforce records

## Before You Begin

{% hint style="info" %}
**Tip**: We strongly recommend using a Sandbox environment while learning about MoveData, as shown in the video.
{% endhint %}

**Time Required:** 30-60 minutes

**Prerequisites:**

* **Salesforce Administrator permissions** with either Nonprofit Success Pack (NPSP) or Nonprofit Cloud
* **Raisely account** (free to set up) or access to your existing fundraising platform
  * You can sign up for Raisely at [https://admin.raisely.com/start](https://admin.raisely.com/start).
* **Payment gateway setup** if using Raisely (Stripe test account works for demonstration)
  * You can sign up with Stripe at [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register).

## The Quickstart Setup Process

### Step 1: Install MoveData

_Video timestamp: 2:50_

**Quick Actions:**

* Visit the [Salesforce AppExchange](https://appexchange.salesforce.com) and search for "MoveData"
* Click "Get It Now" and select your Salesforce environment
* Choose "Install for Admins Only"
* Click "Install" and grant access when prompted
* Wait 3-5 minutes for installation to complete

**✅ Success Check:** MoveData appears under Setup → Installed Packages and in your App Launcher

### Step 2: Complete Setup Wizard

_Video timestamp: 3:31_

**Quick Actions:**

* Open MoveData from the App Launcher - this will start the configuration wizard
* Wait for automatic configuration to complete (\~2 minutes)
* Click "Authorise MoveData" to grant OAuth permissions
* Review permissions and click "Allow" in the popup window
* Return to Salesforce and click "Next"

**Extension Installation:**

* Install the extension that matches your Salesforce setup:
  * **NPSP**: Install "Extension: Fundraising & Donations"
  * **Nonprofit Cloud**: Install "MoveData Nonprofit Cloud Extensions"
* Click "Install" and wait for completion
* Click "Finish" when extensions are installed

**✅ Success Check:** Wizard shows "Successfully Authorised" and your extension appears in Installed Packages

### Step 3: Configure Duplicate Rules (5 minutes)

_Video timestamp: 5:16_

**Critical Configuration Step:** You must modify Salesforce duplicate rules to work with MoveData.

{% hint style="warning" %}
**Important**: If duplicate rules remain set to "Alert", MoveData will fail to process records when duplicates are detected.
{% endhint %}

**Quick Actions:**

* Navigate to Setup → Duplicate Management → Duplicate Rules
* For each rule (Contact, Account, etc.):
  * **Change "Alert" to "Report"** for both "Operation on Create" and "Operation on Edit"
  * This prevents MoveData from failing when duplicates are detected

**✅ Success Check:** All duplicate rules show "Report" instead of "Alert"

**Need Help?** [Detailed duplicate rules guide →](https://docs.movedata.io/en/articles/9144672-step-4-configure-duplicate-rules-5min)

### Step 4: Create Your Integration

_Video timestamp: 6:14_

These instructions explain how to get going using Raisely.  If you wish to use another integration, please select it from the New Integration dialog and follow the appropriate integration guide.

**Quick Actions:**

* In MoveData, navigate to the "Integrations" tab
* Click "New Integration"
* Select "Raisely" (or your chosen platform)
* Enter a name for your integration and click "Next"

**\[Raisely] Get Your API Key:**

* In Raisely: Go to Settings → API & Webhooks
* Copy your API Key
* Return to Salesforce and paste the API key
* Configure processor options (use defaults for quickstart)
* Click "Save"

**\[Raisely] Configure Webhook:**

* Copy the MoveData endpoint URL from your integration
* Return to Raisely → Settings → API & Webhooks
* In the "Add a Webhook" section:
  * Paste the MoveData URL
  * Select these events (as shown in video):
    * Profile Created
    * Profile Updated
    * Profile Deleted
    * Donation Created
    * Donation Succeeded
    * Donation Updated
    * Donation Refunded
    * Subscription Updated
* Click "Add Webhook"

**\[Raisely] Payment Gateway Setup:**

* In Raisely: Go to Settings → Payments and Receipts
* Set up Stripe (test mode is fine for demonstration)
* This enables donations to be processed

**✅ Success Check:** If using Raisely, a skipped notification should be visible in the Notification List View; this is a test connection notification from Raisely.

### Step 5: Process a Test Donation

_Video timestamp: 8:47_

**Create a Fundraiser:**

* Navigate to your Raisely donation site
* Click "Fundraise as an individual"
* Set up a test fundraiser (e.g., "Dean Jones" as shown in video)
* Complete the fundraiser profile setup

**Make a Test Donation:**

* Navigate to the fundraiser's page
* Make a donation using test details:
  * Amount: $55 (or any amount)
  * Set as recurring if desired
  * Use test card: 4242 4242 4242 4242, future expiry, 123 CVC
* Complete the donation process

**✅ Success Check:** Donation is successful and you can see a profile and donation notification in the MoveData Notification List View.

### Step 6: Verify Results in Salesforce (5 minutes)

_Video timestamp: 10:52_

**Check Your Data:**

* Return to MoveData → Notifications tab
* You should see notifications for:
  * Profile creation (fundraiser)
  * Donation processing (donor)

**Verify Salesforce Records:**

* **Contact Record**: Donor contact created with correct details
* **Campaign Record**: Fundraiser's campaign/page created
* **Gift/Opportunity Record**: Donation record with:
  * Correct amount ($55 + platform fee in video example)
  * Linked to donor contact
  * Attributed to fundraiser's campaign
  * Recurring schedule if applicable

**✅ Success Check:** All records are created correctly and relationships are established

## 🎉 Congratulations!

You've successfully completed the MoveData setup! As demonstrated in the video, you now have real-time data synchronisation flowing from your fundraising platform directly into Salesforce.

## What's Next?

#### Immediate Actions

* [ ] **Test additional scenarios** - Try different donation amounts and types
* [ ] **Monitor notifications** - Watch the Notifications tab for any issues
* [ ] **Explore the data** - Click through the created records to understand the data model

#### Expand Your Integrations

* [ ] **Connect other platforms** - Set up integrations with additional fundraising tools
* [ ] **Customise mappings** - Add custom fields or business logic as needed

#### Advanced Features

* **Marketing Attribution** - Track campaign sources and UTM parameters
* **Refund Processing** - Handle donation refunds automatically
* **Custom Business Rules** - Use Lightning Flows for organisation-specific logic

