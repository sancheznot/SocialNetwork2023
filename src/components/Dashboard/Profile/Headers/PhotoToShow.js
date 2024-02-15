import Image from "next/image";
import Link from "next/link";
import React from "react";

const PhotoToShow = ({ userimageToshow, userInSession, isUser }) => {
  console.log(isUser);
  return (
    <div className="flex justify-center items-center mt-4 w-full">
      <div className="w-6/12 sm:w-11/12 h-52 sm:h-32 bg-gray-200 rounded-lg relative  overflow-hidden">
        {isUser ? (
          <Link
            href={`/profile/${userInSession}/updates/mainphoto`}
            className="absolute bottom-0 right-0 z-20 bg-slate-200 rounded-tl-xl p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-black">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Link>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-black absolute bottom-0 right-0 z-20">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </>
        )}
        <Image
          src={userimageToshow}
          alt="profile"
          className="w-20 h-20"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default PhotoToShow;
