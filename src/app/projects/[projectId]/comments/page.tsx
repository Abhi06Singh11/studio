
// src/app/projects/[projectId]/comments/page.tsx
"use client";

import * as React from "react";
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftIcon, MessageSquareIcon, SendIcon, LockIcon, GlobeIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ProjectComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  dataAiHint?: string;
  text: string;
  timestamp: string;
  isPrivate: boolean;
}

interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  imageAiHint?: string;
  comments: ProjectComment[];
}

const sampleProjectDataStoreWithComments: { [key: string]: ProjectDetails } = {
  "prj_codesphere": {
    id: "prj_codesphere",
    name: "CodeSphere Platform Core",
    description: "Developing the core platform for developer collaboration and networking. Focus on scalability and user experience.",
    imageUrl: "https://placehold.co/600x250.png?prj=1",
    imageAiHint: "team working office",
    comments: [
      { id: "c1", userId: "user_ev", userName: "Dr. Elara Vance", userAvatar: "https://placehold.co/100x100.png?t=1", dataAiHint: "person avatar", text: "Great progress on the latest sprint! The UI is looking much cleaner.", timestamp: "2 hours ago", isPrivate: false },
      { id: "c2", userId: "user_mc", userName: "Marcus Chen", userAvatar: "https://placehold.co/100x100.png?t=2", dataAiHint: "person avatar", text: "Found a small bug in the authentication flow. Will push a fix shortly.", timestamp: "1 hour ago", isPrivate: false },
      { id: "c3", userId: "user_admin", userName: "Admin User", userAvatar: "https://placehold.co/100x100.png?t=admin", dataAiHint: "admin icon", text: "Budget for Q3 marketing needs to be finalized by EOW.", timestamp: "30 mins ago", isPrivate: true },
    ],
  },
  "prj_ai_engine": {
    id: "prj_ai_engine",
    name: "AI Recommendation Engine",
    description: "Building an advanced recommendation system using collaborative filtering and LLMs for personalized suggestions.",
    imageUrl: "https://placehold.co/600x250.png?prj=2",
    imageAiHint: "network algorithm",
    comments: [
      { id: "c4", userId: "user_sj", userName: "Samira Jones", userAvatar: "https://placehold.co/100x100.png?t=4", dataAiHint: "person avatar", text: "The new dataset has been integrated. We should see improved accuracy.", timestamp: "Yesterday", isPrivate: false },
    ],
  },
   "prj_mobile_app": {
    id: "prj_mobile_app",
    name: "Mobile App Companion",
    description: "Creating a native mobile application for CodeSphere to enhance on-the-go connectivity and notifications.",
    imageUrl: "https://placehold.co/600x250.png?prj=3",
    imageAiHint: "mobile app interface",
    comments: [],
  }
};


export default function ProjectCommentsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const project = sampleProjectDataStoreWithComments[projectId];

  const [newComment, setNewComment] = React.useState("");
  const [commentVisibility, setCommentVisibility] = React.useState<"public" | "private">("public");
  const [projectComments, setProjectComments] = React.useState<ProjectComment[]>(project?.comments || []);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const newCommentEntry: ProjectComment = {
      id: `comment_${Date.now()}`,
      userId: "currentUser_placeholder", 
      userName: "Current User", 
      userAvatar: "https://placehold.co/100x100.png?u=current",
      dataAiHint: "user avatar",
      text: newComment,
      timestamp: "Just now",
      isPrivate: commentVisibility === "private",
    };
    setProjectComments(prevComments => [newCommentEntry, ...prevComments]);
    setNewComment("");
    console.log("New Comment Posted (Conceptual):", newCommentEntry);
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
      </div>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        {project.imageUrl && (
            <div className="relative h-40 w-full md:h-56 bg-muted">
                <Image src={project.imageUrl} alt={`${project.name} banner`} layout="fill" objectFit="cover" data-ai-hint={project.imageAiHint || "project image"}/>
            </div>
        )}
        <CardHeader className="p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center">
            <MessageSquareIcon className="mr-3 h-7 w-7 text-primary flex-shrink-0" />
            Comments for: {project.name}
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground mt-1">
            {project.description}
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Separator />

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add New Comment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] bg-background"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">Comment Visibility</Label>
              <RadioGroup
                defaultValue="public"
                value={commentVisibility}
                onValueChange={(value: "public" | "private") => setCommentVisibility(value)}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="r_public" />
                  <Label htmlFor="r_public" className="font-normal flex items-center"><GlobeIcon className="mr-1.5 h-4 w-4"/>Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="r_private" />
                  <Label htmlFor="r_private" className="font-normal flex items-center"><LockIcon className="mr-1.5 h-4 w-4"/>Private (Team/Admin)</Label>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={handlePostComment} className="w-full sm:w-auto">
              <SendIcon className="mr-2 h-4 w-4" /> Post Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Comment Feed</CardTitle>
          <CardDescription>Latest comments related to the project.</CardDescription>
        </CardHeader>
        <CardContent>
          {projectComments.length > 0 ? (
            <ul className="space-y-4">
              {projectComments.map((comment) => (
                <li key={comment.id} className="flex items-start space-x-3 p-4 bg-card border rounded-lg shadow-sm">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} data-ai-hint={comment.dataAiHint}/>
                    <AvatarFallback>{comment.userName.substring(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground text-sm">{comment.userName}</p>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 whitespace-pre-wrap">{comment.text}</p>
                    {comment.isPrivate && (
                      <Badge variant="secondary" className="mt-1.5 text-xs">
                        <LockIcon className="mr-1 h-3 w-3"/> Private
                      </Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No comments yet for this project.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

