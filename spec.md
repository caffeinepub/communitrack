# CommuniTrack — Performance Optimization

## Current State

App.tsx is a single 6,400-line monolithic React component with 20+ useState declarations all living in the root `App` function. Every interaction (scroll, filter click, keypress, sidebar toggle) triggers a full re-render of the entire component tree. The scroll handler fires React setState at 60Hz. Layout-thrashing CSS transitions (max-height, width, padding) force browser layout recalculation every animation frame. 500+ comparison cards re-render without React.memo. The search input has a 150ms controlled-value lag. No list virtualization exists for 1000+ card Mega All view.

## Requested Changes (Diff)

### Add
- `useReducer` for all filter state (search, mrrFilter, langFilter, ticketFilter, sortBy, sortDir, freeTierFilter, showFixed, showYearly, includeFreeThreshold) — single dispatch replaces 8-9 sequential setState calls on category switch
- `useReducer` or grouped state object for UI chrome (isLeftOpen, isRightOpen, isFiltersOpen, isChatOpen, isZenMode)
- `requestAnimationFrame` guard around scroll-driven setState (isScrollFocused) to cap React re-renders at 1/frame instead of 60/second
- Separate `inputValue` local state for search input so keystrokes update visually immediately; only `search` (used for filtering) is debounced
- `useMemo` for all Observatory computations (scatterData, topEarners, pieData, priceHistogram, timelineData)
- `useMemo` for right-sidebar tier counts (4 filter passes → 1 single-pass O(n) computation)
- Module-level constant `catIconMap` (remove the IIFE pattern from render)

### Modify
- **Scroll handler**: wrap `setIsScrollFocused` in `requestAnimationFrame`; use a ref flag to avoid multiple RAF enqueues
- **CSS transitions**: replace all `transition-all` + `max-height`/`width` animations with `transform: translateY` / `transform: translateX` + `opacity` only. Specifically:
  - Header scroll-hide: `transform: translateY(-100%)` instead of `max-h-0`
  - Left sidebar: `transform: translateX(-100%)` instead of `w-0`
  - Right sidebar: `transform: translateX(100%)` instead of `w-0`
  - Filter bar: `transform: scaleY(0)` with `transform-origin: top` instead of `max-h-0`
  - Mobile bottom nav: `transform: translateY(100%)` instead of display toggle
  - All `transition-all` → `transition-[transform,opacity]`
- **`Top500ComparisonCard`**: wrap in `React.memo` with proper prop comparison
- **`CustomTooltip`**: move outside `ObservatoryView` component body to a module-level const; this stops React from unmounting/remounting it every render
- **`findMatch` / `findLedgerMatch`**: move outside component bodies, accept `dec2025Data` as parameter
- **`catIconMap` IIFE**: replace with module-level constant object
- **Community IDs**: replace `Math.random()` in ID generation with deterministic hash from URL slug + name to enable stable React list reconciliation
- **`decodeInlineCsv` in loadCategoryData megaall**: use already-memoized `discoveryData` and other category data instead of re-parsing from scratch
- **`handleCategorySwitch`**: replace 8-9 sequential setState calls with a single `useReducer` dispatch that batches all filter resets atomically
- **Search input**: use local `inputValue` state for the input's `value` prop; only the debounced `search` state drives filtering
- **AICopilot `handleSend`**: wrap in `useCallback`
- **Double `transition-all transition-transform` on same element**: remove the redundant `transition-all`

### Remove
- All 65+ instances of `transition-all` that animate layout properties — replace with targeted `transition-[transform,opacity]`
- The IIFE pattern wrapping Top500/MegaAll button render logic (inline directly)
- Random ID generation per community — replace with stable deterministic IDs

## Implementation Plan

1. **Batch filter state into a single useReducer** — define `filterState` + `filterReducer` at module level; wire existing setState call sites to dispatch actions. Category switch dispatches a single `RESET_FILTERS` action with the new category.
2. **Fix scroll handler** — add `rafPending` ref; in scroll handler, only call `setIsScrollFocused` inside an RAF, guard with the ref to avoid queueing duplicates.
3. **Fix all layout-thrashing transitions** — audit every `transition-all`, `max-h-*`, `w-0`/`w-[230px]` animation. Replace with transform/opacity-only transitions using absolute/fixed positioning where needed (sidebars stay in DOM, use `translateX`; header uses `translateY`; filter bar uses `scaleY`).
4. **Memoize `Top500ComparisonCard`** — add `React.memo` wrapper with shallow comparison.
5. **Move `CustomTooltip` to module level** — ensure it doesn't close over any component state.
6. **Move `findMatch`/`findLedgerMatch` out of render** — pure functions, accept data as params.
7. **Fix search input lag** — add `localSearch` state; bind `value={localSearch}`, update immediately on change; debounce only the filter `setSearch`.
8. **Memoize Observatory computations** — wrap in `useMemo` with `data` as dependency.
9. **Right-sidebar tier counts** — single `useMemo` O(n) pass.
10. **Stable community IDs** — deterministic hash: `btoa(url || name).replace(/[^a-z0-9]/gi, '').slice(0, 12)`.
11. **catIconMap constant** — module-level const, remove IIFE from render.
12. **AICopilot handleSend** — wrap in `useCallback`.
13. Validate and build.
