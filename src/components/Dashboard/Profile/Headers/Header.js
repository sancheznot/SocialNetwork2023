import React, { useEffect, useState } from "react";
import PhotoProfile from "./PhotoProfile";
import PhotoToShow from "./PhotoToShow";
import LeyendProfile from "./LeyendProfile";
import axios from "axios";
import Follows from "./Follows";
import Image from "next/image";
import logoPhotera from "@pb/img/nobgLogo.png";
import { useSession } from "next-auth/react";
import { get } from "mongoose";

const Header = ({ username }) => {
  // user data of the user in session
  const { data: session } = useSession();
  const [userInSession, setUserInSession] = useState(session?.user.username);
  const [isUser, setIsUser] = useState(false);
  // user data of the user profile
  const [userProfileID, setUserProfileID] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userImageToshow, setUserImageToshow] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userLeyend, setUserLeyend] = useState("");
  const [userFavPhoto, setUserFavPhoto] = useState("");
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    if (!username) return;
    const getUserData = async () => {
      try {
        const res = await axios.get(`/api/user/profile/${username}`);
        setUserProfileID(res.data.user._id);
        setUserImage(res.data.user.image);
        setUserImageToshow(res.data.user.imageProfileView);
        setUserName(res.data.user.name);
        setUserLastName(res.data.user.lastname);
        setUserFollowers(res.data.user.followers);
        setUserFollowing(res.data.user.following);
        setUserLeyend(res.data.user.leyend);
        setUserFavPhoto(res.data.user.photoFav.length);
      } catch (error) {
        return error;
      }
    };
    getUserData();
    if (userInSession === username) {
      setIsUser(true);
    }
    if (!updateData) {
      getUserData();
    }
  }, [username, userInSession, updateData]);

  return (
    <div className="flex flex-col gap-9 sm:gap-5">
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <PhotoToShow userimageToshow={userImageToshow} />
        <PhotoProfile imageProfile={userImage} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row gap-2 font-light text-xl sm:text-lg">
          <h4>{userName}</h4>
          <h4>{userLastName}</h4>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="relative w-6 h-6">
            <Image src={logoPhotera} alt={logoPhotera}></Image>
          </div>
          <p className="sm:text-sm">{username}</p>
        </div>
        <LeyendProfile leyendProfile={userLeyend} />
        <Follows
          userProfileID={userProfileID}
          setUpdateDataProfile={setUpdateData}
          updateDataProfile={updateData}
          followers={userFollowers}
          following={userFollowing}
          userfav={userFavPhoto}
          userinSession={userInSession}
          isUser={isUser}
          username={username}
        />
      </div>
    </div>
  );
};

export default Header;
