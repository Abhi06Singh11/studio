
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  ListChecksIcon,
  HistoryIcon,
  TrophyIcon,
  BookmarkIcon,
  Share2Icon,
  Code2Icon,
  UserCheckIcon, // Added for "My Challenges"
} from "lucide-react";
import type { ChallengesWorkspaceView } from "@/app/challenges/page";

interface ChallengesSidebarProps {
  activeView: ChallengesWorkspaceView;
  setActiveView: (view: ChallengesWorkspaceView) => void;
  returnToPath?: string;
}

const menuItems = [
  { id: "all-challenges", label: "All Challenges", icon: ListChecksIcon },
  { id: "my-submissions", label: "My Submissions", icon: HistoryIcon },
  { id: "leaderboard", label: "Leaderboard", icon: TrophyIcon },
  { id: "saved-challenges", label: "Saved Challenges", icon: BookmarkIcon },
  { id: "my-challenges", label: "My Challenges", icon: UserCheckIcon }, 
];

export default function ChallengesSidebar({ activeView, setActiveView, returnToPath = "/" }: ChallengesSidebarProps) {
  return (
    <aside className="w-64 md:w-72 bg-muted/40 border-r flex-col h-full hidden md:flex">
      <div className="p-3 border-b">
        <Button variant="ghost" className="w-full justify-start text-sm h-9" asChild>
          <Link href={returnToPath}>
            <ArrowLeftIcon className="mr-2.5 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          <div className="px-2 py-1 mb-2">
            <h2 className="text-lg font-semibold tracking-tight flex items-center">
              <Code2Icon className="mr-2 h-5 w-5 text-primary"/>
              Challenges
            </h2>
          </div>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm h-9",
                activeView === item.id && "bg-primary/10 text-primary font-semibold"
              )}
              onClick={() => setActiveView(item.id as ChallengesWorkspaceView)}
            >
              <item.icon className="mr-2.5 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-3 border-t mt-auto">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <Share2Icon className="h-5 w-5" />
          <span className="font-semibold">CodeHinge</span>
        </Link>
      </div>
    </aside>
  );
}
