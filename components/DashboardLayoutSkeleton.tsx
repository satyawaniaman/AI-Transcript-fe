"use client";

import React from "react";

const DashboardLayoutSkeleton = () => {
  // Navigation items for the skeleton
  const navItems = Array(8).fill(null);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col h-full bg-navy-800 overflow-y-auto">
          {/* Sidebar header */}
          <div className="flex items-center h-16 shrink-0 px-4 border-b border-navy-700">
            <div className="h-6 w-40 bg-gray-500 rounded-md"></div>
          </div>

          {/* Sidebar navigation */}
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navItems.map((_, index) => (
                <div
                  key={index}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-navy-700 bg-opacity-30"
                >
                  <div className="mr-3 shrink-0 h-6 w-6 bg-gray-500 rounded-md"></div>
                  <div className="h-4 w-24 bg-gray-500 rounded-md"></div>
                </div>
              ))}
            </nav>
          </div>

          {/* Upload section skeleton */}
          <div className="p-4 border-t border-navy-700">
            <div className="rounded-md overflow-hidden">
              <div className="px-3 py-2 bg-navy-700 bg-opacity-50">
                <div className="h-5 w-24 bg-gray-500 rounded-md"></div>
              </div>
              <div className="p-3 bg-navy-700 bg-opacity-30">
                <div className="flex flex-col items-center justify-center w-full h-24 border border-navy-600 border-dashed rounded-md">
                  <div className="flex flex-col items-center justify-center p-2">
                    <div className="h-5 w-5 bg-gray-500 rounded-full mb-1"></div>
                    <div className="h-3 w-32 bg-gray-500 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help section skeleton */}
          <div className="p-4 border-t border-navy-700">
            <div className="rounded-md">
              <div className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-navy-700 bg-opacity-30">
                <div className="mr-3 shrink-0 h-6 w-6 bg-gray-500 rounded-md"></div>
                <div className="h-4 w-24 bg-gray-500 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Organization section skeleton */}
          <div className="p-4 border-t border-navy-700 mt-auto">
            <div className="rounded-md bg-navy-700 bg-opacity-50 p-3">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-500 rounded-full mr-3"></div>
                <div className="overflow-hidden">
                  <div className="h-4 w-20 bg-gray-500 rounded-md mb-1"></div>
                  <div className="h-3 w-16 bg-gray-500 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top navigation skeleton */}
        <div className="sticky top-0 z-10 md:hidden shrink-0 flex h-16 bg-white border-b border-gray-200">
          <div className="px-4 flex items-center justify-between w-full">
            <div className="h-6 w-40 bg-gray-200 rounded-md"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Top bar desktop skeleton */}
        <div className="hidden md:flex sticky top-0 z-10 shrink-0 h-16 bg-white border-b border-gray-200">
          <div className="flex-1 flex justify-end px-4">
            <div className="ml-4 flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 p-6 animate-pulse">
          {/* Content will be injected here */}
          <div className="h-8 w-48 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 w-72 bg-gray-200 rounded-md mb-8"></div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-md"></div>
            ))}
          </div>

          <div className="h-4 w-32 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-80 bg-gray-200 rounded-md mb-6"></div>
          <div className="h-60 bg-gray-200 rounded-md"></div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutSkeleton;
