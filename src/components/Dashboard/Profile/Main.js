"use client";
import React from "react";
import Header from "./Headers/Header";
import FeedCardUser from "./Feed/FeedCardUser";

const Main = ({ username }) => {
  if (!username) return <div className="text-5xl">No user</div>;

  return (
    <>
      <Header username={username} />
      <div className=" w-full scroll-smooth scrollbar-hide overflow-auto h-[calc(100vh-31rem)] sm:h-[calc(100vh-28rem)] mt-2">
        <FeedCardUser username={username} />
      </div>
    </>
  );
};

export default Main;
