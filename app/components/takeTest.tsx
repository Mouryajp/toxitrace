"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const TakeTest = () => {
  const router = useRouter();
  return (
    <div>
      <Button className=" cursor-pointer" onClick={() => router.push("/app/tests")}>
        Take Tests
      </Button>
    </div>
  );
};

export default TakeTest;
