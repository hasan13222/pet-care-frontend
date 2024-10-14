"use client";
import React, { useEffect, useState } from "react";
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
import { useCheckLoginQuery, useLazyLogoutQuery } from "@/redux/api/authApi";
import { title } from "process";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { useGetProfileQuery } from "@/redux/api/userApi";

const NavigationBar = () => {
  const router = useRouter();

  const { data: userData, refetch } = useCheckLoginQuery(undefined);
  const [logout] = useLazyLogoutQuery(userData);

  const handleLogout = async () => {
    const loggedOut = await logout(userData?.data.token);
    if (loggedOut.data) {
      refetch();
      router.push("/login");
      toast({ title: "You are logged out" });
    }
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
          {!userData?.data && (
            <Button onClick={() => router.push("/signup")}>Signup</Button>
          )}
          {!userData?.data && (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
          {userData?.data && (
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
