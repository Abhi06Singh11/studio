
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Edit3Icon, Trash2Icon, EyeIcon, UserCheckIcon } from "lucide-react";

interface ChallengeEntry {
  id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  status: "Ongoing" | "Upcoming" | "Completed" | "Draft";
}

const sampleCreatedChallenges: ChallengeEntry[] = [
  { id: "cc1", title: "My Custom Algo Challenge", category: "Algorithms", difficulty: "Medium", status: "Draft" },
  { id: "cc2", title: "Frontend UI Test: Portfolio Site", category: "Frontend", difficulty: "Hard", status: "Upcoming" },
];

const sampleJoinedChallenges: ChallengeEntry[] = [
  { id: "jc1", title: "Global Coding Contest Q3", category: "Competitive Programming", difficulty: "Expert", status: "Ongoing" },
  { id: "jc2", title: "React State Management Challenge", category: "Frontend", difficulty: "Medium", status: "Completed" },
];

export default function MyChallengesView() {
  const renderChallengeCard = (challenge: ChallengeEntry, isCreator: boolean) => (
    <Card key={challenge.id} className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-base font-semibold">{challenge.title}</CardTitle>
        <CardDescription className="text-xs">
          Category: {challenge.category} &bull; Difficulty:{" "}
          <Badge
            variant={
              challenge.difficulty === "Hard" || challenge.difficulty === "Expert"
                ? "destructive"
                : challenge.difficulty === "Medium"
                ? "secondary"
                : "default"
            }
            className="capitalize"
          >
            {challenge.difficulty}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground">Status: <Badge variant="outline">{challenge.status}</Badge></p>
      </CardContent>
      <CardFooter className="p-3 border-t flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs">
          <EyeIcon className="mr-1.5 h-3.5 w-3.5" />
          View Details
        </Button>
        {isCreator && (challenge.status === "Draft" || challenge.status === "Upcoming") && (
          <>
            <Button variant="outline" size="sm" className="text-xs">
              <Edit3Icon className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
            <Button variant="destructive" size="sm" className="text-xs">
              <Trash2Icon className="mr-1.5 h-3.5 w-3.5" /> Delete
            </Button>
          </>
        )}
        {!isCreator && challenge.status === "Completed" && (
           <Button variant="outline" size="sm" className="flex-1 text-xs">View Submission</Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <UserCheckIcon className="mr-2 h-6 w-6 text-primary" /> My Challenges
        </CardTitle>
        <CardDescription>Manage challenges you've created or joined.</CardDescription>
      </CardHeader>

      <Tabs defaultValue="created" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-4 sticky top-0 bg-background z-10 py-2 shadow-sm">
          <TabsTrigger value="created">Created by Me</TabsTrigger>
          <TabsTrigger value="joined">Joined by Me</TabsTrigger>
        </TabsList>

        <TabsContent value="created" className="flex-1 overflow-hidden">
          <Card className="h-full">
            <CardContent className="p-4 h-full overflow-y-auto space-y-4">
              {sampleCreatedChallenges.length > 0 ? (
                sampleCreatedChallenges.map(challenge => renderChallengeCard(challenge, true))
              ) : (
                <p className="text-center text-muted-foreground py-10">You haven't created any challenges yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="joined" className="flex-1 overflow-hidden">
          <Card className="h-full">
            <CardContent className="p-4 h-full overflow-y-auto space-y-4">
              {sampleJoinedChallenges.length > 0 ? (
                sampleJoinedChallenges.map(challenge => renderChallengeCard(challenge, false))
              ) : (
                <p className="text-center text-muted-foreground py-10">You haven't joined any challenges yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
