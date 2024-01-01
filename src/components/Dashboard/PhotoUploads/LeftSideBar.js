import ProgressBar from "@/components/NextUI/ProgressBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <div
      className="bg-gradient-to-tl dark:from-photeradark-900 dark:via-photeradark-800 dark:to-photeradark-700 
    w-full col-span-3 rounded-lg h-[calc(100vh-15rem)] mt-2 overflow-auto flex flex-col justify-between">
      <div className=" w-full text-lg flex flex-col gap-5 mt-2 justify-center items-start ml p-3">
        <Link
          href="/upload"
          className="w-full h-64 border border-photeradark-300 shadow-xl shadow-black/20 bg-white/80 text-black rounded-xl flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <h4 className="font-medium">Add Images</h4>
        </Link>
        <div className="w-full h-32 border border-photeradark-300 shadow-xl shadow-black/20 bg-white/80 rounded-xl text-black flex flex-col justify-between p-2">
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
