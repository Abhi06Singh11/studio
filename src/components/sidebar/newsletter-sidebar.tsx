
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheckIcon, ArrowRightIcon } from "lucide-react";

const sampleNewsletters = [
  { id: "nl1", title: "AI Weekly: GenAI Breakthroughs", source: "TechCrunch AI", date: "3d ago", summary: "DeepMind's latest model shows unprecedented reasoning capabilities..." },
  { id: "nl2", title: "Developer Productivity Hacks", source: "CodeSphere Blog", date: "1w ago", summary: "Boost your coding speed with these 5 essential tips for modern developers." },
  { id: "nl3", title: "Startup Funding Trends Q3", source: "VC Insights", date: "2w ago", summary: "Seed stage funding sees a slight uptick, with a continued focus on sustainable tech and AI." },
  { id: "nl4", title: "The Future of Remote Work", source: "Global Workplace", date: "1mo ago", summary: "Exploring new models and tools for effective distributed teams." },
];

export default function NewsletterSidebar() {
  return (
    <aside className="w-full space-y-6 shrink-0">
      <Card className="shadow-lg rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg font-semibold">
            <MailCheckIcon className="mr-2.5 h-5 w-5 text-primary" />
            Latest Newsletters
          </CardTitle>
          <CardDescription className="text-xs">Stay updated with curated insights and news.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {sampleNewsletters.slice(0, 3).map(nl => (
            <Link href="#" key={nl.id} className="block p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary">{nl.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{nl.source} &bull; {nl.date}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{nl.summary}</p>
            </Link>
          ))}
          <Button variant="outline" className="w-full mt-3 text-sm" asChild>
            <Link href="#">
              View All Newsletters <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
      {/* You can add more newsletter-related cards here, e.g., a subscribe box */}
    </aside>
  );
}
