
// src/components/project/views/create-organization-view.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea"; // Not used in this simplified form view
import { toast } from "@/hooks/use-toast";
import { BuildingIcon, PlusCircleIcon } from "lucide-react";

const organizationTypes = ["Startup", "NGO", "Community", "Company", "Other"] as const;
const industries = ["Technology", "Healthcare", "Finance", "Education", "Retail", "Other"] as const;

const organizationFormSchema = z.object({
  orgName: z.string().min(2, "Organization name must be at least 2 characters."),
  industry: z.enum(industries, { required_error: "Please select an industry." }),
  customIndustry: z.string().optional(),
  orgType: z.enum(organizationTypes, { required_error: "Please select an organization type." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  contactEmail: z.string().email({ message: "Please enter a valid email." }),
  country: z.string().min(2, "Country is required."),
  // logoUrl: z.string().url().optional().or(z.literal('')), // Conceptual
}).superRefine((data, ctx) => {
  if (data.industry === "Other" && (!data.customIndustry || data.customIndustry.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Custom industry name must be at least 2 characters.",
      path: ["customIndustry"],
    });
  }
});

type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

export default function CreateOrganizationView() {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      orgName: "",
      industry: undefined,
      customIndustry: "",
      orgType: undefined,
      website: "",
      contactEmail: "",
      country: "",
    },
  });

  const watchedIndustry = form.watch("industry");

  function onSubmit(data: OrganizationFormValues) {
    const submissionData = {
      ...data,
      industry: data.industry === "Other" ? data.customIndustry || "Other" : data.industry,
    };
    console.log("Create Organization Data (View):", submissionData);
    toast({
      title: "Organization Created (Conceptually)!",
      description: `Organization "${submissionData.orgName}" has been set up.`,
    });
    form.reset();
    // In a real app, navigate to My Organizations or the new org page
    // Example: router.push('/projects?view=my-organizations');
  }

  return (
    <Card className="h-full flex flex-col shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <BuildingIcon className="mr-2 h-6 w-6 text-primary" /> Create New Organization
        </CardTitle>
        <CardDescription>
          Set up a new workspace for your team or company. This will be a dedicated space for collaboration.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="orgName" render={({ field }) => ( <FormItem> <FormLabel>Organization Name</FormLabel> <FormControl><Input placeholder="e.g., Codesphere Labs" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            
            <FormField 
              control={form.control} 
              name="industry" 
              render={({ field }) => ( 
                <FormItem> 
                  <FormLabel>Industry</FormLabel> 
                  <Select onValueChange={field.onChange} defaultValue={field.value}> 
                    <FormControl><SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger></FormControl> 
                    <SelectContent> 
                      {industries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)} 
                    </SelectContent> 
                  </Select> 
                  <FormMessage /> 
                </FormItem> 
              )} 
            />
            {watchedIndustry === "Other" && ( 
              <FormField 
                control={form.control} 
                name="customIndustry" 
                render={({ field }) => ( 
                  <FormItem> 
                    <FormLabel>Custom Industry Name</FormLabel> 
                    <FormControl><Input placeholder="Enter your industry" {...field} /></FormControl> 
                    <FormMessage /> 
                  </FormItem> 
                )} 
              /> 
            )}
            
            <FormField 
              control={form.control} 
              name="orgType" 
              render={({ field }) => ( 
                <FormItem> 
                  <FormLabel>Organization Type</FormLabel> 
                  <Select onValueChange={field.onChange} defaultValue={field.value}> 
                    <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl> 
                    <SelectContent> 
                      {organizationTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)} 
                    </SelectContent> 
                  </Select> 
                  <FormMessage /> 
                </FormItem> 
              )} 
            />
            
            <FormField control={form.control} name="website" render={({ field }) => ( <FormItem> <FormLabel>Website (Optional)</FormLabel> <FormControl><Input placeholder="https://www.codesphere.io" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="contactEmail" render={({ field }) => ( <FormItem> <FormLabel>Contact Email</FormLabel> <FormControl><Input type="email" placeholder="contact@codesphere.io" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="country" render={({ field }) => ( <FormItem> <FormLabel>Country</FormLabel> <FormControl><Input placeholder="e.g., United States" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
            
            <FormItem> 
              <FormLabel>Company Logo (Conceptual)</FormLabel> 
              <FormControl>
                <Input type="text" placeholder="Enter logo URL (e.g., https://.../logo.png)" disabled /> 
              </FormControl>
              <FormDescription>Direct URL to your company logo. File upload coming soon.</FormDescription>
            </FormItem>
            
            <CardFooter className="px-0 pt-6">
              <Button type="submit" size="lg"> 
                <PlusCircleIcon className="mr-2 h-5 w-5"/> Create Organization 
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
