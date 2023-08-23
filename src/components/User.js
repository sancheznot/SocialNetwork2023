"use client";
import React from "react";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  
  console.log(session, "userS");
  return (
    <>
   
    </>
  );
};

export default User;
