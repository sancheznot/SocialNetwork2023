import React from "react";
import Header from "../Headers/Header";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Settings = ({ username }) => {
  const { data: session } = useSession();
  const userInSession = session?.user.username;
  if (username !== userInSession) {
    return (
      <>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-extrabold text-center">Unauthorized</h1>
          <p className="text-2xl font-light text-center">
            You are not authorized to view this page
          </p>
          <Button color="warning" className="mt-5">
            <Link href={"/dashboard"} >Go to dashboard</Link>
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <Header username={username} />
    </>
  );
};

export default Settings;
