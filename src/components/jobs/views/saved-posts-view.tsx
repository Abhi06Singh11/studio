
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, BriefcaseIcon, FolderKanbanIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";

interface SavedItem {
  id: string;
  type: "Job" | "Project";
  title: string;
  sourceOrCompany: string; // e.g., Company name for Job, Project Lead for Project
  savedOn: string; // Date string
  status?: string; // e.g., "Active", "Accepting Applications"
}

const sampleSavedJobs: SavedItem[] = [
  { id: "sj1", type: "Job", title: "ML Engineer @ AIFlow", sourceOrCompany: "AIFlow Inc.", savedOn: "2024-05-12", status: "Active" },
  { id: "sj2", type: "Job", title: "Full-Stack Developer (Remote)", sourceOrCompany: "Innovatech", savedOn: "2024-05-10", status: "Active" },
  { id: "sj3", type: "Job", title: "DevOps Lead", sourceOrCompany: "CloudWays", savedOn: "2024-04-28", status: "Closed" },
];

const sampleSavedProjects: SavedItem[] = [
  { id: "sp1", type: "Project", title: "Dev Portfolio Builder", sourceOrCompany: "Elara Vance", savedOn: "2024-05-18", status: "Seeking Collaborators" },
  { id: "sp2", type: "Project", title: "Open Source Analytics Tool", sourceOrCompany: "Community Hub", savedOn: "2024-05-05", status: "Active Development" },
];

interface SavedPostsViewProps {
    defaultTab?: "saved-jobs" | "saved-projects";
}

export default function SavedPostsView({ defaultTab = "saved-jobs"}: SavedPostsViewProps) {

  const renderItemsTable = (items: SavedItem[], itemType: "Job" | "Project") => (
    items.length > 0 ? (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>{itemType === "Job" ? "Company" : "Lead/Source"}</TableHead>
                <TableHead>Saved On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-foreground">{item.title}</TableCell>
                <TableCell>{item.sourceOrCompany}</TableCell>
                <TableCell>{item.savedOn}</TableCell>
                <TableCell>
                    {item.status && <Badge variant="outline">{item.status}</Badge>}
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                    {itemType === "Job" ? "View & Apply" : "View Details"}
                    <ExternalLinkIcon className="ml-2 h-3.5 w-3.5" />
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        ) : (
        <p className="p-6 text-center text-muted-foreground">No {itemType.toLowerCase()}s saved yet.</p>
        )
  );


  return (
    <div className="space-y-6 h-full flex flex-col">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <BookmarkIcon className="mr-2 h-6 w-6 text-primary" /> Saved Posts
        </CardTitle>
        <CardDescription>Manage jobs and projects you've saved for later.</CardDescription>
      </CardHeader>
      
      <Tabs defaultValue={defaultTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-4 sticky top-0 bg-background z-10 py-2 shadow-sm">
          <TabsTrigger value="saved-jobs" className="flex items-center gap-2"><BriefcaseIcon className="h-4 w-4"/>Saved Jobs</TabsTrigger>
          <TabsTrigger value="saved-projects" className="flex items-center gap-2"><FolderKanbanIcon className="h-4 w-4"/>Saved Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved-jobs" className="flex-1 overflow-hidden">
          <Card className="h-full">
            <CardContent className="p-0 h-full overflow-y-auto">
              {renderItemsTable(sampleSavedJobs, "Job")}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved-projects" className="flex-1 overflow-hidden">
          <Card className="h-full">
            <CardContent className="p-0 h-full overflow-y-auto">
              {renderItemsTable(sampleSavedProjects, "Project")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
