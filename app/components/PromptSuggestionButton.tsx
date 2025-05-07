import { Button } from "@/components/ui/button";
import React from "react";

interface PromptSuggestionButtonProps {
  text: string; // Explicitly type text as a string
  onClick: () => void; // Explicitly type onClick as a function
}

const PromptSuggestionButton: React.FC<PromptSuggestionButtonProps> = ({ text, onClick }) => {
  return (
    <Button className="" onClick={onClick}>
      {text}
    </Button>
  );
};

export default PromptSuggestionButton;
