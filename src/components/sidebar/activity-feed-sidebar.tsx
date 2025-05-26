
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, ChevronDownIcon, LightbulbIcon, NewspaperIcon, PuzzleIcon, InfoIcon, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopStory {
  id: string;
  headline: string;
  summary: string;
  timestamp: string;
  engagement: string; // e.g., "1.2k readers" or "300 likes"
  author?: {
    name: string;
    avatarUrl?: string;
    avatarAiHint?: string;
  };
  imageUrl?: string;
  imageAiHint?: string;
  link: string;
}

const sampleTopStories: TopStory[] = [
  {
    id: "ts1",
    headline: "The Future of AI in Collaborative Coding",
    summary: "Explore how next-gen AI tools are revolutionizing team workflows and code generation.",
    timestamp: "18h ago",
    engagement: "2.5k readers",
    author: { name: "CodeSphere Insights" },
    link: "#",
    imageUrl: "https://placehold.co/300x150.png?story=1",
    imageAiHint: "ai technology"
  },
  {
    id: "ts2",
    headline: "VC Funding Trends for Dev-Focused Startups in 2024",
    summary: "What investors are looking for in the current market. Key insights for entrepreneurs.",
    timestamp: "1d ago",
    engagement: "1.8k readers",
    link: "#",
    imageUrl: "https://placehold.co/300x150.png?story=2",
    imageAiHint: "financial chart"
  },
  {
    id: "ts3",
    headline: "Mastering Serverless Architectures with Next.js",
    summary: "A deep dive into building scalable serverless applications.",
    timestamp: "3d ago",
    engagement: "980 readers",
    link: "#",
  },
  {
    id: "ts4",
    headline: "Ethical Considerations in AI Product Development",
    summary: "Navigating the complex landscape of AI ethics for responsible innovation.",
    timestamp: "5d ago",
    engagement: "1.1k readers",
    link: "#",
  }
];

const samplePuzzle = {
  id: "pz1",
  title: "Today's Logic Puzzle",
  description: "A new algorithm challenge is up! Test your skills and climb the leaderboard.",
  link: "/challenges"
};

export default function ActivityFeedSidebar() {
  const [showMoreStories, setShowMoreStories] = React.useState(false);
  const storiesToShow = showMoreStories ? sampleTopStories : sampleTopStories.slice(0, 2);

  return (
    <aside className="w-full lg:w-80 xl:w-96 space-y-6 shrink-0">
      {/* Top Stories Section */}
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <NewspaperIcon className="mr-2 h-5 w-5 text-primary" />
            CodeSphere Top Stories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {storiesToShow.map((story) => (
            <div key={story.id} className="group">
              <Link href={story.link} className="block hover:bg-muted/50 p-2 rounded-md transition-colors">
                {story.imageUrl && (
                  <div className="relative h-32 w-full rounded-md overflow-hidden mb-2 border">
                    <Image src={story.imageUrl} alt={story.headline} layout="fill" objectFit="cover" data-ai-hint={story.imageAiHint || "news image"}/>
                  </div>
                )}
                <h4 className="text-sm font-semibold group-hover:text-primary">{story.headline}</h4>
                {story.author?.name && (
                   <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                        {story.author.avatarUrl && (
                             <Avatar className="h-4 w-4 mr-1.5">
                                <AvatarImage src={story.author.avatarUrl} data-ai-hint={story.author.avatarAiHint}/>
                                <AvatarFallback>{story.author.name.substring(0,1)}</AvatarFallback>
                             </Avatar>
                        )}
                       <span>{story.author.name}</span>
                   </div>
                )}
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{story.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{story.timestamp}</span>
                  <span>{story.engagement}</span>
                </div>
              </Link>
              <Separator className="my-2 group-last:hidden" />
            </div>
          ))}
        </CardContent>
        {sampleTopStories.length > 2 && (
          <CardFooter className="p-3 border-t">
            <Button
              variant="ghost"
              className="w-full text-sm text-primary hover:text-primary/90"
              onClick={() => setShowMoreStories(!showMoreStories)}
            >
              {showMoreStories ? "Show less" : "Show more"}
              <ChevronDownIcon className={cn("ml-1 h-4 w-4 transition-transform", showMoreStories && "rotate-180")} />
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Today's Puzzle/Challenge Section */}
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <PuzzleIcon className="mr-2 h-5 w-5 text-primary" />
            Today's Quick Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-semibold">{samplePuzzle.title}</p>
          <CardDescription className="text-sm mt-1">{samplePuzzle.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-3 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link href={samplePuzzle.link}>
              Take the Challenge <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Footer Links */}
      <div className="text-center text-xs text-muted-foreground space-x-2 p-4">
        <Link href="#" className="hover:underline">About</Link>
        <Link href="#" className="hover:underline">Accessibility</Link>
        <Link href="#" className="hover:underline">Help Center</Link>
        <Link href="#" className="hover:underline">Privacy & Terms</Link>
        <p className="mt-1">&copy; {new Date().getFullYear()} CodeSphere</p>
      </div>
    </aside>
  );
}
