
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
import { CheckCircle2Icon, SparklesIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BundleUpgradeModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUpgrade: () => void; // Callback for when user clicks upgrade
  monthlyPrice: string;
  annualPrice: string;
  featuresList: string[];
}

export default function BundleUpgradeModal({
  isOpen,
  onOpenChange,
  onUpgrade,
  monthlyPrice,
  annualPrice,
  featuresList
}: BundleUpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <SparklesIcon className="mr-2 h-5 w-5 text-yellow-400" />
            Upgrade to CodeSphere Premium Bundle
          </DialogTitle>
          <DialogDescription>
            Get full access to all premium features across Workplace, Jobs/Projects, and Challenges at a discounted rate.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] my-4 pr-2">
            <div className="space-y-3 py-2">
            <h4 className="font-semibold text-sm text-foreground">Bundle Benefits:</h4>
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
                    {monthlyPrice}/month or {annualPrice}/year (Best Value!)
                </p>
            </div>
        </ScrollArea>
        <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline" asChild>
                 <Link href="/premium">Compare All Plans</Link>
            </Button>
          <Button onClick={onUpgrade} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
            Upgrade to Bundle (Conceptual)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    