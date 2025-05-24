"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Clock,
  Calendar,
  User,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  FileText,
  BarChart3,
} from "lucide-react";
import SentimentChart from "@/components/SentimentChart";
import ObjectionsList from "@/components/ObjectionsList";
import { transformSentimentData, formatDate } from "@/services/analysis/api";
import { useGetCallAssetWithAnalysis } from "@/services/analysis/query";
import { useToast } from "@/components/ui/use-toast";
import { LoadingCircle } from "@/components/LoadingCircle";
import { Objection } from "@/services/objections/api";

const AnalysisPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch call asset with analysis
  const { data, isLoading, error, isError } = useGetCallAssetWithAnalysis(
    id as string
  );

  // Show error toast when request fails
  if (isError && error) {
    toast({
      title: "Error",
      description: "Failed to load analysis data",
      variant: "destructive",
    });
  }

  // Get the asset and analysis data
  const asset = data?.asset;
  const analysis = asset?.analysis;

  // Transform sentiment data for the chart
  const sentimentChartData = analysis?.sentimentEntries
    ? transformSentimentData(analysis.sentimentEntries)
    : [];

  // Calculate sentiment score color and label
  const getSentimentColor = (score: number) => {
    if (score >= 0.6) return "bg-green-500";
    if (score >= 0.4) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 0.6) return "Positive";
    if (score >= 0.4) return "Neutral";
    return "Negative";
  };

  // Animation variants
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingCircle />
      </div>
    );
  }

  // Error state when asset or analysis is not found
  if (!asset || !analysis) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-900">
                Analysis not found
              </h3>
              <p className="text-red-700 mt-2">
                The requested analysis does not exist or you don't have
                permission to view it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 max-w-7xl"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <Badge variant="secondary" className="text-xs">
              Analysis Report
            </Badge>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {analysis.title || asset.name || "Untitled Analysis"}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{formatDate(analysis.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{analysis.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">
                {analysis.participants.length} Participants
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Tabs Section */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="overview" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Sentiment
          </TabsTrigger>
          <TabsTrigger value="objections" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Objections
          </TabsTrigger>
          <TabsTrigger value="transcript" className="gap-2">
            <FileText className="h-4 w-4" />
            Transcript
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Call Summary */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Call Summary
                  </CardTitle>
                  <CardDescription>
                    AI-generated summary of the conversation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 leading-relaxed">
                      {analysis.summary}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sentiment Overview */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-gray-200 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Sentiment Overview
                  </CardTitle>
                  <CardDescription>
                    Overall emotional tone of the conversation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Overall Score
                    </span>
                    <Badge
                      className={`${getSentimentColor(
                        analysis.overallSentiment
                      )} text-white`}
                    >
                      {getSentimentLabel(analysis.overallSentiment)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Progress
                      value={analysis.overallSentiment * 100}
                      className="h-3"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Negative</span>
                      <span>Neutral</span>
                      <span>Positive</span>
                    </div>
                  </div>

                  {/* Mini Chart Container with proper sizing */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Sentiment Timeline
                    </h4>
                    <div className="aspect-[2/1] w-full bg-gray-50 rounded-lg p-2 overflow-hidden min-h-[120px] max-h-[200px]">
                      <div className="h-full w-full">
                        <SentimentChart data={sentimentChartData} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Insights */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-gray-200 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Key Insights
                  </CardTitle>
                  <CardDescription>
                    Important takeaways from the conversation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.keyInsights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-purple-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                            {index + 1}
                          </div>
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommendations */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-gray-200 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>
                    Suggested next steps based on the analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-green-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                            {index + 1}
                          </div>
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {analysis.objections?.length || 0}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Objections
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analysis.participants.length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Speakers</div>
                    </div>
                  </div>
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
            className="space-y-6"
          >
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Detailed Sentiment Analysis
                </CardTitle>
                <CardDescription>
                  Comprehensive emotional tone analysis throughout the
                  conversation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Overall Sentiment */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Overall Sentiment Score
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-gray-700">
                        Sentiment Rating
                      </span>
                      <Badge
                        className={`${getSentimentColor(
                          analysis.overallSentiment
                        )} text-white text-sm px-3 py-1`}
                      >
                        {getSentimentLabel(analysis.overallSentiment)} (
                        {(analysis.overallSentiment * 100).toFixed(1)}%)
                      </Badge>
                    </div>
                    <Progress
                      value={analysis.overallSentiment * 100}
                      className="h-4"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>Negative (0%)</span>
                      <span>Neutral (50%)</span>
                      <span>Positive (100%)</span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Sentiment Timeline
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="aspect-[3/2] w-full min-h-[300px] max-h-[400px]">
                      <SentimentChart data={sentimentChartData} />
                    </div>
                  </div>
                </div>

                {/* Participant Talk Stats */}
                {analysis.participantTalkStats &&
                  analysis.participantTalkStats.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Speaking Time Distribution
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="space-y-4">
                          {analysis.participantTalkStats.map((stat) => (
                            <div
                              key={stat.id}
                              className="bg-white rounded-lg p-4 border border-gray-200"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                    {stat.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      {stat.name}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="ml-2 text-xs"
                                    >
                                      {stat.role}
                                    </Badge>
                                  </div>
                                </div>
                                <span className="text-sm font-semibold text-gray-600">
                                  {stat.percentage.toFixed(1)}%
                                </span>
                              </div>
                              <Progress
                                value={stat.percentage}
                                className="h-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  Objection Handling Analysis
                </CardTitle>
                <CardDescription>
                  Review of objections raised and responses provided during the
                  call
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysis.objections.length > 0 ? (
                  <ObjectionsList
                    objections={analysis.objections as Objection[]}
                  />
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Objections Detected
                    </h3>
                    <p className="text-gray-500">
                      This call proceeded smoothly without any significant
                      objections or concerns raised.
                    </p>
                  </div>
                )}
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
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  Full Transcript
                </CardTitle>
                <CardDescription>
                  Complete conversation with timestamps and speaker
                  identification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg">
                  <div className="max-h-[600px] overflow-y-auto p-6">
                    {asset.type === "TEXT" ? (
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap break-words text-gray-800 font-mono text-sm leading-relaxed">
                          {asset.content}
                        </pre>
                      </div>
                    ) : asset.type === "FILE" && asset.content ? (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <iframe
                          src={asset.content}
                          width="100%"
                          height="600px"
                          frameBorder="0"
                          title="PDF Viewer"
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Transcript Unavailable
                        </h3>
                        <p className="text-gray-500">
                          The full transcript content is not available for this
                          analysis.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AnalysisPage;
