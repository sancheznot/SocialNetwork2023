"use client";
import React from "react";
import Greeting from "./Greeting/Greeting";
import Feed from "./Feed";
import LeftSideBar from "../PhotoUploads/LeftSideBar";
import { useRouter } from "next/navigation";

const Main = () => {
  const pathName = useRouter();

  return (
    <div className="w-full grid grid-cols-12 gap-2">
      <Greeting />
      {/* <Feed />

      <LeftSideBar /> */}
    </div>
  );
};

export default Main;
