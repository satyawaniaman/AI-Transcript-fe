import { useMutation } from "@tanstack/react-query";
import { createOrganisation } from "./api";
import { toast } from "react-hot-toast";

function useCreateOrganisationMutation() {
  return useMutation({
    mutationFn: ({ name }: { name: string }) => createOrganisation(name),
    onError: () => {
      toast.error("Failed to create organisation");
    },
  });
}

export default useCreateOrganisationMutation;
