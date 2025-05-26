
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { BuildingIcon } from "lucide-react";

const standardIndustries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Construction",
  "Transportation & Logistics",
  "Energy & Utilities",
  "Media & Entertainment",
  "Real Estate",
  "Government & Public Sector",
  "Hospitality & Tourism",
  "Legal Services",
  "Non-Profit / NGO",
  "Agriculture",
  "Telecommunications",
  "Insurance",
  "Pharmaceuticals",
  "Automotive",
  "Other", // Added "Other" for custom input
];

const organizationFormSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  customIndustry: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.industry === "Other") {
    if (!data.customIndustry || data.customIndustry.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Custom industry name must be at least 2 characters.",
        path: ["customIndustry"],
      });
    }
  }
});

type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

// This is a conceptual placeholder for the current user's ID
const MOCK_USER_ID = "user_placeholder_123"; 

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CreateOrganizationModal({ isOpen, onOpenChange }: CreateOrganizationModalProps) {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: "",
      industry: "",
      customIndustry: "",
    },
  });

  const watchedIndustry = form.watch("industry");

  function onSubmit(data: OrganizationFormValues) {
    const industryValue = data.industry === "Other" ? data.customIndustry : data.industry;

    const newOrgId = `org_${Date.now()}`; // Simulate generating an ID
    const organizationData = {
      id: newOrgId,
      name: data.name,
      industry: industryValue,
      ownerId: MOCK_USER_ID, 
      createdAt: new Date().toISOString(), 
      members: {
        [MOCK_USER_ID]: "owner",
      },
    };

    const userProfileUpdate = {
      userId: MOCK_USER_ID,
      orgIds_add: newOrgId, 
    };

    console.log("Conceptual Firestore: Create Organization Document (/organizations):", organizationData);
    console.log("Conceptual Firestore: Update User Document (/users):", userProfileUpdate);

    toast({
      title: "Organization Created (Conceptually)!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify({ name: data.name, industry: industryValue }, null, 2)}</code>
        </pre>
      ),
    });
    onOpenChange(false); 
    form.reset(); 
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BuildingIcon className="mr-2 h-5 w-5 text-primary" />
            Create New Organization
          </DialogTitle>
          <DialogDescription>
            Set up a new workspace for your team or company.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Innovatech Solutions" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the public name of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your organization's industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {standardIndustries.map((industryName) => (
                        <SelectItem key={industryName} value={industryName}>
                          {industryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Which industry does your organization belong to?
                  </FormDescription>
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
                    <FormLabel>Custom Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your organization's industry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Organization</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
