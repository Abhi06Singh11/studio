
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle2Icon, CrownIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModuleUpgradeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  moduleName: string;
  featuresList: string[];
  monthlyPrice: string;
  annualPrice: string;
  onUpgrade: () => void; // Callback for when user clicks upgrade
}

export default function ModuleUpgradeModal({
  isOpen,
  onOpenChange,
  moduleName,
  featuresList,
  monthlyPrice,
  annualPrice,
  onUpgrade,
}: ModuleUpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <CrownIcon className="mr-2 h-5 w-5 text-yellow-500" />
            Upgrade to {moduleName}
          </DialogTitle>
          <DialogDescription>
            Unlock powerful features to enhance your {moduleName.toLowerCase().replace(" premium", "")} experience.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] my-4 pr-2">
            <div className="space-y-3 py-2">
            <h4 className="font-semibold text-sm text-foreground">Premium Benefits:</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
                {featuresList.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircle2Icon className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
                ))}
            </ul>
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
                <p className="text-sm font-semibold text-center">
                    {monthlyPrice}/month or {annualPrice}/year (Save ~15%)
                </p>
            </div>
        </ScrollArea>
        <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline" asChild>
                <Link href="/premium">Compare All Plans</Link>
            </Button>
          <Button onClick={onUpgrade}>Upgrade Now (Conceptual)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    