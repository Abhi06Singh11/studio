
"use client";

import * as React from "react";
import SavedItemsSidebar from "@/components/saved-items/saved-items-sidebar";
import SavedItemCard from "@/components/saved-items/saved-item-card";
import SavedItemsTipsPanel from "@/components/saved-items/saved-items-tips-panel";
import { BriefcaseIcon, FolderKanbanIcon, LightbulbIcon, FileTextIcon, AlertTriangleIcon, MenuIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const sampleSavedItems = [
  {
    id: "item1",
    icon: BriefcaseIcon,
    title: "Senior Frontend Developer",
    company: "Innovatech Solutions",
    location: "Remote",
    statusText: "Saved 2 days ago",
    actionText: "View Job",
    actionHref: "#",
    type: "Job"
  },
  {
    id: "item2",
    icon: FolderKanbanIcon,
    title: "AI Resume Screening Tool",
    company: "Personal Project by Dr. Elara Vance",
    location: "Collaboration Opportunity",
    statusText: "Saved 5 days ago",
    actionText: "View Project",
    actionHref: "#",
    type: "Project"
  },
  {
    id: "item3",
    icon: LightbulbIcon,
    title: "Marketing Campaign for Q3",
    company: "GreenFuture 🌱",
    location: "Freelance Contract",
    statusText: "Saved 1 week ago",
    actionText: "View Details",
    actionHref: "#",
    type: "Project"
  },
  {
    id: "item4",
    icon: FileTextIcon,
    title: "Research Paper: Ethical AI",
    company: "CodeSphere Resources",
    location: "Reading Material",
    statusText: "Saved 10 days ago",
    actionText: "Read Article",
    actionHref: "#",
    type: "Article"
  },
];

export default function SavedItemsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  return (
    <div className="container mx-auto max-w-7xl py-8">
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden mb-4">
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Open Dashboard Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-card flex flex-col">
            <SheetHeader className="p-3 border-b">
              <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
            </SheetHeader>
            <SavedItemsSidebar 
              onLinkClick={() => setIsMobileSidebarOpen(false)}
              isMobileContext={true} 
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Left Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block">
          <SavedItemsSidebar />
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-6 space-y-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight">Saved Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleSavedItems.length > 0 ? (
                sampleSavedItems.map((item) => (
                  <SavedItemCard
                    key={item.id}
                    Icon={item.icon}
                    title={item.title}
                    company={item.company}
                    location={item.location}
                    statusText={item.statusText}
                    actionText={item.actionText}
                    actionHref={item.actionHref}
                    itemType={item.type as "Job" | "Project" | "Article"}
                  />
                ))
              ) : (
                <p className="text-muted-foreground">You haven't saved any items yet.</p>
              )}
            </CardContent>
          </Card>
        </main>

        {/* Desktop Right Panel for Tips */}
        <aside className="lg:col-span-3 hidden lg:block">
          <SavedItemsTipsPanel />
        </aside>
        
        {/* Mobile Right Panel for Tips (if desired, or remove if too cluttered) */}
        <div className="lg:hidden mt-8">
            <SavedItemsTipsPanel />
        </div>
      </div>
    </div>
  );
}
