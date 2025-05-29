
"use client";

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
  Edit3Icon,
  CalendarCheck2Icon,
  MailCheckIcon,
} from 'lucide-react';

// Comprehensive list of navigation items for the mobile drawer AND desktop header
export const allNavItems = [
  { href: '/', label: 'Activity Feed', icon: HomeIcon },
  { href: '/messages', label: 'Messages', icon: MessageSquareIcon },
  { href: '/projects', label: 'Workplace', icon: FolderKanbanIcon },
  { href: '/jobs', label: 'Jobs / Projects', icon: BriefcaseIcon },
  { href: '/challenges', label: 'Challenges', icon: Code2Icon },
  { href: '/profiles', label: 'Profiles', icon: UsersIcon },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon },
  { href: '/events', label: 'Events', icon: CalendarCheck2Icon },
  { href: '/newsletters', label: 'Newsletters', icon: MailCheckIcon }, 
  { href: '/admin', label: 'Admin Panel', icon: LayoutDashboardIcon },
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
      <SheetHeader className="border-b"> 
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary px-4 h-14" onClick={onLinkClick}>
          <Share2Icon className="h-6 w-6" />
          <SheetTitle className="font-semibold text-lg text-primary">CodeSphere</SheetTitle> 
        </Link>
      </SheetHeader>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {allNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              "w-full justify-start gap-x-3 text-sm h-10 px-3",
              (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                ? "bg-primary/10 text-primary font-semibold" // Updated active style
                : "hover:bg-muted/50"
            )}
            aria-current={ (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) ? "page" : undefined }
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
    
