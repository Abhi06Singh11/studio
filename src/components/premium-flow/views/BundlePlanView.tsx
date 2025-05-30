"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { bundlePlanData, premiumModulesData } from "../premium-data";
import { CheckCircle2Icon } from "lucide-react";

interface BundlePlanViewProps {
  onSubscribe: (planName: string) => void;
}

export default function BundlePlanView({ onSubscribe }: BundlePlanViewProps) {
  const [isYearly, setIsYearly] = React.useState(false);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            {bundlePlanData.name}
          </CardTitle>
          <CardDescription className="max-w-md mx-auto">
            {bundlePlanData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-2 my-4">
            <Label htmlFor="billing-cycle" className={!isYearly ? "font-semibold text-primary" : "text-muted-foreground"}>
              Monthly
            </Label>
            <Switch
              id="billing-cycle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              aria-label="Toggle billing cycle"
            />
            <Label htmlFor="billing-cycle" className={isYearly ? "font-semibold text-primary" : "text-muted-foreground"}>
              Yearly (Save 20%)
            </Label>
          </div>

          <div className="text-center mb-6">
            <p className="text-4xl font-extrabold">
              {isYearly ? bundlePlanData.priceYearly : bundlePlanData.priceMonthly}
              <span className="text-lg font-normal text-muted-foreground">
                /{isYearly ? "year" : "month"}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">What's Included:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bundlePlanData.includedModuleHighlights.map((module) => (
                <div key={module.name} className="flex items-start gap-2 p-3 bg-muted/30 rounded-md">
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

          <Button
            size="lg"
            className="w-full mt-6 text-lg"
            onClick={() => onSubscribe(bundlePlanData.name + (isYearly ? " (Yearly)" : " (Monthly)"))}
          >
            Subscribe to All-in-One Premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
