import { Users } from "lucide-react";
import type React from "react";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getTicketTierInfo, getTierInfo } from "../data/tiers";
import type { Community, EnrichedCommunity } from "../types";
import { compactNumber } from "../utils/format";
import { CommunityCard } from "./CommunityCard";
import { EmptyState } from "./EmptyState";
import { Top500ComparisonCard, findMatchInMap } from "./Top500ComparisonCard";

// ─── constants ───────────────────────────────────────────────────────────────
const CARD_ROW_HEIGHT_NORMAL = 170; // px per row (normal cards)
const CARD_ROW_HEIGHT_TOP500 = 232; // px per row (Top500 cards)
const ROW_GAP = 12;
const OVERSCAN_ROWS = 3; // extra rows above/below viewport

// ─── helpers ─────────────────────────────────────────────────────────────────
function getColumnCount(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  if (width < 1280) return 3;
  return 4;
}

// ─── types ───────────────────────────────────────────────────────────────────
type GridProps = {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  discoveryMap?: {
    slugMap: Map<string, Community>;
    nameMap: Map<string, Community>;
  };
  hideNoMatch?: boolean;
  mrrDeltaFilter?: "all" | "growth" | "declined";
  isMegaAll?: boolean;
  isTop500?: boolean;
  onScroll?: (
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number,
  ) => void;
};

// ─── single card row renderer ─────────────────────────────────────────────
const CardRow = memo(function CardRow({
  rowIndex,
  cols,
  items,
  currency,
  format,
  isARR,
  isMegaAll,
  isTop500,
  discoveryMap,
  rowHeight,
}: {
  rowIndex: number;
  cols: number;
  items: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  isMegaAll: boolean;
  isTop500: boolean;
  discoveryMap?: GridProps["discoveryMap"];
  rowHeight: number;
}) {
  const start = rowIndex * cols;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: ROW_GAP,
        height: rowHeight - ROW_GAP,
        marginBottom: ROW_GAP,
        boxSizing: "border-box",
      }}
    >
      {items.map((community, i) => {
        const globalIndex = start + i;
        if (isTop500 && discoveryMap) {
          const match = findMatchInMap(community, discoveryMap);
          if (match) {
            return (
              <Top500ComparisonCard
                key={community.id}
                community={community}
                match={match}
                currency={currency}
                format={format}
                index={globalIndex}
              />
            );
          }
          const tier = getTierInfo(community.activeRevenue);
          const isFixed = community.pricingType === "fixed";
          const ticketTier = getTicketTierInfo(
            isFixed ? community.fixedPrice : community.ticketSize,
          );
          return (
            <button
              type="button"
              key={community.id}
              onClick={() =>
                community.url && window.open(community.url, "_blank")
              }
              className={`group relative flex flex-col justify-between p-4 bg-[#0a0a0a] hover:bg-[#111] border transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-xl w-full text-left hover:scale-[1.012] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 will-change-transform [contain:layout_style_paint] ${tier.border} ${tier.bg} min-h-[110px] ${community.url ? "cursor-pointer" : ""}`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={`w-8 h-8 shrink-0 rounded-md flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[10px] font-black shadow-sm`}
                  title={ticketTier.label}
                >
                  {ticketTier.abbr}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-zinc-100 truncate tracking-tight group-hover:text-white transition-colors">
                    {community.name}
                  </h4>
                </div>
                <span className="shrink-0 text-[9px] font-bold text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
                  Dec &apos;25
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between pt-1">
                <div className="flex items-center gap-2 text-[12.5px] text-zinc-100 font-bold pb-0.5 tracking-tight">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-zinc-400" />{" "}
                    {compactNumber(community.members)}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span>
                    $
                    {compactNumber(
                      community.pricingType === "fixed"
                        ? community.fixedPrice
                        : community.ticketSize,
                    )}
                    <span className="text-zinc-400 text-[10px]">
                      {community.pricingType === "fixed"
                        ? " 1x"
                        : isARR
                          ? "/y"
                          : "/m"}
                    </span>
                  </span>
                </div>
                <div
                  className={`text-[20px] font-black tracking-tighter leading-none ${tier.color} ${tier.glow}`}
                >
                  {format(community.activeRevenue, currency)}
                </div>
              </div>
            </button>
          );
        }

        return (
          <CommunityCard
            key={community.id}
            community={community}
            index={globalIndex}
            currency={currency}
            format={format}
            isARR={isARR}
            isMegaAll={isMegaAll}
          />
        );
      })}
    </div>
  );
});

// ─── main virtual grid ────────────────────────────────────────────────────────
export const VirtualCardGrid = memo(function VirtualCardGrid({
  data,
  currency,
  format,
  isARR,
  discoveryMap,
  hideNoMatch = false,
  mrrDeltaFilter = "all",
  isMegaAll = false,
  isTop500 = false,
  onScroll,
}: GridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(640);
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(600);
  // ── filter display data ──────────────────────────────────────────────────
  const displayData = useMemo(() => {
    if (!isTop500 || !discoveryMap) return data;
    return data.filter((c) => {
      const match = findMatchInMap(c, discoveryMap);
      if (!match && hideNoMatch) return false;
      if (match && mrrDeltaFilter === "growth" && match.mrr <= c.mrr)
        return false;
      if (match && mrrDeltaFilter === "declined" && match.mrr >= c.mrr)
        return false;
      return true;
    });
  }, [data, isTop500, discoveryMap, hideNoMatch, mrrDeltaFilter]);

  const cols = getColumnCount(containerWidth);
  const rowHeight = isTop500 ? CARD_ROW_HEIGHT_TOP500 : CARD_ROW_HEIGHT_NORMAL;
  const rowCount = Math.ceil(displayData.length / cols);
  const totalHeight = rowCount * rowHeight;

  // ── measure container width ──────────────────────────────────────────────
  // Synchronously initialize clientHeight on mount to avoid first-render wrong calculation
  useLayoutEffect(() => {
    if (containerRef.current) {
      setClientHeight(containerRef.current.clientHeight || 600);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 640;
      setContainerWidth(w);
      setClientHeight(entries[0]?.contentRect.height ?? 600);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── scroll handler → propagate to parent + update virtual window ─────────
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const st = el.scrollTop;
      const sh = el.scrollHeight;
      const ch = el.clientHeight;
      // Call directly — parent processScroll already guards with its own rAF
      setScrollTop(st);
      onScroll?.(st, sh, ch);
    },
    [onScroll],
  );

  // ── compute visible row range ────────────────────────────────────────────
  const firstVisibleRow = Math.max(
    0,
    Math.floor(scrollTop / rowHeight) - OVERSCAN_ROWS,
  );
  const lastVisibleRow = Math.min(
    rowCount - 1,
    Math.ceil((scrollTop + clientHeight) / rowHeight) + OVERSCAN_ROWS,
  );

  const visibleRows = useMemo(() => {
    const rows: number[] = [];
    for (let r = firstVisibleRow; r <= lastVisibleRow; r++) rows.push(r);
    return rows;
  }, [firstVisibleRow, lastVisibleRow]);

  if (displayData.length === 0) return <EmptyState />;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        overflowY: "auto",
        height: "100%",
        width: "100%",
        WebkitOverflowScrolling:
          "touch" as React.CSSProperties["WebkitOverflowScrolling"],
      }}
      className="custom-scrollbar"
    >
      {/* spacer div sets total scroll height */}
      <div
        style={{
          height: totalHeight,
          position: "relative",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)",
        }}
      >
        {/* offset wrapper for the rendered window */}
        <div
          style={{
            position: "absolute",
            top: firstVisibleRow * rowHeight,
            left: 0,
            right: 0,
            padding: "0 16px",
          }}
        >
          {visibleRows.map((rowIndex) => {
            const rowStart = rowIndex * cols;
            const rowItems = displayData.slice(rowStart, rowStart + cols);
            return (
              <CardRow
                key={rowIndex}
                rowIndex={rowIndex}
                cols={cols}
                items={rowItems}
                currency={currency}
                format={format}
                isARR={isARR}
                isMegaAll={isMegaAll}
                isTop500={isTop500}
                discoveryMap={discoveryMap}
                rowHeight={rowHeight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});
