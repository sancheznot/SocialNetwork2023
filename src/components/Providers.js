"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { WrapperMotion } from "./FrameMotion/WrapperMotion";

const Provider = ({ children, session }) => {
  return (
    <WrapperMotion>
      <NextUIProvider className="w-full h-full">
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <SessionProvider session={session}>{children}</SessionProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </WrapperMotion>
  );
};

export default Provider;
