
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  PlusCircleIcon,
  EyeIcon,
  FolderKanbanIcon,
  MailPlusIcon,
  MessageSquareIcon,
  BookmarkIcon,
  ChevronDownIcon,
  Share2Icon
} from "lucide-react";
import type { JobsProjectsWorkspaceView } from "@/app/jobs/page";
import { useRouter } from "next/navigation";

interface JobsProjectsSidebarProps {
  activeView: JobsProjectsWorkspaceView;
  setActiveView: (view: JobsProjectsWorkspaceView) => void;
  onLinkClick?: () => void; // Added for mobile sheet
}

const jobMenuItems = [
  { id: "view-posted-jobs", label: "View Posted Jobs", icon: EyeIcon, note: "Company only" },
  { id: "post-job", label: "Post a Job", icon: PlusCircleIcon, note: "Company only" },
];

const projectMenuItems = [
  { id: "view-invitations", label: "View Invitations", icon: EyeIcon, note: "All users" },
  { id: "post-project-invitation", label: "Post a Project", icon: PlusCircleIcon, note: "All users" },
];

const savedPostsMenuItems = [
  { id: "saved-jobs", label: "Saved Jobs", icon: BookmarkIcon },
  { id: "saved-projects", label: "Saved Projects", icon: BookmarkIcon },
];

export default function JobsProjectsSidebar({ activeView, setActiveView, onLinkClick }: JobsProjectsSidebarProps) {
  const router = useRouter();
  const [isJobsExpanded, setIsJobsExpanded] = React.useState(true);
  const [isProjectsExpanded, setIsProjectsExpanded] = React.useState(true);
  const [isSavedPostsExpanded, setIsSavedPostsExpanded] = React.useState(true);

  const handleSetActiveView = (view: JobsProjectsWorkspaceView) => {
    setActiveView(view);
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <aside className="w-full bg-muted/40 border-r flex-col h-full flex"> {/* Removed hidden md:flex */}
      <div className="p-3 border-b">
        <Button variant="ghost" className="w-full justify-start text-sm h-9" onClick={() => { router.push('/'); if(onLinkClick) onLinkClick(); }}>
          <ArrowLeftIcon className="mr-2.5 h-4 w-4" />
          Back
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {/* Jobs Section */}
          <Button
            variant="ghost"
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsJobsExpanded(!isJobsExpanded)}
          >
            <span className="flex items-center">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isJobsExpanded && "-rotate-90")} />
              Jobs
            </span>
          </Button>
          {isJobsExpanded && (
            <div className="pl-4 space-y-0.5 mb-2">
              {jobMenuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground",
                    activeView === item.id && "bg-primary/10 text-primary font-medium"
                  )}
                  onClick={() => handleSetActiveView(item.id as JobsProjectsWorkspaceView)}
                >
                  <item.icon className="mr-2 h-3.5 w-3.5" />
                  <span className="truncate flex-1">{item.label}</span>
                  {item.note && <span className="text-[10px] opacity-70 ml-1">({item.note})</span>}
                </Button>
              ))}
            </div>
          )}
          <Separator className="my-2" />

          {/* Projects Section */}
          <Button
            variant="ghost"
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
          >
            <span className="flex items-center">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isProjectsExpanded && "-rotate-90")} />
              Projects
            </span>
          </Button>
          {isProjectsExpanded && (
            <div className="pl-4 space-y-0.5 mb-2">
              {projectMenuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground",
                    activeView === item.id && "bg-primary/10 text-primary font-medium"
                  )}
                  onClick={() => handleSetActiveView(item.id as JobsProjectsWorkspaceView)}
                >
                  <item.icon className="mr-2 h-3.5 w-3.5" />
                   <span className="truncate flex-1">{item.label}</span>
                   {item.note && <span className="text-[10px] opacity-70 ml-1">({item.note})</span>}
                </Button>
              ))}
            </div>
          )}
          <Separator className="my-2" />
          
          {/* Messages Section (Conceptual) */}
           <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm h-8 text-muted-foreground hover:text-foreground",
               activeView === "messages" && "bg-primary/10 text-primary font-medium"
            )}
            onClick={() => handleSetActiveView("messages")}
            disabled // Optional: disable if not implemented
          >
            <MessageSquareIcon className="mr-2.5 h-4 w-4" />
            Messages (Related)
          </Button>
          <Separator className="my-2" />

          {/* Saved Posts Section */}
           <Button
            variant="ghost"
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsSavedPostsExpanded(!isSavedPostsExpanded)}
          >
            <span className="flex items-center">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isSavedPostsExpanded && "-rotate-90")} />
              Saved Posts
            </span>
          </Button>
          {isSavedPostsExpanded && (
            <div className="pl-4 space-y-0.5">
              {savedPostsMenuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground",
                    activeView === item.id && "bg-primary/10 text-primary font-medium"
                  )}
                  onClick={() => handleSetActiveView(item.id as JobsProjectsWorkspaceView)}
                >
                  <item.icon className="mr-2 h-3.5 w-3.5" />
                  {item.label}
                </Button>
              ))}
            </div>
          )}
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
