export interface Article {
  _id: string;
  _sys: {
    createdAt: string;
    updatedAt: string;
  };
  title: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage: {
      _id: string;
      src: string;
      fileType: string;
      fileSize: number;
      fileName: string;
      width: number;
      height: number;
    };
    category: string;
  };
  body: string;
}
