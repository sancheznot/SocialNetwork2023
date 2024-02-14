"use client";
import MainImageUpdate from "@/components/Dashboard/Profile/Updates/MainImageUpdate";
import React from "react";

const page = ({params}) => {
  const {username} = params
  return (
    <div>
      <MainImageUpdate username={username} />
    </div>
  );
};

export default page;
