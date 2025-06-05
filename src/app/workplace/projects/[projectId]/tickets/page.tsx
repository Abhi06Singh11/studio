
"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeftIcon, TicketIcon, SearchIcon, PlusCircleIcon } from "lucide-react";

// Sample data for demonstration
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
const sampleProjectDetailsStore: { [key: string]: any } = {
  "prj_marketing_revamp": { name: "Marketing Website Revamp", teamMembers: [{id: "user1", name: "Dr. Elara Vance"}, {id: "user2", name: "Marcus Chen"}]},
  "prj_ai_engine_dev": { name: "AI Engine Development", teamMembers: [{id: "user2", name: "Marcus Chen"}, {id: "user3", name: "Aisha Khan"}]},
};

const ticketStatusOptions = ["All", "To Do", "In Progress", "Done"];
const ticketPriorityOptions = ["All", "Critical", "High", "Medium", "Low"];

export default function AllTicketsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const project = sampleProjectDetailsStore[projectId];
  const allTicketsForProject = sampleTicketsStore[projectId] || [];

  const [ticketSearch, setTicketSearch] = React.useState("");
  const [ticketStatusFilter, setTicketStatusFilter] = React.useState("All");
  const [ticketPriorityFilter, setTicketPriorityFilter] = React.useState("All");
  const [ticketAssigneeFilter, setTicketAssigneeFilter] = React.useState("All");

  const filteredTickets = allTicketsForProject.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(ticketSearch.toLowerCase()) || (ticket.tags && ticket.tags.some((tag: string) => tag.toLowerCase().includes(ticketSearch.toLowerCase())));
    const matchesStatus = ticketStatusFilter === "All" || ticket.status === ticketStatusFilter;
    const matchesPriority = ticketPriorityFilter === "All" || ticket.priority === ticketPriorityFilter;
    const matchesAssignee = ticketAssigneeFilter === "All" || ticket.assignedTo === ticketAssigneeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  if (!project) {
    return (
      <div className="p-4 md:p-8 text-center">
        <p className="text-lg text-muted-foreground">Project not found.</p>
        <Button onClick={() => router.push('/workplace/projects')} className="mt-4">
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="outline" size="sm" onClick={() => router.push(`/workplace/projects/${projectId}`)} className="mb-2">
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Project Overview
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <TicketIcon className="mr-3 h-7 w-7 text-primary" />
            All Tickets for: {project.name}
          </h1>
          <p className="text-muted-foreground">View and manage all tickets associated with this project.</p>
        </div>
        <Link href={`/workplace/projects/${projectId}/new-ticket`}>
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Create New Ticket
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.ticketId}>
                    <TableCell className="font-medium">{ticket.title}</TableCell>
                    <TableCell>{ticket.type}</TableCell>
                    <TableCell>
                        <Badge variant={ticket.priority === "Critical" || ticket.priority === "High" ? "destructive" : ticket.priority === "Medium" ? "secondary" : "outline"} className="text-xs">{ticket.priority}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={ticket.status === "Done" ? "default" : ticket.status === "In Progress" ? "secondary" : "outline" } className="text-xs">{ticket.status}</Badge>
                    </TableCell>
                    <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                    <TableCell>{ticket.dueDate ? new Date(ticket.dueDate).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/workplace/tickets/${ticket.ticketId}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No tickets found matching your criteria for this project.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

