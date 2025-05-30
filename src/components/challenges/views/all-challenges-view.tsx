
"use client";
import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2Icon, ZapIcon, BarChart3Icon, TrophyIcon, ArrowRightIcon, FilterIcon, SearchIcon, ListChecksIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sampleChallenges = [
  {
    id: "1",
    title: "Algorithmic Thinking: Pathfinding",
    platform: "LeetCode",
    difficulty: "Hard",
    category: "Algorithms",
    userScore: null,
    status: "Unsolved",
    tags: ["Graphs", "Dijkstra's", "A*"],
    description: "Find the shortest path in a complex graph. Tests Dijkstra's and A* algorithms.",
    imageUrl: "https://placehold.co/400x200.png?ch=1",
    imageAiHint: "maze algorithm",
  },
  {
    id: "2",
    title: "React UI Challenge: Kanban Board",
    platform: "HackerRank",
    difficulty: "Medium",
    category: "Frontend",
    userScore: "92%",
    status: "Solved",
    tags: ["React", "TailwindCSS", "Frontend"],
    description: "Build a responsive and interactive Kanban board using React and Tailwind CSS.",
    imageUrl: "https://placehold.co/400x200.png?ch=2",
    imageAiHint: "kanban board",
  },
  {
    id: "3",
    title: "System Design: Distributed Cache",
    platform: "CodeHinge Custom",
    difficulty: "Expert",
    category: "System Design",
    userScore: "In Progress",
    status: "Unsolved",
    tags: ["System Design", "Caching", "Distributed Systems"],
    description: "Design a highly available and scalable distributed caching system.",
    imageUrl: "https://placehold.co/400x200.png?ch=3",
    imageAiHint: "server architecture",
  },
  {
    id: "4",
    title: "Python Data Wrangling",
    platform: "Kaggle",
    difficulty: "Easy",
    category: "Data Science",
    userScore: "Top 10%",
    status: "Solved",
    tags: ["Python", "Pandas", "NumPy"],
    description: "Clean and transform a messy dataset for analysis using Pandas and NumPy.",
    imageUrl: "https://placehold.co/400x200.png?ch=4",
    imageAiHint: "data chart",
  }
];

const difficultyOptions = ["All", "Easy", "Medium", "Hard", "Expert"];
const topicOptions = ["All", "Algorithms", "Data Structures", "Frontend", "Backend", "System Design", "Data Science", "AI/ML"];
const statusOptions = ["All", "Solved", "Unsolved", "In Progress"];

export default function AllChallengesView() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("All");
  const [selectedTopic, setSelectedTopic] = React.useState("All");
  const [selectedStatus, setSelectedStatus] = React.useState("All");

  const filteredChallenges = sampleChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === "All" || challenge.category === selectedTopic;
    const matchesStatus = selectedStatus === "All" || challenge.status === selectedStatus;
    return matchesSearch && matchesDifficulty && matchesTopic && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <ListChecksIcon className="mr-2 h-6 w-6 text-primary" /> All Challenges
        </CardTitle>
        <CardDescription>Browse, filter, and start coding challenges to sharpen your skills.</CardDescription>
      </CardHeader>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges by title or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-background"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger><SelectValue placeholder="Filter by difficulty" /></SelectTrigger>
              <SelectContent>{difficultyOptions.map(opt => <SelectItem key={opt} value={opt}>{opt} Difficulty</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger><SelectValue placeholder="Filter by topic" /></SelectTrigger>
              <SelectContent>{topicOptions.map(opt => <SelectItem key={opt} value={opt}>{opt} Topic</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>{statusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt} Status</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
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
                  challenge.difficulty === "Hard" || challenge.difficulty === "Expert" ? "destructive" :
                  challenge.difficulty === "Medium" ? "secondary" :
                  "default"
                } className="capitalize">{challenge.difficulty}</Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                Platform: {challenge.platform} &bull; Category: {challenge.category}
              </CardDescription>
               <div className="mt-1.5 flex flex-wrap gap-1">
                {challenge.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
               </div>
               {challenge.status && <div className="text-xs mt-1.5">Status: <Badge variant={challenge.status === "Solved" ? "default" : "secondary"}>{challenge.status}</Badge></div>}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
              {challenge.userScore && (
                <p className="text-sm font-medium">Your Score: <span className="text-primary">{challenge.userScore}</span></p>
              )}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button className="w-full">
                {challenge.status === "Unsolved" || challenge.status === "In Progress" ? "Start Challenge" : "View Solution"}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredChallenges.length === 0 && (
        <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
                No challenges found matching your criteria.
            </CardContent>
        </Card>
      )}
    </div>
  );
}
