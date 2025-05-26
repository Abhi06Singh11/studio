
// src/components/organization/delete-organization-modal.tsx
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DeleteOrganizationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  organizationName: string;
  onConfirmDelete: () => void;
}

export default function DeleteOrganizationModal({
  isOpen,
  onOpenChange,
  organizationName,
  onConfirmDelete,
}: DeleteOrganizationModalProps) {
  const [verificationText, setVerificationText] = React.useState("");
  const [userInput, setUserInput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      // Generate a simple verification string. In a real app, this might be more complex or fixed.
      // Using Math.random within useEffect to ensure it runs client-side and avoids hydration mismatch.
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      setVerificationText(`delete-${organizationName.toLowerCase().replace(/\s+/g, '-')}-${randomSuffix.substring(0,4)}`);
      setUserInput(""); // Reset input when modal opens
      setError(null); // Reset error
    }
  }, [isOpen, organizationName]);

  const handleDelete = () => {
    if (userInput === verificationText) {
      onConfirmDelete();
      onOpenChange(false); // Close modal on successful confirmation
    } else {
      setError("Verification text does not match. Please try again.");
      toast({
        title: "Verification Failed",
        description: "The entered text does not match the verification string.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive">
            <AlertTriangleIcon className="mr-2 h-5 w-5" />
            Confirm Organization Deletion
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone. Deleting <strong>{organizationName}</strong> will remove all associated projects, members, and data.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            To confirm deletion, please type the following text exactly as shown into the box below:
          </p>
          <div className="p-2 bg-muted rounded-md">
            <p className="text-sm font-semibold text-center text-foreground select-all">
              {verificationText}
            </p>
          </div>
          <div>
            <Label htmlFor="verificationInput" className="sr-only">Verification Text</Label>
            <Input
              id="verificationInput"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (error) setError(null); // Clear error on new input
              }}
              placeholder="Type verification text here"
              className={error ? "border-destructive ring-destructive" : ""}
            />
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
          </div>
        </div>
        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={userInput !== verificationText || !verificationText}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete Organization
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
