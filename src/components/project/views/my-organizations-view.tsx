
// src/components/project/views/my-organizations-view.tsx
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation'; // For potential navigation
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LayoutGridIcon, BuildingIcon, PlusCircleIcon, EyeIcon, LogOutIcon } from "lucide-react";
import type { ProjectWorkspaceView } from "@/app/projects/page";

interface OrganizationEntry {
  id: string;
  name: string;
  type: string; // e.g., Startup, Community
  members: number; // Conceptual count
  logoUrl?: string;
  logoAiHint?: string;
}

// Sample data - in a real app, this would be fetched based on the current user
const sampleUserOrganizations: OrganizationEntry[] = [
  { id: "org_123", name: "Innovatech Solutions", type: "Startup", members: 25, logoUrl: "https://placehold.co/40x40.png?text=IS", logoAiHint: "tech logo" },
  { id: "org_456", name: "GreenFuture 🌱", type: "Non-Profit", members: 12, logoUrl: "https://placehold.co/40x40.png?text=GF", logoAiHint: "nature logo" },
  { id: "org_personal_workspace", name: "My Personal Workspace", type: "Personal", members: 1, logoUrl: "https://placehold.co/40x40.png?text=MP", logoAiHint: "user icon" },
];

interface MyOrganizationsViewProps {
  setActiveView: (view: ProjectWorkspaceView) => void;
}

export default function MyOrganizationsView({ setActiveView }: MyOrganizationsViewProps) {
  const router = useRouter();

  const handleViewOrganization = (orgId: string) => {
    router.push(`/organizations/${orgId}`);
  };

  return (
    <Card className="h-full flex flex-col shadow-xl rounded-xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
                <CardTitle className="text-2xl font-bold flex items-center">
                <LayoutGridIcon className="mr-2 h-6 w-6 text-primary" /> My Organizations
                </CardTitle>
                <CardDescription>
                A list of organizations you have created or joined.
                </CardDescription>
            </div>
            <Button onClick={() => setActiveView("create-organization")}>
                <PlusCircleIcon className="mr-2 h-4 w-4"/> Create New Organization
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 md:p-6">
        {sampleUserOrganizations.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Logo</TableHead>
                <TableHead>Organization Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUserOrganizations.map((org) => (
                <TableRow key={org.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="h-8 w-8 bg-muted rounded-sm flex items-center justify-center border">
                        {org.logoUrl ? (
                             <img src={org.logoUrl} alt={`${org.name} logo`} data-ai-hint={org.logoAiHint} className="h-full w-full object-contain rounded-sm"/>
                        ) : (
                            <BuildingIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{org.name}</TableCell>
                  <TableCell><Badge variant="outline">{org.type}</Badge></TableCell>
                  <TableCell className="text-center">{org.members.toLocaleString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewOrganization(org.id)}>
                      <EyeIcon className="mr-1.5 h-3.5 w-3.5"/> View
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => alert(`Conceptual: Leave organization ${org.name}`)} disabled={org.type === 'Personal'}>
                        <LogOutIcon className="mr-1.5 h-3.5 w-3.5"/> Leave
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <BuildingIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">No organizations found.</p>
            <p className="text-sm text-muted-foreground/80">Create or join an organization to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
