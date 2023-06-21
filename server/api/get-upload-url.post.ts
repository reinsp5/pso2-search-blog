import { AuthenticatedUploadURLResponse } from "../../types/cloudflareResponse";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const formData = new FormData();
  formData.append("requireSignedURLs", "true");
  try {
    // アップロード用ワンタイムURLを取得
    const response = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/2d648627f4dcef8eccfc22ce90421717/images/v2/direct_upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.cloudflareImagesKey}`,
        },
        body: formData,
      }
    );
    const respJson = await response.json();

    // URL取得失敗
    if (respJson.success === false) {
      return {
        statusCode: 400,
        statusMessage: JSON.stringify({
          message: respJson.errors[0].message,
        }),
        success: false,
        id: "",
        uploadURL: "",
      } as AuthenticatedUploadURLResponse;
    }

    // 正常終了
    return {
      statusCode: 200,
      success: respJson.success,
      id: respJson.result.id,
      uploadURL: respJson.result.uploadURL,
    } as AuthenticatedUploadURLResponse;
  } catch (err: unknown) {
    // サーバーエラー
    return {
      statusCode: 500,
      statusMessage: JSON.stringify(err),
      success: false,
      id: "",
      uploadURL: "",
    } as AuthenticatedUploadURLResponse;
  }
});
