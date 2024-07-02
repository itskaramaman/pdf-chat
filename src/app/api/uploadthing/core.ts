import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSessionUser } from "@/utils/getSessionUsers";
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getSessionUser();
      const userId = session?.userId;
      if (!userId) throw new Error("Unauthorized");
      return { userId: String(userId) };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: Number(metadata.userId),
          url: file.url,
          uploadStatus: "PROCESSING",
        },
      });

      return { fileId: createdFile.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
