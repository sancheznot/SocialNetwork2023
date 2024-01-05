import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CardSkeleton } from "@/components/NextUI/CardSkeleton";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      const res = await axios.get("/api/user/userslist");
      console.log(res, "user");
      setUsers(res.data);
    };
    const getFeed = async () => {
      const res = await axios.get("/api/user/uploads/publication");
      console.log(res, "publication");
      setFeed(res.data.photos);
    };
    getUser();
    getFeed();
  }, []);

  useEffect(() => {
    if (feed.length > 0) {
      setIsLoading(false);
    }
  }, [feed]);

  return (
    <div className="grid w-full overflow-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5 gap-4 p-4">
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {feed.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg relative">
              <div className="relative w-full h-60">
                {/* Utilizamos el componente Image de Next.js para optimización */}
                <Image
                  src={item.url}
                  layout="fill"
                  objectFit="cover"
                  alt={item.title}
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>

              {users.map(
                (user) =>
                  user._id === item.user && (
                    <div
                      key={user._id}
                      className="absolute w-full sm:top-52 top-48 bg-transparent p-1 flex flex-col justify-center items-center">
                      <div className="w-14 h-14 relative">
                        <Image
                          src={user.image}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full shadow-sm shadow-photeradark-400"
                          alt="User profile"
                        />
                      </div>
                      <h2 className="text-sm font-medium dark:text-photeradark-900">
                        {user.username}
                      </h2>
                    </div>
                  )
              )}
              {/* Información del usuario y título */}
              <div className="p-4 mt-5 sm:mt-6 xl:mt-3">
                <p className="text-gray-600 font-light text-lg text-justify">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
