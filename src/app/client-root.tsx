
"use client"; // Crucial for useState and useEffect

import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';
import AppHeader from '@/components/layout/app-header';
import { Toaster } from "@/components/ui/toaster";
import Preloader from '@/components/layout/preloader'; // Import preloader
import { useState, useEffect } from 'react';       // Import hooks

export default function ClientRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for the preloader to be visible
    // In a real app, this might be tied to specific data loading or asset readiness
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1-second delay for demonstration
    
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      {isLoading && <Preloader />}
      {/* The rest of the app is rendered but overlaid by the preloader when isLoading is true */}
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div className="flex flex-col flex-1 min-h-screen md:peer-data-[state=open]:[grid-area:main]">
          <AppHeader />
          <main className="flex-1 p-4 md:p-6 bg-background">
            {children}
          </main>
        </div>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
