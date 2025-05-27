
"use client";

import * as React from "react";
import ProjectWorkspaceSidebar from "@/components/project/project-workspace-sidebar";
import ThreadsView from "@/components/project/views/threads-view";
import ChannelsView from "@/components/project/views/channels-view";
import CreateChannelView from "@/components/project/views/create-channel-view";
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
import ActivateWorkspaceModal from "@/components/workspace/activate-workspace-modal"; // New Import
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export type ProjectWorkspaceView =
  | "threads"
  | "channels"
  | "create-channel"
  | "dms"
  | "activity"
  | "files"
  | "settings"
  // Organization and Project views
  | "create-organization"
  | "join-organization"
  | "my-organizations"
  | "create-project-org"
  | "join-project-org"
  | "my-projects-org";

export default function ProjectsPage() {
  const [activeView, setActiveView] = React.useState<ProjectWorkspaceView>("threads");
  const [isCreateActionsModalOpen, setIsCreateActionsModalOpen] = React.useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  // State for the new activation modal
  const [isActivateModalOpen, setIsActivateModalOpen] = React.useState(false);
  const [workspaceActivationAttempted, setWorkspaceActivationAttempted] = React.useState(false);
  const [activatedWorkspaceName, setActivatedWorkspaceName] = React.useState<string | null>(null);


  React.useEffect(() => {
    // For MVP, using a simple check. In a real app, this would be tied to user data/localStorage.
    if (!workspaceActivationAttempted) {
      setIsActivateModalOpen(true);
    }
  }, [workspaceActivationAttempted]);

  const handleWorkspaceActivate = (name: string) => {
    console.log("Workspace Activated:", name);
    setActivatedWorkspaceName(name);
    setWorkspaceActivationAttempted(true);
    setIsActivateModalOpen(false);
    toast({
      title: "Workspace Activated!",
      description: `Your workspace "${name}" is now active for this session.`,
    });
  };

  const handleActivationCancel = () => {
    setWorkspaceActivationAttempted(true); // Mark as attempted even if cancelled
    setIsActivateModalOpen(false);
     toast({
      title: "Workspace Activation Cancelled",
      description: "You can name your workspace later if needed.",
      variant: "default",
    });
  };


  const renderActiveView = () => {
    // If workspace is not conceptually "activated" yet, and modal isn't open, show a placeholder or minimal view.
    // For this example, we'll proceed to render activeView, but the modal will overlay it.
    // A more robust UX might wait for activation before showing the full workspace.

    switch (activeView) {
      case "threads":
        return <ThreadsView workspaceName={activatedWorkspaceName} />;
      case "channels":
        return <ChannelsView />;
      case "create-channel":
        return <CreateChannelView setActiveView={setActiveView} />;
      case "dms":
        return <DirectMessagesView />;
      case "activity":
        return <MentionsActivityView />;
      case "files":
        return <FilesView />;
      case "settings":
        return <ProjectSettingsView />;
      // Organization and Project views
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
        return <ThreadsView workspaceName={activatedWorkspaceName} />;
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your app header */}
        <ProjectWorkspaceSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenCreateActionsModal={() => setIsCreateActionsModalOpen(true)}
        />
        <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
          <div className="md:hidden mb-4">
            <Button variant="outline" size="sm" onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
              <MenuIcon className="h-4 w-4 mr-2" />
              Menu (Toggle Placeholder)
            </Button>
          </div>
          {activatedWorkspaceName && <h2 className="text-xl font-semibold mb-4 text-primary">Workspace: {activatedWorkspaceName}</h2>}
          {renderActiveView()}
        </main>
      </div>
      <CreateActionsModal
        isOpen={isCreateActionsModalOpen}
        onOpenChange={setIsCreateActionsModalOpen}
      />
      <ActivateWorkspaceModal
        isOpen={isActivateModalOpen && !workspaceActivationAttempted} // Only open if not attempted
        onOpenChange={(isOpen) => {
            setIsActivateModalOpen(isOpen);
            if (!isOpen) { // If modal is closed by clicking outside or X button
                handleActivationCancel();
            }
        }}
        onActivate={handleWorkspaceActivate}
      />
    </>
  );
}
