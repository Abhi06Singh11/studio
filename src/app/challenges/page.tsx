
"use client";

import * as React from "react";
import { useSearchParams } from 'next/navigation';
import ChallengesSidebar from "@/components/challenges/challenges-sidebar";
import AllChallengesView from "@/components/challenges/views/all-challenges-view";
import MySubmissionsView from "@/components/challenges/views/my-submissions-view";
import LeaderboardView from "@/components/challenges/views/leaderboard-view";
import SavedChallengesView from "@/components/challenges/views/saved-challenges-view";
import MyChallengesView from "@/components/challenges/views/my-challenges-view"; // New
import CreateChallengeModal from "@/components/challenges/modals/create-challenge-modal"; // New
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuIcon, PlusCircleIcon } from "lucide-react"; // New
import { toast } from "@/hooks/use-toast";

export type ChallengesWorkspaceView =
  | "all-challenges"
  | "my-submissions"
  | "leaderboard"
  | "saved-challenges"
  | "my-challenges"; // New

export default function ChallengesPage() {
  const searchParams = useSearchParams();
  const initialViewQueryParam = searchParams.get('view') as ChallengesWorkspaceView | null;
  const returnToQueryParam = searchParams.get('returnTo');

  const [activeView, setActiveView] = React.useState<ChallengesWorkspaceView>(initialViewQueryParam || "all-challenges");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isCreateChallengeModalOpen, setIsCreateChallengeModalOpen] = React.useState(false); // New

  const returnToPath = returnToQueryParam || '/';

  React.useEffect(() => {
    if (initialViewQueryParam && initialViewQueryParam !== activeView) {
      setActiveView(initialViewQueryParam);
    }
  }, [initialViewQueryParam, activeView]);

  const handleChallengeCreated = (data: any) => {
    console.log("Challenge created (conceptually):", data);
    // Potentially refresh lists or navigate to the new challenge if needed
    // For now, just shows a toast handled by the modal itself.
  };

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
      case "my-challenges": // New
        return <MyChallengesView />;
      default:
        return <AllChallengesView />;
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your app header */}
        <ChallengesSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          returnToPath={returnToPath}
        />
        <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div className="md:hidden"> {/* Mobile menu toggle */}
              <Button variant="outline" size="sm" onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
                <MenuIcon className="h-4 w-4 mr-2" />
                Menu (Toggle Placeholder)
              </Button>
            </div>
            <div className="flex-grow">
              {/* Header/title for current view will be inside the view component */}
            </div>
            <Button onClick={() => setIsCreateChallengeModalOpen(true)}>
              <PlusCircleIcon className="mr-2 h-4 w-4" /> New Challenge
            </Button>
          </div>
          {renderActiveView()}
        </main>
      </div>
      <CreateChallengeModal
        isOpen={isCreateChallengeModalOpen}
        onOpenChange={setIsCreateChallengeModalOpen}
        onChallengeCreated={handleChallengeCreated}
      />
    </>
  );
}
