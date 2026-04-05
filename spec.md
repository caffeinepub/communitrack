# CommuniTrack

## Current State

CommuniTrack is a ~5800-line single-file React app (App.tsx) — an analytics dashboard for Skool communities. It has:
- 10 embedded CSV datasets (base64) + Top 500
- Horizontal pill-shaped top bar category switcher (icon-only, label shows for active)
- Left sidebar with filters, AI Copilot sidebar (removed from DOM when closed)
- 3 views: Cards (MinimalCardsView), Ledger (LedgerView), Observatory (ObservatoryView)
- Default active category: `"discovery"` (lazy-initialized synchronously from inline CSV)
- Mega All loads async via Promise.all across all 8 CSVs
- Performance: React.memo on subcomponents, useCallback on handlers
- Layout: Desktop-only layout with fixed left sidebar, no mobile optimizations

## Requested Changes (Diff)

### Add
- Mobile-first responsive layout: bottom navigation bar on mobile/tablet replacing left sidebar nav, hamburger/sheet drawer for sidebar filters on small screens
- Tablet breakpoint layout: collapsible side panel, adapted card grid (2-col)
- Touch-friendly tap targets (min 44px), swipe gestures for sidebar on mobile
- Responsive card grid: 1-col mobile, 2-col tablet, 3-col+ desktop
- Responsive top bar: smaller icons/pill on mobile, full size on desktop
- Loading skeleton/shimmer for Mega All async load on initial mount

### Modify
- **Default category changed from `"discovery"` to `"megaall"`**: Change `activeCategory` useState default to `"megaall"`, change `communities` useState lazy init to `[]`, add `useEffect` on mount to call `loadCategoryData("megaall")` and set communities
- **Performance optimizations**:
  - Virtualize long card/table lists using windowing (only render visible items)
  - Debounce search input (already likely present, verify and tighten to 150ms)
  - Move heavy CSV parsing + deduplication to Web Worker or lazy `useMemo` with idle callback
  - Use `CSS containment` (`contain: layout style paint`) on card items to reduce paint cost
  - Replace inline styles with CSS classes where possible to avoid re-computation
  - Use `will-change: transform` only on actively animating elements, remove after animation
  - Reduce animation complexity on low-motion preference (`prefers-reduced-motion`)
  - Lazy-load AI Copilot component (already removed from DOM, ensure it's also code-split or deferred)
  - Memoize `CATEGORY_META` and all static arrays/objects outside component
  - Batch state updates (use React 18 automatic batching, avoid unnecessary re-renders)
- **Responsive header**: pill bar wraps or scales on small screens without overflow
- **Sidebar**: On mobile becomes a bottom drawer sheet; on tablet becomes an overlay

### Remove
- Fixed pixel widths for sidebar that break on mobile
- Any `overflow-hidden` on the root that prevents scroll on mobile

## Implementation Plan

1. Change default category to `megaall`: update useState defaults, add mount useEffect for async load, show shimmer during load
2. Performance pass:
   - Ensure all expensive computations are in useMemo with correct deps
   - Add search debounce if not already 150ms or less
   - Add `contain: layout style paint` to card wrappers via Tailwind (`[contain:layout_style_paint]`)
   - Wrap animation keyframes with `@media (prefers-reduced-motion: reduce)` to disable for accessibility + perf
   - Use `React.lazy` + Suspense for AI Copilot if it's heavy
3. Responsive layout:
   - Mobile (<768px): collapse left sidebar, show bottom tab bar with category icons + hamburger for filters
   - Tablet (768–1024px): narrower sidebar (icon-only, expandable), 2-col card grid
   - Desktop (1024px+): current layout preserved as-is
   - Top bar pill: reduce icon size on mobile (16px), hide label on very small screens
   - Cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
4. Touch UX: increase tap targets, add touch-action: manipulation to interactive elements
5. Validate + build
