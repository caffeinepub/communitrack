# CommuniTrack

## Current State
Multi-file React dashboard (~12 modules) with virtual scrolling, code splitting, 10 embedded CSV datasets, mobile-first layout, scroll-to-hide chrome, glassmorphism cards, and extensive filtering/sorting. Version 36 deployed. User reports persistent bugs, glitches, lag, and requests Apple-level UI polish.

## Requested Changes (Diff)

### Add
- `startScrollCooldown` helper to deduplicate 6 identical cooldown patterns
- Bottom padding inside virtual scroll container for mobile safe area
- Module-level constants for `DEC_2025`, `NOW`, `monthsElapsed` in Top500ComparisonCard
- `useLayoutEffect` to initialize `clientHeight` synchronously in VirtualCardGrid
- Explicit `NaN` guard in `formatCurrency` and `compactNumber`
- `tabIndex` and `role` on LedgerView `<tr>` elements for keyboard accessibility
- searchDebounceRef cleanup on unmount
- Expanded price detection regex for 'per month', 'monthly', 'per year', 'annually'
- `sourceCategory` in dataEngine community `id` to prevent megaall ID collisions

### Modify
- **App.tsx**: 
  - Remove duplicate `loadCategoryWithCache` call in `handleCategorySwitch`
  - Replace `isScrollFocused` React state with ref + guarded setState to reduce scroll re-renders
  - Fix `tierCounts` to use `activeRevenue` instead of raw `mrr` (shows correct counts for fixed/yearly)
  - Fix nested `<button>` inside `<button>` (sort direction toggle) — convert outer to `<div>`
  - Sync `paddingBottom` transition with nav slide-out animation (add CSS transition)
  - Fix `uniqueLangs` to use Map instead of JSON.stringify/parse
  - Batch filter resets atomically before async load
  - Memoize `handleCategorySwitch` with correct deps
- **VirtualCardGrid.tsx**: 
  - Remove extra `requestAnimationFrame` wrapper in scroll handler (2-frame lag)
  - Initialize `clientHeight` via `useLayoutEffect` for correct initial viewport
  - Add `paddingBottom` inside virtual scroll container for mobile nav clearance
  - Fix `CardRow` Top500 fallback to use `fixedPrice` for fixed-price communities
- **CommunityCard.tsx**: 
  - Use `community.activeRevenue` for all revenue display (remove redundant recalculations)
  - Apply slide-in animation only on mount (not on every re-render)
- **LedgerView.tsx**: 
  - Use `new Date()` instead of hardcoded `new Date(2026, 3, 3)` for NOW
  - Add `tabIndex={0}` and `role="link"` to `<tr>` elements
  - Extract delta cell into memoized sub-component `<DeltaCell>`
- **ObservatoryView.tsx**: 
  - Use `activeTicket` instead of `ticketSize` for price histogram and scatter charts
  - Label the portfolio trajectory chart as "Projected Trajectory"
- **Top500ComparisonCard.tsx**: 
  - Move `DEC_2025`, `NOW`, `monthsElapsed` to module-level constants
  - Use `new Date()` for NOW
  - Fix `ticketTier` to use `fixedPrice` for fixed-price communities
  - Add `/yr` suffix for yearly-priced ticket display
- **dataEngine.ts**: 
  - Expand price detection regex
  - Include `sourceCategory` in community `id`
  - Add `typeof window` guard around module-level `loadCategoryWithCache` call
- **colorLogic.ts**: 
  - Scale green intensity by absolute `newVal` when `oldVal === 0`
  - Extract shared intensity helper to eliminate duplication
- **format.ts**: 
  - Add explicit `Number.isNaN` guard in `formatCurrency` and `compactNumber`
- **index.css / tailwind**: 
  - Apple-level micro-animation polish: improved spring curves, card hover glow, active states
  - Smooth `paddingBottom` transition on `<main>` synced with nav slide
  - Improved glassmorphism variables
  - Better shimmer skeleton pulse

### Remove
- Duplicate `loadCategoryWithCache` call in `handleCategorySwitch`
- Hardcoded `new Date(2026, 3, 3)` references (replace with `new Date()`)
- Redundant revenue recalculations in CommunityCard (use `activeRevenue`)
- Extra `requestAnimationFrame` in VirtualCardGrid scroll handler
- `JSON.stringify`/`JSON.parse` in `uniqueLangs` (replace with Map)

## Implementation Plan
1. Fix all 22 logic/data bugs identified in audit (priority: correctness)
2. Apply 9 performance optimizations (reduce re-renders, fix 2-frame scroll lag, rAF dedup)
3. Fix 6 UI/UX glitches (scroll jitter, padding jump, animation re-fire)
4. Fix 4 TypeScript/type safety issues
5. Polish UI to Apple-level: improved animations, transitions, hover states, glassmorphism
6. Validate (lint + typecheck + build)
