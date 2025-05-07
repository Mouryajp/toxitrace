// import React from "react";
// import { Typewriter } from "react-simple-typewriter";

// interface BubbleProps {
//   message: any;
// }

// const Bubble: React.FC<BubbleProps> = ({ message }) => {
//   const { content, role } = message;

//   return (
//     <div
//       className={`m-2 p-2 text-[15px] text-gray-800 shadow-lg w-4/5 text-left
//         ${
//           role === "user"
//             ? "rounded-t-2xl rounded-bl-2xl bg-blue-100 ml-auto max-w-[70vw]"
//             : "rounded-t-2xl rounded-br-2xl bg-blue-200 max-w-[70vw]"
//         }
//       `}
//     >
//       {/* Typewriter Effect */}
//       <Typewriter
//         words={[content]}
//         loop={1}
//         typeSpeed={10}
//       />

//     </div>
//   );
// };

// export default Bubble;


  import React from "react";
  import ReactMarkdown from "react-markdown";
  interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
  }
  
  interface BubbleProps {
    message: Message; 
  }

  const Bubble: React.FC<BubbleProps> = ({ message }) => {
    const { content, role } = message;
    return (
      <div
        className={`m-2 p-2 text-[15px] text-gray-800 shadow-lg w-fit text-left
          ${role === "user" ? "rounded-t-2xl rounded-bl-2xl bg-blue-100 ml-auto max-w-[70vw]" : "rounded-t-2xl rounded-br-2xl bg-blue-200 max-w-[75vw]"}
        `}
      >
      <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  };

  export default Bubble;
