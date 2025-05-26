
// src/app/organizations/[orgId]/layout.tsx
"use client";

import * as React from "react";
import OrganizationSidebar from "@/components/layout/organization-sidebar";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                       { id: orgId, name: "Organization Not Found", logoUrl: "https://placehold.co/100x30.png?text=Error" };

  return (
    <div className="flex min-h-screen">
      <OrganizationSidebar organizationName={organization.name} organizationLogoUrl={organization.logoUrl} organizationLogoAiHint={organization.logoAiHint} orgId={orgId} />
      <main className="flex-1 p-4 md:p-6 bg-background overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
