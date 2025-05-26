
// src/components/project/views/my-projects-org-view.tsx
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation'; // For potential navigation
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderKanbanIcon, PlusCircleIcon, EyeIcon } from "lucide-react";
import type { ProjectWorkspaceView } from "@/app/projects/page";

interface ProjectInOrgEntry {
  id: string;
  name: string;
  organizationName: string;
  role: string; // User's role in this project
  status: "Active" | "Archived" | "On Hold";
  imageUrl?: string; // Optional project image
  imageAiHint?: string;
}

// Sample data - in a real app, this would be fetched based on the current user and their org memberships
const sampleUserOrgProjects: ProjectInOrgEntry[] = [
  { id: "prj_alpha_1", name: "AI Portfolio Builder", organizationName: "Innovatech Solutions", role: "Lead Developer", status: "Active", imageUrl: "https://placehold.co/400x200.png?prj=alpha1", imageAiHint: "portfolio builder" },
  { id: "prj_beta_1", name: "GreenTech Dashboard", organizationName: "GreenFuture 🌱", role: "Contributor", status: "Active", imageUrl: "https://placehold.co/400x200.png?prj=beta1", imageAiHint: "dashboard interface" },
  { id: "prj_alpha_2", name: "Mobile Companion App", organizationName: "Innovatech Solutions", role: "UX Designer", status: "On Hold", imageUrl: "https://placehold.co/400x200.png?prj=alpha2", imageAiHint: "mobile app"  },
];

interface MyProjectsOrgViewProps {
  setActiveView: (view: ProjectWorkspaceView) => void;
}

export default function MyProjectsOrgView({ setActiveView }: MyProjectsOrgViewProps) {
  const router = useRouter();

  // Conceptual: Function to navigate to a specific project's workspace/details
  const handleOpenProjectWorkspace = (projectId: string) => {
    // In a real app, this might go to a more specific URL like /organizations/{orgId}/projects/{projectId}
    // For now, it's a conceptual placeholder.
    alert(`Conceptual: Open workspace for project ${projectId}`);
    // Example navigation: router.push(`/projects/org_placeholder/${projectId}`); 
  };

  return (
    <Card className="h-full flex flex-col shadow-xl rounded-xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
                <CardTitle className="text-2xl font-bold flex items-center">
                <FolderKanbanIcon className="mr-2 h-6 w-6 text-primary" /> My Projects (In Organizations)
                </CardTitle>
                <CardDescription>
                Projects you are a member of within your organizations.
                </CardDescription>
            </div>
            <Button onClick={() => setActiveView("create-project-org")}>
                <PlusCircleIcon className="mr-2 h-4 w-4"/> Create New Project
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 md:p-6">
        {sampleUserOrgProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleUserOrgProjects.map((project) => (
              <Card key={project.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
                {project.imageUrl && (
                    <div className="relative h-32 w-full bg-muted">
                        <img src={project.imageUrl} alt={project.name} data-ai-hint={project.imageAiHint} className="h-full w-full object-cover"/>
                    </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                  <CardDescription className="text-xs">From: {project.organizationName}</CardDescription>
                </CardHeader>
                <CardContent className="text-xs space-y-1 flex-grow">
                  <p><span className="font-medium">Your Role:</span> {project.role}</p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <Badge 
                        variant={project.status === "Active" ? "default" : "secondary"} 
                        className="ml-1.5 text-[10px]"
                    >
                        {project.status}
                    </Badge>
                  </p>
                </CardContent>
                <CardFooter className="p-3 border-t">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenProjectWorkspace(project.id)}>
                    <EyeIcon className="mr-1.5 h-3.5 w-3.5"/> Open Workspace
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <FolderKanbanIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">No projects found.</p>
            <p className="text-sm text-muted-foreground/80">You are not yet part of any projects in your organizations, or no projects have been created.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
