import { useSession } from "next-auth/react";
import React from "react";

const Greeting = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg h-16 text-3xl">
      Bienvenido {session?.user.username}
    </div>
  );
};

export default Greeting;
