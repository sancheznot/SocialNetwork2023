"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import image1 from "@pb/imageExample/asX.jpeg";
import image2 from "@pb/imageExample/car.jpeg";
import image3 from "@pb/imageExample/pc.jpeg";
import image4 from "@pb/imageExample/GrootWallpaper4K.jpeg";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const Main = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const goDash = useRouter();

  useEffect(() => {
    if (session) {
      if (pathname === "/") {
        goDash.push("/dashboard");
      }
    }
  }, [session, pathname, goDash]);

  return (
    <div className="flex w-full flex-col h-[calc(100vh-5rem)] justify-center items-center">
      <div className="w-full h-[calc(100vh-1rem)] flex flex-col justify-center items-center ">
        <h1 className="text-5xl absolute z-10 text-white md:text-xl font-light w-11/12 text-center flex justify-center items-center">
          Welcome to Photera go to register if you don&apos;t have account with
          us{" "}
        </h1>
        <div className="grid blur-sm grid-cols-12  place-content-center place-items-center place-self-center">
          <div className="relative w-full h-full col-span-3 lg:col-span-6">
            {/* Utilizamos el componente Image de Next.js para optimización */}
            <Image src={image1} alt="asd" className="h-full w-full" />
          </div>
          <div className="relative w-full h-full  col-span-3 lg:col-span-6">
            {/* Utilizamos el componente Image de Next.js para optimización */}
            <Image src={image2} alt="asd" className="h-full w-full" />
          </div>
          <div className="relative w-full h-full  col-span-3 lg:col-span-7">
            {/* Utilizamos el componente Image de Next.js para optimización */}
            <Image src={image3} alt="asd" className="h-full" />
          </div>
          <div className="relative w-full h-full  col-span-3 lg:col-span-5">
            {/* Utilizamos el componente Image de Next.js para optimización */}
            <Image src={image4} alt="asd" className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
