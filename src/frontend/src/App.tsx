import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Banknote,
  BarChart3,
  Bot,
  Brain,
  CircleDot,
  Cpu,
  Crown,
  DollarSign,
  Dumbbell,
  Eye,
  EyeOff,
  Filter,
  FilterX,
  Globe,
  Grid3x3,
  Heart,
  HeartHandshake,
  IndianRupee,
  Layers,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Music2,
  PanelLeft,
  PanelLeftClose,
  PanelRight,
  PanelRightClose,
  Rocket,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Table2,
  Tag,
  Target,
  Telescope,
  Trophy,
  Upload,
  Users,
  Wand2,
  X,
} from "lucide-react";
import type React from "react";
import {
  Suspense,
  lazy,
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EmptyState } from "./components/EmptyState";
import { findMatchInMap } from "./components/Top500ComparisonCard";
import { VirtualCardGrid } from "./components/VirtualCardGrid";
import {
  CAT_ICON_MAP,
  HEADER_CATEGORIES,
  MOBILE_CATEGORIES,
} from "./constants/categories";
import { DISCOVERY_CSV } from "./data/csvData";
import { loadCategoryWithCache } from "./data/dataEngine";
import { decodeInlineCsv, extractSlug, normalizeName } from "./data/dataEngine";
import {
  FREE_TIERS,
  REVENUE_TIERS,
  TICKET_TIERS,
  getTicketTierInfo,
  getTierInfo,
} from "./data/tiers";
import type { CategoryId, Community, EnrichedCommunity } from "./types";
import { compactNumber, formatCurrency } from "./utils/format";

// Lazy-loaded heavy components for code splitting
const LedgerView = lazy(() =>
  import("./components/LedgerView").then((m) => ({ default: m.LedgerView })),
);
const ObservatoryView = lazy(() =>
  import("./components/ObservatoryView").then((m) => ({
    default: m.ObservatoryView,
  })),
);
const AICopilot = lazy(() =>
  import("./components/AICopilot").then((m) => ({ default: m.AICopilot })),
);

export default function App() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("megaall");
  const [isLoading, setIsLoading] = useState(false);
  const [inrRate, setInrRate] = useState(87);
  const [inrRateInput, setInrRateInput] = useState("87");
  const [hideNoMatch, setHideNoMatch] = useState(false);
  const [mrrDeltaFilter, setMrrDeltaFilter] = useState<
    "all" | "growth" | "declined"
  >("all");

  const discoveryData = useMemo(() => decodeInlineCsv(DISCOVERY_CSV), []);

  const discoveryMap = useMemo(() => {
    const slugMap = new Map<string, Community>();
    const nameMap = new Map<string, Community>();
    for (const c of discoveryData) {
      const slug = extractSlug(c.url);
      if (slug) slugMap.set(slug, c);
      nameMap.set(normalizeName(c.name), c);
    }
    return { slugMap, nameMap };
  }, [discoveryData]);

  const [view, setView] = useState("gallery");
  const [currency, setCurrency] = useState("USD");
  const [isARR, setIsARR] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [mrrFilter, setMrrFilter] = useState("all");
  const [langFilter, setLangFilter] = useState("All");
  const [ticketFilter, setTicketFilter] = useState("All");
  const [sortBy, setSortBy] = useState("mrr");
  const [sortDir, setSortDir] = useState("desc");
  const [includeFreeThreshold, setIncludeFreeThreshold] = useState<
    number | null
  >(null);
  const [freeTierFilter, setFreeTierFilter] = useState("none");
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const [tempFreeThreshold, setTempFreeThreshold] = useState(0);
  const [showFixed, setShowFixed] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isScrollFocused, setIsScrollFocused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  const scrollFocusCooldownRef = useRef(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const uniqueLangs = useMemo(() => {
    const langs = new Set<string>();
    for (const c of communities) {
      if (c.language?.lang) langs.add(JSON.stringify(c.language));
    }
    return Array.from(langs)
      .map((l) => JSON.parse(l) as { lang: string; flag: string })
      .sort((a, b) => a.lang.localeCompare(b.lang));
  }, [communities]);

  const filteredData = useMemo((): EnrichedCommunity[] => {
    // Pre-lowercase the search string once outside the filter loop
    const searchLower = search.toLowerCase();

    const result = communities
      .filter(
        (c) =>
          c.nameLower.includes(searchLower) ||
          c.creatorName.toLowerCase().includes(searchLower),
      )
      .filter((c) => langFilter === "All" || c.language.lang === langFilter);

    let enriched: EnrichedCommunity[] = result.map((c) => ({
      ...c,
      activeRevenue: c.mrr * (isARR ? 12 : 1),
      activeTicket: c.ticketSize * (isARR ? 12 : 1),
    }));

    enriched = enriched.filter((c) => {
      if (showFixed) return c.pricingType === "fixed";
      if (showYearly) return c.pricingType === "yearly";
      return c.pricingType === "monthly";
    });

    enriched = enriched.filter((c) => {
      const isFree = c.pricingType === "monthly" && c.ticketSize === 0;
      if (showFixed || showYearly) return true;

      if (freeTierFilter !== "none") {
        if (!isFree) return false;
        if (freeTierFilter === "0-15k") return c.members <= 15000;
        if (freeTierFilter === "15k-50k")
          return c.members > 15000 && c.members <= 50000;
        if (freeTierFilter === "50k-100k")
          return c.members > 50000 && c.members <= 100000;
        if (freeTierFilter === "100k-250k")
          return c.members > 100000 && c.members <= 250000;
        if (freeTierFilter === "250k+") return c.members > 250000;
        return true;
      }

      if (isFree) {
        if (includeFreeThreshold === null) return false;
        if (c.members < includeFreeThreshold) return false;
      }

      if (mrrFilter !== "all") {
        const revTier = getTierInfo(c.activeRevenue);
        if (revTier.id !== mrrFilter) return false;
      }
      if (ticketFilter !== "All") {
        const tTier = getTicketTierInfo(c.ticketSize);
        if (tTier.id !== ticketFilter) return false;
      }
      return true;
    });

    enriched.sort((a, b) => {
      let valA = a.activeRevenue;
      let valB = b.activeRevenue;
      if (sortBy === "members") {
        valA = a.members;
        valB = b.members;
      } else if (sortBy === "arpu") {
        valA = a.activeTicket;
        valB = b.activeTicket;
      }
      if (valA < valB) return sortDir === "desc" ? 1 : -1;
      if (valA > valB) return sortDir === "desc" ? -1 : 1;
      return 0;
    });

    return enriched;
  }, [
    communities,
    search,
    langFilter,
    ticketFilter,
    mrrFilter,
    sortBy,
    sortDir,
    isARR,
    includeFreeThreshold,
    freeTierFilter,
    showFixed,
    showYearly,
  ]);

  const totalRev = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.activeRevenue, 0),
    [filteredData],
  );
  const avgTicket = useMemo(() => {
    const paidData = filteredData.filter((d) => d.ticketSize > 0);
    return paidData.length
      ? Math.round(
          paidData.reduce((a, c) => a + c.activeTicket, 0) / paidData.length,
        )
      : 0;
  }, [filteredData]);

  const tierCounts = useMemo(() => {
    const counts = { ultra: 0, high: 0, mid: 0, low: 0 };
    for (const d of filteredData) {
      if (d.mrr >= 100000) counts.ultra++;
      else if (d.mrr >= 25000) counts.high++;
      else if (d.mrr >= 10000) counts.mid++;
      else if (d.mrr >= 1000) counts.low++;
    }
    return counts;
  }, [filteredData]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        // Dynamic import to avoid circular deps
        import("./data/dataEngine").then(({ parseCSVData }) => {
          const parsed = parseCSVData(e.target?.result as string);
          if (parsed.length > 0) setCommunities(parsed);
          event.target.value = "";
        });
      };
      reader.readAsText(file);
    },
    [],
  );

  const handleCategorySwitch = useCallback(async (cat: CategoryId) => {
    setActiveCategory(cat);
    setIsScrollFocused(false);
    lastScrollTopRef.current = 0;
    scrollFocusCooldownRef.current = true;
    setTimeout(() => {
      scrollFocusCooldownRef.current = false;
    }, 600);

    // Reset filters atomically
    Promise.resolve().then(() => {
      setMrrFilter("all");
      setLangFilter("All");
      setTicketFilter("All");
      setFreeTierFilter("none");
      setSearch("");
      setSearchInput("");
      setShowFixed(false);
      setShowYearly(false);
    });

    const isCached = await loadCategoryWithCache(cat)
      .then(() => true)
      .catch(() => false);
    void isCached;

    // Skip loading spinner for cached data

    const dataPromise = loadCategoryWithCache(cat);

    // Only show loading spinner if it takes more than 100ms (not cached)
    const spinnerTimeout = setTimeout(() => setIsLoading(true), 100);

    try {
      const data = await dataPromise;
      clearTimeout(spinnerTimeout);
      startTransition(() => {
        setCommunities(data);
        setIsLoading(false);
      });
    } catch {
      clearTimeout(spinnerTimeout);
      setIsLoading(false);
    }
  }, []);

  const boundFormat = useCallback(
    (amount: number, curr: string) => formatCurrency(amount, curr, inrRate),
    [inrRate],
  );

  const clearFilters = useCallback(() => {
    setSearch("");
    setSearchInput("");
    setLangFilter("All");
    setIsScrollFocused(false);
    scrollFocusCooldownRef.current = true;
    setTimeout(() => {
      scrollFocusCooldownRef.current = false;
    }, 600);
    setMrrFilter("all");
    setTicketFilter("All");
    setIncludeFreeThreshold(null);
    setFreeTierFilter("none");
  }, []);

  // Load Mega All on initial mount
  useEffect(() => {
    const spinnerTimeout = setTimeout(() => setIsLoading(true), 100);
    loadCategoryWithCache("megaall").then((data) => {
      clearTimeout(spinnerTimeout);
      startTransition(() => {
        setCommunities(data);
        setIsLoading(false);
      });
    });
    return () => clearTimeout(spinnerTimeout);
  }, []);

  // Auto-redirect from Ledger view on mobile
  useEffect(() => {
    if (view === "table" && window.innerWidth < 768) {
      setView("gallery");
    }
  }, [view]);

  const handleSearch = useCallback((val: string) => {
    setSearchInput(val);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => setSearch(val), 150);
  }, []);

  const handleZenMode = useCallback((status: boolean) => {
    setIsZenMode(status);
    if (status) {
      setIsChatOpen(false);
      setIsScrollFocused(false);
    }
  }, []);

  // Scroll-driven focus mode
  // Two paths:
  // 1. Gallery (VirtualCardGrid): onVirtualScroll callback fires from inside react-window's outerRef
  // 2. Table/Analytics: attach to scrollContainerRef directly; re-attach when view changes
  const rafPendingRef = useRef(false);

  const processScroll = useCallback(
    (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      if (scrollFocusCooldownRef.current) return;
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        const delta = scrollTop - lastScrollTopRef.current;
        const nearBottom = scrollHeight - scrollTop - clientHeight < 120;
        if (delta > 25 && scrollTop > 100 && !nearBottom) {
          setIsScrollFocused(true);
        } else if (delta < -15) {
          setIsScrollFocused(false);
        }
        lastScrollTopRef.current = scrollTop;
      });
    },
    [],
  );

  // Called by VirtualCardGrid (gallery view) via outerRef scroll listener
  const onVirtualScroll = useCallback(
    (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      processScroll(scrollTop, scrollHeight, clientHeight);
    },
    [processScroll],
  );

  // For non-gallery views (table / analytics): attach to the scrollable container
  useEffect(() => {
    if (view === "gallery") return; // handled by VirtualCardGrid's onScroll prop
    const container = scrollContainerRef.current;
    if (!container) return;

    // Reset scroll position tracking on view switch
    lastScrollTopRef.current = 0;

    const handler = () => {
      processScroll(
        container.scrollTop,
        container.scrollHeight,
        container.clientHeight,
      );
    };

    container.addEventListener("scroll", handler, { passive: true });
    return () => container.removeEventListener("scroll", handler);
  }, [view, processScroll]);

  // Reset scroll focus when zen mode activates
  useEffect(() => {
    if (isZenMode) setIsScrollFocused(false);
  }, [isZenMode]);

  return (
    <div className="fixed inset-0 bg-[#09090b] text-zinc-100 flex flex-col font-sans antialiased overflow-hidden">
      {isFreeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scaleIn">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white">
                Include Free Communities
              </h3>
              <button
                type="button"
                onClick={() => setIsFreeModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Include all $0 ticket communities with more than ____ members. (0
              includes all free communities)
            </p>
            <input
              type="number"
              value={tempFreeThreshold}
              onChange={(e) => setTempFreeThreshold(Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-zinc-700 focus:border-indigo-500 outline-none rounded-lg p-2.5 text-white text-sm mb-5 font-mono"
              placeholder="e.g. 10000"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIncludeFreeThreshold(null);
                  setIsFreeModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95"
              >
                Disable Free
              </button>
              <button
                type="button"
                onClick={() => {
                  setIncludeFreeThreshold(tempFreeThreshold);
                  setFreeTierFilter("none");
                  setIsFreeModalOpen(false);
                }}
                className="px-5 py-2 bg-zinc-200 hover:bg-white text-black text-xs font-bold rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className={`shrink-0 transform-gpu transition-[transform,opacity] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
          isZenMode
            ? "hidden"
            : isScrollFocused
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
        }`}
        style={
          isScrollFocused && !isZenMode ? { marginBottom: "-56px" } : undefined
        }
      >
        <header className="h-14 flex items-center gap-2 px-3 md:px-4 shrink-0 bg-[#09090b]/95 backdrop-blur-sm border-b border-zinc-800/60 z-20">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setIsLeftOpen(!isLeftOpen)}
              className={`p-1.5 rounded-md motion-safe:transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 hidden md:flex items-center justify-center min-w-[36px] min-h-[36px] ${isLeftOpen ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
            >
              {isLeftOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeft className="w-4 h-4" />
              )}
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 bg-white/90 text-zinc-900 rounded-[7px] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>

            {/* Category Switcher pill - desktop */}
            <div
              className="hidden md:flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/60 rounded-full px-2 py-[3px] overflow-x-auto md:overflow-hidden shrink-0 scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {HEADER_CATEGORIES.map(
                ({ id, Icon, label, activeClass, iconColor }) => {
                  const isActive = activeCategory === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      data-ocid={`nav.${id}.tab`}
                      onClick={() => handleCategorySwitch(id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] whitespace-nowrap active:scale-95 shrink-0 ${
                        isActive
                          ? `${activeClass} shadow-md`
                          : `${iconColor} hover:bg-zinc-800/80 hover:text-zinc-200`
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px] shrink-0" />
                      {isActive && (
                        <span className="overflow-hidden transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] max-w-[80px] opacity-100">
                          {label}
                        </span>
                      )}
                    </button>
                  );
                },
              )}

              {/* Divider */}
              <div className="w-px h-5 bg-zinc-700/60 mx-1 shrink-0" />

              {/* Top 500 */}
              {(() => {
                const isActive = activeCategory === "top500";
                return (
                  <button
                    key="top500"
                    type="button"
                    data-ocid="nav.top500.tab"
                    onClick={() => handleCategorySwitch("top500")}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] whitespace-nowrap active:scale-95 shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-md shadow-amber-900/40"
                        : "text-amber-500 hover:bg-zinc-800/80 hover:text-amber-400"
                    }`}
                  >
                    <Trophy className="w-[18px] h-[18px] shrink-0" />
                    {isActive && <span>Top 500</span>}
                  </button>
                );
              })()}

              {/* Mega All */}
              {(() => {
                const isActive = activeCategory === "megaall";
                return (
                  <button
                    key="megaall"
                    type="button"
                    data-ocid="nav.megaall.tab"
                    onClick={() => handleCategorySwitch("megaall")}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] whitespace-nowrap active:scale-95 shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-900/40"
                        : "text-indigo-400 hover:bg-zinc-800/80 hover:text-indigo-300"
                    }`}
                  >
                    <Layers className="w-[18px] h-[18px] shrink-0" />
                    {isActive && <span>Mega All</span>}
                  </button>
                );
              })()}
            </div>

            {/* Search bar */}
            <div className="relative flex items-center">
              <Search className="absolute left-2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-24 sm:w-32 bg-zinc-900/80 border border-zinc-800/80 rounded-full py-1.5 pl-7 pr-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 transition-[border-color,background-color] duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] min-h-[36px]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchInput("");
                  }}
                  className="absolute right-2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleZenMode(true)}
              className="p-1.5 rounded-md transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-transparent border-transparent text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 active:scale-95"
              title="Focus Mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              data-ocid="mobile.filter.button"
              onClick={() => setMobileFilterOpen(true)}
              className="flex md:hidden p-1.5 rounded-md transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 active:scale-95 min-w-[36px] min-h-[36px] items-center justify-center"
              title="Filters"
            >
              <Filter className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`flex p-1.5 rounded-md transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] border active:scale-95 ${isFiltersOpen ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-transparent border-transparent text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
              title="Toggle Advanced Filters"
            >
              {isFiltersOpen ? (
                <FilterX className="w-4 h-4" />
              ) : (
                <Filter className="w-4 h-4" />
              )}
            </button>

            <div className="h-4 w-px bg-zinc-800 mx-1 hidden sm:block" />

            <div className="hidden sm:flex bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
              <button
                type="button"
                onClick={() => setIsARR(false)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${!isARR ? "bg-zinc-700 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                MRR
              </button>
              <button
                type="button"
                onClick={() => setIsARR(true)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${isARR ? "bg-zinc-700 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                ARR
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrency(currency === "USD" ? "INR" : "USD")}
                className="text-xs font-bold text-zinc-400 hover:text-zinc-200 transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md"
              >
                {currency === "USD" ? (
                  <DollarSign className="w-3.5 h-3.5" />
                ) : (
                  <IndianRupee className="w-3.5 h-3.5" />
                )}
              </button>
              {currency === "INR" && (
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md overflow-hidden">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={inrRateInput}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setInrRateInput(raw);
                      const parsed = Number.parseInt(raw, 10);
                      if (parsed >= 1) setInrRate(parsed);
                    }}
                    onBlur={() => {
                      const parsed = Number.parseInt(inrRateInput, 10);
                      const valid = parsed >= 1 ? parsed : 87;
                      setInrRate(valid);
                      setInrRateInput(String(valid));
                    }}
                    className="w-14 bg-transparent text-[11px] font-bold text-amber-400 px-1.5 py-1 focus:outline-none text-center"
                    title="INR exchange rate"
                  />
                  <span className="text-[9px] text-zinc-500 pr-1.5 font-bold">
                    ₹/$
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`hidden lg:flex p-1.5 rounded-md transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] border active:scale-95 ${isChatOpen ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" : "bg-transparent border-transparent text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
              title="AI Copilot"
            >
              <Bot className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsRightOpen(!isRightOpen)}
              className={`p-1.5 rounded-md transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${isRightOpen ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
            >
              {isRightOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <PanelRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile filter bottom sheet */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${mobileFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          data-ocid="mobile.filter.modal"
        >
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm w-full h-full"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 bg-[#09090b] rounded-t-2xl border-t border-zinc-800/80 max-h-[82vh] flex flex-col overflow-hidden transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] transform-gpu will-change-transform ${mobileFilterOpen ? "translate-y-0" : "translate-y-full"}`}
          >
            <div className="w-10 h-1 bg-zinc-600 rounded-full mx-auto mt-3 mb-2 shrink-0" />
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/60 shrink-0">
              <span className="text-sm font-bold text-zinc-200">Filters</span>
              <button
                type="button"
                data-ocid="mobile.filter.close_button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1">
              {/* Sort */}
              <div className="p-3 space-y-1 mt-2 pt-2">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 pb-2">
                  Sort By
                </div>
                {[
                  { id: "mrr", label: "Revenue" },
                  { id: "members", label: "Members" },
                  { id: "arpu", label: "Ticket Price" },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSortBy(s.id)}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg motion-safe:transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-sm font-medium active:scale-95 min-h-[44px] ${sortBy === s.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                  >
                    <span className="text-[12px] font-bold">{s.label}</span>
                    {sortBy === s.id && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSortDir((d) => (d === "desc" ? "asc" : "desc"));
                        }}
                        className="ml-auto p-1 rounded hover:bg-zinc-700 text-zinc-300 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                      >
                        {sortDir === "desc" ? (
                          <ArrowDown className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUp className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </button>
                ))}
              </div>

              {/* Pricing Type */}
              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 pb-2">
                  Pricing Type
                </div>
                <button
                  type="button"
                  data-ocid="pricing.fixed.toggle"
                  onClick={() => {
                    setShowFixed((v) => !v);
                    setShowYearly(false);
                    setIsScrollFocused(false);
                    scrollFocusCooldownRef.current = true;
                    setTimeout(() => {
                      scrollFocusCooldownRef.current = false;
                    }, 600);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-sm font-medium active:scale-95 min-h-[44px] ${showFixed ? "bg-amber-500/20 text-amber-400 border-l-2 border-l-amber-500 border border-amber-500/30" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                >
                  <span className="text-base">🏷️</span>
                  <span className="text-[12px] font-bold">
                    One-Time / Fixed
                  </span>
                  {showFixed && (
                    <span className="ml-auto text-[9px] font-bold bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded-full">
                      ON
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  data-ocid="pricing.yearly.toggle"
                  onClick={() => {
                    setShowYearly((v) => !v);
                    setShowFixed(false);
                    setIsScrollFocused(false);
                    scrollFocusCooldownRef.current = true;
                    setTimeout(() => {
                      scrollFocusCooldownRef.current = false;
                    }, 600);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-sm font-medium active:scale-95 min-h-[44px] ${showYearly ? "bg-sky-500/20 text-sky-400 border-l-2 border-l-sky-500 border border-sky-500/30" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                >
                  <span className="text-base">📅</span>
                  <span className="text-[12px] font-bold">
                    Yearly Memberships
                  </span>
                  {showYearly && (
                    <span className="ml-auto text-[9px] font-bold bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded-full">
                      ON
                    </span>
                  )}
                </button>
              </div>

              {/* Pipeline Tiers */}
              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Pipeline Tiers
                  </div>
                  {mrrFilter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setMrrFilter("all")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setMrrFilter("all")}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${mrrFilter === "all" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-3.5 h-3.5 rounded-sm bg-zinc-700 flex items-center justify-center text-[8px] font-black shrink-0 text-white">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Pipeline</span>
                </button>
                {REVENUE_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setMrrFilter(tier.id);
                      setFreeTierFilter("none");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${mrrFilter === tier.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <tier.icon
                      className={`w-3.5 h-3.5 shrink-0 ${tier.color}`}
                    />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {tier.label}
                      </span>
                      <span className="text-[9px] font-medium text-zinc-600 leading-tight mt-0.5">
                        {tier.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Ticket Size - mobile */}
              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Ticket Size
                  </div>
                  {ticketFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setTicketFilter("All")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setTicketFilter("All")}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${ticketFilter === "All" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-6 h-4 rounded bg-zinc-700 text-white text-[7px] flex items-center justify-center font-black shrink-0">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Tickets</span>
                </button>
                {TICKET_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setTicketFilter(tier.id);
                      setFreeTierFilter("none");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${ticketFilter === tier.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <div
                      className={`w-6 h-4 rounded ${tier.bg} ${tier.text} text-[7px] flex items-center justify-center font-black shrink-0 shadow-sm`}
                    >
                      {tier.abbr}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {tier.label}
                      </span>
                      <span className="text-[9px] font-medium text-zinc-600 leading-tight mt-0.5">
                        {tier.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Free Only View - mobile */}
              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-start px-3 pb-2">
                  <div className="flex flex-col">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                      Free Only View
                    </div>
                    <span className="text-[8px] text-zinc-500 font-medium leading-tight mt-0.5">
                      (Only Free Shown)
                    </span>
                  </div>
                  {freeTierFilter !== "none" && (
                    <button
                      type="button"
                      onClick={() => {
                        setFreeTierFilter("none");
                        setIncludeFreeThreshold(null);
                      }}
                      className="text-[9px] text-indigo-400 hover:text-indigo-300 uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFreeTierFilter("all");
                    setMrrFilter("all");
                    setTicketFilter("All");
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${freeTierFilter === "all" ? "bg-indigo-500/20 text-indigo-300" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <span className="text-[12px] font-bold">
                    All Free Communities
                  </span>
                </button>
                {FREE_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setFreeTierFilter(tier.id);
                      setMrrFilter("all");
                      setTicketFilter("All");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${freeTierFilter === tier.id ? `${tier.activeBg} ${tier.activeText}` : `${tier.color} hover:bg-zinc-900`}`}
                  >
                    <span className="text-[12px] font-bold leading-tight">
                      {tier.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Region - mobile */}
              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4 pb-6">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Region
                  </div>
                  {langFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setLangFilter("All")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLangFilter("All")}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${langFilter === "All" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-6 h-4 rounded bg-zinc-700 text-white text-[7px] flex items-center justify-center font-black shrink-0">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Regions</span>
                </button>
                {uniqueLangs.map((l) => (
                  <button
                    type="button"
                    key={l.lang}
                    onClick={() => setLangFilter(l.lang)}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 min-h-[44px] ${langFilter === l.lang ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <div className="text-base shrink-0">{l.flag}</div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {l.lang}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop left sidebar */}
        {!isZenMode && (
          <aside
            className={`border-r border-zinc-800/80 bg-[#09090b] flex flex-col shrink-0 overflow-x-hidden overflow-y-auto custom-scrollbar transform-gpu will-change-transform motion-safe:transition-[transform,opacity,width] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${isLeftOpen ? "w-52 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-full border-none"} hidden md:flex`}
          >
            <div className="w-52 flex flex-col min-h-full">
              {/* View switcher */}
              <div className="p-3 space-y-1 border-b border-zinc-800/50">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 pb-2">
                  Workspace
                </div>
                {(
                  [
                    { id: "gallery", Icon: LayoutGrid, label: "Cards View" },
                    { id: "table", Icon: Table2, label: "Data Ledger" },
                    { id: "analytics", Icon: BarChart3, label: "Observatory" },
                  ] as const
                ).map(({ id, Icon, label }) => (
                  <button
                    type="button"
                    key={id}
                    data-ocid={`sidebar.${id}.tab`}
                    onClick={() => setView(id)}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${view === id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[12px] font-bold">{label}</span>
                  </button>
                ))}
              </div>

              {/* Pricing type */}
              <div className="p-3 space-y-1 border-b border-zinc-800/50">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 pb-2">
                  Pricing Type
                </div>
                <button
                  type="button"
                  data-ocid="sidebar.pricing.fixed.toggle"
                  onClick={() => {
                    setShowFixed((v) => !v);
                    setShowYearly(false);
                    setIsScrollFocused(false);
                    scrollFocusCooldownRef.current = true;
                    setTimeout(() => {
                      scrollFocusCooldownRef.current = false;
                    }, 600);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-sm font-medium active:scale-95 ${showFixed ? "bg-amber-500/20 text-amber-400 border-l-2 border-l-amber-500 border border-amber-500/30" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                >
                  <span className="text-base">🏷️</span>
                  <span className="text-[12px] font-bold">
                    One-Time / Fixed
                  </span>
                  {showFixed && (
                    <span className="ml-auto text-[9px] font-bold bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded-full">
                      ON
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  data-ocid="sidebar.pricing.yearly.toggle"
                  onClick={() => {
                    setShowYearly((v) => !v);
                    setShowFixed(false);
                    setIsScrollFocused(false);
                    scrollFocusCooldownRef.current = true;
                    setTimeout(() => {
                      scrollFocusCooldownRef.current = false;
                    }, 600);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-sm font-medium active:scale-95 ${showYearly ? "bg-sky-500/20 text-sky-400 border-l-2 border-l-sky-500 border border-sky-500/30" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                >
                  <span className="text-base">📅</span>
                  <span className="text-[12px] font-bold">
                    Yearly Memberships
                  </span>
                  {showYearly && (
                    <span className="ml-auto text-[9px] font-bold bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded-full">
                      ON
                    </span>
                  )}
                </button>
              </div>

              {/* Sort */}
              <div className="p-3 space-y-1 border-b border-zinc-800/50">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 pb-2">
                  Sort By
                </div>
                {[
                  { id: "mrr", label: "Revenue" },
                  { id: "members", label: "Members" },
                  { id: "arpu", label: "Ticket Price" },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSortBy(s.id)}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${sortBy === s.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <span className="text-[12px] font-bold">{s.label}</span>
                    {sortBy === s.id && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSortDir((d) => (d === "desc" ? "asc" : "desc"));
                        }}
                        className="ml-auto p-1 rounded hover:bg-zinc-700 text-zinc-300 transition-colors"
                      >
                        {sortDir === "desc" ? (
                          <ArrowDown className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUp className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </button>
                ))}
              </div>

              {/* Pipeline Tiers */}
              <div className="p-3 space-y-1 border-b border-zinc-800/50">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Pipeline Tiers
                  </div>
                  {mrrFilter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setMrrFilter("all")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setMrrFilter("all")}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${mrrFilter === "all" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-3.5 h-3.5 rounded-sm bg-zinc-700 flex items-center justify-center text-[8px] font-black shrink-0 text-white">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Pipeline</span>
                </button>
                {REVENUE_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setMrrFilter(tier.id);
                      setFreeTierFilter("none");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${mrrFilter === tier.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <tier.icon
                      className={`w-3.5 h-3.5 shrink-0 ${tier.color}`}
                    />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {tier.label}
                      </span>
                      <span className="text-[9px] font-medium text-zinc-600 leading-tight mt-0.5">
                        {tier.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Ticket Size */}
              <div className="p-3 space-y-1 border-b border-zinc-800/50 mb-4">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Ticket Size
                  </div>
                  {ticketFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setTicketFilter("All")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setTicketFilter("All")}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${ticketFilter === "All" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-6 h-4 rounded bg-zinc-700 text-white text-[7px] flex items-center justify-center font-black shrink-0">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Tickets</span>
                </button>
                {TICKET_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setTicketFilter(tier.id);
                      setFreeTierFilter("none");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${ticketFilter === tier.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <div
                      className={`w-6 h-4 rounded ${tier.bg} ${tier.text} text-[7px] flex items-center justify-center font-black shrink-0 shadow-sm`}
                    >
                      {tier.abbr}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {tier.label}
                      </span>
                      <span className="text-[9px] font-medium text-zinc-600 leading-tight mt-0.5">
                        {tier.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Free Only View */}
              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-start px-3 pb-2">
                  <div className="flex flex-col">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                      Free Only View
                    </div>
                    <span className="text-[8px] text-zinc-500 font-medium leading-tight mt-0.5">
                      (Only Free Shown)
                    </span>
                  </div>
                  {freeTierFilter !== "none" && (
                    <button
                      type="button"
                      onClick={() => {
                        setFreeTierFilter("none");
                        setIncludeFreeThreshold(null);
                      }}
                      className="text-[9px] text-indigo-400 hover:text-indigo-300 uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFreeTierFilter("all");
                    setMrrFilter("all");
                    setTicketFilter("All");
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${freeTierFilter === "all" ? "bg-indigo-500/20 text-indigo-300" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <span className="text-[12px] font-bold">
                    All Free Communities
                  </span>
                </button>
                {FREE_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setFreeTierFilter(tier.id);
                      setMrrFilter("all");
                      setTicketFilter("All");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${
                      freeTierFilter === tier.id
                        ? `${tier.activeBg} ${tier.activeText}`
                        : `${tier.color} hover:bg-zinc-900`
                    }`}
                  >
                    <span className="text-[12px] font-bold leading-tight">
                      {tier.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Region */}
              <div className="p-3 space-y-1 mt-2 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Region
                  </div>
                  {langFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setLangFilter("All")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLangFilter("All")}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${langFilter === "All" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-6 h-4 rounded bg-zinc-700 text-white text-[7px] flex items-center justify-center font-black shrink-0">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Regions</span>
                </button>
                {uniqueLangs.map((l) => (
                  <button
                    type="button"
                    key={l.lang}
                    onClick={() => setLangFilter(l.lang)}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] text-left active:scale-95 ${langFilter === l.lang ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <div className="text-base shrink-0">{l.flag}</div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {l.lang}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 mt-auto border-t border-zinc-800/50">
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-zinc-100 text-zinc-900 rounded-lg text-xs font-bold hover:bg-white transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5" /> Import CSV
                </button>
              </div>
            </div>
          </aside>
        )}

        <main
          className={`flex-1 flex flex-col min-w-0 bg-[#0a0a0a] md:pb-0 transition-[padding] duration-[300ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${isScrollFocused ? "pb-0" : "pb-16"}`}
        >
          {/* Filter bar */}
          {!isZenMode && (
            <div
              className={`transition-[opacity] duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0 border-b border-zinc-800/50 bg-[#0a0a0a] will-change-transform ${
                isFiltersOpen && !isScrollFocused
                  ? "opacity-100 py-2"
                  : "opacity-0 pointer-events-none border-none h-0 overflow-hidden"
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between px-4">
                <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 lg:pb-0 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsFreeModalOpen(true)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-colors ${
                      includeFreeThreshold !== null || freeTierFilter !== "none"
                        ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-400"
                        : "bg-transparent border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {includeFreeThreshold !== null ||
                    freeTierFilter !== "none" ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                    {includeFreeThreshold !== null
                      ? `Free (>${compactNumber(includeFreeThreshold)})`
                      : freeTierFilter !== "none"
                        ? "Free Only View"
                        : "+ Include Free"}
                  </button>

                  <div className="w-px h-4 bg-zinc-800 mx-1" />

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <Tag className="w-3 h-3 text-zinc-500 ml-1.5" />
                    <select
                      value={ticketFilter}
                      onChange={(e) => {
                        setTicketFilter(e.target.value);
                        setFreeTierFilter("none");
                      }}
                      className="bg-zinc-900 text-zinc-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="All">All Tickets</option>
                      {TICKET_TIERS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label} ({t.desc})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <SlidersHorizontal className="w-3 h-3 text-zinc-500 ml-1.5" />
                    <select
                      value={mrrFilter}
                      onChange={(e) => {
                        setMrrFilter(e.target.value);
                        setFreeTierFilter("none");
                      }}
                      className="bg-zinc-900 text-zinc-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="all">All Pipeline</option>
                      {REVENUE_TIERS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label} ({t.desc})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <ArrowUpDown className="w-3 h-3 text-zinc-500 ml-1.5" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-zinc-900 text-zinc-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="mrr">Revenue</option>
                      <option value="members">Members</option>
                      <option value="arpu">Ticket</option>
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setSortDir((d) => (d === "desc" ? "asc" : "desc"))
                      }
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-400 transition-colors"
                    >
                      {sortDir === "desc" ? (
                        <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUp className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <div className="w-px h-4 bg-zinc-800 mx-1" />

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <Globe className="w-3 h-3 text-indigo-400 ml-1.5" />
                    {langFilter !== "All" && (
                      <span className="text-[12px] leading-none ml-0.5">
                        {uniqueLangs.find((l) => l.lang === langFilter)?.flag}
                      </span>
                    )}
                    <select
                      value={langFilter}
                      onChange={(e) => setLangFilter(e.target.value)}
                      className="bg-zinc-900 text-indigo-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="All">🌐 All Regions</option>
                      {uniqueLangs.map((l) => (
                        <option key={l.lang} value={l.lang}>
                          {l.flag} {l.lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main content area */}
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
              <div className="w-8 h-8 border-2 border-zinc-700 border-t-violet-500 rounded-full animate-spin" />
              <div className="text-zinc-500 text-sm font-medium">
                Loading dataset...
              </div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center">
              <EmptyState onReset={clearFilters} />
            </div>
          ) : view === "gallery" ? (
            <div className="flex-1 flex flex-col min-h-0 bg-[#0a0a0a]">
              {activeCategory === "top500" && (
                <div className="flex items-center flex-wrap gap-2 px-3 md:px-4 lg:px-6 py-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setHideNoMatch((v) => !v)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${hideNoMatch ? "bg-amber-500/20 border-amber-500/40 text-amber-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                  >
                    {hideNoMatch
                      ? "⚡ Comparisons only"
                      : "⚡ Show comparisons only"}
                  </button>
                  <div className="w-px h-4 bg-zinc-800 self-center" />
                  <button
                    type="button"
                    onClick={() =>
                      setMrrDeltaFilter((v) =>
                        v === "growth" ? "all" : "growth",
                      )
                    }
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${mrrDeltaFilter === "growth" ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                  >
                    ↑ MRR Growth
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMrrDeltaFilter((v) =>
                        v === "declined" ? "all" : "declined",
                      )
                    }
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${mrrDeltaFilter === "declined" ? "bg-rose-500/15 border-rose-500/40 text-rose-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                  >
                    ↓ MRR Declined
                  </button>
                </div>
              )}
              {/* VirtualCardGrid fills remaining height; react-window handles internal scrolling */}
              <div
                ref={scrollContainerRef}
                className="flex-1 min-h-0 px-3 md:px-4 lg:px-6 pb-2"
              >
                <VirtualCardGrid
                  data={filteredData}
                  currency={currency}
                  format={boundFormat}
                  isARR={isARR}
                  discoveryMap={
                    activeCategory === "top500" ? discoveryMap : undefined
                  }
                  hideNoMatch={
                    activeCategory === "top500" ? hideNoMatch : false
                  }
                  mrrDeltaFilter={
                    activeCategory === "top500" ? mrrDeltaFilter : "all"
                  }
                  isMegaAll={activeCategory === "megaall"}
                  isTop500={activeCategory === "top500"}
                  onScroll={onVirtualScroll}
                />
              </div>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 pb-4 md:pb-6 custom-scrollbar bg-[#0a0a0a]"
            >
              {view === "table" && (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-32">
                      <div className="w-6 h-6 border-2 border-zinc-700 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                  }
                >
                  <LedgerView
                    data={filteredData}
                    currency={currency}
                    format={boundFormat}
                    isARR={isARR}
                    discoveryMap={
                      activeCategory === "top500" ? discoveryMap : undefined
                    }
                    isTop500={activeCategory === "top500"}
                  />
                </Suspense>
              )}
              {view === "analytics" && (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-32">
                      <div className="w-6 h-6 border-2 border-zinc-700 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                  }
                >
                  <ObservatoryView
                    data={filteredData}
                    currency={currency}
                    format={boundFormat}
                    isARR={isARR}
                    totalRev={totalRev}
                  />
                </Suspense>
              )}
            </div>
          )}
        </main>

        {/* Right stats sidebar */}
        {!isZenMode && (
          <aside
            className={`border-l border-zinc-800/80 bg-[#09090b] flex flex-col shrink-0 overflow-x-hidden overflow-y-auto custom-scrollbar transform-gpu will-change-transform motion-safe:transition-[transform,opacity,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isRightOpen ? "w-64 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-full border-none"}`}
          >
            <div className="w-64 flex flex-col min-h-full">
              <div className="p-4 border-b border-zinc-800/80">
                <h3 className="text-xs font-semibold text-zinc-100 flex items-center gap-2">
                  Global Insights
                </h3>
              </div>
              <div className="p-4 space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">
                      Total Pipeline
                    </div>
                    <div className="text-2xl font-black text-zinc-100 tracking-tighter">
                      {boundFormat(totalRev, currency)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">
                        Avg Ticket
                      </div>
                      <div className="text-sm font-semibold text-zinc-300">
                        ${compactNumber(avgTicket)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">
                        Nodes
                      </div>
                      <div className="text-sm font-semibold text-zinc-300">
                        {filteredData.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/50">
                  <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-3">
                    Revenue Tiers
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Whale",
                        count: tierCounts.ultra,
                        color: "bg-rose-500",
                      },
                      {
                        label: "Pro",
                        count: tierCounts.high,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Growth",
                        count: tierCounts.mid,
                        color: "bg-lime-500",
                      },
                      {
                        label: "Seed",
                        count: tierCounts.low,
                        color: "bg-fuchsia-400",
                      },
                    ].map((t) => (
                      <div key={t.label}>
                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span className="text-zinc-400">{t.label}</span>
                          <span className="text-zinc-200 font-mono">
                            {t.count}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${t.color} transition-all duration-700 ease-out`}
                            style={{
                              width: `${filteredData.length ? (t.count / filteredData.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* AI Copilot - only in DOM when open */}
        {isChatOpen && (
          <div className="absolute top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-zinc-800 shadow-2xl z-50 flex flex-col">
            <Suspense fallback={null}>
              <AICopilot
                data={filteredData}
                currency={currency}
                format={boundFormat}
                isARR={isARR}
                onClose={() => setIsChatOpen(false)}
              />
            </Suspense>
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      {!isZenMode && (
        <nav
          className={`fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-around bg-[#09090b]/98 backdrop-blur-sm border-t border-zinc-800/60 px-2 py-1 pb-safe z-30 transform-gpu will-change-transform transition-[transform,opacity] duration-[300ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${isScrollFocused ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
        >
          {[
            { id: "gallery", Icon: LayoutGrid, label: "Cards" },
            { id: "analytics", Icon: BarChart3, label: "Charts" },
          ].map(({ id, Icon, label }) => (
            <button
              key={id}
              type="button"
              data-ocid={`mobile.view.${id}.tab`}
              onClick={() => setView(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[48px] min-h-[44px] motion-safe:transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${view === id ? "text-white bg-zinc-800" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          ))}
          <button
            type="button"
            data-ocid="mobile.filter.open_modal_button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[48px] min-h-[44px] motion-safe:transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 text-zinc-500 hover:text-zinc-300"
          >
            <Filter className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Filters</span>
          </button>
          {/* 5th button: category picker */}
          {(() => {
            const active = CAT_ICON_MAP[activeCategory] ?? {
              Icon: Grid3x3,
              color: "text-zinc-400",
            };
            const ActiveIcon = active.Icon;
            return (
              <button
                type="button"
                data-ocid="mobile.category.open_modal_button"
                onClick={() => setMobileCategoryOpen(true)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[48px] min-h-[44px] motion-safe:transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 ${mobileCategoryOpen ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                <ActiveIcon className={`w-5 h-5 ${active.color}`} />
                <span className="text-[10px] font-semibold">Category</span>
              </button>
            );
          })()}
        </nav>
      )}

      {/* Mobile category picker overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${mobileCategoryOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Close category picker"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm w-full h-full"
          onClick={() => setMobileCategoryOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[#09090b] rounded-t-2xl border-t border-zinc-800/80 max-h-[70vh] flex flex-col overflow-hidden transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] transform-gpu will-change-transform ${mobileCategoryOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="w-10 h-1 bg-zinc-600 rounded-full mx-auto mt-3 mb-2 shrink-0" />
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/60 shrink-0">
            <span className="text-sm font-bold text-zinc-200">Categories</span>
            <button
              type="button"
              onClick={() => setMobileCategoryOpen(false)}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-3">
            <div className="grid grid-cols-2 gap-2">
              {MOBILE_CATEGORIES.map(({ id, Icon, label, color, activeBg }) => {
                const isActive = activeCategory === id;
                return (
                  <button
                    key={id}
                    type="button"
                    data-ocid={`mobile.category.${id}.button`}
                    onClick={() => {
                      handleCategorySwitch(id);
                      setMobileCategoryOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl border transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-95 min-h-[56px] ${
                      isActive
                        ? `${activeBg} border-opacity-100`
                        : "border-zinc-800/60 bg-zinc-900/30 text-zinc-400"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${isActive ? color : "text-zinc-500"}`}
                    />
                    <span
                      className={`text-[13px] font-bold ${isActive ? color : "text-zinc-400"}`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isZenMode && (
        <button
          type="button"
          onClick={() => handleZenMode(false)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
        >
          <Minimize2 className="w-4 h-4" /> Exit Focus
        </button>
      )}
    </div>
  );
}
