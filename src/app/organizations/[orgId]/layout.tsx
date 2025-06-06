
// src/app/organizations/[orgId]/layout.tsx
"use client";

import * as React from "react";
import OrganizationSidebar from "@/components/layout/organization-sidebar";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar"; // Import SidebarTrigger
import { Button } from "@/components/ui/button"; // Import Button for styling the trigger
import { MenuIcon } from "lucide-react"; // Import MenuIcon

// Sample data - in a real app, you'd fetch this based on orgId
const sampleOrganizations = [
  { id: "org_123", name: "Innovatech Solutions", logoUrl: "https://placehold.co/100x100.png?text=IS", logoAiHint: "company logo abstract" },
  { id: "org_456", name: "GreenFuture 🌱", logoUrl: "https://placehold.co/100x100.png?text=GF", logoAiHint: "nature logo" },
];

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const orgId = params.orgId as string;

  // Find the organization data - replace with actual data fetching
  const organization = sampleOrganizations.find(org => org.id === orgId) || 
                       { id: orgId, name: "Organization Not Found", logoUrl: "https://placehold.co/100x30.png?text=Error", logoAiHint:"error icon" };

  return (
    <div className="flex min-h-screen">
      <OrganizationSidebar 
        organizationName={organization.name} 
        organizationLogoUrl={organization.logoUrl} 
        organizationLogoAiHint={organization.logoAiHint} 
        orgId={orgId} 
      />
      <main className="flex-1 flex flex-col bg-background overflow-y-auto">
        {/* Mobile Header with Menu Trigger */}
        <div className="md:hidden sticky top-0 z-20 flex items-center justify-between p-2 border-b bg-card/95 backdrop-blur-sm">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle Organization Menu</span>
            </Button>
          </SidebarTrigger>
          <span className="text-sm font-semibold truncate pr-2">{organization.name}</span>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6">
            {children}
        </div>
      </main>
    </div>
  );
}
