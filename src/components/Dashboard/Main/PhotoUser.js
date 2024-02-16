import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";

export function PhotoUser({ session }) {
  const photouser = session?.user?.image;
  const username = session?.user?.username;
  
  const [userProfileID, setUserProfileID] = useState("");
  const [userImage, setUserImage] = useState("");
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    if (!username) return;
    const getUserData = async () => {
      try {
        const res = await axios.get(`/api/user/profile/${username}`);
        setUserProfileID(res.data.user._id);
        setUserImage(res.data.user.image);
      } catch (error) {
        return error;
      }
    };
    getUserData();
    if (!updateData) {
      getUserData();
    }
  }, [username, updateData]);


  return (
    <div className="flex gap-4 items-center justify-center mt-2">
      <Link href={`/profile/${username}`}>
        <Avatar
          src={userImage}
          size="lg"
          className="sm:w-12 sm:h-12 mb-2"
          isBordered
          color="secondary"
        />
      </Link>
    </div>
  );
}
export default PhotoUser;
