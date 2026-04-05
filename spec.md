# CommuniTrack

## Current State

Single monolithic `App.tsx` (6,467 lines) containing:
- All 10 embedded CSV datasets as inline template literals (lines 76–2502)
- Language detection, CSV parser, number formatters, utility functions (lines 2503–3070)
- Main `App` component with all state, event handlers, sidebars, header, mobile nav (lines 3073–5147)
- Subcomponents: `Top500ComparisonCard`, `MinimalCardsView`, `LedgerView`, `ObservatoryView`, `AICopilot`, `EmptyState` (lines 5147–6467)

Known performance problems:
1. Browser must parse/compile 6,467 lines before anything renders
2. `MinimalCardsView` renders ALL cards as real DOM nodes at once — Mega All can have 3,000+ cards
3. No dataset caching: switching back to a category re-fetches + re-parses the CSV every time
4. `filteredData` useMemo runs `.toLowerCase()` on every community on every search keystroke
5. Card animations trigger layout recalculation on every item via `animationDelay` inline style
6. `ObservatoryView` recharts use `ResponsiveContainer` which re-measures on every parent resize
7. No `React.lazy` / code splitting — all recharts, AICopilot, LedgerView downloaded on initial load

## Requested Changes (Diff)

### Add
- Virtual scrolling for cards: only render cards visible in viewport + small overscan buffer (use `react-window` or a manual IntersectionObserver approach)
- Dataset in-memory cache: once a category is fetched+parsed, cache the result in a module-level `Map`; re-selecting same category is instant
- `React.lazy` + `Suspense` for heavy views: `LedgerView`, `ObservatoryView`, `AICopilot` — loaded only when first used
- `useTransition` for category switches so the UI stays responsive during heavy state updates
- Pre-parse `DISCOVERY_CSV` and `MUSIC_CSV` at module initialization (outside React lifecycle) so they are ready before first render
- Stable search: lowercase the community name/creatorName once at parse time and store it; never recompute during filter
- `ITEM_HEIGHT` constant for virtual list so layout math is O(1)

### Modify
- Split `App.tsx` into these files:
  - `src/frontend/src/types.ts` — all shared types (`Community`, `EnrichedCommunity`, `CategoryId`)
  - `src/frontend/src/data/csvData.ts` — all raw CSV strings + `DISCOVERY_CSV`, `MUSIC_CSV`, `TOP500_CSV`
  - `src/frontend/src/data/dataEngine.ts` — `parseCSVData`, `detectLanguage`, `fetchAndDecodeCsv`, `decodeInlineCsv`, `dedupeByUrl`, `extractSlug`, `normalizeName`, dataset cache `Map`
  - `src/frontend/src/data/tiers.ts` — `REVENUE_TIERS`, `TICKET_TIERS`, `FREE_TIERS`, `getTierInfo`, `getTicketTierInfo`
  - `src/frontend/src/utils/format.ts` — `formatCurrency`, `compactNumber`
  - `src/frontend/src/utils/colorLogic.ts` — `getColorForDelta`, `getMrrGlowStyle`
  - `src/frontend/src/constants/categories.ts` — `CAT_ICON_MAP`, `CATEGORY_META`, `CATEGORIES` array
  - `src/frontend/src/components/VirtualCardGrid.tsx` — virtual scrolling grid (replaces `MinimalCardsView` inner loop)
  - `src/frontend/src/components/CommunityCard.tsx` — single card component (used by VirtualCardGrid)
  - `src/frontend/src/components/Top500ComparisonCard.tsx` — extracted from App
  - `src/frontend/src/components/LedgerView.tsx` — lazy-loaded
  - `src/frontend/src/components/ObservatoryView.tsx` — lazy-loaded
  - `src/frontend/src/components/AICopilot.tsx` — lazy-loaded
  - `src/frontend/src/components/EmptyState.tsx` — tiny, always loaded
  - `src/frontend/src/components/Sidebar.tsx` — left filter sidebar
  - `src/frontend/src/components/MobileFilterDrawer.tsx` — mobile bottom sheet
  - `src/frontend/src/components/MobileCategoryPicker.tsx` — 2-col category overlay
  - `src/frontend/src/App.tsx` — orchestrator only (~500 lines): state, category switching, layout
- In `filteredData` useMemo: use pre-lowercased `nameLower` field stored at parse time instead of calling `.toLowerCase()` on every render
- In `loadCategoryData`: check module-level cache before fetching; store result in cache after loading
- VirtualCardGrid: use `react-window` `FixedSizeGrid` or `FixedSizeList` to render only in-viewport cards
- Recharts `ResponsiveContainer` in Observatory: wrap in `React.lazy` and only mount when view === 'observatory'

### Remove
- Inline CSV data from `App.tsx` (moved to `csvData.ts`)
- All subcomponents from `App.tsx` (moved to dedicated files)
- `animationDelay` inline style on every card (causes style recalculation; keep hover animations only)

## Implementation Plan

1. Create `src/frontend/src/types.ts` with all shared types
2. Create `src/frontend/src/data/csvData.ts` with all 3 CSV strings
3. Create `src/frontend/src/data/dataEngine.ts` with parser, decoder, cache Map, slug/name utils
4. Create `src/frontend/src/data/tiers.ts` with tier configs and lookup functions
5. Create `src/frontend/src/utils/format.ts` and `src/frontend/src/utils/colorLogic.ts`
6. Create `src/frontend/src/constants/categories.ts`
7. Create `src/frontend/src/components/EmptyState.tsx`
8. Create `src/frontend/src/components/CommunityCard.tsx` — memoized single card
9. Create `src/frontend/src/components/Top500ComparisonCard.tsx` — memoized
10. Create `src/frontend/src/components/VirtualCardGrid.tsx` — virtual scroll using `react-window` FixedSizeList with variable-column grid via CSS; renders only viewport items + 5 overscan
11. Create `src/frontend/src/components/LedgerView.tsx`
12. Create `src/frontend/src/components/ObservatoryView.tsx`
13. Create `src/frontend/src/components/AICopilot.tsx`
14. Create `src/frontend/src/components/Sidebar.tsx`
15. Create `src/frontend/src/components/MobileFilterDrawer.tsx`
16. Create `src/frontend/src/components/MobileCategoryPicker.tsx`
17. Rewrite `src/frontend/src/App.tsx` as lean orchestrator with `React.lazy` for heavy views
18. Add `react-window` to package.json dependencies
19. Validate with typecheck + build
