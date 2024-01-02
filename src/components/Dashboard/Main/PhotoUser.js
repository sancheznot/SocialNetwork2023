import Image from "next/image";
import React from "react";
import { Avatar } from "@nextui-org/react";

export function PhotoUser({ session }) {
  const photouser = session?.user?.image;
  return (
    <div className="flex gap-4 items-center justify-center mt-2">
      <Avatar src={photouser} size="lg" isBordered color="secondary"/>
    </div>
  );
}
export default PhotoUser;
