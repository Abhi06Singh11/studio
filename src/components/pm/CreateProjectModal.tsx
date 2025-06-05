
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "@/hooks/use-toast";
import { PlusCircleIcon, UserPlusIcon, TagIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const projectStatuses = ["Active", "Archived"] as const;

const createProjectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters.").max(100),
  description: z.string().max(1000, "Description can be up to 1000 characters.").optional().or(z.literal('')),
  status: z.enum(projectStatuses, { required_error: "Please select a status." }),
  teamMembers: z.string().optional().or(z.literal('')), // Conceptual: comma-separated emails
  tags: z.string().optional().or(z.literal('')), // Conceptual: comma-separated tags
});

type CreateProjectFormValues = z.infer<typeof createProjectSchema>;

interface CreateProjectModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProjectCreated?: (data: CreateProjectFormValues & { id: string, createdBy: string, createdAt: string }) => void;
}

export default function CreateProjectModal({
  isOpen,
  onOpenChange,
  onProjectCreated,
}: CreateProjectModalProps) {
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "Active",
      teamMembers: "",
      tags: "",
    },
  });

  function onSubmit(data: CreateProjectFormValues) {
    // Simulate saving the project
    const newProjectData = {
      ...data,
      id: `prj_${Date.now()}`, // Simple unique ID
      createdBy: "current_user_placeholder_id", // Replace with actual user ID
      createdAt: new Date().toISOString(),
    };
    console.log("New Project Data:", newProjectData);
    toast({
      title: "Project Created! ✅",
      description: `Project "${data.name}" has been successfully set up.`,
    });
    if (onProjectCreated) {
      onProjectCreated(newProjectData);
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <PlusCircleIcon className="mr-2 h-5 w-5 text-primary" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Define the details for your new project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Project Name</FormLabel> <FormControl><Input placeholder="e.g., Q1 Marketing Campaign" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description (Optional)</FormLabel> <FormControl><Textarea placeholder="Briefly describe the project's goals and scope..." className="resize-y min-h-[80px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="status" render={({ field }) => ( <FormItem> <FormLabel>Status</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl> <SelectContent> {projectStatuses.map(stat => <SelectItem key={stat} value={stat}>{stat}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="teamMembers" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><UserPlusIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Add Team Members (Optional)</FormLabel> <FormControl><Input placeholder="Enter emails, comma-separated (conceptual)" {...field} /></FormControl> <FormDescription>Invite members to collaborate.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="tags" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Tags (Optional)</FormLabel> <FormControl><Input placeholder="e.g., Frontend, UI/UX, Marketing (comma-separated)" {...field} /></FormControl> <FormDescription>Help categorize your project.</FormDescription> <FormMessage /> </FormItem> )} />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}> Cancel </Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
    