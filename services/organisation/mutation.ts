import { useMutation } from "@tanstack/react-query";
import { createOrganisation, inviteToOrganisation } from "./api";
import { toast } from "react-hot-toast";
import { Role } from "@/services/user/api";

function useCreateOrganisationMutation() {
  return useMutation({
    mutationFn: ({ name }: { name: string }) => createOrganisation(name),
    onError: () => {
      toast.error("Failed to create organisation");
    },
  });
}

export function useInviteToOrganisationMutation() {
  return useMutation({
    mutationFn: ({
      email,
      role,
      organisationId,
      teamIds,
    }: {
      email: string;
      role: Role;
      organisationId: string;
      teamIds: string[];
    }) => inviteToOrganisation(email, role, organisationId, teamIds),
    onSuccess: () => {
      toast.success("Invitation sent successfully");
    },
    onError: () => {
      toast.error("Failed to send invitation");
    },
  });
}

export default useCreateOrganisationMutation;
