'use client';

import { useState } from "react";
import { DollarSign, Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfitCalculatorPage() {
  const [sellingPrice, setSellingPrice] = useState(29.99);
  const [costPrice, setCostPrice] = useState(8.50);
  const [shippingCost, setShippingCost] = useState(4.50);
  const [amazonFee, setAmazonFee] = useState(15); // percentage

  const amazonFees = (sellingPrice * amazonFee) / 100;
  const totalCost = costPrice + shippingCost + amazonFees;
  const profit = sellingPrice - totalCost;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  const isProfitable = profit > 0;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Profit Calculator</h1>
        <p className="text-muted-foreground">Calculate real profit after all Amazon fees</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calculator className="w-6 h-6" />
              Cost Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Selling Price ($)</label>
              <Input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="h-12 text-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Cost Price ($)</label>
              <Input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Shipping Cost ($)</label>
              <Input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Amazon Fee (%)</label>
              <Input
                type="number"
                value={amazonFee}
                onChange={(e) => setAmazonFee(parseFloat(e.target.value) || 0)}
                className="h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-600">
              <DollarSign className="w-6 h-6" />
              Profit Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Selling Price</p>
                <p className="text-3xl font-bold">${sellingPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-3xl font-bold text-red-600">${totalCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t border-b py-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Net Profit</span>
                <span className={`text-4xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                  ${profit.toFixed(2)}
                </span>
              </div>
              <div className="mt-2">
                <Badge variant={isProfitable ? "default" : "destructive"} className="text-base px-4 py-1">
                  {profitMargin.toFixed(1)}% Margin
                </Badge>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amazon Referral Fee</span>
                <span>${amazonFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost of Goods</span>
                <span>${costPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Cost</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}