
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AtSignIcon, BellIcon, UserIcon, MessageSquareIcon, ZapIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const sampleActivities = [
  { id: "act1", type: "mention", user: "Marcus Chen", avatar: "https://placehold.co/100x100.png?t=2", dataAiHint:"developer man", text: "mentioned you in #dev-team: '@YourName can you take a look at this PR?'", time: "1h ago" },
  { id: "act2", type: "reaction", user: "Dr. Elara Vance", avatar: "https://placehold.co/100x100.png?t=1", dataAiHint:"scientist woman", text: "reacted 👍 to your comment in Project Phoenix.", time: "3h ago" },
  { id: "act3", type: "task", user: "System", avatar: "https://placehold.co/100x100.png?text=CS", dataAiHint:"system logo", text: "Task 'Deploy to Staging' assigned to you in Project Nightingale is due tomorrow.", time: "5h ago" },
  { id: "act4", type: "comment", user: "Aisha Khan", avatar: "https://placehold.co/100x100.png?t=3", dataAiHint:"business woman", text: "replied to your thread in #marketing-campaign-q3.", time: "Yesterday" },
];

const getActivityIcon = (type: string) => {
    switch(type) {
        case "mention": return <AtSignIcon className="h-4 w-4 text-blue-500"/>;
        case "reaction": return <ZapIcon className="h-4 w-4 text-yellow-500"/>;
        case "comment": return <MessageSquareIcon className="h-4 w-4 text-green-500"/>;
        default: return <BellIcon className="h-4 w-4 text-muted-foreground"/>;
    }
}

export default function MentionsActivityView() {
  return (
    <div className="space-y-6 h-full flex flex-col">
       <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <AtSignIcon className="mr-2 h-6 w-6 text-primary" /> Mentions & Activity
        </CardTitle>
        <CardDescription>Keep track of mentions, reactions, and other important notifications.</CardDescription>
      </CardHeader>

      <div className="flex items-center justify-between">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue placeholder="Filter activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activity</SelectItem>
            <SelectItem value="mentions">Mentions</SelectItem>
            <SelectItem value="reactions">Reactions</SelectItem>
            <SelectItem value="tasks">Tasks</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <Card className="flex-1">
        <CardContent className="p-0">
          {sampleActivities.length > 0 ? (
            <ul className="divide-y divide-border">
              {sampleActivities.map(activity => (
                <li key={activity.id} className="p-3 hover:bg-muted/50 cursor-pointer flex items-start space-x-3">
                  <Avatar className="h-9 w-9 border mt-0.5">
                    <AvatarImage src={activity.avatar} alt={activity.user} data-ai-hint={activity.dataAiHint} />
                    <AvatarFallback>{activity.user.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center text-xs text-muted-foreground mb-0.5">
                        {getActivityIcon(activity.type)}
                        <span className="ml-1.5 font-medium text-foreground">{activity.user}</span>
                        <span className="mx-1">&bull;</span>
                        <span>{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
             <div className="p-6 text-center h-full flex flex-col items-center justify-center">
              <BellIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">No new activity</p>
              <p className="text-sm text-muted-foreground/80">You're all caught up!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
