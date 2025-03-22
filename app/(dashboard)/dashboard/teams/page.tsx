"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  PlusCircle,
  Phone,
  FileText,
  AlertCircle,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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

// TypeScript interfaces for our data
interface TeamMember {
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
}

interface Team {
  id: string;
  name: string;
  memberCount: number;
  createdAt: string;
  lastActive: string;
}

// Define type for TeamMembers object
interface TeamMembersMap {
  [key: string]: TeamMember[];
}

// Mock data for demonstration
const MOCK_TEAMS: Team[] = [
  {
    id: "team-1",
    name: "Enterprise Sales",
    memberCount: 7,
    createdAt: "2024-10-15",
    lastActive: "2025-03-20",
  },
  {
    id: "team-2",
    name: "SMB Team",
    memberCount: 5,
    createdAt: "2024-09-01",
    lastActive: "2025-03-19",
  },
  {
    id: "team-3",
    name: "Mid-Market Team",
    memberCount: 6,
    createdAt: "2024-11-12",
    lastActive: "2025-03-15",
  },
];

const MOCK_TEAM_MEMBERS: TeamMembersMap = {
  "team-1": [
    {
      id: "user-1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Sales Rep",
      avatarUrl: "/placeholder.svg",
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
    {
      id: "user-2",
      name: "Sarah Miller",
      email: "sarah@example.com",
      role: "Sales Rep",
      avatarUrl: "/placeholder.svg",
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
  ],
  "team-2": [
    {
      id: "user-3",
      name: "David Lee",
      email: "david@example.com",
      role: "Sales Rep",
      avatarUrl: "/placeholder.svg",
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
  ],
  "team-3": [
    {
      id: "user-4",
      name: "Emily Chen",
      email: "emily@example.com",
      role: "Sales Rep",
      avatarUrl: "/placeholder.svg",
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
  ],
};

const TeamPage = () => {
  const router = useRouter();
  // In a real app, this would come from authentication context
  const [userRole, setUserRole] = useState<"sales-manager" | "sales-rep">(
    "sales-manager"
  );
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Filter teams based on search query
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: `team-${teams.length + 1}`,
        name: newTeamName,
        memberCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
      };
      setTeams([...teams, newTeam]);
      setNewTeamName("");
      setShowNewTeamDialog(false);
    }
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setSelectedMember(null);
  };

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleBackToTeam = () => {
    setSelectedMember(null);
  };

  const handleInviteMember = () => {
    if (selectedTeam) {
      router.push(`/dashboard/teams/invite?teamId=${selectedTeam.id}`);
    }
  };

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

  // Render the team list view
  const renderTeamsList = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Teams</h2>
        {userRole === "sales-manager" && (
          <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Team</DialogTitle>
                <DialogDescription>
                  Enter a name for your new sales team.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Team Name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="mb-4"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowNewTeamDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTeam}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Team
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <motion.div key={team.id} variants={itemVariants}>
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleSelectTeam(team)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>{team.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {team.memberCount} members
                  </Badge>
                </CardTitle>
                <CardDescription>Created on {team.createdAt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Last active: {team.lastActive}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-10">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No teams found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? "No teams match your search criteria."
              : "You don't have any teams yet."}
          </p>
          {userRole === "sales-manager" && !searchQuery && (
            <div className="mt-6">
              <Button
                onClick={() => setShowNewTeamDialog(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create your first team
              </Button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );

  // Render the team details view with members
  const renderTeamDetails = () => {
    if (!selectedTeam) return null;

    const teamMembers = MOCK_TEAM_MEMBERS[selectedTeam.id] || [];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-2 p-0 h-8 w-8"
            onClick={() => setSelectedTeam(null)}
          >
            <ChevronRight className="h-4 w-4 transform rotate-180" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedTeam.name}
          </h2>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Team members:{" "}
              <span className="font-medium">{selectedTeam.memberCount}</span>
            </p>
          </div>
          {userRole === "sales-manager" && (
            <Button
              onClick={handleInviteMember}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => handleSelectMember(member)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{member.metrics.calls}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{member.metrics.objections}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{member.metrics.transcripts}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No team members yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by inviting sales representatives to your team.
              </p>
              {userRole === "sales-manager" && (
                <div className="mt-6">
                  <Button
                    onClick={handleInviteMember}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Render the member performance view
  const renderMemberPerformance = () => {
    if (!selectedMember) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-2 p-0 h-8 w-8"
            onClick={handleBackToTeam}
          >
            <ChevronRight className="h-4 w-4 transform rotate-180" />
          </Button>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={selectedMember.avatarUrl}
                alt={selectedMember.name}
              />
              <AvatarFallback>
                {selectedMember.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedMember.name}
              </h2>
              <p className="text-sm text-gray-500">{selectedMember.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Calls Made</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-3xl font-bold">
                  {selectedMember.metrics.calls}
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
                  {selectedMember.metrics.objections}
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
                  {selectedMember.metrics.closingRate}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={selectedMember.performanceData}
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Transcripts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">
                        Call Transcript #{index + 1}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          Date.now() - index * 86400000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Determine which view to render
  const renderContent = () => {
    if (selectedMember) {
      return renderMemberPerformance();
    } else if (selectedTeam) {
      return renderTeamDetails();
    } else {
      return renderTeamsList();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
        <p className="text-gray-600 mt-2">
          {userRole === "sales-manager"
            ? "Create and manage your sales teams, and track performance metrics."
            : "View your sales teams and performance metrics."}
        </p>
      </div>

      {renderContent()}
    </motion.div>
  );
};

export default TeamPage;
