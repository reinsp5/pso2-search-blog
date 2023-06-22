//認証済みのアップロード用URLを取得するレスポンス
export interface AuthedUploadUrlResponse {
  statusCode: number;
  statusMessage: string;
  success: boolean;
  id: string;
  uploadURL: string;
}


// 認証済みURLによるアップロードのレスポンス
export interface DirectUploadUrlResponse {
  result: {
    id: string;
    uploadURL: string;
  };
  errors: any[];
  messages: any[];
  success: boolean;
}
