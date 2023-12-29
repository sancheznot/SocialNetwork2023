"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BansUsers = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [userList, setUserList] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const usersList = async () => {
      const res = await axios.get("/api/user/userslist");
      setUserList(res.data);
    };
    usersList();
  }, []);

  const getUserEmail = () => {
    userList.map((user) => {
      if (user.username === username) {
        setEmail(user.email);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await axios.post("/api/admin/bans", {
      username: username,
      email: email,
      reason: reason,
    });
    console.log(saved)
    if (saved) {
      setSuccess("User banned successfully");
    } else {
      setError("Sorry Error");
    }
  };

  return (
    <div>
      <h1>Bans Users</h1>
      <h3>{error}</h3>
      <h3>{success}</h3>
      <form>
        <select
          onClick={getUserEmail}
          onChange={(e) => {
            setUsername(e.target.value);
          }}>
          <option value="">Select User</option>
          {userList.map((user) => (
            <option key={user._id}>{user.username}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Email"
          value={userList.map((user) => {
            if (user.username === username) {
              return user.email;
            }
          })}
          disabled={true}
        />
        <input
          type="text"
          placeholder="Reason"
          onChange={(e) => {
            setReason(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default BansUsers;
