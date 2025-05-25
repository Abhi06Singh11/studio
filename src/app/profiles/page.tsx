
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
import { MailIcon, LinkedinIcon, GithubIcon, BriefcaseIcon, MapPinIcon, UsersIcon, GraduationCapIcon, GlobeIcon, FileTextIcon, LightbulbIcon, TrendingUpIcon, BuildingIcon, UserPlusIcon, RssIcon, SearchIcon, SmileIcon } from "lucide-react";

interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description?: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  duration: string;
}

interface SocialLinks {
  linkedin?: string;
  portfolioWebsite?: string;
  github?: string;
}

type UserRole = 'Developer' | 'Entrepreneur' | 'Investor' | 'General';
type UserPresence = 'online' | 'offline' | 'away';

interface Profile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  dataAiHint: string;
  bannerUrl?: string;
  bannerAiHint?: string;
  bio: string;
  location: string;
  company?: string;
  role: UserRole;
  skills?: string[];
  tools?: string[];
  projects?: string[]; // For Developer
  startupName?: string; // For Entrepreneur
  ideaSummary?: string; // For Entrepreneur
  pitchDeckUrl?: string; // For Entrepreneur
  investmentInterests?: string[]; // For Investor
  pastInvestments?: string[]; // For Investor
  workExperience?: WorkExperience[];
  education?: Education[];
  socialLinks?: SocialLinks;
  profileVisibility?: 'Public' | 'Private' | 'Connections Only';
  customStatusText?: string;
  customStatusEmoji?: string;
  presence?: UserPresence;
  lastActiveTimestamp?: string;
}

const sampleProfiles: Profile[] = [
  {
    id: "1",
    name: "Dr. Elara Vance",
    title: "Lead AI Researcher",
    avatarUrl: "https://placehold.co/150x150.png?p=1",
    dataAiHint: "scientist woman",
    bannerUrl: "https://placehold.co/400x150.png?b=1",
    bannerAiHint: "abstract technology",
    bio: "Passionate about advancing the frontiers of artificial intelligence and machine learning. Specializing in NLP and ethical AI development. Seeking collaborators for innovative projects.",
    skills: ["Machine Learning", "NLP", "Python", "Ethical AI", "Deep Learning", "Next.js"],
    tools: ["PyTorch", "TensorFlow", "Docker", "Kubernetes"],
    location: "San Francisco, CA",
    company: "Innovatech AI Labs",
    role: "Developer",
    workExperience: [
      { title: "Lead AI Researcher", company: "Innovatech AI Labs", duration: "2021 - Present", description: "Leading research on cutting-edge AI models." },
      { title: "Senior ML Engineer", company: "Tech Solutions Inc.", duration: "2018 - 2021" }
    ],
    education: [
      { institution: "Stanford University", degree: "Ph.D. in Computer Science", fieldOfStudy: "Artificial Intelligence", duration: "2014 - 2018" }
    ],
    socialLinks: { linkedin: "#", portfolioWebsite: "#", github: "#" },
    profileVisibility: "Public",
    presence: "online",
    customStatusText: "Deep in thought with LLMs",
    customStatusEmoji: "🧠",
  },
  {
    id: "2",
    name: "Marcus Chen",
    title: "Full-Stack Developer & Entrepreneur",
    avatarUrl: "https://placehold.co/150x150.png?p=2",
    dataAiHint: "developer man",
    bannerUrl: "https://placehold.co/400x150.png?b=2",
    bannerAiHint: "city skyline",
    bio: "Building scalable web applications and mobile solutions. Founder of DevOptimize, a platform for developer productivity tools. Always open to new challenges and collaborations.",
    skills: ["JavaScript", "React", "Node.js", "GraphQL", "AWS", "Startups", "Product Management"],
    location: "New York, NY",
    company: "DevOptimize Inc.",
    role: "Entrepreneur",
    startupName: "DevOptimize Inc.",
    ideaSummary: "A revolutionary platform leveraging AI to streamline developer workflows and boost productivity by 10x.",
    pitchDeckUrl: "#",
    workExperience: [
      { title: "Founder & CEO", company: "DevOptimize Inc.", duration: "2022 - Present" },
      { title: "Senior Full-Stack Developer", company: "WebScale Ltd.", duration: "2019 - 2022" }
    ],
    education: [
      { institution: "MIT", degree: "B.S. in Computer Science", duration: "2015 - 2019" }
    ],
    socialLinks: { linkedin: "#", portfolioWebsite: "#", github: "#" },
    profileVisibility: "Public",
    presence: "away",
    customStatusText: "Coffee break!",
    customStatusEmoji: "☕",
    lastActiveTimestamp: "5m ago",
  },
  {
    id: "3",
    name: "Aisha Khan",
    title: "Venture Capitalist",
    avatarUrl: "https://placehold.co/150x150.png?p=3",
    dataAiHint: "business woman",
    bannerUrl: "https://placehold.co/400x150.png?b=3",
    bannerAiHint: "modern office",
    bio: "Investing in early-stage technology startups with a focus on AI, SaaS, and FinTech. Passionate about supporting visionary founders.",
    skills: ["Due Diligence", "Financial Modeling", "Market Analysis", "Term Sheets"],
    location: "London, UK",
    company: "Future Ventures PLC",
    role: "Investor",
    investmentInterests: ["AI/ML", "SaaS", "FinTech", "Deep Tech"],
    pastInvestments: ["Innovatech AI Labs (Seed)", "DevOptimize Inc. (Angel)"],
     workExperience: [
      { title: "Partner", company: "Future Ventures PLC", duration: "2020 - Present" },
      { title: "Investment Analyst", company: "Capital Growth Partners", duration: "2017 - 2020" }
    ],
    education: [
      { institution: "London Business School", degree: "MBA", duration: "2015 - 2017" }
    ],
    socialLinks: { linkedin: "#" },
    profileVisibility: "Connections Only",
    presence: "offline",
    lastActiveTimestamp: "3h ago",
  },
   {
    id: "4",
    name: "Samira Jones",
    title: "UX Designer & Researcher",
    avatarUrl: "https://placehold.co/150x150.png?p=4",
    dataAiHint: "designer woman",
    bannerUrl: "https://placehold.co/400x150.png?b=4",
    bannerAiHint: "design sketch",
    bio: "Crafting intuitive and user-centered digital experiences. Advocate for accessibility and inclusive design principles. Loves to solve complex problems with elegant solutions.",
    skills: ["UX Design", "User Research", "Prototyping", "Figma", "Accessibility"],
    tools: ["Figma", "Adobe XD", "Miro"],
    location: "Berlin, DE",
    company: "Creative Solutions GmbH",
    role: "Developer", // Using Developer role for more skill display
    workExperience: [
      { title: "Senior UX Designer", company: "Creative Solutions GmbH", duration: "2019 - Present" },
      { title: "UX Researcher", company: "UserFirst Agency", duration: "2017 - 2019" }
    ],
    education: [
      { institution: "University of Arts Berlin", degree: "M.A. in Interaction Design", duration: "2015 - 2017" }
    ],
    socialLinks: { linkedin: "#", portfolioWebsite: "#" },
    profileVisibility: "Public",
    presence: "online",
    customStatusText: "Designing new experiences",
    customStatusEmoji: "🎨",
  },
];

const suggestedProfilesStatic: Profile[] = sampleProfiles.slice(0, 2).filter(p => p.id !== sampleProfiles[0]?.id);


function getRoleSpecificIcon(role: UserRole) {
  switch (role) {
    case 'Developer':
      return <BriefcaseIcon className="h-4 w-4 text-primary mr-1" />;
    case 'Entrepreneur':
      return <LightbulbIcon className="h-4 w-4 text-primary mr-1" />;
    case 'Investor':
      return <TrendingUpIcon className="h-4 w-4 text-primary mr-1" />;
    default:
      return <UsersIcon className="h-4 w-4 text-primary mr-1" />;
  }
}

function PresenceIndicator({ presence, lastActiveTimestamp }: { presence?: UserPresence, lastActiveTimestamp?: string }) {
  if (presence === 'online') {
    return <span className="absolute bottom-1 right-1 block h-3 w-3 rounded-full border-2 border-card bg-green-500" title="Online" />;
  }
  if (presence === 'away') {
    return <span className="absolute bottom-1 right-1 block h-3 w-3 rounded-full border-2 border-card bg-yellow-500" title="Away" />;
  }
  // For offline, no dot, but lastActiveTimestamp might be shown elsewhere
  return null;
}

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("All");
  const [selectedLocation, setSelectedLocation] = React.useState("All");
  const [displayProfiles, setDisplayProfiles] = React.useState<Profile[]>(sampleProfiles);

  const roles = ["All", ...new Set(sampleProfiles.map(p => p.role))];
  const locations = ["All", ...new Set(sampleProfiles.map(p => p.location).filter(Boolean))];

  React.useEffect(() => {
    let profiles = sampleProfiles;

    if (selectedRole !== "All") {
      profiles = profiles.filter(p => p.role === selectedRole);
    }

    if (selectedLocation !== "All") {
      profiles = profiles.filter(p => p.location === selectedLocation);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      profiles = profiles.filter(p =>
        p.name.toLowerCase().includes(lowerSearchTerm) ||
        p.title.toLowerCase().includes(lowerSearchTerm) ||
        p.bio.toLowerCase().includes(lowerSearchTerm) ||
        (p.skills && p.skills.join(" ").toLowerCase().includes(lowerSearchTerm)) ||
        (p.company && p.company.toLowerCase().includes(lowerSearchTerm)) ||
        (p.startupName && p.startupName.toLowerCase().includes(lowerSearchTerm)) ||
        (p.investmentInterests && p.investmentInterests.join(" ").toLowerCase().includes(lowerSearchTerm))
      );
    }
    setDisplayProfiles(profiles);
  }, [searchTerm, selectedRole, selectedLocation]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profiles</h1>
          <p className="text-muted-foreground">Connect with developers, entrepreneurs, and investors.</p>
        </div>
        <Link href="/profiles/edit" passHref>
          <Button>Create Your Profile</Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 sm:p-6 shadow-md rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2 md:col-span-1">
            <label htmlFor="search-profiles" className="block text-sm font-medium text-muted-foreground mb-1">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-profiles"
                placeholder="Name, skill, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-background"
              />
            </div>
          </div>
          <div>
            <label htmlFor="filter-role" className="block text-sm font-medium text-muted-foreground mb-1">Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="filter-role" className="bg-background">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="filter-location" className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger id="filter-location" className="bg-background">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Profiles Grid */}
      {displayProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProfiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden shadow-lg rounded-xl flex flex-col">
              <CardHeader className="p-0">
                 <div className="relative h-32 w-full bg-muted">
                   {profile.bannerUrl && <Image src={profile.bannerUrl} alt={`${profile.name} banner`} layout="fill" objectFit="cover" data-ai-hint={profile.bannerAiHint || "abstract background"}/>}
                 </div>
                 <div className="flex justify-center -mt-12">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-card shadow-md">
                      <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint} />
                      <AvatarFallback>{profile.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <PresenceIndicator presence={profile.presence} />
                  </div>
                 </div>
              </CardHeader>
              <CardContent className="text-center pt-4 flex-grow">
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <CardDescription className="text-primary">{profile.title}</CardDescription>
                
                {(profile.customStatusEmoji || profile.customStatusText) && (
                  <div className="mt-1 flex items-center justify-center text-xs text-muted-foreground">
                    {profile.customStatusEmoji && <span className="mr-1 text-base">{profile.customStatusEmoji}</span>}
                    <span>{profile.customStatusText}</span>
                  </div>
                )}

                {profile.presence === 'offline' && profile.lastActiveTimestamp && (
                  <p className="text-xs text-muted-foreground mt-1">Last active: {profile.lastActiveTimestamp}</p>
                )}
                
                <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                  {getRoleSpecificIcon(profile.role)} {profile.role}
                </div>
                
                {profile.company && (
                  <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                    <BuildingIcon className="h-3 w-3 mr-1" /> {profile.company}
                  </div>
                )}
                <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                  <MapPinIcon className="h-3 w-3 mr-1" /> {profile.location}
                </div>
                
                <p className="mt-3 text-sm text-muted-foreground px-2 line-clamp-3">{profile.bio}</p>
                
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                    {profile.role === 'Developer' ? 'Skills & Tools' : profile.role === 'Investor' ? 'Investment Interests' : 'Key Skills'}
                  </h4>
                  <div className="flex flex-wrap justify-center gap-1">
                    {(profile.skills || profile.investmentInterests || []).slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                    {profile.role === 'Developer' && (profile.tools || []).slice(0,2).map(tool =>(
                       <Badge key={tool} variant="outline" className="text-xs">{tool}</Badge>
                    ))}
                  </div>
                </div>

                {profile.role === 'Entrepreneur' && profile.startupName && (
                  <div className="mt-3 text-sm">
                    <p className="font-semibold text-foreground">{profile.startupName}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{profile.ideaSummary}</p>
                    {profile.pitchDeckUrl && <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-primary"><FileTextIcon className="h-3 w-3 mr-1"/>View Pitch</Button>}
                  </div>
                )}

                {profile.workExperience && profile.workExperience.length > 0 && (
                  <div className="mt-3 text-left text-xs border-t pt-2">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <BriefcaseIcon className="h-3 w-3 mr-1.5"/>
                      <span>{profile.workExperience[0].title} at {profile.workExperience[0].company}</span>
                    </div>
                  </div>
                )}

                {profile.education && profile.education.length > 0 && (
                  <div className="mt-1 text-left text-xs">
                     <div className="flex items-center text-muted-foreground">
                      <GraduationCapIcon className="h-3 w-3 mr-1.5"/>
                      <span>{profile.education[0].degree} from {profile.education[0].institution}</span>
                    </div>
                  </div>
                )}

              </CardContent>
              <CardFooter className="flex flex-col items-center gap-2 p-4 border-t">
                <Button className="w-full">View Profile</Button>
                <div className="flex space-x-1 sm:space-x-2">
                   <Button variant="outline" size="icon" aria-label="Connect">
                    <UserPlusIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Follow">
                    <RssIcon className="h-4 w-4" />
                  </Button>
                  {profile.socialLinks?.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon className="h-4 w-4" /></a>
                    </Button>
                  )}
                  {profile.socialLinks?.github && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon className="h-4 w-4" /></a>
                    </Button>
                  )}
                  {profile.socialLinks?.portfolioWebsite && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={profile.socialLinks.portfolioWebsite} target="_blank" rel="noopener noreferrer" aria-label="Website"><GlobeIcon className="h-4 w-4" /></a>
                    </Button>
                  )}
                  <Button variant="outline" size="icon" aria-label="Message">
                    <MailIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="col-span-full mt-6">
            <CardHeader>
                <CardTitle>No Profiles Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                </p>
            </CardContent>
         </Card>
      )}

      {/* Suggested Connections Section */}
      {suggestedProfilesStatic.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Suggested Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedProfilesStatic.map((profile) => (
               <Card key={`suggest-${profile.id}`} className="overflow-hidden shadow-lg rounded-xl flex flex-col">
                 <CardHeader className="p-0">
                    <div className="relative h-32 w-full bg-muted">
                      {profile.bannerUrl && <Image src={profile.bannerUrl} alt={`${profile.name} banner`} layout="fill" objectFit="cover" data-ai-hint={profile.bannerAiHint || "abstract background"}/>}
                    </div>
                    <div className="flex justify-center -mt-12">
                     <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-card shadow-md">
                          <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint} />
                          <AvatarFallback>{profile.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <PresenceIndicator presence={profile.presence} />
                      </div>
                    </div>
                 </CardHeader>
                 <CardContent className="text-center pt-4 flex-grow">
                   <CardTitle className="text-xl">{profile.name}</CardTitle>
                   <CardDescription className="text-primary">{profile.title}</CardDescription>
                    {(profile.customStatusEmoji || profile.customStatusText) && (
                      <div className="mt-1 flex items-center justify-center text-xs text-muted-foreground">
                        {profile.customStatusEmoji && <span className="mr-1 text-base">{profile.customStatusEmoji}</span>}
                        <span>{profile.customStatusText}</span>
                      </div>
                    )}
                    {profile.presence === 'offline' && profile.lastActiveTimestamp && (
                      <p className="text-xs text-muted-foreground mt-1">Last active: {profile.lastActiveTimestamp}</p>
                    )}
                   <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                     {getRoleSpecificIcon(profile.role)} {profile.role}
                   </div>
                   <p className="mt-2 text-sm text-muted-foreground px-2 line-clamp-2">{profile.bio}</p>
                 </CardContent>
                 <CardFooter className="flex flex-col items-center gap-2 p-4 border-t">
                   <Button className="w-full">View Profile</Button>
                   <div className="flex space-x-1 sm:space-x-2">
                      <Button variant="outline" size="icon" aria-label="Connect">
                       <UserPlusIcon className="h-4 w-4" />
                     </Button>
                     <Button variant="outline" size="icon" aria-label="Follow">
                       <RssIcon className="h-4 w-4" />
                     </Button>
                     <Button variant="outline" size="icon" aria-label="Message">
                       <MailIcon className="h-4 w-4" />
                     </Button>
                   </div>
                 </CardFooter>
               </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


    