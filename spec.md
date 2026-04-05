# CommuniTrack Mobile Redesign + Tag Bar Removal

## Current State
- Header: 56px tall, contains sidebar toggle (desktop only), logo, category pill bar (all 10 icons + Top500 + MegaAll in one row), search bar, and right-side controls
- Category pill bar: `overflow-x-auto` on mobile causing horizontal scroll, all icons cramped in one row — very cluttered on small screens
- Mobile bottom nav: 4 buttons (Cards, Ledger, Charts, Filters) in a `flex md:hidden` nav at the bottom
- Mobile filter: opens as a slide-in drawer from the left side via `mobileFilterOpen` state
- Tag filter bar (All, Arts, Community, Education, etc.): hidden behind `isFiltersOpen` toggle, inside the workspace, rendered via `uniqueTags`. On mobile this bar shows inside the filter modal drawer too.
- No 5th "category picker" button exists on the mobile bottom nav
- `filterCategory` state drives the tag filter; `uniqueTags` is computed from the data

## Requested Changes (Diff)

### Add
- **5th button on mobile bottom nav**: A "Categories" or grid icon button. When tapped, opens a full-screen overlay/sheet showing all 12 category icons (10 categories + Top500 + MegaAll) in a **2-column grid** layout with icons + labels. Tapping a category selects it and closes the overlay. Fluid slide-up animation when opening, slide-down on close. Selected category shows active highlight in the grid.
- **`mobileCategoryOpen` state** (`useState(false)`) to control the 2-column category picker overlay
- **Category picker overlay**: Fixed positioned, covers full screen from below (slides up from bottom), dark background, 2-column grid of large tap targets (min 64px height), each shows the colored icon + category label, active one highlighted. Close button at top or tap outside to dismiss.

### Modify
- **Mobile header**: On mobile (`md:hidden` / `flex md:hidden` adjustments), simplify header to just: logo + search bar + right controls (currency, MRR/ARR). Remove or hide the category pill bar from the mobile header entirely (`hidden md:flex` on the pill container). On desktop it stays exactly as-is.
- **Mobile bottom nav**: Expand from 4 to 5 buttons: Cards | Ledger | Charts | Filters | Categories (grid icon). The Categories button shows the active category's colored icon (not just a generic grid) so the user always knows what's selected at a glance.
- **Mobile filter drawer**: When open, show filters without the view switcher section (since view switching is now in the bottom nav). Keep all filter options (pricing type, tiers, region, free/paid, sorting).
- **Mobile cards layout**: Full-width single column on phones (`grid-cols-1` on `sm` and below), more generous padding.
- **Tag filter bar (All, Arts, Community, Education...)**: Remove this entire horizontal pill row from both mobile AND desktop. Remove from the filter drawer too. The `filterCategory` and `setFilterCategory` state and related filtering logic (`uniqueTags`, the filter predicate) should all be removed to clean up code. This includes removing the `isFiltersOpen` filter bar section that houses the tag pills (though other controls in that section like the free/tiers filters should stay).

### Remove
- Tag filter bar ("All", "Arts", "Community", "Education", etc.) from both mobile filter drawer and desktop workspace header area
- Category pill bar from mobile header (move category selection to the 5th bottom nav button)
- The `filterCategory` state, `uniqueTags` computation, and tag filtering predicate (or keep state but remove the UI)

## Implementation Plan
1. Add `mobileCategoryOpen` state alongside `mobileFilterOpen`
2. Add `Grid3x3` (or `LayoutGrid`) icon import for the 5th bottom nav button
3. Modify mobile bottom nav: add 5th "Categories" button that shows the current category's icon in its color; on click sets `mobileCategoryOpen(true)`
4. Build the category picker overlay component (inline JSX, no separate component needed): fixed full-screen, slides up from bottom with CSS transform transition, 2-column grid of 12 categories, each item = colored icon + label + active highlight. On category tap: call `handleCategorySwitch`, close overlay.
5. Hide the category pill bar from mobile: add `hidden md:flex` to the pill container div
6. Remove the tag filter bar (the `uniqueTags` pills row with "All", "Arts", "Community", "Education") from both the desktop `isFiltersOpen` section and the mobile filter drawer. Keep the rest of that section (free/tiers/sort controls).
7. Clean up: remove `filterCategory` state, `uniqueTags`, and tag filter predicate from `filteredData` useMemo.
8. Mobile cards: ensure `grid-cols-1` on xs, `grid-cols-2` on sm, `grid-cols-3` on lg, `grid-cols-4` on xl (current is already mostly correct, verify)
9. Add smooth CSS transitions for the category picker overlay (translate-y-full → translate-y-0)
