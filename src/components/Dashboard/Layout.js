"use client";
import React from "react";
import { useSession } from "next-auth/react";
import SideNav from "./Main/SideNav";

const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      <SideNav session={session} />
      {children}  
    </div>
  );
};

export default Layout;
