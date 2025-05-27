
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LayoutDashboardIcon } from "lucide-react";

interface ActivateWorkspaceModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onActivate: (workspaceName: string) => void;
}

export default function ActivateWorkspaceModal({
  isOpen,
  onOpenChange,
  onActivate,
}: ActivateWorkspaceModalProps) {
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleActivate = () => {
    if (!workspaceName.trim()) {
      setError("Workspace name cannot be empty.");
      return;
    }
    setError(null);
    onActivate(workspaceName);
    setWorkspaceName(""); // Reset for next potential use (though unlikely in same session)
  };

  const handleCancel = () => {
    setError(null);
    setWorkspaceName("");
    onOpenChange(false);
  };

  // Reset state when modal visibility changes
  React.useEffect(() => {
    if (!isOpen) {
      setWorkspaceName("");
      setError(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <LayoutDashboardIcon className="mr-2 h-5 w-5 text-primary" />
            Activate Your Workspace
          </DialogTitle>
          <DialogDescription>
            Please provide a name for your workspace to activate it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <Label htmlFor="workspaceName" className="text-sm font-medium">
            Workspace Name
          </Label>
          <Input
            id="workspaceName"
            value={workspaceName}
            onChange={(e) => {
                setWorkspaceName(e.target.value);
                if(error) setError(null);
            }}
            placeholder="e.g., My Team's Hub"
            className={error ? "border-destructive ring-destructive" : ""}
          />
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleActivate}>
            Activate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
