
"use client";

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link'; // Import Link

interface EventCardProps {
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  imageUrl?: string;
  imageAiHint?: string;
  viewActionHref: string; // Added for navigation
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
  viewActionHref,
}: EventCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 h-full">
      {imageUrl && (
        <div className="relative h-40 w-full bg-muted">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" data-ai-hint={imageAiHint || "event image"} />
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
        <Button variant="outline" size="sm" className="w-full text-xs" asChild>
          <Link href={viewActionHref}>
            View Event <ArrowRightIcon className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
