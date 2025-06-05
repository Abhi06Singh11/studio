
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftIcon, TicketIcon, UserIcon, TagIcon, CalendarIcon, PaperclipIcon, MessageSquareIcon, Edit3Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Dummy Data for a specific ticket - this would be fetched
const sampleTicketDetailsStore: { [key: string]: any } = {
  "tkt1": {
    ticketId: "tkt1",
    projectId: "prj_marketing_revamp",
    projectTitle: "Marketing Website Revamp",
    title: "Fix mobile navbar overlap",
    description: "The main navigation bar on mobile devices overlaps with the hero section content, making it difficult to read. This occurs on screen widths below 768px. Need to adjust z-index or padding.",
    type: "Bug",
    priority: "High",
    status: "To Do",
    assignedTo: { id: "user2", name: "Marcus Chen", avatarUrl: "https://placehold.co/40x40.png?p=2" },
    createdBy: { id: "user1", name: "Dr. Elara Vance", avatarUrl: "https://placehold.co/40x40.png?p=1" },
    dueDate: "2024-08-15",
    tags: ["UI", "Mobile", "Navbar", "CSS"],
    attachments: [
      { id: "att1", name: "mobile_overlap_screenshot.png", url: "#", type: "image" },
      { id: "att2", name: "style_guide_v1.2.pdf", url: "#", type: "document" }
    ],
    comments: [
      { id: "cmt1", user: { name: "Dr. Elara Vance", avatarUrl: "https://placehold.co/40x40.png?p=1" }, text: "Thanks for reporting, Marcus. Please prioritize this.", timestamp: "3 hours ago" },
      { id: "cmt2", user: { name: "Marcus Chen", avatarUrl: "https://placehold.co/40x40.png?p=2" }, text: "Will look into it first thing tomorrow.", timestamp: "2 hours ago" },
    ],
    createdAt: "2024-07-28T10:00:00Z",
    updatedAt: "2024-07-28T12:30:00Z",
  },
  "tkt4": {
    ticketId: "tkt4",
    projectId: "prj_ai_engine_dev",
    projectTitle: "AI Engine Development",
    title: "Optimize recommendation algorithm",
    description: "The current recommendation algorithm is experiencing high latency under load. Need to investigate and implement optimizations. Consider caching strategies and query improvements.",
    type: "Task",
    priority: "Critical",
    status: "In Progress",
    assignedTo: { id: "user3", name: "Aisha Khan", avatarUrl: "https://placehold.co/40x40.png?p=3" },
    createdBy: { id: "user2", name: "Marcus Chen", avatarUrl: "https://placehold.co/40x40.png?p=2" },
    dueDate: "2024-08-10",
    tags: ["Performance", "AI", "Optimization", "Backend"],
    attachments: [],
    comments: [],
    createdAt: "2024-07-25T11:00:00Z",
    updatedAt: "2024-07-26T11:00:00Z",
  }
};

const ticketStatuses = ["To Do", "In Progress", "Done"] as const;

interface TicketDetailsClientProps {
  ticketId: string;
}

export default function TicketDetailsClient({ ticketId }: TicketDetailsClientProps) {
  const router = useRouter();
  const [ticket, setTicket] = React.useState(sampleTicketDetailsStore[ticketId]);
  const [newComment, setNewComment] = React.useState("");

  React.useEffect(() => {
    setTicket(sampleTicketDetailsStore[ticketId]);
  }, [ticketId]);

  const handleStatusUpdate = (newStatus: typeof ticketStatuses[number]) => {
    setTicket((prev: any) => ({ ...prev, status: newStatus, updatedAt: new Date().toISOString() }));
    toast({ title: "Status Updated", description: `Ticket status changed to ${newStatus}.` });
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: `cmt_${Date.now()}`,
      user: { name: "Current User", avatarUrl: "https://placehold.co/40x40.png?u=curr" }, // Placeholder
      text: newComment,
      timestamp: "Just now",
    };
    setTicket((prev: any) => ({ ...prev, comments: [...prev.comments, comment] }));
    setNewComment("");
    toast({ title: "Comment Posted" });
  };

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <TicketIcon className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Ticket Not Found</h2>
        <p className="text-muted-foreground mb-6">The ticket you are looking for (ID: {ticketId}) does not exist or could not be loaded.</p>
        <Button onClick={() => router.back()}> 
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.push(`/workplace/projects/${ticket.projectId}?tab=tickets`)}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Project Tickets
        </Button>
        <Button variant="outline" size="sm" disabled>
            <Edit3Icon className="mr-2 h-4 w-4"/> Edit Ticket (NYI)
        </Button>
      </div>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href={`/workplace/projects/${ticket.projectId}`} className="hover:underline text-primary">{ticket.projectTitle}</Link>
            <span>/</span>
            <span>Ticket #{ticket.ticketId}</span>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold flex items-center">
            <TicketIcon className="mr-3 h-7 w-7 text-primary flex-shrink-0" />
            {ticket.title}
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant={ticket.priority === "Critical" || ticket.priority === "High" ? "destructive" : ticket.priority === "Medium" ? "secondary" : "outline"}>Priority: {ticket.priority}</Badge>
            <Badge variant="secondary">Type: {ticket.type}</Badge>
            {ticket.tags.map((tag: string) => <Badge key={tag} variant="outline">{tag}</Badge>)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{ticket.description || "No description provided."}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <strong>Assignee:</strong>
                  {ticket.assignedTo ? (
                    <div className="flex items-center ml-2">
                      <Avatar className="h-6 w-6 mr-1.5"><AvatarImage src={ticket.assignedTo.avatarUrl} /><AvatarFallback>{ticket.assignedTo.name.substring(0,1)}</AvatarFallback></Avatar>
                      {ticket.assignedTo.name}
                    </div>
                  ) : <span className="ml-1 text-muted-foreground">Unassigned</span>}
                </div>
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <strong>Reporter:</strong>
                  <div className="flex items-center ml-2">
                      <Avatar className="h-6 w-6 mr-1.5"><AvatarImage src={ticket.createdBy.avatarUrl} /><AvatarFallback>{ticket.createdBy.name.substring(0,1)}</AvatarFallback></Avatar>
                      {ticket.createdBy.name}
                    </div>
                </div>
                {ticket.dueDate && (
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <strong>Due Date:</strong>
                    <span className="ml-1">{new Date(ticket.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
                 <div className="flex items-center">
                    <strong>Status:</strong>
                     <Select value={ticket.status} onValueChange={(value) => handleStatusUpdate(value as typeof ticketStatuses[number])}>
                        <SelectTrigger className="ml-2 h-8 text-xs w-auto">
                            <SelectValue placeholder="Set status" />
                        </SelectTrigger>
                        <SelectContent>
                            {ticketStatuses.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <p className="text-xs text-muted-foreground">Created: {new Date(ticket.createdAt).toLocaleString()}</p>
                 <p className="text-xs text-muted-foreground">Updated: {new Date(ticket.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="mt-6">
              <Separator className="my-4"/>
              <h3 className="text-lg font-semibold mb-2 flex items-center"><PaperclipIcon className="h-5 w-5 mr-2 text-muted-foreground"/>Attachments</h3>
              <ul className="space-y-1 list-disc list-inside">
                {ticket.attachments.map((att: any) => (
                  <li key={att.id} className="text-sm">
                    <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{att.name} ({att.type})</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center"><MessageSquareIcon className="h-5 w-5 mr-2 text-muted-foreground"/>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ticket.comments.map((comment: any) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user.avatarUrl} />
                  <AvatarFallback>{comment.user.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div className="bg-muted/50 p-3 rounded-lg flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold">{comment.user.name}</span>
                    <span className="text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <Label htmlFor="newComment" className="font-semibold">Add a comment</Label>
            <Textarea
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              className="min-h-[80px]"
            />
            <Button onClick={handlePostComment} disabled={!newComment.trim()}>Post Comment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

