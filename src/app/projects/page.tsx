
"use client";

import * as React from "react";
import Link from "next/link"; // Import Link
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FolderKanbanIcon, PlusCircleIcon, UsersIcon, MessageSquareIcon, FileTextIcon, ArrowRightIcon, BuildingIcon, LogInIcon } from "lucide-react";
import Image from "next/image";
import CreateOrganizationModal from "@/components/organization/create-organization-modal";
import JoinProjectModal from "@/components/project/join-project-modal"; // New Import
import JoinWorkspaceModal from "@/components/workspace/join-workspace-modal"; // New Import
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectMember {
  name: string;
  src: string;
  dataAiHint?: string;
}

interface OrganizationInfo {
  id: string;
  name: string;
  logoUrl?: string;
  logoAiHint?: string;
}

interface SampleProject {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  team: ProjectMember[];
  tags: string[];
  imageUrl?: string;
  imageAiHint?: string;
  organization?: OrganizationInfo;
}

const sampleProjects: SampleProject[] = [
  {
    id: "prj_codesphere",
    name: "CodeSphere Platform Core",
    description: "Developing the core platform for developer collaboration and networking. Focus on scalability and user experience. Includes features like real-time messaging, project management tools, and AI-driven recommendations.",
    status: "In Progress",
    progress: 75,
    team: [
      { name: "EV", src: "https://placehold.co/50x50.png?t=1", dataAiHint: "person avatar" },
      { name: "MC", src: "https://placehold.co/50x50.png?t=2", dataAiHint: "person avatar" },
      { name: "AK", src: "https://placehold.co/50x50.png?t=3", dataAiHint: "person avatar" },
    ],
    tags: ["Next.js", "TypeScript", "AI", "Collaboration", "Full-Stack"],
    imageUrl: "https://placehold.co/400x200.png?prj=1",
    imageAiHint: "team working",
    organization: {
      id: "org_123",
      name: "Innovatech Solutions",
      logoUrl: "https://placehold.co/32x32.png?text=IS",
      logoAiHint: "company logo abstract"
    }
  },
  {
    id: "prj_ai_engine",
    name: "AI Recommendation Engine",
    description: "Building an advanced recommendation system using collaborative filtering and LLMs for personalized suggestions. This engine will power connection and content suggestions across the platform.",
    status: "Planning",
    progress: 20,
    team: [
      { name: "SJ", src: "https://placehold.co/50x50.png?t=4", dataAiHint: "person avatar" },
      { name: "RD", src: "https://placehold.co/50x50.png?t=5", dataAiHint: "person avatar" },
    ],
    tags: ["Python", "Machine Learning", "LLM", "Big Data", "Data Science"],
    imageUrl: "https://placehold.co/400x200.png?prj=2",
    imageAiHint: "network algorithm"
  },
  {
    id: "prj_mobile_app",
    name: "Mobile App Companion",
    description: "Creating a native mobile application for CodeSphere to enhance on-the-go connectivity and notifications. Will be available on iOS and Android.",
    status: "Completed",
    progress: 100,
    team: [
      { name: "LG", src: "https://placehold.co/50x50.png?t=6", dataAiHint: "person avatar" },
      { name: "PB", src: "https://placehold.co/50x50.png?t=7", dataAiHint: "person avatar" },
    ],
    tags: ["React Native", "iOS", "Android", "Mobile UX", "Firebase"],
    imageUrl: "https://placehold.co/400x200.png?prj=3",
    imageAiHint: "mobile app",
    organization: {
      id: "org_456",
      name: "GreenFuture 🌱",
      logoUrl: "https://placehold.co/32x32.png?text=GF",
      logoAiHint: "nature logo"
    }
  }
];

export default function ProjectsPage() {
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = React.useState(false);
  const [isJoinProjectModalOpen, setIsJoinProjectModalOpen] = React.useState(false);
  const [isJoinWorkspaceModalOpen, setIsJoinWorkspaceModalOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Workspaces</h1>
            <p className="text-muted-foreground">
              Browse projects, manage your work, or create new initiatives. 
              Each project provides access to its team details, files (with access controls), and a dedicated comment section for discussions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsJoinProjectModalOpen(true)}>
              <LogInIcon className="mr-2 h-5 w-5" /> Join Project
            </Button>
             <Button onClick={() => setIsJoinWorkspaceModalOpen(true)}>
              <UsersIcon className="mr-2 h-5 w-5" /> Join Workspace
            </Button>
            <Button onClick={() => setIsCreateOrgModalOpen(true)} variant="outline">
              <BuildingIcon className="mr-2 h-5 w-5" /> Create Organization
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects/create-personal">
                <PlusCircleIcon className="mr-2 h-5 w-5" /> Create New Project
              </Link>
            </Button>
          </div>
        </div>

        <CreateOrganizationModal
          isOpen={isCreateOrgModalOpen}
          onOpenChange={setIsCreateOrgModalOpen}
        />
        <JoinProjectModal
          isOpen={isJoinProjectModalOpen}
          onOpenChange={setIsJoinProjectModalOpen}
          currentProjects={sampleProjects}
        />
        <JoinWorkspaceModal
          isOpen={isJoinWorkspaceModalOpen}
          onOpenChange={setIsJoinWorkspaceModalOpen}
          // You might want to pass sample organization data here
        />


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg rounded-xl">
              {project.imageUrl && (
                <div className="relative h-40 w-full">
                  <Image src={project.imageUrl} alt={project.name} layout="fill" objectFit="cover" data-ai-hint={project.imageAiHint}/>
                </div>
              )}
              <CardHeader className="pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <FolderKanbanIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                </div>
                {project.organization && (
                  <Link href={`/organizations/${project.organization.id}`} className="group">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1 hover:text-primary hover:underline">
                      {project.organization.logoUrl && (
                        <Image
                          src={project.organization.logoUrl}
                          alt={`${project.organization.name} logo`}
                          data-ai-hint={project.organization.logoAiHint || "logo"}
                          width={16}
                          height={16}
                          className="rounded-sm"
                        />
                      )}
                      <span>From: {project.organization.name}</span>
                    </div>
                  </Link>
                )}
                <CardDescription className="text-sm h-16 overflow-hidden text-ellipsis">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-3">
                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} aria-label={`${project.progress}% complete`} />
                </div>
                <div className="mb-3">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Team</h4>
                  <div className="flex -space-x-2">
                    {project.team.map(member => (
                      <Avatar key={member.name} className="h-7 w-7 border-2 border-card">
                        <AvatarImage src={member.src} data-ai-hint={member.dataAiHint}/>
                        <AvatarFallback>{member.name}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2 p-2 border-t bg-muted/30">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/projects/${project.id}/team`}>
                        <UsersIcon className="mr-1 h-4 w-4" /> Team
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View team, connect &amp; collaborate</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/projects/${project.id}/comments`}>
                        <MessageSquareIcon className="mr-1 h-4 w-4" /> Comment
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View and add comments</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/projects/${project.id}/files`}>
                            <FileTextIcon className="mr-1 h-4 w-4" /> Files
                        </Link>
                    </Button>
                  </TooltipTrigger>
                   <TooltipContent>
                    <p>View project files</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={project.organization ? `/organizations/${project.organization.id}` : `/projects/${project.id}`}>
                            <ArrowRightIcon className="mr-1 h-4 w-4" /> Open Project
                        </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>{project.organization ? "Open Organization Workspace" : "View Project Details"}</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

    