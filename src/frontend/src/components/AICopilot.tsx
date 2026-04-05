import { Bot, Send, X } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { EnrichedCommunity } from "../types";
import { compactNumber } from "../utils/format";

type Props = {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  onClose: () => void;
};

export const AICopilot = memo(function AICopilot({
  data,
  currency,
  format,
  isARR,
  onClose,
}: Props) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Data matrix ingested. What specific anomalies or patterns would you like to uncover?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
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
          (a, b) => b.activeRevenue - a.activeRevenue,
        )[0];
        aiResponse = `Peak asset detected: **${top.name}** generating **${format(top.activeRevenue, currency)} ${isARR ? "ARR" : "MRR"}** (${compactNumber(top.members)} members @ $${compactNumber(top.ticketSize)}).`;
      } else if (lowerMsg.includes("average") || lowerMsg.includes("avg")) {
        const paidData = data.filter((d) => d.ticketSize > 0);
        const avgTicket = paidData.length
          ? Math.round(
              paidData.reduce((a, c) => a + c.ticketSize, 0) / paidData.length,
            )
          : 0;
        const avgRev = data.length
          ? data.reduce((a, c) => a + c.activeRevenue, 0) / data.length
          : 0;
        aiResponse = `Mean metrics calculated: Ticket Price **$${compactNumber(avgTicket)}**, Revenue **${format(avgRev, currency)} ${isARR ? "ARR" : "MRR"}**.`;
      } else {
        const total = format(
          data.reduce((a, c) => a + c.activeRevenue, 0),
          currency,
        );
        aiResponse = `Global pipeline resolves to **${total}**. Ask for specific maxima, minima, or averages.`;
      }

      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 600);
  }, [input, data, format, currency, isARR]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-[#0a0a0a]">
        <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
          <Bot className="w-4 h-4" /> Insight Copilot
        </h3>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="relative z-[60] p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer pointer-events-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0a0a0a]">
        {messages.map((msg, i) => (
          <div
            key={`msg-${i}-${msg.role}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 text-[13px] leading-relaxed shadow-sm border ${
                msg.role === "user"
                  ? "bg-zinc-200 text-zinc-900 border-zinc-200"
                  : "bg-[#111] border-zinc-800 text-zinc-300"
              }`}
            >
              {msg.text.split("**").map((chunk, j) =>
                j % 2 === 1 ? (
                  <strong
                    // biome-ignore lint/suspicious/noArrayIndexKey: split index is stable
                    key={`bold-${j}`}
                    className={
                      msg.role === "user" ? "text-black" : "text-white"
                    }
                  >
                    {chunk}
                  </strong>
                ) : (
                  chunk
                ),
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#111] border border-zinc-800 rounded-lg p-4 flex gap-1.5 shadow-sm">
              <span
                className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 border-t border-zinc-800 shrink-0 bg-[#0a0a0a]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Query data model..."
            className="w-full bg-[#111] border border-zinc-800 rounded-md py-2.5 pl-3 pr-10 text-[13px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all pointer-events-auto"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 w-7 h-7 rounded bg-zinc-200 flex items-center justify-center text-zinc-900 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all pointer-events-auto"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
});
