"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import InitialOptionsView from "./views/InitialOptionsView";
import BundlePlanView from "./views/BundlePlanView";
import ModuleSelectionView from "./views/ModuleSelectionView";
import ModuleDetailView from "./views/ModuleDetailView";
import type { PremiumModule } from "./premium-data";
import { premiumModulesData } from "./premium-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export type PremiumModalView =
  | "initial"
  | "bundlePlan"
  | "moduleSelection"
  | "moduleDetail";

interface PremiumCenterModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function PremiumCenterModal({
  isOpen,
  onOpenChange,
}: PremiumCenterModalProps) {
  const [currentView, setCurrentView] =
    React.useState<PremiumModalView>("initial");
  const [detailModuleId, setDetailModuleId] = React.useState<string | null>(
    null
  );
  const [historyStack, setHistoryStack] = React.useState<PremiumModalView[]>(['initial']);

  const navigateTo = (view: PremiumModalView, moduleId?: string) => {
    setHistoryStack(prev => [...prev, view]);
    setCurrentView(view);
    if (moduleId) {
      setDetailModuleId(moduleId);
    } else {
      setDetailModuleId(null);
    }
  };

  const handleBack = () => {
    if (historyStack.length > 1) {
      const newStack = historyStack.slice(0, -1);
      setHistoryStack(newStack);
      setCurrentView(newStack[newStack.length - 1]);
      // If going back from moduleDetail, clear detailModuleId
      if (currentView === 'moduleDetail' && newStack[newStack.length - 1] !== 'moduleDetail') {
        setDetailModuleId(null);
      }
    } else {
      onOpenChange(false); // Close modal if at the root view
    }
  };
  
  // Reset to initial view when modal is closed and reopened
  React.useEffect(() => {
    if (isOpen) {
      setCurrentView("initial");
      setHistoryStack(["initial"]);
      setDetailModuleId(null);
    }
  }, [isOpen]);


  const getTitleAndDescription = (): { title: string; description: string } => {
    switch (currentView) {
      case "bundlePlan":
        return {
          title: "All-in-One Premium Bundle",
          description:
            "Unlock the full power of CodeHinge with our comprehensive bundle.",
        };
      case "moduleSelection":
        return {
          title: "Customize Your Premium",
          description:
            "Choose the premium modules that best fit your needs.",
        };
      case "moduleDetail":
        const module = premiumModulesData.find((m) => m.id === detailModuleId);
        return {
          title: module ? `${module.name} Details` : "Module Details",
          description: module
            ? `Learn more about ${module.name} premium features.`
            : "Detailed information about the selected module.",
        };
      case "initial":
      default:
        return {
          title: "Upgrade to CodeHinge Premium",
          description:
            "Choose a full-featured bundle or tailor your upgrade with specific premium modules.",
        };
    }
  };

  const { title, description } = getTitleAndDescription();
  const selectedModule = premiumModulesData.find((m) => m.id === detailModuleId);

  const handleConceptualUpgrade = (planName: string) => {
    alert(`Conceptual: Upgrading to ${planName}...`);
    // In a real app, trigger Stripe flow here
    onOpenChange(false); // Close modal on conceptual upgrade
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentView !== "initial" && (
                <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              )}
              <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className={currentView !== 'initial' ? 'pl-11' : ''}>{description}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-6">
            {currentView === "initial" && (
              <InitialOptionsView
                onNavigateToBundle={() => navigateTo("bundlePlan")}
                onNavigateToModules={() => navigateTo("moduleSelection")}
              />
            )}
            {currentView === "bundlePlan" && (
              <BundlePlanView onSubscribe={handleConceptualUpgrade} />
            )}
            {currentView === "moduleSelection" && (
              <ModuleSelectionView
                onShowModuleDetail={(moduleId) => navigateTo("moduleDetail", moduleId)}
                onProceedToCheckout={handleConceptualUpgrade}
              />
            )}
            {currentView === "moduleDetail" && selectedModule && (
              <ModuleDetailView module={selectedModule} onUpgrade={handleConceptualUpgrade} />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
