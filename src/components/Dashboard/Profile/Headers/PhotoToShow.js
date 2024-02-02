import Image from "next/image";
import React from "react";

const PhotoToShow = ({ userimageToshow }) => {
  return (
    <div className="flex justify-center items-center mt-4 w-full">
      <div className="w-6/12 sm:w-11/12 h-52 sm:h-32 bg-gray-200 rounded-lg">
        <Image src={userimageToshow} alt="profile" className="w-20 h-20 " />
      </div>
    </div>
  );
};

export default PhotoToShow;
