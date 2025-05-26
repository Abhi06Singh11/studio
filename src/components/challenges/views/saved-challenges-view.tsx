
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, ArrowRightIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const sampleSavedChallenges = [
  { id: "sc1", title: "Tree Traversal Techniques", difficulty: "Medium", tags: ["Trees", "DFS", "BFS"], platform: "CodeSignal" },
  { id: "sc2", title: "Dynamic Programming Basics", difficulty: "Hard", tags: ["DP", "Optimization"], platform: "TopCoder" },
  { id: "sc3", title: "String Manipulation Advanced", difficulty: "Medium", tags: ["Strings", "Regex"], platform: "HackerEarth" },
];

export default function SavedChallengesView() {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredChallenges = sampleSavedChallenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <BookmarkIcon className="mr-2 h-6 w-6 text-primary" /> Saved Challenges
        </CardTitle>
        <CardDescription>Your bookmarked challenges to solve later.</CardDescription>
      </CardHeader>

      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
            placeholder="Search saved challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-card"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {filteredChallenges.length > 0 ? filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 pt-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-semibold">{challenge.title}</CardTitle>
                <Badge variant={
                    challenge.difficulty === "Hard" ? "destructive" :
                    challenge.difficulty === "Medium" ? "secondary" : "default"
                } className="capitalize">{challenge.difficulty}</Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">Platform: {challenge.platform}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-1.5">
                {challenge.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
              </div>
            </CardContent>
            <CardContent className="p-3 border-t bg-muted/30">
              <Button size="sm" className="w-full">
                Start Now <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )) : (
            <Card>
                <CardContent className="p-10 text-center text-muted-foreground">
                    No saved challenges found.
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
