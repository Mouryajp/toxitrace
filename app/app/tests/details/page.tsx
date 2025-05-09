"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const UserDetail = () => {
  const router = useRouter();
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const isFormValid = occupation.trim() && age.trim() && gender.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const query = new URLSearchParams({
      occupation,
      age,
      gender,
    }).toString();
  
    router.push(`/app/tests/quiz?${query}`);
  };
  

  return (
    <section className="max-h-[85vh] overflow-y-auto flex items-center justify-center pt-6">
      <div className="xl:text-sm lg:text-sm md:text-xl xl:w-3xl lg:w-3xl md:max-w-[60%] mx-auto xl:px-4 lg:px-4 md:px-10 py-6 text-gray-800 dark:text-gray-200 text-justify space-y-6 border-4 rounded-3xl ">
        <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
          Please fill the below details to get started
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Label className="w-[40%]">Occupation:</Label>
            <Input
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Label className="w-[40%]">Age:</Label>
            <Input
              type={"number"}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label className="w-[40%]">Gender:</Label>
            <Select onValueChange={setGender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Prefer not to say ">Prefer not to say </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <Button
            disabled={!isFormValid}
            className="cursor-pointer xl:text-lg lg:text-lg md:text-xl px-4 py-2 flex justify-center items-center"
            onClick={handleSubmit}
          >
            Start Test
            <CirclePlay />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UserDetail;
