import { ThemeSwitcher } from "@/components/NextTheme/ThemeSwitcher";
import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row justify-center items-center  bg-gray-500 w-full ">
        <ThemeSwitcher />
        <h1 className="text-8xl text-[#121213] dark:text-white">Hola</h1>
        <Link href="/register" className="text-white text-xl mr-5">Sing-Up</Link>
        <Link href="/login" className="text-white text-xl">Sing-In</Link>
        <h1 className="text-5xl">Welcome to gallery</h1>
      </div>
    </div>
  );
}
