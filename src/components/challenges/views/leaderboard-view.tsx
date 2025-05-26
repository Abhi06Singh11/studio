
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrophyIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const sampleLeaderboardData = [
  { rank: 1, username: "CodeWizardPro", solved: 152, avatar: "https://placehold.co/40x40.png?l=1", dataAiHint: "wizard hat" },
  { rank: 2, username: "AlgoQueen", solved: 145, avatar: "https://placehold.co/40x40.png?l=2", dataAiHint: "crown icon" },
  { rank: 3, username: "ByteNinja", solved: 130, avatar: "https://placehold.co/40x40.png?l=3", dataAiHint: "ninja mask" },
  { rank: 4, username: "Dr. Elara Vance", solved: 125, avatar: "https://placehold.co/40x40.png?p=1", dataAiHint: "scientist woman"},
  { rank: 5, username: "Marcus Chen", solved: 110, avatar: "https://placehold.co/40x40.png?p=2", dataAiHint: "developer man"},
];

export default function LeaderboardView() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <TrophyIcon className="mr-2 h-6 w-6 text-primary" /> Leaderboard
        </CardTitle>
        <CardDescription>See who's topping the charts in coding challenges.</CardDescription>
      </CardHeader>

      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="overflow-auto flex-grow">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead className="text-right">Challenges Solved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleLeaderboardData.map((user) => (
                  <TableRow key={user.rank} className="hover:bg-muted/50">
                    <TableCell className="font-bold text-lg">{user.rank}</TableCell>
                    <TableCell>
                      <Link href="#" className="flex items-center gap-2 hover:underline">
                        <Avatar className="h-7 w-7 border">
                          <AvatarImage src={user.avatar} alt={user.username} data-ai-hint={user.dataAiHint} />
                          <AvatarFallback>{user.username.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.username}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{user.solved}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
