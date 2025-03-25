"use client";

import React, { Suspense, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardLayoutSkeleton from "@/components/DashboardLayoutSkeleton";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Listen for route changes - Next.js App Router way
  useEffect(() => {
    // Show skeleton for a brief period for better UX
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Slightly shorter timeout for better responsiveness

    return () => clearTimeout(timer);
  }, [pathname, searchParams]); // This will trigger whenever the route changes

  if (isLoading) {
    return <DashboardLayoutSkeleton />;
  }

  return (
    <>
      <DashboardLayout>
        <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
      </DashboardLayout>
      <Toaster />
    </>
  );
};

export default DashboardLayoutWrapper;
