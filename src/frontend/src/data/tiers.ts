import {
  CircleDot,
  Crown,
  Rocket,
  Sparkles,
  Sprout,
  Target,
} from "lucide-react";

export const REVENUE_TIERS = [
  {
    id: "emperor",
    min: 500000,
    label: "Emperor",
    desc: "$500k+",
    color: "text-red-500",
    glow: "drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]",
    bg: "bg-red-950/20",
    border: "border-red-900/50",
    icon: Crown,
  },
  {
    id: "whale",
    min: 100000,
    label: "Whale",
    desc: "$100k - $500k",
    color: "text-rose-400",
    glow: "drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]",
    bg: "bg-rose-950/10",
    border: "border-rose-900/30",
    icon: Target,
  },
  {
    id: "pro",
    min: 25000,
    label: "Pro",
    desc: "$25k - $100k",
    color: "text-yellow-400",
    glow: "",
    bg: "bg-yellow-950/10",
    border: "border-yellow-900/30",
    icon: Rocket,
  },
  {
    id: "growth",
    min: 10000,
    label: "Growth",
    desc: "$10k - $25k",
    color: "text-lime-500",
    glow: "",
    bg: "bg-lime-950/10",
    border: "border-lime-900/30",
    icon: Sprout,
  },
  {
    id: "seed",
    min: 1000,
    label: "Seed",
    desc: "$1k - $10k",
    color: "text-fuchsia-300",
    glow: "",
    bg: "bg-fuchsia-950/10",
    border: "border-fuchsia-900/30",
    icon: Sparkles,
  },
  {
    id: "starter",
    min: 0,
    label: "Starter",
    desc: "< $1k",
    color: "text-zinc-400",
    glow: "",
    bg: "bg-transparent",
    border: "border-zinc-800",
    icon: CircleDot,
  },
];

export const TICKET_TIERS = [
  {
    id: "EX",
    min: 1000,
    abbr: "EX",
    label: "Extreme",
    desc: "$1k+",
    bg: "bg-[#d8b4fe]",
    text: "text-[#3b0764]",
  },
  {
    id: "VH",
    min: 200,
    abbr: "VH",
    label: "Very High",
    desc: "$200 - $1k",
    bg: "bg-red-500",
    text: "text-white",
  },
  {
    id: "HIG",
    min: 100,
    abbr: "HIG",
    label: "High Ticket",
    desc: "$100 - $200",
    bg: "bg-orange-500",
    text: "text-white",
  },
  {
    id: "BIG",
    min: 50,
    abbr: "BIG",
    label: "Big",
    desc: "$50 - $100",
    bg: "bg-yellow-400",
    text: "text-yellow-950",
  },
  {
    id: "NM",
    min: 17,
    abbr: "NM",
    label: "Normal",
    desc: "$17 - $50",
    bg: "bg-emerald-500",
    text: "text-white",
  },
  {
    id: "CM",
    min: 0,
    abbr: "CM",
    label: "Common",
    desc: "< $17",
    bg: "bg-zinc-200",
    text: "text-zinc-600",
  },
];

export const FREE_TIERS = [
  {
    id: "0-15k",
    label: "0 - 15k Members",
    color: "text-zinc-500",
    activeBg: "bg-zinc-800/60",
    activeText: "text-zinc-300",
  },
  {
    id: "15k-50k",
    label: "15k - 50k Members",
    color: "text-sky-500/70",
    activeBg: "bg-sky-500/10",
    activeText: "text-sky-300",
  },
  {
    id: "50k-100k",
    label: "50k - 100k Members",
    color: "text-teal-500/70",
    activeBg: "bg-teal-500/10",
    activeText: "text-teal-300",
  },
  {
    id: "100k-250k",
    label: "100k - 250k Members",
    color: "text-emerald-500/80",
    activeBg: "bg-emerald-500/10",
    activeText: "text-emerald-300",
  },
  {
    id: "250k+",
    label: "250k+ Members",
    color: "text-green-400",
    activeBg: "bg-green-500/15",
    activeText: "text-green-300",
  },
];

export function getTierInfo(exactRevenue: number) {
  const roundedRev = Math.round(exactRevenue / 1000) * 1000;
  return REVENUE_TIERS.find((t) => roundedRev >= t.min) || REVENUE_TIERS[5];
}

export function getTicketTierInfo(price: number) {
  return TICKET_TIERS.find((t) => price >= t.min) || TICKET_TIERS[5];
}
