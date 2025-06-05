
"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import CreateTicketModal from "@/components/workplace/tickets/CreateTicketModal";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

// Sample data for team members - in a real app, this would be fetched
const sampleProjectTeam = [
    { id: "user1", name: "Dr. Elara Vance" },
    { id: "user2", name: "Marcus Chen" },
    { id: "user3", name: "Aisha Khan" },
];


export default function NewTicketPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const [isModalOpen, setIsModalOpen] = React.useState(true); // Open modal by default

  const handleTicketCreated = (newTicketData: any) => {
    console.log("Ticket created from dedicated page/modal:", newTicketData);
    router.push(`/workplace/projects/${projectId}?tab=tickets`); // Navigate back to project details tickets tab
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.back(); // Go back if modal is closed without creation
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Project
        </Button>
      </div>
      {/* This page itself doesn't render much, it mainly serves to open the modal */}
      {/* Or, you could embed the form directly here if modal isn't desired for this route */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onOpenChange={handleModalClose}
        onTicketCreated={handleTicketCreated}
        projectId={projectId}
        teamMembers={sampleProjectTeam} // Pass actual team members for the project
      />
      {!isModalOpen && (
        <div className="text-center text-muted-foreground p-8">
            <p>Redirecting back to project...</p>
            <p>If you are not redirected, please click the "Back to Project" button above.</p>
        </div>
      )}
    </div>
  );
}
