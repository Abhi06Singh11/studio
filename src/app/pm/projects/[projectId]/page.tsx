
import ProjectDetailsClient from "@/components/pm/ProjectDetailsClient";

interface ProjectDetailsPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  // In a real app, you might fetch project details server-side here
  // based on params.projectId and pass them to ProjectDetailsClient.
  // For now, ProjectDetailsClient will use dummy data based on the ID.
  return <ProjectDetailsClient projectId={params.projectId} />;
}
    