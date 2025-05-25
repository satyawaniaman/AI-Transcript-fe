"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  MessageSquare,
  Search,
  ShieldCheck,
  Briefcase,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Filter,
  Calendar,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Eye,
  Plus,
  RefreshCw,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import useOrganization from "@/store/useCurrentOrg";
import {
  useGetCategoryCounts,
  useGetObjections,
} from "@/services/objections/query";
import { ObjectionCategory } from "@/services/objections/api";

const categoryConfig: Partial<
  Record<
    ObjectionCategory,
    {
      icon: React.ComponentType<any>;
      label: string;
      color: string;
      bgColor: string;
      borderColor: string;
      iconBg: string;
      gradient: string;
    }
  >
> = {
  PRICE: {
    icon: DollarSign,
    label: "Price",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconBg: "bg-red-100",
    gradient: "from-red-50 to-red-100/50",
  },
  TIMING: {
    icon: Clock,
    label: "Timing",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconBg: "bg-orange-100",
    gradient: "from-orange-50 to-orange-100/50",
  },
  TRUST_RISK: {
    icon: ShieldCheck,
    label: "Trust/Risk",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-100",
    gradient: "from-blue-50 to-blue-100/50",
  },
  COMPETITION: {
    icon: Briefcase,
    label: "Competition",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconBg: "bg-purple-100",
    gradient: "from-purple-50 to-purple-100/50",
  },
  STAKEHOLDERS: {
    icon: Users,
    label: "Stakeholders",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconBg: "bg-green-100",
    gradient: "from-green-50 to-green-100/50",
  },
  TECHNICAL: {
    icon: Settings,
    label: "Technical",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    iconBg: "bg-indigo-100",
    gradient: "from-indigo-50 to-indigo-100/50",
  },
  OTHERS: {
    icon: MessageSquare,
    label: "Other",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    iconBg: "bg-gray-100",
    gradient: "from-gray-50 to-gray-100/50",
  },
};

// Default category config for fallback
const defaultCategoryConfig = {
  icon: MessageSquare,
  label: "Other",
  color: "text-gray-600",
  bgColor: "bg-gray-50",
  borderColor: "border-gray-200",
  iconBg: "bg-gray-100",
  gradient: "from-gray-50 to-gray-100/50",
};

// effectiveness badge component
const EffectivenessBadge = ({ effectiveness }: { effectiveness: number }) => {
  const percentage = Math.round(effectiveness * 100);

  if (percentage >= 80) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 gap-1">
        <CheckCircle className="h-3 w-3" />
        {percentage}% Effective
      </Badge>
    );
  } else if (percentage >= 60) {
    return (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 gap-1">
        <AlertTriangle className="h-3 w-3" />
        {percentage}% Moderate
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200 gap-1">
        <XCircle className="h-3 w-3" />
        {percentage}% Needs Work
      </Badge>
    );
  }
};

// objection card component
const ObjectionCard = ({
  objection,
  index,
}: {
  objection: any;
  index: number;
}) => {
  const config =
    categoryConfig[objection.type as ObjectionCategory] ||
    defaultCategoryConfig;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`border-0 shadow-md rounded-lg p-6 bg-gradient-to-br ${config.gradient} hover:shadow-lg transition-all duration-200`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`${config.iconBg} h-12 w-12 rounded-xl flex items-center justify-center shrink-0`}
        >
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                {objection.text}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {config.label}
                </Badge>
                <EffectivenessBadge effectiveness={objection.effectiveness} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Your Response:
              </h4>
              <p className="text-sm text-gray-600 bg-white/50 rounded-lg p-3 leading-relaxed">
                {objection.response}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/50">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                {new Date(objection.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Target className="h-3 w-3" />
                {objection.transcript || "Sales Call"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ObjectionsPage: React.FC = () => {
  const { toast } = useToast();
  const { currentOrg } = useOrganization();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | ObjectionCategory>("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset pagination when search or tab changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeTab]);

  // Fetch category counts
  const {
    data: categoryCounts = {
      price: 0,
      timing: 0,
      trust: 0,
      competition: 0,
      stakeholders: 0,
      other: 0,
    },
    isLoading: isLoadingCounts,
    error: countError,
    refetch: refetchCounts,
  } = useGetCategoryCounts(currentOrg?.id || "");

  // Fetch objections
  const {
    data: objectionsResponse,
    isLoading: isLoadingObjections,
    error: objectionsError,
    refetch: refetchObjections,
  } = useGetObjections(
    currentOrg?.id || "",
    page,
    limit,
    debouncedSearch,
    activeTab,
    !!currentOrg?.id
  );

  // Extract objections
  const objections = objectionsResponse?.data || [];
  const totalPages = objectionsResponse?.pagination.pages || 1;
  const totalObjections = objectionsResponse?.pagination.total || 0;

  // Calculate total objections for stats
  const totalCategoryCounts = Object.values(categoryCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // Get category count with proper mapping
  const getCategoryCount = (category: ObjectionCategory): number => {
    switch (category) {
      case "TRUST_RISK":
        return categoryCounts.trust || 0;
      case "OTHERS":
        return categoryCounts.other || 0;
      case "TECHNICAL":
        return 0; // Technical not in API response, default to 0
      default:
        const key = category.toLowerCase() as keyof typeof categoryCounts;
        return categoryCounts[key] || 0;
    }
  };

  // Handle errors
  useEffect(() => {
    if (countError) {
      toast({
        title: "Error Loading Categories",
        description: "Failed to load objection categories. Please try again.",
        variant: "destructive",
      });
    }

    if (objectionsError) {
      toast({
        title: "Error Loading Objections",
        description: "Failed to load objections. Please try again.",
        variant: "destructive",
      });
    }
  }, [countError, objectionsError, toast]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "all" | ObjectionCategory);
  };

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleRefresh = async () => {
    try {
      // Show loading toast
      toast({
        title: "Refreshing Data...",
        description: "Updating objection data from server.",
      });

      // Refetch all data concurrently
      await Promise.all([refetchCounts(), refetchObjections()]);

      // Success feedback
      toast({
        title: "Data Refreshed ✅",
        description: "Objection data has been updated successfully.",
      });
    } catch (error) {
      // Error feedback
      toast({
        title: "Refresh Failed ❌",
        description: "Unable to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!currentOrg?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6 text-center">
            <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <div className="text-orange-700 font-medium mb-2">
              No Organization Selected
            </div>
            <p className="text-orange-600 text-sm">
              Please select an organization to view objections.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 max-w-7xl space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-xs font-medium gap-1">
              <Target className="h-3 w-3" />
              Objection Analytics
            </Badge>
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Objection Library
            </h1>
            <p className="text-gray-600 mt-2">
              Track, analyze, and improve your objection handling strategies
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="gap-2"
            disabled={isLoadingCounts || isLoadingObjections}
          >
            <RefreshCw
              className={`h-4 w-4 ${
                isLoadingCounts || isLoadingObjections ? "animate-spin" : ""
              }`}
            />
            {isLoadingCounts || isLoadingObjections
              ? "Refreshing..."
              : "Refresh Data"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Total Objections
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {isLoadingCounts ? "..." : totalCategoryCounts}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">
                  Most Common
                </p>
                <p className="text-xl font-bold text-green-900">
                  {isLoadingCounts
                    ? "..."
                    : Object.entries(categoryCounts)
                        .reduce((a, b) =>
                          categoryCounts[a[0] as keyof typeof categoryCounts] >
                          categoryCounts[b[0] as keyof typeof categoryCounts]
                            ? a
                            : b
                        )[0]
                        .toUpperCase()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">
                  Avg. Effectiveness
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {isLoadingObjections
                    ? "..."
                    : objections.length > 0
                    ? `${Math.round(
                        (objections.reduce(
                          (sum, obj) => sum + obj.effectiveness,
                          0
                        ) /
                          objections.length) *
                          100
                      )}%`
                    : "0%"}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">
                  This Month
                </p>
                <p className="text-3xl font-bold text-orange-900">
                  {isLoadingObjections ? "..." : totalObjections}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(categoryConfig).map(([category, config]) => {
          const Icon = config.icon;
          const count = getCategoryCount(category as ObjectionCategory);
          const maxCount = Math.max(...Object.values(categoryCounts));

          return (
            <Card
              key={category}
              className={`border-0 shadow-md bg-gradient-to-br ${config.gradient} hover:shadow-lg transition-all duration-200 cursor-pointer`}
              onClick={() => handleTabChange(category)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="space-y-1">
                  <CardTitle className={`text-sm font-medium ${config.color}`}>
                    {config.label}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    Category
                  </Badge>
                </div>
                <div
                  className={`${config.iconBg} h-10 w-10 rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div
                    className={`text-3xl font-bold ${config.color.replace(
                      "600",
                      "900"
                    )}`}
                  >
                    {isLoadingCounts ? "..." : count}
                  </div>
                  <Progress
                    value={maxCount > 0 ? (count / maxCount) * 100 : 0}
                    className="h-2"
                  />
                  <div
                    className={`text-xs ${config.color} flex items-center gap-1`}
                  >
                    <ArrowRight className="h-3 w-3" />
                    <span>Click to filter</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search objections by text or response..."
                className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              variant="outline"
              className="gap-2 h-12 px-6"
              onClick={() => {
                toast({
                  title: "Advanced Search",
                  description: "Advanced search filters coming soon!",
                });
              }}
            >
              <Filter className="h-4 w-4" />
              Advanced Search
            </Button>
          </div>

          {searchTerm && (
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Search className="h-3 w-3" />
                Searching: "{searchTerm}"
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="text-xs"
              >
                Clear
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Objections List */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-600" />
                Objection Library
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {isLoadingObjections
                  ? "Loading objections..."
                  : `${objections.length} objections ${
                      searchTerm || activeTab !== "all"
                        ? "filtered"
                        : "available"
                    } (${totalObjections} total)`}
              </p>
            </div>
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="bg-gray-100">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="PRICE"
                  className="data-[state=active]:bg-white"
                >
                  Price
                </TabsTrigger>
                <TabsTrigger
                  value="TIMING"
                  className="data-[state=active]:bg-white"
                >
                  Timing
                </TabsTrigger>
                <TabsTrigger
                  value="TRUST_RISK"
                  className="data-[state=active]:bg-white"
                >
                  Trust
                </TabsTrigger>
                <TabsTrigger
                  value="COMPETITION"
                  className="data-[state=active]:bg-white"
                >
                  Competition
                </TabsTrigger>
                <TabsTrigger
                  value="TECHNICAL"
                  className="data-[state=active]:bg-white"
                >
                  Technical
                </TabsTrigger>
                <TabsTrigger
                  value="STAKEHOLDERS"
                  className="data-[state=active]:bg-white"
                >
                  Stakeholders
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingObjections ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-orange-500 mx-auto" />
                <p className="text-gray-600">Loading objections...</p>
              </div>
            </div>
          ) : objections.length > 0 ? (
            <>
              <div className="space-y-4">
                {objections.map((objection, index) => (
                  <ObjectionCard
                    key={objection.id}
                    objection={objection}
                    index={index}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {(page - 1) * limit + 1} to{" "}
                    {Math.min(page * limit, totalObjections)} of{" "}
                    {totalObjections} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className="gap-1"
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <Button
                              key={pageNum}
                              variant={page === pageNum ? "default" : "outline"}
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
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      className="gap-1"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                <MessageSquare className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || activeTab !== "all"
                  ? "No matching objections"
                  : "No objections found"}
              </h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                {searchTerm || activeTab !== "all"
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "Objections will appear here as you upload and analyze more sales call transcripts."}
              </p>
              {(searchTerm || activeTab !== "all") && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveTab("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ObjectionsPage;
