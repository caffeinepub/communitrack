import { r as reactExports, j as jsxRuntimeExports, E as EmptyState, g as getTierInfo, a as getTicketTierInfo, c as compactNumber, f as findMatchInMap, b as getColorForDelta } from "./index-Dhk1XgQf.js";
const LedgerView = reactExports.memo(function LedgerView2({
  data,
  currency,
  format,
  isARR,
  discoveryMap,
  isTop500
}) {
  if (data.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse whitespace-nowrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-zinc-800 bg-[#111]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 pl-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500", children: "Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500", children: "Region" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right", children: "Audience" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right", children: "Ticket" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "p-3 pr-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right", children: [
        "Revenue (",
        isARR ? "ARR" : "MRR",
        ")"
      ] }),
      isTop500 && discoveryMap && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 pr-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "text-[13px]", children: data.map((community, index) => {
      const tier = getTierInfo(community.activeRevenue);
      const ticketTier = getTicketTierInfo(community.ticketSize);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          onClick: () => community.url && window.open(community.url, "_blank"),
          onKeyDown: (e) => e.key === "Enter" && community.url && window.open(community.url, "_blank"),
          style: { animationDelay: `${Math.min(index, 30) * 20}ms` },
          className: `border-b border-zinc-800/50 hover:bg-zinc-900 transition-colors animate-fadeIn ${tier.bg} ${community.url ? "cursor-pointer" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 pl-4 font-semibold text-zinc-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-6 h-6 rounded flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[8px] font-black shadow-sm`,
                  title: ticketTier.label,
                  children: ticketTier.abbr
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[200px] sm:max-w-[300px] block", children: community.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-zinc-400 text-xs font-medium tracking-wide flex items-center gap-1.5",
                title: community.language.lang,
                children: [
                  community.language.flag,
                  " ",
                  community.language.lang
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-zinc-400 text-right font-mono", children: compactNumber(community.members) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right font-mono", children: community.pricingType === "fixed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 text-[12px] font-bold", children: [
              "$",
              compactNumber(community.fixedPrice),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-amber-600 ml-0.5", children: "1x" })
            ] }) : community.pricingType === "yearly" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sky-400 text-[12px] font-bold flex flex-col items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                compactNumber(community.yearlyPrice),
                "/yr"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-zinc-500", children: [
                "~$",
                compactNumber(community.ticketSize),
                "/mo"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-zinc-400", children: [
              "$",
              compactNumber(community.ticketSize)
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: `p-3 pr-4 font-black text-right tracking-tight font-mono tabular-nums ${community.pricingType === "fixed" ? "text-amber-500" : community.pricingType === "yearly" ? "text-sky-400" : tier.color} ${tier.glow}`,
                children: community.pricingType === "fixed" ? format(community.fixedPrice * community.members, currency) : community.pricingType === "yearly" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isARR ? format(
                    community.yearlyPrice * community.members,
                    currency
                  ) : format(
                    Math.round(
                      community.yearlyPrice * community.members / 12
                    ),
                    currency
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-orange-100/65 leading-none tabular-nums mt-0.5", children: isARR ? `~${format(Math.round(community.yearlyPrice * community.members / 12), currency)}/mo` : `${format(community.yearlyPrice * community.members, currency)}/yr` })
                ] }) : format(community.activeRevenue, currency)
              }
            ),
            isTop500 && discoveryMap && (() => {
              const match = findMatchInMap(community, discoveryMap);
              if (!match)
                return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 pr-4 text-right text-zinc-600 font-mono text-[11px]", children: "—" });
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
                nowMembers
              );
              const mrrCol = getColorForDelta(decMrr, nowMrr);
              const DEC_2025 = new Date(2025, 11, 1);
              const NOW = new Date(2026, 3, 3);
              const monthsElapsed = (NOW.getTime() - DEC_2025.getTime()) / (1e3 * 60 * 60 * 24 * 30.44);
              const mrrSlope = (nowMrr - decMrr) / monthsElapsed;
              const slopeSign = mrrSlope >= 0 ? "+" : "";
              return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 pr-4 text-right font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[11px] font-bold",
                    style: { color: membersCol },
                    children: [
                      membersSign,
                      compactNumber(Math.abs(membersDelta))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[11px] font-bold",
                    style: { color: mrrCol },
                    children: [
                      mrrSign,
                      format(Math.abs(mrrDelta), currency)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-zinc-500 font-mono", children: [
                  slopeSign,
                  format(Math.abs(Math.round(mrrSlope)), currency),
                  "/mo"
                ] })
              ] }) });
            })()
          ]
        },
        community.id
      );
    }) })
  ] }) }) });
});
export {
  LedgerView
};
