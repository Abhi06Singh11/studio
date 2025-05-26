
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersIcon, SearchIcon, BuildingIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

interface DiscoverableWorkspace {
  id: string;
  name: string;
  ownerName: string;
  description: string;
  logoUrl?: string;
  logoAiHint?: string;
  memberCount?: number;
}

// Sample data - in a real app, this would come from a backend
const sampleWorkspaces: DiscoverableWorkspace[] = [
  {
    id: "org_123",
    name: "Innovatech Solutions",
    ownerName: "Dr. Elara Vance",
    description: "Pioneering the future of AI-driven development tools and collaborative platforms. Join us to build the next generation of tech.",
    logoUrl: "https://placehold.co/64x64.png?text=IS",
    logoAiHint: "abstract tech logo",
    memberCount: 25,
  },
  {
    id: "org_456",
    name: "GreenFuture 🌱",
    ownerName: "Marcus Chen",
    description: "Dedicated to building sustainable technology solutions for a greener tomorrow. Seeking passionate individuals.",
    logoUrl: "https://placehold.co/64x64.png?text=GF",
    logoAiHint: "eco tech logo",
    memberCount: 12,
  },
  {
    id: "org_789",
    name: "Community Coders Hub",
    ownerName: "Aisha Khan",
    description: "An open community for developers of all levels to collaborate on open-source projects and learn together.",
    logoAiHint: "community coding",
    memberCount: 150,
  },
];

interface JoinWorkspaceModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function JoinWorkspaceModal({ isOpen, onOpenChange }: JoinWorkspaceModalProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredWorkspaces = sampleWorkspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workspace.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestAccess = (workspaceName: string) => {
    console.log(`Conceptual: Request to join workspace "${workspaceName}" sent.`);
    toast({
      title: "Request Sent",
      description: `Your request to join workspace "${workspaceName}" has been sent.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UsersIcon className="mr-2 h-5 w-5 text-primary" />
            Join a Workspace
          </DialogTitle>
          <DialogDescription>
            Discover and request access to existing team workspaces or organizations.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workspaces by name, owner, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-background"
            />
          </div>
          <ScrollArea className="h-[400px] pr-4">
            {filteredWorkspaces.length > 0 ? (
              <div className="space-y-3">
                {filteredWorkspaces.map((ws) => (
                  <Card key={ws.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2 pt-3">
                      <div className="flex items-center gap-3">
                        {ws.logoUrl ? (
                           <Image src={ws.logoUrl} alt={`${ws.name} logo`} data-ai-hint={ws.logoAiHint || "logo"} width={32} height={32} className="rounded-md border bg-card p-0.5" />
                        ) : (
                            <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center border">
                                <BuildingIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                        )}
                        <CardTitle className="text-base font-medium">{ws.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground pb-3 space-y-1.5">
                      <p className="line-clamp-2">{ws.description}</p>
                      <p><span className="font-semibold text-foreground">Owner:</span> {ws.ownerName}</p>
                      {ws.memberCount !== undefined && <p><span className="font-semibold text-foreground">Members:</span> {ws.memberCount.toLocaleString()}</p>}
                    </CardContent>
                    <CardContent className="p-3 border-t bg-muted/20">
                      <Button size="sm" className="w-full" onClick={() => handleRequestAccess(ws.name)}>
                        <UsersIcon className="mr-2 h-4 w-4" /> Request Access
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No workspaces match your search, or no workspaces are currently discoverable.</p>
            )}
          </ScrollArea>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
