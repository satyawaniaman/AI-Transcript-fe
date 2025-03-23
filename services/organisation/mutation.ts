import { useMutation } from "@tanstack/react-query";
import { createOrganisation } from "./api";
import { toast } from "react-hot-toast";

function useCreateOrganisationMutation() {
  return useMutation({
    mutationFn: createOrganisation,
    onSuccess: () => {
      toast.success('Organisation created successfully');
    },
    onError: () => {
      toast.error('Failed to create organisation');
    },
  });
}

export default useCreateOrganisationMutation;
