---
description: Issue with Commerce extensions with Products with the same SKU
---

# A Product with this SKU already exists

{% hint style="info" %}
Metadata

* group=Extension
* category=Commerce
* subtitle=A overview of "Product with this SKU already exists" error
* extension=commerce
* tags=products
{% endhint %}

**Error Message:**

`Upsert failed. First exception on row 0 with id XXX; first error: DUPLICATE_VALUE, A Product with this SKU already exists.: [StockKeepingUnit]`

**Version:**

MoveData Commerce Extensions before August 2023 (Version 1.114 or earlier)

**Error Message:**

When MoveData creates a product, it applies the product code as the StockKeepingUnit or SKU. If you have a popular product code, such as `Adult` for tickets to events, across multiple campaigns, a failure can occur.

In later versions of the MoveData Commerce Extensions, the default behaviour is not to set the StockKeepingUnit. If you require this set, please set the configuration variable `Config_CatalogSetProductCode` to `true` in the configuration flow.
