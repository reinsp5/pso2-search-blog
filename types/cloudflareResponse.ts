//認証済みのアップロード用URLを取得するレスポンス
export interface AuthenticatedUploadURLResponse {
  statusCode: number;
  statusMessage: string;
  success: boolean;
  id: string;
  uploadURL: string;
}


// 認証済みURLによるアップロードのレスポンス
export interface DirectUploadURLResponse {
  result: {
    id: string;
    uploadURL: string;
  };
  errors: any[];
  messages: any[];
  success: boolean;
}
