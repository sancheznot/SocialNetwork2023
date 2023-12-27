import React from "react";
import Nav from "./Nav";

const SideNav = ({ session }) => {
  return (
    <div className="bg-white w-2/12 h-dvh">
      <Nav session={session} />
      Este es el side
    </div>
  );
};

export default SideNav;
