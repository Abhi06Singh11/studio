
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersIcon, EyeIcon, UserPlusIcon, LogOutIcon } from "lucide-react";

interface GroupCardProps {
  name: string;
  memberCount: number;
  imageUrl?: string;
  dataAiHint?: string;
  actionText: string;
  onActionClick: () => void;
  isSuggestion?: boolean;
}

export default function GroupCard({
  name,
  memberCount,
  imageUrl,
  dataAiHint,
  actionText,
  onActionClick,
  isSuggestion = false,
}: GroupCardProps) {
  const ActionIcon = isSuggestion ? UserPlusIcon : actionText === "Leave" ? LogOutIcon : EyeIcon;

  return (
    <Card className="flex flex-col sm:flex-row items-center p-3 sm:p-4 gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg bg-card">
      <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={`${name} logo`} data-ai-hint={dataAiHint || "group logo"} />
        ) : (
          <UsersIcon className="h-full w-full p-2 text-muted-foreground" />
        )}
        <AvatarFallback>{name.substring(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center sm:text-left">
        <CardTitle className="text-sm sm:text-base font-semibold text-foreground truncate">{name}</CardTitle>
        <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start mt-0.5">
          <UsersIcon className="h-3.5 w-3.5 mr-1" />
          {memberCount.toLocaleString()} members
        </p>
      </div>

      <Button 
        variant={isSuggestion ? "default" : "outline"} 
        size="sm" 
        onClick={onActionClick}
        className="w-full sm:w-auto mt-2 sm:mt-0 text-xs sm:text-sm"
      >
        <ActionIcon className="mr-1.5 h-3.5 w-3.5" />
        {actionText}
      </Button>
    </Card>
  );
}
