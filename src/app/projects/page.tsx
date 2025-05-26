
"use client";

import * as React from "react";
import ProjectWorkspaceSidebar from "@/components/project/project-workspace-sidebar";
import ThreadsView from "@/components/project/views/threads-view";
import ChannelsView from "@/components/project/views/channels-view";
import DirectMessagesView from "@/components/project/views/direct-messages-view";
import MentionsActivityView from "@/components/project/views/mentions-activity-view";
import FilesView from "@/components/project/views/files-view";
import ProjectSettingsView from "@/components/project/views/settings-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ProjectWorkspaceView = 
  | "threads" 
  | "channels" 
  | "dms" 
  | "activity" 
  | "files" 
  | "settings";

export default function ProjectsPage() {
  const [activeView, setActiveView] = React.useState<ProjectWorkspaceView>("threads");

  const renderActiveView = () => {
    switch (activeView) {
      case "threads":
        return <ThreadsView />;
      case "channels":
        return <ChannelsView />;
      case "dms":
        return <DirectMessagesView />;
      case "activity":
        return <MentionsActivityView />;
      case "files":
        return <FilesView />;
      case "settings":
        return <ProjectSettingsView />;
      default:
        return <ThreadsView />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your header */}
      <ProjectWorkspaceSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
        {/* 
          The "Back to Feed" button is assumed to be handled externally 
          to toggle visibility of this entire workspace view.
        */}
        {renderActiveView()}
      </main>
    </div>
  );
}
