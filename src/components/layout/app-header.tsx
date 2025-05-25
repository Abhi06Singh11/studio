import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SheetIcon, CircleUserRound, SearchIcon } from 'lucide-react'; // Using SheetIcon as placeholder for Synergy Hub, you can replace
import { Input } from '@/components/ui/input';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <SheetIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SidebarTrigger>
      </div>
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound className="h-6 w-6" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
}
