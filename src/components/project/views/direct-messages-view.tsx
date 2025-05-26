
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, UsersIcon, SendIcon, MessageSquareIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const sampleDMs = [
  { id: "dm1", name: "Dr. Elara Vance", lastMessage: "Sure, let's sync up tomorrow morning.", time: "2h ago", avatar: "https://placehold.co/100x100.png?t=1", dataAiHint:"scientist woman", unread: 1 },
  { id: "dm2", name: "Marcus Chen", lastMessage: "I've pushed the latest updates to the dev branch.", time: "5h ago", avatar: "https://placehold.co/100x100.png?t=2", dataAiHint:"developer man" },
  { id: "dm3", name: "Aisha Khan", lastMessage: "Can you review the Q3 budget proposal?", time: "Yesterday", avatar: "https://placehold.co/100x100.png?t=3", dataAiHint:"business woman" },
];

export default function DirectMessagesView() {
  return (
    <div className="space-y-6 h-full flex flex-col">
       <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <UsersIcon className="mr-2 h-6 w-6 text-primary" /> Direct Messages
        </CardTitle>
        <CardDescription>Your private conversations with team members.</CardDescription>
      </CardHeader>
      
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search direct messages..." className="pl-8 bg-card" />
      </div>

      <Card className="flex-1">
        <CardContent className="p-0">
          {sampleDMs.length > 0 ? (
            <ul className="divide-y divide-border">
              {sampleDMs.map(dm => (
                <li key={dm.id} className="p-3 hover:bg-muted/50 cursor-pointer flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={dm.avatar} alt={dm.name} data-ai-hint={dm.dataAiHint} />
                    <AvatarFallback>{dm.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-foreground truncate">{dm.name}</p>
                      <p className="text-xs text-muted-foreground">{dm.time}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground truncate">{dm.lastMessage}</p>
                      {dm.unread && <span className="text-xs bg-primary text-primary-foreground font-semibold px-1.5 py-0.5 rounded-full">{dm.unread}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <MessageSquareIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">No direct messages</p>
              <p className="text-sm text-muted-foreground/80">Start a conversation with a team member.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
