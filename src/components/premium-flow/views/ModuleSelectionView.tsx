
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { premiumModulesData, type PremiumModule } from "../premium-data";
import { Checkbox } from "@/components/ui/checkbox"; // Using Checkbox instead of Switch for multi-select
import { toast } from "@/hooks/use-toast";

interface ModuleSelectionViewProps {
  onShowModuleDetail: (moduleId: string) => void;
  onProceedToCheckout: (selectedPlanDescription: string, totalPrice: string) => void;
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

  const getSelectedModulesDetails = () => {
    return premiumModulesData.filter(module => selectedModules[module.id]);
  };

  const selectedModulesCount = getSelectedModulesDetails().length;
  
  const totalPriceMonthly = getSelectedModulesDetails().reduce((total, module) => {
    const price = parseInt(module.priceMonthly.replace(/[^0-9]/g, ''), 10);
    return total + (isNaN(price) ? 0 : price);
  }, 0);

  const handleCheckout = () => {
    if (selectedModulesCount === 0) {
      toast({
        title: "No Modules Selected",
        description: "Please select at least one module to proceed.",
        variant: "destructive",
      });
      return;
    }
    const selectedModuleNames = getSelectedModulesDetails().map(m => m.name).join(', ');
    onProceedToCheckout(
      `${selectedModulesCount} module(s): ${selectedModuleNames}`, 
      `₹${totalPriceMonthly}/month` // Conceptual monthly price
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {premiumModulesData.map((module) => (
          <Card key={module.id} className="flex flex-col hover:shadow-lg transition-shadow rounded-xl">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-grow">
                  <module.icon className="h-7 w-7 text-primary flex-shrink-0" />
                  <CardTitle className="text-md font-semibold">{module.name}</CardTitle>
                </div>
                <Checkbox
                  id={`module-checkbox-${module.id}`}
                  checked={!!selectedModules[module.id]}
                  onCheckedChange={() => handleToggleModule(module.id)}
                  aria-label={`Select ${module.name}`}
                  className="mt-1"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground space-y-1.5">
              <p className="mb-2 line-clamp-2">{module.shortDescription}</p>
              <p className="font-semibold text-foreground">{module.priceMonthly}/month</p>
            </CardContent>
            <CardFooter className="p-3 border-t">
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-primary hover:underline"
                onClick={() => onShowModuleDetail(module.id)}
              >
                Learn more
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedModulesCount > 0 && (
        <Card className="mt-6 p-4 sticky bottom-0 bg-card border-t shadow-lg rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <p className="font-semibold">
                {selectedModulesCount} Module(s) Selected
              </p>
              <p className="text-sm text-muted-foreground">
                Total: ₹{totalPriceMonthly}/month (Conceptual)
              </p>
            </div>
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
