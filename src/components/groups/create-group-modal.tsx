
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
import { toast } from "@/hooks/use-toast";
import { UsersIcon, TagIcon } from "lucide-react"; // Updated Icon
import { ScrollArea } from "@/components/ui/scroll-area";

const createGroupSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters long.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters long.").max(500),
  tags: z.string().optional().or(z.literal('')), // Comma-separated
});

type CreateGroupFormValues = z.infer<typeof createGroupSchema>;

interface CreateGroupModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onGroupCreated?: (data: CreateGroupFormValues) => void;
}

export default function CreateGroupModal({ 
  isOpen, 
  onOpenChange, 
  onGroupCreated 
}: CreateGroupModalProps) {
  const form = useForm<CreateGroupFormValues>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: "",
    },
  });

  function onSubmit(data: CreateGroupFormValues) {
    console.log("Create Group Data:", data);
    toast({
      title: "Group Created (Conceptually)!",
      description: `Your group "${data.name}" has been set up.`,
    });
    if (onGroupCreated) {
      onGroupCreated(data);
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UsersIcon className="mr-2 h-5 w-5 text-primary" /> 
            Create New Group
          </DialogTitle>
          <DialogDescription>
            Start a new community around a shared interest or topic.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Group Name</FormLabel> <FormControl><Input placeholder="e.g., React Developers Hangout" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl><Textarea placeholder="What is this group about?" className="resize-y min-h-[100px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="tags" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Categories/Tags (Optional)</FormLabel> <FormControl><Input placeholder="e.g., Tech, Coding, Networking (comma-separated)" {...field} /></FormControl> <FormDescription>Help people discover your group.</FormDescription> <FormMessage /> </FormItem> )} />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Group</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
