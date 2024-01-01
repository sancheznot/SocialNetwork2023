import Image from "next/image";
import React from "react";
import { Avatar } from "@nextui-org/react";

export function PhotoUser({ session }) {
  const photouser = session?.user?.image;
  return (
    <div className="flex gap-4 items-center justify-center mt-2">
      {/* <Avatar src={photouser} className="w-6 h-6 text-tiny" /> */}
      {/* <Avatar src={photouser} size="sm" /> */}
      {/* <Avatar src={photouser} size="md" /> */}
      <Avatar src={photouser} size="lg" isBordered color="secondary"/>
      {/* <Avatar src={photouser} className="w-20 h-20 text-large" /> */}
    </div>
  );
}
export default PhotoUser;
