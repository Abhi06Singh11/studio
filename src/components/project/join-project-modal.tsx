
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogInIcon, SearchIcon, UsersIcon, TagIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProjectMember {
  name: string;
  src: string;
  dataAiHint?: string;
}

interface JoinableProject {
  id: string;
  name: string;
  description: string;
  tags: string[];
  team: ProjectMember[];
  // Add other relevant fields like status, organization (if applicable)
}

interface JoinProjectModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentProjects: JoinableProject[]; // Pass existing projects to filter from
}

export default function JoinProjectModal({ isOpen, onOpenChange, currentProjects }: JoinProjectModalProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredProjects = currentProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRequestToJoin = (projectName: string) => {
    console.log(`Conceptual: Request to join project "${projectName}" sent.`);
    toast({
      title: "Request Sent",
      description: `Your request to join project "${projectName}" has been sent.`,
    });
    // Potentially close modal or update UI
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <LogInIcon className="mr-2 h-5 w-5 text-primary" />
            Join an Existing Project
          </DialogTitle>
          <DialogDescription>
            Browse available projects and request to join ones that interest you.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, tag, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-background"
            />
          </div>
          <ScrollArea className="h-[400px] pr-4">
            {filteredProjects.length > 0 ? (
              <div className="space-y-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2 pt-3">
                      <CardTitle className="text-base font-medium">{project.name}</CardTitle>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1 items-center">
                          <TagIcon className="h-3.5 w-3.5 text-muted-foreground mr-1"/>
                          {project.tags.slice(0,5).map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                          {project.tags.length > 5 && <Badge variant="outline" className="text-xs">+{project.tags.length - 5} more</Badge>}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground pb-3">
                      <p className="line-clamp-2 mb-2.5">{project.description}</p>
                      {project.team && project.team.length > 0 && (
                        <div className="flex items-center">
                          <UsersIcon className="h-4 w-4 mr-1.5 text-muted-foreground"/>
                          <span className="mr-1.5 font-medium text-foreground">Team:</span>
                          <div className="flex -space-x-1.5">
                            {project.team.slice(0, 3).map(member => (
                              <Avatar key={member.src} className="h-7 w-7 border-2 border-card">
                                <AvatarImage src={member.src} data-ai-hint={member.dataAiHint}/>
                                <AvatarFallback className="text-[10px]">{member.name}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                           {project.team.length > 3 && <span className="ml-1.5 text-muted-foreground text-[10px]">+ {project.team.length - 3} more</span>}
                        </div>
                      )}
                    </CardContent>
                    <CardContent className="p-3 border-t bg-muted/20">
                      <Button size="sm" className="w-full" onClick={() => handleRequestToJoin(project.name)}>
                        <LogInIcon className="mr-2 h-4 w-4" /> Request to Join
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No projects match your search, or no projects are currently joinable.</p>
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
