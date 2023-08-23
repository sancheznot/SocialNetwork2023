// It is a User component that uses the session hook from next-auth/react to get the session data and show it in the console.
"use client";
import React from "react";
import { useSession } from "next-auth/react";

import Image from "next/image";

const User = () => {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="text-3xl">Bienvenido {session?.user?.name}</h1>
      <Image
        src={session?.user?.image}
        width={100}
        height={100}
        alt="profile"
        className="rounded-full"
      />
      <p>Username: {session?.user?.username}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Name: {session?.user?.name}</p>
      <p>Lastname: {session?.user?.lastname}</p>
      <p>Art: {session?.user?.art}</p>
      <p>User since: {session?.user?.createdAt}</p>
    </>
  );
};

export default User;
