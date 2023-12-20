"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Layout = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.isAdmin;
  if (!isAdmin) {
    return (
      <div>
        <h1>Not admin</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Admin</h1>
      </div>
    );
  }
};

export default Layout;
