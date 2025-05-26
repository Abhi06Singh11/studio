
// src/components/layout/footer-content.tsx
import Link from "next/link";

export default function FooterContent() {
  return (
    <div className="text-center text-xs text-muted-foreground space-x-2 p-4 mt-4 lg:mt-0"> {/* Adjusted lg:mt-0 as parent div in desktop has no space-y */}
      <Link href="#" className="hover:underline">About</Link>
      <Link href="#" className="hover:underline">Accessibility</Link>
      <Link href="#" className="hover:underline">Help Center</Link>
      <Link href="#" className="hover:underline">Privacy & Terms</Link>
      <p className="mt-1">&copy; {new Date().getFullYear()} CodeSphere</p>
    </div>
  );
}
