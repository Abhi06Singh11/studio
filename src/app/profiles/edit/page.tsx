
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray, Control } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { ArrowLeftIcon, UserIcon, BriefcaseIcon, GraduationCapIcon, LinkIcon, EyeIcon, UploadCloudIcon, BuildingIcon, DollarSignIcon, LightbulbIcon, UsersIcon, LockIcon, SmileIcon, BellIcon, PlusCircleIcon, Trash2Icon, BookOpenIcon, ExternalLinkIcon, StarIcon, InfoIcon, ShieldQuestionIcon, SettingsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const workExperienceSchema = z.object({
  id: z.string().optional(), // For unique key in mapping
  title: z.string().min(1, "Title is required."),
  company: z.string().min(1, "Company is required."),
  duration: z.string().min(1, "Duration is required."),
  description: z.string().max(1000, "Description must be at most 1000 characters.").optional().or(z.literal('')),
});

const educationSchema = z.object({
  id: z.string().optional(), // For unique key in mapping
  degree: z.string().min(1, "Degree is required."),
  institution: z.string().min(1, "Institution is required."),
  year: z.string().min(4, "Year must be valid.").max(4, "Year must be valid.").optional().or(z.literal('')),
  notes: z.string().max(500, "Notes must be at most 500 characters.").optional().or(z.literal('')),
});

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
  bio: z.string().max(500, "Bio must be at most 500 characters.").optional().or(z.literal('')),
  location: z.string().max(100, "Location must be at most 100 characters.").optional().or(z.literal('')),
  profilePictureUrl: z.string().url("Please enter a valid URL for profile picture.").optional().or(z.literal('')),
  role: z.enum(["Developer", "Entrepreneur", "Investor", "General"]),
  
  // Developer specific
  developerSkills: z.string().optional().or(z.literal('')), // Comma-separated
  developerTools: z.string().optional().or(z.literal('')), // Comma-separated
  developerProjects: z.string().optional().or(z.literal('')), // Comma-separated links or descriptions

  // Entrepreneur specific
  startupName: z.string().optional().or(z.literal('')),
  ideaSummary: z.string().max(1000, "Idea summary must be at most 1000 characters.").optional().or(z.literal('')),
  pitchDeckUrl: z.string().url("Please enter a valid URL for pitch deck.").optional().or(z.literal('')),

  // Investor specific
  investmentInterests: z.string().optional().or(z.literal('')), // Comma-separated
  pastInvestments: z.string().optional().or(z.literal('')), // Comma-separated

  workExperience: z.array(workExperienceSchema).optional(),
  education: z.array(educationSchema).optional(),

  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL.").optional().or(z.literal('')),
  portfolioWebsiteUrl: z.string().url("Please enter a valid Portfolio/Website URL.").optional().or(z.literal('')),
  githubUrl: z.string().url("Please enter a valid GitHub URL.").optional().or(z.literal('')),
  
  customStatusEmoji: z.string().max(10, "Emoji should be short.").optional().or(z.literal('')),
  customStatusText: z.string().max(100, "Status text too long.").optional().or(z.literal('')),

  profileVisibility: z.enum(["Public", "Private", "Connections Only"]),

  notifyOnNewMessages: z.boolean().optional(),
  notifyOnJobPosts: z.boolean().optional(),
  notifyOnNewFollowers: z.boolean().optional(),
  doNotDisturb: z.boolean().optional(),

  currentPassword: z.string().optional().or(z.literal('')),
  newPassword: z.string().optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  if (data.newPassword && data.newPassword.length > 0) {
    if (!data.currentPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Current password is required.", path: ["currentPassword"] });
    }
    if (data.newPassword.length < 8) {
      ctx.addIssue({ code: z.ZodIssueCode.too_small, minimum: 8, type: "string", inclusive: true, message: "New password must be at least 8 characters.", path: ["newPassword"] });
    }
    if (!data.confirmPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please confirm your new password.", path: ["confirmPassword"] });
    } else if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "New passwords do not match.", path: ["confirmPassword"] });
    }
  }
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
type WorkExperienceValues = z.infer<typeof workExperienceSchema>;
type EducationValues = z.infer<typeof educationSchema>;


const defaultValues: Partial<ProfileFormValues> = {
  name: "Elara Vance",
  bio: "AI enthusiast and lifelong learner.",
  location: "San Francisco, CA",
  profilePictureUrl: "https://placehold.co/150x150.png?p=1",
  role: "Developer",
  developerSkills: "Next.js, TypeScript, Python",
  developerTools: "VS Code, Docker",
  developerProjects: "https://github.com/elara/project1, https://github.com/elara/project2",
  startupName: "",
  ideaSummary: "",
  pitchDeckUrl: "",
  investmentInterests: "",
  pastInvestments: "",
  workExperience: [
    { id: "we1", title: "Lead AI Researcher", company: "Innovatech AI Labs", duration: "2021 - Present", description: "Leading research on LLMs." }
  ],
  education: [
    { id: "edu1", degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2018", notes: "Focus on AI." }
  ],
  linkedinUrl: "https://linkedin.com/in/elaravance",
  portfolioWebsiteUrl: "https://elara.dev",
  githubUrl: "https://github.com/elaravance",
  customStatusEmoji: "🧠",
  customStatusText: "Exploring new models",
  profileVisibility: "Public",
  notifyOnNewMessages: true,
  notifyOnJobPosts: true,
  notifyOnNewFollowers: true,
  doNotDisturb: false,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

// Helper to process comma-separated strings into arrays
const processStringToArray = (value?: string): string[] => {
  if (!value) return [];
  return value.split(',').map(s => s.trim()).filter(Boolean);
};


export default function ProfileEditPage() {
  const router = useRouter();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedRole = form.watch("role");
  const profilePictureUrl = form.watch("profilePictureUrl");

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control: form.control as Control<ProfileFormValues>, // Cast needed for nested arrays
    name: "workExperience",
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control: form.control as Control<ProfileFormValues>,
    name: "education",
  });

  function onSubmit(data: ProfileFormValues) {
    const { currentPassword, newPassword, confirmPassword, ...profileDataToSave } = data;
    
    // Process comma-separated string fields into arrays for Firestore
    const processedProfileData = {
      ...profileDataToSave,
      developerProfile: data.role === "Developer" ? {
        skills: processStringToArray(data.developerSkills),
        tools: processStringToArray(data.developerTools),
        projects: processStringToArray(data.developerProjects),
      } : undefined,
      entrepreneurProfile: data.role === "Entrepreneur" ? {
        startupName: data.startupName,
        ideaSummary: data.ideaSummary,
        pitchDeckUrl: data.pitchDeckUrl,
      } : undefined,
      investorProfile: data.role === "Investor" ? {
        investmentInterests: processStringToArray(data.investmentInterests),
        pastInvestments: processStringToArray(data.pastInvestments),
      } : undefined,
      // Remove role-specific flat fields
      developerSkills: undefined,
      developerTools: undefined,
      developerProjects: undefined,
      // startupName, ideaSummary, pitchDeckUrl, investmentInterests, pastInvestments are fine as they are already role specific
    };


    console.log("Profile Data to Save (Conceptual Firestore Document):", processedProfileData);
    if (newPassword && currentPassword) {
      console.log("Password Change Attempted (Conceptual API Call):", { currentPassword, newPassword });
    }
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been (conceptually) saved.",
    });
  }


  return (
    <div className="space-y-6 pb-16">
       <div className="flex items-center justify-between">
        <Link href="/profiles" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Profiles
        </Link>
        <Button variant="outline" size="sm" onClick={() => form.reset(defaultValues)}>Reset Form</Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><UserIcon className="mr-2 h-5 w-5 text-primary"/>Basic Information</CardTitle>
              <CardDescription>This information will be displayed on your public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Dr. Elara Vance" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profilePictureUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture URL</FormLabel>
                    <div className="flex items-center gap-4">
                      <FormControl className="flex-grow">
                        <Input placeholder="https://example.com/your-image.png" {...field} />
                      </FormControl>
                       <Button type="button" variant="outline" size="sm" disabled>
                         <UploadCloudIcon className="mr-2 h-4 w-4"/> Upload
                       </Button>
                    </div>
                    {profilePictureUrl && (
                      <div className="mt-2 w-24 h-24 relative rounded-md overflow-hidden border">
                        <Image src={profilePictureUrl} alt="Profile preview" layout="fill" objectFit="cover" data-ai-hint="person avatar"/>
                      </div>
                    )}
                    <FormDescription>Link to your hosted profile picture. (Conceptual upload)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="bio" render={({ field }) => ( <FormItem> <FormLabel>Bio</FormLabel> <FormControl><Textarea placeholder="Tell us a bit about yourself..." className="resize-y min-h-[100px]" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
              <FormField control={form.control} name="location" render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl><Input placeholder="e.g., San Francisco, CA" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><ShieldQuestionIcon className="mr-2 h-5 w-5 text-primary"/>Primary Role</CardTitle>
              <CardDescription>Select the role that best describes you. This will unlock role-specific fields.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select your primary role" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Developer"><BriefcaseIcon className="inline-block mr-2 h-4 w-4" />Developer</SelectItem>
                        <SelectItem value="Entrepreneur"><LightbulbIcon className="inline-block mr-2 h-4 w-4" />Entrepreneur</SelectItem>
                        <SelectItem value="Investor"><DollarSignIcon className="inline-block mr-2 h-4 w-4" />Investor</SelectItem>
                        <SelectItem value="General"><UserIcon className="inline-block mr-2 h-4 w-4" />General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {watchedRole === "Developer" && (
            <Card>
              <CardHeader><CardTitle className="flex items-center"><BriefcaseIcon className="mr-2 h-5 w-5 text-primary" /> Developer Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="developerSkills" render={({ field }) => ( <FormItem> <FormLabel>Skills</FormLabel> <FormControl><Input placeholder="e.g., JavaScript, React, Node.js" {...field} /></FormControl> <FormDescription>Comma-separated list of your technical skills.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="developerTools" render={({ field }) => ( <FormItem> <FormLabel>Tools & Technologies</FormLabel> <FormControl><Input placeholder="e.g., VS Code, Docker, AWS" {...field} /></FormControl> <FormDescription>Comma-separated list of tools you use.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="developerProjects" render={({ field }) => ( <FormItem> <FormLabel>Projects</FormLabel> <FormControl><Textarea placeholder="Links to projects or brief descriptions, comma-separated." {...field} /></FormControl> <FormDescription>Comma-separated links or descriptions of your projects.</FormDescription> <FormMessage /> </FormItem> )} />
              </CardContent>
            </Card>
          )}

          {watchedRole === "Entrepreneur" && (
            <Card>
              <CardHeader><CardTitle className="flex items-center"><LightbulbIcon className="mr-2 h-5 w-5 text-primary" /> Entrepreneur Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="startupName" render={({ field }) => ( <FormItem> <FormLabel>Startup Name</FormLabel> <FormControl><Input placeholder="e.g., DevOptimize Inc." {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="ideaSummary" render={({ field }) => ( <FormItem> <FormLabel>Idea Summary / Elevator Pitch</FormLabel> <FormControl><Textarea placeholder="Briefly describe your startup or idea..." className="resize-y min-h-[100px]" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField
                  control={form.control}
                  name="pitchDeckUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pitch Deck URL</FormLabel>
                       <div className="flex items-center gap-4">
                        <FormControl className="flex-grow">
                          <Input placeholder="https://example.com/your-pitch-deck.pdf" {...field} />
                        </FormControl>
                         <Button type="button" variant="outline" size="sm" disabled>
                           <UploadCloudIcon className="mr-2 h-4 w-4"/> Upload PDF
                         </Button>
                      </div>
                      {field.value && <FormDescription>Preview: <a href={field.value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{field.value.substring(field.value.lastIndexOf('/') + 1)} <ExternalLinkIcon className="inline h-3 w-3"/></a> (Conceptual)</FormDescription>}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {watchedRole === "Investor" && (
            <Card>
              <CardHeader><CardTitle className="flex items-center"><DollarSignIcon className="mr-2 h-5 w-5 text-primary" /> Investor Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="investmentInterests" render={({ field }) => ( <FormItem> <FormLabel>Investment Interests</FormLabel> <FormControl><Input placeholder="e.g., AI, SaaS, FinTech" {...field} /></FormControl> <FormDescription>Comma-separated list of your investment interests.</FormDescription> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="pastInvestments" render={({ field }) => ( <FormItem> <FormLabel>Past Investments (Portfolio)</FormLabel> <FormControl><Textarea placeholder="e.g., Company A (Seed), Company B (Series A)" {...field} /></FormControl> <FormDescription>Comma-separated list or brief descriptions.</FormDescription> <FormMessage /> </FormItem> )} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><BookOpenIcon className="mr-2 h-5 w-5 text-primary"/>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workFields.map((item, index) => (
                <Card key={item.id} className="p-4 bg-muted/30">
                  <FormField control={form.control} name={`workExperience.${index}.title`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`workExperience.${index}.duration`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Duration</FormLabel><FormControl><Input placeholder="e.g., Jan 2020 - Present" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`workExperience.${index}.description`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeWork(index)} className="mt-2"><Trash2Icon className="mr-1 h-4 w-4"/>Remove</Button>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => appendWork({ title: "", company: "", duration: "", description: "" })}><PlusCircleIcon className="mr-2 h-4 w-4"/>Add Work Experience</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><GraduationCapIcon className="mr-2 h-5 w-5 text-primary"/>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {eduFields.map((item, index) => (
                <Card key={item.id} className="p-4 bg-muted/30">
                  <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Degree/Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`education.${index}.year`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Year of Completion</FormLabel><FormControl><Input placeholder="e.g., 2018" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name={`education.${index}.notes`} render={({ field }) => (<FormItem className="mb-2"><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeEdu(index)} className="mt-2"><Trash2Icon className="mr-1 h-4 w-4"/>Remove</Button>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => appendEdu({ degree: "", institution: "", year: "", notes: "" })}><PlusCircleIcon className="mr-2 h-4 w-4"/>Add Education</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center"><LinkIcon className="mr-2 h-5 w-5 text-primary" /> Social & Professional Links</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <FormField control={form.control} name="linkedinUrl" render={({ field }) => ( <FormItem> <FormLabel>LinkedIn Profile URL</FormLabel> <FormControl><Input placeholder="https://linkedin.com/in/yourprofile" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="portfolioWebsiteUrl" render={({ field }) => ( <FormItem> <FormLabel>Portfolio/Website URL</FormLabel> <FormControl><Input placeholder="https://yourportfolio.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="githubUrl" render={({ field }) => ( <FormItem> <FormLabel>GitHub Profile URL</FormLabel> <FormControl><Input placeholder="https://github.com/yourusername" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="flex items-center"><SmileIcon className="mr-2 h-5 w-5 text-primary" /> Presence & Status</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <FormField control={form.control} name="customStatusEmoji" render={({ field }) => ( <FormItem> <FormLabel>Status Emoji</FormLabel> <FormControl><Input placeholder="💡 e.g., 🧠, ☕, 🎨" {...field} /></FormControl> <FormDescription>A single emoji or short symbol.</FormDescription> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="customStatusText" render={({ field }) => ( <FormItem> <FormLabel>Status Text</FormLabel> <FormControl><Input placeholder="e.g., Working on a new feature" {...field} /></FormControl> <FormDescription>What are you up to? (Max 100 chars)</FormDescription> <FormMessage /> </FormItem> )} />
            </CardContent>
          </Card>

          <Card>
             <CardHeader><CardTitle className="flex items-center"><SettingsIcon className="mr-2 h-5 w-5 text-primary"/>Settings</CardTitle></CardHeader>
             <CardContent className="space-y-8">
                <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center"><EyeIcon className="mr-2 h-5 w-5 text-muted-foreground" /> Profile Visibility</h3>
                    <FormField control={form.control} name="profileVisibility" render={({ field }) => ( <FormItem> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl><SelectTrigger><SelectValue placeholder="Select profile visibility" /></SelectTrigger></FormControl> <SelectContent> <SelectItem value="Public"><EyeIcon className="inline-block mr-2 h-4 w-4" />Public</SelectItem> <SelectItem value="Connections Only"><UsersIcon className="inline-block mr-2 h-4 w-4" />Connections Only</SelectItem> <SelectItem value="Private"><UserIcon className="inline-block mr-2 h-4 w-4" />Private</SelectItem> </SelectContent> </Select> <FormDescription>Control who can see your profile.</FormDescription> <FormMessage /> </FormItem> )} />
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center"><BellIcon className="mr-2 h-5 w-5 text-muted-foreground" /> Notification Preferences</h3>
                    <div className="space-y-4">
                        <FormField control={form.control} name="notifyOnNewMessages" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel className="text-base">Direct Messages</FormLabel><FormDescription>Receive notifications for new direct messages.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name="notifyOnJobPosts" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel className="text-base">Relevant Job/Project Posts</FormLabel><FormDescription>Get notified about new job or project opportunities.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name="notifyOnNewFollowers" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel className="text-base">New Connections/Followers</FormLabel><FormDescription>Be notified when someone connects or follows you.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name="doNotDisturb" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"><div className="space-y-0.5"><FormLabel className="text-base">Do Not Disturb</FormLabel><FormDescription>Mute all notifications.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem> )} />
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center"><LockIcon className="mr-2 h-5 w-5 text-muted-foreground" /> Security</h3>
                    <div className="space-y-4">
                        <FormField control={form.control} name="currentPassword" render={({ field }) => ( <FormItem> <FormLabel>Current Password</FormLabel> <FormControl><Input type="password" placeholder="Enter current password" {...field} autoComplete="current-password"/></FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="newPassword" render={({ field }) => ( <FormItem> <FormLabel>New Password</FormLabel> <FormControl><Input type="password" placeholder="Enter new password" {...field} autoComplete="new-password"/></FormControl> <FormDescription>Must be at least 8 characters.</FormDescription> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => ( <FormItem> <FormLabel>Confirm New Password</FormLabel> <FormControl><Input type="password" placeholder="Confirm new password" {...field} autoComplete="new-password"/></FormControl> <FormMessage /> </FormItem> )} />
                    </div>
                </div>
             </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
    
