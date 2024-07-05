import { UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import UploadDropZone from "@/components/upload/UploadDropZone";

const UploadButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Upload PDF <UploadIcon className="w-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Drop your PDF</DialogTitle>
        <UploadDropZone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
