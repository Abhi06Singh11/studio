
"use client";

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
  const [isMounted, setIsMounted] = useState(false); // New state for mount status
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true); // Set to true once component mounts on client
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      <SidebarProvider defaultOpen={false}>
        <div className="flex flex-col flex-1 min-h-screen">
          <AppHeader /> 
          <main className={cn(
            "flex-1 bg-background overflow-hidden",
            // Apply conditional padding only after mount if pathname is not '/'
            isMounted && pathname !== '/' && "px-4 sm:px-6 lg:px-8", 
            // Opacity based on loading state
            isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300" 
          )}>
            {/* Page content is injected here */}
            <div key={pathname} className={cn(
              "h-full py-8", // Apply consistent vertical padding to all pages
              // Apply animation only after mount and when not loading
              isMounted && !isLoading ? "animate-fadeInPage" : "" 
            )}>
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
