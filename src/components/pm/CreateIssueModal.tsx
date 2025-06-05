
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PlusCircleIcon, TagIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const issueTypes = ["Bug", "Task", "Feature"] as const;
const issuePriorities = ["Low", "Medium", "High"] as const;
const issueStatuses = ["To Do", "In Progress", "Done"] as const;

const createIssueSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(150),
  description: z.string().max(5000, "Description can be up to 5000 characters.").optional().or(z.literal('')),
  type: z.enum(issueTypes, { required_error: "Please select an issue type." }),
  priority: z.enum(issuePriorities, { required_error: "Please select a priority." }),
  status: z.enum(issueStatuses, { required_error: "Please select a status." }),
  assignedTo: z.string().optional().or(z.literal('')), // User ID or name
  tags: z.string().optional().or(z.literal('')), // Comma-separated
});

type CreateIssueFormValues = z.infer<typeof createIssueSchema>;

interface CreateIssueModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onIssueCreated?: (data: CreateIssueFormValues & { id: string, projectId: string, createdBy: string, createdAt: string }) => void;
  projectId: string;
  teamMembers: Array<{ id: string, name: string }>; // For assignee dropdown
}

export default function CreateIssueModal({
  isOpen,
  onOpenChange,
  onIssueCreated,
  projectId,
  teamMembers,
}: CreateIssueModalProps) {
  const form = useForm<CreateIssueFormValues>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "Task",
      priority: "Medium",
      status: "To Do",
      assignedTo: "",
      tags: "",
    },
  });

  function onSubmit(data: CreateIssueFormValues) {
    const newIssueData = {
      ...data,
      id: `issue_${Date.now()}`,
      projectId,
      createdBy: "current_user_placeholder_id", // Replace with actual user ID
      createdAt: new Date().toISOString(),
    };
    console.log("New Issue Data:", newIssueData);
    toast({
      title: "Issue Created! ✅",
      description: `Issue "${data.title}" has been added to the project.`,
    });
    if (onIssueCreated) {
      onIssueCreated(newIssueData);
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
            Create New Issue
          </DialogTitle>
          <DialogDescription>
            Define the details for a new bug, task, or feature request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="max-h-[65vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Title</FormLabel> <FormControl><Input placeholder="e.g., Fix login button style" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description (Optional)</FormLabel> <FormControl><Textarea placeholder="Provide details about the issue, steps to reproduce, expected behavior, etc." className="resize-y min-h-[100px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="type" render={({ field }) => ( <FormItem className="space-y-2"> <FormLabel>Type</FormLabel> <FormControl> <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-3"> {issueTypes.map(type => ( <FormItem key={type} className="flex items-center space-x-1 space-y-0"> <FormControl><RadioGroupItem value={type} id={`type-${type}`} /></FormControl> <Label htmlFor={`type-${type}`} className="font-normal">{type}</Label> </FormItem> ))} </RadioGroup> </FormControl> <FormMessage /> </FormItem> )} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="priority" render={({ field }) => ( <FormItem> <FormLabel>Priority</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger></FormControl> <SelectContent> {issuePriorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="status" render={({ field }) => ( <FormItem> <FormLabel>Status</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl> <SelectContent> {issueStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                </div>
                <FormField control={form.control} name="assignedTo" render={({ field }) => ( <FormItem> <FormLabel>Assign to (Optional)</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger></FormControl> <SelectContent> <SelectItem value="">Unassigned</SelectItem> {teamMembers.map(member => <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>)} </SelectContent> </Select> <FormDescription>Assign this issue to a team member.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="tags" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Tags (Optional)</FormLabel> <FormControl><Input placeholder="e.g., UI, Bug, Mobile (comma-separated)" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Create Issue</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
    