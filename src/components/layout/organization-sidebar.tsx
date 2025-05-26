
// src/components/layout/organization-sidebar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'; // Assuming these are correctly exported from your sidebar component
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboardIcon,
  FolderKanbanIcon,
  UsersIcon,
  MailPlusIcon,
  SettingsIcon,
  ChevronLeftIcon,
  BuildingIcon,
} from 'lucide-react';

interface OrganizationSidebarProps {
  organizationName: string;
  organizationLogoUrl?: string;
  organizationLogoAiHint?: string;
  orgId: string;
}

export default function OrganizationSidebar({
  organizationName,
  organizationLogoUrl,
  organizationLogoAiHint,
  orgId,
}: OrganizationSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: `/organizations/${orgId}`, label: 'Overview', icon: LayoutDashboardIcon },
    { href: `/organizations/${orgId}/projects`, label: 'Projects', icon: FolderKanbanIcon },
    { href: `/organizations/${orgId}/members`, label: 'Members', icon: UsersIcon },
    { href: `/organizations/${orgId}/invites`, label: 'Invites', icon: MailPlusIcon },
    { href: `/organizations/${orgId}/settings`, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    // Using the main Sidebar component structure
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="p-2 border-b">
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-8 w-8 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7">
            {organizationLogoUrl ? (
              <AvatarImage src={organizationLogoUrl} alt={organizationName} data-ai-hint={organizationLogoAiHint || "logo"} />
            ) : (
              <BuildingIcon className="h-full w-full p-1 text-muted-foreground" />
            )}
            <AvatarFallback>{organizationName.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm truncate group-data-[collapsible=icon]:hidden">
            {organizationName}
          </span>
        </div>
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
      <SidebarFooter className="p-2 border-t mt-auto">
        <Link href="/projects" passHref legacyBehavior>
            <SidebarMenuButton 
                className="justify-start w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                tooltip={{ children: "Back to All Projects", side: 'right', className: 'bg-card text-card-foreground border-border shadow-md' }}
            >
                <a>
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">All Projects</span>
                </a>
            </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
