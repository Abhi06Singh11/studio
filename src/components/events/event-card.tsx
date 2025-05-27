
"use client";

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon, ArrowRightIcon, StarIcon } from 'lucide-react';

interface EventCardProps {
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  imageUrl?: string;
  imageAiHint?: string;
  isPremium?: boolean;
}

export default function EventCard({
  title,
  organizer,
  date,
  time,
  location,
  attendeeCount,
  imageUrl,
  imageAiHint,
  isPremium = false,
}: EventCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full">
      {imageUrl && (
        <div className="relative h-40 w-full bg-muted">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" data-ai-hint={imageAiHint || "event image"} />
          {isPremium && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center shadow-md">
              <StarIcon className="h-3 w-3 mr-1 fill-white"/> Premium
            </div>
          )}
        </div>
      )}
      {!imageUrl && isPremium && (
         <div className="p-2 bg-amber-100 border-b border-amber-300 text-center">
            <p className="text-xs font-semibold text-amber-700 flex items-center justify-center">
                <StarIcon className="h-4 w-4 mr-1.5 fill-amber-500 text-amber-500"/> Premium Event
            </p>
         </div>
      )}
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base font-semibold leading-snug line-clamp-2">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Organized by: {organizer}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow text-xs space-y-1.5 text-muted-foreground">
        <p className="flex items-center"><CalendarDaysIcon className="h-3.5 w-3.5 mr-1.5 text-primary" /> {date}</p>
        <p className="flex items-center"><ClockIcon className="h-3.5 w-3.5 mr-1.5 text-primary" /> {time}</p>
        <p className="flex items-center"><MapPinIcon className="h-3.5 w-3.5 mr-1.5 text-primary" /> {location}</p>
        <p className="flex items-center"><UsersIcon className="h-3.5 w-3.5 mr-1.5 text-primary" /> {attendeeCount.toLocaleString()} attendees</p>
      </CardContent>
      <CardFooter className="p-3 border-t bg-muted/30">
        <Button variant="outline" size="sm" className="w-full text-xs">
          View Event <ArrowRightIcon className="ml-2 h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

    