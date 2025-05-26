
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BriefcaseIcon, MoreHorizontalIcon, PlusCircleIcon, SearchIcon, Edit3Icon, Trash2Icon, RotateCwIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PostedJob {
  id: string;
  title: string;
  type: string; // Full-time, Part-time, etc.
  postedOn: string; // Date string
  status: "Active" | "Expired" | "Closed";
  applicants?: number; // Conceptual
}

const samplePostedJobs: PostedJob[] = [
  { id: "job1", title: "Senior Frontend Developer", type: "Full-time", postedOn: "2024-05-15", status: "Active", applicants: 25 },
  { id: "job2", title: "Backend Developer Intern", type: "Internship", postedOn: "2024-05-01", status: "Expired", applicants: 150 },
  { id: "job3", title: "UX/UI Designer (Contract)", type: "Contract", postedOn: "2024-04-20", status: "Closed", applicants: 42 },
  { id: "job4", title: "AI/ML Research Scientist", type: "Full-time", postedOn: "2024-05-20", status: "Active", applicants: 10 },
];

export default function ViewPostedJobsView() {
  const [searchTerm, setSearchTerm] = React.useState("");
  // In a real app, jobs would be fetched and managed with state
  const [jobs, setJobs] = React.useState(samplePostedJobs);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Conceptual actions
  const handleEditJob = (jobId: string) => console.log("Edit job:", jobId);
  const handleCloseJob = (jobId: string) => {
    setJobs(jobs.map(job => job.id === jobId ? {...job, status: "Closed"} : job));
    console.log("Close job:", jobId);
  };
  const handleRepostJob = (jobId: string) => console.log("Repost job:", jobId);


  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            <BriefcaseIcon className="mr-2 h-6 w-6 text-primary" /> View Posted Jobs
          </CardTitle>
          <CardDescription>Manage jobs posted by your company. (For Company use only)</CardDescription>
        </div>
         {/* <Button> <PlusCircleIcon className="mr-2 h-4 w-4"/> Create New Job Posting </Button> */}
      </div>
      
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
            placeholder="Search by title, type, status..." 
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
                  <TableHead>Job Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Posted On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{job.title}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>{job.postedOn}</TableCell>
                    <TableCell>
                      <Badge variant={
                        job.status === "Active" ? "default" : 
                        job.status === "Expired" ? "secondary" : 
                        "outline" // For Closed
                      }>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.applicants ?? 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Job Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => handleEditJob(job.id)} disabled={job.status !== "Active"}>
                            <Edit3Icon className="mr-2 h-4 w-4"/> Edit
                          </DropdownMenuItem>
                          {job.status === "Active" && (
                            <DropdownMenuItem onSelect={() => handleCloseJob(job.id)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <Trash2Icon className="mr-2 h-4 w-4"/> Close Job
                            </DropdownMenuItem>
                          )}
                          {job.status === "Expired" && (
                             <DropdownMenuItem onSelect={() => handleRepostJob(job.id)}>
                                <RotateCwIcon className="mr-2 h-4 w-4"/> Repost
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No jobs found matching your search, or no jobs posted yet.
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
