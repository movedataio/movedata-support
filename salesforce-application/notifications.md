# Notifications

### Understanding MoveData Notifications

MoveData notifications are the standardised data packages that flow through the MoveData lifecycle, transforming fundraising platform events into actionable Salesforce records. The Notifications interface provides comprehensive visibility and management capabilities for these data transactions, ensuring your integrations operate smoothly and reliably.

#### What Are Notifications?

A notification represents a single event or transaction that has been captured from your fundraising platform and processed through the MoveData transformation pipeline. Each notification contains all the necessary information to create or update records in Salesforce, including:

* **Primary event data** from the original transaction
* **Supporting context** such as donor information and campaign details
* **Execution logs** showing how the data was processed
* **Salesforce objects** listings the records that were involved in the transaction

### Accessing Notifications

#### Navigation

1. **Open MoveData**: From your Salesforce org, navigate to the App Launcher and select "MoveData"
2. **Access Notifications**: Click on the "Notifications" tab within the MoveData Lightning application
3. **View All Notifications**: The interface opens to the "All Notifications" list view showing your complete notification history

### Notifications List View

The Notifications interface displays a comprehensive list of all notifications processed by MoveData, with the following key elements:

#### **List View Header**

* **Total Count**: Shows the number of notifications (e.g., "116 items")
* **Search Bar**: Located in the top right for finding specific notifications
* **Filter Controls**: Advanced filtering options to narrow down results

#### **Notification Columns**

* **Key**: Unique notification identifier (clickable link to notification details)
* **Name**: Descriptive name showing the platform and event type
* **Platform**: Source platform (Raisely, GiveEasy, etc.)
* **Created**: Date and time when the notification was first received
* **Updated**: Date and time of the last modification to the notification
* **Status**: Current processing status of the notification

#### Notification Statuses

MoveData notifications can have several status values that indicate their current state:

**Success**: The notification has been successfully processed and executed in Salesforce. All associated records have been created or updated correctly.

**Skipped**: The notification was intentionally skipped based on your business rules or configuration settings. This is normal behaviour for certain types of events.

**Failed**: An error occurred during processing or execution. The notification requires attention before it can be successfully applied to Salesforce.

**Processing / Queued**: The notification is currently being transformed and prepared for execution in Salesforce.

#### Filtering and Searching Notifications

#### Pre-built Filter Views

MoveData provides several pre-built filter views accessible from the dropdown menu next to "All Notifications":

* **All Notifications**: Complete list of all notifications
* **Successful Notifications**: Only notifications with "Success" status
* **{Platform} Notifications**: A view for each platform you are integrated with
* **Successful Batch Jobs**: Successfully completed batch processing jobs
* **Failed Batch Jobs**: Batch jobs that encountered errors

#### Advanced Filtering

Use the filter panel to create custom views:

1. **Add Filter**: Click "Add Filter" to create custom filter criteria
2. **Available Fields**: Filter by Name, Status, Updated, Created, Review, Platform, or Type
3. **Multiple Conditions**: Combine multiple filters for precise results
4. **Save**: Applies the filter combination and updates the list view

#### Search Functionality

The search bar allows you to quickly locate specific notifications:

* Search by notification name or description
* Search by donor names or platform identifiers
* Use partial text matching to find related notifications

#### Context Menu

At the end of each notification is a context menu with the following options:

Each notification row includes an action menu (accessed via the dropdown arrow) with the following options:

**View**: Opens the detailed notification view showing complete processing information, raw data, and transformation results.

**View in a new tab**: Opens the notification details in a separate browser tab, useful for comparing multiple notifications.

**Reprocess**: Attempts to process the notification again, useful for notifications that initially failed due to temporary issues.

**Mark for review**: Flags the notification for manual review, adding it to a special review queue for investigation.

### Notification Details

