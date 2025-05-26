
// src/app/projects/create-personal/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, FolderPlusIcon } from "lucide-react";

export default function CreatePersonalProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/projects">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Project Workspaces
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderPlusIcon className="mr-2 h-6 w-6 text-primary" />
            Create New Personal Project
          </CardTitle>
          <CardDescription>
            Define the details for your new personal or general project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a placeholder page for a form to create personal projects.
            The form would typically include fields like Project Name, Description, etc.
          </p>
          {/* Conceptual form fields would go here */}
        </CardContent>
      </Card>
    </div>
  );
}
