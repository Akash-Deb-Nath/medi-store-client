"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useSessionContext } from "@/contexts/SessionContext";
import Image from "next/image";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  role?: UserRole;
  auth?: {
    login: { title: string; url: string };
    register: { title: string; url: string };
  };
}

// Role-based menus
const defaultMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "Cart", url: "/cart" },
  { title: "Orders", url: "/orders" },
  { title: "Profile", url: "/profile" },
];

const sellerMenu: MenuItem[] = [
  { title: "Dashboard", url: "/seller/dashboard" },
  { title: "Inventory", url: "/seller/medicines" },
  { title: "Orders", url: "/seller/orders" },
];

const adminMenu: MenuItem[] = [
  { title: "Dashboard", url: "/admin" },
  { title: "Users", url: "/admin/users" },
  { title: "Orders", url: "/admin/orders" },
  { title: "Categories", url: "/admin/categories" },
];

function getMenuByRole(role?: UserRole): MenuItem[] {
  switch (role) {
    case UserRole.SELLER:
      return sellerMenu;
    case UserRole.ADMIN:
      return adminMenu;
    default:
      return defaultMenu;
  }
}

const Navbar = ({
  role = UserRole.CUSTOMER, // 👈 default role
  auth = {
    login: { title: "Login", url: "/login" },
    register: { title: "Register", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const user = useSessionContext();
  role = user?.role as UserRole || role;
  const menu = getMenuByRole(role);

  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-700">
              MediStore
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {user ? (
              <>
                {/* User avatar */}
                {
                  <Image
                    src={user.image||"/ProfilePicture.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                }
                {/* Logout */}
                <Button size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.register.url}>{auth.register.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-700">
              MediStore
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-700">
                      MediStore
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {user ? (
                      <>
                        {
                          <Image
                    src={user.image||"/ProfilePicture.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  }
                        <Button size="sm">
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild size="sm">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={auth.register.url}>{auth.register.title}</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => (
  <NavigationMenuItem key={item.title}>
    <NavigationMenuLink
      asChild
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
    >
      <Link href={item.url}>{item.title}</Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const renderMobileMenuItem = (item: MenuItem) => (
  <Link key={item.title} href={item.url} className="text-md font-semibold">
    {item.title}
  </Link>
);

export { Navbar };