
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import JobsProjectsSidebar from "@/components/jobs/jobs-projects-sidebar";
// PostJobView is no longer directly rendered by this page
// import PostJobView from "@/components/jobs/views/post-job-view"; 
import CreateJobPostingModal from "@/components/job/create-job-posting-modal"; // Import the modal
import ViewPostedJobsView from "@/components/jobs/views/view-posted-jobs-view";
import PostProjectInvitationView from "@/components/jobs/views/post-project-invitation-view";
import ViewInvitationsView from "@/components/jobs/views/view-invitations-view";
import SavedPostsView from "@/components/jobs/views/saved-posts-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";

export type JobsProjectsWorkspaceView =
  | "post-job" // This will now trigger a modal
  | "view-posted-jobs"
  | "post-project-invitation"
  | "view-invitations"
  | "messages" // Conceptual for now
  | "saved-jobs"
  | "saved-projects";

export default function JobsProjectsWorkspacePage() {
  const router = useRouter();
  const [activeView, setActiveView] = React.useState<JobsProjectsWorkspaceView>("view-posted-jobs");
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = React.useState(false);

  const handleSetActiveView = (view: JobsProjectsWorkspaceView) => {
    if (view === "post-job") {
      setIsCreateJobModalOpen(true);
      // Optionally, set a default background view if the modal is over the current view
      // For example, ensure it opens over the list of posted jobs
      if (activeView !== "view-posted-jobs") {
        setActiveView("view-posted-jobs");
      }
    } else {
      setActiveView(view);
    }
  };

  const handleJobPosted = (newJob: any) => {
    // Conceptual: In a real app, you might want to refresh the list of jobs here
    console.log("New job posted, potentially refresh job list:", newJob);
    // Optionally switch to the view where jobs are listed after posting
    setActiveView("view-posted-jobs"); 
  };

  const renderActiveView = () => {
    switch (activeView) {
      // case "post-job": // This view is now handled by the modal
      //   return <PostJobView />; 
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
      <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your app header */}
        <JobsProjectsSidebar activeView={activeView} setActiveView={handleSetActiveView} />
        <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
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
