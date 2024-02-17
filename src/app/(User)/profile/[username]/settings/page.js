"use client";
import Header from "@/components/Dashboard/Profile/Headers/Header";
import Settings from "@/components/Dashboard/Profile/Settings/Settings";
import React from "react";

const page = ({ params }) => {
  const { username } = params;

  return (
    <>
      <h1 className="text-6xl font-thin sm:text-4xl">Settings</h1>
      <Settings username={username} />
    </>
  );
};

export default page;
