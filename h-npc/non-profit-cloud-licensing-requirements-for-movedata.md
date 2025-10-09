# Non-Profit Cloud Licensing Requirements for MoveData

### Overview <a href="#h_b68d6c888e" id="h_b68d6c888e"></a>

When using MoveData with Salesforce Nonprofit Cloud (NPC), specific licensing requirements must be met to ensure proper functionality with NPC objects such as GiftTransactions. This article outlines the essential licensing and permission requirements for successful MoveData integration with Nonprofit Cloud.

### Licensing Requirements <a href="#h_72b16dc539" id="h_72b16dc539"></a>

### FundraisingAccess Permission Requirement <a href="#h_b4c6dbba1c" id="h_b4c6dbba1c"></a>

MoveData requires access to Nonprofit Cloud's FundraisingAccess permission set to work with NPC-specific objects including:

* GiftTransaction - Individual donation records in Nonprofit Cloud
* GiftCommitment - Recurring donation commitments
* Related NPC fundraising objects - Additional objects within the Nonprofit Cloud fundraising data model

Important: Without the FundraisingAccess permission set, MoveData cannot read from or write to these critical Nonprofit Cloud objects, resulting in integration failures.

### Permission Set Assignment Requirements <a href="#h_0a8a8f847d" id="h_0a8a8f847d"></a>

### 1. Authorised MoveData User <a href="#h_7ceeb1a2f6" id="h_7ceeb1a2f6"></a>

The authorised MoveData user (configured during setup) must have the FundraisingAccess permission set assigned. This user account is used by MoveData to:

* Process incoming donation data
* Create and update GiftTransaction records
* Manage GiftCommitment records for recurring donations
* Execute all Nonprofit Cloud-related integration flows

To locate your authorised user:

1. Navigate to MoveData → Settings → General → Authorise MoveData
2. Note the authorised user account displayed

### 2. Flow Builders and Developers <a href="#h_2a0ec83b32" id="h_2a0ec83b32"></a>

Any Salesforce user who needs to build, modify, or debug MoveData flows that interact with NPC objects must also have FundraisingAccess permissions assigned. This includes:

* Flow builders creating custom donation processing logic
* Administrators troubleshooting integration issues
* Developers extending MoveData functionality
* Any user who needs to view or modify flows that reference GiftTransaction or GiftCommitment objects

### Assignment Instructions <a href="#h_95040adbcf" id="h_95040adbcf"></a>

### Step 1: Access Permission Sets <a href="#h_b0963db5bd" id="h_b0963db5bd"></a>

1. Navigate to Setup: Click the gear icon and select "Setup"
2. Find Permission Sets: Go to Setup → Users → Permission Sets
3. Locate FundraisingAccess: Search for and open the "FundraisingAccess" permission set

### Step 2: Assign to Authorised User <a href="#h_c4a6c8d23c" id="h_c4a6c8d23c"></a>

1. Manage Assignments: Click "Manage Assignments" within the FundraisingAccess permission set
2. Add Authorised User: Click "Add Assignments"
3. Select MoveData User: Choose the authorised MoveData user (from MoveData Settings)
4. Save Assignment: Confirm the selection and save

### Step 3: Assign to Additional Users <a href="#h_4a55fac19d" id="h_4a55fac19d"></a>

1. Add Flow Builders: Include any users who build or modify MoveData flows
2. Save All Assignments: Confirm all selections and save
