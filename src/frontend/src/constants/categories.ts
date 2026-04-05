import {
  Activity,
  Banknote,
  Brain,
  Cpu,
  Dumbbell,
  HeartHandshake,
  Layers,
  Music2,
  Sun,
  Telescope,
  Trophy,
  Wand2,
} from "lucide-react";
import type React from "react";
import type { CategoryId } from "../types";

export const CAT_ICON_MAP: Record<
  string,
  { Icon: React.FC<{ className?: string }>; color: string }
> = {
  discovery: { Icon: Telescope, color: "text-violet-400" },
  music: { Icon: Music2, color: "text-pink-400" },
  selfimprovement: { Icon: Brain, color: "text-cyan-400" },
  money: { Icon: Banknote, color: "text-emerald-400" },
  spirituality: { Icon: Sun, color: "text-amber-400" },
  tech: { Icon: Cpu, color: "text-blue-400" },
  health: { Icon: Activity, color: "text-red-400" },
  relationships: { Icon: HeartHandshake, color: "text-rose-400" },
  sports: { Icon: Dumbbell, color: "text-orange-400" },
  hobbies: { Icon: Wand2, color: "text-purple-400" },
  top500: { Icon: Trophy, color: "text-amber-500" },
  megaall: { Icon: Layers, color: "text-indigo-400" },
};

export const CATEGORY_META: Record<
  string,
  {
    label: string;
    color: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  discovery: { label: "Discovery", color: "#8b5cf6", Icon: Telescope },
  music: { label: "Music", color: "#ec4899", Icon: Music2 },
  selfimprovement: { label: "Self Imp", color: "#06b6d4", Icon: Brain },
  money: { label: "Money", color: "#10b981", Icon: Banknote },
  spirituality: { label: "Spirit", color: "#f59e0b", Icon: Sun },
  tech: { label: "Tech", color: "#3b82f6", Icon: Cpu },
  health: { label: "Health", color: "#ef4444", Icon: Activity },
  relationships: { label: "Relations", color: "#f43f5e", Icon: HeartHandshake },
  sports: { label: "Sports", color: "#f97316", Icon: Dumbbell },
  hobbies: { label: "Hobbies", color: "#a855f7", Icon: Wand2 },
};

export type CategoryDef = {
  id: CategoryId;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  activeClass: string;
  iconColor: string;
  activeBg?: string;
  color?: string;
};

export const HEADER_CATEGORIES: CategoryDef[] = [
  {
    id: "discovery",
    Icon: Telescope,
    label: "Discovery",
    activeClass:
      "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-900/40",
    iconColor: "text-violet-400",
  },
  {
    id: "music",
    Icon: Music2,
    label: "Music",
    activeClass:
      "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-pink-900/40",
    iconColor: "text-pink-400",
  },
  {
    id: "selfimprovement",
    Icon: Brain,
    label: "Self Improve",
    activeClass:
      "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-cyan-900/40",
    iconColor: "text-cyan-400",
  },
  {
    id: "money",
    Icon: Banknote,
    label: "Money",
    activeClass:
      "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-900/40",
    iconColor: "text-emerald-400",
  },
  {
    id: "spirituality",
    Icon: Sun,
    label: "Spirituality",
    activeClass:
      "bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-amber-900/40",
    iconColor: "text-amber-400",
  },
  {
    id: "tech",
    Icon: Cpu,
    label: "Tech",
    activeClass:
      "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-blue-900/40",
    iconColor: "text-blue-400",
  },
  {
    id: "health",
    Icon: Activity,
    label: "Health",
    activeClass:
      "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-red-900/40",
    iconColor: "text-red-400",
  },
  {
    id: "relationships",
    Icon: HeartHandshake,
    label: "Relations",
    activeClass:
      "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-900/40",
    iconColor: "text-rose-400",
  },
  {
    id: "sports",
    Icon: Dumbbell,
    label: "Sports",
    activeClass:
      "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-900/40",
    iconColor: "text-orange-400",
  },
  {
    id: "hobbies",
    Icon: Wand2,
    label: "Hobbies",
    activeClass:
      "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-purple-900/40",
    iconColor: "text-purple-400",
  },
];

export const MOBILE_CATEGORIES: CategoryDef[] = [
  {
    id: "discovery",
    Icon: Telescope,
    label: "Discovery",
    activeClass: "",
    iconColor: "text-violet-400",
    color: "text-violet-400",
    activeBg:
      "bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30",
  },
  {
    id: "music",
    Icon: Music2,
    label: "Music",
    activeClass: "",
    iconColor: "text-pink-400",
    color: "text-pink-400",
    activeBg:
      "bg-gradient-to-r from-pink-600/20 to-rose-600/20 border-pink-500/30",
  },
  {
    id: "selfimprovement",
    Icon: Brain,
    label: "Self Improvement",
    activeClass: "",
    iconColor: "text-cyan-400",
    color: "text-cyan-400",
    activeBg:
      "bg-gradient-to-r from-cyan-600/20 to-teal-600/20 border-cyan-500/30",
  },
  {
    id: "money",
    Icon: Banknote,
    label: "Money",
    activeClass: "",
    iconColor: "text-emerald-400",
    color: "text-emerald-400",
    activeBg:
      "bg-gradient-to-r from-emerald-600/20 to-green-600/20 border-emerald-500/30",
  },
  {
    id: "spirituality",
    Icon: Sun,
    label: "Spirituality",
    activeClass: "",
    iconColor: "text-amber-400",
    color: "text-amber-400",
    activeBg:
      "bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-500/30",
  },
  {
    id: "tech",
    Icon: Cpu,
    label: "Tech",
    activeClass: "",
    iconColor: "text-blue-400",
    color: "text-blue-400",
    activeBg:
      "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/30",
  },
  {
    id: "health",
    Icon: Activity,
    label: "Health",
    activeClass: "",
    iconColor: "text-red-400",
    color: "text-red-400",
    activeBg:
      "bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500/30",
  },
  {
    id: "relationships",
    Icon: HeartHandshake,
    label: "Relationships",
    activeClass: "",
    iconColor: "text-rose-400",
    color: "text-rose-400",
    activeBg:
      "bg-gradient-to-r from-rose-600/20 to-pink-600/20 border-rose-500/30",
  },
  {
    id: "sports",
    Icon: Dumbbell,
    label: "Sports",
    activeClass: "",
    iconColor: "text-orange-400",
    color: "text-orange-400",
    activeBg:
      "bg-gradient-to-r from-orange-600/20 to-amber-600/20 border-orange-500/30",
  },
  {
    id: "hobbies",
    Icon: Wand2,
    label: "Hobbies",
    activeClass: "",
    iconColor: "text-purple-400",
    color: "text-purple-400",
    activeBg:
      "bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-purple-500/30",
  },
  {
    id: "top500",
    Icon: Trophy,
    label: "Top 500",
    activeClass: "",
    iconColor: "text-amber-500",
    color: "text-amber-500",
    activeBg:
      "bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-500/30",
  },
  {
    id: "megaall",
    Icon: Layers,
    label: "Mega All",
    activeClass: "",
    iconColor: "text-indigo-400",
    color: "text-indigo-400",
    activeBg:
      "bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border-indigo-500/30",
  },
];
