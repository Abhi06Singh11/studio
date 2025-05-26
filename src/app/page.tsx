
import ActivityFeedItem from '@/components/activity-feed-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaperclipIcon, SendIcon, HashIcon, VideoIcon, ImageIcon, FileTextIcon } from 'lucide-react'; // Added VideoIcon, ImageIcon, FileTextIcon
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // Added Input for consistency, though might not be used in the final version of this simplified trigger

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

// Sample user data (replace with actual data or context in a real app)
const currentUser = {
  name: "Elara Vance", // Or fetch dynamically
  avatarUrl: "https://placehold.co/100x100.png?a=user",
  avatarAiHint: "user icon"
};

export default function ActivityFeedPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      {/* LinkedIn-style "Start a Post" Card */}
      <Card className="mb-6 shadow-lg rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.avatarAiHint} />
              <AvatarFallback>{currentUser.name?.substring(0, 1) || 'U'}</AvatarFallback>
            </Avatar>
            {/* Placeholder for "Start a post" input - clicking this would open a modal/expanded view */}
            <Button 
              variant="outline" 
              className="flex-1 justify-start text-left h-12 px-4 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              // onClick={() => console.log("Open post creation modal/editor")} // Conceptual action
            >
              Start a post, {currentUser.name?.split(' ')[0] || 'User'}...
            </Button>
          </div>
          <div className="mt-3 flex justify-around pt-3 border-t">
            <Button variant="ghost" className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex-1">
              <VideoIcon className="mr-2 h-5 w-5 text-blue-500" /> Video
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex-1">
              <ImageIcon className="mr-2 h-5 w-5 text-green-500" /> Photo
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex-1">
              <FileTextIcon className="mr-2 h-5 w-5 text-orange-500" /> Write article
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed Items */}
      <div className="space-y-6">
        {feedItems.map((item) => (
          <ActivityFeedItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
