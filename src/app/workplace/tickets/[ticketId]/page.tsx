
import TicketDetailsClient from "@/components/workplace/tickets/TicketDetailsClient";

interface TicketDetailsPageProps {
  params: {
    ticketId: string;
    // projectId might also be a param if tickets are nested under projects in URL structure
    // but prompt implies /workplace/tickets/{ticketId}
  };
}

export default function TicketDetailsPage({ params }: TicketDetailsPageProps) {
  // In a real app, you might fetch ticket and its associated project details server-side here
  // based on params.ticketId and pass them to TicketDetailsClient.
  // For now, TicketDetailsClient will use dummy data based on the ID.
  return <TicketDetailsClient ticketId={params.ticketId} />;
}
    
