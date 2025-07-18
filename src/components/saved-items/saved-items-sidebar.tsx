
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BriefcaseIcon, FolderKanbanIcon, BookOpenIcon, BookmarkIcon, UserCogIcon, SettingsIcon, LightbulbIcon, HelpCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const sidebarNavItems = [
  { href: "/jobs?tab=posted", label: "Posted Jobs", icon: BriefcaseIcon, category: "Manage" },
  { href: "/jobs?tab=myjobs", label: "My Applied Jobs", icon: BriefcaseIcon, category: "Manage" },
  { href: "/challenges?view=my-submissions&returnTo=/saved-items", label: "My Learning", icon: BookOpenIcon, category: "Manage" },
  { href: "/saved-items", label: "Saved Items", icon: BookmarkIcon, category: "My Items" },
  { href: "/profiles/edit", label: "Profile Settings", icon: UserCogIcon, category: "Settings" },
  { href: "#", label: "Account Settings", icon: SettingsIcon, category: "Settings" },
  { href: "#", label: "Give Feedback", icon: LightbulbIcon, category: "Support" },
  { href: "#", label: "Help Center", icon: HelpCircleIcon, category: "Support" },
];

interface SavedItemsSidebarProps {
  onLinkClick?: () => void;
  isMobileContext?: boolean;
}

export default function SavedItemsSidebar({ onLinkClick, isMobileContext = false }: SavedItemsSidebarProps) {
  const pathname = usePathname();

  const NavContent = () => (
    <nav className={cn("space-y-1", isMobileContext ? "p-2" : "p-2")}>
      {sidebarNavItems.map((item, index) => (
        <React.Fragment key={item.label}>
          {(index === 0 || (sidebarNavItems[index-1] && item.category !== sidebarNavItems[index-1].category)) && (
            <h3 className="px-2 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {item.category}
            </h3>
          )}
          <Link href={item.href} passHref legacyBehavior>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm h-9",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              )}
              onClick={onLinkClick} // Added onClick handler
            >
              <a>
                <item.icon className="mr-2.5 h-4 w-4 flex-shrink-0" />
                {item.label}
              </a>
            </Button>
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );

  if (isMobileContext) {
    return (
      <div className="flex flex-col h-full">
        {/* The SheetHeader is now provided by the page for mobile context */}
        <div className="flex-1 overflow-y-auto">
          <NavContent />
        </div>
      </div>
    );
  }

  return (
    <Card className="shadow-lg rounded-xl h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">My Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="p-0"> {/* Changed p-2 to p-0 to allow nav to control its own padding */}
        <NavContent />
      </CardContent>
    </Card>
  );
}
