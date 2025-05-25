
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, UsersIcon, LineChartIcon, UserPlusIcon, FileTextIcon, MessageSquareIcon, BriefcaseIcon, ShieldIcon, EyeIcon, UserXIcon, BanIcon, CheckCircleIcon, XCircleIcon, SettingsIcon } from "lucide-react";

// Sample data - replace with actual data fetching in a real app
const sampleAdminUsers = [
  { id: "user1", name: "Dr. Elara Vance", email: "elara.vance@example.com", role: "Developer", joinedDate: "2023-01-15", status: "Active" },
  { id: "user2", name: "Marcus Chen", email: "marcus.chen@example.com", role: "Entrepreneur", joinedDate: "2023-02-20", status: "Active" },
  { id: "user3", name: "Aisha Khan", email: "aisha.khan@example.com", role: "Investor", joinedDate: "2023-03-10", status: "Suspended" },
  { id: "user4", name: "Samira Jones", email: "samira.jones@example.com", role: "Developer", joinedDate: "2023-04-05", status: "Active" },
];

const sampleAnalyticsData = {
  totalUsers: 1250,
  newUsersLast7Days: 75,
  activeUsersToday: 312,
  totalPosts: 560,
  postsLast24Hours: 25,
  totalComments: 1200,
  totalJobPostings: 85,
  openJobPostings: 42,
  reportsToReview: 3, // Placeholder for reports
};

export default function AdminPage() {
  const [users, setUsers] = React.useState(sampleAdminUsers);

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: user.status === "Suspended" ? "Active" : "Suspended" } : user));
    // In real app, call API to suspend user
    console.log(`User ${userId} status toggled.`);
  };

  const handleBanUser = (userId: string) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: "Banned" } : user));
    // In real app, call API to ban user
    console.log(`User ${userId} banned.`);
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <ShieldIcon className="mr-3 h-8 w-8 text-primary" />
          Admin Panel
        </h1>
        <Button variant="outline"><SettingsIcon className="mr-2 h-4 w-4"/>Platform Settings</Button>
      </div>

      {/* Platform Analytics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><LineChartIcon className="mr-2 h-5 w-5 text-primary" />Platform Analytics</CardTitle>
          <CardDescription>Overview of platform activity and growth.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={UsersIcon} title="Total Users" value={sampleAnalyticsData.totalUsers.toLocaleString()} />
          <StatCard icon={UserPlusIcon} title="New Users (7 days)" value={sampleAnalyticsData.newUsersLast7Days.toLocaleString()} />
          <StatCard icon={UsersIcon} title="Active Users (Today)" value={sampleAnalyticsData.activeUsersToday.toLocaleString()} variant="secondary" />
          <StatCard icon={FileTextIcon} title="Total Posts" value={sampleAnalyticsData.totalPosts.toLocaleString()} />
          <StatCard icon={FileTextIcon} title="Posts (24h)" value={sampleAnalyticsData.postsLast24Hours.toLocaleString()} variant="secondary" />
          <StatCard icon={MessageSquareIcon} title="Total Comments" value={sampleAnalyticsData.totalComments.toLocaleString()} />
          <StatCard icon={BriefcaseIcon} title="Total Job Postings" value={sampleAnalyticsData.totalJobPostings.toLocaleString()} />
          <StatCard icon={BriefcaseIcon} title="Open Job Postings" value={sampleAnalyticsData.openJobPostings.toLocaleString()} variant="secondary" />
          <StatCard icon={ShieldIcon} title="Reports to Review" value={sampleAnalyticsData.reportsToReview.toLocaleString()} variant="destructive" description="Action Required"/>
        </CardContent>
      </Card>

      {/* User Moderation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><UsersIcon className="mr-2 h-5 w-5 text-primary" />User Moderation</CardTitle>
          <CardDescription>Manage user accounts and review activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.status === "Active" ? "default" : 
                      user.status === "Suspended" ? "secondary" : 
                      "destructive"
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">User Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => console.log("View profile for", user.id)}>
                          <EyeIcon className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleSuspendUser(user.id)} disabled={user.status === "Banned"}>
                          {user.status === "Suspended" ? <CheckCircleIcon className="mr-2 h-4 w-4" /> : <UserXIcon className="mr-2 h-4 w-4" /> }
                          {user.status === "Suspended" ? "Unsuspend" : "Suspend"} User
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleBanUser(user.id)} className="text-destructive" disabled={user.status === "Banned"}>
                          <BanIcon className="mr-2 h-4 w-4" /> Ban User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description?: string;
  variant?: "default" | "secondary" | "destructive";
}

function StatCard({ icon: Icon, title, value, description, variant = "default" }: StatCardProps) {
  return (
    <Card className={variant === "destructive" ? "bg-destructive/10 border-destructive/50" : variant === "secondary" ? "bg-muted/50" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${variant === "destructive" ? "text-destructive" : "text-muted-foreground"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}
