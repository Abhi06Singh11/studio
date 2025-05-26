
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HistoryIcon, FilterIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sampleSubmissions = [
  { id: "sub1", challengeTitle: "Two Sum", date: "2024-07-20", result: "Passed", runtime: "4ms", language: "Python" },
  { id: "sub2", challengeTitle: "Longest Substring Without Repeating Characters", date: "2024-07-18", result: "Passed", runtime: "88ms", language: "JavaScript" },
  { id: "sub3", challengeTitle: "Pathfinding Algorithm", date: "2024-07-15", result: "Failed", runtime: "N/A", language: "C++" },
  { id: "sub4", challengeTitle: "Two Sum", date: "2024-07-19", result: "Failed", runtime: "N/A", language: "Python" },
];

export default function MySubmissionsView() {
  const [filterResult, setFilterResult] = React.useState("All");
  // Conceptual: date filtering would need a date picker
  
  const filteredSubmissions = sampleSubmissions.filter(sub => 
    filterResult === "All" || sub.result === filterResult
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <CardHeader className="pb-2 px-0 pt-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <HistoryIcon className="mr-2 h-6 w-6 text-primary" /> My Submissions
        </CardTitle>
        <CardDescription>Review your past attempts and solutions to coding challenges.</CardDescription>
      </CardHeader>

      <div className="flex items-center gap-2">
        <Select value={filterResult} onValueChange={setFilterResult}>
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue placeholder="Filter by result" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Results</SelectItem>
            <SelectItem value="Passed">Passed</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        {/* Placeholder for date filter */}
        <Button variant="outline" disabled><FilterIcon className="mr-2 h-4 w-4"/>Filter by Date</Button>
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="overflow-auto flex-grow">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead>Challenge Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Runtime</TableHead>
                  <TableHead>Language</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length > 0 ? filteredSubmissions.map((sub) => (
                  <TableRow key={sub.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{sub.challengeTitle}</TableCell>
                    <TableCell>{sub.date}</TableCell>
                    <TableCell>
                      <Badge variant={sub.result === "Passed" ? "default" : "destructive"}>
                        {sub.result}
                      </Badge>
                    </TableCell>
                    <TableCell>{sub.runtime}</TableCell>
                    <TableCell>{sub.language}</TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No submissions found matching your criteria, or no submissions made yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
