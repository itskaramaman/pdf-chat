import { File } from "@/utils/interfaces";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";

const DashboardFileCard = ({ file }: { file: File }) => {
  return (
    <div className="border p-2 rounded-md shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <Link href={file.url} target="_blank">
        <div className="flex justify-between">
          <h1>{file.name}</h1>
          <Trash2 className="hover:text-red-500" />
        </div>
        <hr className="my-2" />
        <Image
          src="/thumbnail.png"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full opacity-50 rounded-md"
        />
      </Link>
    </div>
  );
};

export default DashboardFileCard;
