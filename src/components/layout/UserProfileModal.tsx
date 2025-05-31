
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle as UiCardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Edit3,
  KeyRound,
  Settings,
  Activity,
  FolderKanbanIcon,
  Building2Icon,
  LogOut,
  ArrowLeftIcon,
  XIcon,
  CalendarDays,
  LogInIcon,
  Linkedin,
  Github,
  Slack,
  GlobeIcon,
  HeartIcon,
  MessageCircleIcon,
  EyeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dataAiHint: string;
  role: string;
  joinedDate: string;
  lastLogin: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: UserProfile;
}

type ProfileModalView =
  | "main"
  | "editProfile"
  | "changePassword"
  | "settings"
  | "activity"
  | "projects"
  | "organizations";

const dummyProjects = [
  { id: 'p1', name: 'Project Alpha', status: 'Active', created: '2023-01-15', description: 'Core platform development for CodeHinge. Focus on scalability and real-time features.' },
  { id: 'p2', name: 'Project Beta (AI Engine)', status: 'On Hold', created: '2023-03-22', description: 'Exploratory phase for an AI-driven recommendation engine for user connections and content.' },
  { id: 'p3', name: 'Project Gamma (Mobile App)', status: 'Completed', created: '2022-12-01', description: 'Initial MVP of the CodeHinge mobile companion app for iOS and Android.' },
];

const dummyOrganizations = [
  { id: 'org1', name: 'Innovatech Solutions', role: 'Owner', joined: '2023-01-10', description: 'Lead organization for CodeHinge platform development.' },
  { id: 'org2', name: 'Open Source Community Contributors', role: 'Member', joined: '2023-05-01', description: 'A group for external contributors to CodeHinge open-source initiatives.' },
];

const dummyActivityStats = { posts: 12, comments: 8, likesReceived: 25 };


export default function UserProfileModal({ isOpen, onOpenChange, user }: UserProfileModalProps) {
  const [currentView, setCurrentView] = React.useState<ProfileModalView>("main");

  React.useEffect(() => {
    if (isOpen) {
      setCurrentView("main"); // Reset to main view when modal opens
    }
  }, [isOpen]);

  const renderHeader = () => {
    let title = "Your Profile";
    if (currentView === "editProfile") title = "Edit Profile";
    else if (currentView === "changePassword") title = "Change Password";
    else if (currentView === "settings") title = "Settings";
    else if (currentView === "activity") title = "My Activity";
    else if (currentView === "projects") title = "My Projects";
    else if (currentView === "organizations") title = "My Organizations";

    return (
      <DialogHeader className="flex flex-row items-center justify-between border-b pb-3 mb-1 p-6 pr-12">
        <div className="flex items-center gap-2">
          {currentView !== "main" && (
            <Button variant="ghost" size="icon" onClick={() => setCurrentView("main")} className="h-8 w-8">
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </div>
      </DialogHeader>
    );
  };
  
  const MenuButton = ({ onClick, icon: Icon, label }: { onClick: () => void, icon: React.ElementType, label: string }) => (
    <Button variant="ghost" onClick={onClick} className="w-full justify-start h-10 px-3 text-sm">
      <Icon className="mr-2.5 h-4 w-4 text-muted-foreground" />
      {label}
    </Button>
  );

  const renderMainView = () => (
    <>
      <div className="flex flex-col items-center p-6 pt-2">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
          <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <p className="text-xl font-semibold">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      <Separator />
      <div className="px-6 py-4 space-y-3">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground">Account Details</h3>
        <div className="text-sm space-y-1.5">
          <p><strong className="font-medium text-foreground">Role:</strong> {user.role}</p>
          <p><strong className="font-medium text-foreground">Joined:</strong> {user.joinedDate}</p>
          <p><strong className="font-medium text-foreground">Last Login:</strong> {user.lastLogin}</p>
        </div>
      </div>
      <Separator />
      <div className="px-6 py-4 space-y-3">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground">Linked Accounts (Conceptual)</h3>
        <div className="text-sm space-y-1.5">
            <p className="flex items-center"><Slack className="mr-2 h-4 w-4 text-muted-foreground"/> Slack: <span className="text-green-600 ml-1 font-medium">Connected</span></p>
            <p className="flex items-center"><Linkedin className="mr-2 h-4 w-4 text-muted-foreground"/> LinkedIn: Not Connected</p>
            <p className="flex items-center"><Github className="mr-2 h-4 w-4 text-muted-foreground"/> LeetCode (GitHub): <span className="text-green-600 ml-1 font-medium">Connected</span></p>
        </div>
      </div>
      <Separator />
      <div className="px-3 py-2 space-y-0.5">
        <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground">User Actions</h3>
        <MenuButton onClick={() => setCurrentView("editProfile")} icon={Edit3} label="Edit Profile" />
        <MenuButton onClick={() => setCurrentView("changePassword")} icon={KeyRound} label="Change Password" />
        <MenuButton onClick={() => setCurrentView("settings")} icon={Settings} label="Settings" />
      </div>
      <Separator />
      <div className="px-3 py-2 space-y-0.5">
        <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground">My Hub</h3>
        <MenuButton onClick={() => setCurrentView("activity")} icon={Activity} label="My Activity" />
        <MenuButton onClick={() => setCurrentView("projects")} icon={FolderKanbanIcon} label="My Projects" />
        <MenuButton onClick={() => setCurrentView("organizations")} icon={Building2Icon} label="My Organizations" />
      </div>
      <Separator />
      <div className="p-4">
        <Button variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </>
  );

  const renderEditProfileView = () => (
    <div className="p-6 space-y-4">
        <div className="space-y-1">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input id="edit-name" defaultValue={user.name} />
        </div>
        <div className="space-y-1">
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" type="email" defaultValue={user.email} />
        </div>
        <div className="space-y-1">
            <Label htmlFor="edit-bio">Bio (Optional)</Label>
            <Textarea id="edit-bio" placeholder="Tell us about yourself..." defaultValue="AI enthusiast and lifelong learner." className="min-h-[80px]" />
        </div>
        <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setCurrentView("main")}>Cancel</Button>
            <Button onClick={() => { alert("Profile save (conceptual)"); setCurrentView("main"); }}>Save Changes</Button>
        </DialogFooter>
    </div>
  );

  const renderChangePasswordView = () => (
     <div className="p-6 space-y-4">
        <div className="space-y-1">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
        </div>
        <div className="space-y-1">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
        </div>
        <div className="space-y-1">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
        </div>
        <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setCurrentView("main")}>Cancel</Button>
            <Button onClick={() => { alert("Password change (conceptual)"); setCurrentView("main"); }}>Update Password</Button>
        </DialogFooter>
    </div>
  );

  const renderSettingsView = () => (
    <div className="p-6 space-y-6">
        <div>
            <h4 className="font-medium mb-2">Notification Preferences</h4>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="notif-messages" className="text-sm">New Direct Messages</Label>
                    <Switch id="notif-messages" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="notif-mentions" className="text-sm">Mentions & Reactions</Label>
                    <Switch id="notif-mentions" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="notif-newsletter" className="text-sm">Weekly Newsletter</Label>
                    <Switch id="notif-newsletter" />
                </div>
            </div>
        </div>
         <div>
            <h4 className="font-medium mb-2">Theme (Conceptual)</h4>
            <div className="flex items-center justify-between p-3 border rounded-md">
                <Label htmlFor="theme-dark" className="text-sm">Dark Mode</Label>
                <Switch id="theme-dark" />
            </div>
        </div>
    </div>
  );

  const renderActivityView = () => (
    <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="pb-2"><UiCardTitle className="text-sm font-medium text-muted-foreground">Posts Created</UiCardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{dummyActivityStats.posts}</p></CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2"><UiCardTitle className="text-sm font-medium text-muted-foreground">Comments Made</UiCardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{dummyActivityStats.comments}</p></CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2"><UiCardTitle className="text-sm font-medium text-muted-foreground">Likes Received</UiCardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{dummyActivityStats.likesReceived}</p></CardContent>
            </Card>
        </div>
        <p className="text-xs text-muted-foreground text-center pt-2">More detailed activity log coming soon.</p>
    </div>
  );

  const renderProjectsView = () => (
    <div className="p-6 space-y-3">
        {dummyProjects.length > 0 ? dummyProjects.map(project => (
            <Card key={project.id} className="shadow-sm">
                <CardHeader className="pb-2 pt-3">
                    <UiCardTitle className="text-base font-semibold">{project.name}</UiCardTitle>
                    <div className="text-xs text-muted-foreground">
                        Status: <Badge variant={project.status === "Active" ? "default" : project.status === "Completed" ? "secondary" : "outline"} className="ml-1">{project.status}</Badge>
                        <span className="mx-1.5">&bull;</span> Created: {project.created}
                    </div>
                </CardHeader>
                <CardContent className="pb-3">
                     <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </CardContent>
                 <DialogFooter className="p-3 border-t bg-muted/30">
                    <Button variant="outline" size="sm" className="w-full">View Project Details</Button>
                </DialogFooter>
            </Card>
        )) : <p className="text-muted-foreground text-center py-4">No projects to display.</p>}
    </div>
  );

  const renderOrganizationsView = () => (
    <div className="p-6 space-y-3">
        {dummyOrganizations.length > 0 ? dummyOrganizations.map(org => (
            <Card key={org.id} className="shadow-sm">
                 <CardHeader className="pb-2 pt-3">
                    <UiCardTitle className="text-base font-semibold">{org.name}</UiCardTitle>
                    <div className="text-xs text-muted-foreground">
                        Your Role: <Badge variant="secondary" className="ml-1">{org.role}</Badge>
                        <span className="mx-1.5">&bull;</span> Joined: {org.joined}
                    </div>
                </CardHeader>
                <CardContent className="pb-3">
                     <p className="text-sm text-muted-foreground line-clamp-2">{org.description}</p>
                </CardContent>
                 <DialogFooter className="p-3 border-t bg-muted/30">
                    <Button variant="outline" size="sm" className="w-full">View Organization</Button>
                </DialogFooter>
            </Card>
        )) : <p className="text-muted-foreground text-center py-4">You are not part of any organizations.</p>}
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "editProfile": return renderEditProfileView();
      case "changePassword": return renderChangePasswordView();
      case "settings": return renderSettingsView();
      case "activity": return renderActivityView();
      case "projects": return renderProjectsView();
      case "organizations": return renderOrganizationsView();
      case "main":
      default:
        return renderMainView();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 flex flex-col max-h-[90vh]">
        {renderHeader()}
        <ScrollArea className="flex-grow overflow-y-auto">
          {renderCurrentView()}
        </ScrollArea>
         <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
