
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SettingsIcon, BellIcon, UsersIcon, ShieldIcon, Trash2Icon } from "lucide-react";

export default function ProjectSettingsView() {
  return (
    <div className="space-y-6">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <SettingsIcon className="mr-2 h-6 w-6 text-primary" /> Project Settings
        </CardTitle>
        <CardDescription>Manage settings, notifications, and members for this project workspace.</CardDescription>
      </CardHeader>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="projectName">Project Name</Label>
            <Input id="projectName" defaultValue="CodeSphere Main Project" className="bg-card" />
          </div>
          <div>
            <Label htmlFor="projectDescription">Project Description</Label>
            <Textarea id="projectDescription" defaultValue="The central workspace for CodeSphere development, discussions, and file sharing." className="bg-card min-h-[80px]" />
          </div>
        </CardContent>
        <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><BellIcon className="mr-2 h-5 w-5 text-muted-foreground"/>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 p-2 rounded-md border">
            <Label htmlFor="all-activity-notif" className="flex flex-col space-y-1">
              <span>All new messages</span>
              <span className="font-normal leading-snug text-muted-foreground text-xs">
                Receive notifications for every new message in channels you're in.
              </span>
            </Label>
            <Switch id="all-activity-notif" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-2 p-2 rounded-md border">
            <Label htmlFor="mentions-notif" className="flex flex-col space-y-1">
              <span>Mentions & Replies</span>
               <span className="font-normal leading-snug text-muted-foreground text-xs">
                Notify me when I'm @mentioned or someone replies to my thread.
              </span>
            </Label>
            <Switch id="mentions-notif" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><UsersIcon className="mr-2 h-5 w-5 text-muted-foreground"/>Member Management</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Manage project members and their roles here. (Conceptual)</p>
            <Button variant="outline" className="mt-2">View Members</Button>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
            <CardTitle className="text-lg flex items-center text-destructive"><Trash2Icon className="mr-2 h-5 w-5"/>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-destructive/90 mb-2">Archiving or deleting this project workspace is a permanent action.</p>
            <div className="flex gap-2">
                <Button variant="outline">Archive Project</Button>
                <Button variant="destructive">Delete Project</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
