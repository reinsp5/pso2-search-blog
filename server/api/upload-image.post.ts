import { Client } from "minio";
export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  const config = useRuntimeConfig();
  const minio = new Client({
    endPoint: "storage.reinsp5.com",
    useSSL: true,
    accessKey: config.minioAccessKey,
    secretKey: config.minioAccessSecret,
  });

  // ファイルが送られてこなかった場合
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "ファイルが送られてきませんでした。",
    });
  }

  // ファイルをバケットへアップロード
  for (const file of formData) {
    // formDataがファイルの場合
    if (file.filename === undefined) {
      continue;
    }
    minio.putObject(
      "pso2-itemdb-images",
      file.filename,
      file.data,
      (err, objInfo) => {
        if (err) {
          throw createError({
            statusCode: 500,
            statusMessage: "ファイルのアップロードに失敗しました。",
          });
        }
      }
    );
  }
  return JSON.stringify({ status: "ok" });
});
