"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  CreditCard, 
  Download, 
  Key, 
  Save, 
  Settings as SettingsIcon, 
  Shield, 
  User,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useGetUser } from "@/services/user/query";

const SettingsPage: React.FC = () => {
  const { data: user, isLoading, isError } = useGetUser();
  if (isError){
    return (
      <>
        <h1>error occured</h1>
      </>
    )
  }

  if (isLoading){
    return (
      <>
        <h1>Loading</h1>
      </>
    )
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-800">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="w-full border-b pb-px justify-start">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information and how others see you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={user?.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={user?.lastName as string} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                  <p className="text-xs text-gray-500">
                    This email will be used for all communications.
                  </p>
                </div>
                
                {/* <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    defaultValue="Experienced sales professional with 10+ years in B2B SaaS sales. Passionate about improving sales methodologies and helping teams close more deals." 
                    rows={4}
                  />
                  <p className="text-xs text-gray-500">
                    Brief description for your profile.
                  </p>
                </div> */}
                
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Account Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en-US">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="America/New_York">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics" className="text-sm font-normal">
                        Share usage data
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        Help us improve by sharing anonymous usage data
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newsletter" className="text-sm font-normal">
                        Receive newsletter
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        Get product updates and sales tips
                      </p>
                    </div>
                    <Switch id="newsletter" defaultChecked />
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-sm font-medium mb-4">Danger Zone</h3>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    This will permanently delete your account and all associated data.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Button className="w-fit">
                    <Key className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
                
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Current Plan: Pro</h3>
                      <p className="text-sm text-gray-600 mt-1">$49/month, billed monthly</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Your next billing date is <span className="font-medium">August 1, 2023</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Method</h3>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <CreditCard className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Expires 12/2025
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-fit">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Billing History</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-1 font-medium">Date</th>
                          <th className="text-left py-2 px-1 font-medium">Description</th>
                          <th className="text-right py-2 px-1 font-medium">Amount</th>
                          <th className="text-right py-2 px-1 font-medium">Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-1">Jul 1, 2023</td>
                          <td className="py-2 px-1">Pro Plan Subscription</td>
                          <td className="text-right py-2 px-1">$49.00</td>
                          <td className="text-right py-2 px-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-1">Jun 1, 2023</td>
                          <td className="py-2 px-1">Pro Plan Subscription</td>
                          <td className="text-right py-2 px-1">$49.00</td>
                          <td className="text-right py-2 px-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-1">May 1, 2023</td>
                          <td className="py-2 px-1">Pro Plan Subscription</td>
                          <td className="text-right py-2 px-1">$49.00</td>
                          <td className="text-right py-2 px-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Customize how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-transcripts" className="text-sm font-normal">
                          New Transcript Analysis
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Get notified when a new transcript is analyzed
                        </p>
                      </div>
                      <Switch id="email-transcripts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-insights" className="text-sm font-normal">
                          Weekly Insights
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Receive a weekly summary of your sales performance insights
                        </p>
                      </div>
                      <Switch id="email-insights" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-product" className="text-sm font-normal">
                          Product Updates
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Stay informed about new features and improvements
                        </p>
                      </div>
                      <Switch id="email-product" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-marketing" className="text-sm font-normal">
                          Marketing Communications
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Receive tips, promotions, and other marketing materials
                        </p>
                      </div>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-sm font-medium">In-App Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-transcripts" className="text-sm font-normal">
                          New Transcript Analysis
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Show notifications for newly analyzed transcripts
                        </p>
                      </div>
                      <Switch id="app-transcripts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-insights" className="text-sm font-normal">
                          New Insights
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Alert when new insights are available
                        </p>
                      </div>
                      <Switch id="app-insights" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-product" className="text-sm font-normal">
                          Product Updates
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">
                          Show notifications about new features
                        </p>
                      </div>
                      <Switch id="app-product" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default SettingsPage; 