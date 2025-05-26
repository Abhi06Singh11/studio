
"use client";

import * as React from "react";
import ProjectWorkspaceSidebar from "@/components/project/project-workspace-sidebar";
import ThreadsView from "@/components/project/views/threads-view";
import ChannelsView from "@/components/project/views/channels-view";
import DirectMessagesView from "@/components/project/views/direct-messages-view";
import MentionsActivityView from "@/components/project/views/mentions-activity-view";
import FilesView from "@/components/project/views/files-view";
import ProjectSettingsView from "@/components/project/views/settings-view";

import CreateOrganizationView from "@/components/project/views/create-organization-view";
import JoinOrganizationView from "@/components/project/views/join-organization-view";
import MyOrganizationsView from "@/components/project/views/my-organizations-view";
import CreateProjectInOrgView from "@/components/project/views/create-project-org-view";
import JoinProjectOrgView from "@/components/project/views/join-project-org-view";
import MyProjectsOrgView from "@/components/project/views/my-projects-org-view";
import CreateActionsModal from "@/components/project/create-actions-modal"; 

export type ProjectWorkspaceView = 
  | "threads" 
  | "channels" 
  | "dms" 
  | "activity" 
  | "files" 
  | "settings"
  // New Organization and Project views
  | "create-organization"
  | "join-organization"
  | "my-organizations"
  | "create-project-org"
  | "join-project-org"
  | "my-projects-org";

export default function ProjectsPage() {
  const [activeView, setActiveView] = React.useState<ProjectWorkspaceView>("threads");
  const [isCreateActionsModalOpen, setIsCreateActionsModalOpen] = React.useState(false);


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
      // New views
      case "create-organization":
        return <CreateOrganizationView />;
      case "join-organization":
        return <JoinOrganizationView />;
      case "my-organizations":
        return <MyOrganizationsView setActiveView={setActiveView} />; 
      case "create-project-org":
        return <CreateProjectInOrgView />;
      case "join-project-org":
        return <JoinProjectOrgView />;
      case "my-projects-org":
        return <MyProjectsOrgView setActiveView={setActiveView} />; 
      default:
        return <ThreadsView />;
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your header */}
        <ProjectWorkspaceSidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          onOpenCreateActionsModal={() => setIsCreateActionsModalOpen(true)} 
        />
        <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
      <CreateActionsModal 
        isOpen={isCreateActionsModalOpen}
        onOpenChange={setIsCreateActionsModalOpen}
      />
    </>
  );
}
