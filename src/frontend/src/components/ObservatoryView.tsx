import {
  BarChart3,
  Crown,
  DollarSign,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";
import { memo, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  Brush,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getTierInfo } from "../data/tiers";
import type { EnrichedCommunity } from "../types";
import { compactNumber } from "../utils/format";

function ChartTooltip({
  active,
  payload,
  format,
  currency,
}: {
  active?: boolean;
  payload?: Array<{ payload: Record<string, unknown> }>;
  format: (a: number, c: string) => string;
  currency: string;
}) {
  if (active && payload && payload.length) {
    const pData = payload[0].payload;
    return (
      <div className="bg-[#111] border border-zinc-800 p-3 rounded-lg shadow-xl">
        <p className="text-xs font-bold text-white mb-2">
          {String(pData.name || pData.date || "")}
        </p>
        {pData.members !== undefined && (
          <p className="text-[10px] text-zinc-400 font-mono">
            Audience: {compactNumber(pData.members as number)}
          </p>
        )}
        {pData.ticketSize !== undefined && (
          <p className="text-[10px] text-zinc-400 font-mono">
            Ticket: ${compactNumber(pData.ticketSize as number)}
          </p>
        )}
        {pData.activeRevenue !== undefined && (
          <p className="text-xs font-black text-white mt-1 font-mono">
            {format(pData.activeRevenue as number, currency)}
          </p>
        )}
        {pData.count !== undefined && (
          <p className="text-xs font-bold text-white">
            {String(pData.count)} Nodes
          </p>
        )}
        {pData.revenue !== undefined && (
          <p className="text-xs font-bold text-white">
            {format(pData.revenue as number, currency)}
          </p>
        )}
        {pData.value !== undefined && (
          <p className="text-xs font-bold text-white">
            {format(pData.value as number, currency)}
          </p>
        )}
      </div>
    );
  }
  return null;
}

type Props = {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  totalRev: number;
};

export const ObservatoryView = memo(function ObservatoryView({
  data,
  currency,
  format,
  isARR,
  totalRev,
}: Props) {
  const scatterData = useMemo(
    () => data.filter((d) => d.activeRevenue > 0),
    [data],
  );
  const topEarners = useMemo(
    () =>
      [...data].sort((a, b) => b.activeRevenue - a.activeRevenue).slice(0, 10),
    [data],
  );

  const pieData = useMemo(() => {
    let v500k = 0;
    let v100k = 0;
    let v25k = 0;
    let v10k = 0;
    let v1k = 0;
    let vUnder = 0;
    for (const d of data) {
      const r = d.activeRevenue;
      if (r >= 500000) v500k += r;
      else if (r >= 100000) v100k += r;
      else if (r >= 25000) v25k += r;
      else if (r >= 10000) v10k += r;
      else if (r >= 1000) v1k += r;
      else vUnder += r;
    }
    return [
      { name: "$500k+", value: v500k, color: "#ef4444" },
      { name: "$100k-$500k", value: v100k, color: "#fb7185" },
      { name: "$25k-$100k", value: v25k, color: "#facc15" },
      { name: "$10k-$25k", value: v10k, color: "#84cc16" },
      { name: "$1k-$10k", value: v1k, color: "#f0abfc" },
      { name: "<$1k", value: vUnder, color: "#a1a1aa" },
    ].filter((d) => d.value > 0);
  }, [data]);

  const priceHistogram = useMemo(() => {
    let countFree = 0;
    let countUnder50 = 0;
    let count50to99 = 0;
    let count100to499 = 0;
    let count500plus = 0;
    for (const d of data) {
      if (d.ticketSize === 0) countFree++;
      else if (d.ticketSize < 50) countUnder50++;
      else if (d.ticketSize < 100) count50to99++;
      else if (d.ticketSize < 500) count100to499++;
      else count500plus++;
    }
    return [
      { name: "Free", count: countFree },
      { name: "<$50", count: countUnder50 },
      { name: "$50-$99", count: count50to99 },
      { name: "$100-$499", count: count100to499 },
      { name: "$500+", count: count500plus },
    ];
  }, [data]);

  const timelineData = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => {
        const month = new Date();
        month.setMonth(month.getMonth() - (29 - i));
        const base = totalRev * 0.3;
        return {
          date: month.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          }),
          revenue: Math.floor(
            base + i * (totalRev * 0.02) + Math.sin(i) * (totalRev * 0.06),
          ),
        };
      }),
    [totalRev],
  );

  return (
    <div className="space-y-6">
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-zinc-200 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-zinc-400" /> Global Portfolio
            Trajectory
          </h3>
          <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold bg-zinc-900 px-2 py-1 rounded">
            Interactive
          </span>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71717a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#71717a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#71717a"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${compactNumber(v as number)}`}
                width={60}
              />
              <Tooltip
                content={<ChartTooltip format={format} currency={currency} />}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#a1a1aa"
                strokeWidth={2}
                fill="url(#colorRev)"
              />
              <Brush
                dataKey="date"
                height={30}
                stroke="#71717a"
                fill="#09090b"
                travellerWidth={10}
                className="opacity-80 border-zinc-800"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-zinc-400" /> Audience vs.{" "}
            {isARR ? "ARR" : "MRR"}
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  type="number"
                  dataKey="members"
                  name="Audience"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                />
                <YAxis
                  type="number"
                  dataKey="activeRevenue"
                  name="Revenue"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  width={50}
                />
                <Tooltip
                  content={<ChartTooltip format={format} currency={currency} />}
                  cursor={{ strokeDasharray: "3 3", stroke: "#3f3f46" }}
                />
                <Scatter data={scatterData} fill="#3b82f6" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-zinc-400" /> Price vs.{" "}
            {isARR ? "ARR" : "MRR"}
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  type="number"
                  dataKey="ticketSize"
                  name="Ticket"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => `$${compactNumber(v as number)}`}
                />
                <YAxis
                  type="number"
                  dataKey="activeRevenue"
                  name="Revenue"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  width={50}
                />
                <Tooltip
                  content={<ChartTooltip format={format} currency={currency} />}
                  cursor={{ strokeDasharray: "3 3", stroke: "#3f3f46" }}
                />
                <Scatter data={scatterData} fill="#facc15" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <Layers className="w-4 h-4 text-zinc-400" /> Price vs. Audience
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  type="number"
                  dataKey="ticketSize"
                  name="Ticket"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => `$${compactNumber(v as number)}`}
                />
                <YAxis
                  type="number"
                  dataKey="members"
                  name="Audience"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  width={50}
                />
                <Tooltip
                  content={<ChartTooltip format={format} currency={currency} />}
                  cursor={{ strokeDasharray: "3 3", stroke: "#3f3f46" }}
                />
                <Scatter data={scatterData} fill="#ec4899" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[400px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <Crown className="w-4 h-4 text-zinc-400" /> Revenue Leaders
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={topEarners}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  type="number"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  hide
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#a1a1aa"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={120}
                />
                <Tooltip
                  cursor={{ fill: "#18181b" }}
                  content={<ChartTooltip format={format} currency={currency} />}
                />
                <Bar dataKey="activeRevenue" radius={[0, 4, 4, 0]} barSize={16}>
                  {topEarners.map((entry) => {
                    const tier = getTierInfo(entry.activeRevenue);
                    const fillMap: Record<string, string> = {
                      "text-red-500": "#ef4444",
                      "text-rose-400": "#fb7185",
                      "text-yellow-400": "#facc15",
                      "text-lime-500": "#84cc16",
                      "text-fuchsia-300": "#f0abfc",
                      "text-zinc-400": "#a1a1aa",
                    };
                    return (
                      <Cell
                        key={`bar-${entry.id}`}
                        fill={fillMap[tier.color] || "#a1a1aa"}
                      />
                    );
                  })}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[400px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4 text-zinc-400" /> Tier Distribution
          </h3>
          <div className="flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry) => (
                    <Cell key={`pie-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={<ChartTooltip format={format} currency={currency} />}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {pieData.map((d) => (
              <div
                key={d.name}
                className="flex justify-between items-center text-xs"
              >
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />{" "}
                  {d.name}
                </span>
                <span className="text-zinc-200 font-mono font-bold">
                  {format(d.value, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[300px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4 text-zinc-400" /> Price Point Density
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={priceHistogram}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "#18181b" }}
                  content={<ChartTooltip format={format} currency={currency} />}
                />
                <Bar
                  dataKey="count"
                  fill="#84cc16"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
});
