"use client";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GetStarted = () => {
  const router = useRouter();

  return (
    <div>
      <Button
        className=" cursor-pointer bg-blue-900 hover:bg-blue-700 hover:dark:bg-blue-100 dark:bg-blue-300 xl:text-lg lg:text-lg md:text-xl px-4 py-2 flex justify-center items-center"
        onClick={() => router.push("/app/tests/details")}
      >
        Get Started
        <CirclePlay />
      </Button>
    </div>
  );
};

export default GetStarted;
