import { useMutation } from "@tanstack/react-query";
import { uploadAsset } from "./api";
import { toast } from "react-hot-toast";

function useUploadAsset() {
    return useMutation({
      mutationFn: (
        { content, type, organisationId}:
         { 
            content: string;
            type: "FILE" | "TEXT";
            organisationId: string;
         } ) => uploadAsset(content, type, organisationId),
      onError: () => {
        toast.error("Failed to upload asset");
      },
      onSuccess: () => {
        toast.success("Successfully uploaded asset")
      }
    });
}

export { useUploadAsset };