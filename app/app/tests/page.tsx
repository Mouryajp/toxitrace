import GetStarted from "@/app/components/GetStarted";
import { Info } from "lucide-react";
import React from "react";

const Tests = () => {
  return (
    <section className="max-h-[85vh] overflow-y-auto flex items-center justify-center">
      <div className="xl:text-sm lg:text-sm md:text-xl xl:max-w-4xl lg:max-w-4xl md:max-w-[80%] mx-auto xl:px-4 lg:px-4 md:px-10 py-6 text-gray-800 dark:text-gray-200 text-justify space-y-6 border-4 rounded-3xl border-blue-900 dark:border-blue-300">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-900 dark:text-blue-300 flex items-center justify-center">
          Information
          <Info className="mt-2 ml-2" />
        </h1>

        <p>
          At Toxitrace, your privacy and well-being are our top priorities.
          Before you proceed with the assessment, please take a moment to review
          the following:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Data Anonymity:</strong> Your identity is never recorded.
            All responses are stored anonymously, ensuring your personal details
            are never linked to your answers.
          </li>
          <li>
            <strong>Privacy Protection:</strong> We strictly adhere to data
            privacy standards. The information collected will only be used to
            improve the assessment experience and will never be shared or
            misused.
          </li>
          <li>
            <strong>AI-Based Evaluation:</strong> This assessment is powered by
            artificial intelligence and is intended to provide supportive
            insights. It is not a medical diagnosis.
          </li>
          <li>
            <strong>Consult a Professional:</strong> For any medical or
            psychological concerns, we strongly recommend consulting a certified
            healthcare provider or mental health professional. Toxitrace is a
            supportive tool—not a replacement for professional care.
          </li>
        </ul>
        <p>By continuing, you acknowledge and accept these terms.</p>
        <div className="flex w-full justify-center items-center">
          <GetStarted />
        </div>
      </div>
    </section>
  );
};

export default Tests;
