enum UploadStatus {
  PENDING,
  PROCESSING,
  FAILED,
  SUCCESS,
}

export interface File {
  id: string;
  name: String;
  uploadStatus: UploadStatus;
  url: string;
  key: string;
  userId: number;
  createdAt: string;
  upadtedAt: string;
}
