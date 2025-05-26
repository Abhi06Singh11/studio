
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, LightbulbIcon, DollarSignIcon, CalendarDaysIcon, ArrowRightIcon, MapPinIcon, TagIcon, ClockIcon } from "lucide-react";
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
  type: 'Job' | 'Project'; // Primary category
  employmentType?: string; // Specific employment type like "Full-Time", "Contract"
  imageUrl?: string;
  imageAiHint?: string;
  tags?: string[];
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
  employmentType,
  imageUrl,
  imageAiHint,
  tags,
}: JobPostingCardProps) {
  const TypeIcon: LucideIcon = type === 'Job' ? BriefcaseIcon : LightbulbIcon;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg rounded-xl h-full hover:shadow-2xl transition-shadow duration-300">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" data-ai-hint={imageAiHint} />
        </div>
      )}
      <CardHeader className="pt-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <TypeIcon className="h-5 w-5 text-primary flex-shrink-0" />
          <CardTitle className="text-lg font-semibold truncate">{title}</CardTitle>
        </div>
        {company && <CardDescription className="text-sm font-medium text-foreground">{company}</CardDescription>}
        {location && (
          <div className="flex items-center text-xs text-muted-foreground mt-0.5">
            <MapPinIcon className="h-3.5 w-3.5 mr-1" /> {location}
          </div>
        )}
        {employmentType && (
          <div className="mt-1.5">
            <Badge variant="outline" className="text-xs py-0.5 px-1.5">
                <ClockIcon className="h-3 w-3 mr-1"/>
                {employmentType}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow pt-2 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        <div className="space-y-1.5">
          {budget && (
            <div className="flex items-center text-xs text-muted-foreground">
              <DollarSignIcon className="h-4 w-4 mr-1.5 text-green-600" />
              Budget: <span className="font-medium text-foreground ml-1">{budget}</span>
            </div>
          )}
          {timeline && (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDaysIcon className="h-4 w-4 mr-1.5 text-blue-600" />
              Timeline: <span className="font-medium text-foreground ml-1">{timeline}</span>
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">Required Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 5).map(skill => (
              <Badge key={skill} variant="secondary" className="text-xs font-medium">{skill}</Badge>
            ))}
            {skills.length > 5 && <Badge variant="outline" className="text-xs font-medium">+{skills.length - 5} more</Badge>}
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 mt-2.5">Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 5).map(tag => (
                <Badge key={tag} variant="outline" className="text-xs font-medium bg-muted/50">{tag}</Badge>
              ))}
              {tags.length > 5 && <Badge variant="outline" className="text-xs font-medium bg-muted/50">+{tags.length - 5} more</Badge>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 border-t bg-muted/30">
        <Button className="w-full">
          {type === 'Job' ? 'Apply Now' : 'View Project Details'}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
