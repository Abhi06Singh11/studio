
"use client";

import * as React from "react";
import { useRouter, useParams } from 'next/navigation'; // Added useParams
import Link from 'next/link'; // Added Link
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircleIcon, ArrowLeftIcon, CheckSquareIcon, UsersIcon, ListIcon, ActivityIcon, Edit3Icon, TicketIcon, SearchIcon, UserPlusIcon } from "lucide-react"; // Added UserPlusIcon
import CreateTicketModal from "../tickets/CreateTicketModal"; 
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dummy Data for a specific project and its tickets
const sampleProjectDetailsStore: { [key: string]: any } = {
  "prj_marketing_revamp": {
    id: "prj_marketing_revamp",
    name: "Marketing Website Revamp",
    description: "Complete overhaul of the main marketing website, focusing on UI/UX improvements, new branding, and performance optimization.",
    status: "Active",
    priority: "High",
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
    priority: "Medium",
    createdBy: "user_marcus_chen_id",
    teamMembers: [
      { id: "user2", name: "Marcus Chen", avatarUrl: "https://placehold.co/40x40.png?p=2", dataAiHint: "developer man" },
      { id: "user3", name: "Aisha Khan", avatarUrl: "https://placehold.co/40x40.png?p=3", dataAiHint: "engineer woman" },
    ],
    createdAt: "2024-05-15T14:30:00Z",
    tags: ["AI", "Backend", "Machine Learning"]
  },
};

const sampleTicketsStore: { [key: string]: any[] } = {
    "prj_marketing_revamp": [
        { ticketId: "tkt1", title: "Fix mobile navbar overlap", type: "Bug", priority: "High", status: "To Do", assignedTo: "Marcus Chen", tags: ["UI", "Mobile"], dueDate: "2024-08-15" },
        { ticketId: "tkt2", title: "Implement new hero section design", type: "Task", priority: "Medium", status: "In Progress", assignedTo: "Dr. Elara Vance", tags: ["UI", "Frontend"], dueDate: "2024-08-20" },
        { ticketId: "tkt3", title: "Add testimonials page", type: "Story", priority: "Low", status: "To Do", assignedTo: "Marcus Chen", tags: ["Content", "Frontend"], dueDate: "2024-09-01" },
    ],
    "prj_ai_engine_dev": [
        { ticketId: "tkt4", title: "Optimize recommendation algorithm", type: "Task", priority: "Critical", status: "In Progress", assignedTo: "Aisha Khan", tags: ["Performance", "AI"], dueDate: "2024-08-10"},
    ]
};

const ticketStatusOptions = ["All", "To Do", "In Progress", "Done"];
const ticketPriorityOptions = ["All", "Critical", "High", "Medium", "Low"];

interface ProjectDetailsClientProps {
  projectId: string;
}

export default function ProjectDetailsClient({ projectId }: ProjectDetailsClientProps) {
  const router = useRouter();
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = React.useState(false);
  const [project, setProject] = React.useState(sampleProjectDetailsStore[projectId]);
  const [tickets, setTickets] = React.useState(sampleTicketsStore[projectId] || []);

  const [ticketSearch, setTicketSearch] = React.useState("");
  const [ticketStatusFilter, setTicketStatusFilter] = React.useState("All");
  const [ticketPriorityFilter, setTicketPriorityFilter] = React.useState("All");
  const [ticketAssigneeFilter, setTicketAssigneeFilter] = React.useState("All");


  React.useEffect(() => {
    setProject(sampleProjectDetailsStore[projectId]);
    setTickets(sampleTicketsStore[projectId] || []);
  }, [projectId]);

  const handleTicketCreated = (newTicketData: any) => {
    console.log("Ticket created (conceptually):", newTicketData);
    setTickets(prev => [newTicketData, ...prev]); 
  };
  
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(ticketSearch.toLowerCase()) || (ticket.tags && ticket.tags.some((tag: string) => tag.toLowerCase().includes(ticketSearch.toLowerCase())));
    const matchesStatus = ticketStatusFilter === "All" || ticket.status === ticketStatusFilter;
    const matchesPriority = ticketPriorityFilter === "All" || ticket.priority === ticketPriorityFilter;
    const matchesAssignee = ticketAssigneeFilter === "All" || ticket.assignedTo === ticketAssigneeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <CheckSquareIcon className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">The project you are looking for (ID: {projectId}) does not exist or could not be loaded.</p>
        <Button onClick={() => router.push('/workplace/projects')}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/workplace/projects')}>
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
                <Badge variant={project.priority === "High" ? "destructive" : project.priority === "Medium" ? "secondary" : "outline"}>Priority: {project.priority}</Badge>
                <Badge variant="outline">Status: {project.status}</Badge>
                {project.tags.map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
             </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="overview"><ListIcon className="mr-2 h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="tickets"><TicketIcon className="mr-2 h-4 w-4"/>Tickets ({filteredTickets.length})</TabsTrigger>
              <TabsTrigger value="board" onClick={() => router.push(`/workplace/projects/${projectId}/board`)}>
                <CheckSquareIcon className="mr-2 h-4 w-4" /> Board
              </TabsTrigger>
              <TabsTrigger value="activity"><ActivityIcon className="mr-2 h-4 w-4"/>Activity Log</TabsTrigger>
            </TabsList>
             <Link href={`/workplace/projects/${projectId}/new-ticket`}>
                <Button>
                    <PlusCircleIcon className="mr-2 h-4 w-4" /> Create New Ticket
                </Button>
            </Link>
          </div>

          <TabsContent value="overview">
            <Card>
              <CardHeader><CardTitle>Project Overview</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Detailed project summary, goals, milestones, and relevant links will be displayed here.</p>
                <h4 className="font-semibold mb-2">Ticket Board Preview (Conceptual)</h4>
                <div className="p-4 border rounded-md bg-muted/50 text-center text-muted-foreground">
                    A Kanban-style board previewing tickets by status (To Do, In Progress, Done) would appear here.
                </div>
                <p className="mt-4 text-sm">Status: <Badge variant={project.status === "Active" ? "default" : "secondary"}>{project.status}</Badge></p>
                <p className="text-sm">Priority: <Badge variant={project.priority === "High" ? "destructive" : project.priority === "Medium" ? "secondary" : "outline"}>{project.priority}</Badge></p>
                <p className="text-sm">Created By: {project.createdBy.replace('_id','').replace(/_/g, ' ')} (Conceptual)</p>
                <p className="text-sm">Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Tickets & Tasks</CardTitle>
                <CardDescription>Manage all tickets associated with this project.</CardDescription>
                  <div className="mt-4 space-y-3">
                     <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search tickets by title or tag..." value={ticketSearch} onChange={(e) => setTicketSearch(e.target.value)} className="pl-8 w-full sm:w-1/2 md:w-1/3"/>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Select value={ticketStatusFilter} onValueChange={setTicketStatusFilter}>
                            <SelectTrigger className="w-auto text-xs h-8"><SelectValue placeholder="Status" /></SelectTrigger>
                            <SelectContent>{ticketStatusOptions.map(opt => <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select value={ticketPriorityFilter} onValueChange={setTicketPriorityFilter}>
                            <SelectTrigger className="w-auto text-xs h-8"><SelectValue placeholder="Priority" /></SelectTrigger>
                            <SelectContent>{ticketPriorityOptions.map(opt => <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>)}</SelectContent>
                        </Select>
                         <Select value={ticketAssigneeFilter} onValueChange={setTicketAssigneeFilter}>
                            <SelectTrigger className="w-auto text-xs h-8"><SelectValue placeholder="Assignee" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All" className="text-xs">All Assignees</SelectItem>
                                {project.teamMembers.map((mem: any) => <SelectItem key={mem.id} value={mem.name} className="text-xs">{mem.name}</SelectItem>)}
                                <SelectItem value="Unassigned" className="text-xs">Unassigned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredTickets.length > 0 ? (
                    <div className="space-y-3">
                    {filteredTickets.map((ticket: any) => (
                        <Link href={`/workplace/tickets/${ticket.ticketId}`} key={ticket.ticketId} className="block">
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="p-3 flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle className="text-sm font-medium">{ticket.title}</CardTitle>
                                        <CardDescription className="text-xs">Type: {ticket.type} | Assignee: {ticket.assignedTo || "Unassigned"}</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant={ticket.priority === "Critical" || ticket.priority === "High" ? "destructive" : ticket.priority === "Medium" ? "secondary" : "outline"} className="text-xs">{ticket.priority}</Badge>
                                        <p className="text-xs text-muted-foreground mt-1">{ticket.status}</p>
                                    </div>
                                </CardHeader>
                                {ticket.dueDate && <CardContent className="p-3 pt-0 text-xs text-muted-foreground">Due: {new Date(ticket.dueDate).toLocaleDateString()}</CardContent>}
                            </Card>
                        </Link>
                    ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">No tickets match your filters, or no tickets created yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader><CardTitle>Activity Log</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A chronological feed of all activities related to this project (e.g., ticket creation, status changes, comments) will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <CreateTicketModal
        isOpen={isCreateTicketModalOpen} // This modal is now triggered by navigating to new-ticket page.
        onOpenChange={setIsCreateTicketModalOpen}
        onTicketCreated={handleTicketCreated}
        projectId={projectId}
        teamMembers={project.teamMembers}
      />
    </>
  );
}
    
