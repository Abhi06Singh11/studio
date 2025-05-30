"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription }
from "@/components/ui/card";
import type { PremiumModule } from "../premium-data";
import { CheckCircle2Icon } from "lucide-react";

interface ModuleDetailViewProps {
  module: PremiumModule;
  onUpgrade: (planName: string) => void;
}

export default function ModuleDetailView({ module, onUpgrade }: ModuleDetailViewProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <module.icon className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">{module.name}</CardTitle>
          </div>
          {module.longDescription && (
            <CardDescription className="text-md">
              {module.longDescription}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {module.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2Icon className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-2xl font-bold text-center">
              {module.priceMonthly}
              <span className="text-md font-normal text-muted-foreground">/month</span>
              {module.priceYearly && (
                 <span className="block text-sm font-normal text-muted-foreground mt-1">
                    or {module.priceYearly}/year (Save!)
                 </span>
              )}
            </p>
            <Button 
              size="lg" 
              className="w-full mt-4 text-lg"
              onClick={() => onUpgrade(module.name + " (Monthly)")} // Conceptual, could add yearly logic
            >
              Upgrade to {module.name}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
