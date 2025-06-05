
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

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
// import { Calendar } from "@/components/ui/calendar"; // No longer needed
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // No longer needed
import { toast } from "@/hooks/use-toast";
import { PlusCircleIcon, TagIcon, TicketIcon, CalendarIcon, UploadCloudIcon, ShieldAlertIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const ticketTypes = ["Bug", "Task", "Story"] as const;
const ticketPriorities = ["Low", "Medium", "High", "Critical"] as const;
const ticketStatuses = ["To Do", "In Progress", "Done"] as const;

const createTicketSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(150),
  description: z.string().max(5000, "Description can be up to 5000 characters.").optional().or(z.literal('')),
  type: z.enum(ticketTypes, { required_error: "Please select an ticket type." }),
  priority: z.enum(ticketPriorities, { required_error: "Please select a priority." }),
  status: z.enum(ticketStatuses, { required_error: "Please select a status." }),
  assignedTo: z.string().optional().or(z.literal('')),
  // dueDate: z.date().optional(), // Due date removed
  tags: z.string().optional().or(z.literal('')),
  attachments: z.string().optional().or(z.literal('')), // Conceptual: string for URL or name
});

type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

interface CreateTicketModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onTicketCreated?: (data: Omit<CreateTicketFormValues, 'dueDate'> & { id: string, projectId: string, createdBy: string, createdAt: string, dueDate?: string }) => void;
  projectId: string;
  teamMembers: Array<{ id: string, name: string }>;
}

export default function CreateTicketModal({
  isOpen,
  onOpenChange,
  onTicketCreated,
  projectId,
  teamMembers,
}: CreateTicketModalProps) {
  const form = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "Task",
      priority: "Medium",
      status: "To Do",
      assignedTo: "",
      tags: "",
      attachments: "",
      // dueDate: undefined, // Due date removed
    },
  });

  function onSubmit(data: CreateTicketFormValues) {
    const { ...formData } = data; // Destructure to exclude dueDate if it was there
    const newTicketData = {
      ...formData,
      ticketId: `tkt_${Date.now()}`,
      projectId,
      createdBy: "current_user_placeholder_id",
      createdAt: new Date().toISOString(),
      // dueDate: data.dueDate ? format(data.dueDate, "yyyy-MM-dd") : undefined, // Due date processing removed
    };
    console.log("New Ticket Data:", newTicketData);
    toast({
      title: "Ticket Created! ✅",
      description: `Ticket "${data.title}" has been added to the project.`,
    });
    if (onTicketCreated) {
      onTicketCreated(newTicketData);
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <TicketIcon className="mr-2 h-5 w-5 text-primary" />
            Create New Ticket
          </DialogTitle>
          <DialogDescription>
            Define the details for a new bug, task, or user story.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="max-h-[65vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Title</FormLabel> <FormControl><Input placeholder="e.g., Fix Header Overlap on Mobile" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description (Optional)</FormLabel> <FormControl><Textarea placeholder="Provide details about the ticket, steps to reproduce, expected behavior, etc." className="resize-y min-h-[100px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="type" render={({ field }) => ( <FormItem className="space-y-2"> <FormLabel>Type</FormLabel> <FormControl> <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-3"> {ticketTypes.map(type => ( <FormItem key={type} className="flex items-center space-x-1 space-y-0"> <FormControl><RadioGroupItem value={type} id={`type-${type}`} /></FormControl> <Label htmlFor={`type-${type}`} className="font-normal">{type}</Label> </FormItem> ))} </RadioGroup> </FormControl> <FormMessage /> </FormItem> )} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="priority" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><ShieldAlertIcon className="mr-1.5 h-4 w-4 text-muted-foreground"/>Priority</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger></FormControl> <SelectContent> {ticketPriorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="status" render={({ field }) => ( <FormItem> <FormLabel>Status</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl> <SelectContent> {ticketStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                </div>
                 <FormField control={form.control} name="assignedTo" render={({ field }) => ( <FormItem> <FormLabel>Assign to (Optional)</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger></FormControl> <SelectContent> <SelectItem value="">Unassigned</SelectItem> {teamMembers.map(member => <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>)} </SelectContent> </Select> <FormDescription>Assign this ticket to a team member.</FormDescription> <FormMessage /> </FormItem> )} />
                
                {/* Due Date Field Removed
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                */}

                <FormField control={form.control} name="tags" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Tags (Optional)</FormLabel> <FormControl><Input placeholder="e.g., frontend, mobile, UI (comma-separated)" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="attachments" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><UploadCloudIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Attachments (Conceptual)</FormLabel> <FormControl><Input type="text" placeholder="Enter URL or filename (conceptual)" {...field} disabled /></FormControl><FormDescription>File upload feature coming soon.</FormDescription> <FormMessage /> </FormItem> )} />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Create Ticket</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
    
