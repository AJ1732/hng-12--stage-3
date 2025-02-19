"use client";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/provider/sidebar";
import { useTheme } from "@/provider/theme";

const Header = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  const pathname = usePathname();
  console.log(pathname);

  const home = pathname === "/";

  const handleToggle = () => {
    toggleSidebar();

    // FOCUS THE FIRST MENU WHEN OPENING
    if (!isOpen) {
      setTimeout(() => {
        const firstMenuItem = document.querySelector(
          '[role="menuitem"]',
        ) as HTMLElement;
        if (firstMenuItem) firstMenuItem.focus();
      }, 100);
    }
  };

  return (
    <header className="fixed z-50 flex w-full items-center gap-4 border-b bg-background px-4 py-3 transition-all duration-500 ease-in-out md:z-40 md:w-[calc(100%-5rem)] md:py-4">
      <Button
        ref={buttonRef}
        size={"icon"}
        onClick={handleToggle}
        className="aspect-square min-w-12 shadow-sm md:hidden"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
      >
        T
      </Button>

      <div className="flex w-full items-center justify-between gap-4">
        <h1>
          <Link href={"/"}>TPI</Link>
        </h1>

        <nav>
          <ul>
            <li className="group text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:text-primary-200 [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:gap-2">
              <Link href={home ? "/about" : "/"}>
                {home ? "About" : "Home"}{" "}
                <span className="inline-block size-2 animate-pulse rounded-full bg-primary-300 group-hover:bg-foreground" />
              </Link>
            </li>
          </ul>
        </nav>

        <Button
          onClick={toggleTheme}
          variant={"ghost"}
          className="size-10 border p-0 text-sm"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
