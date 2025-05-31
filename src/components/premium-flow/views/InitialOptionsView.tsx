
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRightIcon, PackageIcon, Settings2Icon } from "lucide-react";

interface InitialOptionsViewProps {
  onNavigateToBundle: () => void;
  onNavigateToModules: () => void;
}

export default function InitialOptionsView({
  onNavigateToBundle,
  onNavigateToModules,
}: InitialOptionsViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <PackageIcon className="h-8 w-8 text-primary" />
            <CardTitle className="text-lg">All-in-One Bundle Plan</CardTitle>
          </div>
          <CardDescription>
            Get all premium features across CodeHinge at a discounted price. The best value for complete access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onNavigateToBundle} className="w-full">
            Go All-in-One <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Settings2Icon className="h-8 w-8 text-primary" />
            <CardTitle className="text-lg">Customize Premium</CardTitle>
          </div>
          <CardDescription>
            Tailor your experience by upgrading specific modules that matter most to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onNavigateToModules} className="w-full">
            Select Modules <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
