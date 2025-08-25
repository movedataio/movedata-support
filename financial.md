# DonationFinancial

* `origin`: The original financial information for the donation.
Represents the amount and currency the donation was made in by the donor. `@type: {IDonationFinancialEntryEntity | null}`
* `settled`: The settled financial information for the donation.
Represents the final amount and currency the donation was settled in
after any currency conversion and final processing. `@type: {IDonationFinancialEntryEntity | null}`