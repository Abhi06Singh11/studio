
"use client";

import Link from 'next/link';
import Image from 'next/image';
import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  BriefcaseIcon,
  MapPinIcon,
  UsersIcon,
  GraduationCapIcon,
  GlobeIcon,
  FileTextIcon,
  LightbulbIcon,
  DollarSignIcon,
  UserPlusIcon,
  RssIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SettingsIcon,
  ArrowLeftIcon,
  AwardIcon,
  BookOpenTextIcon,
  MessageSquareIcon,
  SparklesIcon,
  HeartIcon,
  TwitterIcon,
  PhoneIcon,
  LinkIcon as LinkIconLucide,
  ExternalLinkIcon, // Added ExternalLinkIcon
} from "lucide-react";
import { cn } from '@/lib/utils';

// --- Interfaces for Profile Data Structure ---
interface ContactInfo {
  email?: string;
  phone?: string; // Conceptual
  website?: string;
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolioWebsite?: string;
}

interface WorkExperienceEntry {
  id: string;
  title: string;
  company: string;
  logoUrl?: string; // Optional company logo
  logoAiHint?: string;
  duration: string;
  location?: string;
  description: string;
}

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  logoUrl?: string; // Optional institution logo
  logoAiHint?: string;
  duration?: string; // Replaces 'year' for more flexibility
  notes?: string;
}

interface SkillEntry {
  id: string;
  name: string;
  endorsements?: number; // Conceptual
}

interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
  imageAiHint?: string;
}

interface CertificationEntry {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

interface RecommendationEntry {
  id: string;
  recommenderName: string;
  recommenderTitle?: string;
  recommenderAvatarUrl?: string;
  recommenderAvatarAiHint?: string;
  text: string;
  timestamp?: string; // Date of recommendation
}

type UserRole = 'Developer' | 'Entrepreneur' | 'Investor' | 'General';

interface Profile {
  id: string;
  name: string;
  headline?: string;
  avatarUrl: string;
  dataAiHint: string;
  bannerUrl?: string;
  bannerAiHint?: string;
  bio: string;
  location: string;
  role: UserRole;
  
  contactInfo?: ContactInfo;
  socialLinks?: SocialLinks;

  workExperience?: WorkExperienceEntry[];
  education?: EducationEntry[];
  skills?: SkillEntry[];
  projects?: ProjectEntry[];
  certifications?: CertificationEntry[];
  recommendationsReceived?: RecommendationEntry[];
  // recommendationsGiven?: RecommendationEntry[]; // For future use
  interests?: string[];

  // Fields from previous versions, can be mapped or removed if fully covered by new structure
  title?: string; // Covered by headline
  developerProfile?: { skills?: string[]; tools?: string[]; projects?: string[]; };
  entrepreneurProfile?: { startupName?: string; ideaSummary?: string; pitchDeckUrl?: string; };
  investorProfile?: { investmentInterests?: string[]; pastInvestments?: string[]; };
}

// --- Enhanced Sample Data for a Single Profile (Dr. Elara Vance) ---
const userProfileData: Profile = {
  id: "1",
  name: "Dr. Elara Vance",
  headline: "Lead AI Researcher & Ethical AI Advocate @ Innovatech AI Labs",
  avatarUrl: "https://placehold.co/150x150.png?p=1",
  dataAiHint: "scientist woman",
  bannerUrl: "https://placehold.co/1000x250.png?b=tech-abstract",
  bannerAiHint: "abstract technology blue",
  bio: "Dr. Elara Vance is a distinguished Lead AI Researcher at Innovatech AI Labs, specializing in Natural Language Processing, Machine Learning, and the ethical implications of artificial intelligence. With a Ph.D. in Computer Science from Stanford University, her work focuses on developing transparent and fair AI systems. Elara is passionate about leveraging AI for social good and actively seeks collaborations on projects that push the boundaries of technology while upholding human values. She is an advocate for diversity in tech and mentors aspiring AI professionals. Beyond her research, Elara enjoys hiking, astrophotography, and contributing to open-source AI ethics frameworks. She believes in the power of collaborative innovation to solve complex global challenges.",
  location: "San Francisco, CA",
  role: "Developer",
  contactInfo: {
    email: "elara.vance@codesphere.example.com",
    website: "https://elara.dev",
  },
  socialLinks: {
    linkedin: "https://linkedin.com/in/elaravance",
    github: "https://github.com/elaravance",
    twitter: "https://twitter.com/elaravance_ai",
    portfolioWebsite: "https://elara.dev/portfolio",
  },
  workExperience: [
    { id: "we1", title: "Lead AI Researcher", company: "Innovatech AI Labs", duration: "2021 - Present", location: "San Francisco, CA", description: "Leading a team of researchers focused on developing next-generation NLP models and ethical AI frameworks. Responsible for setting research direction, securing grants, and publishing findings in top-tier conferences and journals. Spearheaded the 'AI for Accessibility' initiative.", logoUrl: "https://placehold.co/40x40.png?text=IAL", logoAiHint: "lab icon" },
    { id: "we2", title: "Senior Machine Learning Engineer", company: "Tech Solutions Inc.", duration: "2018 - 2021", location: "Palo Alto, CA", description: "Developed and deployed scalable machine learning solutions for enterprise clients across various industries, including healthcare and finance. Specialized in predictive analytics and anomaly detection systems.", logoUrl: "https://placehold.co/40x40.png?text=TSI", logoAiHint: "tech solution" }
  ],
  education: [
    { id: "edu1", institution: "Stanford University", degree: "Ph.D. in Computer Science", duration: "2014 - 2018", notes: "Dissertation on 'Explainable AI and Algorithmic Fairness'. Recipient of the Future of AI Scholarship.", logoUrl: "https://placehold.co/40x40.png?text=SU", logoAiHint: "university crest" },
    { id: "edu2", institution: "Massachusetts Institute of Technology (MIT)", degree: "M.S. in Computer Science", duration: "2012 - 2014", notes: "Thesis on 'Advanced Deep Learning Architectures'." },
    { id: "edu3", institution: "University of Cambridge", degree: "B.A. (Hons) in Computer Science", duration: "2009 - 2012", notes: "First Class Honours." }
  ],
  skills: [
    { id: "sk1", name: "Machine Learning", endorsements: 99 },
    { id: "sk2", name: "Natural Language Processing (NLP)", endorsements: 99 },
    { id: "sk3", name: "Python", endorsements: 99 },
    { id: "sk4", name: "Ethical AI Development", endorsements: 85 },
    { id: "sk5", name: "Deep Learning", endorsements: 90 },
    { id: "sk6", name: "PyTorch & TensorFlow", endorsements: 70 },
    { id: "sk7", name: "Next.js", endorsements: 50 },
    { id: "sk8", name: "Genkit", endorsements: 45 },
    { id: "sk9", name: "Data Analysis & Visualization"},
    { id: "sk10", name: "Research & Publication"},
  ],
  projects: [
    { id: "proj1", title: "EthicaML: An Open-Source AI Ethics Toolkit", description: "Co-led the development of an open-source library for evaluating and mitigating bias in machine learning models. Used by over 1,000 researchers.", link: "https://github.com/elaravance/ethicaML", imageUrl:"https://placehold.co/300x200.png?p=ethicaml", imageAiHint: "code interface" },
    { id: "proj2", title: "Project Nightingale: AI for Early Disease Detection", description: "Developed a novel deep learning model for early detection of neurodegenerative diseases from medical imaging data.", link: "#", imageUrl:"https://placehold.co/300x200.png?p=nightingale", imageAiHint: "medical scan" },
  ],
  certifications: [
    { id: "cert1", name: "Google Certified Professional Data Engineer", issuingOrganization: "Google Cloud", issueDate: "2022", credentialUrl: "#"},
    { id: "cert2", name: "Deep Learning Specialization", issuingOrganization: "Coursera (deeplearning.ai)", issueDate: "2020", credentialUrl: "#"},
  ],
  recommendationsReceived: [
    { id: "rec1", recommenderName: "Dr. Alistair Finch", recommenderTitle: "Professor of AI, Stanford University", text: "Elara is one of the brightest and most dedicated researchers I've had the pleasure to mentor. Her contributions to explainable AI are groundbreaking.", timestamp: "2023-05-10", recommenderAvatarUrl: "https://placehold.co/60x60.png?r=af", dataAiHint: "professor avatar"},
    { id: "rec2", recommenderName: "Marcus Chen", recommenderTitle: "CEO, Tech Solutions Inc.", text: "Elara's technical expertise and problem-solving skills were invaluable on several key projects. She's a true asset to any team.", timestamp: "2021-11-20", recommenderAvatarUrl: "https://placehold.co/60x60.png?r=mc", dataAiHint: "ceo avatar"},
  ],
  interests: ["Ethical Technology", "Astrophotography", "Open Source Contribution", "Hiking", "Science Fiction Literature"],
};


export default function ProfileViewPage() {
  const profile = userProfileData; // Using Dr. Vance's data directly
  const [isBioExpanded, setIsBioExpanded] = React.useState(false);

  if (!profile) {
    return <div>Loading profile...</div>; // Or a more sophisticated loading state
  }

  const toggleBio = () => setIsBioExpanded(!isBioExpanded);

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto max-w-5xl py-8 px-2 sm:px-4 lg:px-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Activity Feed
          </Link>
        </div>

        <Card className="overflow-hidden shadow-xl rounded-xl">
          {/* --- Banner and Header --- */}
          <div className="relative">
            <div className="h-48 md:h-64 bg-gradient-to-r from-primary/50 to-accent/50 w-full">
              {profile.bannerUrl && (
                <Image src={profile.bannerUrl} alt={`${profile.name}'s banner`} layout="fill" objectFit="cover" data-ai-hint={profile.bannerAiHint || "abstract background"} />
              )}
            </div>
            <div className="absolute top-32 md:top-40 left-6 md:left-10">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-card bg-background shadow-lg">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint} />
                <AvatarFallback className="text-4xl">{profile.name.substring(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <CardHeader className="pt-20 md:pt-24 pb-4 px-6 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">{profile.name}</CardTitle>
                {profile.headline && <p className="text-lg text-muted-foreground mt-1">{profile.headline}</p>}
                {profile.location && <p className="text-sm text-muted-foreground mt-0.5 flex items-center"><MapPinIcon className="h-4 w-4 mr-1.5"/>{profile.location}</p>}
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button><UserPlusIcon className="mr-2 h-4 w-4"/> Connect</Button>
                <Button variant="outline"><RssIcon className="mr-2 h-4 w-4"/> Follow</Button>
                <Button variant="outline" size="icon"><MessageSquareIcon className="h-4 w-4"/></Button>
              </div>
            </div>
          </CardHeader>
          
          <Separator />

          {/* --- Main Content Sections --- */}
          <div className="p-6 md:p-8 space-y-8">
            {/* About Section */}
            {profile.bio && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><BookOpenTextIcon className="mr-2 h-5 w-5 text-primary"/>About</CardTitle></CardHeader>
                <CardContent>
                  <p className={cn("text-sm text-muted-foreground whitespace-pre-line", !isBioExpanded && "line-clamp-3")}>
                    {profile.bio}
                  </p>
                  {profile.bio.split('\n').length > 3 && ( // Or check character count
                    <Button variant="link" onClick={toggleBio} className="p-0 h-auto text-sm mt-2">
                      {isBioExpanded ? "See less" : "See more"}
                      {isBioExpanded ? <ChevronUpIcon className="ml-1 h-4 w-4"/> : <ChevronDownIcon className="ml-1 h-4 w-4"/>}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Contact & Social Links Section */}
             <Card className="shadow-lg rounded-lg">
              <CardHeader><CardTitle className="text-xl flex items-center"><MailIcon className="mr-2 h-5 w-5 text-primary"/>Contact & Socials</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {profile.contactInfo?.email && (
                    <div className="flex items-center text-muted-foreground hover:text-primary">
                        <MailIcon className="mr-2 h-4 w-4"/> <a href={`mailto:${profile.contactInfo.email}`}>{profile.contactInfo.email}</a>
                    </div>
                )}
                {profile.contactInfo?.website && (
                     <div className="flex items-center text-muted-foreground hover:text-primary">
                        <GlobeIcon className="mr-2 h-4 w-4"/> <a href={profile.contactInfo.website} target="_blank" rel="noopener noreferrer">{profile.contactInfo.website}</a>
                    </div>
                )}
                {profile.socialLinks?.linkedin && (
                    <div className="flex items-center text-muted-foreground hover:text-primary">
                        <LinkedinIcon className="mr-2 h-4 w-4"/> <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                    </div>
                )}
                {profile.socialLinks?.github && (
                    <div className="flex items-center text-muted-foreground hover:text-primary">
                        <GithubIcon className="mr-2 h-4 w-4"/> <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                    </div>
                )}
                 {profile.socialLinks?.twitter && (
                    <div className="flex items-center text-muted-foreground hover:text-primary">
                        <TwitterIcon className="mr-2 h-4 w-4"/> <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter Profile</a>
                    </div>
                )}
                {profile.socialLinks?.portfolioWebsite && (
                    <div className="flex items-center text-muted-foreground hover:text-primary">
                        <LinkIconLucide className="mr-2 h-4 w-4"/> <a href={profile.socialLinks.portfolioWebsite} target="_blank" rel="noopener noreferrer">Portfolio/Website</a>
                    </div>
                )}
              </CardContent>
            </Card>


            {/* Experience Section */}
            {profile.workExperience && profile.workExperience.length > 0 && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><BriefcaseIcon className="mr-2 h-5 w-5 text-primary"/>Experience</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {profile.workExperience.map(exp => (
                    <div key={exp.id} className="flex gap-4">
                      {exp.logoUrl && <Avatar className="h-12 w-12 border mt-1"><AvatarImage src={exp.logoUrl} alt={`${exp.company} logo`} data-ai-hint={exp.logoAiHint}/><AvatarFallback>{exp.company.substring(0,1)}</AvatarFallback></Avatar>}
                      {!exp.logoUrl && <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center border"><BriefcaseIcon className="h-6 w-6 text-muted-foreground"/></div> }
                      <div className="flex-1">
                        <h3 className="font-semibold text-md text-foreground">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground/80">{exp.duration} {exp.location && `· ${exp.location}`}</p>
                        <p className="text-sm text-muted-foreground mt-1.5 whitespace-pre-line">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Education Section */}
            {profile.education && profile.education.length > 0 && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><GraduationCapIcon className="mr-2 h-5 w-5 text-primary"/>Education</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {profile.education.map(edu => (
                     <div key={edu.id} className="flex gap-4">
                      {edu.logoUrl && <Avatar className="h-12 w-12 border mt-1"><AvatarImage src={edu.logoUrl} alt={`${edu.institution} logo`} data-ai-hint={edu.logoAiHint}/><AvatarFallback>{edu.institution.substring(0,1)}</AvatarFallback></Avatar>}
                      {!edu.logoUrl && <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center border"><GraduationCapIcon className="h-6 w-6 text-muted-foreground"/></div> }
                      <div className="flex-1">
                        <h3 className="font-semibold text-md text-foreground">{edu.institution}</h3>
                        <p className="text-sm text-muted-foreground">{edu.degree}</p>
                        {edu.duration && <p className="text-xs text-muted-foreground/80">{edu.duration}</p>}
                        {edu.notes && <p className="text-sm text-muted-foreground mt-1.5 whitespace-pre-line">{edu.notes}</p>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Skills Section */}
            {profile.skills && profile.skills.length > 0 && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><LightbulbIcon className="mr-2 h-5 w-5 text-primary"/>Skills</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <Badge key={skill.id} variant="secondary" className="text-sm py-1 px-3">
                      {skill.name} 
                      {/* Conceptual: {skill.endorsements && <span className="ml-1.5 text-xs opacity-70">({skill.endorsements})</span>} */}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Projects Section */}
            {profile.projects && profile.projects.length > 0 && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><FileTextIcon className="mr-2 h-5 w-5 text-primary"/>Projects</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {profile.projects.map(project => (
                    <Card key={project.id} className="p-4 bg-muted/30">
                      {project.imageUrl && (
                        <div className="relative h-40 w-full rounded-md overflow-hidden mb-3 border">
                          <Image src={project.imageUrl} alt={project.title} layout="fill" objectFit="cover" data-ai-hint={project.imageAiHint || "project image"} />
                        </div>
                      )}
                      <h4 className="font-semibold text-md text-foreground">{project.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      {project.link && project.link !== "#" && (
                        <Button variant="link" asChild className="p-0 h-auto mt-1 text-sm">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project <ExternalLinkIcon className="ml-1.5 h-3.5 w-3.5"/></a>
                        </Button>
                      )}
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Certifications Section */}
            {profile.certifications && profile.certifications.length > 0 && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><AwardIcon className="mr-2 h-5 w-5 text-primary"/>Licenses & Certifications</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {profile.certifications.map(cert => (
                    <div key={cert.id} className="pb-2 border-b last:border-b-0">
                      <h4 className="font-semibold text-md text-foreground">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
                      {cert.issueDate && <p className="text-xs text-muted-foreground/80">Issued: {cert.issueDate}</p>}
                      {cert.credentialId && <p className="text-xs text-muted-foreground/80">Credential ID: {cert.credentialId}</p>}
                       {cert.credentialUrl && cert.credentialUrl !== "#" && (
                        <Button variant="link" size="sm" asChild className="p-0 h-auto mt-0.5 text-xs">
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">See credential <ExternalLinkIcon className="ml-1 h-3 w-3"/></a>
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recommendations Received Section */}
            {profile.recommendationsReceived && profile.recommendationsReceived.length > 0 && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><MessageSquareIcon className="mr-2 h-5 w-5 text-primary"/>Recommendations Received</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  {profile.recommendationsReceived.map(rec => (
                    <div key={rec.id} className="flex gap-3">
                      {rec.recommenderAvatarUrl && <Avatar className="h-10 w-10 border mt-0.5"><AvatarImage src={rec.recommenderAvatarUrl} alt={rec.recommenderName} data-ai-hint={rec.recommenderAvatarAiHint} /><AvatarFallback>{rec.recommenderName.substring(0,1)}</AvatarFallback></Avatar>}
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">{rec.recommenderName}</p>
                        {rec.recommenderTitle && <p className="text-xs text-muted-foreground">{rec.recommenderTitle}</p>}
                        <p className="text-sm text-muted-foreground mt-1.5 italic">"{rec.text}"</p>
                        {rec.timestamp && <p className="text-xs text-muted-foreground/80 mt-1">{rec.timestamp}</p>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Interests Section */}
            {profile.interests && profile.interests.length > 0 && (
              <Card className="shadow-lg rounded-lg">
                <CardHeader><CardTitle className="text-xl flex items-center"><SparklesIcon className="mr-2 h-5 w-5 text-primary"/>Interests</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <Badge key={interest} variant="outline" className="text-sm py-1 px-3">{interest}</Badge>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

    
