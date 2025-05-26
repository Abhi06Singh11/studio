
"use client"; // Add "use client" because we're using usePathname hook

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  PanelLeft,
  CircleUserRound,
  SearchIcon,
  User,
  Mail,
  Edit3,
  KeyRound,
  LogOut,
  Settings,
  Activity,
  FolderKanbanIcon, // Renamed from FolderKanban to avoid conflict
  Building2,
  Linkedin,
  Github,
  Slack,
  LogIn,
  ChevronDown,
  CalendarDays,
  BriefcaseIcon,
  HomeIcon, 
  UsersIcon, 
  MessageSquareIcon, 
  Code2Icon, 
  SparklesIcon, 
  LayoutDashboardIcon, 
  Share2Icon, 
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

// Sample User Data (replace with actual data source in a real app)
const sampleUser = {
  name: "Dr. Elara Vance",
  email: "elara.vance@example.com",
  avatarUrl: "https://placehold.co/100x100.png?p=1",
  dataAiHint: "scientist woman",
  role: "Lead Developer",
  joinDate: "January 15, 2023",
  lastLogin: "5 minutes ago",
};

// Define navItems here or import from a shared location
const headerNavItemsList = [ // Renamed to avoid conflict if imported elsewhere
  { href: '/', label: 'Activity Feed', icon: HomeIcon },
  { href: '/profiles', label: 'Profiles', icon: UsersIcon },
  { href: '/messages', label: 'Messages', icon: MessageSquareIcon },
  { href: '/projects', label: 'Projects', icon: FolderKanbanIcon },
  { href: '/jobs', label: 'Jobs / Projects', icon: BriefcaseIcon },
  { href: '/challenges', label: 'Challenges', icon: Code2Icon },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon },
  { href: '/admin', label: 'Admin Panel', icon: LayoutDashboardIcon },
  { href: '/profiles/edit', label: 'Edit Profile', icon: Edit3 },
];


export default function AppHeader() {
  const pathname = usePathname();

  let currentPage = headerNavItemsList.find((item) => {
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  });

  // Fallback for dynamic organization pages or other non-listed pages
  if (!currentPage) {
    if (pathname.startsWith('/organizations/')) {
      currentPage = { href: pathname, label: 'Organization Workspace', icon: Building2 };
    } else if (pathname.startsWith('/projects/') && pathname.split('/').length > 2 && !pathname.endsWith('/create-personal')) {
      currentPage = { href: pathname, label: 'Project Details', icon: FolderKanbanIcon };
    } else if (pathname.startsWith('/projects/create-personal')) {
      currentPage = { href: pathname, label: 'Create Project', icon: FolderKanbanIcon };
    }
  }


  const CurrentPageIcon = currentPage?.icon || Activity; 

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 shadow-sm">
      {/* Mobile Sidebar Trigger */}
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SidebarTrigger>
      </div>

      {/* App Name and Dynamic Page Title/Icon - visible on all screens */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Share2Icon className="h-6 w-6" />
          <span className="sr-only">CodeSphere</span> 
        </Link>
        <span className="text-muted-foreground hidden md:inline">|</span>
        {currentPage && (
          <div className="flex items-center gap-2 text-sm md:text-base font-medium text-foreground">
            <CurrentPageIcon className="h-5 w-5 text-muted-foreground" />
            <span>{currentPage.label}</span>
          </div>
        )}
      </div>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
            />
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <CircleUserRound className="h-6 w-6" />
              <span className="sr-only">Toggle user menu</span>
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
                        <DropdownMenuItem>View Joined Projects</DropdownMenuItem>
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
    </header>
  );
}

    