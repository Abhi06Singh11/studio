
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
// Removed SheetHeader, SheetTitle import
import {
  ArrowLeftIcon,
  ListChecksIcon,
  HistoryIcon,
  TrophyIcon,
  BookmarkIcon,
  Share2Icon,
  Code2Icon,
  UserCheckIcon,
} from "lucide-react";
import type { ChallengesWorkspaceView } from "@/app/challenges/page";

interface ChallengesSidebarProps {
  activeView: ChallengesWorkspaceView;
  setActiveView: (view: ChallengesWorkspaceView) => void;
  returnToPath?: string;
  onLinkClick?: () => void;
  isMobileContext?: boolean; // New prop
}

const menuItems = [
  { id: "all-challenges", label: "All Challenges", icon: ListChecksIcon },
  { id: "my-submissions", label: "My Submissions", icon: HistoryIcon },
  { id: "leaderboard", label: "Leaderboard", icon: TrophyIcon },
  { id: "saved-challenges", label: "Saved Challenges", icon: BookmarkIcon },
  { id: "my-challenges", label: "My Challenges", icon: UserCheckIcon },
];

export default function ChallengesSidebar({ 
    activeView, 
    setActiveView, 
    returnToPath = "/", 
    onLinkClick,
    isMobileContext = false 
}: ChallengesSidebarProps) {
  const handleSetActiveView = (view: ChallengesWorkspaceView) => {
    setActiveView(view);
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <aside className={cn(
        "w-full flex-col h-full flex",
        isMobileContext ? "bg-card" : "bg-muted/40 border-r"
    )}>
      {/* Header section of the sidebar itself */}
      <div className={cn(
        "p-3 border-b",
        isMobileContext && "pt-0" // No top padding if mobile, as SheetHeader from page provides it
      )}>
        <div className="text-lg font-semibold flex items-center text-primary">
          <Code2Icon className="mr-2 h-5 w-5"/>
          Challenges Menu
        </div>
        <div className="mt-2"> 
          <Button variant="ghost" className="w-full justify-start text-sm h-9" asChild>
            <Link href={returnToPath} onClick={onLinkClick}>
              <ArrowLeftIcon className="mr-2.5 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm h-9",
                activeView === item.id && "bg-primary/10 text-primary font-semibold"
              )}
              onClick={() => handleSetActiveView(item.id as ChallengesWorkspaceView)}
            >
              <item.icon className="mr-2.5 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-3 border-t mt-auto">
        <Link href="/" onClick={onLinkClick} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <Share2Icon className="h-5 w-5" />
          <span className="font-semibold">CodeHinge</span>
        </Link>
      </div>
    </aside>
  );
}
