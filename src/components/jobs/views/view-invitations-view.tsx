
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MailPlusIcon, MoreHorizontalIcon, PlusCircleIcon, SearchIcon, Trash2Icon, EyeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProjectInvitation {
  id: string;
  projectTitle: string;
  roleNeeded: string;
  status: "Pending" | "Accepted" | "Declined" | "Cancelled";
  invitedOn: string; // Date string
  inviteeEmail?: string; // For tracking who was invited
}

const sampleInvitations: ProjectInvitation[] = [
  { id: "inv1", projectTitle: "AI Resume Screening Tool", roleNeeded: "Backend Developer", status: "Pending", invitedOn: "2024-05-28", inviteeEmail: "dev1@example.com" },
  { id: "inv2", projectTitle: "Dev Portfolio Builder", roleNeeded: "UI/UX Designer", status: "Accepted", invitedOn: "2024-05-25", inviteeEmail: "designer.pro@example.com" },
  { id: "inv3", projectTitle: "E-commerce Platform Revamp", roleNeeded: "Frontend Lead", status: "Declined", invitedOn: "2024-05-20", inviteeEmail: "lead.dev@example.com" },
  { id: "inv4", projectTitle: "AI Resume Screening Tool", roleNeeded: "Data Scientist", status: "Pending", invitedOn: "2024-05-29", inviteeEmail: "data.wiz@example.com" },
];

export default function ViewInvitationsView() {
  const [searchTerm, setSearchTerm] = React.useState("");
  // In a real app, invitations would be fetched and managed with state
  const [invitations, setInvitations] = React.useState(sampleInvitations);

  const filteredInvitations = invitations.filter(inv =>
    inv.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.roleNeeded.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.inviteeEmail && inv.inviteeEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
    inv.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Conceptual actions
  const handleCancelInvitation = (invitationId: string) => {
     setInvitations(invitations.map(inv => inv.id === invitationId ? {...inv, status: "Cancelled"} : inv).filter(inv => inv.status !== "Cancelled" || inv.id !== invitationId)); // Or just update status
    console.log("Cancel invitation:", invitationId);
  };
  const handleViewTeam = (projectId: string) => console.log("View team for project related to invite:", projectId);


  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            <MailPlusIcon className="mr-2 h-6 w-6 text-primary" /> View Project Invitations
          </CardTitle>
          <CardDescription>Manage invitations you've sent for your projects. (For all users)</CardDescription>
        </div>
        {/* <Button> <PlusCircleIcon className="mr-2 h-4 w-4"/> Create New Invitation </Button> */}
      </div>
      
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
            placeholder="Search by project, role, email, status..." 
            className="pl-8 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="overflow-auto flex-grow">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Role Needed</TableHead>
                  <TableHead>Invited Email</TableHead>
                  <TableHead>Sent On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvitations.length > 0 ? filteredInvitations.map((inv) => (
                  <TableRow key={inv.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{inv.projectTitle}</TableCell>
                    <TableCell>{inv.roleNeeded}</TableCell>
                    <TableCell>{inv.inviteeEmail || 'N/A'}</TableCell>
                    <TableCell>{inv.invitedOn}</TableCell>
                    <TableCell>
                      <Badge variant={
                        inv.status === "Pending" ? "secondary" : 
                        inv.status === "Accepted" ? "default" : 
                        "destructive" // For Declined/Cancelled
                      }>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Invitation Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           {inv.status === "Accepted" && (
                            <DropdownMenuItem onSelect={() => handleViewTeam(inv.id)}>
                                <EyeIcon className="mr-2 h-4 w-4"/> View Team
                            </DropdownMenuItem>
                           )}
                          {inv.status === "Pending" && (
                            <DropdownMenuItem onSelect={() => handleCancelInvitation(inv.id)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <Trash2Icon className="mr-2 h-4 w-4"/> Cancel Invitation
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No invitations found matching your search, or no invitations sent yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
