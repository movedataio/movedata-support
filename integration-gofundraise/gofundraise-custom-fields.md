# GoFundraise Custom Fields

GoFundraise allows you to configure questions on your donation and fundraising page registration forms.

These will not be available in GoFundraise's API (and therefore unavailable to MoveData to process into Salesforce) unless they are mapped to Custom Fields. Please contact [GoFundraise Support](https://support.gofundraise.com/hc/en-us) if you have questions about using their Custom Fields.

When you map responses to custom fields, these are surfaced by GoFundraise in the format of:

* Custom Form Data Field 1
* Custom Form Data Field 2
* Custom Form Data Field 3
* Custom Form Data Field 4
* Custom Form Data Field 5

If you do not use custom fields consistently across GoFundraise, you can unintentionally map different questions to the same custom field.

Question: `How did you hear about us?`\
Answer: `Google`\
API: `"CustomFormData1": "Google",`

Question: `Have you participated in this event previously?`\
Answer: `No`\
API: `"CustomFormData1": "No",`

Question: `Are you over or under 18 years of age?`\
Answer: `Over 18`\
API: `"CustomFormData1": "Over 18",`

Given the only context the integration has is `CustomFormData1`, this makes it impossible to know where to place the value unless `CustomFormData1` has been used consistently across your GoFundraise account.

If you require custom field information mapped to Salesforce, MoveData will ask you for the list of GoFundraise fields / values and the Salesforce equivalents on which they live, and you will need to use your custom fields consistently going forward. MoveData cannot automatically "fix" older records where custom field information may have been recorded in a different pattern.
