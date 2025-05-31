
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import type { PremiumModule } from "../premium-data";
import { CheckCircle2Icon, StarIcon } from "lucide-react"; // Using StarIcon for "Add to Plan"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ModuleDetailViewProps {
  module: PremiumModule;
  onUpgrade: (planName: string, price: string) => void;
}

export default function ModuleDetailView({ module, onUpgrade }: ModuleDetailViewProps) {
  const [isYearly, setIsYearly] = React.useState(false);

  const currentPrice = isYearly ? module.priceYearly : module.priceMonthly;
  const currentCycle = isYearly ? "year" : "month";
  const savingsText = isYearly && module.priceYearly ? "(Save vs. monthly)" : ""; // Simple savings indication

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-primary border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <module.icon className="h-8 w-8 text-primary flex-shrink-0" />
            <CardTitle className="text-2xl font-bold">{module.name} Premium</CardTitle>
          </div>
          {module.longDescription && (
            <CardDescription className="text-md text-muted-foreground">
              {module.longDescription}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4 px-4 md:px-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {module.features.slice(0, 4).map((feature, index) => ( // Display up to 4 features
                <li key={index} className="flex items-start">
                  <CheckCircle2Icon className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t">
             <div className="flex items-center justify-center space-x-2 my-4">
                <Label htmlFor={`billing-cycle-detail-${module.id}`} className={!isYearly ? "font-semibold text-primary" : "text-muted-foreground"}>
                Monthly
                </Label>
                <Switch
                id={`billing-cycle-detail-${module.id}`}
                checked={isYearly}
                onCheckedChange={setIsYearly}
                aria-label="Toggle billing cycle"
                />
                <Label htmlFor={`billing-cycle-detail-${module.id}`} className={isYearly ? "font-semibold text-primary" : "text-muted-foreground"}>
                Yearly <span className="text-xs text-green-600">{savingsText}</span>
                </Label>
            </div>
            <p className="text-3xl font-bold text-center">
              {currentPrice}
              <span className="text-md font-normal text-muted-foreground">/{currentCycle}</span>
            </p>
          </div>
        </CardContent>
         <CardFooter className="p-4 md:p-6 border-t">
            <Button 
              size="lg" 
              className="w-full text-lg"
              onClick={() => onUpgrade(module.name + (isYearly ? " (Yearly)" : " (Monthly)"), currentPrice)}
            >
              <StarIcon className="mr-2 h-5 w-5"/> Add to Plan
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
