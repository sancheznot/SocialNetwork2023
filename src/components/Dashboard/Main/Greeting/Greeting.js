import { useSession } from "next-auth/react";
import React from "react";
import NavGreetingBar from "./NavGreetingBar";
import FavoritesPublic from "../Favorites/FavoritesPublic";
import { usePathname } from "next/navigation";

const Greeting = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  return (
    <div className="w-full col-span-12 dark:bg-gradient-to-tl flex flex-col gap-2 dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg h-full text-3xl">
      <p className="text-2xl">Welcome {session?.user.username}</p>
      {pathName === "/dashboard" && (
        <NavGreetingBar session={session} />
      )}
      {pathName === "/favorite" && (
        <FavoritesPublic session={session} />
      )}
    </div>
  );
};

export default Greeting;
