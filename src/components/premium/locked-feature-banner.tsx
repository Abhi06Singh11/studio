
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LockIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

interface LockedFeatureBannerProps {
  featureName?: string;
  onUpgradeClick?: () => void; // Optional direct callback
}

export default function LockedFeatureBanner({ featureName = "This feature", onUpgradeClick }: LockedFeatureBannerProps) {
  const router = useRouter();

  const handleDefaultUpgradeClick = () => {
    router.push("/premium");
  };

  return (
    <Card className="border-2 border-yellow-400 bg-yellow-50/50 shadow-lg rounded-xl my-6">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center items-center mb-3">
          <SparklesIcon className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-700">
            <LockIcon className="inline h-5 w-5 mr-1.5" />
            Premium Feature Locked
          </h3>
        </div>
        <p className="text-sm text-yellow-600 mb-4">
          {featureName} requires a CodeSphere Premium subscription. Unlock more power and insights!
        </p>
        <Button 
          onClick={onUpgradeClick || handleDefaultUpgradeClick} 
          className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-semibold"
        >
          Upgrade to Unlock
        </Button>
      </CardContent>
    </Card>
  );
}

    