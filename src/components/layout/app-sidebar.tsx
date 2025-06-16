
"use client";

import * as React from "react"; // Added missing React import
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  HomeIcon,
  UsersIcon,
  MessageSquareIcon,
  FolderKanbanIcon,
  Code2Icon,
  SparklesIcon,
  Share2Icon,
  BriefcaseIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  CalendarCheck2Icon,
  MailCheckIcon,
  BookmarkIcon, // Added for Saved Items
  Users2Icon as GroupsIcon, // Added for My Groups (alias for clarity)
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '../ui/separator'; // Added Separator
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'; // Added Avatar components

// For UserProfileModal in sidebar footer
const sampleUser = {
  id: "user_elara_vance", // This should ideally come from auth context
  name: "Dr. Elara Vance",
  email: "elara.vance@example.com",
  avatarUrl: "https://placehold.co/100x100.png?p=1",
  dataAiHint: "scientist woman",
  role: "Lead Developer",
  joinedDate: "January 15, 2023",
  lastLogin: "5 minutes ago",
};


export const allNavItems = [
  // Main Navigation
  { href: '/', label: 'Activity Feed', icon: HomeIcon, category: "Main" },
  { href: '/messages', label: 'Messages', icon: MessageSquareIcon, category: "Main" },
  { href: '/projects', label: 'Workplace', icon: FolderKanbanIcon, category: "Main" },
  { href: '/jobs', label: 'Jobs / Projects', icon: BriefcaseIcon, category: "Main" },
  { href: '/challenges', label: 'Challenges', icon: Code2Icon, category: "Main" },
  { href: '/profiles', label: 'Profiles', icon: UsersIcon, category: "Main" },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon, category: "Main" },
  
  // Quick Access (moved from ActivityFeedSidebar)
  { href: '/saved-items', label: 'Saved Items', icon: BookmarkIcon, category: "Quick Access" },
  { href: '/groups', label: 'My Groups', icon: GroupsIcon, category: "Quick Access" },
  { href: '/newsletters', label: 'Newsletters', icon: MailCheckIcon, category: "Quick Access" },
  { href: '/events', label: 'Events', icon: CalendarCheck2Icon, category: "Quick Access" },

  // Admin (conditional rendering might be needed based on user role)
  { href: '/admin', label: 'Admin Panel', icon: LayoutDashboardIcon, category: "Admin" },
];


interface AppSidebarContentProps {
  onLinkClick?: () => void;
}

export default function AppSidebarContent({ onLinkClick }: AppSidebarContentProps) {
  const pathname = usePathname();
  // const isMobile = useIsMobile(); // Not directly used for filtering here anymore

  // Group items by category
  const groupedNavItems = allNavItems.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof allNavItems>);

  const categoryOrder = ["Main", "Quick Access", "Admin", "Other"];


  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <SheetHeader className="border-b h-16 flex items-center"> {/* Ensure header has fixed height */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary px-4" onClick={onLinkClick}>
          <Share2Icon className="h-6 w-6" />
          <SheetTitle className="font-semibold text-lg text-primary">CodeHinge</SheetTitle>
        </Link>
      </SheetHeader>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {categoryOrder.map(categoryName => {
          const itemsInCategory = groupedNavItems[categoryName];
          if (!itemsInCategory || itemsInCategory.length === 0) return null;

          return (
            <React.Fragment key={categoryName}>
              {categoryName !== "Main" && ( // Don't show "Main" as a heading, or adjust as needed
                <h3 className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {categoryName}
                </h3>
              )}
              {itemsInCategory.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    "flex items-center w-full justify-start gap-x-3 text-sm h-10 px-3 rounded-md transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:font-semibold"
                  )}
                  aria-current={ (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) ? "page" : undefined }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              {categoryName !== categoryOrder[categoryOrder.length -1] && <Separator className="my-2" />}
            </React.Fragment>
          );
        })}
      </nav>
       {/* User profile section in footer */}
       <div className="mt-auto border-t p-3">
         <Link href="/profiles/edit" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent" onClick={onLinkClick}>
            <Avatar className="h-9 w-9">
                <AvatarImage src={sampleUser.avatarUrl} alt={sampleUser.name} data-ai-hint={sampleUser.dataAiHint}/>
                <AvatarFallback>{sampleUser.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{sampleUser.name}</span>
                <span className="text-xs text-muted-foreground">{sampleUser.role}</span>
            </div>
         </Link>
       </div>
    </div>
  );
}
