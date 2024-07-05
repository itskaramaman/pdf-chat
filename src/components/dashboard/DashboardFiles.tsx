"use client";

import axios from "axios";
import DashboardFileCard from "./DashboardFileCard";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import Spinner from "../Spinner";
import { File } from "@/utils/interfaces";
import { Ghost, RocketIcon } from "lucide-react";

const DashboardFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardFiles = async () => {
      try {
        const response = await axios.get(`/api/dashboard-files`);
        if (response.status === 200) {
          setFiles(response.data?.files);
        }
      } catch (error: any) {
        toast({ title: "Could not fetch files" });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardFiles();
  }, [toast]);

  if (loading) return <Spinner />;

  return (
    <main className="mt-10">
      {files.length === 0 ? (
        <div className="flex justify-center">
          <div className="">
            <div className="flex items-center gap-2">
              <Ghost />
              <h1 className="text-2xl">No Files Uploaded</h1>
            </div>
            <div className="flex gap-1  mt-2 text-gray-600">
              <p className="text-center">Let&apos;s upload your first file.</p>
              <RocketIcon className="w-4" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <DashboardFileCard key={file.id} file={file} setFiles={setFiles} />
          ))}
        </div>
      )}
    </main>
  );
};

export default DashboardFiles;
