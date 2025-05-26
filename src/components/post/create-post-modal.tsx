
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
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ImageIcon, VideoIcon, FileTextIcon, HashIcon, SendIcon, GlobeIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentUser: {
    name: string;
    avatarUrl: string;
    avatarAiHint: string;
  };
}

export default function CreatePostModal({ isOpen, onOpenChange, currentUser }: CreatePostModalProps) {
  const [postContent, setPostContent] = React.useState("");
  const [hashtags, setHashtags] = React.useState("");

  const handlePost = () => {
    if (!postContent.trim()) {
      toast({
        title: "Empty Post",
        description: "You can't create an empty post.",
        variant: "destructive",
      });
      return;
    }
    // Conceptual: In a real app, this would submit the post data to a backend
    console.log("New Post Submitted:", {
      content: postContent,
      hashtags: hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: currentUser.name,
    });
    toast({
      title: "Post Created (Conceptually)",
      description: "Your post has been shared.",
    });
    setPostContent("");
    setHashtags("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>Share what’s on your mind or announce something new.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint={currentUser.avatarAiHint} />
              <AvatarFallback>{currentUser.name?.substring(0, 1) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{currentUser.name}</p>
              <Button variant="outline" size="sm" className="h-6 px-2 text-xs mt-0.5">
                <GlobeIcon className="h-3 w-3 mr-1" /> Anyone
              </Button>
            </div>
          </div>
          <Textarea
            placeholder={`What's on your mind, ${currentUser.name?.split(' ')[0] || 'User'}?`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[120px] text-base resize-none"
          />
          <div className="relative">
            <HashIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Add relevant hashtags (e.g., #innovation, #AI)"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Button variant="ghost" size="sm" disabled> {/* Conceptual buttons */}
              <ImageIcon className="h-5 w-5 mr-1.5 text-green-500" /> Photo
            </Button>
            <Button variant="ghost" size="sm" disabled>
              <VideoIcon className="h-5 w-5 mr-1.5 text-blue-500" /> Video
            </Button>
            <Button variant="ghost" size="sm" disabled>
              <FileTextIcon className="h-5 w-5 mr-1.5 text-orange-500" /> Document
            </Button>
            {/* Add more options like "Celebrate an occasion", "Create a poll" if needed */}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" onClick={handlePost} disabled={!postContent.trim()}>
            <SendIcon className="mr-2 h-4 w-4" /> Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
