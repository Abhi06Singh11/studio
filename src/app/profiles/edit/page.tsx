
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeftIcon, UserIcon, BriefcaseIcon, GraduationCapIcon, LinkIcon, EyeIcon, UploadCloudIcon, BuildingIcon, DollarSignIcon, LightbulbIcon, UsersIcon, LockIcon, SmileIcon } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
  bio: z.string().max(500, "Bio must be at most 500 characters.").optional().or(z.literal('')),
  location: z.string().max(100, "Location must be at most 100 characters.").optional().or(z.literal('')),
  profilePictureUrl: z.string().url("Please enter a valid URL for profile picture.").optional().or(z.literal('')),
  role: z.enum(["Developer", "Entrepreneur", "Investor", "General"]),
  
  customStatusEmoji: z.string().max(10, "Emoji should be a short text or emoji character.").optional().or(z.literal('')),
  customStatusText: z.string().max(100, "Status text must be at most 100 characters.").optional().or(z.literal('')),

  // Developer specific
  skills: z.string().optional(), // comma separated
  tools: z.string().optional(), // comma separated
  
  // Entrepreneur specific
  startupName: z.string().optional(),
  ideaSummary: z.string().max(1000, "Idea summary must be at most 1000 characters.").optional().or(z.literal('')),
  pitchDeckUrl: z.string().url("Please enter a valid URL for pitch deck.").optional().or(z.literal('')),

  // Investor specific
  investmentInterests: z.string().optional(), // comma separated

  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL.").optional().or(z.literal('')),
  portfolioWebsiteUrl: z.string().url("Please enter a valid Portfolio/Website URL.").optional().or(z.literal('')),
  githubUrl: z.string().url("Please enter a valid GitHub URL.").optional().or(z.literal('')),

  profileVisibility: z.enum(["Public", "Private", "Connections Only"]),

  // Password change fields
  currentPassword: z.string().optional().or(z.literal('')),
  newPassword: z.string().optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  if (data.newPassword && data.newPassword.length > 0) { // User intends to change password
    if (!data.currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Current password is required to set a new password.",
        path: ["currentPassword"],
      });
    }
    if (data.newPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: "string",
        inclusive: true,
        message: "New password must be at least 8 characters.",
        path: ["newPassword"],
      });
    }
    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please confirm your new password.",
        path: ["confirmPassword"],
      });
    } else if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  }
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  bio: "",
  location: "",
  profilePictureUrl: "",
  role: "Developer",
  customStatusEmoji: "",
  customStatusText: "",
  skills: "",
  tools: "",
  startupName: "",
  ideaSummary: "",
  pitchDeckUrl: "",
  investmentInterests: "",
  linkedinUrl: "",
  portfolioWebsiteUrl: "",
  githubUrl: "",
  profileVisibility: "Public",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ProfileEditPage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedRole = form.watch("role");

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you'd send this data to your backend
    // For password change, you'd typically make a separate API call
    const { currentPassword, newPassword, confirmPassword, ...profileData } = data;
    console.log("Profile Data:", profileData);
    if (newPassword && currentPassword) {
      console.log("Password Change Attempted (UI only):", { currentPassword, newPassword });
    }
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been saved.",
    });
  }

  return (
    <div className="space-y-6">
       <Link href="/profiles" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
         <ArrowLeftIcon className="mr-2 h-4 w-4" />
         Back to Profiles
       </Link>
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Manage your professional information and how others see you on CodeSphere.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Dr. Elara Vance" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input placeholder="https://example.com/your-image.png" {...field} />
                    </FormControl>
                    <FormDescription>Link to your hosted profile picture.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us a bit about yourself..." className="resize-y min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary role" />
                        </SelectTrigger>
                      </FormControl>
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

              <h3 className="text-lg font-medium border-t pt-6 flex items-center">
                <SmileIcon className="mr-2 h-5 w-5 text-primary" /> Presence & Status
              </h3>
              <FormField
                control={form.control}
                name="customStatusEmoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Emoji</FormLabel>
                    <FormControl>
                      <Input placeholder="💡 e.g., 🧠, ☕, 🎨" {...field} />
                    </FormControl>
                    <FormDescription>A single emoji or short symbol for your status.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customStatusText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Text</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Working on a new feature" {...field} />
                    </FormControl>
                    <FormDescription>What are you currently up to? (Max 100 characters)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {watchedRole === "Developer" && (
                <>
                 <h3 className="text-lg font-medium border-t pt-6 flex items-center">
                    <BriefcaseIcon className="mr-2 h-5 w-5 text-primary" /> Developer Details
                 </h3>
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., JavaScript, React, Node.js" {...field} />
                        </FormControl>
                        <FormDescription>Comma-separated list of your technical skills.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tools"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tools & Technologies</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., VS Code, Docker, AWS" {...field} />
                        </FormControl>
                        <FormDescription>Comma-separated list of tools you use.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {watchedRole === "Entrepreneur" && (
                <>
                  <h3 className="text-lg font-medium border-t pt-6 flex items-center">
                    <LightbulbIcon className="mr-2 h-5 w-5 text-primary" /> Entrepreneur Details
                  </h3>
                  <FormField
                    control={form.control}
                    name="startupName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., DevOptimize Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ideaSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idea Summary / Elevator Pitch</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Briefly describe your startup or idea..." className="resize-y min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="pitchDeckUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pitch Deck URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/your-pitch-deck.pdf" {...field} />
                        </FormControl>
                        <FormDescription>Link to your hosted pitch deck.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

            {watchedRole === "Investor" && (
              <>
                <h3 className="text-lg font-medium border-t pt-6 flex items-center">
                    <DollarSignIcon className="mr-2 h-5 w-5 text-primary" /> Investor Details
                </h3>
                <FormField
                  control={form.control}
                  name="investmentInterests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Interests</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., AI, SaaS, FinTech" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated list of your investment interests.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
              )}
              
              <h3 className="text-lg font-medium border-t pt-6 flex items-center">
                <LinkIcon className="mr-2 h-5 w-5 text-primary" /> Social Links
              </h3>
               <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolioWebsiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio/Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourportfolio.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Profile URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/yourusername" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-t pt-6 flex items-center">
                <EyeIcon className="mr-2 h-5 w-5 text-primary" /> Settings
              </h3>
              <FormField
                control={form.control}
                name="profileVisibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Visibility</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select profile visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Public"><EyeIcon className="inline-block mr-2 h-4 w-4" />Public</SelectItem>
                          <SelectItem value="Connections Only"><UsersIcon className="inline-block mr-2 h-4 w-4" />Connections Only</SelectItem>
                          <SelectItem value="Private"><UserIcon className="inline-block mr-2 h-4 w-4" />Private</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormDescription>Control who can see your profile.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-t pt-6 flex items-center">
                <LockIcon className="mr-2 h-5 w-5 text-primary" /> Security
              </h3>
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="Enter current password" {...field} autoComplete="current-password"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="Enter new password" {...field} autoComplete="new-password"/>
                        </FormControl>
                        <FormDescription>Must be at least 8 characters.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="Confirm new password" {...field} autoComplete="new-password"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/profiles">Cancel</Link>
                </Button>
                <Button type="submit">Save Profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}


    