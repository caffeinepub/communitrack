// Shared types for CommuniTrack

export type CategoryId =
  | "discovery"
  | "music"
  | "selfimprovement"
  | "money"
  | "spirituality"
  | "tech"
  | "health"
  | "relationships"
  | "sports"
  | "hobbies"
  | "top500"
  | "megaall";

export type Community = {
  id: string;
  name: string;
  nameLower: string; // pre-lowercased for fast search
  creatorName: string;
  members: number;
  ticketSize: number;
  mrr: number;
  tags: string[];
  language: { lang: string; flag: string };
  url: string;
  pricingType: "monthly" | "yearly" | "fixed";
  yearlyPrice: number;
  fixedPrice: number;
  sourceCategory: string;
};

export type EnrichedCommunity = Community & {
  activeRevenue: number;
  activeTicket: number;
};
