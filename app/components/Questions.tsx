"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AudioRecorder from "../components/AudioRecorder";
import { Alert } from "@/components/ui/alert";

const QUESTIONS = [
  "How often do you feel stressed at work?",
  "Do you feel supported by your colleagues and managers?",
  "How often do you receive recognition for your work?",
  "How engaged do you feel during work hours?",
  "Do you feel motivated to complete tasks at work?",
  "How often do you experience anxiety related to your job?",
  "Do you feel appreciated for the effort you put in?",
  "How frequently do you feel overwhelmed by your workload?",
  "Do you feel your contributions are valued by your team?",
  "How often do you experience burnout symptoms?",
  "Are you able to maintain a healthy work-life balance?",
  "How satisfied are you with your overall work environment?",
];

const SCALE = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [recordPhase, setRecordPhase] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alertData, setAlertData] = useState<{
    variant: "success" | "failure" | "info";
    title: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    if (alertData) {
      const timer = setTimeout(() => {
        setAlertData(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alertData]);

  const handleAnswerSelection = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const updatedAnswers = [...answers, selectedAnswer];
      setAnswers(updatedAnswers);
      setSelectedAnswer(null);

      if (currentIndex === QUESTIONS.length - 1) {
        setRecordPhase(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const handleSubmit = async () => {
    if (!audioBlob) {
      setAlertData({
        variant: "info",
        title: "Note:",
        description: "Please complete the voice recording.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("answers", JSON.stringify(answers));

      const response = await axios.post("/api/submitResponse", formData);
      setAlertData({
        variant: "success",
        title: response.data.message || "Submission successful",
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting:", err);
      setAlertData({
        variant: "failure",
        title: "Submission failed.",
        description: "Sorry for the inconvenience. Please try again.",
      });
    }
  };

  return (
    <div className="xl:text-base lg:text-base md:text-lg sm:text-sm w-full max-w-3xl mx-auto px-6 py-8 text-gray-800 dark:text-gray-200 text-justify space-y-6 border-4 rounded-3xl">
      {alertData && (
        <Alert
          variant={alertData.variant}
          title={alertData.title}
          description={alertData.description}
        />
      )}

      {!isSubmitted ? (
        <>
          {!recordPhase ? (
            <>
              <p className="font-semibold">
                Please answer the following questions on a scale of 0 to 3:
              </p>
              <p className="italic text-sm">
                0 - Not at all | 1 - Several days | 2 - More than half the days | 3 - Nearly every day
              </p>
              <p className="text-lg font-medium mt-6">
                Q{currentIndex + 1}: {QUESTIONS[currentIndex]}
              </p>

              <div className="flex flex-wrap gap-4 my-6">
                {SCALE.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleAnswerSelection(item.value)}
                    className={`${
                      selectedAnswer === item.value
                        ? "bg-blue-800 text-white"
                        : "bg-blue-500 text-white"
                    } font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200`}
                  >
                    {item.value} - {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`${
                  selectedAnswer === null
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200`}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold mb-4">
                Please record the following phrase:
              </p>
              <blockquote className="italic border-l-4 border-blue-600 pl-4 text-blue-400">
                &quot;The sun was shining brightly, and people were strolling through the park.
                The trees swayed gently in the breeze, creating a peaceful atmosphere.&quot;
              </blockquote>

              <AudioRecorder
                onRecordingComplete={(blob: Blob) => {
                  setAudioBlob(blob);
                }}
              />

              {audioBlob && (
                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
                >
                  Submit
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <p className="text-xl font-semibold">
          Thank you for completing the survey and recording!
        </p>
      )}
    </div>
  );
};

export default Questions;
