
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RocketIcon, BriefcaseIcon, FolderKanbanIcon, ListChecksIcon, GiftIcon, UnlockIcon } from "lucide-react";

export default function PremiumCtaSidebar() {
  return (
    <aside className="w-full space-y-6 shrink-0">
      <Card className="shadow-lg rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-semibold text-primary">
            <RocketIcon className="mr-2.5 h-5 w-5" />
            Upgrade to CodeSphere Premium
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="font-medium text-foreground">🚀 Unlock the full potential of:</p>
          <ul className="space-y-1.5 text-muted-foreground text-xs pl-1">
            <li className="flex items-start">
              <FolderKanbanIcon className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary/80 shrink-0" />
              <span><span className="font-semibold text-foreground/90">Workplace:</span> Team insights & advanced collaboration exports.</span>
            </li>
            <li className="flex items-start">
              <BriefcaseIcon className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary/80 shrink-0" />
              <span><span className="font-semibold text-foreground/90">Jobs/Projects:</span> Recruiter views, boosted visibility & applicant insights.</span>
            </li>
            <li className="flex items-start">
              <ListChecksIcon className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-primary/80 shrink-0" />
              <span><span className="font-semibold text-foreground/90">Challenges:</span> Premium problems, company sets & AI feedback.</span>
            </li>
          </ul>
          <div className="pt-2 text-center">
            <p className="text-sm font-semibold text-green-600 flex items-center justify-center">
              <GiftIcon className="h-4 w-4 mr-1.5" /> Try Premium Free for 7 Days
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button className="flex-1 bg-primary hover:bg-primary/90" asChild>
              <Link href="/premium/subscribe">
                <UnlockIcon className="mr-2 h-4 w-4" /> Try Premium
              </Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/premium">Compare Plans</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
