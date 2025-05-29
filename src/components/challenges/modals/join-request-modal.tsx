
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { UserPlusIcon, InfoIcon } from "lucide-react";

interface JoinRequestModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  challengeTitle?: string; // To display which challenge they are joining
}

export default function JoinRequestModal({
  isOpen,
  onOpenChange,
  challengeTitle = "this challenge",
}: JoinRequestModalProps) {
  const [message, setMessage] = React.useState("");

  const handleRequestToJoin = () => {
    console.log("Join Request Sent:", { challenge: challengeTitle, message });
    toast({
      title: "Request Sent (Conceptually)",
      description: `Your request to join "${challengeTitle}" has been sent.`,
    });
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlusIcon className="mr-2 h-5 w-5 text-primary" />
            Request to Join: {challengeTitle}
          </DialogTitle>
          <DialogDescription>
            This challenge is private. Please submit a request to join.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
            <Card className="bg-muted/50 p-3">
                <CardHeader className="p-0 pb-1">
                    <CardTitle className="text-sm font-medium flex items-center"><InfoIcon className="mr-1.5 h-4 w-4 text-primary"/>Challenge Overview (Placeholder)</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-xs text-muted-foreground">
                    <p>A brief description of the challenge and its rules would appear here.</p>
                </CardContent>
            </Card>
          <div>
            <Label htmlFor="joinMessage" className="text-sm font-medium">
              Message to Organizer (Optional)
            </Label>
            <Textarea
              id="joinMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the organizer why you want to join or share relevant experience..."
              className="min-h-[80px] mt-1"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleRequestToJoin}>
            Request to Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Placeholder card component, not used directly by JoinRequestModal but kept from previous context
// if needed for other parts of the app.
import { Card } from "@/components/ui/card";
