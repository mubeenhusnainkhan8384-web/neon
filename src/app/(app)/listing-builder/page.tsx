'use client';

import { useState } from "react";
import { Sparkles, Copy, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ListingBuilderPage() {
  const [productName, setProductName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedListing, setGeneratedListing] = useState<any>(null);

  const generateListing = async () => {
    if (!productName.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    setLoading(true);
    setGeneratedListing(null);

    try {
      const response = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, keywords, targetAudience }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setGeneratedListing(data);
      toast.success("✅ Listing generated successfully!");
    } catch (error) {
      toast.error("Failed to generate listing");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const saveBullet = (bullet: string) => {
    toast.success("Bullet saved to My Projects");
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold">AI Listing Builder</h1>
        <p className="text-muted-foreground">Create high-converting Amazon listings with AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <Input placeholder="e.g. Silicone Baby Bibs Set of 4" value={productName} onChange={(e) => setProductName(e.target.value)} className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium">Main Keywords</label>
                <Input placeholder="silicone bibs, baby bibs, waterproof" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium">Target Audience (optional)</label>
                <Input placeholder="new parents..." value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="h-12" />
              </div>

              <Button onClick={generateListing} disabled={loading} className="w-full h-14">
                {loading ? "Generating..." : "Generate Optimized Listing"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Generated Listing</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedListing ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold mb-2">Title</h3>
                    <div className="flex gap-3">
                      <p className="flex-1 p-5 bg-muted rounded-2xl">{generatedListing.title}</p>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedListing.title, "Title")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Bullet Points</h3>
                    <div className="space-y-4">
                      {generatedListing.bullets?.map((bullet: string, i: number) => (
                        <div key={i} className="flex gap-4 p-5 bg-muted rounded-2xl group">
                          <span className="text-green-600">•</span>
                          <p className="flex-1">{bullet}</p>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bullet, "Bullet")}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => saveBullet(bullet)}>
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Description</h3>
                    <div className="flex gap-3">
                      <p className="flex-1 p-6 bg-muted rounded-3xl whitespace-pre-wrap">
                        {generatedListing.description}
                      </p>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedListing.description, "Description")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <Sparkles className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="text-xl text-gray-500">Your listing will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}