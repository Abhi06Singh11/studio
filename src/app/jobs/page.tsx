
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import JobsProjectsSidebar from "@/components/jobs/jobs-projects-sidebar";
import CreateJobPostingModal from "@/components/job/create-job-posting-modal";
import ViewPostedJobsView from "@/components/jobs/views/view-posted-jobs-view";
import PostProjectInvitationView from "@/components/jobs/views/post-project-invitation-view";
import ViewInvitationsView from "@/components/jobs/views/view-invitations-view";
import SavedPostsView from "@/components/jobs/views/saved-posts-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MenuIcon, BriefcaseIcon, UserPlusIcon } from "lucide-react"; 
import { toast } from "@/hooks/use-toast";


export type JobsProjectsWorkspaceView =
  | "post-job"
  | "view-posted-jobs"
  | "post-project-invitation"
  | "view-invitations"
  | "messages"
  | "saved-jobs"
  | "saved-projects";

export default function JobsProjectsWorkspacePage() {
  const router = useRouter();
  const [activeView, setActiveView] = React.useState<JobsProjectsWorkspaceView>("view-posted-jobs");
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = React.useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const handleSetActiveView = (view: JobsProjectsWorkspaceView) => {
    if (view === "post-job") {
      setIsCreateJobModalOpen(true);
      if (activeView !== "view-posted-jobs") {
        setActiveView("view-posted-jobs");
      }
    } else {
      setActiveView(view);
    }
  };

  const handleJobPosted = (newJob: any) => {
    console.log("New job posted, potentially refresh job list:", newJob);
    setActiveView("view-posted-jobs");
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "view-posted-jobs":
        return <ViewPostedJobsView />;
      case "post-project-invitation":
        return <PostProjectInvitationView />;
      case "view-invitations":
        return <ViewInvitationsView />;
      case "saved-jobs":
        return <SavedPostsView defaultTab="saved-jobs"/>;
      case "saved-projects":
        return <SavedPostsView defaultTab="saved-projects"/>;
      case "messages":
        return (
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Project and job related messages (Conceptual).</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This section will display messages related to your job postings and project collaborations.</p>
                </CardContent>
            </Card>
        );
      default:
        return <ViewPostedJobsView />;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-[calc(100vh-4rem)]">
        <JobsProjectsSidebar activeView={activeView} setActiveView={handleSetActiveView} />
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
      <CreateJobPostingModal
        isOpen={isCreateJobModalOpen}
        onOpenChange={setIsCreateJobModalOpen}
        onJobPosted={handleJobPosted}
      />
    </TooltipProvider>
  );
}
