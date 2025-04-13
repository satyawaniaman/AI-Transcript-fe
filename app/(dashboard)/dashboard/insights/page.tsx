"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Download,
  ListFilter,
  MessageSquare,
  Share2,
  Sparkles,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SentimentChart from "@/components/SentimentChart";
import { CategoryTrendChart } from "@/components/CategoryTrendChart";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useGetQuestionsRate, 
  useGetTopicCoherence, 
  useGetTalkRatio, 
  useGetObjectionsHandled,
  useGetSentimentTrends 
} from "@/services/dashboard/query";
import useCurrentOrg from "@/store/useCurrentOrg";
import { SkeletonLoader } from "@/components/SkeletonLoader";

const InsightsPage: React.FC = () => {
  const { currentOrg } = useCurrentOrg();
  const orgId = currentOrg?.id || "";

  // Inside your InsightsPage component, calculate the date range:
const getDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};


  const { startDate, endDate } = getDateRange();

  // Fetch data from APIs
  const { data: questionsRateData, isLoading: questionsLoading } = useGetQuestionsRate(orgId);
  const { data: topicCoherenceData, isLoading: topicLoading } = useGetTopicCoherence(orgId);
  const { data: talkRatioData, isLoading: talkRatioLoading } = useGetTalkRatio(orgId);
  const { data: objectionsData, isLoading: objectionsLoading } = useGetObjectionsHandled(orgId);
  const { data: sentimentTrends, isLoading: sentimentLoading } = useGetSentimentTrends(orgId);

  // Prepare sentiment data for the chart
  const sentimentChartData = React.useMemo(() => {
    if (!sentimentTrends) return [];
    return sentimentTrends.map(item => ({
      name: item.name,
      positive: parseFloat(item.positive),
      neutral: parseFloat(item.neutral),
      negative: parseFloat(item.negative),
    }));
  }, [sentimentTrends]);

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

  // Performance metrics that use real API data
  const performanceMetrics = [
    {
      name: "Talk Ratio",
      value: talkRatioLoading 
        ? "Loading..." 
        : talkRatioData 
          ? `${talkRatioData.talkRatio}%` 
          : "N/A",
      change: 0, // You would calculate this from historical data
      target: "50:50",
      description: "Sales rep vs prospect talking time",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
      isLoading: talkRatioLoading
    },
    {
      name: "Question Rate",
      value: questionsLoading 
        ? "Loading..." 
        : questionsRateData 
          ? questionsRateData.averageQuestionsRate.toFixed(1) 
          : "N/A",
      change: 0, // You would calculate this from historical data
      target: "8+",
      description: questionsLoading 
        ? "Loading..." 
        : questionsRateData 
          ? `${questionsRateData.averageQuestionsPerCall.toFixed(0)} questions per call`
          : "No data available",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
      isLoading: questionsLoading
    },
    {
      name: "Objection Success",
      value: objectionsLoading 
        ? "Loading..." 
        : objectionsData 
          ? `${objectionsData.rate.toFixed(0)}%` 
          : "N/A",
      change: 0, // You would calculate this from historical data
      target: "80%",
      description: objectionsLoading 
        ? "Loading..." 
        : objectionsData 
          ? `${objectionsData.successful} of ${objectionsData.total} objections handled`
          : "No data available",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-600",
      isLoading: objectionsLoading
    },
    {
      name: "Topic Coherence",
      value: topicLoading 
        ? "Loading..." 
        : topicCoherenceData 
          ? `${topicCoherenceData.averageCoherence.toFixed(0)}%` 
          : "N/A",
      change: 0, // You would calculate this from historical data
      target: "90%",
      description: "Staying on relevant topics during calls",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600",
      isLoading: topicLoading
    },
  ];

  // Mock data for key insights - would ideally come from an API
  const keyInsights = [
    {
      id: 1,
      title: "You close deals faster when discussing ROI early",
      description:
        "Calls where ROI is discussed in first 5 minutes close 2.3x more often.",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Technical questions are not being addressed effectively",
      description:
        "40% of technical objections result in follow-up questions, indicating unclear answers.",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 3,
      title: "Your most successful calls use active listening techniques",
      description:
        "Top performing calls feature 2x more instances of summarizing and reflecting.",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      title: "Competitor mentions are increasing in recent calls",
      description:
        "35% increase in prospects mentioning competitors over the last month.",
      icon: <Share2 className="h-5 w-5" />,
      color: "bg-red-100 text-red-600",
    },
  ];

  // Mock data for improvement suggestions - would ideally come from an API
  const improvementSuggestions = [
    {
      id: 1,
      title: "Address technical questions more thoroughly",
      description:
        "Prepare detailed answers for the 5 most common technical questions, or consider bringing in a technical resource for complex demos.",
      impact: "high",
    },
    {
      id: 2,
      title: "Create a competitive battlecard",
      description:
        "Develop standard responses to competitor comparisons, emphasizing your unique differentiators.",
      impact: "medium",
    },
    {
      id: 3,
      title: "Increase open-ended questions",
      description:
        "Replace yes/no questions with open-ended ones to drive deeper prospect engagement.",
      impact: "high",
    },
    {
      id: 4,
      title: "Improve discovery phase",
      description:
        "Spend more time understanding prospect needs before presenting solutions.",
      impact: "medium",
    },
  ];

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
            <h1 className="text-2xl font-bold text-navy-800">Sales Insights</h1>
            <p className="text-gray-600 max-w-4xl">
              Welcome back, last week you struggled with pacing and timing
              objections, this week let&apos;s focus on slowing down and driving
              timelines with your prospects
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center">
                          <div
                            className={`mr-3 h-8 w-8 rounded-full ${metric.color} flex items-center justify-center`}
                          >
                            {metric.icon}
                          </div>
                          <CardTitle className="text-sm font-medium text-gray-700">
                            {metric.name}
                          </CardTitle>
                        </div>
                        {metric.isLoading ? (
                          <Skeleton className="h-6 w-12 rounded-full" />
                        ) : (
                          <div
                            className={`text-xs rounded-full px-2 py-1 ${
                              metric.change > 0
                                ? "bg-green-100 text-green-800"
                                : metric.change < 0
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {metric.change > 0 ? "+" : ""}
                            {metric.change}%
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        {metric.isLoading ? (
                          <Skeleton className="h-8 w-16 mb-2" />
                        ) : (
                          <div className="text-2xl font-bold text-navy-800">
                            {metric.value}
                          </div>
                        )}
                        <div className="flex justify-between mt-2">
                          {metric.isLoading ? (
                            <Skeleton className="h-4 w-full" />
                          ) : (
                            <>
                              <p className="text-xs text-gray-500">
                                {metric.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                Target: {metric.target}
                              </p>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Objection Trends - Using the real API data */}
<motion.div variants={itemVariants}>
  {orgId ? (
    <CategoryTrendChart 
      organizationId={orgId}
      startDate={startDate}
      endDate={endDate}
    />
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>Sales Objection Categories</CardTitle>
        <CardDescription>Select an organization to view data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">No organization selected</p>
        </div>
      </CardContent>
    </Card>
  )}
</motion.div>

              {/* Sentiment Trends */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Trends Over Time</CardTitle>
                    <CardDescription>
                      Track how your call sentiment has evolved across your last
                      10 calls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    {sentimentLoading ? (
                      <div className="h-full flex items-center justify-center">
                        <Skeleton className="h-64 w-full" />
                      </div>
                    ) : sentimentChartData && sentimentChartData.length > 0 ? (
                      <SentimentChart data={sentimentChartData} />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500">No sentiment data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="insights">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {keyInsights.map((insight) => (
                <motion.div key={insight.id} variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div
                        className={`${insight.color} h-10 w-10 rounded-full flex items-center justify-center shrink-0`}
                      >
                        {insight.icon}
                      </div>
                      <div>
                        <CardTitle>{insight.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {insight.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="ghost" className="text-xs" size="sm">
                        See Related Calls
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Word Usage Patterns</CardTitle>
                    <CardDescription>
                      Analysis of your most frequently used words compared to
                      top performers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Words to Use More
                        </span>
                        <span className="text-sm text-gray-500">
                          % of Top Performers Using
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2">
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                            <span>&quot;specifically&quot;</span>
                          </div>
                          <span className="text-sm">92%</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2">
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                            <span>&quot;value&quot;</span>
                          </div>
                          <span className="text-sm">88%</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2">
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                            <span>&quot;investment&quot;</span>
                          </div>
                          <span className="text-sm">85%</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">
                          Words to Use Less
                        </span>
                        <span className="text-sm text-gray-500">
                          % of Lower Performers Using
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-red-100 text-red-600 rounded-full p-1 mr-2">
                              <ArrowDownRight className="h-4 w-4" />
                            </div>
                            <span>&quot;honestly&quot;</span>
                          </div>
                          <span className="text-sm">78%</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-red-100 text-red-600 rounded-full p-1 mr-2">
                              <ArrowDownRight className="h-4 w-4" />
                            </div>
                            <span>&quot;probably&quot;</span>
                          </div>
                          <span className="text-sm">65%</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-red-100 text-red-600 rounded-full p-1 mr-2">
                              <ArrowDownRight className="h-4 w-4" />
                            </div>
                            <span>&quot;just&quot;</span>
                          </div>
                          <span className="text-sm">70%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="improvements">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Improvements</CardTitle>
                    <CardDescription>
                      AI-powered recommendations to enhance your sales
                      effectiveness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {improvementSuggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`h-8 w-8 rounded-full ${
                                suggestion.impact === "high"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              } flex items-center justify-center shrink-0`}
                            >
                              <span className="text-xs font-bold">
                                {suggestion.impact === "high" ? "H" : "M"}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-navy-800">
                                {suggestion.title}
                              </h3>
                              <p className="text-gray-600 mt-2 text-sm">
                                {suggestion.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Opportunities</CardTitle>
                    <CardDescription>
                      Focused exercises to improve specific skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-navy-800">
                          Technical Objection Response Practice
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">
                          30-minute interactive session to practice responding
                          to technical objections with clear, concise answers.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Start Exercise
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-navy-800">
                          Value Proposition Framework
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">
                          Learn a structured approach to articulating value that
                          resonates with different buyer personas.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Start Exercise
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-navy-800">
                          Competitive Differentiation Workshop
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">
                          Practice responding to competitor comparisons with
                          confidence and without disparaging competitors.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Start Exercise
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default InsightsPage;