import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2Icon, ZapIcon, BarChart3Icon, TrophyIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const sampleChallenges = [
  {
    id: "1",
    title: "Algorithmic Thinking: Pathfinding",
    platform: "LeetCode",
    difficulty: "Hard",
    category: "Algorithms",
    userScore: null,
    description: "Find the shortest path in a complex graph. Tests Dijkstra's and A* algorithms.",
    imageUrl: "https://placehold.co/400x200.png?ch=1",
    imageAiHint: "maze algorithm"
  },
  {
    id: "2",
    title: "React UI Challenge: Kanban Board",
    platform: "HackerRank",
    difficulty: "Medium",
    category: "Frontend",
    userScore: "92%",
    description: "Build a responsive and interactive Kanban board using React and Tailwind CSS.",
    imageUrl: "https://placehold.co/400x200.png?ch=2",
    imageAiHint: "kanban board"
  },
  {
    id: "3",
    title: "System Design: Distributed Cache",
    platform: "CodeSphere Custom",
    difficulty: "Expert",
    category: "System Design",
    userScore: "In Progress",
    description: "Design a highly available and scalable distributed caching system.",
    imageUrl: "https://placehold.co/400x200.png?ch=3",
    imageAiHint: "server architecture"
  },
  {
    id: "4",
    title: "Python Data Wrangling",
    platform: "Kaggle",
    difficulty: "Easy",
    category: "Data Science",
    userScore: "Top 10%",
    description: "Clean and transform a messy dataset for analysis using Pandas and NumPy.",
    imageUrl: "https://placehold.co/400x200.png?ch=4",
    imageAiHint: "data chart"
  }
];

export default function ChallengesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coding Challenges</h1>
          <p className="text-muted-foreground">Sharpen your skills, compete, and get noticed.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><BarChart3Icon className="mr-2 h-4 w-4" /> View Leaderboard</Button>
            <Button><TrophyIcon className="mr-2 h-4 w-4" /> My Performance</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleChallenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden shadow-lg rounded-xl flex flex-col">
            {challenge.imageUrl && (
                <div className="relative h-40 w-full">
                    <Image src={challenge.imageUrl} alt={challenge.title} layout="fill" objectFit="cover" data-ai-hint={challenge.imageAiHint}/>
                </div>
            )}
            <CardHeader className="pt-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <Badge variant={
                  challenge.difficulty === "Hard" ? "destructive" :
                  challenge.difficulty === "Medium" ? "secondary" : // Using secondary, could be custom
                  "default" // For Easy
                } className="capitalize">{challenge.difficulty}</Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Platform: {challenge.platform} &bull; Category: {challenge.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
              {challenge.userScore && (
                <p className="text-sm font-medium">Your Score: <span className="text-primary">{challenge.userScore}</span></p>
              )}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button className="w-full">
                {challenge.userScore === "In Progress" ? "Continue Challenge" : "Attempt Challenge"}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
