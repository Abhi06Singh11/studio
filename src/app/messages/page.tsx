
"use client";
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, SendIcon, SmileIcon, PinIcon, StarIcon, MessageSquareReplyIcon, CheckIcon, CheckCheckIcon, ThumbsUpIcon, HeartIcon, LaughIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type UserPresence = 'online' | 'offline' | 'away';

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
  reactions?: Array<{ emoji: string; count: number; userHasReacted?: boolean }>;
  status?: 'sent' | 'delivered' | 'read'; // For own messages
  isStarred?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar: string;
  dataAiHint: string;
  presence: UserPresence;
  lastActive?: string;
  pinnedMessages?: Array<{ id: string; text: string; sender: string; time: string }>;
}

const initialConversations: Conversation[] = [
  { 
    id: "1", 
    name: "Alice Wonderland", 
    lastMessage: "Sounds great! Let's discuss tomorrow.", 
    time: "10:30 AM", 
    unread: 2, 
    avatar: "https://placehold.co/100x100.png?a=1", 
    dataAiHint: "woman portrait", 
    presence: "online",
    pinnedMessages: [
      { id: "pm1", text: "Remember the meeting at 2 PM today!", sender: "Alice Wonderland", time: "9:00 AM" },
      { id: "pm2", text: "Project files are in the shared drive.", sender: "You", time: "Yesterday" },
    ]
  },
  { id: "2", name: "Bob The Builder", lastMessage: "Can you send over the project files?", time: "Yesterday", avatar: "https://placehold.co/100x100.png?a=2", dataAiHint: "man construction", presence: "offline", lastActive: "2h ago" },
  { id: "3", name: "Carol Danvers", lastMessage: "Meeting confirmed for 2 PM.", time: "Mon", avatar: "https://placehold.co/100x100.png?a=3", dataAiHint: "woman pilot", presence: "away" },
  { id: "4", name: "David Copperfield", lastMessage: "Thanks for the feedback!", time: "Sun", avatar: "https://placehold.co/100x100.png?a=4", dataAiHint: "man magician", presence: "online" },
];

const initialActiveChatMessages: ChatMessage[] = [
    { 
      id: "m1", 
      sender: "Alice Wonderland", 
      text: "Hey there! How's the project going?", 
      time: "10:25 AM", 
      isOwn: false,
      reactions: [{ emoji: '👋', count: 1}],
      isStarred: false,
    },
    { 
      id: "m2", 
      sender: "You", 
      text: "Hi Alice! Going well, just wrapping up the UI. This message is a bit longer to test how the layout handles multiple lines of text and to see if the reactions and actions still align properly.", 
      time: "10:26 AM", 
      isOwn: true,
      status: 'read',
      isStarred: true,
    },
    { 
      id: "m3", 
      sender: "Alice Wonderland", 
      text: "Awesome! I saw the latest mockups, they look fantastic.", 
      time: "10:28 AM", 
      isOwn: false,
      reactions: [{ emoji: '👍', count: 2, userHasReacted: true }, { emoji: '🎉', count: 1}],
      isStarred: false,
    },
    { 
      id: "m4", 
      sender: "Alice Wonderland", 
      text: "Sounds great! Let's discuss tomorrow.", 
      time: "10:30 AM", 
      isOwn: false,
      isStarred: true,
    },
    {
      id: "m5",
      sender: "You",
      text: "Perfect, looking forward to it!",
      time: "10:31 AM",
      isOwn: true,
      status: 'delivered',
      isStarred: false,
    }
];


export default function MessagesPage() {
  const [conversations, setConversations] = React.useState(initialConversations);
  const [activeChatMessages, setActiveChatMessages] = React.useState(initialActiveChatMessages);
  
  // For MVP, let's assume the first conversation is active.
  // In a real app, this would be managed by state based on user interaction.
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(conversations.length > 0 ? conversations[0].id : null);
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  // Placeholder functions for actions
  const toggleStarMessage = (messageId: string) => {
    setActiveChatMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
  };

  const addReactionToMessage = (messageId: string, emoji: string) => {
    // This is a placeholder. In a real app, you'd update counts, check if user already reacted, etc.
    console.log(`Reacted with ${emoji} to message ${messageId}`);
    setActiveChatMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions?.map(r => 
                r.emoji === emoji ? { ...r, count: r.count + 1, userHasReacted: true } : r
              )
            };
          } else {
            return {
              ...msg,
              reactions: [...(msg.reactions || []), { emoji, count: 1, userHasReacted: true }]
            };
          }
        }
        return msg;
      })
    );
  };

  const getStatusIcon = (status?: 'sent' | 'delivered' | 'read') => {
    if (status === 'read') return <CheckCheckIcon className="h-4 w-4 text-blue-500" />;
    if (status === 'delivered') return <CheckCheckIcon className="h-4 w-4 text-muted-foreground" />;
    if (status === 'sent') return <CheckIcon className="h-4 w-4 text-muted-foreground" />;
    return null;
  };

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
              <div 
                key={convo.id} 
                className={`flex items-center p-3 hover:bg-muted/50 cursor-pointer border-b ${activeConversationId === convo.id ? 'bg-muted/50' : ''}`}
                onClick={() => setActiveConversationId(convo.id)}
              >
                <Avatar className="h-10 w-10 mr-3 relative">
                  <AvatarImage src={convo.avatar} data-ai-hint={convo.dataAiHint} />
                  <AvatarFallback>{convo.name.substring(0,1)}</AvatarFallback>
                  {convo.presence === 'online' && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card bg-green-500" title="Online" />}
                  {convo.presence === 'away' && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card bg-yellow-500" title="Away" />}
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
          {activeConversation ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="h-10 w-10 relative">
                    <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                    <AvatarFallback>{activeConversation.name.substring(0,1)}</AvatarFallback>
                    {activeConversation.presence === 'online' && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card bg-green-500" title="Online" />}
                    {activeConversation.presence === 'away' && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card bg-yellow-500" title="Away" />}
                  </Avatar>
                  <div>
                    <p className="font-semibold">{activeConversation.name}</p>
                    {activeConversation.presence === 'online' && <p className="text-xs text-green-500">Online</p>}
                    {activeConversation.presence === 'away' && <p className="text-xs text-yellow-500">Away</p>}
                    {activeConversation.presence === 'offline' && (
                      <p className="text-xs text-muted-foreground">
                        Offline {activeConversation.lastActive ? `(Last active: ${activeConversation.lastActive})` : ''}
                      </p>
                    )}
                  </div>
                </div>
                {activeConversation.pinnedMessages && activeConversation.pinnedMessages.length > 0 && (
                  <Card className="p-2 bg-primary/10 border-primary/30 text-xs">
                    <div className="flex items-center font-semibold text-primary mb-1">
                      <PinIcon className="h-4 w-4 mr-1.5"/> Pinned Messages
                    </div>
                    <ScrollArea className="max-h-20">
                      {activeConversation.pinnedMessages.map(pinned => (
                        <div key={pinned.id} className="p-1.5 rounded hover:bg-primary/20 text-muted-foreground">
                          <span className="font-medium text-foreground">{pinned.sender}: </span>{pinned.text.substring(0, 50)}{pinned.text.length > 50 ? '...' : ''}
                          <span className="text-xs opacity-70 ml-1"> ({pinned.time})</span>
                        </div>
                      ))}
                    </ScrollArea>
                  </Card>
                )}
              </div>

              <ScrollArea className="flex-1 p-4 space-y-2">
                 {activeChatMessages.map(msg => (
                    <div key={msg.id} className={`flex flex-col group ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-md lg:max-w-lg px-3 py-2 rounded-lg shadow-sm ${msg.isOwn ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card text-card-foreground rounded-bl-none'}`}>
                            {!msg.isOwn && <p className="text-xs font-semibold mb-0.5 text-primary">{msg.sender}</p>}
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            <div className="flex items-center justify-end mt-1 space-x-1">
                                <p className={`text-xs ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                                {msg.isOwn && getStatusIcon(msg.status)}
                            </div>
                        </div>
                        {/* Reactions Display */}
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className={`flex space-x-1 mt-1 px-1 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                            {msg.reactions.map(reaction => (
                              <Badge 
                                key={reaction.emoji} 
                                variant={reaction.userHasReacted ? "default" : "secondary"} 
                                className="text-xs px-1.5 py-0.5 cursor-pointer"
                                onClick={() => addReactionToMessage(msg.id, reaction.emoji)}
                              >
                                {reaction.emoji} {reaction.count}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {/* Message Actions (conceptual, appear on hover/focus in real app) */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-0.5">
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => addReactionToMessage(msg.id, '👍')}>
                                <ThumbsUpIcon className="h-3.5 w-3.5"/>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => console.log("Reply in thread to:", msg.id)}>
                                <MessageSquareReplyIcon className="h-3.5 w-3.5"/>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-yellow-500" onClick={() => toggleStarMessage(msg.id)}>
                                <StarIcon className={`h-3.5 w-3.5 ${msg.isStarred ? 'fill-yellow-400 text-yellow-500' : ''}`}/>
                            </Button>
                             <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => console.log("Open reaction picker for:", msg.id)}>
                                <SmileIcon className="h-3.5 w-3.5"/>
                            </Button>
                        </div>
                    </div>
                 ))}
                 {/* Typing Indicator (Conceptual) */}
                 {activeConversation && activeConversation.presence === 'online' && (
                    <div className="px-0 py-1">
                        <p className="text-xs text-muted-foreground italic">{activeConversation.name} is typing...</p>
                    </div>
                 )}
              </ScrollArea>
              <div className="p-4 border-t bg-card">
                <div className="flex items-center space-x-2">
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
