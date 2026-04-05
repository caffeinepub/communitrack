import { Users } from "lucide-react";
import { memo } from "react";
import { CATEGORY_META } from "../constants/categories";
import { getTicketTierInfo, getTierInfo } from "../data/tiers";
import type { EnrichedCommunity } from "../types";
import { compactNumber } from "../utils/format";

type Props = {
  community: EnrichedCommunity;
  index: number;
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  isMegaAll?: boolean;
};

export const CommunityCard = memo(function CommunityCard({
  community,
  currency,
  format,
  isARR,
  isMegaAll = false,
}: Props) {
  const tier = getTierInfo(community.activeRevenue);
  const ticketTier = getTicketTierInfo(community.ticketSize);
  const catMeta =
    isMegaAll && community.sourceCategory
      ? CATEGORY_META[community.sourceCategory]
      : null;
  const isFixed = community.pricingType === "fixed";
  const isYearly = community.pricingType === "yearly";

  return (
    <button
      type="button"
      onClick={() => community.url && window.open(community.url, "_blank")}
      className={`group relative flex flex-col justify-between p-4 bg-[#0a0a0a] hover:bg-[#111] border motion-safe:transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-xl w-full text-left motion-safe:animate-fadeInUp motion-safe:hover:scale-[1.012] motion-safe:hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 will-change-transform [contain:layout_style_paint] ${tier.border} ${tier.bg} min-h-[110px] ${community.url ? "cursor-pointer" : ""}`}
    >
      {catMeta && (
        <div
          className="absolute top-1.5 right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold z-10"
          style={{
            backgroundColor: `${catMeta.color}22`,
            color: catMeta.color,
            border: `1px solid ${catMeta.color}40`,
          }}
        >
          <catMeta.Icon className="w-2.5 h-2.5" />
          <span>{catMeta.label}</span>
        </div>
      )}
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
        {isFixed && (
          <span className="shrink-0 text-[8px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
            ONE-TIME
          </span>
        )}
        {isYearly && (
          <span className="shrink-0 text-[8px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 px-1.5 py-0.5 rounded-full">
            YEARLY
          </span>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between pt-1">
        <div className="flex items-center gap-2 text-[12.5px] text-zinc-100 font-bold pb-0.5 tracking-tight">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-zinc-400" />{" "}
            {compactNumber(community.members)}
          </span>
          <span className="text-zinc-600">•</span>
          {isFixed ? (
            <span className="text-amber-400">
              ${compactNumber(community.fixedPrice)}
              <span className="text-zinc-400 text-[10px]"> one-time</span>
            </span>
          ) : isYearly ? (
            <span className="flex flex-col items-start">
              <span className="text-sky-400">
                ${compactNumber(community.yearlyPrice)}/yr
              </span>
              <span className="text-zinc-500 text-[9px]">
                ~${compactNumber(community.ticketSize)}/mo
              </span>
            </span>
          ) : (
            <span>
              ${compactNumber(community.ticketSize)}
              <span className="text-zinc-400 text-[10px]">
                /{isARR ? "y" : "m"}
              </span>
            </span>
          )}
        </div>
        {isYearly ? (
          <div className="flex flex-col items-end">
            <span
              className={`text-[20px] font-black tracking-tighter leading-none tabular-nums ${tier.color} ${tier.glow}`}
            >
              {isARR
                ? format(community.yearlyPrice * community.members, currency)
                : format(
                    Math.round(
                      (community.yearlyPrice * community.members) / 12,
                    ),
                    currency,
                  )}
            </span>
            <span className="text-[12px] font-semibold text-orange-100/65 mt-0.5 leading-none tabular-nums">
              {isARR
                ? `~${format(Math.round((community.yearlyPrice * community.members) / 12), currency)}/mo`
                : `${format(community.yearlyPrice * community.members, currency)}/yr`}
            </span>
          </div>
        ) : (
          <div
            className={`text-[20px] font-black tracking-tighter leading-none tabular-nums ${isFixed ? "text-amber-500" : tier.color} ${tier.glow}`}
          >
            {isFixed
              ? format(community.fixedPrice * community.members, currency)
              : format(community.activeRevenue, currency)}
          </div>
        )}
      </div>
    </button>
  );
});
