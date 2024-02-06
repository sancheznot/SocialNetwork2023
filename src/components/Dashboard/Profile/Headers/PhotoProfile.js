import Image from "next/image";
import React from "react";

const PhotoProfile = ({ imageProfile }) => {
  return (
    <>
      <div className="flex justify-center items-center absolute top-60 sm:top-36">
        <div className="w-20 h-20 sm:w-14 sm:h-14 relative overflow-hidden">
          <Image
            src={imageProfile}
            alt="profile"
            layout="fill"
            objectFit="contain"
            className="rounded-full shadow-sm shadow-photeradark-400"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </>
  );
};

export default PhotoProfile;
