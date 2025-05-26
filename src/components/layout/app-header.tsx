
"use client";

import * as React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CircleUserRound,
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
  Share2Icon,
  PanelLeft,
  BellIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import AppSidebarContent from './app-sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

// Primary navigation links for the desktop header (LinkedIn style)
const headerNavLinks = [
  { href: '/', label: 'Home', icon: HomeIcon, pageName: 'Activity Feed' }, // 'Home' is the Activity Feed
  { href: '/profiles', label: 'Network', icon: UsersIcon, pageName: 'Profiles' },
  { href: '/jobs', label: 'Jobs', icon: BriefcaseIcon, pageName: 'Job & Project Board' },
  { href: '/messages', label: 'Messaging', icon: MessageSquareIcon, pageName: 'Direct Messages' },
  { href: '/notifications', label: 'Notifications', icon: BellIcon, pageName: 'Notifications' }, // Added to array
];

interface NavigationLinkProps {
  href: string;
  label: string; // Text below the icon
  tooltipText: string; // Text for the tooltip
  icon: React.ElementType;
  isActive: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ href, label, tooltipText, icon: Icon, isActive }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center justify-center px-1 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary h-full w-20",
          isActive && "text-primary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className="h-5 w-5" />
        <span className="mt-1 text-[11px] leading-tight">{label}</span>
      </Link>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <p>{tooltipText}</p>
    </TooltipContent>
  </Tooltip>
);


export default function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={100}>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-x-3 border-b bg-card px-4 shadow-sm sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 text-lg font-semibold text-primary mr-2 shrink-0">
          <Share2Icon className="h-7 w-7" />
          {/* <span className="hidden sm:inline">CodeSphere</span> */}
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-[220px] sm:max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-md bg-background/70 pl-8 pr-3 h-8 text-sm focus:bg-background"
          />
        </div>
        
        {/* Desktop Navigation Icons */}
        <nav className="hidden md:flex h-full items-center gap-x-0 ml-auto">
          {headerNavLinks.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              label={item.label}
              tooltipText={item.pageName} // Use pageName for tooltip
              icon={item.icon}
              isActive={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)}
            />
          ))}
        </nav>

        {/* User Profile Dropdown */}
        <div className={cn("flex items-center", {"ml-auto md:ml-0": headerNavLinks.length === 0})}>
            <div className="hidden md:block h-7 w-px bg-border mx-1 lg:mx-2"></div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-full w-auto px-1 py-0 flex flex-col items-center justify-center text-muted-foreground hover:text-primary group">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={sampleUser.avatarUrl} alt={sampleUser.name} data-ai-hint={sampleUser.dataAiHint} />
                        <AvatarFallback>{sampleUser.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-[11px] leading-tight mt-1 group-hover:text-primary">Me ▼</span>
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

        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <PanelLeft className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-card">
            <AppSidebarContent onLinkClick={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>
    </TooltipProvider>
  );
}
