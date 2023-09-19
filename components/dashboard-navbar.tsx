"use client";

import { UserButton } from "@clerk/nextjs";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DashboardNavbar = () => {
  const pathname = usePathname();

  const routes = [
    // {
    //   name: "Home",
    //   href: "/dashboard",
    //   current: pathname === "/dashboard",
    // },
    {
      name: "Metadata",
      href: "/metadata",
      current: pathname === "/metadata",
    },
    {
      name: "Outline",
      href: "/outline",
      current: pathname === "/outline",
    },
  ];

  return (
    <div className="flex justify-center my-8">
      <div className="flex w-full justify-between max-w-screen-xl">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.name}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        " hover:text-purple-lightestPurple mr-3",
                        route.current
                          ? "text-white hover:text-white cursor-default"
                          : "text-purple-lightPurple"
                      )}>
                      {route.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
