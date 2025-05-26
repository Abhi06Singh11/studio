
"use client";

import Link from 'next/link';
import Image from 'next/image';
import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MailIcon, LinkedinIcon, GithubIcon, BriefcaseIcon, MapPinIcon, UsersIcon, GraduationCapIcon, GlobeIcon, FileTextIcon, LightbulbIcon, TrendingUpIcon, BuildingIcon, UserPlusIcon, RssIcon, SearchIcon, SmileIcon, StarIcon, ExternalLinkIcon, BookOpenIcon, ListChecksIcon, PackageCheckIcon, BrainIcon, WandSparklesIcon, DollarSignIcon, SettingsIcon, ChevronRightIcon, UserIcon } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // Added cn import

interface WorkExperienceEntry {
  id?: string;
  title: string;
  company: string;
  duration: string;
  description?: string;
}

interface EducationEntry {
  id?: string;
  degree: string;
  institution: string;
  year?: string;
  notes?: string;
}

interface SocialLinks {
  linkedin?: string;
  portfolioWebsite?: string;
  github?: string;
}

type UserRole = 'Developer' | 'Entrepreneur' | 'Investor' | 'General';
type UserPresence = 'online' | 'offline' | 'away';
type ProfileVisibility = 'Public' | 'Private' | 'Connections Only';

interface DeveloperProfileData {
  skills?: string[];
  tools?: string[];
  projects?: string[];
}
interface EntrepreneurProfileData {
  startupName?: string;
  ideaSummary?: string;
  pitchDeckUrl?: string;
}
interface InvestorProfileData {
  investmentInterests?: string[];
  pastInvestments?: string[];
}

export interface Profile { // Exporting for potential use elsewhere
  id: string;
  name: string;
  title?: string; // Made optional as role might imply it
  avatarUrl: string;
  dataAiHint: string;
  bannerUrl?: string;
  bannerAiHint?: string;
  bio: string;
  location: string;
  role: UserRole;
  
  developerProfile?: DeveloperProfileData;
  entrepreneurProfile?: EntrepreneurProfileData;
  investorProfile?: InvestorProfileData;
  
  workExperience?: WorkExperienceEntry[];
  education?: EducationEntry[];
  socialLinks?: SocialLinks;
  
  profileVisibility?: ProfileVisibility;
  customStatusText?: string;
  customStatusEmoji?: string;
  presence?: UserPresence;
  lastActiveTimestamp?: string;
  isStarred?: boolean;
}

const initialSampleProfiles: Profile[] = [
  {
    id: "1",
    name: "Dr. Elara Vance",
    title: "Lead AI Researcher @ Innovatech AI Labs",
    avatarUrl: "https://placehold.co/150x150.png?p=1",
    dataAiHint: "scientist woman",
    bannerUrl: "https://placehold.co/600x200.png?b=1",
    bannerAiHint: "abstract technology",
    bio: "Passionate about advancing the frontiers of artificial intelligence and machine learning. Specializing in NLP and ethical AI development. Seeking collaborators for innovative projects.",
    location: "San Francisco, CA",
    role: "Developer",
    developerProfile: {
      skills: ["Machine Learning", "NLP", "Python", "Ethical AI", "Deep Learning", "Next.js", "Genkit"],
      tools: ["PyTorch", "TensorFlow", "Docker", "Kubernetes", "Google Cloud"],
      projects: ["Project Gemini Analysis", "Ethical AI Framework", "Open Source NLP Toolkit"],
    },
    workExperience: [
      { id: "we1", title: "Lead AI Researcher", company: "Innovatech AI Labs", duration: "2021 - Present", description: "Leading research on cutting-edge AI models and their ethical implications." },
      { id: "we2", title: "Senior ML Engineer", company: "Tech Solutions Inc.", duration: "2018 - 2021", description: "Developed and deployed scalable machine learning solutions for enterprise clients." }
    ],
    education: [
      { id: "edu1", institution: "Stanford University", degree: "Ph.D. in Computer Science", year: "2018", notes: "Dissertation on Explainable AI." }
    ],
    socialLinks: { linkedin: "#", portfolioWebsite: "#", github: "#" },
    profileVisibility: "Public",
    presence: "online",
    customStatusText: "Deep in thought with LLMs",
    customStatusEmoji: "🧠",
    isStarred: true,
  },
  {
    id: "2",
    name: "Marcus Chen",
    title: "Founder & CEO @ DevOptimize",
    avatarUrl: "https://placehold.co/150x150.png?p=2",
    dataAiHint: "developer man",
    bannerUrl: "https://placehold.co/600x200.png?b=2",
    bannerAiHint: "city skyline",
    bio: "Building scalable web applications and mobile solutions. Founder of DevOptimize, a platform for developer productivity tools. Always open to new challenges and collaborations.",
    location: "New York, NY",
    role: "Entrepreneur",
    entrepreneurProfile: {
      startupName: "DevOptimize Inc.",
      ideaSummary: "A revolutionary platform leveraging AI to streamline developer workflows and boost productivity by 10x. Currently seeking seed funding.",
      pitchDeckUrl: "#", // URL to a PDF
    },
     workExperience: [
      { id: "we3", title: "Founder & CEO", company: "DevOptimize Inc.", duration: "2022 - Present", description: "Leading product development and fundraising efforts." },
      { id: "we4", title: "Senior Full-Stack Developer", company: "WebScale Ltd.", duration: "2019 - 2022", description: "Architected and built microservices for a high-traffic e-commerce platform." }
    ],
    education: [
      { id: "edu2", institution: "MIT", degree: "B.S. in Computer Science", year: "2019" }
    ],
    socialLinks: { linkedin: "#", portfolioWebsite: "#", github: "#" },
    profileVisibility: "Public",
    presence: "away",
    customStatusText: "Coffee break!",
    customStatusEmoji: "☕",
    lastActiveTimestamp: "5m ago",
    isStarred: false,
  },
  {
    id: "3",
    name: "Aisha Khan",
    title: "Partner @ Future Ventures",
    avatarUrl: "https://placehold.co/150x150.png?p=3",
    dataAiHint: "business woman",
    bannerUrl: "https://placehold.co/600x200.png?b=3",
    bannerAiHint: "modern office",
    bio: "Investing in early-stage technology startups with a focus on AI, SaaS, and FinTech. Passionate about supporting visionary founders.",
    location: "London, UK",
    role: "Investor",
    investorProfile: {
      investmentInterests: ["AI/ML", "SaaS", "FinTech", "Deep Tech", "Sustainable Tech"],
      pastInvestments: ["Innovatech AI Labs (Seed)", "DevOptimize Inc. (Angel)", "GreenTech Solutions (Series A)"],
    },
    workExperience: [
      { id: "we5", title: "Partner", company: "Future Ventures PLC", duration: "2020 - Present", description: "Sourcing, evaluating, and managing early-stage investments." },
      { id: "we6", title: "Investment Analyst", company: "Capital Growth Partners", duration: "2017 - 2020", description: "Conducted due diligence and market research." }
    ],
    education: [
      { id: "edu3", institution: "London Business School", degree: "MBA", year: "2017", notes: "Specialization in Finance." }
    ],
    socialLinks: { linkedin: "#" },
    profileVisibility: "Connections Only",
    presence: "offline",
    lastActiveTimestamp: "3h ago",
    isStarred: true,
  },
];

const suggestedProfilesStatic: Profile[] = initialSampleProfiles.slice(1, 3);


function getRoleSpecificIcon(role: UserRole, className?: string) {
  const iconProps = { className: cn("h-4 w-4 text-primary mr-1.5", className) };
  switch (role) {
    case 'Developer': return <BriefcaseIcon {...iconProps} />;
    case 'Entrepreneur': return <LightbulbIcon {...iconProps} />;
    case 'Investor': return <DollarSignIcon {...iconProps} />;
    default: return <UserIcon {...iconProps} />;
  }
}

function PresenceIndicator({ presence, lastActiveTimestamp }: { presence?: UserPresence, lastActiveTimestamp?: string }) {
  const baseClasses = "absolute bottom-1 right-1 block h-3.5 w-3.5 rounded-full border-2 border-card";
  if (presence === 'online') {
    return <span className={`${baseClasses} bg-green-500`} title="Online" />;
  }
  if (presence === 'away') {
    return <span className={`${baseClasses} bg-yellow-500`} title="Away" />;
  }
  return null;
}

export default function ProfilesPage() {
  const [profilesList, setProfilesList] = React.useState<Profile[]>(initialSampleProfiles);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("All");
  const [selectedLocation, setSelectedLocation] = React.useState("All");
  const [displayProfiles, setDisplayProfiles] = React.useState<Profile[]>(profilesList);

  const roles = ["All", ...new Set(profilesList.map(p => p.role))];
  const locations = ["All", ...new Set(profilesList.map(p => p.location).filter(Boolean))];

  const toggleStar = (profileId: string) => {
    setProfilesList(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === profileId ? { ...profile, isStarred: !profile.isStarred } : profile
      )
    );
  };

  React.useEffect(() => {
    let filtered = profilesList;
    if (selectedRole !== "All") filtered = filtered.filter(p => p.role === selectedRole);
    if (selectedLocation !== "All") filtered = filtered.filter(p => p.location === selectedLocation);

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lowerSearchTerm) ||
        (p.title && p.title.toLowerCase().includes(lowerSearchTerm)) ||
        p.bio.toLowerCase().includes(lowerSearchTerm) ||
        (p.developerProfile?.skills?.join(" ").toLowerCase().includes(lowerSearchTerm)) ||
        (p.entrepreneurProfile?.startupName?.toLowerCase().includes(lowerSearchTerm)) ||
        (p.investorProfile?.investmentInterests?.join(" ").toLowerCase().includes(lowerSearchTerm))
      );
    }
    setDisplayProfiles(filtered);
  }, [searchTerm, selectedRole, selectedLocation, profilesList]);
  
  const starredProfiles = profilesList.filter(p => p.isStarred);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profiles</h1>
          <p className="text-muted-foreground">Connect with developers, entrepreneurs, and investors.</p>
        </div>
        <Link href="/profiles/edit" passHref>
          <Button><UserPlusIcon className="mr-2"/>Create/Edit Your Profile</Button>
        </Link>
      </div>

      {starredProfiles.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center">
            <StarIcon className="mr-2 h-6 w-6 text-yellow-400 fill-yellow-400" /> Starred Connections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {starredProfiles.map((profile) => (
              <ProfileCard key={`starred-${profile.id}`} profile={profile} onToggleStar={toggleStar} />
            ))}
          </div>
           <Separator className="my-8"/>
        </div>
      )}

      <Card className="p-4 sm:p-6 shadow-md rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2 md:col-span-1"><label htmlFor="search-profiles" className="block text-sm font-medium text-muted-foreground mb-1">Search Profiles</label><div className="relative"><SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input id="search-profiles" placeholder="Name, skill, company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8 bg-background"/></div></div>
          <div><label htmlFor="filter-role" className="block text-sm font-medium text-muted-foreground mb-1">Role</label><Select value={selectedRole} onValueChange={setSelectedRole}><SelectTrigger id="filter-role" className="bg-background"><SelectValue placeholder="Filter by role" /></SelectTrigger><SelectContent>{roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}</SelectContent></Select></div>
          <div><label htmlFor="filter-location" className="block text-sm font-medium text-muted-foreground mb-1">Location</label><Select value={selectedLocation} onValueChange={setSelectedLocation}><SelectTrigger id="filter-location" className="bg-background"><SelectValue placeholder="Filter by location" /></SelectTrigger><SelectContent>{locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}</SelectContent></Select></div>
        </div>
      </Card>

      <h2 className="text-2xl font-semibold tracking-tight mt-8">All Profiles</h2>
      {displayProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProfiles.map((profile) => ( <ProfileCard key={profile.id} profile={profile} onToggleStar={toggleStar} /> ))}
        </div>
      ) : (
         <Card className="col-span-full mt-6"><CardHeader><CardTitle>No Profiles Found</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Try adjusting your search or filter criteria.</p></CardContent></Card>
      )}

      {suggestedProfilesStatic.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center"><WandSparklesIcon className="mr-2 h-6 w-6 text-primary"/>Suggested Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {suggestedProfilesStatic.map((profile) => ( <ProfileCard key={`suggest-${profile.id}`} profile={profile} onToggleStar={toggleStar} /> ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ProfileCardProps { profile: Profile; onToggleStar: (profileId: string) => void; }

function ProfileCard({ profile, onToggleStar }: ProfileCardProps) {
  const renderRoleSpecificInfo = () => {
    switch (profile.role) {
      case 'Developer':
        return (
          <>
            {profile.developerProfile?.skills && profile.developerProfile.skills.length > 0 && (
              <div className="mt-2">
                <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-1 flex items-center"><BrainIcon className="h-3.5 w-3.5 mr-1"/>Key Skills</h5>
                <div className="flex flex-wrap justify-center gap-1">{profile.developerProfile.skills.slice(0,3).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
              </div>
            )}
          </>
        );
      case 'Entrepreneur':
        return (
          <>
            {profile.entrepreneurProfile?.startupName && (
              <div className="mt-2 text-sm">
                <p className="font-semibold text-foreground flex items-center justify-center"><BuildingIcon className="h-4 w-4 mr-1.5 text-muted-foreground"/>{profile.entrepreneurProfile.startupName}</p>
                {profile.entrepreneurProfile.ideaSummary && <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{profile.entrepreneurProfile.ideaSummary}</p>}
                {profile.entrepreneurProfile.pitchDeckUrl && <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-primary"><FileTextIcon className="h-3.5 w-3.5 mr-1"/>View Pitch</Button>}
              </div>
            )}
          </>
        );
      case 'Investor':
        return (
          <>
            {profile.investorProfile?.investmentInterests && profile.investorProfile.investmentInterests.length > 0 && (
              <div className="mt-2">
                <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-1 flex items-center"><PackageCheckIcon className="h-3.5 w-3.5 mr-1"/>Interests</h5>
                <div className="flex flex-wrap justify-center gap-1">{profile.investorProfile.investmentInterests.slice(0,3).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
              </div>
            )}
          </>
        );
      default: return null;
    }
  }

  return (
    <Card className="overflow-hidden shadow-lg rounded-xl flex flex-col h-full">
      <CardHeader className="p-0 relative">
         <div className="relative h-32 w-full bg-muted overflow-hidden">
           {profile.bannerUrl ? <Image src={profile.bannerUrl} alt={`${profile.name} banner`} layout="fill" objectFit="cover" data-ai-hint={profile.bannerAiHint || "abstract background"}/> : <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20"></div>}
         </div>
         <div className="flex justify-center -mt-12">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-card shadow-md bg-background">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint} />
              <AvatarFallback>{profile.name.substring(0,1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <PresenceIndicator presence={profile.presence} />
          </div>
         </div>
      </CardHeader>
      <CardContent className="text-center pt-3 flex-grow flex flex-col">
        <CardTitle className="text-xl">{profile.name}</CardTitle>
        {profile.title && <CardDescription className="text-primary text-sm">{profile.title}</CardDescription>}
        
        {(profile.customStatusEmoji || profile.customStatusText) && (
          <div className="mt-1 flex items-center justify-center text-xs text-muted-foreground">
            {profile.customStatusEmoji && <span className="mr-1 text-base">{profile.customStatusEmoji}</span>}
            <span>{profile.customStatusText}</span>
          </div>
        )}
        {profile.presence === 'offline' && profile.lastActiveTimestamp && (<p className="text-xs text-muted-foreground mt-0.5">Last active: {profile.lastActiveTimestamp}</p>)}
        
        <div className="flex items-center justify-center text-sm text-muted-foreground mt-1.5">
          {getRoleSpecificIcon(profile.role, "h-3.5 w-3.5")} {profile.role}
        </div>
        <div className="flex items-center justify-center text-xs text-muted-foreground mt-0.5">
          <MapPinIcon className="h-3 w-3 mr-1" /> {profile.location}
        </div>
        
        <p className="mt-2.5 text-sm text-muted-foreground px-3 line-clamp-3 flex-grow-0">{profile.bio}</p>
        
        <div className="mt-auto pt-3 space-y-2">
          {renderRoleSpecificInfo()}

          {profile.workExperience && profile.workExperience.length > 0 && (
            <div className="text-left text-xs border-t pt-2 mt-2">
              <div className="flex items-center text-muted-foreground mb-0.5">
                <BriefcaseIcon className="h-3.5 w-3.5 mr-1.5 flex-shrink-0"/>
                <span className="truncate">{profile.workExperience[0].title} at {profile.workExperience[0].company}</span>
              </div>
            </div>
          )}
          {profile.education && profile.education.length > 0 && (
            <div className="text-left text-xs pt-1">
             <div className="flex items-center text-muted-foreground">
              <GraduationCapIcon className="h-3.5 w-3.5 mr-1.5 flex-shrink-0"/>
              <span className="truncate">{profile.education[0].degree} from {profile.education[0].institution}</span>
            </div>
          </div>
        )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 p-3 border-t">
        <Button className="w-full" size="sm">View Profile <ChevronRightIcon className="ml-1 h-4 w-4"/></Button>
        <div className="flex space-x-1">
           <Button variant="outline" size="icon-sm" aria-label="Star" onClick={() => onToggleStar(profile.id)}> <StarIcon className="h-4 w-4" fill={profile.isStarred ? "currentColor" : "none"} /> </Button>
           <Button variant="outline" size="icon-sm" aria-label="Connect"> <UserPlusIcon className="h-4 w-4" /> </Button>
           <Button variant="outline" size="icon-sm" aria-label="Follow"> <RssIcon className="h-4 w-4" /> </Button>
           <Button variant="outline" size="icon-sm" aria-label="Message"> <MailIcon className="h-4 w-4" /> </Button>
           {profile.socialLinks?.linkedin && (<Button variant="outline" size="icon-sm" asChild><a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon className="h-4 w-4" /></a></Button>)}
           {profile.socialLinks?.github && (<Button variant="outline" size="icon-sm" asChild><a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon className="h-4 w-4" /></a></Button>)}
           {profile.socialLinks?.portfolioWebsite && (<Button variant="outline" size="icon-sm" asChild><a href={profile.socialLinks.portfolioWebsite} target="_blank" rel="noopener noreferrer" aria-label="Website"><GlobeIcon className="h-4 w-4" /></a></Button>)}
        </div>
      </CardFooter>
    </Card>
  );
}
// Add custom button size if needed in globals.css or tailwind.config.js
// For now, using existing "sm" and "icon" sizes. "icon-sm" could be a custom variant.
// Let's try making a custom size for icon buttons in the footer
// For `buttonVariants` in `src/components/ui/button.tsx`, we'd add 'icon-sm': 'h-8 w-8'
// And then use size="icon-sm"
// For this turn, I'll stick to size="icon" for simplicity, they might be a bit large.
// Or, I can define a local style for them if needed or make the size prop smaller if available or adjust padding.
// I will use existing `size="sm"` for the main button and `size="icon"` for icon buttons, but reduce overall padding on the footer, and use `h-4 w-4` for icons.

    

