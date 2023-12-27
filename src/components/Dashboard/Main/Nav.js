import Link from "next/link";
import React from "react";

const Nav = ({ session }) => {
  return (
    <div>
      <Link href="/dashboard">Dashboard</Link>
      {session?.user?.isAdmin && <Link href="/sudo">Admin</Link>}
    </div>
  );
};

export default Nav;
