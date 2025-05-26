
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast";

// Sample data for user's organizations - in a real app, this would be fetched
const sampleUserOrgs = [
  { id: "org_123", name: "Innovatech Solutions" },
  { id: "org_456", name: "GreenFuture 🌱" },
  { id: "org_personal_workspace", name: "My Personal Workspace" },
];

const projectVisibilityOptions = ["Public", "Private to Organization", "Private to Me"] as const;

const createProjectFormSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  organizationId: z.string({ required_error: "Please select an organization." }),
  description: z.string().max(500, "Description too long.").optional().or(z.literal('')),
  requiredSkills: z.string().optional().or(z.literal('')), // Comma-separated
  visibility: z.enum(projectVisibilityOptions, { required_error: "Please select visibility."}),
});

type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;

interface ModalCreateProjectInOrgFormProps {
  onFormSubmit: (data: CreateProjectFormValues) => void;
  onCancel: () => void;
}

export default function ModalCreateProjectInOrgForm({ onFormSubmit, onCancel }: ModalCreateProjectInOrgFormProps) {
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      projectName: "",
      description: "",
      requiredSkills: "",
      visibility: "Private to Organization",
    },
  });

  function onSubmit(data: CreateProjectFormValues) {
    const submissionData = {
        ...data,
        requiredSkills: data.requiredSkills?.split(',').map(s => s.trim()).filter(Boolean) || [],
    };
    console.log("Modal Create Project in Org Data:", submissionData);
    toast({
      title: "Project Creation (Conceptual)",
      description: `Project "${submissionData.projectName}" ready to be created.`,
    });
    onFormSubmit(submissionData);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI Portfolio Builder" {...field} />
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
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Short goal summary..." {...field} />
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
                <Input placeholder="e.g., React, Node.js, Python" {...field} />
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
                  {projectVisibilityOptions.map(option => (
                     <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </form>
    </Form>
  );
}
