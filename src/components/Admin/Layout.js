"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Layout = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user.isAdmin;

  if (!isAdmin) {
    return (
      <div>
        <h1>Not admin</h1>
      </div>
    );
  } else {
    return (
      <div className="w-full h-[calc(100vh-5rem)] dark:bg-gradient-to-tl dark:from-photeradark-950 dark:via-photeradark-800 dark:to-photeradark-400 p-2 rounded-l-lg text-3xl">
        <h1>Admin {session?.user?.username}</h1>
        <div className="w-full flex justify-center items-center mt-5">
          <div className="grid grid-cols-3 w-full place-content-center place-items-center">
            <Link
              href={"/sudo/categories/new"}
              className="border-2 border-photeradark-300 w-7/12 h-52 rounded-xl flex justify-center items-center text-xl text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-56 h-56">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
              New categories
            </Link>

            <div className="border-2 border-gray-500 w-7/12 h-52 rounded-xl">
              links
            </div>
            <div className="border-2 border-gray-500 w-7/12 h-52 rounded-xl">
              links
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Layout;
