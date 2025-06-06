
"use client";

import * as React from "react";
import { useSearchParams } from 'next/navigation';
import ChallengesSidebar from "@/components/challenges/challenges-sidebar";
import AllChallengesView from "@/components/challenges/views/all-challenges-view";
import MySubmissionsView from "@/components/challenges/views/my-submissions-view";
import LeaderboardView from "@/components/challenges/views/leaderboard-view";
import SavedChallengesView from "@/components/challenges/views/saved-challenges-view";
import MyChallengesView from "@/components/challenges/views/my-challenges-view";
import CreateChallengeModal from "@/components/challenges/modals/create-challenge-modal";
import { Button } from "@/components/ui/button";
import { MenuIcon, PlusCircleIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Import Sheet components

export type ChallengesWorkspaceView =
  | "all-challenges"
  | "my-submissions"
  | "leaderboard"
  | "saved-challenges"
  | "my-challenges";

export default function ChallengesPage() {
  const searchParams = useSearchParams();
  const initialViewQueryParam = searchParams.get('view') as ChallengesWorkspaceView | null;
  const returnToQueryParam = searchParams.get('returnTo');

  const [activeView, setActiveView] = React.useState<ChallengesWorkspaceView>(initialViewQueryParam || "all-challenges");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isCreateChallengeModalOpen, setIsCreateChallengeModalOpen] = React.useState(false);

  const returnToPath = returnToQueryParam || '/';

  React.useEffect(() => {
    if (initialViewQueryParam && initialViewQueryParam !== activeView) {
      setActiveView(initialViewQueryParam);
    }
  }, [initialViewQueryParam, activeView]);

  const handleChallengeCreated = (data: any) => {
    console.log("Challenge created (conceptually):", data);
  };

  const handleMobileLinkClick = () => {
    setIsMobileSidebarOpen(false);
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
      case "my-challenges":
        return <MyChallengesView />;
      default:
        return <AllChallengesView />;
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your app header */}
        {/* Desktop Sidebar */}
        <aside className="w-64 md:w-72 bg-muted/40 border-r flex-col h-full hidden md:flex">
          <ChallengesSidebar
            activeView={activeView}
            setActiveView={setActiveView}
            returnToPath={returnToPath}
          />
        </aside>

        <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MenuIcon className="h-4 w-4 mr-2" />
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 bg-card">
                  <ChallengesSidebar
                    activeView={activeView}
                    setActiveView={setActiveView}
                    returnToPath={returnToPath}
                    onLinkClick={handleMobileLinkClick}
                  />
                </SheetContent>
              </Sheet>
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
