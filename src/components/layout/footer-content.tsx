"use client"; 

import * as React from "react"; 
import Link from "next/link"; 
import ActivityFeedItem from '@/components/activity-feed-item';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VideoIcon, ImageIcon, FileTextIcon, HashIcon } from 'lucide-react';
import CreatePostModal from "@/components/post/create-post-modal"; 
import ActivityFeedSidebar from "@/components/sidebar/activity-feed-sidebar";
import NewsletterSidebar from "@/components/sidebar/newsletter-sidebar";
// FooterContent is removed as it's replaced by AppFooter in ClientRoot

const feedItems = [
  {
    id: '1',
    userName: 'Alice Wonderland',
    userAvatar: 'https://placehold.co/100x100.png?a=1',
    dataAiHint: 'woman portrait',
    timestamp: '2 hours ago',
    content: 'Excited to announce my new project "EcoSort", an AI-powered waste sorting assistant! Looking for collaborators interested in sustainability and tech. ♻️ #EcoTech #Sustainability',
    imageUrl: 'https://placehold.co/600x400.png?c=1',
    imageAiHint: 'recycling technology',
    likes: 120,
    comments: 15,
    shares: 8,
  },
  {
    id: '2',
    userName: 'Bob The Builder',
    userAvatar: 'https://placehold.co/100x100.png?a=2',
    dataAiHint: 'man construction',
    timestamp: '5 hours ago',
    content: 'Just completed the "Advanced Algorithm" challenge on CodeSphere Challenges! Scored in the top 10%. What a rush! 💪 #CodingChallenge #Algorithms',
    likes: 85,
    comments: 7,
    shares: 3,
  },
  {
    id: '3',
    userName: 'Carol Danvers',
    userAvatar: 'https://placehold.co/100x100.png?a=3',
    dataAiHint: 'woman pilot',
    timestamp: '1 day ago',
    content: 'Our startup "Starlight Ventures" just secured seed funding! Thanks to everyone who believed in our vision to explore new frontiers. To infinity and beyond! 🚀 #StartupLife #Funding',
    imageUrl: 'https://placehold.co/600x300.png?c=2',
    imageAiHint: 'startup team',
    likes: 250,
    comments: 42,
    shares: 18,
  },
];

const currentUser = {
  name: "Dr. Elara Vance", 
  avatarUrl: "https://placehold.co/100x100.png?p=1", 
  avatarAiHint: "scientist woman"
};

export default function ActivityFeedPage() {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = React.useState(false);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="hidden lg:block lg:col-span-3">
          <ActivityFeedSidebar />
        </div>

        <main className="col-span-1 lg:col-span-6 space-y-6">
          <Card className="shadow-lg rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Link href="/profiles/edit" passHref>
                  <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.avatarAiHint} />
                    <AvatarFallback>{currentUser.name?.substring(0, 1) || 'U'}</AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  variant="outline"
                  className="flex-1 justify-start text-left h-12 px-4 text-muted-foreground hover:bg-muted/50 hover:text-accent-foreground"
                  onClick={() => setIsCreatePostModalOpen(true)}
                >
                  Start a post, {currentUser.name?.split(' ')[0] || 'User'}...
                </Button>
              </div>
              <div className="mt-3 flex justify-around pt-3 border-t">
                <Button variant="ghost" className="text-muted-foreground hover:bg-muted/50 hover:text-accent-foreground flex-1">
                  <VideoIcon className="mr-2 h-5 w-5 text-blue-500" /> Video
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:bg-muted/50 hover:text-accent-foreground flex-1">
                  <ImageIcon className="mr-2 h-5 w-5 text-green-500" /> Photo
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:bg-muted/50 hover:text-accent-foreground flex-1">
                  <FileTextIcon className="mr-2 h-5 w-5 text-orange-500" /> Write article
                </Button>
              </div>
            </CardContent>
          </Card>

          <CreatePostModal
            isOpen={isCreatePostModalOpen}
            onOpenChange={setIsCreatePostModalOpen}
            currentUser={currentUser}
          />

          <div className="space-y-6">
            {feedItems.map((item) => (
              <ActivityFeedItem key={item.id} {...item} />
            ))}
          </div>
        </main>

        <div className="hidden lg:block lg:col-span-3">
          <NewsletterSidebar />
          {/* FooterContent removed from here */}
        </div>

        <div className="lg:hidden col-span-1 space-y-8 mt-8">
          <ActivityFeedSidebar /> 
          <NewsletterSidebar />
          {/* FooterContent removed from here */}
        </div>
      </div>
    </div>
  );
}