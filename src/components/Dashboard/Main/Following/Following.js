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
    <div className="flex flex-col gap-2">
      <h3 className="font-extralight text-lg">
        Your following: ( {followsUserInSession.length} )
      </h3>
      <FollowingCard arrayID={followsUserInSession} />
    </div>
  );
};

export default Following;
