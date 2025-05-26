
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HeartIcon, MessageCircleIcon, Share2Icon, MoreHorizontalIcon, SmilePlusIcon } from 'lucide-react';

interface ActivityFeedItemProps {
  userName: string;
  userAvatar: string;
  dataAiHint?: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  imageAiHint?: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function ActivityFeedItem({
  userName,
  userAvatar,
  dataAiHint,
  timestamp,
  content,
  imageUrl,
  imageAiHint,
  likes,
  comments,
  shares,
}: ActivityFeedItemProps) {
  // Sample reactions for UI demonstration
  const sampleReactions = [
    { emoji: '👍', count: 5 },
    { emoji: '🎉', count: 2 },
  ];

  return (
    <Card className="overflow-hidden shadow-lg rounded-xl">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar className="h-11 w-11">
          <AvatarImage src={userAvatar} alt={userName} data-ai-hint={dataAiHint} />
          <AvatarFallback>{userName.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{userName}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">{timestamp}</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <p className="text-sm mb-3 whitespace-pre-wrap">{content}</p>
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image src={imageUrl} alt="Feed image" fill style={{ objectFit: 'cover' }} data-ai-hint={imageAiHint}/>
          </div>
        )}
         {/* Display existing reactions - UI only */}
        <div className="mt-3 flex items-center space-x-2">
          {sampleReactions.map(reaction => (
            <Button key={reaction.emoji} variant="outline" size="sm" className="text-xs px-2 py-1 h-auto rounded-full">
              {reaction.emoji} <span className="ml-1 text-muted-foreground">{reaction.count}</span>
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 border-t space-y-2">
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm">
            <HeartIcon className="mr-2 h-4 w-4" /> {likes} Likes
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircleIcon className="mr-2 h-4 w-4" /> {comments} Comments
          </Button>
          <Button variant="ghost" size="sm">
            <Share2Icon className="mr-2 h-4 w-4" /> {shares} Shares
          </Button>
        </div>
        <div className="flex items-center space-x-1 pt-1 w-full border-t mt-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <SmilePlusIcon className="h-5 w-5"/>
                <span className="sr-only">Add reaction</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">👍</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">🎉</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">❤️</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">🤔</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
