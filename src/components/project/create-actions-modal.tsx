
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, BuildingIcon, FolderPlusIcon, LogInIcon, PlusCircleIcon, UsersIcon } from "lucide-react";
import ModalCreateOrganizationForm from "./forms/modal-create-organization-form";
import ModalJoinOrganizationForm from "./forms/modal-join-organization-form";
import ModalCreateProjectInOrgForm from "./forms/modal-create-project-in-org-form";
import ModalJoinProjectOrgForm from "./forms/modal-join-project-org-form";

type ModalView = 
  | "options"
  | "createOrg"
  | "joinOrg"
  | "createProjectInOrg"
  | "joinProjectOrg";

interface CreateActionsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const initialOptions = [
  { id: "createOrg", label: "Create New Organization", icon: BuildingIcon, description: "Set up a new workspace for your team or company." },
  { id: "joinOrg", label: "Join an Organization", icon: LogInIcon, description: "Request access to an existing organization." },
  { id: "createProjectInOrg", label: "Create New Project", icon: FolderPlusIcon, description: "Start a new project within one of your organizations." },
  { id: "joinProjectOrg", label: "Join Existing Project", icon: UsersIcon, description: "Find and request to join ongoing projects." },
];

export default function CreateActionsModal({ isOpen, onOpenChange }: CreateActionsModalProps) {
  const [currentView, setCurrentView] = React.useState<ModalView>("options");
  const [modalTitle, setModalTitle] = React.useState("Choose an Action");

  React.useEffect(() => {
    if (isOpen) {
      setCurrentView("options"); // Reset to options view when modal reopens
      setModalTitle("Choose an Action");
    }
  }, [isOpen]);

  const handleOptionClick = (view: ModalView, title: string) => {
    setCurrentView(view);
    setModalTitle(title);
  };

  const handleBackToOptions = () => {
    setCurrentView("options");
    setModalTitle("Choose an Action");
  };

  const handleFormSubmitted = () => {
    onOpenChange(false); // Close modal after any form submission
  };

  const renderContent = () => {
    switch (currentView) {
      case "createOrg":
        return <ModalCreateOrganizationForm onFormSubmit={handleFormSubmitted} onCancel={() => onOpenChange(false)} />;
      case "joinOrg":
        return <ModalJoinOrganizationForm onFormSubmit={handleFormSubmitted} onCancel={() => onOpenChange(false)} />;
      case "createProjectInOrg":
        return <ModalCreateProjectInOrgForm onFormSubmit={handleFormSubmitted} onCancel={() => onOpenChange(false)} />;
      case "joinProjectOrg":
        return <ModalJoinProjectOrgForm onFormSubmit={handleFormSubmitted} onCancel={() => onOpenChange(false)} />;
      case "options":
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {initialOptions.map(opt => (
              <Card 
                key={opt.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleOptionClick(opt.id as ModalView, opt.label)}
              >
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <opt.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-base font-semibold">{opt.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{opt.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center">
            {currentView !== "options" && (
              <Button variant="ghost" size="icon" onClick={handleBackToOptions} className="mr-2 h-8 w-8">
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            )}
            <DialogTitle>{modalTitle}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto pr-2 -mr-2 py-4 pl-1">
            {renderContent()}
        </div>

        {currentView === "options" && (
             <DialogFooter className="flex-shrink-0 pt-4 border-t">
                <DialogClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                </DialogClose>
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
