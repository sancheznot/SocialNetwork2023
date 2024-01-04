import { useSession } from "next-auth/react";
import React from "react";
import NavGreetingBar from "./NavGreetingBar";

const Greeting = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full col-span-12 dark:bg-gradient-to-tl flex flex-col gap-2 dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg h-full text-3xl">
      <p className="text-2xl">Welcome {session?.user.username}</p>
      <NavGreetingBar />
    </div>
  );
};

export default Greeting;
