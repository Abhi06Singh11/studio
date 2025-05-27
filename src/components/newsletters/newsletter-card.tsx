
"use client";

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UsersIcon, MailCheckIcon } from 'lucide-react';

interface NewsletterCardProps {
  id: string;
  title: string;
  author: string;
  summary: string;
  subscribers: number;
  imageUrl?: string;
  imageAiHint?: string;
  onJoinClick: () => void;
}

export default function NewsletterCard({
  title,
  author,
  summary,
  subscribers,
  imageUrl,
  imageAiHint,
  onJoinClick,
}: NewsletterCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full">
      {imageUrl && (
        <div className="relative h-32 w-full bg-muted">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" data-ai-hint={imageAiHint || "newsletter banner"} />
        </div>
      )}
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-semibold leading-snug line-clamp-2">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">By: {author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow text-xs space-y-1.5 text-muted-foreground">
        <p className="line-clamp-3">{summary}</p>
        <p className="flex items-center pt-1">
            <UsersIcon className="h-3.5 w-3.5 mr-1.5 text-primary" /> {subscribers.toLocaleString()} subscribers
        </p>
      </CardContent>
      <CardFooter className="p-3 border-t bg-muted/30">
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={onJoinClick}>
          <MailCheckIcon className="mr-2 h-3.5 w-3.5" /> Join Newsletter
        </Button>
      </CardFooter>
    </Card>
  );
}
    