
// src/app/projects/[projectId]/page.tsx
"use client";

import * as React from "react";
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeftIcon, 
  TagIcon, 
  UsersIcon, 
  MessageSquareIcon, 
  FileTextIcon, 
  UserPlusIcon, 
  SendIcon,
  ClipboardPlusIcon,
  SettingsIcon
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHint?: string;
  role: string;
}

interface ProjectComment {
  id:string;
  userName: string;
  userAvatar: string;
  dataAiHint?: string;
  text: string;
  timestamp: string;
}

interface ProjectFullDetails {
  id: string;
  name: string;
  description: string;
  tags: string[];
  progress: number;
  imageUrl?: string;
  imageAiHint?: string;
  teamMembers: TeamMember[];
  publicComments: ProjectComment[];
}

const sampleProjectFullDetailsData: { [key: string]: ProjectFullDetails } = {
  "prj_ai_engine": {
    id: "prj_ai_engine",
    name: "AI Recommendation Engine",
    description: "Building an advanced recommendation system using collaborative filtering and LLMs for personalized suggestions. This project aims to revolutionize how users discover content and connections on the platform.",
    tags: ["Python", "Machine Learning", "LLM", "Big Data", "Recommendations"],
    progress: 20,
    imageUrl: "https://placehold.co/800x300.png?prj=ai_overview",
    imageAiHint: "artificial intelligence network",
    teamMembers: [
      { id: "user_sj", name: "Samira Jones", avatarUrl: "https://placehold.co/100x100.png?t=4", dataAiHint: "data scientist", role: "Lead Data Scientist" },
      { id: "user_rd", name: "Rohan Das", avatarUrl: "https://placehold.co/100x100.png?t=5", dataAiHint: "engineer man", role: "ML Engineer" },
      { id: "user_new_dev", name: "Ken Adams", avatarUrl: "https://placehold.co/100x100.png?t=8", dataAiHint: "developer", role: "Backend Developer" },
    ],
    publicComments: [
        {id: "pc1", userName: "GuestUser1", userAvatar: "https://placehold.co/100x100.png?t=g1", dataAiHint: "person icon", text: "This looks like a very promising project! When do you expect a beta release?", timestamp: "3 days ago"},
        {id: "pc2", userName: "DevAdvocate", userAvatar: "https://placehold.co/100x100.png?t=g2", dataAiHint: "person icon", text: "Excited to see Genkit being potentially used here. Any plans for open-sourcing parts of it?", timestamp: "1 day ago"},
    ]
  },
   "prj_codesphere": {
    id: "prj_codesphere",
    name: "CodeSphere Platform Core",
    description: "Developing the core platform for developer collaboration and networking. Focus on scalability and user experience.",
    tags: ["Next.js", "TypeScript", "AI", "Collaboration"],
    progress: 75,
    imageUrl: "https://placehold.co/800x300.png?prj=codesphere_overview",
    imageAiHint: "abstract network",
    teamMembers: [
      { id: "user_ev", name: "Dr. Elara Vance", avatarUrl: "https://placehold.co/100x100.png?t=1", dataAiHint: "scientist woman", role: "Lead AI Researcher" },
      { id: "user_mc", name: "Marcus Chen", avatarUrl: "https://placehold.co/100x100.png?t=2", dataAiHint: "developer man", role: "Frontend Lead" },
      { id: "user_ak", name: "Aisha Khan", avatarUrl: "https://placehold.co/100x100.png?t=3", dataAiHint: "backend engineer", role: "Backend Architect" },
    ],
    publicComments: [
        {id: "pc3", userName: "TechEnthusiast", userAvatar: "https://placehold.co/100x100.png?t=g3", dataAiHint: "person technology", text: "Amazing platform! Looking forward to the launch.", timestamp: "5 days ago"},
    ]
  },
  "prj_mobile_app": {
    id: "prj_mobile_app",
    name: "Mobile App Companion",
    description: "Creating a native mobile application for CodeSphere to enhance on-the-go connectivity and notifications for users.",
    tags: ["React Native", "iOS", "Android", "Mobile UX"],
    progress: 45,
    imageUrl: "https://placehold.co/800x300.png?prj=mobile_overview",
    imageAiHint: "mobile application design",
    teamMembers: [
      { id: "user_lg", name: "Liam Gallagher", avatarUrl: "https://placehold.co/100x100.png?t=6", dataAiHint: "mobile developer", role: "Mobile Lead" },
      { id: "user_pb", name: "Priya Bhatt", avatarUrl: "https://placehold.co/100x100.png?t=7", dataAiHint: "ux designer", role: "UI/UX Designer" },
    ],
    publicComments: []
  }
};

export default function ProjectOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const [newComment, setNewComment] = React.useState("");

  const project = sampleProjectFullDetailsData[projectId];

  const handleRequestToJoin = () => {
    toast({
      title: "Request Sent!",
      description: "Your request to join the project has been sent. You will be notified once approved.",
    });
  };
  
  const handlePostComment = () => {
    if (!newComment.trim()) return;
    console.log("New public comment submitted:", { projectId, text: newComment });
    toast({ title: "Comment Submitted", description: "Your comment has been submitted (conceptually)." });
    setNewComment("");
  };

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
        <Button variant="outline" size="icon" disabled>
            <SettingsIcon className="h-4 w-4"/>
            <span className="sr-only">Project Settings (Team Only)</span>
        </Button>
      </div>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        {project.imageUrl && (
          <div className="relative h-48 w-full md:h-64 bg-muted">
            <Image src={project.imageUrl} alt={`${project.name} banner`} layout="fill" objectFit="cover" data-ai-hint={project.imageAiHint || "project image"}/>
          </div>
        )}
        <CardHeader className="p-6">
          <CardTitle className="text-3xl md:text-4xl font-bold">{project.name}</CardTitle>
          <CardDescription className="text-md text-muted-foreground mt-2">
            {project.description}
          </CardDescription>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <TagIcon className="h-5 w-5 text-muted-foreground mr-1"/>
              {project.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} aria-label={`${project.progress}% complete`} className="h-3" />
          </div>
           <Button onClick={handleRequestToJoin} size="lg" className="w-full md:w-auto">
            <ClipboardPlusIcon className="mr-2 h-5 w-5" /> Request to Join Project
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><UsersIcon className="mr-2 h-6 w-6 text-primary"/>Project Team</CardTitle>
            <CardDescription>Meet the core team members. Feel free to send a connection request.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.teamMembers.map(member => (
              <div key={member.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-card border rounded-lg hover:bg-muted/50 transition-colors gap-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.substring(0,1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2 sm:mt-0 w-full sm:w-auto" onClick={() => toast({title: `Connection request to ${member.name} sent (conceptually).`})}>
                  <UserPlusIcon className="mr-2 h-4 w-4"/> Add to Connection
                </Button>
              </div>
            ))}
             <Button variant="link" size="sm" className="p-0" asChild>
                <Link href={`/projects/${projectId}/team`}>View Full Team Details &rarr;</Link>
             </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl">
            <CardHeader>
                <CardTitle className="text-xl">Project Hub</CardTitle>
                <CardDescription>Explore different aspects of the project. Some areas may have limited access for outsiders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                 <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/projects/${projectId}/comments`}>
                        <MessageSquareIcon className="mr-2 h-4 w-4" /> View All Comments
                    </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/projects/${projectId}/files`}>
                        <FileTextIcon className="mr-2 h-4 w-4" /> Project Files (Limited Preview)
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
      
      <Separator />

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center"><MessageSquareIcon className="mr-2 h-6 w-6 text-primary"/>Public Comments & Questions</CardTitle>
          <CardDescription>Share your thoughts or ask questions about the project.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your public comment or question here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] bg-background"
          />
          <Button onClick={handlePostComment}>
            <SendIcon className="mr-2 h-4 w-4" /> Post Comment
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4 p-6 border-t">
          <h3 className="text-md font-semibold">Recent Public Comments:</h3>
          {project.publicComments.length > 0 ? (
            <ul className="space-y-4 w-full">
              {project.publicComments.map((comment) => (
                <li key={comment.id} className="flex items-start space-x-3 p-3 bg-muted/50 border rounded-lg">
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} data-ai-hint={comment.dataAiHint}/>
                    <AvatarFallback>{comment.userName.substring(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground text-sm">{comment.userName}</p>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 whitespace-pre-wrap">{comment.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No public comments yet.</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
    
