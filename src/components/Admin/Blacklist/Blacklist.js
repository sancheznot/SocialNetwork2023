"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GoBackButton from "../GoBackButton";
import { useSession } from "next-auth/react";

const Blacklist = () => {
  const { data: session } = useSession();

  const [blakList, setBlackList] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session) {
      setIsAdmin(session.user.isAdmin);
    }
    const blacklists = async () => {
      const res = await axios.get("/api/admin/bans", {
        headers: { Authorization: `Admin ${isAdmin}` },
      });
      setBlackList(res.data.blacklist);
    };
    if (isAdmin) {
      blacklists();
    }
  }, [isAdmin, session]);

  const removeOftheList = async (e, username) => {
    e.preventDefault();
    const sendUsername = await axios.delete("/api/admin/bans", {
      data: { username: username },
    });
    if (sendUsername) {
      setSuccess(sendUsername.data.message);
    } else {
      setError(sendUsername.data.message);
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col  items-center dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg ">
      <h3>{error}</h3>
      <h3>{success}</h3>
      <h1 className="self-start text-3xl font-light">BlackList</h1>
      <div className="h-full w-full mt-5 flex flex-col justify-start items-start">
        <div className="grid grid-cols-4 gap-1 w-full place-items-center">
          <h5 className="text-lg font-medium">Username</h5>
          <h5 className="text-lg font-medium">Email</h5>
          <h5 className="text-lg font-medium">Reason</h5>
          <h5 className="text-lg font-medium">Remove</h5>
        </div>
        {blakList?.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-4 row-auto border-2 place-items-center border-photeradark-500 w-full p-3">
            <h5 className="text-lg font-light ">{user.username}</h5>
            <h5 className="text-lg font-light ">{user.email}</h5>
            <h5>{user.reason}</h5>
            <button
              onClick={(e) => {
                removeOftheList(e, user.username);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <GoBackButton />
    </div>
  );
};

export default Blacklist;
