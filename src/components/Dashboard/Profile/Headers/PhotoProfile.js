import Image from "next/image";
import React from "react";

const PhotoProfile = ({ imageProfile }) => {
  return (
    <>
      <div className="flex justify-center items-center absolute top-60 sm:top-36">
        <div className="w-20 sm:w-16 bg-gray-200 rounded-full">
          <Image
            src={imageProfile}
            alt="profile"
            width={100}
            height={100}
            className=" rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default PhotoProfile;
