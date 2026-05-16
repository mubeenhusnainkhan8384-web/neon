export type Project = {
  id: string;
  name: string;
  createdAt: string;
  status: "draft" | "in_progress" | "ready";
};

export const mockProjects: Project[] = [
  { id: "p_001", name: "Stainless Steel Water Bottle", createdAt: "2026-05-01", status: "in_progress" },
  { id: "p_002", name: "Silicone Spatula Set", createdAt: "2026-04-22", status: "ready" },
  { id: "p_003", name: "Resistance Bands (Set of 5)", createdAt: "2026-04-12", status: "draft" },
];

export type Keyword = { keyword: string; volume: number; difficulty: "Low" | "Medium" | "High"; intent: string };

export const mockKeywords: Keyword[] = [
  { keyword: "stainless steel water bottle", volume: 74000, difficulty: "High", intent: "Core" },
  { keyword: "water bottle leak proof", volume: 18100, difficulty: "Medium", intent: "Feature" },
  { keyword: "insulated water bottle", volume: 49500, difficulty: "High", intent: "Core" },
  { keyword: "bpa free water bottle", volume: 9900, difficulty: "Low", intent: "Trust" },
  { keyword: "metal water bottle 32 oz", volume: 6600, difficulty: "Medium", intent: "Variant" },
];

export type ResearchResult = {
  niche: string;
  demandScore: number; // 0-100
  competitionScore: number; // 0-100
  notes: string;
};

export const mockResearch: ResearchResult[] = [
  { niche: "Kitchen tools: silicone spatulas", demandScore: 78, competitionScore: 62, notes: "Good demand; differentiate via heat rating & set design." },
  { niche: "Fitness: resistance bands", demandScore: 82, competitionScore: 74, notes: "Crowded; bundle + strong brand visuals required." },
  { niche: "Hydration: insulated bottles", demandScore: 90, competitionScore: 88, notes: "Very competitive; success depends on USP and reviews." },
];

