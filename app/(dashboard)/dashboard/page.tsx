"use client";
import React from "react";
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
import {
  BarChart,
  ChevronDown,
  Download,
  FileText,
  ListFilter,
  MessageSquare,
  PieChart,
  PlusCircle,
  Upload,
} from "lucide-react";
import SentimentChart from "@/components/SentimentChart";
import ObjectionsList from "@/components/ObjectionsList";
import RecentTranscriptsList from "@/components/RecentTranscriptsList";
import { Toaster, toast } from "react-hot-toast";
import { useGetUser } from "@/services/user/query";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import NoOrganizationScreen from "@/components/NoOrganizationScreen";

const Dashboard = () => {
  const { data: user, isLoading } = useGetUser();

  if (isLoading || !user) {
    return <DashboardSkeleton />;
  }

  if (user.organizations.length === 0) {
    return <NoOrganizationScreen />;
  }

  return (
    <>
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here&apos;s an overview of your sales performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              toast.success("Your dashboard data has been filtered.");
            }}
          >
            <ListFilter className="h-4 w-4" />
            Filter
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              toast.success("Your dashboard report has been downloaded.");
            }}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href="/dashboard/upload">
              <Upload className="h-4 w-4" />
              Upload Transcript
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Transcripts
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">24</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Sentiment
            </CardTitle>
            <BarChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">75%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Objections Handled
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">47</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Talk Ratio
            </CardTitle>
            <PieChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">42:58</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              Better than target (50:50)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {/* Main Chart */}
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Sentiment Trends</CardTitle>
                <CardDescription>
                  Your call sentiment over the last 10 sales calls
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                {" "}
                {/* Adjusted padding for better display */}
                <SentimentChart
                  data={[
                    { name: "Call 1", positive: 65, neutral: 30, negative: 5 },
                    { name: "Call 2", positive: 70, neutral: 25, negative: 5 },
                    { name: "Call 3", positive: 60, neutral: 30, negative: 10 },
                    { name: "Call 4", positive: 75, neutral: 20, negative: 5 },
                    { name: "Call 5", positive: 68, neutral: 27, negative: 5 },
                    { name: "Call 6", positive: 72, neutral: 25, negative: 3 },
                    { name: "Call 7", positive: 78, neutral: 20, negative: 2 },
                    { name: "Call 8", positive: 80, neutral: 18, negative: 2 },
                    { name: "Call 9", positive: 75, neutral: 22, negative: 3 },
                    { name: "Call 10", positive: 82, neutral: 15, negative: 3 },
                  ]}
                />
              </CardContent>
            </Card>

            {/* Objections List */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Common Objections</CardTitle>
                <CardDescription>
                  Objections you encountered most frequently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ObjectionsList />
              </CardContent>
            </Card>
          </div>

          {/* Recent Transcripts */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Transcripts</CardTitle>
                  <CardDescription>
                    Your most recently analyzed sales calls
                  </CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/transcripts">View all</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <RecentTranscriptsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcripts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transcripts</CardTitle>
              <CardDescription>
                Browse and analyze all your uploaded sales call transcripts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                This section will display a filterable, sortable table of all
                your transcripts.
              </p>
              <div className="flex justify-center">
                <Button asChild>
                  <Link href="/upload">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Upload New Transcript
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Objection Library</CardTitle>
              <CardDescription>
                A catalog of all objections encountered and how you handled them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                This section will display a comprehensive library of objections
                categorized by type, along with effectiveness ratings for your
                responses.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>
                Personalized coaching recommendations based on your sales calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                This section will provide AI-generated insights and coaching
                advice based on patterns observed across your sales calls.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
