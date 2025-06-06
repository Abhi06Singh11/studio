
// src/components/project/views/create-channel-view.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ListVideoIcon, PlusCircleIcon, LockIcon, GlobeIcon, UsersIcon, HashIcon } from "lucide-react";
import type { ProjectWorkspaceView } from "@/app/projects/page";

const createChannelFormSchema = z.object({
  channelName: z
    .string()
    .min(1, "Channel name cannot be empty.")
    .max(80, "Channel name cannot exceed 80 characters.")
    .regex(/^[a-z0-9-_]+$/, "Channel names can only use lowercase letters, numbers, dashes, and underscores."),
  description: z.string().max(250, "Description cannot exceed 250 characters.").optional().or(z.literal('')),
  privacy: z.enum(["public", "private"], {
    required_error: "You need to select a privacy setting.",
  }),
  purpose: z.string().max(150, "Purpose cannot exceed 150 characters.").optional().or(z.literal('')),
  addPeople: z.string().optional().or(z.literal('')), // Comma-separated names/emails
});

type CreateChannelFormValues = z.infer<typeof createChannelFormSchema>;

interface CreateChannelViewProps {
  setActiveView: (view: ProjectWorkspaceView) => void;
}

export default function CreateChannelView({ setActiveView }: CreateChannelViewProps) {
  const form = useForm<CreateChannelFormValues>({
    resolver: zodResolver(createChannelFormSchema),
    defaultValues: {
      channelName: "",
      description: "",
      privacy: "public",
      purpose: "",
      addPeople: "",
    },
  });

  const watchedPrivacy = form.watch("privacy");

  function onSubmit(data: CreateChannelFormValues) {
    const newChannelData = {
      ...data,
      addPeople: data.addPeople?.split(',').map(p => p.trim()).filter(Boolean) || [],
      createdBy: "currentUser_placeholder_id", // Replace with actual user ID
      createdAt: new Date().toISOString(),
    };
    console.log("New Channel Data (Conceptual):", newChannelData);
    toast({
      title: "Channel Created!",
      description: `Channel #${data.channelName} has been successfully created.`,
    });
    form.reset();
    setActiveView("channels"); // Navigate back to channels list or to the new channel
  }

  return (
    <Card className="h-full flex flex-col shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <ListVideoIcon className="mr-2 h-6 w-6 text-primary" /> Create a Channel
        </CardTitle>
        <CardDescription>
          Channels are where your team communicates. They’re best when organized around a topic — #project-alpha, for example.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="channelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <div className="flex items-center">
                    <span className="px-3 py-2 text-muted-foreground border border-r-0 rounded-l-md bg-muted">#</span>
                    <FormControl>
                      <Input placeholder="e.g. project-gamma or q4-marketing" {...field} className="rounded-l-none" />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Channel names must be lowercase, without spaces or periods, and can’t be longer than 80 characters.
                  </FormDescription>
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
                    <Textarea placeholder="What’s this channel about?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short summary of the channel's purpose." {...field} className="min-h-[60px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="public" id="public-channel" />
                        </FormControl>
                        <Label htmlFor="public-channel" className="font-normal flex items-center cursor-pointer">
                          <GlobeIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Public
                        </Label>
                      </FormItem>
                       <FormDescription className="pl-8 text-xs !mt-0">Anyone in your workspace can view and join this channel.</FormDescription>
                      
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                            <RadioGroupItem value="private" id="private-channel" />
                        </FormControl>
                        <Label htmlFor="private-channel" className="font-normal flex items-center cursor-pointer">
                          <LockIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Private
                        </Label>
                      </FormItem>
                      {watchedPrivacy === "private" && (
                        <FormDescription className="pl-8 text-xs !mt-0">
                            Private channels can only be viewed or joined by invitation. This can’t be undone.
                        </FormDescription>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addPeople"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><UsersIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Add people (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                        placeholder="Enter names or emails, separated by commas (e.g., elara@example.com, Marcus Chen)" 
                        {...field} 
                        className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormDescription>Conceptually, these users would be invited or added to the channel.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pt-6 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setActiveView('channels')}>
                Cancel
              </Button>
              <Button type="submit">
                <PlusCircleIcon className="mr-2 h-4 w-4" /> Create Channel
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

