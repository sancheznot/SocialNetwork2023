import { Button } from "@nextui-org/react";
import axios from "axios";
import React from "react";

const Follows = ({
  followers,
  following,
  userfav,
  isUser,
  username,
  userenSession,
}) => {
  const saveFollow = async () => {
    try {
      const res = await axios.post(`/api/user/follows/${username}`, {
        usernameInsession: userenSession,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="sm:hidden">
          <Button
            onPress={() => {
              saveFollow();
            }}
            onClick={() => {
              saveFollow();
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
              saveFollow();
            }}
            radius="full"
            size="sm"
            className="bg-gradient-to-tr from-photeradark-500 to-photeradark-300 text-white shadow-lg">
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Follows;
