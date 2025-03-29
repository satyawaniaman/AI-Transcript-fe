"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  Search,
  Building,
  Mail,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetUser } from "@/services/user/query";
import { formatDistance } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TypeScript interfaces for our data
interface Organization {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  industry: string;
  memberCount: number;
  plan: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
  avatar?: string;
}

const OrganizationInfoPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"admin" | "member">("admin");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for organization
  const [organization, setOrganization] = useState<Organization>({
    id: "org-123",
    name: "Acme Corporation",
    description: "A leading provider of innovative solutions",
    createdAt: "2023-06-15T10:00:00Z",
    industry: "Technology",
    memberCount: 24,
    plan: "Enterprise",
  });

  // Mock data for members
  const [members, setMembers] = useState<Member[]>([
    {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@acme.com",
      role: "Admin",
      joinedAt: "2023-06-15T10:00:00Z",
      avatar: "",
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@acme.com",
      role: "Member",
      joinedAt: "2023-07-21T14:30:00Z",
      avatar: "",
    },
    {
      id: "user-3",
      name: "Robert Johnson",
      email: "robert.johnson@acme.com",
      role: "Member",
      joinedAt: "2023-08-05T09:15:00Z",
      avatar: "",
    },
    {
      id: "user-4",
      name: "Emily Davis",
      email: "emily.davis@acme.com",
      role: "Member",
      joinedAt: "2023-09-12T11:45:00Z",
      avatar: "",
    },
  ]);

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

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto pb-10"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Organization</h1>
        <p className="text-gray-600 mt-2">
          Manage your organization settings and members
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <Tabs defaultValue="info" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {userRole === "admin" && (
              <Button
                className="bg-blue-600 hover:bg-blue-700 ml-4"
                onClick={() => router.push("/dashboard/teams/invite")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            )}
          </div>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>
                  View and update your organization information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-base">{organization.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Industry
                      </p>
                      <p className="text-base">{organization.industry}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Created
                      </p>
                      <p className="text-base">
                        {formatDistance(
                          new Date(organization.createdAt),
                          new Date(),
                          { addSuffix: true }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Members
                      </p>
                      <p className="text-base">
                        {organization.memberCount} active members
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Badge variant="outline">{organization.plan} Plan</Badge>
                {userRole === "admin" && (
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Organization Members</CardTitle>
                <CardDescription>
                  Manage the members of your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-4">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <motion.div
                        key={member.id}
                        variants={itemVariants}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge
                            variant={
                              member.role === "Admin" ? "default" : "outline"
                            }
                          >
                            {member.role}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            Joined{" "}
                            {formatDistance(
                              new Date(member.joinedAt),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </p>
                          {userRole === "admin" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No members found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchQuery
                          ? "No members match your search criteria."
                          : "Your organization doesn't have any members yet."}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Badge className="bg-blue-600">
                          {organization.plan}
                        </Badge>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Your current plan
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            You are currently on the {organization.plan} plan
                            with {organization.memberCount} members.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {userRole === "admin" && (
                    <div className="flex justify-end">
                      <Button variant="outline" className="mr-2">
                        Billing History
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Manage Subscription
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default OrganizationInfoPage;
