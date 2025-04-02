import { useMutation } from "@tanstack/react-query";
import { uploadAsset } from "./api";
import { toast } from "react-hot-toast";

function useUploadAsset() {
    return useMutation({
      mutationFn: (
        { content, type, status, transcript, userId}:
         { 
            content: string;
            type: string;
            status: string;
            transcript: string;
            userId: string;
         } ) => uploadAsset(content, type, status, transcript, userId),
      onError: () => {
        toast.error("Failed to upload asset");
      },
      onSuccess: () => {
        toast.success("Successfully uploaded asset")
      }
    });
}

export { useUploadAsset };