import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NavGreetingBar from "./NavGreetingBar";
import FavoritesPublic from "../Favorites/FavoritesPublic";
import { usePathname } from "next/navigation";
import axios from "axios";

const Greeting = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!session) return;
    const getUserData = async () => {
      const user = await axios.post(`/api/user/userbyids/`, {
        ids: session?.user._id,
      });
      const username = user?.data.users.map((user) => user.username);
      setUser(username);
    };
    getUserData();
  }, [session]);
  return (
    <div className="w-full col-span-12 dark:bg-gradient-to-tl flex flex-col gap-2 dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg h-full text-3xl">
      <p className="text-2xl">Welcome {user}</p>
      {pathName === "/dashboard" && <NavGreetingBar session={session} />}
      {pathName === "/favorite" && <FavoritesPublic session={session} />}
    </div>
  );
};

export default Greeting;
