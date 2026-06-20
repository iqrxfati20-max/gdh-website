---
name: Size-based pricing for Gorakhpur Diaper House
description: How per-size prices are structured and consumed across the shop
---

## Rule
`Product.sizes?: SizePricing[]` — each entry is `{ size: string; price: number; oldPrice: number }`. When present they override `product.price` for cart totals, the size picker modal display, and WhatsApp order messages.

**Why:** Some products (diapers) have different prices per size; a single product listing should cover all sizes without duplicating the product row.

**How to apply:**
- Admin add/edit form has a "Sizes & Pricing" section with dynamic add/remove rows.
- `ProductCard` checks `product.sizes?.length`; if truthy, shows per-size prices in the modal grid; falls back to `DIAPER_SIZES[category]` for generic diaper sizes with no custom prices.
- `CartSidebar` uses `getItemPrice(product, item.size)` for both subtotal and WhatsApp message.
- Products without `sizes` (or `sizes: []`) use `product.price` unchanged.
