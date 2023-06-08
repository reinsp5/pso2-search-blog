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
    const cloudflareImages = await response.json();
    if (cloudflareImages.success === false) {
      // URL取得失敗
      return createError({
        statusCode: 400,
        statusMessage: JSON.stringify({
          message: cloudflareImages.errors[0].message,
        }),
      });
    }
    // アップロード用ワンタイムURLを返す
    return {
      statusCode: 200,
      success: cloudflareImages.success,
      id: cloudflareImages.result.id,
      uploadURL: cloudflareImages.result.uploadURL,
    };
  } catch (err: unknown) {
    // サーバーエラー
    return createError({
      statusCode: 500,
      statusMessage: JSON.stringify({
        message: err,
      }),
    });
  }
});
