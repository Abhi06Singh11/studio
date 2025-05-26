
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
  DialogTrigger,
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
import { toast } from "@/hooks/use-toast";
import { BuildingIcon } from "lucide-react";

const organizationFormSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  industry: z.string().min(2, {
    message: "Industry must be at least 2 characters.",
  }),
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
    },
  });

  function onSubmit(data: OrganizationFormValues) {
    // In a real app, you would call a Firebase function here
    // For now, we'll log the conceptual data structure
    const newOrgId = `org_${Date.now()}`; // Simulate generating an ID
    const organizationData = {
      id: newOrgId,
      name: data.name,
      industry: data.industry,
      ownerId: MOCK_USER_ID, // Replace with actual authenticated user ID
      createdAt: new Date().toISOString(), // Conceptual: use serverTimestamp in Firestore
      members: {
        [MOCK_USER_ID]: "owner", // Add creator as owner
      },
    };

    const userProfileUpdate = {
      userId: MOCK_USER_ID,
      orgIds_add: newOrgId, // Conceptual: use arrayUnion(newOrgId) in Firestore
    };

    console.log("Conceptual Firestore: Create Organization Document (/organizations):", organizationData);
    console.log("Conceptual Firestore: Update User Document (/users):", userProfileUpdate);

    toast({
      title: "Organization Created (Conceptually)!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify({ name: data.name, industry: data.industry }, null, 2)}</code>
        </pre>
      ),
    });
    onOpenChange(false); // Close modal on submit
    form.reset(); // Reset form
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
                  <FormControl>
                    <Input placeholder="e.g., Technology, Finance, Healthcare" {...field} />
                  </FormControl>
                  <FormDescription>
                    What industry does your organization operate in?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
