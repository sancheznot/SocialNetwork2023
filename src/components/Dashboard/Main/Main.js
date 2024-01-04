"use client";
import React from "react";
import Greeting from "./Greeting/Greeting";
import { useRouter } from "next/navigation";

const Main = () => {
  const pathName = useRouter();

  return (
    <div className="w-full grid grid-cols-12 gap-2">
      <Greeting />
    </div>
  );
};

export default Main;
