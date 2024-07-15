"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

interface INoteTakingEditorProps {
  fileId: string;
}

const NoteTakingEditor = ({ fileId }: INoteTakingEditorProps) => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (content: string) => {
    setValue(content);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/note?fileId=${fileId}`);
        if (response.status === 200) {
          setValue(response.data.content);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [fileId]);

  useEffect(() => {
    const saveContent = async () => {
      try {
        await axios.post("/api/note", { value, fileId });
      } catch (error: any) {
        console.log(error);
      }
    };

    const timeoutId = setTimeout(() => saveContent(), 500);

    return () => clearTimeout(timeoutId);
  }, [value, fileId]);

  return (
    <ReactQuill
      className="m-6 h-[calc(80vh)] md:mx-0 mt-6  md:h-[calc(80vh)] lg:h-[calc(80vh)] border-none"
      value={isLoading ? "Loading...." : value}
      onChange={handleChange}
      modules={modules}
    />
  );
};

export default NoteTakingEditor;
