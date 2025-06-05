
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircleIcon, FilterIcon, SearchIcon, CheckSquareIcon, ArrowRightIcon } from "lucide-react";
import CreateProjectModal from "./CreateProjectModal"; 

const sampleProjects = [
  { projectId: "prj_marketing_revamp", title: "Marketing Website Revamp", status: "Active", priority: "High", progress: 75, lastUpdated: "2 days ago", owner: "Dr. Elara Vance", tags: ["UI/UX", "Frontend"] },
  { projectId: "prj_ai_engine_dev", title: "AI Engine Development", status: "Active", priority: "Medium", progress: 40, lastUpdated: "5 hours ago", owner: "Marcus Chen", tags: ["AI", "Backend"] },
  { projectId: "prj_mobile_mvp", title: "Mobile App MVP", status: "Archived", priority: "Low", progress: 100, lastUpdated: "1 month ago", owner: "Aisha Khan", tags: ["Mobile", "MVP"] },
  { projectId: "prj_docs_portal", title: "Documentation Portal", status: "Active", priority: "Medium", progress: 15, lastUpdated: "Yesterday", owner: "Dr. Elara Vance", tags: ["Docs", "Content"] },
];

type ProjectStatus = "Active" | "Archived" | "All";
const projectStatuses: ProjectStatus[] = ["All", "Active", "Archived"];
const sampleOwners = ["All", "Dr. Elara Vance", "Marcus Chen", "Aisha Khan"]; // Conceptual

export default function ProjectDashboardClient() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<ProjectStatus>("All");
  const [ownerFilter, setOwnerFilter] = React.useState("All");
  
  const [projects, setProjects] = React.useState(sampleProjects);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    const matchesOwner = ownerFilter === "All" || project.owner === ownerFilter;
    return matchesSearch && matchesStatus && matchesOwner;
  });

  const handleProjectCreated = (newProjectData: any) => {
    console.log("Project created (conceptually):", newProjectData);
    // Add to local state for demo purposes
    setProjects(prev => [{ ...newProjectData, projectId: newProjectData.id, owner: "Current User" /* placeholder */, progress: 0, lastUpdated: "Just now", tags: newProjectData.tags || [] }, ...prev]);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <CheckSquareIcon className="mr-3 h-8 w-8 text-primary" />
              Projects Dashboard (Mini Jira)
            </h1>
            <p className="text-muted-foreground">Manage and track all your team's projects.</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Create New Project
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine the list of projects below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by name or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-background"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProjectStatus)}>
                <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
                <SelectContent>{projectStatuses.map(opt => <SelectItem key={opt} value={opt}>{opt} Status</SelectItem>)}</SelectContent>
              </Select>
              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger><SelectValue placeholder="Filter by owner" /></SelectTrigger>
                <SelectContent>{sampleOwners.map(opt => <SelectItem key={opt} value={opt}>{opt === "All" ? "All Owners" : opt}</SelectItem>)}</SelectContent>
              </Select>
               <Button variant="outline" disabled><FilterIcon className="mr-2 h-4 w-4"/>Filter by Tags (NYI)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden md:table-cell">Progress</TableHead>
                  <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length > 0 ? filteredProjects.map((project) => (
                  <TableRow key={project.projectId}>
                    <TableCell className="font-medium">
                      <Link href={`/workplace/projects/${project.projectId}`} className="hover:underline text-primary">
                        {project.title}
                      </Link>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {project.tags.join(', ')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.priority === "High" ? "destructive" : project.priority === "Medium" ? "secondary" : "outline"}>
                        {project.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{project.progress}%</TableCell>
                    <TableCell className="hidden sm:table-cell">{project.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/workplace/projects/${project.projectId}`}>
                          View <ArrowRightIcon className="ml-2 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No projects found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onProjectCreated={handleProjectCreated}
      />
    </>
  );
}
    
