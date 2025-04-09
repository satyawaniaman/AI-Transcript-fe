import { useQuery } from "@tanstack/react-query";
import { getOrgs } from "./api";

export const useGetOrgs = () => {
  return useQuery({
    queryKey: ["organisations"],
    queryFn: getOrgs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
};
