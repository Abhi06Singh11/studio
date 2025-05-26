
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { BriefcaseIcon, UploadCloudIcon, CalendarIcon, MapPinIcon, DollarSignIcon, TypeIcon, BarChartIcon, BookOpenIcon, LinkIcon, ClockIcon, BuildingIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance", "Temporary"] as const;
const experienceLevels = ["Entry-level", "Mid-level", "Senior-level", "Lead", "Manager", "Director", "Executive"] as const;


const jobPostingFormSchema = z.object({
  jobTitle: z.string().min(3, "Job title must be at least 3 characters."),
  companyName: z.string().min(2, "Company name is required."),
  location: z.string().min(2, "Location is required."),
  jobType: z.enum(jobTypes, {
    required_error: "Please select a job type.",
  }),
  experienceLevel: z.enum(experienceLevels, {
    required_error: "Please select an experience level.",
  }),
  salaryRange: z.string().optional().or(z.literal('')),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters.").max(5000),
  keySkills: z.string().min(1, "Please list at least one skill."), // Comma-separated
  applicationEmailOrUrl: z.string().refine(value => z.string().email().safeParse(value).success || z.string().url().safeParse(value).success, {
    message: "Must be a valid email or URL.",
  }),
  applicationDeadline: z.date().optional(),
  companyLogoUrl: z.string().url("Please enter a valid URL for the logo.").optional().or(z.literal('')),
});

type JobPostingFormValues = z.infer<typeof jobPostingFormSchema>;

interface CreateJobPostingModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  // Callback to add the new job posting to the parent page's list
  onJobPosted?: (newJob: any) => void; 
}

export default function CreateJobPostingModal({ isOpen, onOpenChange, onJobPosted }: CreateJobPostingModalProps) {
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingFormSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      location: "",
      jobType: undefined,
      experienceLevel: undefined,
      salaryRange: "",
      jobDescription: "",
      keySkills: "",
      applicationEmailOrUrl: "",
      companyLogoUrl: "",
    },
  });

  function onSubmit(data: JobPostingFormValues) {
    const newJobPosting = {
      ...data,
      id: `job_${Date.now()}`, // simple unique ID
      keySkills: data.keySkills.split(',').map(skill => skill.trim()).filter(Boolean),
      applicationDeadline: data.applicationDeadline ? format(data.applicationDeadline, "yyyy-MM-dd") : undefined,
      postedBy: "current_user_id_placeholder", 
      postedAt: new Date().toISOString(),
      // For direct use in JobPostingCardProps, ensure alignment
      title: data.jobTitle,
      company: data.companyName,
      type: 'Job' as 'Job' | 'Project', // Primary type
      employmentType: data.jobType,
      description: data.jobDescription,
      skills: data.keySkills.split(',').map(skill => skill.trim()).filter(Boolean),
      budget: data.salaryRange,
      timeline: data.applicationDeadline ? `Apply by ${format(data.applicationDeadline, "PPP")}` : "Ongoing",
      imageUrl: data.companyLogoUrl || "https://placehold.co/400x200.png?text=No+Logo", // Placeholder if no logo
      imageAiHint: data.companyLogoUrl ? "company logo" : "office building",
      tags: [data.jobType, data.experienceLevel, data.location.includes("Remote") ? "Remote" : ""].filter(Boolean),
    };

    console.log("Job Posting Data (Conceptual Firestore Write):", newJobPosting);
    toast({
      title: "Opportunity Posted (Conceptually)!",
      description: `Your posting for "${data.jobTitle}" has been created.`,
    });
    
    if (onJobPosted) {
      onJobPosted(newJobPosting);
    }

    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <BriefcaseIcon className="mr-2 h-5 w-5 text-primary" />
            Post an Opportunity
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new job or project posting.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6 p-1">
                <FormField control={form.control} name="jobTitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><TypeIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Job Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Senior Frontend Developer" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><BuildingIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Company Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Innovatech Solutions" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Location</FormLabel>
                      <FormControl><Input placeholder="e.g., Remote or San Francisco, CA" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="jobType" render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center"><BriefcaseIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Job Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger></FormControl>
                            <SelectContent>
                            {jobTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="experienceLevel" render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center"><BarChartIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Experience Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger></FormControl>
                            <SelectContent>
                            {experienceLevels.map(level => (
                                <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )} />
                </div>
                
                <FormField control={form.control} name="salaryRange" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Salary Range (Optional)</FormLabel>
                    <FormControl><Input placeholder="e.g., $80,000 - $120,000 per year or $50 - $70 per hour" {...field} /></FormControl>
                    <FormDescription>Be specific to attract the right talent.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="jobDescription" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><BookOpenIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Job Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the role, responsibilities, qualifications, and company culture..." className="min-h-[150px] resize-y" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="keySkills" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><TypeIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Key Skills / Tags</FormLabel>
                    <FormControl><Input placeholder="e.g., React, Node.js, Python, Project Management (comma-separated)" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="applicationEmailOrUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center"><LinkIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Application Email / URL</FormLabel>
                        <FormControl><Input placeholder="e.g., careers@example.com or example.com/apply" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <FormField control={form.control} name="applicationDeadline"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center mb-1.5"><ClockIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Application Deadline (Optional)</FormLabel>
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
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name="companyLogoUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><BuildingIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Company Logo URL (Optional)</FormLabel>
                     <div className="flex items-center gap-4">
                        <FormControl className="flex-grow">
                            <Input placeholder="https://example.com/logo.png" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" size="sm" disabled>
                            <UploadCloudIcon className="mr-2 h-4 w-4"/> Upload
                        </Button>
                    </div>
                    {field.value && (
                      <div className="mt-2 w-20 h-20 relative rounded-md overflow-hidden border bg-muted p-1">
                        <img src={field.value} alt="Logo preview" className="object-contain w-full h-full" />
                      </div>
                    )}
                    <FormDescription>Link to your company's logo. (Conceptual upload)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => {form.reset(); onOpenChange(false);}}>
                Cancel
              </Button>
              <Button type="submit">Post Opportunity</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
