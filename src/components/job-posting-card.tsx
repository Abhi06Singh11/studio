
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, LightbulbIcon, DollarSignIcon, CalendarDaysIcon, ArrowRightIcon, MapPinIcon, TagIcon } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

export interface JobPostingCardProps {
  id: string;
  title: string;
  company?: string;
  location?: string;
  description: string;
  skills: string[];
  budget?: string;
  timeline?: string;
  type: 'Job' | 'Project';
  imageUrl?: string;
  imageAiHint?: string;
  tags?: string[]; // New prop for tags
  // onApply: () => void; // Placeholder for apply action
  // onViewDetails: () => void; // Placeholder for view details action
}

export default function JobPostingCard({
  title,
  company,
  location,
  description,
  skills,
  budget,
  timeline,
  type,
  imageUrl,
  imageAiHint,
  tags,
}: JobPostingCardProps) {
  const TypeIcon: LucideIcon = type === 'Job' ? BriefcaseIcon : LightbulbIcon;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg rounded-xl h-full">
      {imageUrl && (
        <div className="relative h-40 w-full">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" data-ai-hint={imageAiHint} />
        </div>
      )}
      <CardHeader className="pt-4">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={type === 'Job' ? "default" : "secondary"} className="capitalize flex items-center">
            <TypeIcon className="h-3.5 w-3.5 mr-1.5" />
            {type}
          </Badge>
        </div>
        {company && <CardDescription className="text-sm font-medium">{company}</CardDescription>}
        {location && (
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPinIcon className="h-3 w-3 mr-1" /> {location}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        <div className="space-y-1">
          {budget && (
            <div className="flex items-center text-xs text-muted-foreground">
              <DollarSignIcon className="h-4 w-4 mr-1.5 text-primary" />
              Budget: <span className="font-semibold text-foreground ml-1">{budget}</span>
            </div>
          )}
          {timeline && (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDaysIcon className="h-4 w-4 mr-1.5 text-primary" />
              Timeline: <span className="font-semibold text-foreground ml-1">{timeline}</span>
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">Required Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 5).map(skill => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
            {skills.length > 5 && <Badge variant="outline">+{skills.length - 5} more</Badge>}
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 mt-2">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 5).map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
              {tags.length > 5 && <Badge variant="secondary">+{tags.length - 5} more</Badge>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button className="w-full">
          {type === 'Job' ? 'Apply Now' : 'View Project'}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
