
// src/components/project/views/join-organization-view.tsx
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
import { toast } from "@/hooks/use-toast";
import { LogInIcon, UsersIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const rolesInOrg = ["Developer", "Contributor", "Manager", "Observer", "Other"] as const;

const joinOrgFormSchema = z.object({
  orgIdentifier: z.string().min(3, "Please enter an organization name or invite code."),
  role: z.enum(rolesInOrg, { required_error: "Please select your intended role." }),
  customRole: z.string().optional(),
  messageToAdmin: z.string().max(500, "Message too long.").optional().or(z.literal('')),
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

export default function JoinOrganizationView() {
  const form = useForm<JoinOrgFormValues>({
    resolver: zodResolver(joinOrgFormSchema),
    defaultValues: {
      orgIdentifier: "",
      role: undefined,
      customRole: "",
      messageToAdmin: "",
    },
  });

  const watchedRole = form.watch("role");

  function onSubmit(data: JoinOrgFormValues) {
     const submissionData = {
      ...data,
      role: data.role === "Other" ? data.customRole || "Other" : data.role,
      userId: "current_user_placeholder_uid", // Placeholder
      requestedAt: new Date().toISOString(),
    };
    console.log("Join Organization Request Data (View):", submissionData);
    toast({
      title: "Join Request Sent (Conceptually)",
      description: `Your request to join organization "${submissionData.orgIdentifier}" has been sent.`,
    });
    form.reset();
    // In a real app, navigate or update UI
  }

  return (
    <Card className="h-full flex flex-col shadow-xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <LogInIcon className="mr-2 h-6 w-6 text-primary" /> Join an Organization
        </CardTitle>
        <CardDescription>
          Request access to an existing organization to collaborate on projects.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="orgIdentifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name or Invite Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter organization name or a specific invite code" {...field} />
                    </FormControl>
                    <FormDescription>
                      If you have an invite code, enter it here for faster access.
                    </FormDescription>
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
                          <SelectValue placeholder="Select the role you are applying for" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rolesInOrg.map(roleOpt => <SelectItem key={roleOpt} value={roleOpt}>{roleOpt}</SelectItem>)}
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
                          <Input placeholder="e.g., Marketing Intern, QA Tester" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
              )}
              <FormField
                control={form.control}
                name="messageToAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message to Admin (Optional)</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Briefly explain why you want to join or mention who referred you..."
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="px-0 pt-6">
                <Button type="submit" size="lg">
                  <UsersIcon className="mr-2 h-5 w-5"/> Request to Join
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
