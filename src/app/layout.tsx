
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientRoot from './client-root'; // Import the new client component
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CodeHinge',
  description: 'The Professional Playground for Developers, Entrepreneurs & Investors on CodeHinge.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, "antialiased font-sans")}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="codehinge-theme"
        >
          <ClientRoot>{children}</ClientRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
