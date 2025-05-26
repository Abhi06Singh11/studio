
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const joinProjectFormSchema = z.object({
  searchQuery: z.string().optional().or(z.literal('')),
  // In a real app, you'd select from a list, but for MVP, we simulate with a direct request.
  // We might just have a project ID or name to request for.
  // For this simplified version, let's just have a search query.
});

type JoinProjectFormValues = z.infer<typeof joinProjectFormSchema>;

// Sample projects that could be joinable
const sampleJoinableProjects = [
    { id: "prj_ai_portfolio", name: "AI Portfolio Builder", org: "Innovatech Solutions", skills: ["React", "Python"], description: "Build a tool to showcase AI projects."},
    { id: "prj_open_analytics", name: "Open Source Analytics", org: "Community Hub", skills: ["JavaScript", "D3.js"], description: "Contribute to a free analytics platform."},
];

interface ModalJoinProjectOrgFormProps {
  onFormSubmit: (data: JoinProjectFormValues) => void; // For now, this will just log and close.
  onCancel: () => void;
}

export default function ModalJoinProjectOrgForm({ onFormSubmit, onCancel }: ModalJoinProjectOrgFormProps) {
  const form = useForm<JoinProjectFormValues>({
    resolver: zodResolver(joinProjectFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const [filteredProjects, setFilteredProjects] = React.useState(sampleJoinableProjects);

  React.useEffect(() => {
    const query = form.watch("searchQuery")?.toLowerCase() || "";
    setFilteredProjects(
      sampleJoinableProjects.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.org.toLowerCase().includes(query) ||
          p.skills.some(s => s.toLowerCase().includes(query))
      )
    );
  }, [form.watch("searchQuery")]);


  function handleRequestToJoin(projectId: string, projectName: string) {
    console.log(`Conceptual: Request to join project "${projectName}" (ID: ${projectId}) sent.`);
    toast({
      title: "Join Request Sent (Conceptual)",
      description: `Your request to join "${projectName}" has been sent.`,
    });
    // In a real app, this would trigger a backend action.
    // For MVP modal, we might just close it or show a success message.
    onCancel(); // Close modal after action
  }
  
  // The main form submission isn't used if actions are per-project card.
  // We'll keep it for the search field if needed.
  function onSubmit(data: JoinProjectFormValues) {
    console.log("Search Query:", data.searchQuery);
    // Typically, search would update the list, not submit the form itself.
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search Projects</FormLabel>
              <FormControl>
                <Input placeholder="Search by name, organization, or skill..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <p className="text-sm text-muted-foreground">Available projects to join:</p>
        <ScrollArea className="h-[250px] border rounded-md p-2">
            {filteredProjects.length > 0 ? (
                <div className="space-y-2">
                    {filteredProjects.map(project => (
                        <Card key={project.id}>
                            <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
                                <p className="text-xs text-muted-foreground">From: {project.org}</p>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 text-xs">
                                <p className="line-clamp-2 mb-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.skills.map(skill => <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>)}
                                </div>
                                <Button size="sm" className="w-full mt-2 text-xs" onClick={() => handleRequestToJoin(project.id, project.name)}>
                                    Request to Join
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-4">No projects found matching your search.</p>
            )}
        </ScrollArea>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Close
          </Button>
          {/* No main submit if actions are per card */}
        </div>
      </form>
    </Form>
  );
}
