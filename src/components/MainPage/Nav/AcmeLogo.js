import Image from "next/image";
import React from "react";
import logo from "@pb/img/nobgLogo.png";
export const AcmeLogo = () => (
  <div className="w-16 h-20">
    <Image src={logo} alt="logo" />
  </div>
);
