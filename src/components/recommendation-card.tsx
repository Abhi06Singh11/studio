import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRightIcon } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  description: string;
  IconComponent: LucideIcon;
  actionText: string;
  avatarUrl?: string;
  dataAiHint?: string;
}

export default function RecommendationCard({
  title,
  description,
  IconComponent,
  actionText,
  avatarUrl,
  dataAiHint,
}: RecommendationCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg rounded-xl h-full">
      <CardHeader className="flex flex-row items-start space-x-3 pb-3">
        {avatarUrl ? (
            <Avatar className="h-12 w-12 border">
                <AvatarImage src={avatarUrl} alt={title} data-ai-hint={dataAiHint} />
                <AvatarFallback>{title.substring(0,1)}</AvatarFallback>
            </Avatar>
        ) : (
            <div className="p-3 bg-primary/10 rounded-lg">
                <IconComponent className="h-6 w-6 text-primary" />
            </div>
        )}
        <div>
          <CardTitle className="text-base font-semibold leading-tight">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button variant="outline" className="w-full">
          {actionText}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
