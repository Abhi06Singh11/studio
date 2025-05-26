
// src/components/project/views/create-project-org-view.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { FolderPlusIcon, UsersIcon, LockIcon, GlobeIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data for user's organizations - in a real app, this would be fetched
const sampleUserOrgs = [
  { id: "org_123", name: "Innovatech Solutions" },
  { id: "org_456", name: "GreenFuture 🌱" },
  { id: "org_personal_workspace", name: "My Personal Workspace" }, // Assuming a personal workspace is an option
];

const projectVisibilityOptions = ["Public to Platform", "Private to Organization", "Private to Me"] as const;

const createProjectInOrgFormSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  organizationId: z.string({ required_error: "Please select an organization." }),
  description: z.string().max(1000, "Description too long.").optional().or(z.literal('')),
  requiredSkills: z.string().optional().or(z.literal('')), // Comma-separated
  visibility: z.enum(projectVisibilityOptions, { required_error: "Please select visibility." }),
});

type CreateProjectInOrgFormValues = z.infer<typeof createProjectInOrgFormSchema>;

export default function CreateProjectInOrgView() {
  const form = useForm<CreateProjectInOrgFormValues>({
    resolver: zodResolver(createProjectInOrgFormSchema),
    defaultValues: {
      projectName: "",
      organizationId: undefined,
      description: "",
      requiredSkills: "",
      visibility: "Private to Organization",
    },
  });

  function onSubmit(data: CreateProjectInOrgFormValues) {
    const submissionData = {
        ...data,
        requiredSkills: data.requiredSkills?.split(',').map(s => s.trim()).filter(Boolean) || [],
        createdBy: "current_user_uid_placeholder",
        createdAt: new Date().toISOString(),
        status: "active",
    };
    console.log("Create Project In Org Data (View):", submissionData);
    toast({
      title: "Project Creation (Conceptual)",
      description: `Project "${submissionData.projectName}" in organization ID "${submissionData.organizationId}" is ready to be created.`,
    });
    form.reset();
    // In a real app, navigate to the new project page or 'My Projects' view
  }

  return (
    <Card className="h-full flex flex-col shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FolderPlusIcon className="mr-2 h-6 w-6 text-primary" /> Create New Project in Organization
        </CardTitle>
        <CardDescription>
          Define the details for your new project within a selected organization.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Q4 Marketing Campaign Site" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organizationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Belongs To (Organization)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sampleUserOrgs.map(org => (
                          <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe the project's goals, scope, and objectives..."
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requiredSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Skills (Optional, comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., React, Node.js, Figma, Project Management" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Project Visibility</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="Public to Platform" /></FormControl>
                          <FormLabel className="font-normal flex items-center"><GlobeIcon className="mr-2 h-4 w-4 text-green-500"/>Public to Platform</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="Private to Organization" /></FormControl>
                          <FormLabel className="font-normal flex items-center"><UsersIcon className="mr-2 h-4 w-4 text-blue-500"/>Private to Organization Members</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="Private to Me" /></FormControl>
                          <FormLabel className="font-normal flex items-center"><LockIcon className="mr-2 h-4 w-4 text-red-500"/>Private to Me Only</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>Control who can see this project.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="px-0 pt-6">
                <Button type="submit" size="lg">
                  <FolderPlusIcon className="mr-2 h-5 w-5" /> Create Project
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
