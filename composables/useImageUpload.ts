import { AuthedUploadUrlResponse } from "~/types/cloudflare";

export const useImageUpload = () => {
  const getUploadUrl = () => {
    const { data } = useFetch<AuthedUploadUrlResponse>("/api/get-upload-url", {
      method: "POST",
    });

    return data.value;
  };

  return {
    getUploadUrl,
  };
};
