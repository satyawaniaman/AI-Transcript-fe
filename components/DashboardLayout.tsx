"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart2,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Settings,
  Upload,
  User,
  X,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarFile, setSidebarFile] = useState<File | null>(null);
  const pathname = usePathname();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", href: "/dashboard/upload", icon: Upload },
    { name: "Analysis", href: "/dashboard/analysis", icon: BarChart2 },
    { name: "Transcripts", href: "/dashboard/transcripts", icon: FileText },
    { name: "Objections", href: "/dashboard/objections", icon: MessageSquare },
    { name: "Insights", href: "/dashboard/insights", icon: PieChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Handle file selection
  const handleSidebarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSidebarFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleSidebarFileUpload = () => {
    if (sidebarFile) {
      console.log("Uploading file:", sidebarFile);
      // Add your upload logic here
      // After successful upload, you might want to clear the state:
      // setSidebarFile(null);
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setSidebarFile(null);
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col grow bg-navy-800 overflow-y-auto">
          {/* Sidebar header */}
          <div className="flex items-center h-16 shrink-0 px-4 border-b border-navy-700">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">
                SalesCoach<span className="text-[#0284c7]">.guru</span>
              </span>
            </Link>
          </div>

          {/* Sidebar navigation */}
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                      ${
                        isActive
                          ? "bg-navy-700 text-white"
                          : "text-gray-300 hover:bg-navy-700 hover:text-white"
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 shrink-0 h-6 w-6 
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-300"
                        }
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Upload section */}
          <div className="p-4 mt-auto border-t border-navy-700">
            <div className="rounded-md overflow-hidden">
              <div className="px-3 py-2 bg-navy-700 text-white text-sm font-medium">
                Quick Upload
              </div>
              <div className="p-3 bg-navy-700 bg-opacity-50">
                <label
                  htmlFor="sidebar-dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-24 border border-navy-600 border-dashed rounded-md cursor-pointer hover:bg-navy-700 transition-colors duration-200"
                >
                  <div className="flex flex-col items-center justify-center p-2">
                    <Upload className="h-5 w-5 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-300 text-center">
                      <span className="font-medium">Click to upload</span> or
                      drag files
                    </p>
                  </div>
                  <input
                    id="sidebar-dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleSidebarFileChange}
                    ref={fileInputRef}
                  />
                </label>

                {sidebarFile && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-300 truncate mb-1 flex justify-between items-center">
                      <span>{sidebarFile.name}</span>
                      <button
                        onClick={handleRemoveFile}
                        className="text-gray-400 hover:text-white"
                        title="Remove file"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        {(sidebarFile.size / 1024).toFixed(1)} KB
                      </div>
                      <button
                        onClick={handleSidebarFileUpload}
                        className="text-xs px-2 py-1 bg-[#0284c7] text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Help section */}
          <div className="p-4 mt-auto border-t border-navy-700">
            <div className="rounded-md">
              <Link
                href="/help"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-navy-700 hover:text-white"
              >
                <HelpCircle className="mr-3 shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
        md:hidden fixed inset-0 flex z-40 transition-opacity duration-300
        ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-navy-900 bg-opacity-75 transition-opacity duration-300
            ${sidebarOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`
          relative flex-1 flex flex-col max-w-xs w-full bg-navy-800 transform transition duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {/* Close button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center h-16 shrink-0 px-4 border-b border-navy-700">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">
                SalesCoach<span className="text-[#0284c7]">.guru</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${
                        isActive
                          ? "bg-navy-700 text-white"
                          : "text-gray-300 hover:bg-navy-700 hover:text-white"
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`
                        mr-3 shrink-0 h-6 w-6
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-300"
                        }
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Help */}
          <div className="p-4 mt-auto border-t border-navy-700">
            <Link
              href="/help"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-navy-700 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <HelpCircle className="mr-3 shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300" />
              Help & Support
            </Link>
          </div>
        </div>

        <div className="shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 md:hidden shrink-0 flex h-16 bg-white border-b border-gray-200">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-navy-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 flex justify-between items-center px-4">
            <div className="flex-1 flex">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-navy-800">
                  SalesCoach<span className="text-[#0284c7]">.guru</span>
                </span>
              </Link>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Top bar desktop */}
        <div className="hidden md:flex sticky top-0 z-10 shrink-0 h-16 bg-white border-b border-gray-200">
          <div className="flex-1 flex justify-end px-4">
            <div className="ml-4 flex items-center">
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/" className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardLayout;