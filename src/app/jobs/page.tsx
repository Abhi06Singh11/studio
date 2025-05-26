
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import JobsProjectsSidebar from "@/components/jobs/jobs-projects-sidebar";
import PostJobView from "@/components/jobs/views/post-job-view";
import ViewPostedJobsView from "@/components/jobs/views/view-posted-jobs-view";
import PostProjectInvitationView from "@/components/jobs/views/post-project-invitation-view";
import ViewInvitationsView from "@/components/jobs/views/view-invitations-view";
import SavedPostsView from "@/components/jobs/views/saved-posts-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type JobsProjectsWorkspaceView =
  | "post-job"
  | "view-posted-jobs"
  | "post-project-invitation"
  | "view-invitations"
  | "messages" // Conceptual for now
  | "saved-jobs"
  | "saved-projects";

export default function JobsProjectsWorkspacePage() {
  const router = useRouter();
  const [activeView, setActiveView] = React.useState<JobsProjectsWorkspaceView>("view-posted-jobs"); // Default view

  const renderActiveView = () => {
    switch (activeView) {
      case "post-job":
        return <PostJobView />;
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
    <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on your app header */}
      <JobsProjectsSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
        {renderActiveView()}
      </main>
    </div>
  );
}
