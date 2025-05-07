"use client";
import { Typewriter } from "react-simple-typewriter";
import TakeTest from "./components/takeTest";
export default function Home() {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-4 justify-center items-center h-[90vh] lg:text-5xl md:text-xl font-bold relative">
        <span className="shining-text flex flex-col text-center justify-center">
          <Typewriter
            words={["Welcome to Toxitrace..!"]}
            loop={1}
            typeSpeed={100}
          />
          <p className="text-lg mt-4">Assess your mental well-being with ease.</p>
          <p className="text-sm lg:w-[40vw] xl:-[50vw] md:w-[80vw]">Toxitrace offers accessible mental health self-assessments through text and audio formats, helping you understand your emotional and psychological state.</p>
        </span>
      
         <TakeTest />
      </div>
    </div>
  );
}
