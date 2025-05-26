
// src/app/organizations/[orgId]/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircleIcon, UserPlusIcon, Edit3Icon, BriefcaseIcon, UsersIcon, FolderKanbanIcon, SettingsIcon, BuildingIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import Image from "next/image";

// Sample data - in a real app, you'd fetch this based on orgId
const sampleOrganizationsData = {
  "org_123": { 
    id: "org_123", 
    name: "Innovatech Solutions", 
    logoUrl: "https://placehold.co/64x64.png?text=IS",
    logoAiHint: "company logo abstract",
    description: "Pioneering the future of AI-driven development tools and collaborative platforms.",
    recentActivity: [
      { id: "act1", text: "New project 'Phoenix Initiative' created by @elara.", timestamp: "2 hours ago" },
      { id: "act2", text: "@marcus_chen invited to join 'Phoenix Initiative'.", timestamp: "1 hour ago" },
      { id: "act3", text: "Organization profile updated by @admin_user.", timestamp: "Yesterday" },
    ]
  },
   "org_456": { 
    id: "org_456", 
    name: "GreenFuture 🌱", 
    logoUrl: "https://placehold.co/64x64.png?text=GF",
    logoAiHint: "nature logo",
    description: "Dedicated to building sustainable technology solutions for a greener tomorrow.",
    recentActivity: [
      { id: "act_gf1", text: "Team meeting scheduled for 'Solar Panel Efficiency Project'.", timestamp: "30 mins ago"},
      { id: "act_gf2", text: "New member @sara_eco joined.", timestamp: "4 hours ago"},
    ]
  },
};

export default function OrganizationHomePage() {
  const params = useParams();
  const orgId = params.orgId as string;

  // Fetch organization data based on orgId
  // For MVP, using sample data. If not found, provide a default.
  const organization = sampleOrganizationsData[orgId as keyof typeof sampleOrganizationsData] || 
                       { id: orgId, name: "Organization Dashboard", description: "Manage your organization's projects, members, and settings.", recentActivity: [], logoUrl: "", logoAiHint: ""};
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b">
        <div className="flex items-center gap-4">
            {organization.logoUrl && (
                 <Image src={organization.logoUrl} alt={`${organization.name} logo`} data-ai-hint={organization.logoAiHint || "logo"} width={64} height={64} className="rounded-md border bg-card p-1" />
            )}
            {!organization.logoUrl && (
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center border">
                    <BuildingIcon className="h-8 w-8 text-muted-foreground" />
                </div>
            )}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{organization.name}</h1>
                <p className="text-muted-foreground max-w-xl">{organization.description}</p>
            </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button asChild>
            <Link href={`/organizations/${orgId}/projects/create`}><PlusCircleIcon className="mr-2 h-4 w-4" /> Create Project</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/organizations/${orgId}/invites`}><UserPlusIcon className="mr-2 h-4 w-4" /> Invite Members</Link>
          </Button>
           <Button variant="secondary" asChild>
            <Link href={`/organizations/${orgId}/settings`}><Edit3Icon className="mr-2 h-4 w-4" /> Edit Profile</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates within your organization.</CardDescription>
          </CardHeader>
          <CardContent>
            {organization.recentActivity.length > 0 ? (
              <ul className="space-y-3">
                {organization.recentActivity.map((activity) => (
                  <li key={activity.id} className="text-sm text-muted-foreground p-2 rounded-md hover:bg-muted/50">
                    <span className="font-medium text-foreground">{activity.text}</span> - <span className="text-xs">{activity.timestamp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild><Link href={`/organizations/${orgId}/projects`}><FolderKanbanIcon className="mr-2 h-4 w-4" /> View Projects</Link></Button>
            <Button variant="ghost" className="w-full justify-start" asChild><Link href={`/organizations/${orgId}/members`}><UsersIcon className="mr-2 h-4 w-4" /> Manage Members</Link></Button>
            <Button variant="ghost" className="w-full justify-start" asChild><Link href={`/organizations/${orgId}/settings`}><SettingsIcon className="mr-2 h-4 w-4" /> Organization Settings</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
