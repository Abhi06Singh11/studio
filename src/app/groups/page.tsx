
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GroupCard from "@/components/groups/group-card";
import { PlusCircleIcon, UsersIcon, SearchIcon } from "lucide-react";

const yourGroupsData = [
  { id: "grp1", name: "Cat Lovers Anonymous", memberCount: 5, imageUrl: "https://placehold.co/40x40.png?text=CLA", dataAiHint: "cat icon", actionText: "View" },
  { id: "grp2", name: "Dummy Devs Collective", memberCount: 1234, imageUrl: "https://placehold.co/40x40.png?text=DDC", dataAiHint: "code brackets", actionText: "View" },
  { id: "grp3", name: "Book Club for Coders", memberCount: 456, imageUrl: "https://placehold.co/40x40.png?text=BCC", dataAiHint: "open book", actionText: "View" },
];

const suggestedGroupsData = [
  { id: "sug1", name: "JavaScript Universe", memberCount: 9876, imageUrl: "https://placehold.co/40x40.png?text=JS", dataAiHint: "javascript logo", actionText: "Join" },
  { id: "sug2", name: "Designers Hub", memberCount: 4321, imageUrl: "https://placehold.co/40x40.png?text=DH", dataAiHint: "palette icon", actionText: "Join" },
  { id: "sug3", name: "Productivity Ninjas", memberCount: 2345, imageUrl: "https://placehold.co/40x40.png?text=PN", dataAiHint: "checklist icon", actionText: "Join" },
];

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Conceptual filtering - in a real app, this would be backend-driven
  const filteredYourGroups = yourGroupsData.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSuggestedGroups = suggestedGroupsData.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <UsersIcon className="mr-3 h-8 w-8 text-primary" />
          Groups
        </h1>
        <p className="text-muted-foreground">Discover and connect with communities.</p>
      </div>

      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search groups..."
          className="pl-10 text-base h-12 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Your Groups */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-xl font-semibold">Your Groups</CardTitle>
              <Button variant="outline" size="sm">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredYourGroups.length > 0 ? (
                filteredYourGroups.map((group) => (
                  <GroupCard
                    key={group.id}
                    name={group.name}
                    memberCount={group.memberCount}
                    imageUrl={group.imageUrl}
                    dataAiHint={group.dataAiHint}
                    actionText={group.actionText}
                    onActionClick={() => console.log("Action on:", group.name)}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  {searchTerm ? "No groups match your search." : "You haven't joined any groups yet."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Discover Groups */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Discover Groups</CardTitle>
              <CardDescription>Find communities that match your interests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredSuggestedGroups.length > 0 ? (
                filteredSuggestedGroups.map((group) => (
                  <GroupCard
                    key={group.id}
                    name={group.name}
                    memberCount={group.memberCount}
                    imageUrl={group.imageUrl}
                    dataAiHint={group.dataAiHint}
                    actionText={group.actionText}
                    onActionClick={() => console.log("Join:", group.name)}
                    isSuggestion
                  />
                ))
              ) : (
                 <p className="text-muted-foreground text-center py-4">
                  {searchTerm ? "No suggested groups match your search." : "No group suggestions available right now."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="#" className="text-sm text-primary hover:underline">
          Search for more communities
        </Link>
      </div>
    </div>
  );
}
