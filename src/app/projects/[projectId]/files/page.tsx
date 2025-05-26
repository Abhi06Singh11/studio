
// src/app/projects/[projectId]/files/page.tsx
"use client";

import * as React from "react";
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, FileTextIcon, ImageIcon, SheetIcon, FileIcon, LockIcon, DownloadCloudIcon, EyeIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type ProjectFileType = 'document' | 'image' | 'spreadsheet' | 'code' | 'archive' | 'other';

interface ProjectFile {
  id: string;
  name: string;
  description?: string;
  type: ProjectFileType;
  size?: string;
  lastModified?: string;
  // For this outsider view, we assume all are restricted
  access: 'restricted'; 
}

interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  imageAiHint?: string;
  files: ProjectFile[];
}

// Sample data - in a real app, fetch this based on projectId
const sampleProjectDataStoreWithFiles: { [key: string]: ProjectDetails } = {
  "prj_codesphere": {
    id: "prj_codesphere",
    name: "CodeSphere Platform Core",
    description: "Developing the core platform for developer collaboration and networking. Focus on scalability and user experience.",
    imageUrl: "https://placehold.co/600x250.png?prj=1",
    imageAiHint: "team working office",
    files: [
      { id: "f1", name: "Project Charter.docx", description: "Initial project scope and objectives.", type: "document", size: "1.2MB", lastModified: "2024-07-20", access: "restricted" },
      { id: "f2", name: "UI Mockups v2.fig", description: "Latest design mockups for the main dashboard.", type: "image", size: "5.8MB", lastModified: "2024-07-22", access: "restricted" },
      { id: "f3", name: "Roadmap Q3-Q4.xlsx", description: "Product roadmap and feature planning.", type: "spreadsheet", size: "350KB", lastModified: "2024-07-18", access: "restricted" },
      { id: "f4", name: "backend_api_spec.yaml", description: "OpenAPI specification for backend services.", type: "code", size: "85KB", lastModified: "2024-07-24", access: "restricted" },
    ],
  },
  "prj_ai_engine": {
    id: "prj_ai_engine",
    name: "AI Recommendation Engine",
    description: "Building an advanced recommendation system using collaborative filtering and LLMs for personalized suggestions.",
    imageUrl: "https://placehold.co/600x250.png?prj=2",
    imageAiHint: "network algorithm",
    files: [
      { id: "f5", name: "Research Paper Draft.pdf", description: "Draft of the research paper on the new algorithm.", type: "document", size: "2.1MB", lastModified: "2024-07-23", access: "restricted" },
      { id: "f6", name: "datasets_summary.txt", description: "Overview of datasets used for training.", type: "other", size: "15KB", lastModified: "2024-07-15", access: "restricted" },
    ],
  },
   "prj_mobile_app": {
    id: "prj_mobile_app",
    name: "Mobile App Companion",
    description: "Creating a native mobile application for CodeSphere to enhance on-the-go connectivity and notifications.",
    imageUrl: "https://placehold.co/600x250.png?prj=3",
    imageAiHint: "mobile app interface",
    files: [], // No files for this project yet in sample data
  }
};

function getFileIcon(type: ProjectFileType) {
    switch (type) {
        case 'document': return <FileTextIcon className="h-5 w-5 text-blue-500" />;
        case 'image': return <ImageIcon className="h-5 w-5 text-purple-500" />;
        case 'spreadsheet': return <SheetIcon className="h-5 w-5 text-green-500" />;
        case 'code': return <FileTextIcon className="h-5 w-5 text-orange-500" />; // Using FileText for generic code, could use CodeIcon
        case 'archive': return <FileIcon className="h-5 w-5 text-yellow-500" />; // Generic FileIcon for archives
        default: return <FileIcon className="h-5 w-5 text-muted-foreground" />;
    }
}

export default function ProjectFilesPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const project = sampleProjectDataStoreWithFiles[projectId];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4 md:p-8">
        <Card className="w-full max-w-md p-6 md:p-8 shadow-xl rounded-xl">
            <CardHeader>
                <CardTitle className="text-2xl">Project Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">
                    The project you are looking for does not exist or could not be loaded.
                </p>
                <Button onClick={() => router.push('/projects')}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Project Workspace
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Project Workspace
            </Link>
          </Button>
        </div>

        <Card className="shadow-lg rounded-xl overflow-hidden">
          {project.imageUrl && (
              <div className="relative h-40 w-full md:h-56 bg-muted">
                  <Image src={project.imageUrl} alt={`${project.name} banner`} layout="fill" objectFit="cover" data-ai-hint={project.imageAiHint || "project image"}/>
              </div>
          )}
          <CardHeader className="p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center">
              <FileIcon className="mr-3 h-7 w-7 text-primary flex-shrink-0" />
              Files for: {project.name}
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground mt-1">
              {project.description}
            </CardDescription>
             <Badge variant="outline" className="mt-2 w-fit">Outsider Access Mode: File Previews Restricted</Badge>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.files.length > 0 ? project.files.map((file) => (
            <Card key={file.id} className="shadow-md rounded-lg flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <CardTitle className="text-base font-medium">{file.name}</CardTitle>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <LockIcon className="h-5 w-5 text-destructive cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Restricted – Request Access</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {file.description && <CardDescription className="text-xs mt-1">{file.description}</CardDescription>}
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1 flex-grow">
                {file.size && <p>Size: {file.size}</p>}
                {file.lastModified && <p>Last Modified: {file.lastModified}</p>}
              </CardContent>
              <CardFooter className="p-3 border-t">
                <Button variant="outline" size="sm" className="w-full" onClick={() => alert(`Requesting access to ${file.name}... (Conceptual)`)}>
                  Request Access
                </Button>
              </CardFooter>
            </Card>
          )) : (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="p-6 text-center text-muted-foreground">
                No files available for preview in this project.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

