"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  ListFilter, 
  Search, 
  ChevronDown,
  MoreHorizontal
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Transcript {
  id: string;
  title: string;
  date: string;
  duration: string;
  sentiment: number;
  status: "processed" | "processing" | "failed";
}

const mockTranscripts: Transcript[] = [
  {
    id: "tr-1",
    title: "Sales Call - ABC Corp Product Demo",
    date: "2023-06-15",
    duration: "45:23",
    sentiment: 0.82,
    status: "processed"
  },
  {
    id: "tr-2",
    title: "Discovery Call - XYZ Enterprises",
    date: "2023-06-12",
    duration: "32:15",
    sentiment: 0.75,
    status: "processed"
  },
  {
    id: "tr-3",
    title: "Follow-up Call - TechSolutions Inc",
    date: "2023-06-08",
    duration: "28:45",
    sentiment: 0.65,
    status: "processed"
  },
  {
    id: "tr-4",
    title: "Pricing Negotiation - Acme Corp",
    date: "2023-06-05",
    duration: "38:10",
    sentiment: 0.45,
    status: "processed"
  },
  {
    id: "tr-5",
    title: "Product Demo - Global Industries",
    date: "2023-06-01",
    duration: "52:30",
    sentiment: 0.78,
    status: "processed"
  },
  {
    id: "tr-6",
    title: "Initial Contact - New Prospect Inc",
    date: "2023-05-28",
    duration: "22:15",
    sentiment: 0.68,
    status: "processed"
  },
  {
    id: "tr-7",
    title: "Quarterly Review - Existing Client",
    date: "2023-05-25",
    duration: "60:40",
    sentiment: 0.92,
    status: "processed"
  },
  {
    id: "tr-8",
    title: "Technical Walkthrough - Dev Team",
    date: "2023-05-22",
    duration: "75:10",
    sentiment: 0.73,
    status: "processed"
  },
  {
    id: "tr-9",
    title: "Contract Review - Legal Discussion",
    date: "2023-05-20",
    status: "processing",
    duration: "33:45",
    sentiment: 0.0
  },
  {
    id: "tr-10",
    title: "Onboarding Call - New Customer",
    date: "2023-05-18",
    status: "failed",
    duration: "15:20",
    sentiment: 0.0
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", 
    day: "numeric",
  });
};

const TranscriptsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter transcripts based on search term
  const filteredTranscripts = mockTranscripts.filter(
    transcript => transcript.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-800">Transcripts</h1>
            <p className="text-gray-600">Browse and analyze your call transcripts</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ListFilter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search transcripts..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">Advanced Search</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>All Transcripts</CardTitle>
            <CardDescription>
              {filteredTranscripts.length} transcripts found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTranscripts.map((transcript) => (
                  <TableRow key={transcript.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        {transcript.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(transcript.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {transcript.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transcript.status === "processed" ? (
                        <div className="flex items-center">
                          <div className="mr-2 h-2 w-full max-w-24 rounded-full bg-gray-200">
                            <div 
                              className={`h-2 rounded-full ${
                                transcript.sentiment > 0.7 
                                  ? "bg-green-500" 
                                  : transcript.sentiment > 0.4 
                                    ? "bg-yellow-500" 
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${transcript.sentiment * 100}%` }}
                            />
                          </div>
                          <span>{Math.round(transcript.sentiment * 100)}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transcript.status === "processed" 
                          ? "bg-green-100 text-green-800" 
                          : transcript.status === "processing" 
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {transcript.status === "processed" 
                          ? "Processed" 
                          : transcript.status === "processing" 
                            ? "Processing" 
                            : "Failed"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Analysis</DropdownMenuItem>
                          <DropdownMenuItem>Download Transcript</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default TranscriptsPage; 