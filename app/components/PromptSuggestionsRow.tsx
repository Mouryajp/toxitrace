import React from "react";
import PromptSuggestionButton from "./PromptSuggestionButton";

interface PromptSuggestionsRowProps {
  onPromptClick: (prompt: string) => void; // Define the function type
}

const PromptSuggestionsRow: React.FC<PromptSuggestionsRowProps> = ({ onPromptClick }) => {
  const prompts = [
    "What is Mental Health?",
    "Which category of people suffer from Mental Illness?",
    "What is the main cause of Stress?",
    "What percent of people undergo stress?",
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton
          key={`suggestion-${index}`}
          text={prompt}
          onClick={() => onPromptClick(prompt)} // Pass the prompt text
        />
      ))}
    </div>
  );
};

export default PromptSuggestionsRow;
