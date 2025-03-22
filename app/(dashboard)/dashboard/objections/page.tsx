"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  Clock, 
  DollarSign, 
  Download, 
  ListFilter, 
  MessageSquare, 
  Search, 
  ShieldCheck,
  Briefcase,
  Users,
} from "lucide-react";
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

type ObjectionCategory = "price" | "timing" | "trust" | "competition" | "stakeholders" | "other";

interface Objection {
  id: string;
  type: ObjectionCategory;
  text: string;
  transcript: string;
  date: string;
  response: string;
  effectiveness: number;
  color: string;
  icon: React.ReactNode;
}

// Helper function to map category to color and icon
const getCategoryDetails = (category: ObjectionCategory) => {
  switch (category) {
    case "price":
      return { 
        color: "bg-red-100 text-red-600", 
        icon: <DollarSign className="h-5 w-5" />
      };
    case "timing":
      return { 
        color: "bg-orange-100 text-orange-600", 
        icon: <Clock className="h-5 w-5" /> 
      };
    case "trust":
      return { 
        color: "bg-blue-100 text-blue-600", 
        icon: <ShieldCheck className="h-5 w-5" /> 
      };
    case "competition":
      return { 
        color: "bg-purple-100 text-purple-600", 
        icon: <Briefcase className="h-5 w-5" /> 
      };
    case "stakeholders":
      return { 
        color: "bg-green-100 text-green-600", 
        icon: <Users className="h-5 w-5" /> 
      };
    default:
      return { 
        color: "bg-gray-100 text-gray-600", 
        icon: <MessageSquare className="h-5 w-5" /> 
      };
  }
};

// Create mock data
const generateMockObjections = (): Objection[] => {
  const objections: Objection[] = [
    {
      id: "obj-1",
      type: "price",
      text: "Your solution is more expensive than what we've budgeted for this quarter.",
      transcript: "Sales Call - ABC Corp Product Demo",
      date: "2023-06-15",
      response: "We offer flexible payment terms that can split the cost across multiple quarters, and we also have a scaled-down version that could fit your current budget while allowing for expansion later.",
      effectiveness: 0.75,
      ...getCategoryDetails("price")
    },
    {
      id: "obj-2",
      type: "price",
      text: "The ROI doesn't seem to justify the cost for our company size.",
      transcript: "Discovery Call - XYZ Enterprises",
      date: "2023-06-12",
      response: "For companies in your industry and size range, our customers typically see ROI within 4-6 months. I can share some case studies showing exactly how similar companies have achieved this.",
      effectiveness: 0.85,
      ...getCategoryDetails("price")
    },
    {
      id: "obj-3",
      type: "timing",
      text: "We're not ready to make a decision until next quarter.",
      transcript: "Follow-up Call - TechSolutions Inc",
      date: "2023-06-08",
      response: "I understand your timeline. What if we started with a pilot program now that requires minimal commitment, so you can evaluate results before making a full decision next quarter?",
      effectiveness: 0.65,
      ...getCategoryDetails("timing")
    },
    {
      id: "obj-4",
      type: "trust",
      text: "We're concerned about the implementation process and potential disruption.",
      transcript: "Pricing Negotiation - Acme Corp",
      date: "2023-06-05",
      response: "That's a valid concern. We have a dedicated implementation team that works after-hours to minimize disruption. I can walk you through our standard implementation plan that typically takes only 2-3 days of minimal system impact.",
      effectiveness: 0.9,
      ...getCategoryDetails("trust")
    },
    {
      id: "obj-5",
      type: "competition",
      text: "We're already using Competitor X's solution, and switching seems complicated.",
      transcript: "Product Demo - Global Industries",
      date: "2023-06-01",
      response: "We've actually developed a specialized migration tool specifically for Competitor X users that automates 90% of the data transfer process. We also offer two weeks of parallel running to ensure a smooth transition.",
      effectiveness: 0.8,
      ...getCategoryDetails("competition")
    },
    {
      id: "obj-6",
      type: "stakeholders",
      text: "I need to get approval from the IT department before we can proceed.",
      transcript: "Initial Contact - New Prospect Inc",
      date: "2023-05-28",
      response: "I'd be happy to join you for that conversation with IT. We have technical documentation and security compliance information ready that addresses most common IT department concerns.",
      effectiveness: 0.7,
      ...getCategoryDetails("stakeholders")
    },
    {
      id: "obj-7",
      type: "trust",
      text: "How can we be sure your company will still be around in 5 years?",
      transcript: "Quarterly Review - Existing Client",
      date: "2023-05-25",
      response: "That's a fair question. We've been in business for 12 years, are profitable with no debt, and have a client retention rate of 94%. We're also backed by [Major Venture Capital Firm] who has committed to our long-term growth strategy.",
      effectiveness: 0.95,
      ...getCategoryDetails("trust")
    },
    {
      id: "obj-8",
      type: "timing",
      text: "We just implemented another system, so we need to wait at least six months.",
      transcript: "Technical Walkthrough - Dev Team",
      date: "2023-05-22",
      response: "I understand the change fatigue concern. What if we use this time to do a thorough planning phase? We can start with requirements gathering and configuration now, but delay the actual implementation until your team is ready.",
      effectiveness: 0.6,
      ...getCategoryDetails("timing")
    },
    {
      id: "obj-9",
      type: "stakeholders",
      text: "Our CEO needs to sign off on any purchase of this size.",
      transcript: "Contract Review - Legal Discussion",
      date: "2023-05-20",
      response: "I'd be happy to prepare an executive summary specifically for your CEO that focuses on the strategic benefits and ROI. I can also make myself available for a brief 15-minute call if that would help in the decision process.",
      effectiveness: 0.8,
      ...getCategoryDetails("stakeholders")
    },
    {
      id: "obj-10",
      type: "price",
      text: "We've received a lower quote from another vendor.",
      transcript: "Onboarding Call - New Customer",
      date: "2023-05-18",
      response: "I appreciate you sharing that. While I can't speak to their offering specifically, I'd love to understand what features are most important to you so I can show how our solution might provide better long-term value despite the initial price difference.",
      effectiveness: 0.7,
      ...getCategoryDetails("price")
    },
  ];
  
  return objections;
};

const mockObjections = generateMockObjections();

// Category counts for dashboard
const categoryCounts = {
  price: mockObjections.filter(obj => obj.type === "price").length,
  timing: mockObjections.filter(obj => obj.type === "timing").length,
  trust: mockObjections.filter(obj => obj.type === "trust").length,
  competition: mockObjections.filter(obj => obj.type === "competition").length,
  stakeholders: mockObjections.filter(obj => obj.type === "stakeholders").length,
  other: mockObjections.filter(obj => obj.type === "other").length,
};

const ObjectionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter objections based on search and active tab
  const filteredObjections = mockObjections.filter(objection => {
    const matchesSearch = objection.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          objection.response.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          objection.transcript.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && objection.type === activeTab;
  });

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
            <h1 className="text-2xl font-bold text-navy-800">Objection Library</h1>
            <p className="text-gray-600">Track and analyze sales objections and your responses</p>
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

        {/* Category Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Price</CardTitle>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoryCounts.price}</div>
              <Progress value={categoryCounts.price * 10} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Timing</CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoryCounts.timing}</div>
              <Progress value={categoryCounts.timing * 10} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Trust/Risk</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoryCounts.trust}</div>
              <Progress value={categoryCounts.trust * 10} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Competition</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoryCounts.competition}</div>
              <Progress value={categoryCounts.competition * 10} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Stakeholders</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoryCounts.stakeholders}</div>
              <Progress value={categoryCounts.stakeholders * 10} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Other</CardTitle>
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-gray-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoryCounts.other}</div>
              <Progress value={categoryCounts.other * 10} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search objections..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">Advanced Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Objections List */}
        <Card>
          <CardHeader>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="timing">Timing</TabsTrigger>
                <TabsTrigger value="trust">Trust</TabsTrigger>
                <TabsTrigger value="competition">Competition</TabsTrigger>
                <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredObjections.length > 0 ? (
                filteredObjections.map((objection) => (
                  <div key={objection.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className={`${objection.color} h-10 w-10 rounded-full flex items-center justify-center shrink-0`}>
                        {objection.icon}
                      </div>
                      <div className="grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                          <h3 className="font-medium text-navy-800">{objection.text}</h3>
                          <div className="flex items-center">
                            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2">
                              {objection.transcript}
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              objection.effectiveness > 0.8 
                                ? "bg-green-100 text-green-800" 
                                : objection.effectiveness > 0.6 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-red-100 text-red-800"
                            }`}>
                              {Math.round(objection.effectiveness * 100)}% Effective
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-700">Your Response:</h4>
                          <p className="text-sm text-gray-600 mt-1">{objection.response}</p>
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                          From call on {new Date(objection.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short", 
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No objections found</h3>
                  <p className="text-gray-500 mt-1">
                    Try adjusting your search or filters to find objections
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ObjectionsPage; 