import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSessionUser } from "@/utils/getSessionUsers";
import { db } from "@/db";
import axios from "axios";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import pdf from "pdf-parse";
import { getPineconeClient } from "@/utils/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

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

      try {
        const response = await axios.get(file.url, {
          responseType: "arraybuffer",
        });
        console.log(response);

        const dataBuffer = Buffer.from(response.data);
        const blob = new Blob([dataBuffer], { type: "application/pdf" });

        const loader = new PDFLoader(blob);

        const pageLevelDocs = await loader.load();

        const pagesAmt = pageLevelDocs.length;
        console.log(pagesAmt);

        // vectorize and index the document
        console.log("0");
        const pinecone = await getPineconeClient();
        console.log("1");
        const pineconeIndex = pinecone.Index("pdf-chat");
        console.log("2");
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        console.log("here1");
        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          pineconeIndex,
          namespace: createdFile.id,
        });

        console.log("here2");

        await db.file.update({
          data: { uploadStatus: "SUCCESS" },
          where: { id: createdFile.id },
        });
        console.log("here3");
      } catch (error) {
        await db.file.update({
          data: {
            uploadStatus: "FAILED",
          },
          where: {
            id: createdFile.id,
          },
        });
      }

      return { fileId: createdFile.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
