export enum UploadStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  FAILED = "FAILED",
  SUCCESS = "SUCCESS",
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
