
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
import { CalendarPlusIcon, UsersIcon, TagIcon, ImageIcon, UploadCloudIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const createEventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters long.").max(1000),
  date: z.string().min(1, "Date is required."), // Simple text input for MVP
  time: z.string().optional(),
  location: z.string().min(3, "Location is required."),
  tags: z.string().optional().or(z.literal('')),
  imageUrl: z.string().url("Please enter a valid URL for the image.").optional().or(z.literal('')),
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

interface CreateEventModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEventCreated?: (data: CreateEventFormValues) => void;
}

export default function CreateEventModal({ 
  isOpen, 
  onOpenChange, 
  onEventCreated 
}: CreateEventModalProps) {
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      tags: "",
      imageUrl: "",
    },
  });

  function onSubmit(data: CreateEventFormValues) {
    console.log("Create Event Data:", data);
    toast({
      title: "Event Created (Conceptually)!",
      description: `Your event "${data.title}" has been set up.`,
    });
    if (onEventCreated) {
      onEventCreated(data);
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CalendarPlusIcon className="mr-2 h-5 w-5 text-primary" />
            Create New Event
          </DialogTitle>
          <DialogDescription>
            Share details about your upcoming event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField control={form.control} name="title" render={({ field }) => ( <FormItem> <FormLabel>Event Title</FormLabel> <FormControl><Input placeholder="e.g., Annual Tech Conference" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Description</FormLabel> <FormControl><Textarea placeholder="Tell attendees about your event..." className="resize-y min-h-[100px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="date" render={({ field }) => ( <FormItem> <FormLabel>Date</FormLabel> <FormControl><Input placeholder="e.g., June 15, 2025 or DD/MM/YYYY" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="time" render={({ field }) => ( <FormItem> <FormLabel>Time (Optional)</FormLabel> <FormControl><Input placeholder="e.g., 10:00 AM - 5:00 PM" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                </div>
                <FormField control={form.control} name="location" render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl><Input placeholder="e.g., Online, City Convention Center" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="tags" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Categories/Tags (Optional)</FormLabel> <FormControl><Input placeholder="e.g., Technology, Networking, Workshop (comma-separated)" {...field} /></FormControl> <FormDescription>Help people discover your event.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Event Banner URL (Optional)</FormLabel>
                        <div className="flex items-center gap-2">
                        <FormControl className="flex-grow">
                            <Input placeholder="https://example.com/event-banner.png" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" size="sm" disabled>
                            <UploadCloudIcon className="mr-1.5 h-4 w-4"/> Upload
                        </Button>
                        </div>
                        {field.value && (
                        <div className="mt-2 w-full aspect-video relative rounded-md overflow-hidden border bg-muted max-h-40">
                            <Image src={field.value} alt="Event banner preview" layout="fill" objectFit="cover" data-ai-hint="event banner"/>
                        </div>
                        )}
                        <FormDescription>Direct link to a cover image. (Conceptual upload)</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
