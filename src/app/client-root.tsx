
"use client";

import { SidebarProvider } from '@/components/ui/sidebar'; 
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer'; // Import the new footer
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
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
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
            isMounted && pathname !== '/' && "px-4 sm:px-6 lg:px-8", 
            isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300" 
          )}>
            <div key={pathname} className={cn(
              "h-full py-4 sm:py-6 md:py-8", 
              isMounted && !isLoading ? "animate-fadeInPage" : "" 
            )}>
              {children}
            </div>
          </main>
          <AppFooter /> {/* Add the new AppFooter here */}
        </div>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
