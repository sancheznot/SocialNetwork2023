import { Avatar } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FollowingCard = ({ arrayID }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (arrayID.length <= 0) return;
    const getFollowing = async () => {
      try {
        const res = await axios.post(`/api/user/userbyids`, { ids: arrayID });
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowing();
  }, [arrayID]);

  return (
    <>
      <div className="grid w-full overflow-auto grid-cols-12 place-content-center place-items-center gap-4">
        {users.map((user) => {
          return (
            <Link
              href={`/profile/${user.username}`}
              key={user._id}
              className="col-span-3 overflow-hidden lg:col-span-4 sm:col-span-6  rounded-lg w-full flex flex-col dark:bg-gradient-to-tl gap-2 dark:from-photeradark-900 dark:via-photeradark-800 dark:to-photeradark-400 bg-gradient-to-tl from-slate-200 via-slate-300 to-slate-400">
              <div className="flex flex-row justify-between items-center">
                <div className="w-6/12 p-1">
                  <div className="w-14 h-14 sm:w-11 sm:h-11 relative overflow-hidden">
                    <Avatar
                      src={user.image}
                      alt="profile"
                      layout="fill"
                      objectFit="contain"
                      size="lg"
                      className="rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="w-6/12d p-1 mr-4 text-xl sm:text-lg font-light">
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="w-full flex flex-row text-sm p-1 items-center text-center">
                <div className="w-6/12">Followers:{user.followers.length}</div>
                <div className="w-6/12">followings:{user.following.length}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default FollowingCard;
