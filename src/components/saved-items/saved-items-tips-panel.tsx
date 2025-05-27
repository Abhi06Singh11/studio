
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheckIcon, PlusCircleIcon, MessageSquareIcon, SettingsIcon, AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

const tips = [
  {
    id: "tip1",
    icon: ShieldCheckIcon,
    title: "Secure Your Account",
    description: "Enable two-factor authentication for enhanced security.",
    actionText: "Update Security",
    actionHref: "/profiles/edit#security", // Conceptual link
    variant: "default" as const
  },
  {
    id: "tip2",
    icon: PlusCircleIcon,
    title: "Post a Job or Project",
    description: "Looking for talent or collaborators? Post your opportunity now.",
    actionText: "Post Opportunity",
    actionHref: "/jobs", // Link to the jobs/projects posting area
    variant: "default" as const
  },
  {
    id: "tip3",
    icon: SettingsIcon,
    title: "Customize Your Feed",
    description: "Adjust your notification and content preferences for a better experience.",
    actionText: "Go to Settings",
    actionHref: "/profiles/edit#notifications", // Conceptual link
    variant: "secondary" as const
  },
   {
    id: "tip4",
    icon: AlertTriangleIcon,
    title: "Report Suspicious Activity",
    description: "Help keep CodeSphere safe by reporting any unusual activity.",
    actionText: "Report Now",
    actionHref: "#", // Conceptual link
    variant: "destructive" as const
  }
];

export default function SavedItemsTipsPanel() {
  return (
    <div className="space-y-4">
      {tips.map((tip) => (
        <Card key={tip.id} className={`shadow-lg rounded-xl ${tip.variant === 'destructive' ? 'bg-destructive/5 border-destructive/30' : tip.variant === 'secondary' ? 'bg-muted/30' : ''}`}>
          <CardHeader className="flex flex-row items-start gap-3 pb-2 pt-4">
            <div className={`p-2 rounded-md ${
                tip.variant === 'destructive' ? 'bg-destructive/10 text-destructive' : 
                tip.variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : 
                'bg-primary/10 text-primary'
            }`}>
                <tip.icon className="h-5 w-5" />
            </div>
            <div>
                <CardTitle className="text-sm font-semibold leading-tight">{tip.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground pl-14 pb-3">
            <p>{tip.description}</p>
          </CardContent>
          <CardContent className="p-3 pl-14 border-t">
            <Button variant={tip.variant === 'destructive' ? 'destructive' : tip.variant === 'secondary' ? 'secondary' : 'outline'} size="sm" asChild className="w-full text-xs">
              <Link href={tip.actionHref}>{tip.actionText}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
