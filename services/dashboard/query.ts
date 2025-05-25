import { useQuery } from "@tanstack/react-query";
import {
  getDashboardMetrics,
  getSentimentTrends,
  getCommonObjections,
  getTranscripts,
  getObjectionCategoriesTrend,
  getQuestionsRate,
  getTopicCoherence,
} from "./api";

// Common query options for fresh data fetching
const commonQueryOptions = {
  staleTime: 0, // Make data immediately stale for fresh fetches
  refetchOnWindowFocus: true, // Refetch when user returns to tab
  refetchOnMount: true, // Always refetch on component mount
  refetchOnReconnect: true, // Refetch when internet reconnects
  refetchInterval: false as const, // No automatic intervals
  refetchIntervalInBackground: false,
};

export const useGetDashboardMetrics = (
  orgId: string,
  options: { dateFilter?: string } = {}
) => {
  const { dateFilter } = options;

  return useQuery({
    queryKey: ["dashboardMetrics", dateFilter],
    queryFn: () => getDashboardMetrics(orgId, dateFilter),
    enabled: !!orgId,
    ...commonQueryOptions,
  });
};

/**
 * Hook to fetch sentiment trends for the last 10 calls
 */
export const useGetSentimentTrends = (orgId: string) => {
  return useQuery({
    queryKey: ["sentimentTrends", orgId],
    queryFn: () => getSentimentTrends(orgId),
    enabled: !!orgId,
    ...commonQueryOptions,
  });
};

/**
 * Hook to fetch data about common objections
 */
export const useGetCommonObjections = (orgId: string) => {
  return useQuery({
    queryKey: ["commonObjections", orgId],
    queryFn: () => getCommonObjections(orgId),
    enabled: !!orgId,
    ...commonQueryOptions,
  });
};

/**
 * Hook to fetch paginated transcript data
 */
export const useGetTranscripts = (
  orgId: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["transcripts", orgId, page, limit],
    queryFn: () => getTranscripts(orgId, page, limit),
    enabled: !!orgId,
    ...commonQueryOptions,
  });
};

/**
 * Hook to fetch questions rate metrics
 */
export const useGetQuestionsRate = (orgId: string) => {
  return useQuery({
    queryKey: ["questionsRate", orgId],
    queryFn: () => getQuestionsRate(orgId),
    enabled: !!orgId,
    ...commonQueryOptions,
  });
};

/**
 * Hook to fetch topic coherence metrics
 */
export const useGetTopicCoherence = (orgId: string) => {
  return useQuery({
    queryKey: ["topicCoherence", orgId],
    queryFn: () => getTopicCoherence(orgId),
    enabled: !!orgId,
    ...commonQueryOptions,
  });
};

/**
 * Hook to fetch objection categories trend data
 */
export const useGetObjectionCategoriesTrend = (
  orgId: string,
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ["objectionCategoriesTrend", orgId, startDate, endDate],
    queryFn: () => getObjectionCategoriesTrend(orgId, startDate, endDate),
    enabled: !!orgId,
    ...commonQueryOptions,
  });
};
