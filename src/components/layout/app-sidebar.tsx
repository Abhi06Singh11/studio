
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
  CalendarCheck2Icon,
  MailCheckIcon,
  CheckSquareIcon, // New icon for Project Management
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const allNavItems = [
  { href: '/', label: 'Activity Feed', icon: HomeIcon },
  { href: '/messages', label: 'Messages', icon: MessageSquareIcon },
  { href: '/projects', label: 'Workplace', icon: FolderKanbanIcon },
  { href: '/jobs', label: 'Jobs / Projects', icon: BriefcaseIcon },
  { href: '/challenges', label: 'Challenges', icon: Code2Icon },
  { href: '/pm/projects', label: 'Project Mgmt', icon: CheckSquareIcon }, // New Project Management Link
  { href: '/profiles', label: 'Profiles', icon: UsersIcon },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon },
  { href: '/events', label: 'Events', icon: CalendarCheck2Icon },
  { href: '/newsletters', label: 'Newsletters', icon: MailCheckIcon },
  { href: '/admin', label: 'Admin Panel', icon: LayoutDashboardIcon },
];


interface AppSidebarContentProps {
  onLinkClick?: () => void;
}

export default function AppSidebarContent({ onLinkClick }: AppSidebarContentProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const mobileHiddenItemsLabels = ["Events", "Newsletters"];

  const visibleNavItems = isMobile
    ? allNavItems.filter(item => !mobileHiddenItemsLabels.includes(item.label))
    : allNavItems;

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <SheetHeader className="border-b">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary px-4 h-14" onClick={onLinkClick}>
          <Share2Icon className="h-6 w-6" />
          <SheetTitle className="font-semibold text-lg text-primary">CodeHinge</SheetTitle>
        </Link>
      </SheetHeader>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {visibleNavItems.map((item) => (
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
      </nav>
    </div>
  );
}
    