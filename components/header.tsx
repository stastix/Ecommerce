"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Moon,
  Sun,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { navItems } from "@/data/items";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const { toggleCart, cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    setMounted(true); // Ensures this effect runs only after mount
  }, []);

  const cartItemsCount = Array.isArray(cart) ? cart.length : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-black"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/logo.svg"
                  alt="Museal Padel Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xl md:text-2xl font-bold tracking-tight">
                Museal.<span className="text-[#c2152a]">Padel</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Blog</DropdownMenuItem>
                <DropdownMenuItem>FAQ</DropdownMenuItem>
                <DropdownMenuItem>Shipping</DropdownMenuItem>
                <DropdownMenuItem>Returns</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {mounted ? (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="rounded-full relative"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-[#c2152a] text-white text-xs"
                  variant="destructive"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full p-0"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700 hover:border-[#c2152a] transition-colors">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@user"
                    />
                    <AvatarFallback className="bg-[#c2152a] text-white">
                      MP
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.path
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
                  <p className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    More
                  </p>
                  <Link
                    href="/blog"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
