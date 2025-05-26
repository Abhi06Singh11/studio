
"use client";

// SidebarProvider is still useful if other parts of the app (like OrganizationLayout)
// use the Sidebar component from ui/sidebar for their specific sidebars.
// For the main mobile navigation, AppHeader now manages its own Sheet.
import { SidebarProvider } from '@/components/ui/sidebar'; 
import AppHeader from '@/components/layout/app-header';
import { Toaster } from "@/components/ui/toaster";
import Preloader from '@/components/layout/preloader';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ClientRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      {/* SidebarProvider is kept in case other parts of the app use its context,
          but it's not directly controlling the main app navigation sidebar anymore. */}
      <SidebarProvider defaultOpen={false}> {/* `defaultOpen` is less relevant here now */}
        <div className="flex flex-col flex-1 min-h-screen">
          {/* AppHeader now contains the primary desktop navigation (icons)
              and the trigger for the mobile navigation drawer (Sheet). */}
          <AppHeader /> 
          <main className={cn(
            "flex-1 bg-background overflow-hidden",
            isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300" 
          )}>
            {/* Page content is injected here */}
            <div key={pathname} className={cn("h-full", !isLoading ? "animate-fadeInPage" : "")}>
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </SidebarProvider>
    </>
  );
}

    