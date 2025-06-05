
// This file is moved to /src/app/workplace/projects/[projectId]/page.tsx
// This file can be deleted or kept as a redirect if necessary.
// For now, content is removed to avoid conflict.
"use client";
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function OldPmProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  useEffect(() => {
    if (projectId) {
      router.replace(`/workplace/projects/${projectId}`);
    } else {
      router.replace('/workplace/projects');
    }
  }, [router, projectId]);
  return <div>Redirecting...</div>;
}

