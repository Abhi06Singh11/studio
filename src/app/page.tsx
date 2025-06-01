
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import ActivityFeedItem from '@/components/activity-feed-item';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardHeader, CardTitle, CardDescription
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VideoIcon, ImageIcon, FileTextIcon, HashIcon, SearchIcon, SparklesIcon } from 'lucide-react'; // Added SparklesIcon
import CreatePostModal from "@/components/post/create-post-modal";
import ActivityFeedSidebar from "@/components/sidebar/activity-feed-sidebar";
import NewsletterSidebar from "@/components/sidebar/newsletter-sidebar";
import PremiumCenterModal from "@/components/premium-flow/PremiumCenterModal"; // Import PremiumCenterModal
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialFeedItems = [
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

// New component for the Premium CTA Card
function PremiumCtaCard({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="items-center text-center pb-3">
        <SparklesIcon className="h-8 w-8 text-yellow-400 mb-2" />
        <CardTitle className="text-lg font-semibold">Unlock CodeHinge Premium</CardTitle>
        <CardDescription className="text-xs px-2">
          Elevate your experience with advanced tools, insights, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={onOpenModal} className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
          Explore Premium Plans
        </Button>
      </CardContent>
    </Card>
  );
}


export default function ActivityFeedPage() {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = React.useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = React.useState(false); // State for Premium Modal
  const router = useRouter();
  const [feedItems, setFeedItems] = React.useState(initialFeedItems);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredFeedItems = (feedItems || []).filter(item =>
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Removed py-8 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar - User Profile & Quick Access */}
          <div className="lg:col-span-3 space-y-6 order-1 lg:order-1">
            <ActivityFeedSidebar />
          </div>

          {/* Center Content - Activity Feed */}
          <main className="lg:col-span-6 space-y-6 order-2 lg:order-2">
            {/* Create Post Box */}
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
                    className="flex-1 justify-start text-left h-12 px-4 text-muted-foreground hover:text-accent-foreground"
                    onClick={() => setIsCreatePostModalOpen(true)}
                  >
                    Start a post, {currentUser.name?.split(' ')[0] || 'User'}...
                  </Button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 pt-3 border-t">
                  <Button variant="ghost" className="text-muted-foreground hover:text-accent-foreground hover:bg-accent flex items-center justify-center flex-col sm:flex-row h-auto py-2 sm:h-10 sm:py-1 text-xs sm:text-sm">
                    <VideoIcon className="mb-1 sm:mb-0 sm:mr-2 h-5 w-5 text-blue-500" /> Video
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground hover:text-accent-foreground hover:bg-accent flex items-center justify-center flex-col sm:flex-row h-auto py-2 sm:h-10 sm:py-1 text-xs sm:text-sm">
                    <ImageIcon className="mb-1 sm:mb-0 sm:mr-2 h-5 w-5 text-green-500" /> Photo
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground hover:text-accent-foreground hover:bg-accent flex items-center justify-center flex-col sm:flex-row h-auto py-2 sm:h-10 sm:py-1 text-xs sm:text-sm">
                    <FileTextIcon className="mb-1 sm:mb-0 sm:mr-2 h-5 w-5 text-orange-500" /> Write article
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Bar for Feed */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search feed by content or user..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <CreatePostModal
              isOpen={isCreatePostModalOpen}
              onOpenChange={setIsCreatePostModalOpen}
              currentUser={currentUser}
            />

            {/* Feed Items */}
            <div className="space-y-6">
              {filteredFeedItems.map((item) => (
                <ActivityFeedItem key={item.id} {...item} />
              ))}
              {filteredFeedItems.length === 0 && searchTerm && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No posts found matching your search term.
                  </CardContent>
                </Card>
              )}
            </div>
          </main>

          {/* Right Sidebar - Newsletter & Premium CTA (Desktop) */}
          <div className="lg:col-span-3 space-y-6 order-3 lg:order-3">
            <NewsletterSidebar />
            <PremiumCtaCard onOpenModal={() => setIsPremiumModalOpen(true)} /> {/* Use the new card component */}
          </div>

          {/* Sidebars for Mobile (Stacked) */}
          <div className="lg:hidden col-span-1 mt-8 space-y-6 order-4">
            <ActivityFeedSidebar />
            <NewsletterSidebar />
            <PremiumCtaCard onOpenModal={() => setIsPremiumModalOpen(true)} /> {/* Use the new card component */}
          </div>
        </div>
      </div>
      {/* Premium Modal */}
      <PremiumCenterModal
        isOpen={isPremiumModalOpen}
        onOpenChange={setIsPremiumModalOpen}
      />
    </>
  );
}

