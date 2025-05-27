
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import NewsletterCard from "@/components/newsletters/newsletter-card";
import CreateNewsletterModal from "@/components/newsletters/create-newsletter-modal";
import JoinNewsletterModal from "@/components/newsletters/join-newsletter-modal";
import { ArrowLeftIcon, PlusCircleIcon, MailCheckIcon, UsersIcon, EditIcon } from "lucide-react";

interface YourNewsletter {
  id: string;
  title: string;
  description: string;
  subscribers: number;
}

interface PopularNewsletter {
  id: string;
  title: string;
  author: string;
  summary: string;
  subscribers: number;
  imageUrl?: string;
  imageAiHint?: string;
}

const sampleYourNewsletters: YourNewsletter[] = [
  { id: "yn1", title: "My Tech Thoughts", description: "Weekly musings on software development and AI.", subscribers: 150 },
  { id: "yn2", title: "Startup Journey Log", description: "Documenting the ups and downs of building a SaaS product.", subscribers: 88 },
];

const samplePopularNewsletters: PopularNewsletter[] = [
  { id: "pn1", title: "Design Digest Weekly", author: "Jane Creative", summary: "Curated links and insights for UI/UX designers and product thinkers.", subscribers: 12500, imageUrl: "https://placehold.co/400x200.png?text=Design", imageAiHint: "design abstract" },
  { id: "pn2", title: "AI Frontier News", author: "Dr. Lex Data", summary: "The latest breakthroughs and discussions in artificial intelligence research and application.", subscribers: 45000, imageUrl: "https://placehold.co/400x200.png?text=AI+News", imageAiHint: "ai network" },
  { id: "pn3", title: "Full-Stack Fuel", author: "Dev Dynamo", summary: "Tips, tutorials, and tools for modern full-stack web developers.", subscribers: 22000, imageUrl: "https://placehold.co/400x200.png?text=WebDev", imageAiHint: "code screen" },
  { id: "pn4", title: "The Solopreneur Sprint", author: "Indie Hacker Hub", summary: "Strategies for building and growing a one-person business in the tech space.", subscribers: 8700, imageUrl: "https://placehold.co/400x200.png?text=SoloBiz", imageAiHint: "laptop desk" },
];

export default function NewslettersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);
  const [selectedNewsletterToJoin, setSelectedNewsletterToJoin] = React.useState<PopularNewsletter | null>(null);
  const [visiblePopularCount, setVisiblePopularCount] = React.useState(3); // Initial number of popular newsletters to show

  const handleOpenJoinModal = (newsletter: PopularNewsletter) => {
    setSelectedNewsletterToJoin(newsletter);
    setIsJoinModalOpen(true);
  };

  const handleShowMorePopular = () => {
    setVisiblePopularCount(prev => prev + 3); // Show 3 more
  };
  
  const handleNewsletterCreated = (data: any) => {
    // Conceptually, add to 'sampleYourNewsletters' or refresh list
    const newYourNewsletter = {
        id: `yn_${Date.now()}`,
        title: data.title,
        description: data.description,
        subscribers: 0, // New newsletters start with 0 subscribers
    };
    // In a real app, you'd update state to re-render the list
    console.log("New newsletter added (conceptually):", newYourNewsletter);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
              <MailCheckIcon className="h-8 w-8 text-primary" />
              <div>
                  <h1 className="text-3xl font-bold tracking-tight">Newsletters</h1>
                  <p className="text-muted-foreground">Discover, create, and subscribe to insightful newsletters.</p>
              </div>
          </div>
          <div className="flex gap-2">
              <Button variant="outline" asChild>
                  <Link href="/">
                      <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Feed
                  </Link>
              </Button>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                  <PlusCircleIcon className="mr-2 h-4 w-4" /> Create a Newsletter
              </Button>
          </div>
        </div>

        {/* Your Newsletters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Newsletters</CardTitle>
            <CardDescription>Newsletters you've created and manage.</CardDescription>
          </CardHeader>
          <CardContent>
            {sampleYourNewsletters.length > 0 ? (
              <ul className="space-y-4">
                {sampleYourNewsletters.map(nl => (
                  <li key={nl.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted/50 rounded-md hover:bg-muted/80">
                    <div className="flex-1 mb-2 sm:mb-0">
                      <h3 className="font-semibold text-md text-foreground">{nl.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{nl.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <UsersIcon className="h-3.5 w-3.5 mr-1"/> {nl.subscribers.toLocaleString()} subscribers
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                        <EditIcon className="mr-1.5 h-3.5 w-3.5"/> Manage
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">You haven't created any newsletters yet. Start one today!</p>
            )}
          </CardContent>
        </Card>

        {/* Popular Newsletters Section */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Popular Newsletters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePopularNewsletters.slice(0, visiblePopularCount).map(nl => (
              <NewsletterCard
                key={nl.id}
                id={nl.id}
                title={nl.title}
                author={nl.author}
                summary={nl.summary}
                subscribers={nl.subscribers}
                imageUrl={nl.imageUrl}
                imageAiHint={nl.imageAiHint}
                onJoinClick={() => handleOpenJoinModal(nl)}
              />
            ))}
          </div>
          {visiblePopularCount < samplePopularNewsletters.length && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={handleShowMorePopular}>Show More Newsletters</Button>
            </div>
          )}
           {samplePopularNewsletters.length === 0 && (
            <Card className="col-span-full">
                <CardContent className="p-6 text-center text-muted-foreground">
                    No popular newsletters to display right now.
                </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CreateNewsletterModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onNewsletterCreated={handleNewsletterCreated}
      />
      <JoinNewsletterModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
        newsletterTitle={selectedNewsletterToJoin?.title}
      />
    </>
  );
}
    