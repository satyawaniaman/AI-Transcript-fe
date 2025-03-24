"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  Users,
  UserPlus,
  Phone,
  FileText,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
}

interface Team {
  id: string;
  name: string;
  memberCount: number;
  createdAt: string;
  lastActive: string;
  description?: string;
}

// Define type for TeamMembers object
interface TeamMembersMap {
  [key: string]: TeamMember[];
}

// Mock data for demonstration
const MOCK_TEAMS: { [key: string]: Team } = {
  "team-1": {
    id: "team-1",
    name: "Enterprise Sales",
    memberCount: 7,
    createdAt: "2024-10-15",
    lastActive: "2025-03-20",
    description: "Team focused on enterprise clients with 500+ employees",
  },
  "team-2": {
    id: "team-2",
    name: "SMB Team",
    memberCount: 5,
    createdAt: "2024-09-01",
    lastActive: "2025-03-19",
    description: "Small and medium business sales team",
  },
  "team-3": {
    id: "team-3",
    name: "Mid-Market Team",
    memberCount: 6,
    createdAt: "2024-11-12",
    lastActive: "2025-03-15",
    description: "Team handling mid-sized organizations",
  },
};

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
    },
  ],
};

const TeamDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const teamId = params.teamId as string;

  // In a real app, this would come from authentication context
  const [userRole, setUserRole] = useState<"sales-manager" | "sales-rep">(
    "sales-manager"
  );
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      if (MOCK_TEAMS[teamId]) {
        setTeam(MOCK_TEAMS[teamId]);
        setMembers(MOCK_TEAM_MEMBERS[teamId] || []);
        setError(null);
      } else {
        setError("Team not found");
      }
      setLoading(false);
    }, 500);
  }, [teamId]);

  const handleInviteMember = () => {
    router.push(`/dashboard/teams/invite?teamId=${teamId}`);
  };

  const handleNavigateToMember = (memberId: string) => {
    router.push(`/dashboard/user/${memberId}?teamId=${teamId}`);
  };

  const handleBack = () => {
    router.push("/dashboard/teams");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>Loading team details...</p>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="container mx-auto p-8">
        <Button
          variant="ghost"
          className="mb-4 pl-0 flex items-center text-gray-600"
          onClick={handleBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Teams
        </Button>
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-900">Error: {error}</h3>
          <p className="mt-2 text-gray-600">
            We couldn't find the team you're looking for.
          </p>
          <Button onClick={handleBack} className="mt-4">
            Return to Teams
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
          Back to Teams
        </Button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
            {team.description && (
              <p className="text-gray-600 mt-1">{team.description}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
              <span>Created: {team.createdAt}</span>
              <span>•</span>
              <span>Last active: {team.lastActive}</span>
              <span>•</span>
              <span>{team.memberCount} members</span>
            </div>
          </div>

          {userRole === "sales-manager" && (
            <div className="flex space-x-2">
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
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
        </div>

        {members.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {members.map((member) => (
              <Card
                key={member.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => handleNavigateToMember(member.id)}
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
                      <p className="font-medium text-gray-900">{member.name}</p>
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

export default TeamDetailPage;
