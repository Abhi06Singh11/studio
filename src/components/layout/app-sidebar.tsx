"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  UsersIcon,
  MessageSquareIcon,
  FolderKanbanIcon,
  Code2Icon,
  SparklesIcon,
  Share2Icon, // For Synergy Hub Logo
  PanelLeft
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Activity Feed', icon: HomeIcon },
  { href: '/profiles', label: 'Profiles', icon: UsersIcon },
  { href: '/messages', label: 'Messages', icon: MessageSquareIcon },
  { href: '/projects', label: 'Projects', icon: FolderKanbanIcon },
  { href: '/challenges', label: 'Challenges', icon: Code2Icon },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b">
        <Button variant="ghost" className="w-full justify-start gap-2 px-3 text-lg font-semibold">
          <Share2Icon className="h-6 w-6 text-primary" />
          <span className="text-foreground group-data-[collapsible=icon]:hidden">Synergy Hub</span>
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={cn(
                    "justify-start",
                    pathname === item.href ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  tooltip={{ children: item.label, side: 'right', className: 'bg-card text-card-foreground border-border shadow-md' }}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
