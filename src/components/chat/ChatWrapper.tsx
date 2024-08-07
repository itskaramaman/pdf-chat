"use client";

import Messages from "./Messages";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { UploadStatus } from "@/utils/interfaces";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface ChatWrapperProps {
  fileId: string;
}

const ChatWrapper = ({ fileId }: ChatWrapperProps) => {
  const [fileStatus, setfileStatus] = useState<UploadStatus>(
    UploadStatus.PROCESSING
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let interval: number;
    const fetchFileStatus = async () => {
      try {
        const response = await axios.get(
          `/api/dashboard-files/${fileId}/status`
        );
        if (
          response.status !== 200 ||
          response.data.status === UploadStatus.FAILED
        ) {
          setfileStatus(UploadStatus.FAILED);
          clearInterval(interval);
        } else if (response.data.status === UploadStatus.SUCCESS) {
          setfileStatus(UploadStatus.SUCCESS);
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
        clearInterval(interval);
      } finally {
        setIsLoading(false);
      }
    };

    // @ts-ignore
    interval = setInterval(fetchFileStatus, 500);

    // clear the interval if it takes more than 15 seconds
    setTimeout(() => clearInterval(interval), 15000);

    return () => clearInterval(interval);
  }, [fileId]);

  if (isLoading) {
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <h3 className="font-semibold">Loading...</h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re preparing your PDF
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex-col mb-28">
        
      </div>
    </div>
  );
};

export default ChatWrapper;
