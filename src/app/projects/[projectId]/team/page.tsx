
// src/app/projects/[projectId]/team/page.tsx
"use client";

import * as React from "react";
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, UserPlusIcon, BriefcaseIcon, TagsIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHint?: string;
  role: string; 
}

interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  tags: string[];
  team: TeamMember[];
  imageUrl?: string; 
  imageAiHint?: string;
}

const sampleProjectDataStore: { [key: string]: ProjectDetails } = {
  "prj_codesphere": {
    id: "prj_codesphere",
    name: "CodeSphere Platform Core",
    description: "Developing the core platform for developer collaboration and networking. Focus on scalability and user experience.",
    tags: ["Next.js", "TypeScript", "AI", "Collaboration"],
    imageUrl: "https://placehold.co/600x250.png?prj=1",
    imageAiHint: "team working office",
    team: [
      { id: "user_ev", name: "Dr. Elara Vance", avatarUrl: "https://placehold.co/100x100.png?t=1", dataAiHint: "person avatar", role: "Lead AI Researcher" },
      { id: "user_mc", name: "Marcus Chen", avatarUrl: "https://placehold.co/100x100.png?t=2", dataAiHint: "person avatar", role: "Frontend Developer" },
      { id: "user_ak", name: "Aisha Khan", avatarUrl: "https://placehold.co/100x100.png?t=3", dataAiHint: "person avatar", role: "Backend Developer" },
    ],
  },
  "prj_ai_engine": {
    id: "prj_ai_engine",
    name: "AI Recommendation Engine",
    description: "Building an advanced recommendation system using collaborative filtering and LLMs for personalized suggestions.",
    tags: ["Python", "Machine Learning", "LLM", "Big Data"],
    imageUrl: "https://placehold.co/600x250.png?prj=2",
    imageAiHint: "network algorithm",
    team: [
      { id: "user_sj", name: "Samira Jones", avatarUrl: "https://placehold.co/100x100.png?t=4", dataAiHint: "person avatar", role: "Data Scientist" },
      { id: "user_rd", name: "Rohan Das", avatarUrl: "https://placehold.co/100x100.png?t=5", dataAiHint: "person avatar", role: "ML Engineer" },
    ],
  },
  "prj_mobile_app": {
    id: "prj_mobile_app",
    name: "Mobile App Companion",
    description: "Creating a native mobile application for CodeSphere to enhance on-the-go connectivity and notifications.",
    tags: ["React Native", "iOS", "Android", "Mobile UX"],
    imageUrl: "https://placehold.co/600x250.png?prj=3",
    imageAiHint: "mobile app interface",
    team: [
      { id: "user_lg", name: "Liam Gallagher", avatarUrl: "https://placehold.co/100x100.png?t=6", dataAiHint: "person avatar", role: "Mobile Lead" },
      { id: "user_pb", name: "Priya Bhatt", avatarUrl: "https://placehold.co/100x100.png?t=7", dataAiHint: "person avatar", role: "UI/UX Designer" },
    ],
  }
};


export default function ProjectTeamDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const project = sampleProjectDataStore[projectId];

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
                <Button onClick={() => router.back()}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        {project.imageUrl && (
            <div className="relative h-48 w-full md:h-64 bg-muted">
                <Image src={project.imageUrl} alt={`${project.name} banner`} layout="fill" objectFit="cover" data-ai-hint={project.imageAiHint || "project image"}/>
            </div>
        )}
        <CardHeader className="p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center">
            <BriefcaseIcon className="mr-3 h-7 w-7 text-primary flex-shrink-0" />
            {project.name}
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground mt-2">
            {project.description}
          </CardDescription>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <TagsIcon className="h-4 w-4 text-muted-foreground mr-1"/>
              {project.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardHeader>
      </Card>
      
      <Separator />

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Project Team Members</CardTitle>
          <CardDescription>Meet the team behind the "{project.name}" project.</CardDescription>
        </CardHeader>
        <CardContent>
          {project.team.length > 0 ? (
            <ul className="space-y-4">
              {project.team.map((member) => (
                <li key={member.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-card border rounded-lg shadow-sm hover:bg-muted/50 transition-colors gap-3 sm:gap-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                      <AvatarFallback>{member.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 sm:mt-0 w-full sm:w-auto">
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Add to Connection
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No team members listed for this project yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
