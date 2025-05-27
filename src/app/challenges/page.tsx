
"use client";

import * as React from "react";
import { useSearchParams } from 'next/navigation';
import ChallengesSidebar from "@/components/challenges/challenges-sidebar";
import AllChallengesView from "@/components/challenges/views/all-challenges-view";
import MySubmissionsView from "@/components/challenges/views/my-submissions-view";
import LeaderboardView from "@/components/challenges/views/leaderboard-view";
import SavedChallengesView from "@/components/challenges/views/saved-challenges-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export type ChallengesWorkspaceView =
  | "all-challenges"
  | "my-submissions"
  | "leaderboard"
  | "saved-challenges";

export default function ChallengesPage() {
  const searchParams = useSearchParams();
  const initialViewQueryParam = searchParams.get('view') as ChallengesWorkspaceView | null;
  const returnToQueryParam = searchParams.get('returnTo');

  const [activeView, setActiveView] = React.useState<ChallengesWorkspaceView>(initialViewQueryParam || "all-challenges");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  
  // Store the return path, defaulting to '/' if not provided
  const returnToPath = returnToQueryParam || '/';

  React.useEffect(() => {
    if (initialViewQueryParam && initialViewQueryParam !== activeView) {
      setActiveView(initialViewQueryParam);
    }
  }, [initialViewQueryParam, activeView]);


  const renderActiveView = () => {
    switch (activeView) {
      case "all-challenges":
        return <AllChallengesView />;
      case "my-submissions":
        return <MySubmissionsView />;
      case "leaderboard":
        return <LeaderboardView />;
      case "saved-challenges":
        return <SavedChallengesView />;
      default:
        return <AllChallengesView />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your app header */}
      <ChallengesSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        returnToPath={returnToPath} 
      />
      <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
        <div className="md:hidden mb-4">
          <Button variant="outline" size="sm" onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
            <MenuIcon className="h-4 w-4 mr-2" />
            Menu (Toggle Placeholder)
          </Button>
        </div>
        {renderActiveView()}
      </main>
    </div>
  );
}
