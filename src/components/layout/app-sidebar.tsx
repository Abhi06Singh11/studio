
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
// Button component from ui/button is not directly used here for the header link, SidebarMenuButton handles it.
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
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Activity Feed', icon: HomeIcon },
  { href: '/profiles', label: 'Profiles', icon: UsersIcon },
  { href: '/messages', label: 'Messages', icon: MessageSquareIcon },
  { href: '/projects', label: 'Projects', icon: FolderKanbanIcon },
  { href: '/jobs', label: 'Jobs / Projects', icon: BriefcaseIcon },
  { href: '/challenges', label: 'Challenges', icon: Code2Icon },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon },
  { href: '/admin', label: 'Admin Panel', icon: LayoutDashboardIcon },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/" passHref legacyBehavior>
          <SidebarMenuButton
            asChild // Important: asChild allows the Link to control navigation while Button provides style
            className={cn(
              "w-full justify-start gap-2 px-3 text-lg font-semibold !bg-transparent",
              "hover:!bg-sidebar-accent hover:!text-sidebar-accent-foreground focus-visible:!ring-sidebar-ring"
            )}
            tooltip={{ children: "CodeSphere Home", side: 'right', className: 'bg-card text-card-foreground border-border shadow-md' }}
          >
            <a>
              <Share2Icon className="h-6 w-6 text-primary" />
              <span className="text-foreground group-data-[collapsible=icon]:hidden">CodeSphere</span>
            </a>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)}
                  className={cn(
                    "justify-start",
                    (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" 
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    "focus-visible:!ring-sidebar-ring" // Ensure focus ring uses sidebar theme
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

    