
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, ListVideoIcon, SearchIcon, HashIcon, LockIcon, UsersIcon } from "lucide-react";

const sampleChannels = [
  { id: "ch-general", name: "general", members: 125, description: "Company-wide announcements and updates.", isPrivate: false },
  { id: "ch-dev-team", name: "dev-team", members: 15, description: "Technical discussions for the development team.", isPrivate: true },
  { id: "ch-marketing", name: "marketing-campaign-q3", members: 8, description: "Coordination for the Q3 marketing campaign.", isPrivate: false },
  { id: "ch-random", name: "random", members: 88, description: "Water cooler chat and random thoughts.", isPrivate: false },
  { id: "ch-product-feedback", name: "product-feedback", members: 32, description: "Collecting user feedback and suggestions.", isPrivate: false },
];

export default function ChannelsView() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            <ListVideoIcon className="mr-2 h-6 w-6 text-primary" /> Channels
          </CardTitle>
          <CardDescription>Organize conversations around specific topics or teams.</CardDescription>
        </div>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Create Channel
        </Button>
      </div>
      
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search channels..." className="pl-8 bg-card" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto pb-4 pr-1">
        {sampleChannels.map(channel => (
          <Card key={channel.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center truncate">
                  {channel.isPrivate ? <LockIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" /> : <HashIcon className="h-4 w-4 mr-1.5 text-muted-foreground" />}
                  <span className="truncate">{channel.name}</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="text-xs h-7">Join</Button>
              </div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1 pt-0">
              <p className="line-clamp-2 h-8">{channel.description}</p>
              <div className="flex items-center ">
                <UsersIcon className="h-3.5 w-3.5 mr-1"/> {channel.members.toLocaleString()} members
              </div>
            </CardContent>
          </Card>
        ))}
         {sampleChannels.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-8">No channels found. Create one to get started!</p>
        )}
      </div>
    </div>
  );
}
