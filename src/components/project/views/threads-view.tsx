
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, MessageSquareTextIcon } from "lucide-react";

export default function ThreadsView() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <MessageSquareTextIcon className="mr-2 h-6 w-6 text-primary" /> All Threads
        </CardTitle>
        <CardDescription>Review ongoing discussions and important conversation threads.</CardDescription>
      </CardHeader>
      
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search threads..." className="pl-8 bg-card" />
      </div>

      <Card className="flex-1">
        <CardContent className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <MessageSquareTextIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">No active threads</p>
            <p className="text-sm text-muted-foreground/80">Start a conversation in a channel to see threads here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
