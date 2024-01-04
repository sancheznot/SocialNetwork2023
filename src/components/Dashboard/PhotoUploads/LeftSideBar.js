import ProgressBar from "@/components/NextUI/ProgressBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <div
      className="bg-gradient-to-tl dark:from-photeradark-900 dark:via-photeradark-800 dark:to-photeradark-700 
    w-full col-span-3 sm:col-span-12 sm:order-1 rounded-lg h-[calc(100vh-16rem)] sm:h-[calc(100vh-26rem)] mt-2 overflow-auto flex flex-col justify-between">
      <div className=" w-full text-lg flex flex-col gap-5 mt-2 justify-center items-start ml p-3">
        <Link
          href="/upload"
          className="w-full h-64 sm:h-20 border border-photeradark-300 shadow-xl shadow-black/20 bg-white/80 text-black rounded-xl flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 sm:w-6 sm:h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>

          <h4 className="font-medium sm:text-sm">Add Images</h4>
        </Link>
        <div className="w-full h-32 sm:h-24 border border-photeradark-300 shadow-xl shadow-black/20 bg-white/80 rounded-xl text-black flex flex-col justify-between p-2">
          <div className="flex flex-row justify-between items-center">
            <h4> Free space</h4>
            <h4>25%</h4>
          </div>
          <div className="w-full rounded-xl flex flex-col justify-between p-2">
            <ProgressBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
