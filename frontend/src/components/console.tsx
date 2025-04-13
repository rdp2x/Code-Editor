"use client";

import type React from "react";
import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConsoleProps {
  isDarkMode: boolean;
}

interface ConsoleMessage {
  type: "output" | "error";
  content: string;
}

export const Console = forwardRef<
  {
    log: (content: string) => void;
    error: (content: string) => void;
    clear: () => void;
  },
  ConsoleProps
>(({ isDarkMode }, ref) => {
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (message: ConsoleMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  useImperativeHandle(ref, () => ({
    log: (content: string) => addMessage({ type: "output", content }),
    error: (content: string) => addMessage({ type: "error", content }),
    clear: () => setMessages([]),
  }));

  return (
    <div
      className={`h-full w-full p-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <ScrollArea className="h-full" ref={scrollAreaRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 font-mono whitespace-pre-wrap ${
              msg.type === "error" ? "text-red-500" : ""
            }`}
          >
            {msg.content.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
});
