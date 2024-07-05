"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import PdfRenderer from "@/components/pdf/PdfRenderer";
import ChatWrapper from "@/components/chat/ChatWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

const DashboardChatPage = () => {
  const { id }: { id: string } = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await axios.get(`/api/dashboard-files/${id}`);
        if (response.status === 200) {
          setFileUrl(response.data?.file?.url);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.35rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer fileUrl={fileUrl} />
          </div>
        </div>

        {/* right side */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper fileId={id} />
        </div>
      </div>
    </div>
  );
};

export default DashboardChatPage;
