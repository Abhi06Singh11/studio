
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
  Edit3Icon, 
} from 'lucide-react';

// Comprehensive list of navigation items for the mobile drawer AND desktop header
export const allNavItems = [ // Export this array so AppHeader can use it
  { href: '/', label: 'Activity Feed', icon: HomeIcon },
  { href: '/profiles/edit', label: 'Profiles', icon: UsersIcon }, // Changed href
  { href: '/messages', label: 'Messages', icon: MessageSquareIcon },
  { href: '/projects', label: 'Projects', icon: FolderKanbanIcon },
  { href: '/jobs', label: 'Jobs / Projects', icon: BriefcaseIcon },
  { href: '/challenges', label: 'Challenges', icon: Code2Icon },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon },
  // { href: '/profiles/edit', label: 'Edit Profile', icon: Edit3Icon }, // Removed this line
  { href: '/admin', label: 'Admin Panel', icon: LayoutDashboardIcon },
  // Example: { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

interface AppSidebarContentProps {
  onLinkClick?: () => void; 
}

// This component now just renders the navigation list,
// to be used inside the mobile SheetContent.
export default function AppSidebarContent({ onLinkClick }: AppSidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="flex h-14 items-center border-b px-4 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary" onClick={onLinkClick}>
          <Share2Icon className="h-6 w-6" />
          <span className="font-semibold">CodeSphere</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {allNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              "w-full justify-start gap-x-3 text-sm h-10 px-3",
              (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                ? "bg-muted text-primary font-medium"
                : "hover:bg-muted/50"
            )}
            aria-current={ (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)) ? "page" : undefined }
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

