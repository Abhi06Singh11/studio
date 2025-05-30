
"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuTrigger, 
} from '@/components/ui/dropdown-menu';
import {
  Share2Icon,
  SearchIcon,
  User,
  Mail,
  Edit3,
  KeyRound,
  LogOut,
  Settings,
  Activity,
  FolderKanbanIcon,
  Building2,
  Linkedin,
  Github,
  Slack,
  LogIn,
  CalendarDays,
  BriefcaseIcon,
  HomeIcon,
  UsersIcon,
  MessageSquareIcon,
  Code2Icon,
  SparklesIcon,
  LayoutDashboardIcon,
  PanelLeft,
  BellIcon,
  CalendarCheck2Icon,
  MailCheckIcon,
  CrownIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import AppSidebarContent, { allNavItems } from './app-sidebar'; 
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';


// Sample User Data
const sampleUser = {
  name: "Dr. Elara Vance",
  email: "elara.vance@example.com",
  avatarUrl: "https://placehold.co/100x100.png?p=1",
  dataAiHint: "scientist woman",
  role: "Lead Developer",
  joinDate: "January 15, 2023",
  lastLogin: "5 minutes ago",
};


export default function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter items for the desktop header
  const desktopHeaderNavItems = allNavItems.filter(
    item => item.label !== 'Events' && item.label !== 'Newsletters'
  );

  return (
    <TooltipProvider delayDuration={100}>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-x-3 border-b bg-card px-4 shadow-sm sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 text-lg font-semibold text-primary mr-4 shrink-0">
          <Share2Icon className="h-7 w-7" />
          <span className="hidden sm:inline">CodeHinge</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-1 lg:gap-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {desktopHeaderNavItems.map((item) => ( 
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "px-2.5 py-1.5 text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary rounded-md",
                    (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) && "bg-primary/10 text-primary font-semibold"
                  )}
                  aria-current={(pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) ? "page" : undefined}
                >
                   <item.icon className="h-4 w-4 mr-1.5 md:mr-1 lg:mr-1.5 inline-block" />
                   <span className="hidden md:inline">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        
        <div className="flex items-center ml-auto gap-x-2">
          <div className="relative flex-1 max-w-[180px] sm:max-w-xs">
            <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full rounded-md bg-background/70 pl-8 pr-3 h-9 text-sm focus:bg-background"
            />
          </div>
        
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={sampleUser.avatarUrl} alt={sampleUser.name} data-ai-hint={sampleUser.dataAiHint} />
                        <AvatarFallback>{sampleUser.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Open user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end">
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1 items-center py-2">
                    <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={sampleUser.avatarUrl} alt={sampleUser.name} data-ai-hint={sampleUser.dataAiHint} />
                    <AvatarFallback>{sampleUser.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium leading-none">{sampleUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {sampleUser.email}
                    </p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                <DropdownMenuLabel>Account Details</DropdownMenuLabel>
                <DropdownMenuItem className="text-xs text-muted-foreground">
                    <User className="mr-2 h-4 w-4" />
                    Role: <span className="font-medium text-foreground ml-1">{sampleUser.role}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Joined: <span className="font-medium text-foreground ml-1">{sampleUser.joinDate}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs text-muted-foreground">
                    <LogIn className="mr-2 h-4 w-4" />
                    Last Login: <span className="font-medium text-foreground ml-1">{sampleUser.lastLogin}</span>
                </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Linked Accounts (Conceptual)</DropdownMenuLabel>
                    <DropdownMenuItem disabled>
                        <Slack className="mr-2 h-4 w-4" /> Slack: Connected
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Linkedin className="mr-2 h-4 w-4" /> LinkedIn: Not Connected
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Github className="mr-2 h-4 w-4" /> LeetCode (GitHub): Connected
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href="/profiles/edit">
                    <Edit3 className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <KeyRound className="mr-2 h-4 w-4" />
                    <span>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Hub</DropdownMenuLabel>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Activity className="mr-2 h-4 w-4" />
                            My Activity
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                            <DropdownMenuItem>View Activity Log</DropdownMenuItem>
                            <DropdownMenuItem>Content Contributions</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <FolderKanbanIcon className="mr-2 h-4 w-4" />
                            My Projects
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                            <DropdownMenuItem asChild><Link href="/projects">View Joined Projects</Link></DropdownMenuItem>
                            <DropdownMenuItem>View Created Projects</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Building2 className="mr-2 h-4 w-4" />
                            My Organizations
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                            <DropdownMenuItem>View My Organizations</DropdownMenuItem>
                            <DropdownMenuItem>Manage Organization Roles</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <PanelLeft className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-card">
              <AppSidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </TooltipProvider>
  );
}
