import Image from "next/image";
import React from "react";
import logo from "@pb/img/nobgLogo.png";
export const AcmeLogo = () => (
  <div className="w-16 sm:w-10 sm:h-10 h-20 flex justify-center items-center">
    <Image src={logo} alt="logo" />
  </div>
);
