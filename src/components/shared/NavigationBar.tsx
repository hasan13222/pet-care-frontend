"use client";
import React, { useContext, useEffect, useState } from "react";
import { NavigationMenuComp } from "./NavigationMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import avatar from "@/assets/images/man.png";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { AuthContext } from "@/provider/AuthProvider";
import { logout } from "@/services/authService";

const NavigationBar = () => {
  const router = useRouter();

  const {user} = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <div className="sticky z-50 top-0 flex justify-between items-center border-b border-gray-200 px-1 md:px-16 lg:px-28 py-3 bg-background">
        <div className="logo">
          <h1 className="text-3xl text-primary font-bold">PTC</h1>
        </div>
        <div className="nav_menu">
          <NavigationMenuComp />
        </div>
        <div className="user_profile flex gap-2 items-center">
          {!user && (
            <Button onClick={() => router.push("/signup")}>Signup</Button>
          )}
          {!user && (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  className="rounded-full border-2 border-secondary cursor-pointer"
                  src={avatar}
                  width={40}
                  height={40}
                  alt="profile picture"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/change-password")}
                >
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
