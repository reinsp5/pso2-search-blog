import { AuthenticatedUploadURLResponse } from "~/types/cloudflareResponse";

export const useImageUpload = () => {
  const getUploadUrl = () => {
    const { data } = useFetch<AuthenticatedUploadURLResponse>("/api/get-upload-url", {
      method: "POST",
    });

    return data.value;
  };

  return {
    getUploadUrl,
  };
};
