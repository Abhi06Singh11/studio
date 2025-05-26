
"use client";

import * as React from "react";
import ChallengesSidebar from "@/components/challenges/challenges-sidebar";
import AllChallengesView from "@/components/challenges/views/all-challenges-view";
import MySubmissionsView from "@/components/challenges/views/my-submissions-view";
import LeaderboardView from "@/components/challenges/views/leaderboard-view";
import SavedChallengesView from "@/components/challenges/views/saved-challenges-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ChallengesWorkspaceView =
  | "all-challenges"
  | "my-submissions"
  | "leaderboard"
  | "saved-challenges";

export default function ChallengesPage() {
  const [activeView, setActiveView] = React.useState<ChallengesWorkspaceView>("all-challenges");

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
      <ChallengesSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
        {renderActiveView()}
      </main>
    </div>
  );
}
