"use client";

import { createContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";

type StreamResponse = {
  sendMessage: Object;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<StreamResponse>({
  sendMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface ChatContextProviderProps {
  fileId: string;
  children: React.ReactNode;
}

export const ChatContextProvider = ({
  fileId,
  children,
}: ChatContextProviderProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/messages", { message });
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      throw new Error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

  return (
    <ChatContext.Provider
      value={{ message, sendMessage, handleInputChange, isLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
};
