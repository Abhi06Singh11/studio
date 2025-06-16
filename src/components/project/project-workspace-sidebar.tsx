
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"; // Corrected import
import {
  MessageSquareTextIcon,
  ListVideoIcon,
  UsersIcon,
  AtSignIcon,
  FileTextIcon,
  SettingsIcon,
  Share2Icon,
  SquarePenIcon,
  ChevronDownIcon,
  PlusIcon,
  CircleEllipsisIcon,
  LockIcon,
  SearchIcon,
  BuildingIcon,
  FolderKanbanIcon,
  LayoutGridIcon,
  LogInIcon,
  FolderPlusIcon,
  ListChecksIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
} from "lucide-react";
import type { ProjectWorkspaceView } from "@/app/projects/page";
import { useRouter } from "next/navigation";


interface ProjectWorkspaceSidebarProps {
  activeView: ProjectWorkspaceView;
  setActiveView: (view: ProjectWorkspaceView) => void;
  onOpenCreateActionsModal: () => void;
  onLinkClick?: () => void; // Added for mobile sheet
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
    { id: "join-project-org", label: "Join Project", icon: ListChecksIcon },
    { id: "my-projects-org", label: "My Projects", icon: FolderKanbanIcon },
];


export default function ProjectWorkspaceSidebar({ activeView, setActiveView, onOpenCreateActionsModal, onLinkClick }: ProjectWorkspaceSidebarProps) {
  const router = useRouter();
  const [isChannelsExpanded, setIsChannelsExpanded] = React.useState(true);
  const [isDmsExpanded, setIsDmsExpanded] = React.useState(true);
  const [isOrgsExpanded, setIsOrgsExpanded] = React.useState(true);
  const [isProjectsOrgExpanded, setIsProjectsOrgExpanded] = React.useState(true);

  const handleSetActiveView = (view: ProjectWorkspaceView) => {
    setActiveView(view);
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const handleOpenCreateActionsModal = () => {
    onOpenCreateActionsModal();
    if (onLinkClick) {
      onLinkClick();
    }
  }


  return (
    <aside className="w-full bg-muted/40 border-r flex flex-col h-full">
      <SheetHeader className="p-3 border-b flex flex-row justify-between items-center">
        <Button variant="ghost" asChild className="justify-start h-9 p-0 text-base">
          <Link href="/" className="flex items-center gap-2" onClick={onLinkClick}>
            <Share2Icon className="h-5 w-5 text-primary" />
            <SheetTitle className="font-semibold text-primary text-lg">CodeHinge</SheetTitle>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleOpenCreateActionsModal} title="Create or Join">
          <SquarePenIcon className="h-4 w-4" />
          <span className="sr-only">Create or Join Actions</span>
        </Button>
      </SheetHeader>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {mainNavItems.map((item) => (
            <React.Fragment key={item.id}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sm h-8",
                  activeView === item.id && "bg-primary/10 text-primary font-semibold",
                  item.id === 'dms' && "justify-between"
                )}
                onClick={() => {
                  if (item.id === 'dms') {
                    setIsDmsExpanded(!isDmsExpanded);
                  }
                  handleSetActiveView(item.id as ProjectWorkspaceView);
                }}
              >
                <span className="flex items-center gap-2.5">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.id === 'dms' && (
                  <ChevronDownIcon className={cn("h-4 w-4 transition-transform", !isDmsExpanded && "-rotate-90")} />
                )}
              </Button>
              {item.id === 'dms' && item.subItems && isDmsExpanded && (
                 <div className="pl-5 space-y-0.5">
                    {item.subItems.map(subItem => (
                        <Button
                            key={subItem.id}
                            variant="ghost"
                            className="w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground"
                            onClick={onLinkClick} // DM links should also close mobile sidebar
                        >
                           <span className="flex items-center gap-2.5">
                                <Avatar className="h-4 w-4 mr-0">
                                    <AvatarImage src={subItem.avatar} alt={subItem.label} data-ai-hint={subItem.dataAiHint} />
                                    <AvatarFallback>{subItem.label.substring(0,1)}</AvatarFallback>
                                </Avatar>
                            {subItem.label}
                           </span>
                        </Button>
                    ))}
                     <Button variant="ghost" className="w-full justify-start text-xs h-7 text-muted-foreground hover:text-foreground" onClick={onLinkClick}>
                       <span className="flex items-center gap-2.5">
                            <PlusIcon className="h-3.5 w-3.5"/> Add Teammates
                        </span>
                    </Button>
                </div>
              )}
            </React.Fragment>
          ))}

          <Separator className="my-2" />

          <div className="flex items-center justify-between pr-1">
            <Button
              variant="ghost"
              className="flex-1 justify-start text-sm h-8 font-semibold"
              onClick={() => setIsChannelsExpanded(!isChannelsExpanded)}
            >
                <span className="flex items-center gap-2.5">
                    <ChevronDownIcon className={cn("h-4 w-4 transition-transform", !isChannelsExpanded && "-rotate-90")} />
                    Channels
                </span>
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={(e) => { e.stopPropagation(); handleSetActiveView('create-channel'); }} title="Create Channel">
                <PlusIcon className="h-4 w-4"/>
                <span className="sr-only">Create Channel</span>
            </Button>
          </div>
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
                   onClick={() => handleSetActiveView('channels')}
                >
                  <span className="flex items-center gap-2.5">
                    {channel.isPrivate ? <LockIcon className="h-3 w-3" /> : <span className="mr-0 font-bold text-muted-foreground/70">#</span>}
                    <span className="truncate">{channel.name}</span>
                  </span>
                </Button>
              ))}
            </div>
          ))}
          <Separator className="my-2"/>


          <Button
            variant="ghost"
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsOrgsExpanded(!isOrgsExpanded)}
          >
            <span className="flex items-center gap-2.5">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isOrgsExpanded && "-rotate-90")} />
              Organizations
            </span>
          </Button>
          {isOrgsExpanded && orgMenuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm h-8 pl-7",
                activeView === item.id && "bg-primary/10 text-primary font-semibold"
              )}
              onClick={() => handleSetActiveView(item.id as ProjectWorkspaceView)}
            >
              <span className="flex items-center gap-2.5">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
            </Button>
          ))}
          <Separator className="my-2"/>

           <Button
            variant="ghost"
            className="w-full justify-between text-sm h-8 font-semibold"
            onClick={() => setIsProjectsOrgExpanded(!isProjectsOrgExpanded)}
          >
            <span className="flex items-center gap-2.5">
              <ChevronDownIcon className={cn("mr-2 h-4 w-4 transition-transform", !isProjectsOrgExpanded && "-rotate-90")} />
              Projects (Org)
            </span>
          </Button>
          {isProjectsOrgExpanded && projectOrgMenuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm h-8 pl-7",
                activeView === item.id && "bg-primary/10 text-primary font-semibold"
              )}
              onClick={() => handleSetActiveView(item.id as ProjectWorkspaceView)}
            >
              <span className="flex items-center gap-2.5">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
            </Button>
          ))}


          <Separator className="my-2" />
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm h-8",
              activeView === "settings" && "bg-primary/10 text-primary font-semibold"
            )}
            onClick={() => handleSetActiveView("settings")}
          >
            <span className="flex items-center gap-2.5">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </span>
          </Button>
        </nav>
      </ScrollArea>

      <div className="p-2 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start h-10 p-2" asChild>
            <Link href={`/profiles?returnTo=/projects`} className="flex items-center gap-2 w-full" onClick={onLinkClick}>
               <span className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png?p=1" alt="Current User" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                    <p className="text-sm font-medium text-foreground">Dr. Elara Vance</p>
                    <p className="text-xs text-muted-foreground">Online</p>
                </div>
                </span>
                <CircleEllipsisIcon className="h-4 w-4 text-muted-foreground ml-auto"/>
            </Link>
        </Button>
      </div>
    </aside>
  );
}

    
