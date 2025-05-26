
// src/app/organizations/[orgId]/invites/page.tsx
"use client";

import * as React from "react";
import { useParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MailPlusIcon, SendIcon, UserPlusIcon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const inviteFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(["member", "admin"], { required_error: "Please select a role for the invitee." }),
});

type InviteFormValues = z.infer<typeof inviteFormSchema>;

// Sample data for existing invitations - replace with actual data fetching
const sampleExistingInvites = [
  { id: "invite1", email: "pending.user@example.com", role: "member" as const, status: "pending" as const, invitedOn: "2024-07-20" },
  { id: "invite2", email: "accepted.admin@example.com", role: "admin" as const, status: "accepted" as const, invitedOn: "2024-07-18" },
  { id: "invite3", email: "another.pending@example.com", role: "member" as const, status: "pending" as const, invitedOn: "2024-07-21" },
];

export default function OrganizationInvitesPage() {
  const params = useParams();
  const orgId = params.orgId as string;
  const sampleOrgName = `Organization ${orgId.substring(orgId.length - 3)}`; // Keep consistent naming for display

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  function onSubmit(data: InviteFormValues) {
    // Conceptual: In a real app, you'd call a Firebase function or use the SDK here
    const newInviteData = {
      orgId: orgId,
      email: data.email,
      role: data.role,
      createdBy: "current_user_uid_placeholder", // Replace with actual current user ID
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("Conceptual Firestore: Create document in /organizationInvites:", newInviteData);
    toast({
      title: "Invitation Sent (Conceptually)!",
      description: `Invited ${data.email} as a ${data.role} to ${sampleOrgName}.`,
    });
    form.reset(); // Reset form after submission
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <MailPlusIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invitations for {sampleOrgName}</h1>
          <p className="text-muted-foreground">Manage pending and sent invitations for your organization.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><UserPlusIcon className="mr-2 h-5 w-5 text-primary"/>Send New Invitation</CardTitle>
          <CardDescription>Invite new members to join {sampleOrgName}.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="invitee@example.com" {...field} />
                    </FormControl>
                    <FormDescription>The email address of the person you want to invite.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The role the invited person will have in the organization.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">
                <SendIcon className="mr-2 h-4 w-4" /> Send Invitation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Invitations</CardTitle>
          <CardDescription>View the status of invitations sent for {sampleOrgName}.</CardDescription>
        </CardHeader>
        <CardContent>
          {sampleExistingInvites.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invited On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleExistingInvites.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell className="font-medium">{invite.email}</TableCell>
                    <TableCell className="capitalize">{invite.role}</TableCell>
                    <TableCell>
                      <Badge variant={invite.status === "pending" ? "secondary" : "default"}>
                        {invite.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invite.invitedOn}</TableCell>
                    <TableCell className="text-right">
                      {invite.status === "pending" && (
                        <Button variant="outline" size="sm" onClick={() => console.log("Conceptual: Resend invite for", invite.email)}>
                          Resend
                        </Button>
                        // In a real app, you might have a cancel button too
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No invitations have been sent yet for this organization.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
