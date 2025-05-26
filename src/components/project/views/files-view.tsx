
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileTextIcon, ImageIcon, SearchIcon, UploadCloudIcon, FolderIcon, FileCodeIcon, FileArchiveIcon, MoreHorizontalIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const sampleFiles = [
  { id: "f1", name: "Project Proposal.docx", type: "Document", size: "1.2MB", modified: "3 days ago", sharedBy: "Dr. Elara Vance" },
  { id: "f2", name: "UI Mockups v2.fig", type: "Design File", size: "15.8MB", modified: "1 day ago", sharedBy: "Marcus Chen" },
  { id: "f3", name: "User Persona Research.pdf", type: "PDF", size: "3.5MB", modified: "1 week ago", sharedBy: "Aisha Khan" },
  { id: "f4", name: "backend_api.py", type: "Code", size: "88KB", modified: "2 hours ago", sharedBy: "Dr. Elara Vance" },
  { id: "f5", name: "marketing_assets.zip", type: "Archive", size: "25MB", modified: "5 days ago", sharedBy: "Marketing Bot" },
];

const getFileIcon = (type: string) => {
  if (type.includes("Document") || type.includes("PDF")) return <FileTextIcon className="h-5 w-5 text-blue-500" />;
  if (type.includes("Image") || type.includes("Design")) return <ImageIcon className="h-5 w-5 text-purple-500" />;
  if (type.includes("Code")) return <FileCodeIcon className="h-5 w-5 text-green-500" />;
  if (type.includes("Archive")) return <FileArchiveIcon className="h-5 w-5 text-orange-500" />;
  return <FileTextIcon className="h-5 w-5 text-muted-foreground" />;
};


export default function FilesView() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            <FileTextIcon className="mr-2 h-6 w-6 text-primary" /> Project Files
          </CardTitle>
          <CardDescription>Browse and manage all files shared within this project workspace.</CardDescription>
        </div>
        <Button>
          <UploadCloudIcon className="mr-2 h-4 w-4" /> Upload File
        </Button>
      </div>
      
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search files..." className="pl-8 bg-card" />
      </div>

      <Card className="flex-1">
        <CardContent className="p-0">
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Shared By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleFiles.map((file) => (
                <TableRow key={file.id} className="hover:bg-muted/50">
                  <TableCell>{getFileIcon(file.type)}</TableCell>
                  <TableCell className="font-medium text-foreground">{file.name}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{file.type}</Badge></TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.modified}</TableCell>
                  <TableCell>{file.sharedBy}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {sampleFiles.length === 0 && (
             <div className="p-6 text-center h-full flex flex-col items-center justify-center">
                <FolderIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">No files shared</p>
                <p className="text-sm text-muted-foreground/80">Upload files to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
