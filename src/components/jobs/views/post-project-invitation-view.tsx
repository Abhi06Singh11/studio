
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { FolderKanbanIcon, PlusCircleIcon, UsersIcon, TagIcon, ClockIcon, DollarSignIcon, ZapIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const timeCommitmentOptions = ["5-10 hrs/week", "10-20 hrs/week", "20+ hrs/week", "Flexible"] as const;
const compensationOptions = ["Unpaid", "Paid", "Revenue Share", "Equity Only"] as const;
const collaborationModes = ["Remote", "Hybrid", "On-site"] as const;


const postProjectInvitationSchema = z.object({
  projectTitle: z.string().min(5, "Project title must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters.").max(2000),
  skillsNeeded: z.string().min(3, "Please list at least one skill."), // Comma-separated
  rolesRequired: z.string().min(3, "Please list at least one role."), // Comma-separated
  timeCommitment: z.enum(timeCommitmentOptions).optional(),
  compensation: z.enum(compensationOptions, { required_error: "Please select a compensation type." }),
  paidAmount: z.string().optional(), // Conditional, if compensation is "Paid"
  duration: z.string().min(1, "Project duration is required (e.g., 2 months, Ongoing)."),
  collaborationMode: z.enum(collaborationModes, { required_error: "Please select collaboration mode." }),
  inviteVia: z.string().optional().or(z.literal('')), // Comma-separated usernames/emails/profile links
}).refine(data => !(data.compensation === "Paid" && (!data.paidAmount || data.paidAmount.trim() === "")), {
    message: "Please specify the amount if compensation is 'Paid'.",
    path: ["paidAmount"],
});


type PostProjectInvitationFormValues = z.infer<typeof postProjectInvitationSchema>;

export default function PostProjectInvitationView() {
  const form = useForm<PostProjectInvitationFormValues>({
    resolver: zodResolver(postProjectInvitationSchema),
    defaultValues: {
      projectTitle: "",
      description: "",
      skillsNeeded: "",
      rolesRequired: "",
      timeCommitment: undefined,
      compensation: "Unpaid",
      paidAmount: "",
      duration: "",
      collaborationMode: "Remote",
      inviteVia: "",
    },
  });

  const watchedCompensation = form.watch("compensation");

  function onSubmit(data: PostProjectInvitationFormValues) {
    const finalData = {
        ...data,
        skillsNeeded: data.skillsNeeded.split(',').map(skill => skill.trim()).filter(Boolean),
        rolesRequired: data.rolesRequired.split(',').map(role => role.trim()).filter(Boolean),
        inviteVia: data.inviteVia?.split(',').map(invite => invite.trim()).filter(Boolean) || [],
        createdBy: "current_user_placeholder_uid", // Placeholder
        createdAt: new Date().toISOString(),
        status: "pending", // Default status for new invitations
    };
    console.log("Project Invitation Data (Conceptual Firestore Write):", finalData);
    toast({
      title: "Project Invitation Posted (Conceptually)!",
      description: `Invitation for "${data.projectTitle}" has been created.`,
    });
    form.reset();
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <FolderKanbanIcon className="mr-2 h-6 w-6 text-primary" /> Post a Project Invitation
        </CardTitle>
        <CardDescription>
          Invite collaborators to join your project. (For all users)
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={form.control} name="projectTitle" render={({ field }) => ( <FormItem> <FormLabel>Project Title</FormLabel> <FormControl><Input placeholder="e.g., AI Resume Screening Tool" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Project Description</FormLabel> <FormControl><Textarea placeholder="Describe your project, its goals, and what you aim to achieve..." className="min-h-[120px] resize-y" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="skillsNeeded" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Skills Needed</FormLabel> <FormControl><Input placeholder="e.g., Python, FastAPI, Hugging Face (comma-separated)" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="rolesRequired" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><UsersIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Role(s) Required</FormLabel> <FormControl><Input placeholder="e.g., Backend Developer, UI Designer (comma-separated)" {...field} /></FormControl> <FormMessage /> </FormItem> )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="timeCommitment" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><ClockIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Time Commitment (Optional)</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select time commitment" /></SelectTrigger></FormControl> <SelectContent> {timeCommitmentOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="compensation" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Compensation</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select compensation type" /></SelectTrigger></FormControl> <SelectContent> {compensationOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                </div>

                {watchedCompensation === "Paid" && (
                     <FormField control={form.control} name="paidAmount" render={({ field }) => ( <FormItem> <FormLabel>Paid Amount / Rate</FormLabel> <FormControl><Input placeholder="e.g., ₹5000/month or $50/hour" {...field} /></FormControl> <FormDescription>Specify the payment details.</FormDescription><FormMessage /> </FormItem> )} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="duration" render={({ field }) => ( <FormItem> <FormLabel>Project Duration</FormLabel> <FormControl><Input placeholder="e.g., 2 months, Ongoing" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="collaborationMode" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><ZapIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Collaboration Mode</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger></FormControl> <SelectContent> {collaborationModes.map(mode => <SelectItem key={mode} value={mode}>{mode}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                </div>

                <FormField control={form.control} name="inviteVia" render={({ field }) => ( <FormItem> <FormLabel>Invite via (Optional)</FormLabel> <FormControl><Textarea placeholder="Enter Usernames, Emails, or Codesphere Profile Links (comma-separated)" className="min-h-[60px]" {...field} /></FormControl> <FormDescription>Conceptually, these users would be notified.</FormDescription> <FormMessage /> </FormItem> )} />
              
              <CardFooter className="px-0 pt-8">
                <Button type="button" variant="outline" onClick={() => form.reset()} className="mr-2">Reset Form</Button>
                <Button type="submit">Post Project Invitation</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
