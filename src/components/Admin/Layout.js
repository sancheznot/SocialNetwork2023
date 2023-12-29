"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import GoBackButton from "./GoBackButton";

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
        <div className="w-full flex flex-col justify-center items-center mt-5">
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

            <Link
              href={"/sudo/blacklist/"}
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
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>
              Blacklist
            </Link>

            <Link
              href={"/sudo/blacklist/newban"}
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
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              New ban
            </Link>
          </div>
        <GoBackButton />
        </div>
      </div>
    );
  }
};

export default Layout;
