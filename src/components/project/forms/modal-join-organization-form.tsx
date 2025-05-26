
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

const rolesInOrg = ["Developer", "Contributor", "Manager", "Observer", "Other"] as const;

const joinOrgFormSchema = z.object({
  orgIdentifier: z.string().min(3, "Please enter an organization name or invite code."),
  role: z.enum(rolesInOrg, { required_error: "Please select your intended role." }),
  customRole: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.role === "Other" && (!data.customRole || data.customRole.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify your custom role.",
      path: ["customRole"],
    });
  }
});

type JoinOrgFormValues = z.infer<typeof joinOrgFormSchema>;

interface ModalJoinOrganizationFormProps {
  onFormSubmit: (data: JoinOrgFormValues) => void;
  onCancel: () => void;
}

export default function ModalJoinOrganizationForm({ onFormSubmit, onCancel }: ModalJoinOrganizationFormProps) {
  const form = useForm<JoinOrgFormValues>({
    resolver: zodResolver(joinOrgFormSchema),
    defaultValues: {
      orgIdentifier: "",
      customRole: "",
    },
  });

  const watchedRole = form.watch("role");

  function onSubmit(data: JoinOrgFormValues) {
     const submissionData = {
      ...data,
      role: data.role === "Other" ? data.customRole || "Other" : data.role,
    };
    console.log("Modal Join Organization Data:", submissionData);
    toast({
      title: "Join Request (Conceptual)",
      description: `Request to join organization "${submissionData.orgIdentifier}" sent.`,
    });
    onFormSubmit(submissionData);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="orgIdentifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name or Invite Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter name or code" {...field} />
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
              <FormLabel>Your Intended Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rolesInOrg.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchedRole === "Other" && (
             <FormField
                control={form.control}
                name="customRole"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Specify Role</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your custom role" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        )}
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Request to Join</Button>
        </div>
      </form>
    </Form>
  );
}
