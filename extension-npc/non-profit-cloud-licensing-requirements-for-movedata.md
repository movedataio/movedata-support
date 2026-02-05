# Non-Profit Cloud Licensing Requirements for MoveData

{% hint style="info" %}
Metadata

* group=Extension
* category=Nonprofit Cloud
* subtitle=An overview on NPC licensing requirements for MoveData
* extension=npc
* tags=install,config
{% endhint %}

### Overview

When using MoveData with Salesforce Nonprofit Cloud (NPC), specific licensing requirements must be met to ensure proper functionality with NPC objects such as GiftTransactions. This article outlines the essential licensing and permission requirements for successful MoveData integration with Nonprofit Cloud.

### Licensing Requirements

### FundraisingAccess Permission Requirement

MoveData requires access to Nonprofit Cloud's FundraisingAccess permission set to work with NPC-specific objects including:

* GiftTransaction - Individual donation records in Nonprofit Cloud
* GiftCommitment - Recurring donation commitments
* Related NPC fundraising objects - Additional objects within the Nonprofit Cloud fundraising data model

Important: Without the FundraisingAccess permission set, MoveData cannot read from or write to these critical Nonprofit Cloud objects, resulting in integration failures.

### Permission Set Assignment Requirements

### 1. Authorised MoveData User

The authorised MoveData user (configured during setup) must have the FundraisingAccess permission set assigned. This user account is used by MoveData to:

* Process incoming donation data
* Create and update GiftTransaction records
* Manage GiftCommitment records for recurring donations
* Execute all Nonprofit Cloud-related integration flows

To locate your authorised user:

1. Navigate to MoveData → Settings → General → Authorise MoveData
2. Note the authorised user account displayed

### 2. Flow Builders and Developers

Any Salesforce user who needs to build, modify, or debug MoveData flows that interact with NPC objects must also have FundraisingAccess permissions assigned. This includes:

* Flow builders creating custom donation processing logic
* Administrators troubleshooting integration issues
* Developers extending MoveData functionality
* Any user who needs to view or modify flows that reference GiftTransaction or GiftCommitment objects

### Assignment Instructions

### Step 1: Access Permission Sets

1. Navigate to Setup: Click the gear icon and select "Setup"
2. Find Permission Sets: Go to Setup → Users → Permission Sets
3. Locate FundraisingAccess: Search for and open the "FundraisingAccess" permission set

### Step 2: Assign to Authorised User

1. Manage Assignments: Click "Manage Assignments" within the FundraisingAccess permission set
2. Add Authorised User: Click "Add Assignments"
3. Select MoveData User: Choose the authorised MoveData user (from MoveData Settings)
4. Save Assignment: Confirm the selection and save

### Step 3: Assign to Additional Users

1. Add Flow Builders: Include any users who build or modify MoveData flows
2. Save All Assignments: Confirm all selections and save
