
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
import { MailPlusIcon, UserIcon, TagIcon, ImageIcon, UploadCloudIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const createNewsletterSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters long.").max(500),
  authorName: z.string().min(2, "Author name is required.").max(50),
  tags: z.string().optional().or(z.literal('')), // Comma-separated
  imageUrl: z.string().url("Please enter a valid URL for the image.").optional().or(z.literal('')),
});

type CreateNewsletterFormValues = z.infer<typeof createNewsletterSchema>;

interface CreateNewsletterModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onNewsletterCreated?: (data: CreateNewsletterFormValues) => void;
}

export default function CreateNewsletterModal({ 
  isOpen, 
  onOpenChange, 
  onNewsletterCreated 
}: CreateNewsletterModalProps) {
  const form = useForm<CreateNewsletterFormValues>({
    resolver: zodResolver(createNewsletterSchema),
    defaultValues: {
      title: "",
      description: "",
      authorName: "", // Should ideally be pre-filled with current user's name
      tags: "",
      imageUrl: "",
    },
  });

  function onSubmit(data: CreateNewsletterFormValues) {
    console.log("Create Newsletter Data:", data);
    toast({
      title: "Newsletter Created (Conceptually)!",
      description: `Your newsletter "${data.title}" has been set up.`,
    });
    if (onNewsletterCreated) {
      onNewsletterCreated(data);
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MailPlusIcon className="mr-2 h-5 w-5 text-primary" />
            Create a New Newsletter
          </DialogTitle>
          <DialogDescription>
            Share your insights and updates with your audience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 p-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Newsletter Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Weekly Tech Insights" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What is your newsletter about?"
                          className="resize-y min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><UserIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Author Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name or organization name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Categories/Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., AI, WebDev, Startups (comma-separated)" {...field} />
                      </FormControl>
                      <FormDescription>Help users discover your newsletter.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Cover Image URL (Optional)</FormLabel>
                      <div className="flex items-center gap-2">
                        <FormControl className="flex-grow">
                          <Input placeholder="https://example.com/image.png" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" size="sm" disabled>
                            <UploadCloudIcon className="mr-1.5 h-4 w-4"/> Upload
                        </Button>
                      </div>
                      {field.value && (
                        <div className="mt-2 w-full aspect-video relative rounded-md overflow-hidden border bg-muted max-h-40">
                          <Image src={field.value} alt="Cover preview" layout="fill" objectFit="cover" data-ai-hint="newsletter cover"/>
                        </div>
                      )}
                      <FormDescription>Direct link to a cover image. (Conceptual upload)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Newsletter</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
    