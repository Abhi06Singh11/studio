import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FolderKanbanIcon, PlusCircleIcon, UsersIcon, MessageSquareIcon, FileTextIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";

const sampleProjects = [
  {
    id: "1",
    name: "Synergy Hub Platform",
    description: "Developing the core platform for developer collaboration and networking. Focus on scalability and user experience.",
    status: "In Progress",
    progress: 75,
    team: [
      { name: "A", src: "https://placehold.co/50x50.png?t=1", dataAiHint: "person" },
      { name: "B", src: "https://placehold.co/50x50.png?t=2", dataAiHint: "person" },
      { name: "C", src: "https://placehold.co/50x50.png?t=3", dataAiHint: "person" },
    ],
    tags: ["Next.js", "TypeScript", "AI", "Collaboration"],
    imageUrl: "https://placehold.co/400x200.png?prj=1",
    imageAiHint: "team working"
  },
  {
    id: "2",
    name: "AI Recommendation Engine",
    description: "Building an advanced recommendation system using collaborative filtering and LLMs for personalized suggestions.",
    status: "Planning",
    progress: 20,
    team: [
      { name: "D", src: "https://placehold.co/50x50.png?t=4", dataAiHint: "person" },
      { name: "E", src: "https://placehold.co/50x50.png?t=5", dataAiHint: "person" },
    ],
    tags: ["Python", "Machine Learning", "LLM", "Big Data"],
    imageUrl: "https://placehold.co/400x200.png?prj=2",
    imageAiHint: "network algorithm"
  },
  {
    id: "3",
    name: "Mobile App Companion",
    description: "Creating a native mobile application for Synergy Hub to enhance on-the-go connectivity and notifications.",
    status: "Completed",
    progress: 100,
    team: [
      { name: "F", src: "https://placehold.co/50x50.png?t=6", dataAiHint: "person" },
      { name: "G", src: "https://placehold.co/50x50.png?t=7", dataAiHint: "person" },
      { name: "H", src: "https://placehold.co/50x50.png?t=8", dataAiHint: "person" },
    ],
    tags: ["React Native", "iOS", "Android", "Mobile UX"],
    imageUrl: "https://placehold.co/400x200.png?prj=3",
    imageAiHint: "mobile app"
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Workspaces</h1>
          <p className="text-muted-foreground">Collaborate, manage tasks, and share files for your projects.</p>
        </div>
        <Button>
          <PlusCircleIcon className="mr-2 h-5 w-5" /> Create New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProjects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg rounded-xl">
            {project.imageUrl && (
              <div className="relative h-40 w-full">
                <Image src={project.imageUrl} alt={project.name} layout="fill" objectFit="cover" data-ai-hint={project.imageAiHint}/>
              </div>
            )}
            <CardHeader className="pt-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderKanbanIcon className="h-5 w-5 text-primary" /> {project.name}
              </CardTitle>
              <CardDescription className="text-sm h-16 overflow-hidden text-ellipsis">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-3">
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} aria-label={`${project.progress}% complete`} />
              </div>
              <div className="mb-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Team</h4>
                <div className="flex -space-x-2">
                  {project.team.map(member => (
                    <Avatar key={member.name} className="h-7 w-7 border-2 border-card">
                      <AvatarImage src={member.src} data-ai-hint={member.dataAiHint}/>
                      <AvatarFallback>{member.name}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2 p-2 border-t bg-muted/30">
              <Button variant="outline" size="sm"><UsersIcon className="mr-1 h-4 w-4" /> Team</Button>
              <Button variant="outline" size="sm"><MessageSquareIcon className="mr-1 h-4 w-4" /> Discuss</Button>
              <Button variant="outline" size="sm"><FileTextIcon className="mr-1 h-4 w-4" /> Files</Button>
              <Button variant="outline" size="sm"><SettingsIcon className="mr-1 h-4 w-4" /> Settings</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
