"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Clock, Calendar, User } from "lucide-react";
import SentimentChart from "@/components/SentimentChart";
import ObjectionsList from "@/components/ObjectionsList";

// Mock data
const transcriptData = {
  id: "tr-123456",
  title: "Call with Acme Corp - Product Demo",
  date: "2023-06-15T14:30:00Z",
  duration: "45:23",
  participants: ["John Smith (Sales Rep)", "Sarah Johnson (Prospect)"],
  summary: "Product demonstration call for enterprise solution. Prospect showed interest but had concerns about implementation timeline and pricing structure. Multiple objections were addressed regarding integration capabilities and support levels.",
  sentiment: {
    overall: 0.65, // 0 to 1 scale, where 1 is most positive
    timeline: [
      { time: "0:00", score: 0.5 },
      { time: "5:00", score: 0.6 },
      { time: "10:00", score: 0.45 },
      { time: "15:00", score: 0.4 },
      { time: "20:00", score: 0.55 },
      { time: "25:00", score: 0.65 },
      { time: "30:00", score: 0.7 },
      { time: "35:00", score: 0.8 },
      { time: "40:00", score: 0.75 },
      { time: "45:00", score: 0.85 },
    ],
  },
  objections: [
    {
      id: "obj-1",
      text: "The implementation timeline seems too long for our needs.",
      time: "12:34",
      response: "We can work on a phased approach that gets you the core functionality within 2 weeks, then build additional features based on your priorities.",
      effectiveness: 0.8,
    },
    {
      id: "obj-2",
      text: "Your pricing is higher than what we budgeted for this quarter.",
      time: "18:45",
      response: "We offer flexible payment terms that can spread the cost over multiple quarters, and we can start with a smaller package that fits your current budget.",
      effectiveness: 0.6,
    },
    {
      id: "obj-3",
      text: "I'm not sure if your solution will integrate with our existing CRM system.",
      time: "27:15",
      response: "We have pre-built integrations with all major CRM platforms including the one you're using. I can share documentation on the integration process.",
      effectiveness: 0.9,
    },
  ],
  keyInsights: [
    "Prospect showed increased engagement when discussing customization options",
    "Technical questions indicate serious interest but need for validation",
    "Decision timeline mentioned as 'within the next month'",
    "Multiple stakeholders will be involved in final decision",
    "Competitor mentioned twice during pricing discussion"
  ],
  recommendations: [
    "Follow up with detailed integration documentation",
    "Provide a customized implementation timeline",
    "Schedule a technical deep dive with their IT team",
    "Offer a phased pricing approach aligned with their quarterly budget",
    "Prepare ROI comparison with the competitor they mentioned"
  ],
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", 
    day: "numeric",
  });
};

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{transcriptData.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 mt-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(transcriptData.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{transcriptData.duration}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{transcriptData.participants.length} Participants</span>
              </div>
            </div>
          </div>
          <Button className="mt-4 md:mt-0" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="objections">Objections</TabsTrigger>
            <TabsTrigger value="transcript">Full Transcript</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Call Summary</CardTitle>
                    <CardDescription>AI-generated summary of the call</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{transcriptData.summary}</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Analysis</CardTitle>
                    <CardDescription>Overall sentiment trend during the call</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SentimentChart 
                      data={transcriptData.sentiment.timeline} 
                      timeKey="time"
                      scoreKey="score"
                      showLegend={true}
                    />
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>Important takeaways from the conversation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {transcriptData.keyInsights.map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm mr-3 mt-0.5 shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Suggested next steps based on the analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {transcriptData.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 text-sm mr-3 mt-0.5 shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="sentiment">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Sentiment Analysis</CardTitle>
                  <CardDescription>
                    Emotional tone throughout the conversation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Overall Sentiment</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-600 h-4 rounded-full" 
                        style={{ width: `${transcriptData.sentiment.overall * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>Negative</span>
                      <span>Neutral</span>
                      <span>Positive</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Sentiment Timeline</h3>
                    <div className="h-80">
                      <SentimentChart 
                        data={transcriptData.sentiment.timeline} 
                        timeKey="time"
                        scoreKey="score"
                        showLegend={true}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="objections">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Objection Handling Analysis</CardTitle>
                  <CardDescription>
                    Review of objections raised and responses provided
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ObjectionsList objections={transcriptData.objections} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="transcript">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Full Transcript</CardTitle>
                  <CardDescription>
                    Complete conversation with timestamps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto p-2">
                    {/* This would render the full transcript with actual data */}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">John Smith (Sales Rep)</span>
                        <span className="text-gray-500 text-sm">0:00</span>
                      </div>
                      <p className="text-gray-700">
                        Hi Sarah, thank you for taking the time to join this call today. I&apos;m excited to show you our product and how it can help solve the challenges we discussed last week.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Sarah Johnson (Prospect)</span>
                        <span className="text-gray-500 text-sm">0:18</span>
                      </div>
                      <p className="text-gray-700">
                        Thanks for having me, John. I&apos;ve been looking forward to seeing the solution in action after our initial discussion.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">John Smith (Sales Rep)</span>
                        <span className="text-gray-500 text-sm">0:32</span>
                      </div>
                      <p className="text-gray-700">
                        Great! Before we dive into the demo, I&apos;d like to quickly confirm the key points from our last conversation to make sure we&apos;re focusing on what matters most to you.
                      </p>
                    </div>
                    
                    {/* Add more transcript entries as needed */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default Analysis; 