
import ProjectDetailsClient from "@/components/workplace/projects/ProjectDetailsClient";

interface ProjectDetailsPageProps {
  params: {
    projectId: string;
  };
}

export default function WorkplaceProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  return <ProjectDetailsClient projectId={params.projectId} />;
}
    
