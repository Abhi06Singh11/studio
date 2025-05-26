
// src/components/project/views/join-project-org-view.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ListChecksIcon, UsersIcon, SearchIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Sample data for joinable projects - in a real app, this would be fetched based on search/filters
const sampleJoinableOrgProjects = [
  { id: "prj_org_alpha", name: "Alpha Initiative (Innovatech)", description: "Next-gen AI research project.", tags: ["AI", "Research", "Python"], org: "Innovatech Solutions" },
  { id: "prj_org_beta", name: "Beta Platform (GreenFuture)", description: "Sustainable energy platform development.", tags: ["GreenTech", "React", "Node.js"], org: "GreenFuture 🌱" },
  { id: "prj_org_gamma", name: "Gamma Mobile App (Innovatech)", description: "Companion mobile app for Innovatech suite.", tags: ["Mobile", "React Native"], org: "Innovatech Solutions" },
];

const joinProjectOrgFormSchema = z.object({
  searchQuery: z.string().optional().or(z.literal('')),
  skillFilter: z.string().optional().or(z.literal('')),
});

type JoinProjectOrgFormValues = z.infer<typeof joinProjectOrgFormSchema>;

export default function JoinProjectOrgView() {
  const form = useForm<JoinProjectOrgFormValues>({
    resolver: zodResolver(joinProjectOrgFormSchema),
    defaultValues: {
      searchQuery: "",
      skillFilter: "",
    },
  });

  const [filteredProjects, setFilteredProjects] = React.useState(sampleJoinableOrgProjects);

  React.useEffect(() => {
    const query = form.watch("searchQuery")?.toLowerCase() || "";
    const skill = form.watch("skillFilter")?.toLowerCase() || "";
    setFilteredProjects(
      sampleJoinableOrgProjects.filter(
        (p) =>
          (p.name.toLowerCase().includes(query) || p.org.toLowerCase().includes(query)) &&
          (skill === "" || p.tags.some(tag => tag.toLowerCase().includes(skill)))
      )
    );
  }, [form.watch("searchQuery"), form.watch("skillFilter")]);


  function handleRequestToJoin(projectId: string, projectName: string) {
    console.log(`Conceptual: Request to join project "${projectName}" (ID: ${projectId}) sent.`);
    toast({
      title: "Join Request Sent (Conceptual)",
      description: `Your request to join "${projectName}" has been sent.`,
    });
  }
  
  function onSubmit(data: JoinProjectOrgFormValues) {
    // Search/filter is handled by useEffect, submit is not strictly necessary for this view
    console.log("Search/Filter Submitted (View):", data);
  }

  return (
    <Card className="h-full flex flex-col shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <ListChecksIcon className="mr-2 h-6 w-6 text-primary" /> Join an Existing Project
        </CardTitle>
        <CardDescription>
          Discover and request to join ongoing projects within organizations.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="searchQuery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><SearchIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Search Projects</FormLabel>
                      <FormControl>
                        <Input placeholder="Search by project name or organization..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="skillFilter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><SearchIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Filter by Skill</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., React, Python, Design" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-3 pt-4">
                <h3 className="text-md font-semibold text-muted-foreground">Available Projects:</h3>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map(project => (
                    <Card key={project.id} className="shadow-sm">
                      <CardHeader className="pb-2 pt-3">
                        <CardTitle className="text-base">{project.name}</CardTitle>
                        <CardDescription>From: {project.org}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-xs pb-3 space-y-1">
                        <p className="line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {project.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 border-t">
                        <Button size="sm" className="w-full" onClick={() => handleRequestToJoin(project.id, project.name)}>
                          <UsersIcon className="mr-2 h-4 w-4"/> Request to Join
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-6">
                    No projects found matching your criteria.
                  </p>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
