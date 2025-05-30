
"use client";

import { Loader2, Share2Icon } from 'lucide-react';

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center">
        <Share2Icon className="h-12 w-12 text-primary mb-4 animate-pulse" />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading CodeHinge...</p>
      </div>
    </div>
  );
}
