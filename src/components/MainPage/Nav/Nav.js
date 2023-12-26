"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.js";
import { ThemeSwitcher } from "@/components/NextTheme/ThemeSwitcher.js";

export default function App() {
  return (
    <Navbar isBordered>
      <div className="flex flex-row justify-around lg:justify-between md:w-11/12 items-center w-full">
        <NavbarBrand>
          <AcmeLogo />
          <Link className="font-bold text-inherit" href="/">
            Photera
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end" className="gap-2">
          <NavbarItem className="flex">
            <Link href="login" className="sm:text-sm">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="register" variant="flat" className="sm:text-sm">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
