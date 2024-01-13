"use client";
import React from "react";
import Nav from "./Nav";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PhotoUser from "./PhotoUser";

const SideNav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <div
        className="bg-gradient-to-tl lg:hidden dark:from-photeradark-900 dark:via-photeradark-800 dark:to-photeradark-700 
    w-11/12 col-span-2 rounded-tr-lg h-[calc(100vh-5rem)] overflow-auto flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <PhotoUser session={session} />
          <Nav session={session} />
        </div>
        <div className=" w-full text-lg flex flex-col gap-2  mt-2 justify-center items-start ml">
          <Link
            href="/dashboard/profile"
            className={
              pathname === "/dashboard/profile"
                ? "flex flex-row gap-4 font-bold justify-start p-2 dark:bg-photeradark-400 dark:text-white rounded-l-xl w-11/12 self-end"
                : "flex flex-row gap-4 font-light justify-start p-2  dark:text-white rounded-l-xl w-11/12 self-end"
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Setting
          </Link>
          <button
            onClick={() => {
              signOut();
            }}
            className="flex flex-row gap-4 font-light justify-start items-center p-2 dark:text-white rounded-l-xl w-11/12 self-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>

      {/* phone and tablets */}
      <div
        className="bg-gradient-to-tl lgg:hidden dark:from-photeradark-900 dark:via-photeradark-800 dark:to-photeradark-700 
    w-full col-span-12 rounded-tr-lg h-16 overflow-auto flex flex-row justify-center items-center absolute bottom-0 z-20">
        <div className="flex flex-row gap-5">
          <Nav session={session} />
        </div>
      </div>
    </>
  );
};

export default SideNav;
