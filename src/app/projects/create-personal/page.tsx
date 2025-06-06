
// src/app/projects/create-personal/page.tsx
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FolderPlusIcon, ArrowLeftIcon, UploadCloudIcon, LayoutGridIcon, UsersIcon, LockIcon, GlobeIcon, TagIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const projectPrivacyOptions = ["Public", "Team Only", "Private"] as const;

const createPersonalProjectFormSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters." }).max(100),
  description: z.string().max(1000, { message: "Description must be at most 1000 characters." }).optional().or(z.literal('')),
  tags: z.string().optional().or(z.literal('')), 
  initialTeamMembers: z.string().optional().or(z.literal('')), 
  privacy: z.enum(projectPrivacyOptions, { required_error: "Please select a privacy setting." }),
});

type CreatePersonalProjectFormValues = z.infer<typeof createPersonalProjectFormSchema>;

export default function CreatePersonalProjectPage() {
  const router = useRouter();

  const form = useForm<CreatePersonalProjectFormValues>({
    resolver: zodResolver(createPersonalProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: "",
      initialTeamMembers: "",
      privacy: "Private",
    },
  });

  function onSubmit(data: CreatePersonalProjectFormValues) {
    const projectData = {
      ...data,
      tags: data.tags?.split(',').map(tag => tag.trim()).filter(Boolean) || [],
      initialTeamMembers: data.initialTeamMembers?.split(',').map(member => member.trim()).filter(Boolean) || [],
      createdBy: "current_user_uid_placeholder", 
      createdAt: new Date().toISOString(),
      type: "personal", 
    };

    console.log("New Personal Project Data (Conceptual Firestore Write):", projectData);
    toast({
      title: "Personal Project Created (Conceptually)!",
      description: `Project "${data.name}" has been set up.`,
    });
    form.reset();
    // Potentially navigate to the new project or back to the projects list
    // router.push('/projects'); 
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
          <CardTitle className="flex items-center">
            <FolderPlusIcon className="mr-2 h-6 w-6 text-primary" />
            Create New Personal Project
          </CardTitle>
          <CardDescription>
            Define the details for your new personal or general project.
          </CardDescription>
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
                      <Input placeholder="e.g., My Side Hustle App" {...field} />
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
                        placeholder="Describe the goals and scope of this project..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
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
                    <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., react, AI, SaaS (comma-separated)" {...field} />
                    </FormControl>
                    <FormDescription>Help categorize your project.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="initialTeamMembers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><UsersIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Initial Team Members (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter emails or usernames, comma-separated (conceptual)"
                        className="resize-y min-h-[60px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Invite collaborators from the start (conceptual).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator />

              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium flex items-center mb-3">
                        <LockIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                        Privacy Settings
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-md border hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="Public" id="privacy-public" />
                          </FormControl>
                          <FormLabel htmlFor="privacy-public" className="font-normal flex-1 flex justify-between items-center cursor-pointer">
                            <span className="flex items-center"><GlobeIcon className="mr-2 h-4 w-4 text-green-500"/>Public</span>
                            <span className="text-xs text-muted-foreground !mt-0">Visible to everyone on CodeSphere.</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-md border hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="Team Only" id="privacy-team" />
                          </FormControl>
                          <FormLabel htmlFor="privacy-team" className="font-normal flex-1 flex justify-between items-center cursor-pointer">
                            <span className="flex items-center"><UsersIcon className="mr-2 h-4 w-4 text-blue-500"/>Team Only</span>
                            <span className="text-xs text-muted-foreground !mt-0">Only visible to invited team members.</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 p-3 rounded-md border hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 cursor-pointer">
                           <FormControl>
                            <RadioGroupItem value="Private" id="privacy-private" />
                           </FormControl>
                           <FormLabel htmlFor="privacy-private" className="font-normal flex-1 flex justify-between items-center cursor-pointer">
                            <span className="flex items-center"><LockIcon className="mr-2 h-4 w-4 text-red-500"/>Private</span>
                            <span className="text-xs text-muted-foreground !mt-0">Only visible to you (the creator).</span>
                           </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              
              <div>
                <h3 className="text-base font-medium mb-3 flex items-center">
                  <FolderPlusIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                  Initial Project Setup (Conceptual)
                </h3>
                <div className="space-y-4">
                    <Button type="button" variant="outline" className="w-full sm:w-auto" disabled>
                        <UploadCloudIcon className="mr-2 h-4 w-4" /> Upload Starter Files
                    </Button>
                    <Button type="button" variant="outline" className="w-full sm:w-auto ml-0 sm:ml-2" disabled>
                        <LayoutGridIcon className="mr-2 h-4 w-4" /> Select from Template
                    </Button>
                    <p className="text-xs text-muted-foreground">These features are conceptual for now.</p>
                </div>
              </div>

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
    
