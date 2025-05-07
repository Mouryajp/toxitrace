// components/ChatInterface.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import PromptSuggestionsRow from "./PromptSuggestionsRow";
import LoadingBubble from "./LoadingBubble";
import Bubble from "./Bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

type ChatInterfaceProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const ChatInterface = ({ messages, setMessages }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const noMessages = messages.length === 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      role: "user",
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (data.reply) {
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: data.reply,
          role: "assistant",
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrompt = (promptText: string) => {
    setInput(promptText);
  };

  return (
    <div className="flex flex-col p-2 gap-2 bg-gray-200 dark:bg-gray-800 rounded-xl border-2 dark:border-gray-200 border-gray-800 shadow-lg">
      <main className="  rounded-t-3xl h-[70vh]  pt-4">
        <section className={noMessages ? "" : "populated"}>
          {noMessages ? (
            <div className="flex flex-col h-[70vh] w-full items-center justify-center">
              <p className="starter-text text-center px-5">
                {`Hi there! 😊 I'm Harmoni.AI, your AI companion for mental well-being.
Whether you need a listening ear, a moment of calm, or helpful coping strategies, I'm here for you. 💙 Feel free to share your thoughts—I'm always ready to chat. You're not alone. 💬✨`}
              </p>
              <br />
              <PromptSuggestionsRow onPromptClick={handlePrompt} />
            </div>
          ) : (
            <div className="flex flex-col h-[68vh] overflow-y-auto no-scrollbar flex-grow">
              <div className="flex flex-col mt-auto">
                {messages.map((message, index) => (
                  <Bubble key={`message-${index}`} message={message} />
                ))}
                {isLoading && <LoadingBubble />}
              </div>
              <div ref={messagesEndRef} />
            </div>
          )}
        </section>
      </main>

      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-around items-center gap-2"
      >
        <Input
          className="w-full border-2 dark:border-gray-200 border-gray-800"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Ask me something..?"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;

// "use client";

// import { useState, useEffect, useRef } from "react";
// import PromptSuggestionsRow from "./PromptSuggestionsRow";
// import LoadingBubble from "./LoadingBubble";
// import Bubble from "./Bubble";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// type Message = {
//   id: string;
//   content: string;
//   role: "user" | "assistant";
// };

// const ChatInterface = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   const noMessages = messages.length === 0;

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!input.trim()) return;

//     const newMessage: Message = {
//       id: crypto.randomUUID(),
//       content: input,
//       role: "user",
//     };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: [...messages, newMessage] }),
//       });

//       const data = await response.json();

//       if (data.reply) {
//         const aiMessage: Message = {
//           id: crypto.randomUUID(),
//           content: data.reply,
//           role: "assistant",
//         };
//         setMessages((prev) => [...prev, aiMessage]);
//       }
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePrompt = (promptText: string) => {
//     setInput(promptText);
//   };

//   return (
//     <div className="flex flex-col p-4 gap-2">
//       <main className="dark:bg-gray-800 bg-gray-200 rounded-t-3xl h-[75vh] p-2">
//         <section className={noMessages ? "" : "populated"}>
//           {noMessages ? (
//             <div className="flex flex-col h-[75vh] w-full items-center justify-center">
//               <p className="starter-text text-center px-5">
//                 {`Hi there! 😊 I'm Harmoni.AI, your AI companion for mental well-being.
// Whether you need a listening ear, a moment of calm, or helpful coping strategies, I'm here for you. 💙 Feel free to share your thoughts—I'm always ready to chat. You're not alone. 💬✨`}
//               </p>
//               <br />
//               <PromptSuggestionsRow onPromptClick={handlePrompt} />
//             </div>
//           ) : (
//             <div className="flex flex-col h-[73vh] overflow-y-auto no-scrollbar flex-grow">
//               <div className="flex flex-col mt-auto">
//                 {messages.map((message, index) => (
//                   <Bubble key={`message-${index}`} message={message} />
//                 ))}
//                 {isLoading && <LoadingBubble />}
//               </div>
//               <div ref={messagesEndRef} />
//             </div>
//           )}
//         </section>
//       </main>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full flex justify-around items-center gap-4"
//       >
//         <Input
//           className="w-full"
//           onChange={(e) => setInput(e.target.value)}
//           value={input}
//           placeholder="Ask me something..?"
//         />
//         <Button type="submit" disabled={isLoading}>
//           {isLoading ? "Thinking..." : "Submit"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;
