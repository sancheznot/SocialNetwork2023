import React from "react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

export function PhotoUser({ session }) {
  const photouser = session?.user?.image;
  const username = session?.user?.username;
  return (
    <div className="flex gap-4 items-center justify-center mt-2">
      <Link href={`/profile/${username}`}>
        <Avatar
          src={photouser}
          size="lg"
          className="sm:w-12 sm:h-12 mb-2"
          isBordered
          color="secondary"
        />
      </Link>
    </div>
  );
}
export default PhotoUser;
