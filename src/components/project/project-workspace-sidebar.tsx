
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  MessageSquareTextIcon,
  ListVideoIcon,
  UsersIcon,
  AtSignIcon,
  FileTextIcon,
  SettingsIcon,
  Share2Icon,
  SquarePenIcon, // Changed from EditIcon for "New Message / Create"
  ChevronDownIcon,
  PlusIcon,
  CircleEllipsisIcon,
  LockIcon,
  SearchIcon,
  BuildingIcon, // For Organizations section
  FolderKanbanIcon, // For Projects section
  LayoutGridIcon, // For My Organizations / My Projects
  LogInIcon, // For Join actions
  FolderPlusIcon, // For Create Project
  ListChecksIcon, // For Join Project
} from "lucide-react";
import type { ProjectWorkspaceView } from "@/app/projects/page";

interface ProjectWorkspaceSidebarProps {
  activeView: ProjectWorkspaceView;
  setActiveView: (view: ProjectWorkspaceView) => void;
  onOpenCreateActionsModal: () => void; // New prop
}

const mainNavItems = [
  { id: "threads", label: "Threads", icon: MessageSquareTextIcon },
  { id: "dms", label: "Direct Messages", icon: UsersIcon, subItems: [
    { id: "dm-elara", label: "Dr. Elara Vance", avatar: "https://placehold.co/50x50.png?t=1", dataAiHint: "scientist woman" },
    { id: "dm-marcus", label: "Marcus Chen", avatar: "https://placehold.co/50x50.png?t=2", dataAiHint: "developer man" },
  ]},
  { id: "activity", label: "Mentions & Activity", icon: AtSignIcon },
  { id: "files", label: "Files", icon: FileTextIcon },
];

const channelCategories = [
    { 
        name: "Channels", 
        channels: [
            { id: "ch-general", name: "general", isPrivate: false },
            { id: "ch-random", name: "random", isPrivate: false },
            { id: "ch-dev-team", name: "dev-team", isPrivate: true },
            { id: "ch-marketing", name: "marketing-campaign-q3", isPrivate: false },
        ]
    },
];

const orgMenuItems = [
    { id: "create-organization", label: "Create Organization", icon: PlusCircleIcon },
    { id: "join-organization", label: "Join Organization", icon: LogInIcon },
    { id: "my-organizations", label: "My Organizations", icon: LayoutGridIcon },
];

const projectOrgMenuItems = [
    { id: "create-project-org", label: "Create Project", icon: FolderPlusIcon },
    { id: "join-project-org", label: "Join Project", icon: ListChecksIcon }, // Changed icon
    { id: "my-projects-org", label: "My Projects", icon: FolderKanbanIcon },
];


export default function ProjectWorkspaceSidebar({ activeView, setActiveView, onOpenCreateActionsModal }: ProjectWorkspaceSidebarProps) {
  const [isChannelsExpanded, setIsChannelsExpanded] = React.useState(true);
  const [isOrgsExpanded, setIsOrgsExpanded] = React.useState(true);
  const [isProjectsOrgExpanded, setIsProjectsOrgExpanded] = React.useState(true);

  return (
    <aside className="w-64 md:w-72 bg-muted/40 border-r flex flex-col h-full">
      <div className="p-3 border-b flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Share2Icon className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">CodeSphere</span>
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onOpenCreateActionsModal} title="Create or Join">
          <SquarePenIcon className="h-4 w-4" />
          <span className="sr-only">Create or Join Actions</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {mainNavItems.map((item) => (
            <React.Fragment key={item.id}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm h-8",
                  activeView === item.id && "bg-primary/10 text-primary font-semibold"
                )}
                onClick={() => setActiveView(item.id as ProjectWorkspaceView)}
              >
                <item.icon className="mr-2.5 h-4 w-4" />
                {item.label}
              </Button>
              {item.id === 'dms' && item.subItems && (
                 <div className="pl-5 space-y-0.5">
                    {item.subItems.map(subItem => (
                        <Button
                            key={subItem.id}
                            variant="ghost"
                            className="w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground"
                        >
                            <Avatar className="h-4 w-4 mr-2">
                                <AvatarImage src={subItem.avatar} alt={subItem.label} data-ai-hint={subItem.dataAiHint} />
                                <AvatarFallback>{subItem.label.substring(0,1)}</AvatarFallback>
                            </Avatar>
                           {subItem.label}
                        </Button>
                    ))}
                     <Button variant="ghost" className="w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground">
                        <PlusIcon className="mr-2 h-3.5 w-3.5"/> Add Teammates
                    </Button>
                </div>
              )}
            </React.Fragment>
          ))}
          
          <Separator className="my-2" />

          {/* Channels Section */}
          <Button 
            variant="ghost" 
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsChannelsExpanded(!isChannelsExpanded)}
          >
            <span className="flex items-center">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isChannelsExpanded && "-rotate-90")} />
              Channels
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); setActiveView('channels'); }}>
                <PlusIcon className="h-4 w-4"/>
                <span className="sr-only">Create Channel</span>
            </Button>
          </Button>
          {isChannelsExpanded && channelCategories.map(category => (
            <div key={category.name} className="pl-3 space-y-0.5">
              {category.channels.map(channel => (
                <Button
                  key={channel.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground",
                     activeView === 'channels' && channel.id === 'ch-general' && "bg-primary/10 text-primary font-semibold" 
                  )}
                   onClick={() => setActiveView('channels')} 
                >
                  {channel.isPrivate ? <LockIcon className="mr-2 h-3 w-3" /> : <span className="mr-2 font-bold text-muted-foreground/70">#</span>}
                  <span className="truncate">{channel.name}</span>
                </Button>
              ))}
            </div>
          ))}
          <Separator className="my-2"/>

          {/* Organizations Section */}
          <Button 
            variant="ghost" 
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsOrgsExpanded(!isOrgsExpanded)}
          >
            <span className="flex items-center">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isOrgsExpanded && "-rotate-90")} />
              Organizations
            </span>
          </Button>
          {isOrgsExpanded && orgMenuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm h-8 pl-7", // Indent items
                activeView === item.id && "bg-primary/10 text-primary font-semibold"
              )}
              onClick={() => setActiveView(item.id as ProjectWorkspaceView)}
            >
              <item.icon className="mr-2.5 h-4 w-4" />
              {item.label}
            </Button>
          ))}
          <Separator className="my-2"/>

          {/* Projects (Org) Section */}
           <Button 
            variant="ghost" 
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsProjectsOrgExpanded(!isProjectsOrgExpanded)}
          >
            <span className="flex items-center">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isProjectsOrgExpanded && "-rotate-90")} />
              Projects (Org)
            </span>
          </Button>
          {isProjectsOrgExpanded && projectOrgMenuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm h-8 pl-7", // Indent items
                activeView === item.id && "bg-primary/10 text-primary font-semibold"
              )}
              onClick={() => setActiveView(item.id as ProjectWorkspaceView)}
            >
              <item.icon className="mr-2.5 h-4 w-4" />
              {item.label}
            </Button>
          ))}


          <Separator className="my-2" />
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm h-8",
              activeView === "settings" && "bg-primary/10 text-primary font-semibold"
            )}
            onClick={() => setActiveView("settings")}
          >
            <SettingsIcon className="mr-2.5 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </ScrollArea>

      <div className="p-2 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start h-10">
            <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://placehold.co/100x100.png?p=1" alt="Current User" data-ai-hint="user avatar" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
                <p className="text-sm font-medium text-foreground">Dr. Elara Vance</p>
                <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <CircleEllipsisIcon className="h-4 w-4 text-muted-foreground"/>
        </Button>
      </div>
    </aside>
  );
}
