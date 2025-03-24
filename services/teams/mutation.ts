import { useMutation } from "@tanstack/react-query";
import { createTeam } from "./api";
import { toast } from "react-hot-toast";

function useCreateTeamMutation() {
  return useMutation({
    mutationFn: ({
      name,
      description,
      organizationId,
    }: {
      name: string;
      description: string;
      organizationId: string;
    }) => createTeam(name, description, organizationId),
    onSuccess: () => {
      toast.success("Team created successfully");
    },
    onError: () => {
      toast.error("Failed to create team");
    },
  });
}

export default useCreateTeamMutation;
