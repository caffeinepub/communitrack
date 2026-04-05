import { Users } from "lucide-react";
import React, { memo, useMemo, type CSSProperties } from "react";
import { AutoSizer } from "react-virtualized-auto-sizer";
import { List } from "react-window";
import { getTicketTierInfo, getTierInfo } from "../data/tiers";
import type { Community, EnrichedCommunity } from "../types";
import { compactNumber } from "../utils/format";
import { CommunityCard } from "./CommunityCard";
import { EmptyState } from "./EmptyState";
import { Top500ComparisonCard, findMatchInMap } from "./Top500ComparisonCard";

function getColumnCount(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  if (width < 1280) return 3;
  return 4;
}

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
};

type RowProps = {
  displayData: EnrichedCommunity[];
  cols: number;
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  isMegaAll: boolean;
  isTop500: boolean;
  discoveryMap?: {
    slugMap: Map<string, Community>;
    nameMap: Map<string, Community>;
  };
};

function RowComponent({
  index,
  style,
  displayData,
  cols,
  currency,
  format,
  isARR,
  isMegaAll,
  isTop500,
  discoveryMap,
}: {
  ariaAttributes: {
    "aria-posinset": number;
    "aria-setsize": number;
    role: "listitem";
  };
  index: number;
  style: CSSProperties;
} & RowProps) {
  const start = index * cols;
  const items = displayData.slice(start, start + cols);

  return (
    <div
      style={{
        ...style,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 12,
        paddingTop: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: "12px",
          height: "100%",
          alignItems: "stretch",
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
            // No match: show regular card with Dec '25 badge
            const tier = getTierInfo(community.activeRevenue);
            const ticketTier = getTicketTierInfo(community.ticketSize);
            return (
              <button
                type="button"
                key={community.id}
                onClick={() =>
                  community.url && window.open(community.url, "_blank")
                }
                className={`group relative flex flex-col justify-between p-4 bg-[#0a0a0a] hover:bg-[#111] border motion-safe:transition-all duration-200 ease-out rounded-xl w-full text-left motion-safe:animate-fadeInUp motion-safe:hover:scale-[1.012] motion-safe:hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 will-change-transform [contain:layout_style_paint] ${tier.border} ${tier.bg} min-h-[110px] ${community.url ? "cursor-pointer" : ""}`}
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
                      ${compactNumber(community.ticketSize)}
                      <span className="text-zinc-400 text-[10px]">
                        /{isARR ? "y" : "m"}
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
    </div>
  );
}

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
}: GridProps) {
  // Pre-filter for top500 mode so itemCount is always exact
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

  if (displayData.length === 0) return <EmptyState />;

  return (
    <AutoSizer
      renderProp={({
        width,
        height,
      }: { width: number | undefined; height: number | undefined }) => {
        const w = width ?? 640;
        const h = height ?? 400;
        const cols = getColumnCount(w);
        const rowHeight = isTop500 ? 220 : 158;
        const rowCount = Math.ceil(displayData.length / cols);

        const rowProps: RowProps = {
          displayData,
          cols,
          currency,
          format,
          isARR,
          isMegaAll,
          isTop500,
          discoveryMap,
        };

        return (
          <List
            style={{ height: h, width: w }}
            rowCount={rowCount}
            rowHeight={rowHeight + 12}
            rowComponent={RowComponent}
            rowProps={rowProps}
            overscanCount={3}
          />
        );
      }}
    />
  );
});
