import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MailIcon, LinkedinIcon, GithubIcon, BriefcaseIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";

const sampleProfiles = [
  {
    id: "1",
    name: "Dr. Elara Vance",
    title: "Lead AI Researcher",
    avatarUrl: "https://placehold.co/150x150.png?p=1",
    dataAiHint: "scientist woman",
    bio: "Passionate about advancing the frontiers of artificial intelligence and machine learning. Specializing in NLP and ethical AI development. Seeking collaborators for innovative projects.",
    skills: ["Machine Learning", "NLP", "Python", "Ethical AI", "Deep Learning"],
    location: "San Francisco, CA",
    company: "Innovatech AI Labs"
  },
  {
    id: "2",
    name: "Marcus Chen",
    title: "Full-Stack Developer & Entrepreneur",
    avatarUrl: "https://placehold.co/150x150.png?p=2",
    dataAiHint: "developer man",
    bio: "Building scalable web applications and mobile solutions. Founder of DevOptimize, a platform for developer productivity tools. Always open to new challenges and collaborations.",
    skills: ["JavaScript", "React", "Node.js", "GraphQL", "AWS", "Startups"],
    location: "New York, NY",
    company: "DevOptimize Inc."
  },
  {
    id: "3",
    name: "Aisha Khan",
    title: "UX/UI Design Lead",
    avatarUrl: "https://placehold.co/150x150.png?p=3",
    dataAiHint: "designer woman",
    bio: "Crafting intuitive and engaging user experiences for digital products. Believes in user-centric design and agile methodologies. Looking to connect with product managers and engineers.",
    skills: ["UX Design", "UI Design", "Figma", "Prototyping", "User Research"],
    location: "London, UK",
    company: "Creative Solutions Ltd."
  },
];

export default function ProfilesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profiles</h1>
          <p className="text-muted-foreground">Connect with developers, entrepreneurs, and investors.</p>
        </div>
        <Button>Create Your Profile</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProfiles.map((profile) => (
          <Card key={profile.id} className="overflow-hidden shadow-lg rounded-xl flex flex-col">
            <CardHeader className="p-0">
               <div className="relative h-32 w-full bg-muted">
                 <Image src={`https://placehold.co/400x150.png?b=${profile.id}`} alt={`${profile.name} banner`} layout="fill" objectFit="cover" data-ai-hint="abstract background"/>
               </div>
               <div className="flex justify-center -mt-12">
                <Avatar className="h-24 w-24 border-4 border-card shadow-md">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHint} />
                  <AvatarFallback>{profile.name.substring(0,1)}</AvatarFallback>
                </Avatar>
               </div>
            </CardHeader>
            <CardContent className="text-center pt-4 flex-grow">
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <CardDescription className="text-primary">{profile.title}</CardDescription>
              <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                <BriefcaseIcon className="h-3 w-3 mr-1" /> {profile.company}
                <MapPinIcon className="h-3 w-3 ml-2 mr-1" /> {profile.location}
              </div>
              <p className="mt-3 text-sm text-muted-foreground px-2">{profile.bio}</p>
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Skills</h4>
                <div className="flex flex-wrap justify-center gap-1">
                  {profile.skills.slice(0, 5).map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">{skill}</span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-2 p-4 border-t">
              <Button className="w-full">View Profile</Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <MailIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <LinkedinIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <GithubIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
