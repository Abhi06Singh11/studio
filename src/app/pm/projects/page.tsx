
// This file is moved to /src/app/workplace/projects/page.tsx
// This file can be deleted or kept as a redirect if necessary.
// For now, content is removed to avoid conflict.
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OldPmProjectsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/workplace/projects');
  }, [router]);
  return <div>Redirecting to /workplace/projects...</div>;
}
