"use client";

import { useState, useEffect } from "react";
import ChatInterface from "./ChatInterface";
import { Bot } from "lucide-react"; // using Lucide icon

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

const LOCAL_STORAGE_KEY = "harmoni-chat-messages";

const ChatLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }
  }, []);

  // Save messages to localStorage when updated
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Bot
          //   width={45}
          //   height={45}
          className="xl:w-11 lg:w-11 xl:h-11 lg:h-11 md:w-16 md:h-16 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full  shadow-xl  cursor-pointer  xl:p-2 lg:p-2 md:p-4"
          onClick={toggleChat}
        />
        {/* <Button
          onClick={toggleChat}
          className="rounded-full  shadow-xl  cursor-pointer"
        >
          
        </Button> */}
      </div>

      {/* Expandable Chat UI */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 xl:w-[30vw] lg:w-[30vw] md:w-[75vw] z-40 shadow-2xl">
          <ChatInterface messages={messages} setMessages={setMessages} />
        </div>
      )}
    </>
  );
};

export default ChatLayout;

// "use client";

// import { useState } from "react";
// import ChatInterface from "../components/ChatInterface";
// import { Bot, MessageCircle } from "lucide-react"; // using Lucide icon
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";

// const ChatLayout = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const { theme, setTheme } = useTheme();

//   const toggleChat = () => {
//     setIsChatOpen((prev) => !prev);
//   };

//   return (
//     <>
//       {/* Chat Toggle Button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <Button
//           onClick={toggleChat}
//           className="rounded-full  shadow-xl bg-transparent hover:bg-gray-300 cursor-pointer"
//         >
//           <Bot
//             width={10}
//             height={10}
//             className={` text-black  ${theme === "dark" ? " text-white " : ""}`}
//           />
//         </Button>
//       </div>
//       {/* Chat Interface Modal */}
//       {isChatOpen && (
//         <div className="fixed bottom-20 right-6 w-[90vw] sm:w-[400px] z-40 shadow-2xl">
//           <ChatInterface />
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatLayout;
