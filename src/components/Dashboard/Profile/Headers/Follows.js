import { Box, useToast } from "@chakra-ui/react";
import { Button, user } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Follows = ({
  userProfileID,
  setUpdateDataProfile,
  updateDataProfile,
  followers,
  following,
  userfav,
  isUser,
  username,
  userinSession,
}) => {
  const [followsUserInSession, setFollowsUserInSession] = useState([]);
  const [updateFollows, setUpdateFollows] = useState(false);
  const toast = useToast();
  // function to save follow
  const saveFollow = async () => {
    try {
      const res = await axios.post(`/api/user/follows/${username}`, {
        usernameInsession: userinSession,
      });
      if (res.status === 200) {
        setUpdateFollows(!updateFollows);
        setUpdateDataProfile(!updateDataProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to get follows of user in session from the database
  useEffect(() => {
    if (!userinSession) return;
    const getFollows = async () => {
      try {
        const res = await axios.get(`/api/user/userinsession/${userinSession}`);
        setFollowsUserInSession(res.data.following);
      } catch (error) {
        console.log(error);
      }
    };
    getFollows();
  }, [userinSession, updateFollows]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-1">
      <div className="flex flex-row gap-2">
        <p className="text-sm">
          {followers.length <= 0 ? "0" : followers.length} Followers
        </p>
        <p className="font-light">·</p>
        <p className="text-sm">
          {following.length <= 0 ? "0" : following.length} Following
        </p>
        <p className="font-light">·</p>
        <p className="text-sm">{userfav} Photos Fav</p>
      </div>
      <div className={isUser ? "hidden" : "block"}>
        {followsUserInSession?.includes(userProfileID) ? (
          <>
            <div className="sm:hidden">
              <Button
                onPress={() => {
                  saveFollow();
                }}
                onClick={() => {
                  toast({
                    title: `Unfollow ${username}!`,
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position: "top-right",
                    render: () => (
                      <Box className="bg-photeradark-700 p-3 sm:p-1 sm:py-3 rounded-xl flex flex-row justify-center gap-3 sm:mt-0 mt-20 items-center">
                        <div className="w-12 h-12 sm:w-6 sm:h-6 border border-photeradark-300 rounded-full text-lg flex justify-center items-center">
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
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </div>
                        <p className="text-lg sm:text-base">
                          {`Unfollow ${username}!`}
                        </p>
                      </Box>
                    ),
                  });
                }}
                radius="full"
                className="bg-gradient-to-tr from-photeradark-500 to-photeradark-300 text-white shadow-lg">
                Unfollow
              </Button>
            </div>
            <div className="smm:hidden">
              <Button
                onPress={() => {
                  saveFollow();
                }}
                onClick={() => {
                  toast({
                    title: `Unfollow ${username}!`,
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position: "top-right",
                    render: () => (
                      <Box className="bg-photeradark-700 p-3 sm:p-1 sm:py-3 rounded-xl flex flex-row justify-center gap-3 sm:mt-0 mt-20 items-center">
                        <div className="w-12 h-12 sm:w-6 sm:h-6 border border-photeradark-300 rounded-full text-lg flex justify-center items-center">
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
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </div>
                        <p className="text-lg sm:text-base">
                          {`Unfollow ${username}!`}
                        </p>
                      </Box>
                    ),
                  });
                }}
                radius="full"
                size="sm"
                className="bg-gradient-to-tr from-photeradark-500 to-photeradark-300 text-white shadow-lg">
                Unfollow
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="sm:hidden">
              <Button
                onPress={() => {
                  saveFollow();
                }}
                onClick={() => {
                  toast({
                    title: `Follow ${username}!`,
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position: "top-right",
                    render: () => (
                      <Box className="bg-photeradark-700 p-3 sm:p-1 sm:py-3 rounded-xl flex flex-row justify-center gap-3 sm:mt-0 mt-20 items-center">
                        <div className="w-12 h-12 sm:w-6 sm:h-6 border border-photeradark-300 rounded-full text-lg flex justify-center items-center">
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
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </div>
                        <p className="text-lg sm:text-base">
                          {`Follow ${username}!`}
                        </p>
                      </Box>
                    ),
                  });
                }}
                radius="full"
                className="bg-gradient-to-tr from-photeradark-500 to-photeradark-300 text-white shadow-lg">
                Follow
              </Button>
            </div>
            <div className="smm:hidden">
              <Button
                onPress={() => {
                  saveFollow();
                }}
                onClick={() => {
                  toast({
                    title: `Follow ${username}!`,
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position: "top-right",
                    render: () => (
                      <Box className="bg-photeradark-700 p-3 sm:p-1 sm:py-3 rounded-xl flex flex-row justify-center gap-3 sm:mt-0 mt-20 items-center">
                        <div className="w-12 h-12 sm:w-6 sm:h-6 border border-photeradark-300 rounded-full text-lg flex justify-center items-center">
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
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </div>
                        <p className="text-lg sm:text-base">
                          {`Follow ${username}!`}
                        </p>
                      </Box>
                    ),
                  });
                }}
                radius="full"
                size="sm"
                className="bg-gradient-to-tr from-photeradark-500 to-photeradark-300 text-white shadow-lg">
                Follow
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Follows;
