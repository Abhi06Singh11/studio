
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkIcon,
  Users2Icon,
  CalendarCheck2Icon,
  ExternalLinkIcon,
  StarIcon,
  MailCheckIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

const currentUserProfile = {
  name: "Dr. Elara Vance",
  avatarUrl: "https://placehold.co/100x100.png?p=1",
  avatarAiHint: "scientist woman",
  title: "Lead AI Researcher @ Innovatech AI",
  location: "San Francisco, CA",
};

// These links are effectively moved to the global AppSidebarContent for mobile
const quickAccessLinks = [
  { id: 'saved', label: 'Saved Items', icon: BookmarkIcon, href: '/saved-items' },
  { id: 'groups', label: 'My Groups', icon: Users2Icon, href: '/groups' },
  { id: 'newsletters', label: 'Newsletters', icon: MailCheckIcon, href: '/newsletters' },
  { id: 'events', label: 'Events', icon: CalendarCheck2Icon, href: '/events' },
];

export default function ActivityFeedSidebar() {
  return (
    <aside className="w-full space-y-6 shrink-0 hidden lg:block"> {/* Ensures this is only for desktop */}
      {/* User Profile Card Section */}
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <div className="relative h-20 bg-gradient-to-br from-primary/30 to-accent/30">
           {/* Placeholder banner image or gradient */}
        </div>
        <CardContent className="text-center -mt-10 p-4">
          <Link href="/profiles/edit" passHref>
            <Avatar className="h-20 w-20 mx-auto border-4 border-card shadow-md cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src={currentUserProfile.avatarUrl} alt={currentUserProfile.name} data-ai-hint={currentUserProfile.avatarAiHint} />
              <AvatarFallback>{currentUserProfile.name?.substring(0, 1) || 'U'}</AvatarFallback>
            </Avatar>
          </Link>
          <Link href="/profiles/edit" passHref>
            <CardTitle className="mt-3 text-lg hover:underline cursor-pointer">{currentUserProfile.name}</CardTitle>
          </Link>
          <CardDescription className="text-xs mt-0.5">{currentUserProfile.title}</CardDescription>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">{currentUserProfile.location}</CardDescription>
        </CardContent>
        <Separator />
        <CardContent className="p-3 text-xs space-y-1.5">
            <Link href="#" className="flex justify-between items-center text-muted-foreground hover:text-primary hover:bg-muted/50 p-1.5 rounded-md">
                <span>Who's viewed your profile</span>
                <span className="font-semibold text-primary">123</span>
            </Link>
            <Link href="#" className="flex justify-between items-center text-muted-foreground hover:text-primary hover:bg-muted/50 p-1.5 rounded-md">
                <span>Impressions of your posts</span>
                <span className="font-semibold text-primary">1,450</span>
            </Link>
             <Link href="#" className="block text-center text-xs text-muted-foreground hover:underline pt-1">
                View all analytics
            </Link>
        </CardContent>
        <Separator />
        <CardFooter className="p-3">
             <Link href="https://codehinge.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center w-full justify-center">
                Visit CodeHinge.com <ExternalLinkIcon className="ml-1 h-3 w-3"/>
            </Link>
        </CardFooter>
      </Card>

      {/* Premium CTA section removed from here as it's handled in page.tsx */}

      {/* Quick Access Links Section */}
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-base font-semibold">Quick Access</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <ul className="space-y-1">
            {quickAccessLinks.map((item) => (
              <li key={item.id}>
                <Link href={item.href} passHref>
                  <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 h-9 px-2">
                    <item.icon className="mr-2.5 h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </aside>
  );
}
