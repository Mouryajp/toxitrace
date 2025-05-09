// app/tests/quiz/page.tsx
"use client";

import Questions from "@/app/components/Questions";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { useSearchParams } from "next/navigation";

const QuizQ = () => {
  const searchParams = useSearchParams();

  const occupation = searchParams.get("occupation") || "";
  const age = searchParams.get("age") || "";
  const gender = searchParams.get("gender") || "";

  return (
    <div className="max-h-[85vh] overflow-y-auto flex items-center justify-center">
      <Questions occupation={occupation} age={age} gender={gender} />
      <Toaster />
    </div>
  );
};

export default QuizQ;
