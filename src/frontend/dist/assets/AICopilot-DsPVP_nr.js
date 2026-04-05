import { d as createLucideIcon, r as reactExports, c as compactNumber, j as jsxRuntimeExports, aj as Bot, ak as X } from "./index-DT0t5OnO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const AICopilot = reactExports.memo(function AICopilot2({
  data,
  currency,
  format,
  isARR,
  onClose
}) {
  const [messages, setMessages] = reactExports.useState([
    {
      role: "ai",
      text: "Data matrix ingested. What specific anomalies or patterns would you like to uncover?"
    }
  ]);
  const [input, setInput] = reactExports.useState("");
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const endOfMessagesRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = endOfMessagesRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  const handleSend = reactExports.useCallback(() => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      let aiResponse = "";
      const lowerMsg = userMsg.toLowerCase();
      if (data.length === 0) {
        aiResponse = "Matrix is empty.";
      } else if (lowerMsg.includes("highest") || lowerMsg.includes("top")) {
        const top = [...data].sort(
          (a, b) => b.activeRevenue - a.activeRevenue
        )[0];
        aiResponse = `Peak asset detected: **${top.name}** generating **${format(top.activeRevenue, currency)} ${isARR ? "ARR" : "MRR"}** (${compactNumber(top.members)} members @ $${compactNumber(top.ticketSize)}).`;
      } else if (lowerMsg.includes("average") || lowerMsg.includes("avg")) {
        const paidData = data.filter((d) => d.ticketSize > 0);
        const avgTicket = paidData.length ? Math.round(
          paidData.reduce((a, c) => a + c.ticketSize, 0) / paidData.length
        ) : 0;
        const avgRev = data.length ? data.reduce((a, c) => a + c.activeRevenue, 0) / data.length : 0;
        aiResponse = `Mean metrics calculated: Ticket Price **$${compactNumber(avgTicket)}**, Revenue **${format(avgRev, currency)} ${isARR ? "ARR" : "MRR"}**.`;
      } else {
        const total = format(
          data.reduce((a, c) => a + c.activeRevenue, 0),
          currency
        );
        aiResponse = `Global pipeline resolves to **${total}**. Ask for specific maxima, minima, or averages.`;
      }
      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 600);
  }, [input, data, format, currency, isARR]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-[#0a0a0a]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-zinc-100 text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
        " Insight Copilot"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            onClose();
          },
          className: "relative z-[60] p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer pointer-events-auto",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0a0a0a]", children: [
      messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `max-w-[85%] rounded-lg p-3 text-[13px] leading-relaxed shadow-sm border ${msg.role === "user" ? "bg-zinc-200 text-zinc-900 border-zinc-200" : "bg-[#111] border-zinc-800 text-zinc-300"}`,
              children: msg.text.split("**").map(
                (chunk, j) => j % 2 === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "strong",
                  {
                    className: msg.role === "user" ? "text-black" : "text-white",
                    children: chunk
                  },
                  `bold-${j}`
                ) : chunk
              )
            }
          )
        },
        `msg-${i}-${msg.role}`
      )),
      isTyping && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#111] border border-zinc-800 rounded-lg p-4 flex gap-1.5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce",
            style: { animationDelay: "0ms" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce",
            style: { animationDelay: "150ms" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce",
            style: { animationDelay: "300ms" }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: endOfMessagesRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-zinc-800 shrink-0 bg-[#0a0a0a]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleSend(),
          placeholder: "Query data model...",
          className: "w-full bg-[#111] border border-zinc-800 rounded-md py-2.5 pl-3 pr-10 text-[13px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all pointer-events-auto"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleSend,
          disabled: !input.trim() || isTyping,
          className: "absolute right-1.5 w-7 h-7 rounded bg-zinc-200 flex items-center justify-center text-zinc-900 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all pointer-events-auto",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
        }
      )
    ] }) })
  ] });
});
export {
  AICopilot
};
