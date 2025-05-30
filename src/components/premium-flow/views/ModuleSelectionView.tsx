"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { premiumModulesData, type PremiumModule } from "../premium-data";
import Link from "next/link"; // Import Link

interface ModuleSelectionViewProps {
  onShowModuleDetail: (moduleId: string) => void;
  onProceedToCheckout: (selectedPlanDescription: string) => void;
}

export default function ModuleSelectionView({
  onShowModuleDetail,
  onProceedToCheckout,
}: ModuleSelectionViewProps) {
  const [selectedModules, setSelectedModules] = React.useState<
    Record<string, boolean>
  >({});

  const handleToggleModule = (moduleId: string) => {
    setSelectedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const getSelectedModulesCount = () => {
    return Object.values(selectedModules).filter(Boolean).length;
  };

  const getSelectedModulesPrice = () => {
    // Simplified pricing for MVP - just sums monthly prices
    // In a real app, this would be more complex (e.g., yearly discounts, currency)
    return Object.entries(selectedModules).reduce((total, [id, isSelected]) => {
      if (isSelected) {
        const module = premiumModulesData.find(m => m.id === id);
        if (module) {
          // Extract number from price string like "₹199"
          const price = parseInt(module.priceMonthly.replace(/[^0-9]/g, ''), 10);
          return total + (isNaN(price) ? 0 : price);
        }
      }
      return total;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {premiumModulesData.map((module) => (
          <Card key={module.id} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <module.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-md font-semibold">{module.name}</CardTitle>
                </div>
                <Switch
                  id={`module-switch-${module.id}`}
                  checked={!!selectedModules[module.id]}
                  onCheckedChange={() => handleToggleModule(module.id)}
                  aria-label={`Select ${module.name}`}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              <p className="mb-2">{module.shortDescription}</p>
              <p className="font-semibold text-foreground">{module.priceMonthly}/month</p>
            </CardContent>
            <CardFooter className="p-3 border-t">
              <Button
                variant="link"
                className="text-xs p-0 h-auto"
                onClick={() => onShowModuleDetail(module.id)}
              >
                Learn more
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {getSelectedModulesCount() > 0 && (
        <Card className="mt-6 p-4 sticky bottom-0 bg-background border-t shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <p className="font-semibold">
                {getSelectedModulesCount()} Module(s) Selected
              </p>
              <p className="text-sm text-muted-foreground">
                Total: ₹{getSelectedModulesPrice()}/month (Conceptual)
              </p>
            </div>
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => onProceedToCheckout(`${getSelectedModulesCount()} module(s)`)}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
