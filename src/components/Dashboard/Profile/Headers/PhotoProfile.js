import { Avatar, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PhotoProfile = ({ imageProfile, userInSession, isUser, settingMode }) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={
          pathname === `/profile/${userInSession}/settings`
            ? "flex justify-center items-center absolute top-80 right-[47rem] lg:right-[22rem] xl:right-[30rem]  sm:top-48 sm:right-36"
            : "flex justify-center items-center absolute top-64 right-[46.5rem] lg:right-[22rem] xl:right-[30rem]  sm:top-36 sm:right-[8.5rem]"
        }>
        <div className="w-20 h-20 sm:w-20 sm:h-20 relative overflow-hidden">
          {isUser && settingMode ? (
            <Tooltip
              key={"foreground"}
              color={"foreground"}
              size="sm"
              delay={0}
              closeDelay={0}
              motionProps={{
                variants: {
                  exit: {
                    opacity: 0,
                    transition: {
                      duration: 0.1,
                      ease: "easeIn",
                    },
                  },
                  enter: {
                    opacity: 1,
                    transition: {
                      duration: 0.15,
                      ease: "easeOut",
                    },
                  },
                },
              }}
              content={"Edit Profile Picture"}
              className="capitalize">
              <Link
                href={`/profile/${userInSession}/updates/avatar`}
                className="absolute bottom-4 right-4 z-20 bg-slate-200 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-black">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </Link>
            </Tooltip>
          ) : (
            <></>
          )}
          <Avatar
            src={imageProfile}
            alt="profile"
            layout="fill"
            objectFit="contain"
            size="lg"
            className="shadow-sm shadow-photeradark-400 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </>
  );
};

export default PhotoProfile;
