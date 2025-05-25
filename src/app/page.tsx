import ActivityFeedItem from '@/components/activity-feed-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaperclipIcon, SendIcon } from 'lucide-react';

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

export default function ActivityFeedPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src="https://placehold.co/100x100.png?a=user" data-ai-hint="user icon"/>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input placeholder="What's on your mind?" className="mb-2 h-20 resize-none bg-background" as="textarea" />
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="icon">
                  <PaperclipIcon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button>
                  <SendIcon className="mr-2 h-4 w-4" /> Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {feedItems.map((item) => (
          <ActivityFeedItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
