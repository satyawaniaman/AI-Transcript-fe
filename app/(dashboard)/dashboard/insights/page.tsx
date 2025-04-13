"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  ListFilter,
  MessageSquare,
  TrendingUp,
  Zap,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SentimentChart from "@/components/SentimentChart";
import { CategoryTrendChart } from "@/components/CategoryTrendChart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetQuestionsRate,
  useGetTopicCoherence,
  useGetTalkRatio,
  useGetObjectionsHandled,
  useGetSentimentTrends,
} from "@/services/dashboard/query";
import useCurrentOrg from "@/store/useCurrentOrg";

const InsightsPage: React.FC = () => {
  const { currentOrg } = useCurrentOrg();
  const orgId = currentOrg?.id || "";

  // Calculate date range for charts
  const getDateRange = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  const { startDate, endDate } = getDateRange();

  // Fetch data from APIs
  const { data: questionsRateData, isLoading: questionsLoading } =
    useGetQuestionsRate(orgId);
  const { data: topicCoherenceData, isLoading: topicLoading } =
    useGetTopicCoherence(orgId);
  const { data: talkRatioData, isLoading: talkRatioLoading } =
    useGetTalkRatio(orgId);
  const { data: objectionsData, isLoading: objectionsLoading } =
    useGetObjectionsHandled(orgId);
  const { data: sentimentTrends, isLoading: sentimentLoading } =
    useGetSentimentTrends(orgId);

  // Prepare sentiment data for the chart
  const sentimentChartData = React.useMemo(() => {
    if (!sentimentTrends) return [];
    return sentimentTrends.map((item) => ({
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
      isLoading: talkRatioLoading,
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
        ? `${questionsRateData.averageQuestionsPerCall.toFixed(
            0
          )} questions per call`
        : "No data available",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
      isLoading: questionsLoading,
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
      isLoading: objectionsLoading,
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
      isLoading: topicLoading,
    },
  ];

  return (
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
                <CardDescription>
                  Select an organization to view data
                </CardDescription>
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
                Track how your call sentiment has evolved across your last 10
                calls
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
    </motion.div>
  );
};

export default InsightsPage;
