
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import EventCard from "@/components/events/event-card";
import CreateEventModal from "@/components/events/create-event-modal";
import { ArrowLeftIcon, PlusCircleIcon, CalendarCheck2Icon, StarIcon, UsersIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const sampleUserEvents = [
  { id: "ue1", title: "My Workshop on AI Tools", attendees: 12, date: "June 10, 2025" },
  { id: "ue2", title: "Team Sync: Project Alpha", attendees: 5, date: "June 12, 2025" },
];

const sampleRecommendedEvents = [
  { id: "re1", title: "AI Tools for Business Productivity", organizer: "Tech Solutions Inc.", date: "June 20, 2025", time: "9:00 AM", location: "Online Conference", attendeeCount: 120, imageUrl: "https://placehold.co/400x200.png?text=AI+Biz", imageAiHint: "business meeting" },
  { id: "re2", title: "Tech Talks Live: The Future of Development", organizer: "CodeSphere Community", date: "June 22, 2025", time: "3:00 PM", location: "Virtual Meetup", attendeeCount: 85, imageUrl: "https://placehold.co/400x200.png?text=TechTalk", imageAiHint: "presentation stage" },
  { id: "re3", title: "Virtual Workshop: Advanced Design Thinking", organizer: "Innovate Hub", date: "June 25, 2025", time: "11:00 AM", location: "Online", attendeeCount: 45, imageUrl: "https://placehold.co/400x200.png?text=Design", imageAiHint: "design workshop" },
  { id: "re4", title: "Startup Pitch Night & Networking", organizer: "Venture Connect", date: "June 28, 2025", time: "5:00 PM", location: "City Convention Hall", attendeeCount: 200, imageUrl: "https://placehold.co/400x200.png?text=Pitch", imageAiHint: "startup pitch" },
];

export default function EventsPage() {
  const router = useRouter();
  const [visibleRecommendedCount, setVisibleRecommendedCount] = React.useState(4);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = React.useState(false);

  const handleShowMore = () => {
    setVisibleRecommendedCount(prev => prev + 4); 
  };

  const handleEventCreated = (eventData: any) => {
    console.log("New event created (conceptually):", eventData);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
              <CalendarCheck2Icon className="h-8 w-8 text-primary" />
              <div>
                  <h1 className="text-3xl font-bold tracking-tight">Events</h1>
                  <p className="text-muted-foreground">Discover and create professional events.</p>
              </div>
          </div>
          <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setIsCreateEventModalOpen(true)}>
                  <PlusCircleIcon className="mr-2 h-4 w-4" /> Create Event
              </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Upcoming Events</CardTitle>
            <CardDescription>Quick overview of events you're hosting or attending.</CardDescription>
          </CardHeader>
          <CardContent>
            {sampleUserEvents.length > 0 ? (
              <ul className="space-y-3">
                {sampleUserEvents.map(event => (
                  <li key={event.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md hover:bg-muted/80">
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date} &bull; {event.attendees} attendees</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => alert(`Manage event: ${event.title}`)}>Manage</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">You have no upcoming events.</p>
            )}
          </CardContent>
        </Card>
        
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleRecommendedEvents.slice(0, visibleRecommendedCount).map(event => (
              <EventCard
                key={event.id}
                title={event.title}
                organizer={event.organizer}
                date={event.date}
                time={event.time}
                location={event.location}
                attendeeCount={event.attendeeCount}
                imageUrl={event.imageUrl}
                imageAiHint={event.imageAiHint}
                viewActionHref="#" 
              />
            ))}
          </div>
          {visibleRecommendedCount < sampleRecommendedEvents.length && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={handleShowMore}>Show More Events</Button>
            </div>
          )}
          {sampleRecommendedEvents.length === 0 && (
              <Card className="col-span-full">
                  <CardContent className="p-6 text-center text-muted-foreground">
                      No recommended events at this time. Explore or create new events!
                  </CardContent>
              </Card>
          )}
        </div>
      </div>
      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onOpenChange={setIsCreateEventModalOpen}
        onEventCreated={handleEventCreated}
      />
    </>
  );
}
