import React, { useEffect, useState } from "react";
import PhotoProfile from "./PhotoProfile";
import PhotoToShow from "./PhotoToShow";
import LeyendProfile from "./LeyendProfile";
import axios from "axios";
import Follows from "./Follows";
import Image from "next/image";
import logoPhotera from "@pb/img/nobgLogo.png";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";

const Header = ({ username }) => {
  // user data of the user in session
  const { data: session } = useSession();
  const [userInSession, setUserInSession] = useState("");

  useEffect(() => {
    if (!session) return;
    const getUserData = async () => {
      const user = await axios.post(`/api/user/userbyids/`, {
        ids: session?.user._id,
      });
      const usernameupdate = user?.data.users.map((user) => user.username);
      setUserInSession(usernameupdate);
    };
    getUserData();
  }, [session]);

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
        setUserImageToshow(res.data.user.profilephoto);
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

  useEffect(() => {
    if (!username || !userInSession) {
      setUserInSession(session?.user.username);
    }
    if (userInSession === username) {
      setIsUser(true);
    }
  }, [username, userInSession, session?.user.username]);

  return (
    <div className="flex flex-col gap-9 sm:gap-5">
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        <PhotoToShow
          userimageToshow={userImageToshow}
          userInSession={userInSession}
          isUser={isUser}
        />
        <PhotoProfile
          imageProfile={userImage}
          userInSession={userInSession}
          isUser={isUser}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row gap-2 font-light text-xl sm:text-lg">
          {isUser ? (
            <div className="flex flex-row justify-center items-center ml-5  gap-1">
              <h4 className="first-letter:uppercase">{userName}</h4>
              <h4 className="first-letter:uppercase">{userLastName}</h4>
              <Tooltip
                key={"foreground"}
                color={"foreground"}
                size="sm"
                content={"Edit Names"}
                className="capitalize">
                <Link
                  href={`/profile/${userInSession}/updates/names`}
                  className="bg-slate-200 rounded-full h-5 w-5 hover:scale-150 flex justify-center items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 hover:scale-125 text-black">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
              </Tooltip>
            </div>
          ) : (
            <>
              <h4>{userName}</h4>
              <h4>{userLastName}</h4>{" "}
            </>
          )}
        </div>
        <div className="flex flex-row justify-center items-center">
          {isUser ? (
            <div className="flex flex-row justify-center items-center ml-5  gap-1">
              <div className="relative w-6 h-6">
                <Image src={logoPhotera} alt={logoPhotera}></Image>
              </div>
              <p className="sm:text-sm">{username}</p>
              <Tooltip
                key={"foreground"}
                color={"foreground"}
                size="sm"
                content={"Edit Username"}
                className="capitalize">
                <Link
                  href={`/profile/${userInSession}/updates/username`}
                  className="bg-slate-200 rounded-full h-5 w-5 hover:scale-125 flex justify-center items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 hover:scale-105 text-black">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
              </Tooltip>
            </div>
          ) : (
            <>
              <div className="relative w-6 h-6">
                <Image src={logoPhotera} alt={logoPhotera}></Image>
              </div>
              <p className="sm:text-sm">{username}</p>
            </>
          )}
        </div>
        {isUser ? (
          <div className="flex flex-row justify-center items-center ml-5  gap-1">
            <LeyendProfile leyendProfile={userLeyend} />

            <Tooltip
              key={"foreground"}
              color={"foreground"}
              size="sm"
              content={"Edit leyend"}
              className="capitalize">
              <Link
                href={`/profile/${userInSession}/updates/leyend`}
                className="bg-slate-200 rounded-full h-5 w-5 hover:scale-125 flex justify-center items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 hover:scale-105 text-black">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </Link>
            </Tooltip>
          </div>
        ) : (
          <>
            <LeyendProfile leyendProfile={userLeyend} />
          </>
        )}
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
