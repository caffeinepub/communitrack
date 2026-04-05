import type { Community } from "../types";
import type { CategoryId } from "../types";
import { DISCOVERY_CSV, MUSIC_CSV, TOP500_CSV } from "./csvData";

// --- LANGUAGE DETECTION ---
export function detectLanguage(name: string): { lang: string; flag: string } {
  const n = name.toLowerCase();

  if (/[\u0600-\u06FF]/.test(name))
    return { lang: "Arabic", flag: "\uD83C\uDDF8\uD83C\uDDE6" };
  if (/[\u0400-\u04FF]/.test(name))
    return { lang: "Cyrillic", flag: "\uD83C\uDF0D" };
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(name))
    return { lang: "Asian Scripts", flag: "\uD83C\uDF0F" };
  if (/[\u0900-\u097F]/.test(name))
    return { lang: "Hindi", flag: "\uD83C\uDDEE\uD83C\uDDF3" };

  if (
    /\b(el|los|las|comunidad|emprendedor|emprendedores|cimientos|empresariales|gemela|ia|negocio|aprende|aprender|dinero|ventas|\u00e9xito|exito|mujeres|curso|cursos|espa\u00f1ol|para|creadores|m\u00e9todo|latino|inversi\u00f3n|inversiones|ingresos|libertad|desarrollo)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Spanish", flag: "\uD83C\uDDEA\uD83C\uDDF8" };
  if (
    /\b(mit|und|struktur|ki|der|die|das|f\u00fcr|fuer|wie|ich|wir|erfolg|geld|unternehmen|akademie|gemeinschaft|verkauf|wissen|freiheit|lernen|schule|leben)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "German", flag: "\uD83C\uDDE9\uD83C\uDDEA" };
  if (
    /\b(le|les|incubateur|francais|fran\u00e7ais|pour|avec|dans|sur|entreprise|argent|communaut\u00e9|acad\u00e9mie|r\u00e9ussite|cr\u00e9ateurs|libert\u00e9|revenus|investissement|vie)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "French", flag: "\uD83C\uDDEB\uD83C\uDDF7" };
  if (
    /\b(o|os|as|comunidade|seu|neg\u00f3cio|vendas|dinheiro|mercado|sucesso|criadores|renda|liberdade|brasil|mulheres)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Portuguese", flag: "\uD83C\uDDE7\uD83C\uDDF7" };
  if (
    /\b(il|i|le|per|come|tuo|vendite|soldi|accademia|comunit\u00e0|successo|vita|digitale)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Italian", flag: "\uD83C\uDDEE\uD83C\uDDF9" };
  if (
    /\b(de|het|een|en|voor|met|bedrijf|succes|verkopen|naar|leven)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Dutch", flag: "\uD83C\uDDF3\uD83C\uDDF1" };

  return { lang: "English", flag: "\uD83C\uDDFA\uD83C\uDDF8" };
}

// --- CSV PARSER ---
export function parseCSVData(csvText: string): Community[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"' && csvText[i + 1] === '"') {
      currentCell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && csvText[i + 1] === "\n") i++;
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c !== "")) rows.push(currentRow);
      currentRow = [];
      currentCell = "";
    } else {
      currentCell += char;
    }
  }
  if (currentCell || currentRow.length) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c !== "")) rows.push(currentRow);
  }

  const cleanRows = rows.filter(
    (row) => row.length > 1 && !row[0].trim().startsWith("#"),
  );

  if (cleanRows.length < 2) return [];

  const header = cleanRows[0].map((h) =>
    h.toLowerCase().replace(/[^a-z_ ]/g, ""),
  );
  let nameIdx = header.findIndex((h) => h.includes("name"));
  let priceIdx = header.findIndex((h) => h === "price" || h.includes("cost"));
  let urlIdx = header.findIndex((h) => h.includes("url") || h.includes("link"));
  let memberIdx = header.findIndex(
    (h) => h.includes("member") || h.includes("total"),
  );

  if (nameIdx === -1) nameIdx = 0;
  if (priceIdx === -1) priceIdx = 1;
  if (urlIdx === -1) urlIdx = 2;
  if (memberIdx === -1) memberIdx = 3;

  return cleanRows
    .slice(1)
    .map((row, index) => {
      if (row.length < 2) return null;

      const name = (row[nameIdx] || row[0] || "").replace(/^"|"$/g, "");
      const priceStrRaw = (row[priceIdx] || "").replace(/^"|"$/g, "");
      const url = (row[urlIdx] || "").replace(/^"|"$/g, "").trim();
      const memberStrRaw = (
        row[memberIdx] ||
        row[row.length - 1] ||
        ""
      ).replace(/^"|"$/g, "");

      const searchString = `${memberStrRaw} ${priceStrRaw} ${row.join(" ")}`;
      const memMatch =
        searchString.match(/(\d+\.?\d*)([kKmM]?)\s*[Mm]ember/i) ||
        searchString.match(/(\d+\.?\d*)([kKmM]?)/);

      let members = 0;
      if (memMatch) {
        members = Number.parseFloat(memMatch[1]);
        if (memMatch[2].toLowerCase() === "k") members *= 1000;
        if (memMatch[2].toLowerCase() === "m") members *= 1000000;
      }

      let ticketSize = 0;
      let yearlyPrice = 0;
      let fixedPrice = 0;
      let pricingType: "monthly" | "yearly" | "fixed" = "monthly";

      const priceSource = priceStrRaw || searchString;
      const isFreePrice =
        /free/i.test(priceSource) && !/\$[\d]/.test(priceSource);

      if (!isFreePrice) {
        const cleanPrice = priceSource.replace(/,/g, "");
        const pMatch = cleanPrice.match(/\$([\d.]+)/);
        if (pMatch) {
          const rawVal = Number.parseFloat(pMatch[1]);
          const hasMonth = /\/month|\/mo\b|per\s+month|monthly/i.test(
            priceSource,
          );
          const hasYear = /\/year|\/yr\b|per\s+year|annually|annual\b/i.test(
            priceSource,
          );

          if (hasYear) {
            pricingType = "yearly";
            yearlyPrice = rawVal;
            ticketSize = Math.round(rawVal / 12);
          } else if (hasMonth) {
            pricingType = "monthly";
            ticketSize = Math.round(rawVal);
          } else {
            pricingType = "fixed";
            fixedPrice = rawVal;
            ticketSize = 0;
          }
        }
      }

      members = Math.round(members);

      if (!name) return null;

      const tags: string[] = [];
      const lower = name.toLowerCase();
      if (
        lower.includes("business") ||
        lower.includes("founder") ||
        lower.includes("sales") ||
        lower.includes("revenue") ||
        lower.includes("agency")
      )
        tags.push("Business");
      if (
        lower.includes("fitness") ||
        lower.includes("health") ||
        lower.includes("wellness")
      )
        tags.push("Wellness");
      if (
        lower.includes("school") ||
        lower.includes("academy") ||
        lower.includes("mentor")
      )
        tags.push("Education");
      if (
        lower.includes("music") ||
        lower.includes("singer") ||
        lower.includes("piano")
      )
        tags.push("Arts");
      if (ticketSize === 0 && pricingType === "monthly") tags.push("Free");
      if (ticketSize >= 500 || yearlyPrice >= 500) tags.push("High-Ticket");
      if (tags.length === 0) tags.push("Community");

      const languageData = detectLanguage(name);
      const mrrVal =
        pricingType === "fixed" ? 0 : (members || 0) * (ticketSize || 0);

      const nameSlug = (url || name || "")
        .replace(/[^a-z0-9]/gi, "")
        .toLowerCase()
        .slice(0, 24);
      return {
        id: `n-${nameSlug}-${index}`,
        name,
        nameLower: name.toLowerCase(),
        creatorName: "Network Node",
        members: members || 0,
        ticketSize: ticketSize || 0,
        mrr: mrrVal,
        tags: Array.from(new Set(tags)),
        language: languageData,
        url,
        pricingType,
        yearlyPrice,
        fixedPrice,
        sourceCategory: "",
      } as Community;
    })
    .filter((x): x is Community => x !== null);
}

// --- SLUG / NAME HELPERS ---
export function extractSlug(url: string): string {
  try {
    const m = url.match(/skool\.com\/([^/?#]+)/);
    return m ? m[1].toLowerCase().trim() : "";
  } catch {
    return "";
  }
}

export function normalizeName(n: string): string {
  return n.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function dedupeByUrl(communities: Community[]): Community[] {
  const seen = new Set<string>();
  return communities.filter((c) => {
    const slug = extractSlug(c.url);
    if (!slug) return true;
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

// --- BASE64 DECODE HELPERS ---
export async function fetchAndDecodeCsv(url: string): Promise<Community[]> {
  const res = await fetch(url);
  let text = await res.text();
  text = text.trim();
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  try {
    const decoded = atob(text);
    text = decoded;
  } catch {
    // already plain text
  }
  return dedupeByUrl(parseCSVData(text));
}

export function decodeInlineCsv(rawCsv: string): Community[] {
  let text = rawCsv.trim();
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  try {
    const decoded = atob(text);
    text = decoded;
  } catch {
    // plain text
  }
  return dedupeByUrl(parseCSVData(text));
}

// --- MODULE-LEVEL CACHE ---
const datasetCache = new Map<string, Community[]>();

// Pre-parse inline CSVs immediately at module load (synchronous, no network)
datasetCache.set("discovery", decodeInlineCsv(DISCOVERY_CSV));
datasetCache.set("music", decodeInlineCsv(MUSIC_CSV));
datasetCache.set("top500", decodeInlineCsv(TOP500_CSV));

const CSV_FILE_MAP: Record<string, string> = {
  selfimprovement:
    "/assets/skool_selfimprovement-019d5ccc-fc29-76fb-b3e3-aff27cf36f87.csv",
  money:
    "/assets/skool_money_1000_-_complete-019d5ccc-fc0a-74fb-9485-8724efc876d4.csv",
  spirituality:
    "/assets/skool_spirituality_complete-019d5ccc-fc2f-7762-80a1-4f5f6155a891.csv",
  tech: "/assets/skool_tech_1000_-complete-019d5ccc-fc44-751b-a104-a2ca165cc3e6.csv",
  health:
    "/assets/skool_health_complete-019d5ccc-fc97-70c8-8850-886b5deb1d20.csv",
  relationships:
    "/assets/skool_relationships-019d5ccc-fc99-717f-8d1d-ec088257a320.csv",
  sports:
    "/assets/skool_sports_complete-019d5ccc-fcd4-7398-804f-500ce2ecb2d9.csv",
  hobbies:
    "/assets/skool_hobbies_complete-019d5ccc-fca5-74dc-a679-3633e45ac44e.csv",
};

const CAT_LABELS: Record<string, string> = {
  selfimprovement: "selfimprovement",
  money: "money",
  spirituality: "spirituality",
  tech: "tech",
  health: "health",
  relationships: "relationships",
  sports: "sports",
  hobbies: "hobbies",
};

export async function loadCategoryWithCache(
  cat: CategoryId,
): Promise<Community[]> {
  // Cache hit — return immediately, no work needed
  const cached = datasetCache.get(cat);
  if (cached) return cached;

  let result: Community[];

  if (cat === "megaall") {
    const discoveryItems = (
      datasetCache.get("discovery") || decodeInlineCsv(DISCOVERY_CSV)
    ).map((c) => ({ ...c, sourceCategory: "discovery" }));
    const musicItems = (
      datasetCache.get("music") || decodeInlineCsv(MUSIC_CSV)
    ).map((c) => ({ ...c, sourceCategory: "music" }));

    const fetchedArrays = await Promise.all(
      Object.entries(CSV_FILE_MAP).map(async ([catKey, fileUrl]) => {
        // Check if sub-category is already cached
        const sub = datasetCache.get(catKey);
        const items = sub || (await fetchAndDecodeCsv(fileUrl));
        if (!sub) datasetCache.set(catKey, items);
        return items.map((c) => ({
          ...c,
          sourceCategory: CAT_LABELS[catKey] || catKey,
        }));
      }),
    );

    const all = [...discoveryItems, ...musicItems, ...fetchedArrays.flat()];
    // Deduplicate by URL slug first, then by normalized name
    const seenSlugs = new Set<string>();
    const seenNames = new Set<string>();
    const deduped: Community[] = [];
    for (const c of all) {
      const slug = extractSlug(c.url);
      const nm = normalizeName(c.name);
      if (slug && seenSlugs.has(slug)) continue;
      if (!slug && seenNames.has(nm)) continue;
      if (slug) seenSlugs.add(slug);
      seenNames.add(nm);
      deduped.push(c);
    }
    result = deduped;
  } else if (CSV_FILE_MAP[cat]) {
    const items = await fetchAndDecodeCsv(CSV_FILE_MAP[cat]);
    result = items;
  } else {
    result = [];
  }

  datasetCache.set(cat, result);
  return result;
}

// Pre-warm megaall in background at module init so second click is instant
if (typeof window !== "undefined") {
  loadCategoryWithCache("megaall").catch(() => {});
}
