
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
  Share2Icon,
  SearchIcon,
  PanelLeft,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import AppSidebarContent, { allNavItems } from './app-sidebar';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import UserProfileModal from './UserProfileModal'; // Import the new modal

// Sample User Data (can be moved or fetched from context/auth service in a real app)
const sampleUser = {
  id: "user_elara_vance", // Added an ID
  name: "Dr. Elara Vance",
  email: "elara.vance@example.com",
  avatarUrl: "https://placehold.co/100x100.png?p=1",
  dataAiHint: "scientist woman",
  role: "Lead Developer",
  joinedDate: "January 15, 2023",
  lastLogin: "5 minutes ago",
};

// Filter out Events and Newsletters for desktop header
const desktopHeaderNavItems = allNavItems.filter(
  item => item.label !== "Events" && item.label !== "Newsletters"
);

export default function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for the new modal

  return (
    <TooltipProvider delayDuration={100}>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-x-3 border-b bg-card px-4 shadow-sm sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 text-lg font-semibold text-primary mr-4 shrink-0">
          <Share2Icon className="h-7 w-7" />
          <span className="hidden sm:inline">CodeHinge</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-1 lg:gap-x-0.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {desktopHeaderNavItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-2 py-1.5 text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary rounded-md",
                    (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) && "bg-primary/10 text-primary font-semibold"
                  )}
                  aria-current={(pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) ? "page" : undefined}
                >
                   <item.icon className="h-4 w-4 mr-1 md:mr-1 lg:mr-1.5 inline-block" />
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

          {/* User Profile Avatar Trigger for Modal */}
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0" onClick={() => setIsProfileModalOpen(true)}>
              <Avatar className="h-8 w-8">
                  <AvatarImage src={sampleUser.avatarUrl} alt={sampleUser.name} data-ai-hint={sampleUser.dataAiHint} />
                  <AvatarFallback>{sampleUser.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Open user menu</span>
          </Button>
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
      {/* User Profile Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onOpenChange={setIsProfileModalOpen}
        user={sampleUser}
      />
    </TooltipProvider>
  );
}
