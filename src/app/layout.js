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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>
      <body className="w-full h-full touch-manipulation bg-gradient-to-tl from-[#e9f4f9] dark:from-[#072B4A] dark:via-[#031f33] via-[#E4EEF2] to-[#FFFFFF] dark:to-[#000000]">
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
