
// src/app/organizations/[orgId]/settings/page.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams } from 'next/navigation';
import Image from "next/image";

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
import { toast } from "@/hooks/use-toast";
import { BuildingIcon, GlobeIcon, UsersIcon, Trash2Icon, UploadCloudIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DeleteOrganizationModal from "@/components/organization/delete-organization-modal";

const standardIndustries = [
  "Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail", 
  "Construction", "Transportation & Logistics", "Energy & Utilities", "Media & Entertainment", 
  "Real Estate", "Government & Public Sector", "Hospitality & Tourism", "Legal Services", 
  "Non-Profit / NGO", "Agriculture", "Telecommunications", "Insurance", 
  "Pharmaceuticals", "Automotive", "Other",
];

const teamSizeOptions = [
  "1-10 employees", "11-50 employees", "51-200 employees", 
  "201-500 employees", "501-1000 employees", "1000+ employees"
];

const orgSettingsFormSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters."),
  logoUrl: z.string().url("Please enter a valid URL for the logo.").optional().or(z.literal('')),
  description: z.string().max(1000, "Description must be at most 1000 characters.").optional().or(z.literal('')),
  website: z.string().url("Please enter a valid website URL.").optional().or(z.literal('')),
  industry: z.string().min(1, "Industry is required."),
  customIndustry: z.string().optional().or(z.literal('')),
  teamSize: z.string().optional().or(z.literal('')),
  location: z.string().max(100, "Location must be at most 100 characters.").optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  if (data.industry === "Other" && (!data.customIndustry || data.customIndustry.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Custom industry name must be at least 2 characters.",
      path: ["customIndustry"],
    });
  }
});

type OrgSettingsFormValues = z.infer<typeof orgSettingsFormSchema>;

// Sample data for an organization - in a real app, this would be fetched
const sampleOrgData: OrgSettingsFormValues = {
  name: "Innovatech Solutions",
  logoUrl: "https://placehold.co/150x150.png?text=IS",
  description: "Pioneering the future of AI-driven development tools and collaborative platforms.",
  website: "https://innovatech.example.com",
  industry: "Technology",
  teamSize: "11-50 employees",
  location: "San Francisco, CA",
};

export default function OrganizationSettingsPage() {
  const params = useParams();
  const orgId = params.orgId as string; // In a real app, use this to fetch/update the specific org

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const form = useForm<OrgSettingsFormValues>({
    resolver: zodResolver(orgSettingsFormSchema),
    defaultValues: sampleOrgData, // Pre-fill with fetched org data
    mode: "onChange",
  });

  const watchedLogoUrl = form.watch("logoUrl");
  const watchedIndustry = form.watch("industry");

  function onSubmit(data: OrgSettingsFormValues) {
    const industryValue = data.industry === "Other" ? data.customIndustry : data.industry;
    const finalData = { ...data, industry: industryValue, customIndustry: undefined };
    
    console.log("Organization Settings to Save (Conceptual Firestore Update for orgId:", orgId, "):", finalData);
    toast({
      title: "Organization Settings Updated!",
      description: "Your organization's information has been (conceptually) saved.",
    });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Organization Settings</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><BuildingIcon className="mr-2 h-5 w-5 text-primary"/>Organization Profile</CardTitle>
              <CardDescription>Manage your organization's public information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Organization Name</FormLabel> <FormControl><Input placeholder="e.g., Innovatech Solutions" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              
              <FormField control={form.control} name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <div className="flex items-center gap-4">
                      <FormControl className="flex-grow">
                        <Input placeholder="https://example.com/logo.png" {...field} />
                      </FormControl>
                       <Button type="button" variant="outline" size="sm" disabled>
                         <UploadCloudIcon className="mr-2 h-4 w-4"/> Upload
                       </Button>
                    </div>
                    {watchedLogoUrl && (
                      <div className="mt-2 w-24 h-24 relative rounded-md overflow-hidden border bg-muted">
                        <Image src={watchedLogoUrl} alt="Logo preview" layout="fill" objectFit="contain" data-ai-hint="company logo"/>
                      </div>
                    )}
                    <FormDescription>Link to your organization's logo. (Conceptual upload)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>About / Description</FormLabel> <FormControl><Textarea placeholder="Tell us about your organization..." className="resize-y min-h-[100px]" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
              <FormField control={form.control} name="website" render={({ field }) => ( <FormItem> <FormLabel>Website URL</FormLabel> <FormControl><Input placeholder="https://example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              
              <FormField control={form.control} name="industry"
                render={({ field }) => (
                  <FormItem> <FormLabel>Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger></FormControl>
                      <SelectContent> {standardIndustries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)} </SelectContent>
                    </Select> <FormMessage />
                  </FormItem>
                )}
              />
              {watchedIndustry === "Other" && (
                <FormField control={form.control} name="customIndustry" render={({ field }) => ( <FormItem> <FormLabel>Custom Industry</FormLabel> <FormControl><Input placeholder="Enter your organization's industry" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              )}

              <FormField control={form.control} name="teamSize" render={({ field }) => ( <FormItem> <FormLabel>Team Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select team size" /></SelectTrigger></FormControl>
                      <SelectContent> {teamSizeOptions.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)} </SelectContent>
                    </Select> <FormMessage /> </FormItem>
                )}
              />
              <FormField control={form.control} name="location" render={({ field }) => ( <FormItem> <FormLabel>Location / Headquarters</FormLabel> <FormControl><Input placeholder="e.g., San Francisco, CA" {...field} /></FormControl> <FormMessage /> </FormItem>)} />
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Separator />

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive"><Trash2Icon className="mr-2 h-5 w-5"/>Danger Zone</CardTitle>
          <CardDescription>Manage dangerous actions for your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-destructive/30 rounded-md bg-destructive/5">
            <div>
                <h3 className="font-semibold text-destructive">Delete this organization</h3>
                <p className="text-sm text-destructive/80 max-w-md">Once you delete an organization, there is no going back. All associated data, projects, and member information will be permanently removed. Please be certain.</p>
            </div>
            <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>Delete Organization</Button>
          </div>
        </CardContent>
      </Card>

      <DeleteOrganizationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        organizationName={sampleOrgData.name} // Pass the current org name
        onConfirmDelete={() => {
          console.log(`Conceptual: Delete organization ${orgId} confirmed.`);
          setIsDeleteModalOpen(false);
          toast({ title: "Organization Deleted (Conceptually)", description: `${sampleOrgData.name} has been removed.` });
          // In a real app, redirect user, e.g., to /projects or dashboard
        }}
      />
    </div>
  );
}
