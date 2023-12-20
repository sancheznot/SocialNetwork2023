import Link from "next/link";
import React from "react";

const Nav = ({ Session }) => {
  return (
    <div>
      <Link href="/dashboard">Dashboard</Link>
      {Session?.user?.isAdmin && <Link href="/sudo">Admin</Link>}
    </div>
  );
};

export default Nav;
