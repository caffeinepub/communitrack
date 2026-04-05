import { memo } from "react";
import { getTicketTierInfo, getTierInfo } from "../data/tiers";
import type { Community, EnrichedCommunity } from "../types";
import { getColorForDelta } from "../utils/colorLogic";
import { compactNumber } from "../utils/format";
import { EmptyState } from "./EmptyState";
import { findMatchInMap } from "./Top500ComparisonCard";

type Props = {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  discoveryMap?: {
    slugMap: Map<string, Community>;
    nameMap: Map<string, Community>;
  };
  isTop500?: boolean;
};

export const LedgerView = memo(function LedgerView({
  data,
  currency,
  format,
  isARR,
  discoveryMap,
  isTop500,
}: Props) {
  if (data.length === 0) return <EmptyState />;

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-zinc-800 bg-[#111]">
              <th className="p-3 pl-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Community
              </th>
              <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Region
              </th>
              <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                Audience
              </th>
              <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                Ticket
              </th>
              <th className="p-3 pr-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                Revenue ({isARR ? "ARR" : "MRR"})
              </th>
              {isTop500 && discoveryMap && (
                <th className="p-3 pr-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                  Delta
                </th>
              )}
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {data.map((community, index) => {
              const tier = getTierInfo(community.activeRevenue);
              const ticketTier = getTicketTierInfo(community.ticketSize);
              return (
                <tr
                  key={community.id}
                  onClick={() =>
                    community.url && window.open(community.url, "_blank")
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    community.url &&
                    window.open(community.url, "_blank")
                  }
                  style={{ animationDelay: `${Math.min(index, 30) * 20}ms` }}
                  className={`border-b border-zinc-800/50 hover:bg-zinc-900 transition-colors animate-fadeIn ${tier.bg} ${
                    community.url ? "cursor-pointer" : ""
                  }`}
                >
                  <td className="p-3 pl-4 font-semibold text-zinc-200">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[8px] font-black shadow-sm`}
                        title={ticketTier.label}
                      >
                        {ticketTier.abbr}
                      </div>
                      <span className="truncate max-w-[200px] sm:max-w-[300px] block">
                        {community.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className="text-zinc-400 text-xs font-medium tracking-wide flex items-center gap-1.5"
                      title={community.language.lang}
                    >
                      {community.language.flag} {community.language.lang}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-400 text-right font-mono">
                    {compactNumber(community.members)}
                  </td>
                  <td className="p-3 text-right font-mono">
                    {community.pricingType === "fixed" ? (
                      <span className="text-amber-400 text-[12px] font-bold">
                        ${compactNumber(community.fixedPrice)}
                        <span className="text-[9px] text-amber-600 ml-0.5">
                          1x
                        </span>
                      </span>
                    ) : community.pricingType === "yearly" ? (
                      <span className="text-sky-400 text-[12px] font-bold flex flex-col items-end">
                        <span>${compactNumber(community.yearlyPrice)}/yr</span>
                        <span className="text-[9px] text-zinc-500">
                          ~${compactNumber(community.ticketSize)}/mo
                        </span>
                      </span>
                    ) : (
                      <span className="text-zinc-400">
                        ${compactNumber(community.ticketSize)}
                      </span>
                    )}
                  </td>
                  <td
                    className={`p-3 pr-4 font-black text-right tracking-tight font-mono tabular-nums ${
                      community.pricingType === "fixed"
                        ? "text-amber-500"
                        : community.pricingType === "yearly"
                          ? "text-sky-400"
                          : tier.color
                    } ${tier.glow}`}
                  >
                    {community.pricingType === "fixed" ? (
                      format(community.fixedPrice * community.members, currency)
                    ) : community.pricingType === "yearly" ? (
                      <div className="flex flex-col items-end">
                        <span>
                          {isARR
                            ? format(
                                community.yearlyPrice * community.members,
                                currency,
                              )
                            : format(
                                Math.round(
                                  (community.yearlyPrice * community.members) /
                                    12,
                                ),
                                currency,
                              )}
                        </span>
                        <span className="text-[12px] font-semibold text-orange-100/65 leading-none tabular-nums mt-0.5">
                          {isARR
                            ? `~${format(Math.round((community.yearlyPrice * community.members) / 12), currency)}/mo`
                            : `${format(community.yearlyPrice * community.members, currency)}/yr`}
                        </span>
                      </div>
                    ) : (
                      format(community.activeRevenue, currency)
                    )}
                  </td>
                  {isTop500 &&
                    discoveryMap &&
                    (() => {
                      const match = findMatchInMap(community, discoveryMap);
                      if (!match)
                        return (
                          <td className="p-3 pr-4 text-right text-zinc-600 font-mono text-[11px]">
                            —
                          </td>
                        );
                      const decMembers = community.members;
                      const nowMembers = match.members;
                      const decMrr = community.mrr;
                      const nowMrr = match.mrr;
                      const membersDelta = nowMembers - decMembers;
                      const mrrDelta = nowMrr - decMrr;
                      const membersSign = membersDelta >= 0 ? "+" : "";
                      const mrrSign = mrrDelta >= 0 ? "+" : "";
                      const membersCol = getColorForDelta(
                        decMembers,
                        nowMembers,
                      );
                      const mrrCol = getColorForDelta(decMrr, nowMrr);
                      const DEC_2025 = new Date(2025, 11, 1);
                      const NOW = new Date(2026, 3, 3);
                      const monthsElapsed =
                        (NOW.getTime() - DEC_2025.getTime()) /
                        (1000 * 60 * 60 * 24 * 30.44);
                      const mrrSlope = (nowMrr - decMrr) / monthsElapsed;
                      const slopeSign = mrrSlope >= 0 ? "+" : "";
                      return (
                        <td className="p-3 pr-4 text-right font-mono">
                          <div className="flex flex-col items-end gap-0.5">
                            <span
                              className="text-[11px] font-bold"
                              style={{ color: membersCol }}
                            >
                              {membersSign}
                              {compactNumber(Math.abs(membersDelta))}
                            </span>
                            <span
                              className="text-[11px] font-bold"
                              style={{ color: mrrCol }}
                            >
                              {mrrSign}
                              {format(Math.abs(mrrDelta), currency)}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-mono">
                              {slopeSign}
                              {format(Math.abs(Math.round(mrrSlope)), currency)}
                              /mo
                            </span>
                          </div>
                        </td>
                      );
                    })()}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
