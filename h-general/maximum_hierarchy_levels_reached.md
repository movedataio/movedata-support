# MAXIMUM\_HIERARCHY\_LEVELS\_REACHED

Salesforce only allows you to have a maximum of five levels in you campaign hierarchy. Typically, MoveData will reserve up to three levels to represent the equivalent information from your fundraising platform:

| Level | Represents                  | Example                    |
| ----- | --------------------------- | -------------------------- |
| 1     | Campaign / Event            | 2025 World Marathon        |
| 2     | Team Fundraising Page       | Team MoveData              |
| 3     | Individual Fundraising Page | Joe Blogs in Team MoveData |

If you have added multiple parent campaigns above this three level structure, the MAXIMUM\_HIERARCHY\_LEVELS\_REACHED error can be triggered. In this case, you must adjust your parent campaigns so it fits into a five level structure.
