import RecommendationCard from '@/components/recommendation-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SparklesIcon, UsersIcon, FolderKanbanIcon, BookOpenIcon, RefreshCwIcon } from 'lucide-react';

const sampleRecommendations = [
  {
    id: '1',
    type: 'connection',
    title: 'Connect with Dr. Elara Vance',
    description: 'Shared interest in Ethical AI and NLP. Potential collaborator for your research project.',
    icon: UsersIcon,
    avatarUrl: "https://placehold.co/100x100.png?p=1",
    dataAiHint: "scientist woman",
    actionText: 'View Profile',
  },
  {
    id: '2',
    type: 'project',
    title: 'Join Project "EcoSort"',
    description: 'Your skills in Python and Machine Learning match the needs of this sustainability tech project.',
    icon: FolderKanbanIcon,
    actionText: 'View Project',
  },
  {
    id: '3',
    type: 'resource',
    title: 'Advanced TypeScript Techniques Course',
    description: 'Based on your recent coding activity and interest in Next.js, this course could enhance your skills.',
    icon: BookOpenIcon,
    actionText: 'Learn More',
  },
  {
    id: '4',
    type: 'connection',
    title: 'Connect with Marcus Chen',
    description: 'Both of you are entrepreneurs working on developer productivity tools. Great for networking.',
    icon: UsersIcon,
    avatarUrl: "https://placehold.co/100x100.png?p=2",
    dataAiHint: "developer man",
    actionText: 'View Profile',
  },
];

export default function RecommendationsPage() {
  // In a real app, you would fetch these recommendations, possibly using flows from src/ai/flows
  // For now, we use placeholder data.

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <SparklesIcon className="mr-3 h-8 w-8 text-primary" />
            AI-Driven Recommendations
            </h1>
            <p className="text-muted-foreground">Personalized suggestions to help you connect, collaborate, and grow.</p>
        </div>
        <Button variant="outline">
            <RefreshCwIcon className="mr-2 h-4 w-4"/>
            Refresh Recommendations
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleRecommendations.map((rec) => (
          <RecommendationCard
            key={rec.id}
            title={rec.title}
            description={rec.description}
            IconComponent={rec.icon}
            actionText={rec.actionText}
            avatarUrl={rec.avatarUrl}
            dataAiHint={rec.dataAiHint}
          />
        ))}
      </div>

      {sampleRecommendations.length === 0 && (
         <Card className="col-span-full">
            <CardHeader>
                <CardTitle>No recommendations yet</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    We're working on generating personalized recommendations for you. 
                    Complete your profile and interact with the platform to get started!
                </p>
            </CardContent>
         </Card>
      )}
    </div>
  );
}
