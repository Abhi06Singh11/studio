
// src/app/organizations/[orgId]/projects/create/page.tsx
"use client";

import * as React from "react";
import { useParams, useRouter }
from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlusIcon, ArrowLeftIcon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const projectFormSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters." }).max(100, { message: "Project name must be at most 100 characters." }),
  description: z.string().max(1000, { message: "Description must be at most 1000 characters." }).optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const sampleOrganizationNames: { [key: string]: string } = {
  "org_123": "Innovatech Solutions",
  "org_456": "GreenFuture 🌱",
};


export default function CreateOrganizationProjectPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.orgId as string;
  
  const organizationName = sampleOrganizationNames[orgId] || `Organization ${orgId.substring(orgId.length - 3)}`;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: ProjectFormValues) {
    const newProjectData = {
      orgId: orgId,
      name: data.name,
      description: data.description,
      createdBy: "current_user_uid_placeholder", 
      createdAt: new Date().toISOString(),
      status: "active",
    };

    console.log(`Conceptual Firestore: Create document in /organizations/${orgId}/projects:`, newProjectData);
    toast({
      title: "Project Created (Conceptually)!",
      description: `Project "${data.name}" has been added to ${organizationName}.`,
    });
    form.reset();
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><FolderPlusIcon className="mr-2 h-6 w-6 text-primary"/>Create New Project for {organizationName}</CardTitle>
          <CardDescription>Define the details for your new project within this organization.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Q4 Marketing Campaign" {...field} />
                    </FormControl>
                    <FormDescription>A clear and concise name for your project.</FormDescription>
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
                        placeholder="Describe the goals, scope, and objectives of this project..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                <FolderPlusIcon className="mr-2 h-4 w-4" /> Create Project
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
