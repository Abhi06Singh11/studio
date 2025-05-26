
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const organizationTypes = ["Startup", "NGO", "Community", "Company", "Other"] as const;
const industries = ["Technology", "Healthcare", "Finance", "Education", "Retail", "Other"] as const;

const createOrgFormSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters."),
  industry: z.enum(industries, { required_error: "Please select an industry." }),
  customIndustry: z.string().optional(),
  type: z.enum(organizationTypes, { required_error: "Please select an organization type." }),
}).superRefine((data, ctx) => {
  if (data.industry === "Other" && (!data.customIndustry || data.customIndustry.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Custom industry name must be at least 2 characters.",
      path: ["customIndustry"],
    });
  }
});

type CreateOrgFormValues = z.infer<typeof createOrgFormSchema>;

interface ModalCreateOrganizationFormProps {
  onFormSubmit: (data: CreateOrgFormValues) => void;
  onCancel: () => void;
}

export default function ModalCreateOrganizationForm({ onFormSubmit, onCancel }: ModalCreateOrganizationFormProps) {
  const form = useForm<CreateOrgFormValues>({
    resolver: zodResolver(createOrgFormSchema),
    defaultValues: {
      name: "",
      customIndustry: "",
    },
  });

  const watchedIndustry = form.watch("industry");

  function onSubmit(data: CreateOrgFormValues) {
    const submissionData = {
      ...data,
      industry: data.industry === "Other" ? data.customIndustry || "Other" : data.industry,
    };
    console.log("Modal Create Organization Data:", submissionData);
    toast({
      title: "Organization Creation (Conceptual)",
      description: `Org "${submissionData.name}" ready to be created.`,
    });
    onFormSubmit(submissionData); // Propagate submission
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Innovatech Solutions" {...field} />
              </FormControl>
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
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
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
                    <FormControl>
                    <Input placeholder="Enter your industry" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        )}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organizationTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Organization</Button>
        </div>
      </form>
    </Form>
  );
}
