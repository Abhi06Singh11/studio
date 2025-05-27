
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { BriefcaseIcon, FolderKanbanIcon, FileTextIcon } from "lucide-react";

interface SavedItemCardProps {
  Icon: LucideIcon;
  title: string;
  company: string;
  location: string;
  statusText: string;
  actionText: string;
  actionHref: string;
  itemType: "Job" | "Project" | "Article" | "Other";
}

function getItemColorClass(itemType: SavedItemCardProps["itemType"]) {
  switch (itemType) {
    case "Job":
      return "text-blue-500";
    case "Project":
      return "text-purple-500";
    case "Article":
      return "text-green-500";
    default:
      return "text-muted-foreground";
  }
}

export default function SavedItemCard({
  Icon,
  title,
  company,
  location,
  statusText,
  actionText,
  actionHref,
  itemType,
}: SavedItemCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg">
      <CardHeader className="flex flex-row items-start space-x-3 pb-3 pt-4">
        <div className={`p-2 bg-muted/50 rounded-md ${getItemColorClass(itemType)}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold leading-tight">{title}</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">{company}</p>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground pb-3 pl-14 space-y-1">
        <p>{location}</p>
        <p className="text-xs italic">{statusText}</p>
      </CardContent>
      <CardFooter className="p-3 pl-14 border-t">
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
          <Link href={actionHref}>{actionText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
