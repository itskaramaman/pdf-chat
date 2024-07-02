"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import PdfRenderer from "@/components/PdfRenderer";
import ChatWrapper from "@/components/ChatWrapper";

const DashboardChatPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.35rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer />
          </div>
        </div>

        {/* right side */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
};

export default DashboardChatPage;
