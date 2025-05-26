
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { BriefcaseIcon, BuildingIcon, MapPinIcon, DollarSignIcon, BarChartIcon, ListChecksIcon, FileTextIcon, CalendarIcon, MailIcon, LinkIcon, UploadCloudIcon, PlusCircleIcon, Edit3Icon, TagIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Temporary", "Freelance"] as const;
const experienceLevels = ["Entry-level", "Mid-level", "Senior-level", "Lead", "Manager", "Director", "Executive"] as const;
const jobCategories = ["Software Development", "DevOps & SRE", "AI & Machine Learning", "Data Science & Analytics", "Product Management", "UX/UI Design", "Cybersecurity", "IT Support", "Sales & Marketing", "Other"] as const;

const postJobFormSchema = z.object({
  // Job Details
  jobTitle: z.string().min(3, "Job title must be at least 3 characters."),
  companyName: z.string().min(2, "Company name is required."),
  jobType: z.enum(jobTypes, { required_error: "Please select a job type." }),
  experienceRequired: z.string().min(1, "Experience level is required."), // e.g. "2-5 years" or "Entry Level"
  salaryRange: z.string().optional().or(z.literal('')), // e.g., "₹12 LPA – ₹20 LPA" or "$80k - $100k"
  location: z.string().min(2, "Location is required."),
  jobCategory: z.enum(jobCategories, { required_error: "Please select a job category." }),
  requiredSkills: z.string().min(3, "Please list at least one required skill."), // Comma-separated
  assessmentRequired: z.enum(["Yes", "No"], { required_error: "Please specify if an assessment is required." }),
  
  // Description
  jobDescription: z.string().min(50, "Job description must be at least 50 characters.").max(10000, "Description too long."),

  // Additional
  lastDateToApply: z.date().optional(),
  hiringContactEmail: z.string().email("Invalid email address."),
  companyLogoUrl: z.string().url("Invalid URL for company logo.").optional().or(z.literal('')),
  slackChannelLink: z.string().url("Invalid URL for Slack channel.").optional().or(z.literal('')),
});

type PostJobFormValues = z.infer<typeof postJobFormSchema>;

export default function PostJobView() {
  const form = useForm<PostJobFormValues>({
    resolver: zodResolver(postJobFormSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "Codesphere Inc.", // Default company for company-only posting
      jobType: "Full-time",
      experienceRequired: "",
      salaryRange: "",
      location: "Remote",
      jobCategory: undefined,
      requiredSkills: "",
      assessmentRequired: "No",
      jobDescription: "",
      hiringContactEmail: "jobs@codesphere.io",
      companyLogoUrl: "",
      slackChannelLink: "",
    },
  });

  function onSubmit(data: PostJobFormValues) {
    const finalData = {
        ...data,
        requiredSkills: data.requiredSkills.split(',').map(skill => skill.trim()).filter(Boolean),
        lastDateToApply: data.lastDateToApply ? format(data.lastDateToApply, "yyyy-MM-dd") : undefined,
        postedBy: "company_admin_placeholder_uid", // Placeholder
        postedAt: new Date().toISOString(),
    };
    console.log("Job Posting Data (Conceptual Firestore Write):", finalData);
    toast({
      title: "Job Posted (Conceptually)!",
      description: `Job "${data.jobTitle}" has been created.`,
    });
    form.reset();
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <PlusCircleIcon className="mr-2 h-6 w-6 text-primary" /> Post a New Job
        </CardTitle>
        <CardDescription>
          Fill in the details to find the perfect candidate. (For Company use only)
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Job Details Section */}
              <section className="space-y-6 p-4 border rounded-lg shadow-sm bg-card">
                <h3 className="text-lg font-semibold flex items-center"><BriefcaseIcon className="mr-2 h-5 w-5 text-muted-foreground"/>Job Details</h3>
                <FormField control={form.control} name="jobTitle" render={({ field }) => ( <FormItem> <FormLabel>Job Title</FormLabel> <FormControl><Input placeholder="e.g., Senior Frontend Developer" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="companyName" render={({ field }) => ( <FormItem> <FormLabel>Company Name</FormLabel> <FormControl><Input placeholder="e.g., Codesphere Inc." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="jobType" render={({ field }) => ( <FormItem> <FormLabel>Job Type</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger></FormControl> <SelectContent> {jobTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="experienceRequired" render={({ field }) => ( <FormItem> <FormLabel>Experience Required</FormLabel> <FormControl><Input placeholder="e.g., 2-5 years / Entry Level" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                </div>
                <FormField control={form.control} name="salaryRange" render={({ field }) => ( <FormItem> <FormLabel>Salary Range (Optional)</FormLabel> <FormControl><Input placeholder="e.g., ₹12 LPA – ₹20 LPA or $80,000 - $100,000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="location" render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl><Input placeholder="e.g., Remote / Bangalore / Hybrid" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                 <FormField control={form.control} name="jobCategory" render={({ field }) => ( <FormItem> <FormLabel>Job Category</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl> <SelectContent> {jobCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                 <FormField control={form.control} name="requiredSkills" render={({ field }) => ( <FormItem> <FormLabel className="flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Required Skills</FormLabel> <FormControl><Textarea placeholder="e.g., React, TypeScript, Node.js, Python (comma-separated)" {...field} className="min-h-[60px]"/> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="assessmentRequired" render={({ field }) => ( <FormItem className="space-y-3"> <FormLabel>Assessment Required?</FormLabel> <FormControl> <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-3"> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl><RadioGroupItem value="Yes" /></FormControl> <FormLabel className="font-normal">Yes (e.g., attach LeetCode-style challenge)</FormLabel> </FormItem> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl><RadioGroupItem value="No" /></FormControl> <FormLabel className="font-normal">No</FormLabel> </FormItem> </RadioGroup> </FormControl> <FormMessage /> </FormItem> )} />
              </section>

              {/* Description Section */}
              <section className="space-y-6 p-4 border rounded-lg shadow-sm bg-card">
                 <h3 className="text-lg font-semibold flex items-center"><FileTextIcon className="mr-2 h-5 w-5 text-muted-foreground"/>Job Description</h3>
                 <FormField control={form.control} name="jobDescription" render={({ field }) => ( <FormItem> <FormLabel>Full Job Description</FormLabel> <FormControl><Textarea placeholder="Provide a detailed description of the role, responsibilities, company culture, perks, growth opportunities, etc." className="min-h-[200px] resize-y" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </section>

              {/* Additional Section */}
              <section className="space-y-6 p-4 border rounded-lg shadow-sm bg-card">
                 <h3 className="text-lg font-semibold flex items-center"><ListChecksIcon className="mr-2 h-5 w-5 text-muted-foreground"/>Additional Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="lastDateToApply" render={({ field }) => ( <FormItem className="flex flex-col"> <FormLabel>Last Date to Apply (Optional)</FormLabel> <Popover> <PopoverTrigger asChild> <FormControl> <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground" )}> <CalendarIcon className="mr-2 h-4 w-4" /> {field.value ? format(field.value, "PPP") : <span>Pick a date</span>} </Button> </FormControl> </PopoverTrigger> <PopoverContent className="w-auto p-0" align="start"> <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} initialFocus /> </PopoverContent> </Popover> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="hiringContactEmail" render={({ field }) => ( <FormItem> <FormLabel>Hiring Contact Email</FormLabel> <FormControl><Input type="email" placeholder="e.g., careers@codesphere.io" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                 </div>
                 <FormField control={form.control} name="companyLogoUrl" render={({ field }) => ( <FormItem> <FormLabel>Company Logo URL (Optional)</FormLabel> <div className="flex items-center gap-2"> <FormControl className="flex-grow"><Input placeholder="https://example.com/logo.png" {...field} /></FormControl> <Button type="button" variant="outline" size="sm" disabled><UploadCloudIcon className="mr-1.5 h-4 w-4"/>Upload</Button> </div> <FormDescription>Direct link to the company logo image.</FormDescription> <FormMessage /> </FormItem> )} />
                 <FormField control={form.control} name="slackChannelLink" render={({ field }) => ( <FormItem> <FormLabel>Slack Channel Link (Optional for internal team)</FormLabel> <FormControl><Input placeholder="e.g., https://yourteam.slack.com/archives/C123XYZ" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </section>
              
              <CardFooter className="px-0 pt-8">
                <Button type="button" variant="outline" onClick={() => form.reset()} className="mr-2">Reset Form</Button>
                <Button type="submit">Post Job</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

