"use client";

import { UserButton } from "@clerk/nextjs"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const DashboardNavbar = () => {

  const pathname = usePathname();

  const routes = [
    {
      name: "Home",
      href: "/dashboard",
      current: pathname === "/dashboard",
    },
    {
      name: "Metadata",
      href: "/metadata",
      current: pathname === "/metadata",
    },
  ]

  return (
    <div className="flex justify-between">
      <div><NavigationMenu>
  <NavigationMenuList>
        {routes.map((route) => (
          <NavigationMenuItem key={route.name}>
          <Link href={route.href} legacyBehavior passHref>
            <NavigationMenuLink className={cn("text-zinc-400 hover:text-slate-900", route.current ? "text-green-600" : "text-slate-600" )}>
            {route.name}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        ))}
  </NavigationMenuList>
</NavigationMenu>
</div>
      <div><UserButton afterSignOutUrl="/" /></div>
    </div>
  )
}

export default DashboardNavbar