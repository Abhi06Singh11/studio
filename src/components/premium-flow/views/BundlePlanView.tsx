
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { bundlePlanData } from "../premium-data";
import { CheckCircle2Icon } from "lucide-react";

interface BundlePlanViewProps {
  onSubscribe: (planName: string, price: string) => void;
}

export default function BundlePlanView({ onSubscribe }: BundlePlanViewProps) {
  const [isYearly, setIsYearly] = React.useState(false);

  const currentPrice = isYearly ? bundlePlanData.priceYearly : bundlePlanData.priceMonthly;
  const currentCycle = isYearly ? "year" : "month";
  const savingsText = isYearly ? "(Save approx. 17% vs monthly bundle)" : ""; // Updated savings text

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-primary border-2">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
            {bundlePlanData.name}
          </CardTitle>
          <CardDescription className="max-w-md mx-auto mt-1 text-md">
            {/* Using prompt's description */}
            Unlocks premium features across all modules (Messaging, Job Board, Profile, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-4 md:px-6">
          <div className="flex items-center justify-center space-x-2 my-4">
            <Label htmlFor="billing-cycle-bundle" className={!isYearly ? "font-semibold text-primary" : "text-muted-foreground"}>
              Monthly
            </Label>
            <Switch
              id="billing-cycle-bundle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              aria-label="Toggle billing cycle"
            />
            <Label htmlFor="billing-cycle-bundle" className={isYearly ? "font-semibold text-primary" : "text-muted-foreground"}>
              Yearly <span className="text-xs text-green-600">{savingsText}</span>
            </Label>
          </div>

          <div className="text-center mb-6">
            <p className="text-4xl font-extrabold">
              {currentPrice}
              <span className="text-lg font-normal text-muted-foreground">
                /{currentCycle}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-center">What's Included:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {bundlePlanData.includedModuleHighlights.map((module) => (
                <div key={module.name} className="flex items-start gap-2 p-2 rounded-md">
                  <module.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{module.name}</p>
                    <p className="text-xs text-muted-foreground">{module.keyFeature}</p>
                  </div>
                </div>
              ))}
            </div>
             <p className="text-xs text-muted-foreground text-center mt-3">...and all other premium features from each module!</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 md:p-6 border-t">
          <Button
            size="lg"
            className="w-full text-lg"
            onClick={() => onSubscribe(bundlePlanData.name + (isYearly ? " (Yearly)" : " (Monthly)"), currentPrice)}
          >
            Subscribe Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
