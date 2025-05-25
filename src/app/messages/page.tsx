
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, SendIcon, SmileIcon } from "lucide-react"; // Removed PaperclipIcon
import { ScrollArea } from "@/components/ui/scroll-area";

const conversations = [
  { id: "1", name: "Alice Wonderland", lastMessage: "Sounds great! Let's discuss tomorrow.", time: "10:30 AM", unread: 2, avatar: "https://placehold.co/100x100.png?a=1", dataAiHint: "woman portrait" },
  { id: "2", name: "Bob The Builder", lastMessage: "Can you send over the project files?", time: "Yesterday", avatar: "https://placehold.co/100x100.png?a=2", dataAiHint: "man construction" },
  { id: "3", name: "Carol Danvers", lastMessage: "Meeting confirmed for 2 PM.", time: "Mon", avatar: "https://placehold.co/100x100.png?a=3", dataAiHint: "woman pilot" },
  { id: "4", name: "David Copperfield", lastMessage: "Thanks for the feedback!", time: "Sun", avatar: "https://placehold.co/100x100.png?a=4", dataAiHint: "man magician" },
];

const activeChatMessages = [
    { id: "m1", sender: "Alice Wonderland", text: "Hey there! How's the project going?", time: "10:25 AM", isOwn: false },
    { id: "m2", sender: "You", text: "Hi Alice! Going well, just wrapping up the UI.", time: "10:26 AM", isOwn: true },
    { id: "m3", sender: "Alice Wonderland", text: "Awesome! I saw the latest mockups, they look fantastic.", time: "10:28 AM", isOwn: false },
    { id: "m4", sender: "Alice Wonderland", text: "Sounds great! Let's discuss tomorrow.", time: "10:30 AM", isOwn: false },
];


export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col"> {/* Adjust height based on header/footer */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Direct Messages</h1>
        <p className="text-muted-foreground">Your private conversations live here.</p>
      </div>
      
      <Card className="flex-1 flex overflow-hidden shadow-lg rounded-xl">
        {/* Sidebar with conversations list */}
        <div className="w-1/3 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-8 bg-background" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {conversations.map(convo => (
              <div key={convo.id} className="flex items-center p-3 hover:bg-muted/50 cursor-pointer border-b">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={convo.avatar} data-ai-hint={convo.dataAiHint} />
                  <AvatarFallback>{convo.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{convo.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{convo.time}</p>
                  {convo.unread && convo.unread > 0 && (
                    <span className="mt-1 inline-block bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Main chat area */}
        <div className="w-2/3 flex flex-col bg-background">
          {conversations.length > 0 ? (
            <>
              <div className="p-4 border-b flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conversations[0].avatar} data-ai-hint={conversations[0].dataAiHint} />
                  <AvatarFallback>{conversations[0].name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{conversations[0].name}</p>
                  <p className="text-xs text-green-500">Online</p> {/* Placeholder for online status */}
                </div>
              </div>
              <ScrollArea className="flex-1 p-4 space-y-4">
                 {activeChatMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${msg.isOwn ? 'bg-primary text-primary-foreground' : 'bg-card shadow-sm'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>{msg.time}</p>
                        </div>
                    </div>
                 ))}
              </ScrollArea>
              <div className="p-4 border-t bg-card">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon"><SmileIcon className="h-5 w-5 text-muted-foreground" /></Button>
                  {/* PaperclipIcon removed to align with MVP: No file sharing */}
                  <Input placeholder="Type a message..." className="flex-1 bg-background" />
                  <Button><SendIcon className="h-5 w-5" /></Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
