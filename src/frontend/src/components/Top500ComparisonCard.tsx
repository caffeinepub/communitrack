import { Users } from "lucide-react";
import React, { memo } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { getTicketTierInfo } from "../data/tiers";
import type { Community, EnrichedCommunity } from "../types";
import { getColorForDelta, getMrrGlowStyle } from "../utils/colorLogic";
import { compactNumber } from "../utils/format";

// Module-level constants to avoid per-render allocations
const DEC_2025 = new Date(2025, 11, 1);
const NOW = new Date();
const MONTHS_ELAPSED =
  (NOW.getTime() - DEC_2025.getTime()) / (1000 * 60 * 60 * 24 * 30.44);

type Props = {
  community: EnrichedCommunity;
  match: Community;
  currency: string;
  format: (a: number, c: string) => string;
  index: number;
};

export const Top500ComparisonCard = memo(function Top500ComparisonCard({
  community,
  match,
  currency,
  format,
  index: _index,
}: Props) {
  const effectiveTicket =
    community.pricingType === "fixed"
      ? community.fixedPrice
      : community.ticketSize;
  const ticketTier = getTicketTierInfo(effectiveTicket);

  const decMembers = community.members;
  const decTicket = community.ticketSize;
  const decMrr = community.mrr;

  const nowMembers = match.members;
  const nowTicket = match.ticketSize;
  const nowMrr = match.mrr;

  const sparkData = [
    { t: 0, v: decMrr },
    { t: MONTHS_ELAPSED, v: nowMrr },
  ];

  const membersColor = getColorForDelta(decMembers, nowMembers);
  const ticketColor = getColorForDelta(decTicket, nowTicket);
  const mrrColor = getColorForDelta(decMrr, nowMrr);
  const glowStyle = getMrrGlowStyle(decMrr, nowMrr);

  return (
    <button
      type="button"
      onClick={() => community.url && window.open(community.url, "_blank")}
      style={{
        boxShadow: glowStyle.boxShadow,
        borderColor: glowStyle.borderColor,
      }}
      className={`group relative flex flex-col p-4 bg-[#0a0a0a] hover:bg-[#111] border transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-xl w-full text-left motion-safe:animate-fadeInUp motion-safe:hover:scale-[1.012] motion-safe:hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 will-change-transform [contain:layout_style_paint] ${community.url ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center gap-2 min-w-0 mb-3">
        <div
          className={`w-7 h-7 shrink-0 rounded-md flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[9px] font-black shadow-sm`}
        >
          {ticketTier.abbr}
        </div>
        <h4 className="text-sm font-bold text-zinc-100 truncate tracking-tight group-hover:text-white transition-colors flex-1 min-w-0">
          {community.name}
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-1.5">
        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
          Dec &apos;25
        </div>
        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
          Now
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-1">
        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          <Users className="w-3 h-3 shrink-0" />
          {compactNumber(decMembers)}
        </div>
        <div className="text-[11px] font-bold" style={{ color: membersColor }}>
          {compactNumber(nowMembers)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-1">
        <div className="text-[11px] text-zinc-500">
          {decTicket === 0
            ? "Free"
            : `$${compactNumber(decTicket)}${community.pricingType === "yearly" ? "/yr" : "/m"}`}
        </div>
        <div className="text-[11px] font-bold" style={{ color: ticketColor }}>
          {nowTicket === 0
            ? "Free"
            : `$${compactNumber(nowTicket)}${community.pricingType === "yearly" || match?.pricingType === "yearly" ? "/yr" : "/m"}`}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 items-center mt-1">
        <div className="text-[11px] text-zinc-500">
          {format(decMrr, currency)}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[13px] font-black tracking-tight"
            style={{ color: mrrColor }}
          >
            {format(nowMrr, currency)}
          </span>
        </div>
      </div>

      {(decMrr > 0 || nowMrr > 0) && (
        <div className="mt-2 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sparkData}
              margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
            >
              <Line
                type="monotone"
                dataKey="v"
                stroke={
                  nowMrr >= decMrr
                    ? "oklch(0.72 0.18 142)"
                    : "oklch(0.65 0.2 25)"
                }
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </button>
  );
});

// Helper exported for reuse
export function findMatchInMap(
  c: { url?: string; name: string },
  discoveryMap?: {
    slugMap: Map<string, Community>;
    nameMap: Map<string, Community>;
  },
): Community | undefined {
  if (!discoveryMap) return undefined;
  try {
    const m = c.url?.match(/skool\.com\/([^/?#]+)/);
    const slug = m ? m[1].toLowerCase().trim() : "";
    if (slug) {
      const hit = discoveryMap.slugMap.get(slug);
      if (hit) return hit;
    }
  } catch {
    // ignore
  }
  const nm = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return discoveryMap.nameMap.get(nm);
}
