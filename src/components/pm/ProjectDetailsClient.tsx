
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircleIcon, ArrowLeftIcon, CheckSquareIcon, UsersIcon, ListIcon, ActivityIcon, Edit3Icon } from "lucide-react";
import CreateIssueModal from "./CreateIssueModal"; // Will be created next
import { Separator } from "@/components/ui/separator";

// Dummy Data for a specific project and its issues
const sampleProjectDetailsStore: { [key: string]: any } = {
  "prj_marketing_revamp": {
    id: "prj_marketing_revamp",
    name: "Marketing Website Revamp",
    description: "Complete overhaul of the main marketing website, focusing on UI/UX improvements, new branding, and performance optimization.",
    status: "Active",
    createdBy: "user_elara_vance_id",
    teamMembers: [
      { id: "user1", name: "Dr. Elara Vance", avatarUrl: "https://placehold.co/40x40.png?p=1", dataAiHint: "scientist woman" },
      { id: "user2", name: "Marcus Chen", avatarUrl: "https://placehold.co/40x40.png?p=2", dataAiHint: "developer man" },
    ],
    createdAt: "2024-06-01T10:00:00Z",
    tags: ["UI/UX", "Frontend", "Marketing"]
  },
  "prj_ai_engine_dev": {
    id: "prj_ai_engine_dev",
    name: "AI Engine Development",
    description: "Building the core AI engine for personalized recommendations and content analysis.",
    status: "Active",
    createdBy: "user_marcus_chen_id",
    teamMembers: [
      { id: "user2", name: "Marcus Chen", avatarUrl: "https://placehold.co/40x40.png?p=2", dataAiHint: "developer man" },
      { id: "user3", name: "Aisha Khan", avatarUrl: "https://placehold.co/40x40.png?p=3", dataAiHint: "engineer woman" },
    ],
    createdAt: "2024-05-15T14:30:00Z",
    tags: ["AI", "Backend", "Machine Learning"]
  },
  // Add more sample projects if needed
};

const sampleIssuesStore: { [key: string]: any[] } = {
    "prj_marketing_revamp": [
        { id: "issue1", title: "Fix mobile navbar overlap", type: "Bug", priority: "High", status: "To Do", assignee: "Marcus Chen", createdBy: "Dr. Elara Vance", tags: ["UI", "Mobile"], createdAt: "2024-07-28T10:00:00Z" },
        { id: "issue2", title: "Implement new hero section design", type: "Task", priority: "Medium", status: "In Progress", assignee: "Dr. Elara Vance", createdBy: "Aisha Khan", tags: ["UI", "Frontend"], createdAt: "2024-07-27T15:00:00Z" },
        { id: "issue3", title: "Add testimonials page", type: "Feature", priority: "Low", status: "To Do", assignee: "Marcus Chen", createdBy: "Dr. Elara Vance", tags: ["Content", "Frontend"], createdAt: "2024-07-29T09:00:00Z" },
    ],
    "prj_ai_engine_dev": [
        { id: "issue4", title: "Optimize recommendation algorithm", type: "Task", priority: "High", status: "In Progress", assignee: "Aisha Khan", createdBy: "Marcus Chen", tags: ["Performance", "AI"], createdAt: "2024-07-25T11:00:00Z"},
    ]
};


interface ProjectDetailsClientProps {
  projectId: string;
}

export default function ProjectDetailsClient({ projectId }: ProjectDetailsClientProps) {
  const router = useRouter();
  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = React.useState(false);
  const [project, setProject] = React.useState(sampleProjectDetailsStore[projectId]);
  const [issues, setIssues] = React.useState(sampleIssuesStore[projectId] || []);

  React.useEffect(() => {
    setProject(sampleProjectDetailsStore[projectId]);
    setIssues(sampleIssuesStore[projectId] || []);
  }, [projectId]);

  const handleIssueCreated = (newIssueData: any) => {
    console.log("Issue created (conceptually):", newIssueData);
    setIssues(prev => [newIssueData, ...prev]); // Add to local state for demo
  };

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <CheckSquareIcon className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">The project you are looking for (ID: {projectId}) does not exist or could not be loaded.</p>
        <Button onClick={() => router.push('/pm/projects')}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/pm/projects')}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
        </div>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                    <CardTitle className="text-3xl font-bold flex items-center">
                        <CheckSquareIcon className="mr-3 h-8 w-8 text-primary flex-shrink-0" />
                        {project.name}
                    </CardTitle>
                    <CardDescription className="mt-1 text-md">{project.description}</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="mt-2 sm:mt-0" disabled>
                    <Edit3Icon className="mr-2 h-4 w-4"/> Edit Project (NYI)
                </Button>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Team:</span>
              {project.teamMembers.map((member: any) => (
                <Avatar key={member.id} className="h-7 w-7 border">
                  <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                  <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
              ))}
              <Button variant="ghost" size="icon" className="h-7 w-7" disabled>
                <UserPlusIcon className="h-4 w-4" />
                <span className="sr-only">Add Member (NYI)</span>
              </Button>
            </div>
             <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
             </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="overview"><UsersIcon className="mr-2 h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="issues"><ListIcon className="mr-2 h-4 w-4"/>Issues ({issues.length})</TabsTrigger>
              <TabsTrigger value="activity"><ActivityIcon className="mr-2 h-4 w-4"/>Activity Log</TabsTrigger>
            </TabsList>
            <Button onClick={() => setIsCreateIssueModalOpen(true)}>
              <PlusCircleIcon className="mr-2 h-4 w-4" /> Create New Issue
            </Button>
          </div>

          <TabsContent value="overview">
            <Card>
              <CardHeader><CardTitle>Project Overview</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detailed project summary, goals, milestones, and relevant links will be displayed here.</p>
                <p className="mt-2 text-sm">Status: <Badge variant={project.status === "Active" ? "default" : "secondary"}>{project.status}</Badge></p>
                <p className="text-sm">Created By: {project.createdBy.replace('_id','').replace(/_/g, ' ')} (Conceptual)</p>
                <p className="text-sm">Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues">
            {/* IssueList component will go here, for now a placeholder */}
            <Card>
              <CardHeader><CardTitle>Issues & Tasks</CardTitle></CardHeader>
              <CardContent>
                {issues.length > 0 ? (
                    issues.map((issue: any) => (
                        <div key={issue.id} className="border p-3 rounded-md mb-2">
                            <h4 className="font-semibold">{issue.title} <Badge variant={issue.priority === "High" ? "destructive" : issue.priority === "Medium" ? "secondary" : "outline"}>{issue.priority}</Badge></h4>
                            <p className="text-xs text-muted-foreground">Type: {issue.type} | Status: {issue.status} | Assignee: {issue.assignee}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground">No issues created yet for this project.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader><CardTitle>Activity Log</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A chronological feed of all activities related to this project (e.g., issue creation, status changes, comments) will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <CreateIssueModal
        isOpen={isCreateIssueModalOpen}
        onOpenChange={setIsCreateIssueModalOpen}
        onIssueCreated={handleIssueCreated}
        projectId={projectId}
        teamMembers={project.teamMembers}
      />
    </>
  );
}
    