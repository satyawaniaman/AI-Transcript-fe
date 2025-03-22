"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  UserPlus,
  X,
  Check,
  Info,
  Copy,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// TypeScript interfaces
interface Team {
  id: string;
  name: string;
}

interface TeamMap {
  [key: string]: Team;
}

interface FormErrors {
  email?: string;
  emailList?: string;
  [key: string]: string | undefined;
}

// Mock data for demonstration
const MOCK_TEAMS: TeamMap = {
  "team-1": {
    id: "team-1",
    name: "Enterprise Sales",
  },
  "team-2": {
    id: "team-2",
    name: "SMB Team",
  },
  "team-3": {
    id: "team-3",
    name: "Mid-Market Team",
  },
};

const InviteTeamMemberPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");

  const [activeTab, setActiveTab] = useState("email");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [emails, setEmails] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [sendCopy, setSendCopy] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Team access permission states
  const [teamPerformanceAccess, setTeamPerformanceAccess] = useState(true);
  const [membersDataAccess, setMembersDataAccess] = useState(false);
  const [transcriptAccess, setTranscriptAccess] = useState(true);

  // Load team data based on teamId from URL
  useEffect(() => {
    if (teamId && MOCK_TEAMS[teamId]) {
      setSelectedTeam(MOCK_TEAMS[teamId]);

      // Generate a mock invite link
      const baseUrl = window.location.origin;
      setInviteLink(`${baseUrl}/join-team/${teamId}/${generateInviteCode()}`);
    }
  }, [teamId]);

  // Generate a random invitation code
  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  // Add email to the list
  const addEmail = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (currentEmail && emailRegex.test(currentEmail)) {
      if (!emailList.includes(currentEmail)) {
        setEmailList([...emailList, currentEmail]);
        setCurrentEmail("");
        setFormErrors({ ...formErrors, email: undefined });
      }
    } else {
      setFormErrors({
        ...formErrors,
        email: "Please enter a valid email address",
      });
    }
  };

  // Remove email from the list
  const removeEmail = (email: string) => {
    setEmailList(emailList.filter((e) => e !== email));
  };

  // Handle form submission for email invites
  const handleEmailInvite = () => {
    if (emailList.length === 0) {
      setFormErrors({
        ...formErrors,
        emailList: "Please add at least one email address",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you would handle success/error states based on API response

      // Show success message
      toast({
        title: "Invitations Sent",
        description: `Invitations sent to ${emailList.length} recipient(s).`,
        variant: "default",
      });

      // Navigate back to team page
      router.push("/dashboard/teams");
    }, 1500);
  };

  // Handle copy invite link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);

    toast({
      title: "Link Copied",
      description: "Invitation link copied to clipboard",
      variant: "default",
    });
  };

  // Handle parsed emails from textarea
  const handleEmailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmails(e.target.value);

    // Parse emails
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
    const parsed = e.target.value.match(emailRegex) || [];
    const uniqueEmails = [...new Set(parsed)];

    setEmailList(uniqueEmails);
  };

  // Handle back button click
  const handleBack = () => {
    router.push("/dashboard/teams");
  };

  // Check if the selected team is valid
  if (teamId && !selectedTeam) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The specified team could not be found.
            <Button
              variant="link"
              onClick={handleBack}
              className="p-0 h-auto font-normal"
            >
              Return to Teams
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 pl-0 flex items-center text-gray-600"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Teams
        </Button>

        <h1 className="text-3xl font-bold text-gray-900">
          Invite Team Members
        </h1>
        {selectedTeam && (
          <div className="flex items-center mt-2">
            <p className="text-gray-600">Team:</p>
            <Badge variant="outline" className="ml-2">
              {selectedTeam.name}
            </Badge>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add People to Your Team</CardTitle>
          <CardDescription>
            Invite sales representatives to join your team and track their
            performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="email"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="email">Email Invitation</TabsTrigger>
              <TabsTrigger value="link">Invitation Link</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email-input">Email Addresses</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email-input"
                      placeholder="Enter email address"
                      type="email"
                      value={currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addEmail())
                      }
                    />
                    <Button onClick={addEmail}>Add</Button>
                  </div>

                  {formErrors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.email}
                    </p>
                  )}

                  {emailList.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
                        {emailList.map((email) => (
                          <Badge
                            key={email}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {email}
                            <button
                              onClick={() => removeEmail(email)}
                              className="rounded-full hover:bg-gray-200 p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {formErrors.emailList && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.emailList}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulk-emails">Or paste multiple emails</Label>
                  <Textarea
                    id="bulk-emails"
                    placeholder="Paste multiple email addresses (separated by commas, spaces, or new lines)"
                    value={emails}
                    onChange={handleEmailsChange}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500">
                    Emails will be automatically extracted from the text
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-message">
                    Personalized Message (Optional)
                  </Label>
                  <Textarea
                    id="custom-message"
                    placeholder="Add a personal message to your invitation"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="send-copy"
                    checked={sendCopy}
                    onCheckedChange={setSendCopy}
                  />
                  <Label htmlFor="send-copy">
                    Send me a copy of the invitation
                  </Label>
                </div>

                <div className="pt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleEmailInvite}
                    disabled={isSubmitting || emailList.length === 0}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Invitations
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="link">
              <div className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Share this invitation link</AlertTitle>
                  <AlertDescription className="text-sm">
                    Anyone with this link can join your team. The link will
                    expire after 7 days.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center mt-2">
                  <Input
                    readOnly
                    value={inviteLink}
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={handleCopyLink}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 mt-4">
                  <h3 className="text-sm font-medium">
                    Or send the link via email
                  </h3>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter email address"
                      type="email"
                      value={currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addEmail())
                      }
                    />
                    <Button onClick={addEmail}>Add</Button>
                  </div>

                  {formErrors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.email}
                    </p>
                  )}

                  {emailList.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
                        {emailList.map((email) => (
                          <Badge
                            key={email}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {email}
                            <button
                              onClick={() => removeEmail(email)}
                              className="rounded-full hover:bg-gray-200 p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="custom-message-link">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="custom-message-link"
                      placeholder="Add a personal message"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleEmailInvite}
                      disabled={isSubmitting || emailList.length === 0}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Link
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Team Access</CardTitle>
          <CardDescription>
            Configure what team members can access and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">View team performance</h3>
                <p className="text-sm text-gray-500">
                  Allow members to view overall team performance metrics
                </p>
              </div>
              <Switch
                id="team-performance"
                checked={teamPerformanceAccess}
                onCheckedChange={setTeamPerformanceAccess}
              />
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">View other members' data</h3>
                <p className="text-sm text-gray-500">
                  Allow members to view other teammates' individual metrics
                </p>
              </div>
              <Switch
                id="member-data"
                checked={membersDataAccess}
                onCheckedChange={setMembersDataAccess}
              />
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Access to transcripts</h3>
                <p className="text-sm text-gray-500">
                  Allow members to access all team call transcripts
                </p>
              </div>
              <Switch
                id="transcript-access"
                checked={transcriptAccess}
                onCheckedChange={setTranscriptAccess}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InviteTeamMemberPage;
