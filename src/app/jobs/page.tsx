
"use client";

import * as React from "react";
import JobPostingCard, { type JobPostingCardProps } from "@/components/job-posting-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircleIcon, SearchIcon, FilterIcon, BriefcaseIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleJobPostings: JobPostingCardProps[] = [
  {
    id: "job1",
    title: "Senior Frontend Developer (React)",
    company: "Innovatech Solutions",
    location: "Remote (Global)",
    description: "Seeking an experienced React developer to lead our new e-commerce platform. Strong experience with Next.js and TypeScript required. Join a dynamic team pushing innovation.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Jest"],
    tags: ["Remote", "Full-time", "Senior"],
    budget: "$100k - $140k/year",
    timeline: "Full-time",
    type: "Job",
    imageUrl: "https://placehold.co/400x200.png?job=1",
    imageAiHint: "modern office"
  },
  {
    id: "proj1",
    title: "AI-Powered Content Generation Tool",
    company: "Creative AI Co.",
    location: "Contract (6 months)",
    description: "We need a Python developer with experience in NLP and LLMs to build a prototype for an AI content generation tool. Familiarity with Genkit is a plus.",
    skills: ["Python", "NLP", "LLM", "Genkit", "FastAPI"],
    tags: ["AI", "Contract", "Innovation"],
    budget: "$5,000 - $8,000",
    timeline: "6 Months",
    type: "Project",
    imageUrl: "https://placehold.co/400x200.png?proj=1",
    imageAiHint: "ai algorithm"
  },
  {
    id: "job2",
    title: "Lead UX/UI Designer",
    company: "UserFirst Design Agency",
    location: "New York, NY",
    description: "Drive the user experience for our diverse portfolio of clients. Must have a strong portfolio showcasing mobile and web application designs. Figma expert.",
    skills: ["UX Design", "UI Design", "Figma", "Prototyping", "User Research", "Agile"],
    tags: ["Design", "Full-time", "Lead"],
    budget: "$90k - $120k/year",
    timeline: "Full-time",
    type: "Job",
    imageUrl: "https://placehold.co/400x200.png?job=2",
    imageAiHint: "design tools"
  },
  {
    id: "proj2",
    title: "Develop Custom Shopify Theme",
    description: "Freelance project to create a highly customized Shopify theme for a luxury brand. Requires strong Liquid, HTML, CSS, and JavaScript skills. Previous Shopify experience essential.",
    skills: ["Shopify", "Liquid", "HTML5", "CSS3", "JavaScript", "E-commerce"],
    tags: ["Freelance", "E-commerce", "Web Development"],
    budget: "Project-based ($3k - $6k)",
    timeline: "4-6 Weeks",
    type: "Project",
    imageUrl: "https://placehold.co/400x200.png?proj=2",
    imageAiHint: "website code"
  }
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("All"); // Example filter state
  const [selectedSkill, setSelectedSkill] = React.useState("All"); // Example filter state

  // Placeholder for actual filtering logic
  const filteredPostings = sampleJobPostings.filter(posting => {
    const term = searchTerm.toLowerCase();
    const roleMatch = selectedRole === "All" || posting.type.toLowerCase() === selectedRole.toLowerCase() || (selectedRole === "Jobs" && posting.type === "Job") || (selectedRole === "Projects" && posting.type === "Project");
    const skillMatch = selectedSkill === "All" || posting.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
    const searchMatch = 
        posting.title.toLowerCase().includes(term) ||
        posting.description.toLowerCase().includes(term) ||
        (posting.company && posting.company.toLowerCase().includes(term)) ||
        posting.skills.some(skill => skill.toLowerCase().includes(term)) ||
        (posting.tags && posting.tags.some(tag => tag.toLowerCase().includes(term)));
    
    return roleMatch && skillMatch && searchMatch;
  });

  const uniqueSkills = ["All", ...new Set(sampleJobPostings.flatMap(p => p.skills))];


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <BriefcaseIcon className="mr-3 h-8 w-8 text-primary" />
            Job & Project Board
          </h1>
          <p className="text-muted-foreground">Find your next opportunity or the perfect talent.</p>
        </div>
        <Button>
          <PlusCircleIcon className="mr-2 h-5 w-5" /> Post an Opportunity
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <Card className="p-4 sm:p-6 shadow-md rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2 md:col-span-1">
            <label htmlFor="search-jobs" className="block text-sm font-medium text-muted-foreground mb-1">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-jobs"
                placeholder="Keyword, skill, company, tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-background"
              />
            </div>
          </div>
          <div>
            <label htmlFor="filter-type" className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="filter-type" className="bg-background">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Job">Jobs</SelectItem>
                <SelectItem value="Project">Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="filter-skill" className="block text-sm font-medium text-muted-foreground mb-1">Skill</label>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger id="filter-skill" className="bg-background">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                {uniqueSkills.slice(0, 15).map(skill => <SelectItem key={skill} value={skill}>{skill}</SelectItem>)}
                 {uniqueSkills.length > 15 && <SelectItem value="more" disabled>...more skills</SelectItem>}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Job Postings Grid */}
      {filteredPostings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPostings.map((posting) => (
            <JobPostingCard key={posting.id} {...posting} />
          ))}
        </div>
      ) : (
         <Card className="col-span-full mt-6">
            <CardHeader>
                <CardTitle>No Opportunities Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria, or check back later!
                </p>
            </CardContent>
         </Card>
      )}
    </div>
  );
}
