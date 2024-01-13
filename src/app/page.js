import Image from "next/image";
import "tailwindcss/tailwind.css";
import image1 from "@pb/imageExample/asX.jpeg";
import image2 from "@pb/imageExample/car.jpeg";
import image3 from "@pb/imageExample/pc.jpeg";
import image4 from "@pb/imageExample/GrootWallpaper4K.jpeg";

export default function Home() {
  return (
    <div className="flex w-full flex-col h-[calc(100vh-5rem)] justify-center items-center">
      <h1 className="text-4xl md:text-xl font-light w-11/12 h-80  text-center flex justify-center items-center">
        Welcome to Photera go to register if you don&apos;t have account with us{" "}
      </h1>
      <div className="w-full h-80 grid grid-cols-12 lg:grid-cols-6 place-content-center place-items-center place-self-center">
        <div className="relative w-full h-full col-span-3 lg:col-span-3">
          {/* Utilizamos el componente Image de Next.js para optimización */}
          <Image src={image1} alt="asd" className="h-full w-full" />
        </div>
        <div className="relative w-full h-full  col-span-1 lg:col-span-3">
          {/* Utilizamos el componente Image de Next.js para optimización */}
          <Image src={image2} alt="asd" className="h-full w-full" />
        </div>
        <div className="relative w-full h-full  col-span-2 lg:col-span-4">
          {/* Utilizamos el componente Image de Next.js para optimización */}
          <Image src={image3} alt="asd" className="h-full" />
        </div>
        <div className="relative w-full h-full  col-span-1 lg:col-span-2">
          {/* Utilizamos el componente Image de Next.js para optimización */}
          <Image src={image4} alt="asd" className="h-full" />
        </div>
      </div>
    </div>
  );
}
