import Questions from "@/app/components/Questions";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const quizQ = () => {
  return (
    <div className="max-h-[85vh] overflow-y-auto flex items-center justify-center">
      <Questions />
      <Toaster />
    </div>
  );
};

export default quizQ;
