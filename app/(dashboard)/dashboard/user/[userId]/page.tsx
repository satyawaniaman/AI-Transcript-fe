"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Phone,
  AlertCircle,
  FileText,
  Calendar,
  Clock,
  BarChart4,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TypeScript interfaces for our data
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  metrics: {
    calls: number;
    objections: number;
    closingRate: number;
    transcripts: number;
  };
  performanceData: {
    date: string;
    calls: number;
    objections: number;
    closingRate: number;
  }[];
  bio?: string;
  joinDate?: string;
}

interface Team {
  id: string;
  name: string;
}

interface Transcript {
  id: string;
  title: string;
  date: string;
  length: string;
  objections: number;
}

// Mock data
const MOCK_USERS: { [key: string]: UserData } = {
  "user-1": {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Sales Rep",
    avatarUrl: "/placeholder.svg",
    bio: "Experienced sales representative with 5+ years in B2B software sales.",
    joinDate: "2023-05-15",
    metrics: {
      calls: 48,
      objections: 32,
      closingRate: 67,
      transcripts: 15,
    },
    performanceData: [
      { date: "2025-01", calls: 42, objections: 28, closingRate: 65 },
      { date: "2025-02", calls: 45, objections: 30, closingRate: 66 },
      { date: "2025-03", calls: 48, objections: 32, closingRate: 67 },
    ],
  },
  "user-2": {
    id: "user-2",
    name: "Sarah Miller",
    email: "sarah@example.com",
    role: "Sales Rep",
    avatarUrl: "/placeholder.svg",
    bio: "Top performing sales representative specializing in enterprise clients.",
    joinDate: "2023-07-10",
    metrics: {
      calls: 52,
      objections: 38,
      closingRate: 73,
      transcripts: 18,
    },
    performanceData: [
      { date: "2025-01", calls: 45, objections: 30, closingRate: 67 },
      { date: "2025-02", calls: 50, objections: 35, closingRate: 70 },
      { date: "2025-03", calls: 52, objections: 38, closingRate: 73 },
    ],
  },
  "user-3": {
    id: "user-3",
    name: "David Lee",
    email: "david@example.com",
    role: "Sales Rep",
    avatarUrl: "/placeholder.svg",
    bio: "SMB sales specialist with strong relationship building skills.",
    joinDate: "2023-09-20",
    metrics: {
      calls: 38,
      objections: 25,
      closingRate: 62,
      transcripts: 12,
    },
    performanceData: [
      { date: "2025-01", calls: 35, objections: 22, closingRate: 58 },
      { date: "2025-02", calls: 36, objections: 24, closingRate: 60 },
      { date: "2025-03", calls: 38, objections: 25, closingRate: 62 },
    ],
  },
  "user-4": {
    id: "user-4",
    name: "Emily Chen",
    email: "emily@example.com",
    role: "Sales Rep",
    avatarUrl: "/placeholder.svg",
    bio: "Mid-market sales representative focusing on healthcare and education sectors.",
    joinDate: "2024-01-08",
    metrics: {
      calls: 45,
      objections: 30,
      closingRate: 68,
      transcripts: 14,
    },
    performanceData: [
      { date: "2025-01", calls: 40, objections: 26, closingRate: 65 },
      { date: "2025-02", calls: 43, objections: 28, closingRate: 67 },
      { date: "2025-03", calls: 45, objections: 30, closingRate: 68 },
    ],
  },
};

const MOCK_TEAMS: { [key: string]: Team } = {
  "team-1": { id: "team-1", name: "Enterprise Sales" },
  "team-2": { id: "team-2", name: "SMB Team" },
  "team-3": { id: "team-3", name: "Mid-Market Team" },
};

// Mock transcripts
const MOCK_TRANSCRIPTS: { [key: string]: Transcript[] } = {
  "user-1": [
    {
      id: "tr-1",
      title: "Enterprise Client Call",
      date: "2025-03-15",
      length: "32 min",
      objections: 4,
    },
    {
      id: "tr-2",
      title: "Product Demo - Acme Corp",
      date: "2025-03-10",
      length: "45 min",
      objections: 6,
    },
    {
      id: "tr-3",
      title: "Sales Follow-up",
      date: "2025-03-05",
      length: "18 min",
      objections: 2,
    },
    {
      id: "tr-4",
      title: "Initial Consultation",
      date: "2025-02-28",
      length: "24 min",
      objections: 3,
    },
  ],
  "user-2": [
    {
      id: "tr-5",
      title: "Enterprise Pitch",
      date: "2025-03-18",
      length: "41 min",
      objections: 5,
    },
    {
      id: "tr-6",
      title: "Contract Negotiation",
      date: "2025-03-12",
      length: "36 min",
      objections: 7,
    },
    {
      id: "tr-7",
      title: "Product Walkthrough",
      date: "2025-03-07",
      length: "28 min",
      objections: 3,
    },
  ],
  "user-3": [
    {
      id: "tr-8",
      title: "SMB Client Onboarding",
      date: "2025-03-14",
      length: "22 min",
      objections: 2,
    },
    {
      id: "tr-9",
      title: "Feature Overview",
      date: "2025-03-09",
      length: "18 min",
      objections: 1,
    },
  ],
  "user-4": [
    {
      id: "tr-10",
      title: "Healthcare Client Demo",
      date: "2025-03-17",
      length: "38 min",
      objections: 4,
    },
    {
      id: "tr-11",
      title: "Education Sector Pitch",
      date: "2025-03-11",
      length: "26 min",
      objections: 3,
    },
    {
      id: "tr-12",
      title: "Mid-market Strategy Call",
      date: "2025-03-03",
      length: "31 min",
      objections: 5,
    },
  ],
};

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const userId = params.userId as string;
  const teamId = searchParams.get("teamId");

  const [user, setUser] = useState<UserData | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      if (MOCK_USERS[userId]) {
        setUser(MOCK_USERS[userId]);
        setTranscripts(MOCK_TRANSCRIPTS[userId] || []);

        if (teamId && MOCK_TEAMS[teamId]) {
          setTeam(MOCK_TEAMS[teamId]);
        }

        setError(null);
      } else {
        setError("User not found");
      }
      setLoading(false);
    }, 500);
  }, [userId, teamId]);

  const handleBack = () => {
    if (teamId) {
      router.push(`/dashboard/teams/${teamId}`);
    } else {
      router.push("/dashboard/teams");
    }
  };

  const handleViewTranscript = (transcriptId: string) => {
    // In a real app, this would navigate to the transcript detail page
    console.log(`View transcript: ${transcriptId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto p-8">
        <Button
          variant="ghost"
          className="mb-4 pl-0 flex items-center text-gray-600"
          onClick={handleBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-900">Error: {error}</h3>
          <p className="mt-2 text-gray-600">
            We couldnt find the user youre looking for.
          </p>
          <Button onClick={handleBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto"
    >
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 pl-0 flex items-center text-gray-600"
          onClick={handleBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {team ? `Back to ${team.name}` : "Back"}
        </Button>

        <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-gray-600">{user.email}</p>
                <span className="text-gray-400">•</span>
                <Badge variant="outline">{user.role}</Badge>
                {team && (
                  <>
                    <span className="text-gray-400">•</span>
                    <Badge variant="secondary">{team.name}</Badge>
                  </>
                )}
              </div>
              {user.joinDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Joined {new Date(user.joinDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {user.bio && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <p className="text-gray-600">{user.bio}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Calls Made</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-3xl font-bold">
                    {user.metrics.calls}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Objections Handled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-3xl font-bold">
                    {user.metrics.objections}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Closing Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Badge className="h-5 bg-green-100 text-green-800 mr-2">
                    %
                  </Badge>
                  <span className="text-3xl font-bold">
                    {user.metrics.closingRate}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>
                Monthly tracking of key performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={user.performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="#3b82f6"
                    name="Calls"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="objections"
                    stroke="#f59e0b"
                    name="Objections"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="closingRate"
                    stroke="#10b981"
                    name="Closing Rate %"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transcripts.slice(0, 3).map((transcript) => (
                    <div key={transcript.id} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                        <Phone className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{transcript.title}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="mr-2">{transcript.date}</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{transcript.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <Star className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Above Average Closing Rate</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {user.metrics.closingRate}% compared to team average of
                        65%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                      <BarChart4 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Consistent Improvement</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Monthly call volume has increased by 14% over the last
                        quarter.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-1">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Objection Handling</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Successfully addresses an average of{" "}
                        {transcripts.length > 0
                          ? (
                              user.metrics.objections / transcripts.length
                            ).toFixed(1)
                          : "0"}{" "}
                        objections per call.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Detailed breakdown of performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Call Volume</h3>
                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(user.metrics.calls / 60) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0</span>
                    <span>{user.metrics.calls} calls</span>
                    <span>60</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Objection Handling
                  </h3>
                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${(user.metrics.objections / 40) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0</span>
                    <span>{user.metrics.objections} objections</span>
                    <span>40</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Closing Rate</h3>
                  <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${user.metrics.closingRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{user.metrics.closingRate}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={user.performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="#3b82f6"
                    name="Calls"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="objections"
                    stroke="#f59e0b"
                    name="Objections"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="closingRate"
                    stroke="#10b981"
                    name="Closing Rate %"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcripts" className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Call Transcripts
          </h2>
          {transcripts.length > 0 ? (
            <div className="space-y-4">
              {transcripts.map((transcript) => (
                <Card key={transcript.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{transcript.title}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>{transcript.date}</span>
                          <span className="mx-2">•</span>
                          <span>{transcript.length}</span>
                          <span className="mx-2">•</span>
                          <span>{transcript.objections} objections</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTranscript(transcript.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No transcripts available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default UserDetailPage;
