import axios from "axios";
import React, { useEffect, useState } from "react";
import FollowingCard from "./FollowingCard";

const Following = ({ session }) => {
  const userinSession = session?.user.username;
  const [followsUserInSession, setFollowsUserInSession] = useState([]);

  // function to get follows of user in session from the database
  useEffect(() => {
    const getFollows = async () => {
      try {
        const res = await axios.get(`/api/user/userinsession/${userinSession}`);
        setFollowsUserInSession(res.data.following);
      } catch (error) {
        console.log(error);
      }
    };
    if (!userinSession) return;
    getFollows();
  }, [userinSession]);

  return (
    <div>
      <FollowingCard arrayID={followsUserInSession} />
    </div>
  );
};

export default Following;
