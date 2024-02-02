import { Button } from "@nextui-org/react";
import React from "react";

const Follows = ({ follower, following }) => {
  return (
  <div className="flex flex-col justify-center items-center gap-2 mt-1">
      <div className="flex flex-row gap-2">
      <p className="text-sm">12{follower} Followers </p>
      <p className="font-light">·</p>
      <p className="text-sm">0 {following} Following</p>
    </div>
    <div className="sm:hidden">
        <Button radius="full" className="bg-gradient-to-tr from-photeradark-500 to-photeradark-300 text-white shadow-lg">Follow</Button>
    </div>
    <div className="smm:hidden">
        <Button radius="full" size="sm" className="bg-gradient-to-tr from-photeradark-500 to-photeradark-300 text-white shadow-lg">Follow</Button>
    </div>
  </div>
  );
};

export default Follows;
