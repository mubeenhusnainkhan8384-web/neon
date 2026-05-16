"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  Package,
  DollarSign,
  Star,
  BarChart2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Filter,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Ergonomic Lumbar Support Pillow",
    category: "Home & Kitchen",
    price: 34.99,
    monthlySales: 4200,
    revenue: 146958,
    rating: 4.6,
    reviews: 3812,
    competition: "Medium",
    trend: "up",
  },
  {
    id: 2,
    name: "Resistance Bands Set (11-Piece)",
    category: "Sports & Outdoors",
    price: 22.95,
    monthlySales: 8750,
    revenue: 200812,
    rating: 4.8,
    reviews: 12540,
    competition: "High",
    trend: "up",
  },
  {
    id: 3,
    name: "Bamboo Cutting Board with Juice Groove",
    category: "Home & Kitchen",
    price: 27.49,
    monthlySales: 3100,
    revenue: 85219,
    rating: 4.5,
    reviews: 2230,
    competition: "Low",
    trend: "stable",
  },
  {
    id: 4,
    name: "Portable LED Desk Lamp USB-C",
    category: "Electronics",
    price: 18.99,
    monthlySales: 5600,
    revenue: 106344,
    rating: 4.4,
    reviews: 5871,
    competition: "Medium",
    trend: "up",
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle 32oz",
    category: "Sports & Outdoors",
    price: 24.99,
    monthlySales: 9100,
    revenue: 227409,
    rating: 4.7,
    reviews: 18920,
    competition: "High",
    trend: "stable",
  },
  {
    id: 6,
    name: "Acne Patches Invisible Hydrocolloid",
    category: "Beauty & Personal Care",
    price: 12.99,
    monthlySales: 14200,
    revenue: 184458,
    rating: 4.9,
    reviews: 31200,
    competition: "Medium",
    trend: "up",
  },
];

const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Toys & Games",
  "Office Products",
  "Pet Supplies",
];

const COMPETITION_STYLES: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-600 border-red-200",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconBg,
  iconColor,
  positive,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl", iconBg)}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
      <p className={cn("mt-1 text-xs font-medium", positive !== false ? "text-emerald-600" : "text-gray-400")}>
        {sub}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductResearchPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minSales, setMinSales] = useState([500]);
  const [results, setResults] = useState(MOCK_PRODUCTS);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = MOCK_PRODUCTS.filter((p) => {
        const matchesKeyword =
          !keyword ||
          p.name.toLowerCase().includes(keyword.toLowerCase()) ||
          p.category.toLowerCase().includes(keyword.toLowerCase());
        const matchesCategory =
          category === "All Categories" || p.category === category;
        const matchesPrice =
          p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesSales = p.monthlySales >= minSales[0];
        return matchesKeyword && matchesCategory && matchesPrice && matchesSales;
      });
      setResults(filtered);
      setHasSearched(true);
      setIsLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setKeyword("");
    setCategory("All Categories");
    setPriceRange([0, 200]);
    setMinSales([500]);
  };

  const totalRevenue = results.reduce((sum, p) => sum + p.revenue, 0);
  const avgRating = results.length
    ? (results.reduce((s, p) => s + p.rating, 0) / results.length).toFixed(1)
    : "—";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Header ── */}
      <div className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-7xl flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Product Research</h1>
            <p className="text-sm text-gray-500">
              Discover high-opportunity products using real market signals
            </p>
          </div>
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="mt-3 gap-2 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white hover:bg-gray-700 sm:mt-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            New Research
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">

        {/* ── Advanced Filters Card ── */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
              <Filter className="h-3.5 w-3.5 text-gray-500" />
            </div>
            <span className="text-sm font-semibold text-gray-800">
              Advanced Filters
            </span>
            {hasSearched && (
              <span className="ml-auto rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                {results.length} results
              </span>
            )}
          </div>

          {/* Filter Body */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">

              {/* ── Keyword / ASIN ── */}
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Keyword / ASIN
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="e.g. yoga mat, B09XKZ…"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="h-10 border-gray-200 bg-gray-50 pl-9 text-sm text-gray-800 placeholder:text-gray-400 transition-colors duration-150 hover:border-gray-300 hover:bg-white focus:border-gray-900 focus:bg-white focus:ring-0"
                  />
                </div>
              </div>

              {/* ── Category ── */}
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-10 border-gray-200 bg-gray-50 text-sm text-gray-800 transition-colors duration-150 hover:border-gray-300 hover:bg-white focus:border-gray-900 focus:ring-0 data-[state=open]:border-gray-900 data-[state=open]:bg-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200 bg-white shadow-lg shadow-gray-200/60">
                    {CATEGORIES.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="text-sm text-gray-700 focus:bg-gray-50 focus:text-gray-900"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ── Price Range ── */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Price Range
                  </Label>
                  <span className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700">
                    ${priceRange[0]}–${priceRange[1]}
                  </span>
                </div>
                {/* h-10 container keeps slider vertically aligned with inputs */}
                <div className="flex h-10 flex-col justify-center px-0.5">
                  <Slider
                    min={0}
                    max={500}
                    step={5}
                    value={priceRange}
                    onValueChange={(val) => setPriceRange(val as [number, number])}
                    className="w-full
                      [&_.relative]:h-1.5
                      [&_.relative]:rounded-full
                      [&_.relative]:bg-gray-200
                      [&_.absolute]:rounded-full
                      [&_.absolute]:bg-gray-900
                      [&_[role=slider]]:h-4
                      [&_[role=slider]]:w-4
                      [&_[role=slider]]:rounded-full
                      [&_[role=slider]]:border-2
                      [&_[role=slider]]:border-gray-900
                      [&_[role=slider]]:bg-white
                      [&_[role=slider]]:shadow-sm
                      [&_[role=slider]]:transition-transform
                      [&_[role=slider]]:duration-100
                      [&_[role=slider]]:hover:scale-110
                      [&_[role=slider]]:focus-visible:outline-none
                      [&_[role=slider]]:focus-visible:ring-2
                      [&_[role=slider]]:focus-visible:ring-gray-400/30"
                  />
                  <div className="mt-1.5 flex justify-between">
                    <span className="text-[10px] text-gray-400">$0</span>
                    <span className="text-[10px] text-gray-400">$500</span>
                  </div>
                </div>
              </div>

              {/* ── Min Monthly Sales ── */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Min Monthly Sales
                  </Label>
                  <span className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700">
                    {minSales[0].toLocaleString()}+
                  </span>
                </div>
                <div className="flex h-10 flex-col justify-center px-0.5">
                  <Slider
                    min={0}
                    max={20000}
                    step={100}
                    value={minSales}
                    onValueChange={setMinSales}
                    className="w-full
                      [&_.relative]:h-1.5
                      [&_.relative]:rounded-full
                      [&_.relative]:bg-gray-200
                      [&_.absolute]:rounded-full
                      [&_.absolute]:bg-gray-900
                      [&_[role=slider]]:h-4
                      [&_[role=slider]]:w-4
                      [&_[role=slider]]:rounded-full
                      [&_[role=slider]]:border-2
                      [&_[role=slider]]:border-gray-900
                      [&_[role=slider]]:bg-white
                      [&_[role=slider]]:shadow-sm
                      [&_[role=slider]]:transition-transform
                      [&_[role=slider]]:duration-100
                      [&_[role=slider]]:hover:scale-110
                      [&_[role=slider]]:focus-visible:outline-none
                      [&_[role=slider]]:focus-visible:ring-2
                      [&_[role=slider]]:focus-visible:ring-gray-400/30"
                  />
                  <div className="mt-1.5 flex justify-between">
                    <span className="text-[10px] text-gray-400">0</span>
                    <span className="text-[10px] text-gray-400">20K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Actions Row ── */}
            <div className="mt-6 flex flex-col items-start gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-400">
                💡 Tip: Filter by category + min sales to spot low-competition niches.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-9 rounded-lg px-4 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Reset filters
                </Button>
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  size="sm"
                  className="h-9 gap-2 rounded-lg bg-gray-900 px-6 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Searching…
                    </>
                  ) : (
                    <>
                      <Search className="h-3.5 w-3.5" />
                      Search Products
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row (after search) ── */}
        {hasSearched && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              label="Products Found"
              value={results.length.toString()}
              sub="matching your filters"
              icon={Package}
              iconBg="bg-blue-50"
              iconColor="text-blue-500"
              positive={false}
            />
            <StatCard
              label="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(0)}K`}
              sub="combined est. / month"
              icon={DollarSign}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <StatCard
              label="Avg. Rating"
              value={avgRating.toString()}
              sub="across all results"
              icon={Star}
              iconBg="bg-amber-50"
              iconColor="text-amber-500"
              positive={false}
            />
            <StatCard
              label="Opportunity Score"
              value="74 / 100"
              sub="+4 vs last search"
              icon={TrendingUp}
              iconBg="bg-purple-50"
              iconColor="text-purple-500"
            />
          </div>
        )}

        {/* ── Results Table ── */}
        {hasSearched && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <BarChart2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-800">Results</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                  {results.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 rounded-lg px-3 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <SlidersHorizontal className="h-3 w-3" />
                Sort
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>

            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-600">No products found</p>
                <p className="text-xs text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-100 bg-gray-50/70 hover:bg-gray-50/70">
                      {["Product", "Category", "Price", "Monthly Sales", "Est. Revenue", "Rating", "Competition", ""].map((h) => (
                        <TableHead
                          key={h}
                          className="whitespace-nowrap py-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400 first:pl-6"
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((product) => (
                      <TableRow
                        key={product.id}
                        className="group border-gray-100 transition-colors duration-100 hover:bg-gray-50/80"
                      >
                        {/* Product */}
                        <TableCell className="max-w-[220px] py-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                              <Package className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                            <span className="truncate text-sm font-medium text-gray-800">
                              {product.name}
                            </span>
                          </div>
                        </TableCell>

                        {/* Category */}
                        <TableCell className="py-4">
                          <span className="whitespace-nowrap rounded-lg border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                            {product.category}
                          </span>
                        </TableCell>

                        {/* Price */}
                        <TableCell className="py-4 text-sm font-semibold text-gray-800">
                          ${product.price.toFixed(2)}
                        </TableCell>

                        {/* Monthly Sales */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1">
                            {product.trend === "up" && (
                              <ChevronUp className="h-3.5 w-3.5 text-emerald-500" />
                            )}
                            <span className="text-sm text-gray-700">
                              {product.monthlySales.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>

                        {/* Revenue */}
                        <TableCell className="py-4">
                          <span className="text-sm font-semibold text-emerald-600">
                            ${(product.revenue / 1000).toFixed(0)}K
                          </span>
                        </TableCell>

                        {/* Rating */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-gray-800">
                              {product.rating}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({(product.reviews / 1000).toFixed(1)}K)
                            </span>
                          </div>
                        </TableCell>

                        {/* Competition */}
                        <TableCell className="py-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-lg border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                              COMPETITION_STYLES[product.competition]
                            )}
                          >
                            {product.competition}
                          </Badge>
                        </TableCell>

                        {/* Action */}
                        <TableCell className="py-4 pr-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 rounded-lg p-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:bg-gray-100"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5 text-gray-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}

        {/* ── Pre-search Empty State ── */}
        {!hasSearched && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-24">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-700">
              Set your filters and search
            </p>
            <p className="mt-1 max-w-xs text-center text-xs leading-relaxed text-gray-400">
              Use keyword, category, price, and sales filters above to discover
              high-opportunity products on Amazon.
            </p>
            <Button
              onClick={handleSearch}
              size="sm"
              className="mt-6 gap-2 rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white hover:bg-gray-700"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Run Sample Search
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
