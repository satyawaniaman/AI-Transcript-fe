"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  FileText,
  MessageSquare,
  PieChart,
  PlusCircle,
  Upload,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Calendar,
  Clock,
  Target,
  ArrowRight,
  BarChart3,
  Zap,
  Filter,
  Sparkles,
  X,
} from "lucide-react";
import SentimentChart from "@/components/SentimentChart";
import ObjectionsList from "@/components/ObjectionsList";
import RecentTranscriptsList from "@/components/RecentTranscriptsList";
import { useToast } from "@/components/ui/use-toast";
import { useGetUser } from "@/services/user/query";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import NoOrganizationScreen from "@/components/NoOrganizationScreen";
import useCurrentOrg from "@/store/useCurrentOrg";
import {
  useGetSentimentTrends,
  useGetCommonObjections,
  useGetTranscripts,
  useGetDashboardMetrics,
  useGetQuestionsRate,
  useGetTopicCoherence,
} from "@/services/dashboard/query";
import { DoubleLineLoader, SkeletonLoader } from "@/components/SkeletonLoader";
import {
  ANALYSIS_COMPLETE_EVENT,
  getAnalysisStartPage,
  clearAnalysisStartPage,
} from "@/utils/analysisTracking";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: user, isLoading: userLoading } = useGetUser();
  const { currentOrg } = useCurrentOrg();
  const orgId = currentOrg?.id || "";
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Setup listener for analysis complete events
  useEffect(() => {
    const handleAnalysisComplete = (): void => {
      setRefreshTrigger((prev) => prev + 1);
      const startPage = getAnalysisStartPage();
      if (startPage) {
        clearAnalysisStartPage();
      }
      toast({
        title: "Analysis Complete! ✨",
        description:
          "Your dashboard has been updated with the latest insights.",
      });
    };

    window.addEventListener(ANALYSIS_COMPLETE_EVENT, handleAnalysisComplete);
    return () => {
      window.removeEventListener(
        ANALYSIS_COMPLETE_EVENT,
        handleAnalysisComplete
      );
    };
  }, [toast]);

  // Convert dateFilter to API format
  const getApiDateFilter = (filterValue: string): string => {
    switch (filterValue) {
      case "today":
        return "today";
      case "yesterday":
        return "yesterday";
      case "this_week":
        return "this week";
      case "last_15days":
        return "last 15 days";
      case "this_month":
        return "this month";
      case "all":
        return "";
      default:
        return filterValue;
    }
  };

  const apiDateFilter = getApiDateFilter(dateFilter);

  // Optimized API calls with bundled metrics
  const {
    data: dashboardMetrics,
    isLoading: dashboardMetricsLoading,
    refetch: refetchDashboardMetrics,
  } = useGetDashboardMetrics(orgId, {
    dateFilter: apiDateFilter,
  });

  const {
    data: sentimentTrends,
    isLoading: trendsLoading,
    refetch: refetchTrends,
  } = useGetSentimentTrends(orgId);

  const {
    data: commonObjections,
    isLoading: commonLoading,
    refetch: refetchCommon,
  } = useGetCommonObjections(orgId);

  const {
    data: transcripts,
    isLoading: transcriptsLoading,
    refetch: refetchTranscripts,
  } = useGetTranscripts(orgId, page, limit);

  // Additional metrics for enhanced dashboard (with date filter support)
  const {
    data: questionsRate,
    isLoading: questionsLoading,
    refetch: refetchQuestionsRate,
  } = useGetQuestionsRate(orgId);

  const {
    data: topicCoherence,
    isLoading: coherenceLoading,
    refetch: refetchTopicCoherence,
  } = useGetTopicCoherence(orgId);

  // Effect to trigger refetches when filter changes
  useEffect(() => {
    if (refreshTrigger > 0 && orgId) {
      // Refetch all data when analysis completes
      refetchDashboardMetrics();
      refetchTrends();
      refetchCommon();
      refetchTranscripts();
      refetchQuestionsRate();
      refetchTopicCoherence();
    }
  }, [
    refreshTrigger,
    orgId,
    refetchDashboardMetrics,
    refetchTrends,
    refetchCommon,
    refetchTranscripts,
    refetchQuestionsRate,
    refetchTopicCoherence,
  ]);

  // Extract data from bundled metrics
  const transcriptsCount = dashboardMetrics?.transcripts;
  const sentiment = dashboardMetrics?.sentiment;
  const objections = dashboardMetrics?.objections;
  const talkRatio = dashboardMetrics?.talkRatio;

  // Helper functions
  const getFilterDisplayName = (filter: string): string => {
    switch (filter) {
      case "today":
        return "Today";
      case "yesterday":
        return "Yesterday";
      case "this_week":
        return "This Week";
      case "last_15days":
        return "Last 15 Days";
      case "this_month":
        return "This Month";
      case "all":
        return "All Time";
      default:
        return filter;
    }
  };

  const getSentimentStatus = (value: number) => {
    if (value >= 70)
      return {
        color: "text-green-600",
        bg: "bg-green-100",
        trend: TrendingUp,
        label: "Excellent",
      };
    if (value >= 60)
      return {
        color: "text-blue-600",
        bg: "bg-blue-100",
        trend: TrendingUp,
        label: "Good",
      };
    if (value >= 40)
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        trend: Activity,
        label: "Neutral",
      };
    return {
      color: "text-red-600",
      bg: "bg-red-100",
      trend: TrendingDown,
      label: "Needs Attention",
    };
  };

  const handleFilterChange = async (value: string) => {
    setDateFilter(value);
    const newApiDateFilter = getApiDateFilter(value);

    // Invalidate queries with the correct query key structure
    await queryClient.invalidateQueries({
      queryKey: ["dashboardMetrics", newApiDateFilter],
    });

    // Also invalidate other queries that might be affected by date filtering
    await queryClient.invalidateQueries({
      queryKey: ["sentimentTrends", orgId],
    });

    await queryClient.invalidateQueries({
      queryKey: ["commonObjections", orgId],
    });

    await queryClient.invalidateQueries({
      queryKey: ["questionsRate", orgId],
    });

    await queryClient.invalidateQueries({
      queryKey: ["topicCoherence", orgId],
    });

    toast({
      title: "Filter Applied ✅",
      description: `Dashboard showing data for: ${getFilterDisplayName(value)}`,
    });
  };

  const isLoading = userLoading || !user;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (user.organizations.length === 0) {
    return <NoOrganizationScreen />;
  }

  if (!orgId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center">
            <div className="text-red-600 font-medium">
              No organization found
            </div>
            <p className="text-red-500 text-sm mt-1">
              Please select an organization to continue
            </p>
          </CardContent>
        </Card>

        {/* Questions Rate */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100/50 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-indigo-700">
                Questions Rate
              </CardTitle>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                Per Call
              </Badge>
            </div>

            {dateFilter !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange("all")}
                className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <X className="h-3 w-3" />
                Clear Filter
              </Button>
            )}
            <div className="p-2 bg-indigo-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {questionsLoading ? (
              <SkeletonLoader height="h-8" width="w-16" />
            ) : (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-indigo-900">
                  {questionsRate?.averageQuestionsPerCall?.toFixed(1) || 0}
                </div>
                <div className="flex items-center gap-1 text-xs text-indigo-600">
                  <Activity className="h-3 w-3" />
                  <span>From {questionsRate?.totalCalls || 0} calls</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Topic Coherence */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-teal-50 to-teal-100/50 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-teal-700">
                Topic Coherence
              </CardTitle>
              <Badge
                className={`text-xs px-2 py-0.5 ${
                  (topicCoherence?.averageCoherence || 0) >= 0.7
                    ? "bg-green-100 text-green-700"
                    : (topicCoherence?.averageCoherence || 0) >= 0.5
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                } border-0`}
              >
                {(topicCoherence?.averageCoherence || 0) >= 0.7
                  ? "Excellent"
                  : (topicCoherence?.averageCoherence || 0) >= 0.5
                  ? "Good"
                  : "Needs Work"}
              </Badge>
            </div>
            <div className="p-2 bg-teal-100 rounded-lg">
              <Target className="h-5 w-5 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {coherenceLoading ? (
              <SkeletonLoader height="h-8" width="w-16" />
            ) : (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-teal-900">
                  {((topicCoherence?.averageCoherence || 0) * 100).toFixed(1)}%
                </div>
                <div className="flex items-center gap-1 text-xs text-teal-600">
                  <Sparkles className="h-3 w-3" />
                  <span>Conversation focus</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const sentimentScore = sentiment?.average || 0;
  const sentimentStatus = getSentimentStatus(sentimentScore);
  const objectionRate = objections?.successRate || 0;
  const objectionStatus = getSentimentStatus(objectionRate);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-xs font-medium gap-1">
              <Sparkles className="h-3 w-3" />
              Sales Analytics
            </Badge>
            {dateFilter !== "all" && (
              <Badge
                className={`text-xs px-2 py-1 ${sentimentStatus.bg} ${sentimentStatus.color} border-0`}
              >
                {getFilterDisplayName(dateFilter)}
              </Badge>
            )}
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Sales Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's how your sales conversations are performing.
              {dateFilter !== "all" && (
                <span className="ml-1 font-medium text-blue-600">
                  Filtered for: {getFilterDisplayName(dateFilter)}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Select value={dateFilter} onValueChange={handleFilterChange}>
              <SelectTrigger
                className={`w-[180px] gap-2 transition-all duration-200 ${
                  dateFilter !== "all"
                    ? "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <Filter
                  className={`h-4 w-4 ${
                    dateFilter !== "all" ? "text-blue-600" : ""
                  }`}
                />
                <SelectValue placeholder="Filter Data" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>📅 Date Range</SelectLabel>
                  <SelectItem value="today">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>Today</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="yesterday">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>Yesterday</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="this_week">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>This Week</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="last_15days">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>Last 15 Days</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="this_month">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>This Month</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <span>🌐</span>
                      <span>All Time</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {dateFilter !== "all" && (
              <div className="absolute -top-2 -right-2 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          <Button
            asChild
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/dashboard/upload">
              <Upload className="h-4 w-4" />
              Upload Transcript
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Filter Status Banner */}
      {dateFilter !== "all" && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Filter className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">
                  Filtered View Active
                </h3>
                <p className="text-sm text-blue-700">
                  Showing data for:{" "}
                  <span className="font-medium">
                    {getFilterDisplayName(dateFilter)}
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange("all")}
              className="text-blue-600 hover:bg-blue-100"
            >
              <X className="h-4 w-4 mr-1" />
              Show All Data
            </Button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6">
        {/* Total Transcripts */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-blue-700">
                Total Transcripts
              </CardTitle>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {getFilterDisplayName(dateFilter)}
              </Badge>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {dashboardMetricsLoading ? (
              <SkeletonLoader height="h-8" width="w-16" />
            ) : (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-900">
                  {transcriptsCount?.count || 0}
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>Active conversations</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Average Sentiment */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-green-700">
                Average Sentiment
              </CardTitle>
              <Badge
                className={`text-xs px-2 py-0.5 ${sentimentStatus.bg} ${sentimentStatus.color} border-0`}
              >
                {sentimentStatus.label}
              </Badge>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <sentimentStatus.trend className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {dashboardMetricsLoading ? (
              <SkeletonLoader height="h-8" width="w-20" />
            ) : (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-900">
                  {sentimentScore}%
                </div>
                <Progress value={sentimentScore} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Objections Handled */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-purple-700">
                Objection Success
              </CardTitle>
              <Badge
                className={`text-xs px-2 py-0.5 ${objectionStatus.bg} ${objectionStatus.color} border-0`}
              >
                {objectionRate.toFixed(1)}% Rate
              </Badge>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {dashboardMetricsLoading ? (
              <DoubleLineLoader />
            ) : (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-900">
                  {objections?.successful || 0}/{objections?.total || 0}
                </div>
                <div className="flex items-center gap-1 text-xs text-purple-600">
                  <Zap className="h-3 w-3" />
                  <span>Successfully handled</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Talk Ratio */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100/50 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium text-orange-700">
                Talk Ratio
              </CardTitle>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                You : Client
              </Badge>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <PieChart className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {dashboardMetricsLoading ? (
              <SkeletonLoader height="h-8" width="w-16" />
            ) : (
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-900">
                  {talkRatio?.average || 0}%
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <Users className="h-3 w-3" />
                  <span>From {talkRatio?.callsAnalyzed || 0} calls</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-none lg:flex bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics Overview
          </TabsTrigger>
          <TabsTrigger
            value="transcripts"
            className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <FileText className="h-4 w-4" />
            All Transcripts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-7 gap-6">
            {/* Sentiment Trends Chart */}
            <Card className="xl:col-span-4 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Sentiment Trends
                    </CardTitle>
                    <CardDescription>
                      Emotional tone analysis across your recent sales
                      conversations
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Last 10 Calls
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {trendsLoading ? (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center space-y-2">
                      <BarChart className="h-8 w-8 mx-auto animate-pulse" />
                      <p>Loading sentiment analysis...</p>
                    </div>
                  </div>
                ) : sentimentTrends && sentimentTrends.length > 0 ? (
                  <div className="aspect-[3/2] w-full min-h-[300px] max-h-[400px]">
                    <SentimentChart
                      data={sentimentTrends.map((item) => ({
                        name: item.name,
                        positive: parseFloat(item.positive),
                        neutral: parseFloat(item.neutral),
                        negative: parseFloat(item.negative),
                      }))}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center space-y-3">
                      <Activity className="h-12 w-12 mx-auto text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          No Trend Data Available
                        </h3>
                        <p className="text-sm">
                          Upload more transcripts to see sentiment trends
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Common Objections */}
            <Card className="xl:col-span-3 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                      Common Objections
                    </CardTitle>
                    <CardDescription>
                      Most frequent challenges in your conversations
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Target className="h-3 w-3" />
                    Top Issues
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {commonLoading ? (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center space-y-2">
                      <MessageSquare className="h-8 w-8 mx-auto animate-pulse" />
                      <p>Loading objections data...</p>
                    </div>
                  </div>
                ) : commonObjections ? (
                  <div className="max-h-[400px] overflow-y-auto">
                    <ObjectionsList objections={commonObjections} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center space-y-3">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          No Objections Recorded
                        </h3>
                        <p className="text-sm">
                          Great! Your conversations are flowing smoothly
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Transcripts */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    Recent Transcripts
                  </CardTitle>
                  <CardDescription>
                    Your most recently analyzed sales conversations
                  </CardDescription>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-2 self-start sm:self-center"
                >
                  <Link href="/dashboard/transcripts">
                    View All Transcripts
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {transcriptsLoading ? (
                <div className="flex items-center justify-center py-12 text-gray-500">
                  <div className="text-center space-y-2">
                    <FileText className="h-8 w-8 mx-auto animate-pulse" />
                    <p>Loading recent transcripts...</p>
                  </div>
                </div>
              ) : transcripts &&
                transcripts.data &&
                transcripts.data.length > 0 ? (
                <RecentTranscriptsList data={transcripts.data} />
              ) : (
                <div className="text-center py-12">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        No Transcripts Yet
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Upload your first sales call transcript to start getting
                        powerful insights and analytics.
                      </p>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Link href="/dashboard/upload">
                        <PlusCircle className="h-4 w-4" />
                        Upload First Transcript
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcripts" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  All Transcripts
                </CardTitle>
                <CardDescription>
                  Browse, analyze, and manage all your uploaded sales call
                  transcripts
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {transcriptsLoading ? (
                <div className="flex items-center justify-center py-12 text-gray-500">
                  <div className="text-center space-y-2">
                    <FileText className="h-8 w-8 mx-auto animate-pulse" />
                    <p>Loading all transcripts...</p>
                  </div>
                </div>
              ) : transcripts &&
                transcripts.data &&
                transcripts.data.length > 0 ? (
                <div className="space-y-6">
                  {/* Enhanced Table */}
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-6 font-medium text-gray-700">
                            Name
                          </th>
                          <th className="text-left py-4 px-6 font-medium text-gray-700">
                            Date
                          </th>
                          <th className="text-left py-4 px-6 font-medium text-gray-700">
                            Duration
                          </th>
                          <th className="text-left py-4 px-6 font-medium text-gray-700">
                            Sentiment
                          </th>
                          <th className="text-left py-4 px-6 font-medium text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transcripts.data.map((item, index) => {
                          const sentimentScore = item.analysis
                            ? ((item.analysis.overallSentiment + 1) / 2) * 100
                            : 0;
                          const sentimentStatus =
                            getSentimentStatus(sentimentScore);

                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {item.analysis?.title ||
                                        `Transcript ${index + 1}`}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Sales Call Recording
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  {item.analysis
                                    ? new Date(
                                        item.analysis.date
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })
                                    : "N/A"}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  {item.analysis?.duration || "N/A"}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                {item.analysis ? (
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={`${sentimentStatus.bg} ${sentimentStatus.color} border-0 text-xs`}
                                    >
                                      {sentimentScore.toFixed(1)}%
                                    </Badge>
                                    <sentimentStatus.trend
                                      className={`h-3 w-3 ${sentimentStatus.color}`}
                                    />
                                  </div>
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    Processing
                                  </Badge>
                                )}
                              </td>
                              <td className="py-4 px-6">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(item.content)}
                                  className="gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                                >
                                  <ArrowRight className="h-3 w-3" />
                                  View Analysis
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {transcripts.pagination &&
                    transcripts.pagination.pages > 1 && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Showing {(page - 1) * limit + 1} to{" "}
                          {Math.min(page * limit, transcripts.pagination.total)}{" "}
                          of {transcripts.pagination.total} results
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="gap-1"
                          >
                            Previous
                          </Button>
                          <div className="flex items-center gap-1">
                            {Array.from(
                              {
                                length: Math.min(
                                  5,
                                  transcripts.pagination.pages
                                ),
                              },
                              (_, i) => {
                                const pageNum = i + 1;
                                return (
                                  <Button
                                    key={pageNum}
                                    variant={
                                      page === pageNum ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setPage(pageNum)}
                                    className="w-8 h-8 p-0"
                                  >
                                    {pageNum}
                                  </Button>
                                );
                              }
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={page === transcripts.pagination.pages}
                            onClick={() => setPage(page + 1)}
                            className="gap-1"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl w-fit mx-auto">
                      <FileText className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Ready to Get Started?
                      </h3>
                      <p className="text-gray-500 max-w-lg mx-auto">
                        Upload your first sales call transcript to unlock
                        powerful insights, sentiment analysis, and objection
                        handling metrics.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Link href="/dashboard/upload">
                          <PlusCircle className="h-4 w-4" />
                          Upload Your First Transcript
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
