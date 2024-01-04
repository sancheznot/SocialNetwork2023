"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GoBackButton from "../GoBackButton";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { set } from "mongoose";


const BansUsers = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [userList, setUserList] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const usersList = async () => {
      const res = await axios.get("/api/user/userslist", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setUserList(res.data);
    };
    usersList();
  }, []);

  const getUserData = (e) => {
    setUserId(e.target.value);
   
  };

  const handleEmail = () => {
    userList.map((user) => {
      if (user._id === userId) {
        setEmail(user.email);
        setUsername(user.username);
      }
    });
  }

  useEffect(() => {
    handleEmail();
  }, [userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await axios.post("/api/admin/bans", {
      username: username,
      email: email,
      reason: reason,
    });
    if (saved) {
      setSuccess(saved.data.message);
      setUsername("");
      setEmail("");
      setReason("");
      setUserId("");
    } else {
      setError(saved.data.message);
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col  items-center dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg ">
      <h1 className="self-start text-3xl font-light">Bans Users</h1>
      <h3>{error}</h3>
      <h3>{success}</h3>
      <div className="h-full w-full flex justify-center items-start">
        <div className="dark:bg-photeradark-200 w-7/12 sm:w-11/12 flex justify-center items-start rounded-lg text-photeradark-950">
          <form className="w-5/12 sm:w-11/12 flex flex-col gap-4 justify-center mt-4 text-2xl dark:text-white">
            <div className="w-full flex flex-col">
              <label
                htmlFor="username"
                className="text-base dark:text-photeradark-900">
                Username
              </label>
              <Select
                name="username"
                label="Username to ban"
                value={username}
                className="dark:text-white"
                onChange={getUserData}>
                {userList.map((user) => (
                  <SelectItem
                    key={user._id}
                    value={username}
                    >
                    {user.username}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="email"
                className="text-base dark:text-photeradark-900">
                Email
              </label>
              <Input
                type="text"
                label="Email"
                name="email"
                className="dark:text-white"
                value={email}
                disabled={true}
              />
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="reason"
                className="text-base dark:text-photeradark-900">
                Reason
              </label>
              <Input
                type="text"
                label="Reason"
                name="reason"
                className="dark:text-white"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </div>
            <Button onClick={handleSubmit} color="primary" className="">
              Ban User
            </Button>
            <div className="mb-2">
              {error && (
                <div className="bg-red-500 p-1 text-base rounded-md flex justify-center items-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500 p-1 text-base rounded-md flex justify-center items-center">
                  {success}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <GoBackButton />
    </div>
  );
};

export default BansUsers;
