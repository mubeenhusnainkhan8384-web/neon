'use client';

import { useState } from "react";
import { Search, Save, Filter, TrendingUp, Sparkles, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MOCK_KEYWORDS = [
  { keyword: "silicone baby bibs", volume: 18500, competition: "Medium", cpc: 1.45, score: 92, trend: "up" },
  { keyword: "waterproof baby bibs", volume: 12400, competition: "Low", cpc: 1.12, score: 88, trend: "up" },
  { keyword: "baby feeding bibs", volume: 8900, competition: "Medium", cpc: 0.95, score: 85, trend: "stable" },
  { keyword: "toddler bibs set", volume: 6700, competition: "Low", cpc: 0.88, score: 90, trend: "up" },
  { keyword: "silicone bibs with pocket", volume: 5400, competition: "High", cpc: 2.10, score: 78, trend: "down" },
];

export default function KeywordResearchPage() {
  const [seedKeyword, setSeedKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    if (!seedKeyword.trim()) {
      toast.error("Please enter a seed keyword");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setResults(MOCK_KEYWORDS);
      setHasSearched(true);
      setIsLoading(false);
      toast.success("Keyword ideas generated successfully!");
    }, 900);
  };

  const saveKeyword = (keyword: string) => {
    toast.success(`✅ Saved "${keyword}"`, {
      description: "Added to My Keywords",
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold">Keyword Research</h1>
          <p className="text-muted-foreground">Find high-volume, low-competition keywords for Amazon</p>
        </div>
        <Button size="lg" onClick={handleGenerate} disabled={isLoading}>
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Ideas
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Filter className="w-6 h-6" />
            Keyword Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-xl">
            <label className="text-sm font-medium mb-2 block">Seed Keyword or Phrase</label>
            <div className="flex gap-3">
              <Input
                placeholder="e.g. silicone baby bibs, insulated tumbler..."
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                className="h-12"
              />
              <Button onClick={handleGenerate} disabled={isLoading} size="lg">
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Keyword Ideas ({results.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>CPC</TableHead>
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((item, index) => (
                  <TableRow key={index} className="hover:bg-muted/70">
                    <TableCell className="font-medium">{item.keyword}</TableCell>
                    <TableCell className="font-semibold">{item.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={item.competition === "Low" ? "default" : item.competition === "Medium" ? "secondary" : "destructive"}>
                        {item.competition}
                      </Badge>
                    </TableCell>
                    <TableCell>${item.cpc}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.score}/100</Badge>
                        {item.trend === "up" && <ArrowUp className="text-green-500" />}
                        {item.trend === "down" && <ArrowDown className="text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => saveKeyword(item.keyword)}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {!hasSearched && (
        <Card className="py-20">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold">No keywords yet</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              Enter a seed keyword above and click Generate to discover profitable long-tail keywords.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}