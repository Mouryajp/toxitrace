"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TTLogo from "./../assests/TTLogo.png";


export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-between items-center  gap-2 w-full px-4 mt-2 ">
      <div
        className="text-2xl font-bold cursor-pointer flex gap-2 "
        onClick={() => router.push("/")}
      >
        <Image src={TTLogo} alt="Harmoni.AI" width={40} height={40} />
        <p>ToxicTrace</p>
      </div>
      <div className="flex justify-center   font-bold  gap-6 text-xl ">
        <p className="cursor-pointer" onClick={()=> router.push("/app/tests")}>Tests</p>
        <p className="cursor-pointer" onClick={()=> router.push("/app/aboutUs")}>About Us</p>
        <div className="flex gap-2">
          <p>Theme:</p>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-12 h-6 flex items-center bg-secondary rounded-full p-1 transition duration-300 ease-in-out outline-1 outline-gray-950 cursor-pointer mt-1"
          >
            <div
              className={`w-5 h-5 bg-primary rounded-full shadow-md transform transition-all duration-300 ${
                theme === "dark" ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
