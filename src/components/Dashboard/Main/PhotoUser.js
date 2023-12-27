import Image from "next/image";
import React from "react";

const PhotoUser = ({ session }) => {
  const photouser = session?.user?.image;

  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-20 h-20 relative">
        <Image
          src={photouser}
          alt="logo"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default PhotoUser;
