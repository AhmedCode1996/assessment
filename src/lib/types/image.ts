export interface IImage {
  id: number;
  name: string;
  url: string;
  uploadDate: string;
  metadata: Metadata;
  categoryId: number;
}

export interface Metadata {
  size: string;
  resolution: string;
}
