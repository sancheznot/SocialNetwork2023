import "./globals.css";
import Provider from "@/components/Providers";
import Nav from "@/components/MainPage/Nav/Nav";
import Head from "next/head";

export const metadata = {
  title: "Photo gallery",
  description: "Photo gallery with nextjs and tailwindcss",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-dvh">
      
      <body className="w-full h-full bg-gradient-to-tl from-[#e9f4f9] dark:from-[#072B4A] dark:via-[#031f33] via-[#E4EEF2] to-[#FFFFFF] dark:to-[#000000]">
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
