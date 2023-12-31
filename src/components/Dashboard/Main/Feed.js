import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/api/user/userslist");
      setUsers(res.data);
    };
    const getFeed = async () => {
      const res = await axios.get("/api/user/uploads/publication");
      console.log(res.data);
      setFeed(res.data.photos);
    };
    getUser();
    getFeed();
  }, []);

  console.log(users.map((user) => user.username));
  return (
    <div className="w-full col-span-9 h-[calc(100vh-10rem)] gap-2 mt-2 grid grid-cols-5 grid-rows-6 items-start dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-lg text-3xl">
      {feed.map((feed) => (
        <div
          key={feed._id}
          className="border border-photeradark-400 w-full h-full row-span-2">
          <div className="w-full h-full relative">
            <Image
              src={feed.url}
              alt="feed"
              layout="fill"
              objectFit="cover"
              className=""
            />
            <div className="absolute z-10 flex flex-col justify-between items-center w-full h-full">
              <h1 className="text-base font-light ">{feed.title}</h1>
              {users.map(
                (user) =>
                  user._id === feed.user && (
                    <div className="flex flex-col justify-center items-center " key={user._id}>
                      <Image
                        src={user.image}
                        alt="imageprofile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <h1 className="text-base font-light ">{user.username}</h1>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
