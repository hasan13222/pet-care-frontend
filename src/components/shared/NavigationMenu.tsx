"use client";
import { IoHomeOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { FiUsers } from "react-icons/fi";
import * as React from "react";
import Link from "next/link";
import { FaWpexplorer } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

export function NavigationMenuComp() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2 sm:gap-5">
        <NavigationMenuItem className="hover:opacity-60 hidden sm:block">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink style={{ background: pathname === "/" ? '#5e88b9' : "#ebf0f5", color: pathname === "/" ? "white": "black", padding: "8px 12px", height: "auto" }} className={navigationMenuTriggerStyle()}>
              <IoHomeOutline size={15} />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:opacity-60">
          <Link href="/explore" legacyBehavior passHref>
            <NavigationMenuLink style={{ background: pathname === "/explore" ? '#5e88b9' : "#ebf0f5", color: pathname === "/explore" ? "white": "black", padding: "8px 12px", height: "auto" }} className={navigationMenuTriggerStyle()}>
              <FaWpexplorer size={15} />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:opacity-60">
          <Link href="/followers" legacyBehavior passHref>
            <NavigationMenuLink style={{ background: pathname === "/followers" ? '#5e88b9' : "#ebf0f5", color: pathname === "/followers" ? "white": "black", padding: "8px 12px", height: "auto" }} className={navigationMenuTriggerStyle()}>
              <FiUsers size={15} />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hover:opacity-60">
          <Link href="/following" legacyBehavior passHref>
            <NavigationMenuLink style={{ background: pathname === "/following" ? '#5e88b9' : "#ebf0f5", color: pathname === "/following" ? "white": "black", padding: "8px 12px", height: "auto" }} className={navigationMenuTriggerStyle()}>
              <SlUserFollowing size={15} />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
