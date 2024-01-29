"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WrapperMotion } from "./FrameMotion/WrapperMotion";
import { ChakraProvider } from "@chakra-ui/react";

const Provider = ({ children, session }) => {
  return (
    <WrapperMotion>
      <NextUIProvider className="w-full h-full">
        <NextThemesProvider attribute="class" defaultTheme="light">
          <ChakraProvider theme={"theme"}>
            <SessionProvider session={session}>{children}</SessionProvider>
          </ChakraProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </WrapperMotion>
  );
};

export default Provider;
