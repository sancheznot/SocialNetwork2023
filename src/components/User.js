"use client";
import React from "react";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  
  return (
    <>
      
    </>
  );
};

export default User;
