
// src/components/layout/app-footer.tsx
import Link from 'next/link';
import { GlobeIcon, ChevronDownIcon, Share2Icon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const footerSections = [
  {
    title: 'General',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Accessibility', href: '#' },
      { label: 'Mobile', href: '#' },
    ],
  },
  {
    title: 'Help & Legal',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Privacy & Terms', href: '#' },
      { label: 'Ad Choices', href: '#' },
      { label: 'Safety Center', href: '#' },
    ],
  },
  {
    title: 'Business Solutions',
    links: [
      { label: 'Talent Solutions', href: '#' },
      { label: 'Marketing Solutions', href: '#' },
      { label: 'Sales Solutions', href: '#' },
      { label: 'Small Business', href: '#' },
    ],
  },
  {
    title: 'Browse CodeSphere',
    links: [
      { label: 'Learning', href: '#' },
      { label: 'Jobs', href: '/jobs' },
      { label: 'Projects', href: '/projects' },
      { label: 'Challenges', href: '/challenges' },
    ],
  }
];

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="text-sm font-semibold text-foreground mb-3">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-3">Language</h5>
            <Select defaultValue="en">
              <SelectTrigger className="w-full text-xs text-muted-foreground bg-background">
                <GlobeIcon className="mr-2 h-3.5 w-3.5" />
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en" className="text-xs">English (English)</SelectItem>
                <SelectItem value="es" className="text-xs" disabled>Español (Spanish)</SelectItem>
                <SelectItem value="fr" className="text-xs" disabled>Français (French)</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4">
                 <h5 className="text-sm font-semibold text-foreground mb-2">Manage</h5>
                 <ul className="space-y-2">
                    <li><Link href="/profiles/edit" className="text-xs text-muted-foreground hover:text-primary hover:underline">Account & Privacy</Link></li>
                    <li><Link href="#" className="text-xs text-muted-foreground hover:text-primary hover:underline">Recommendation Transparency</Link></li>
                 </ul>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-muted-foreground">
          <div className="flex items-center mb-2 sm:mb-0">
            <Share2Icon className="h-5 w-5 mr-1.5 text-primary" />
            <span className="font-semibold text-foreground">CodeSphere</span>
            <span className="ml-2">&copy; {currentYear}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-end">
            {/* Additional bottom links if any, e.g., "User Agreement", "Cookie Policy" */}
          </div>
        </div>
      </div>
    </footer>
  );
}
