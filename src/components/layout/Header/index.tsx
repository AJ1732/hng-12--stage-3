"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/provider/sidebar";
import { useRef } from "react";

const Header = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    <header className="fixed z-50 flex w-full items-center gap-6 border-b bg-background px-4 py-3.5 transition-all duration-500 ease-in-out md:z-40 md:py-5">
      <Button
        ref={buttonRef}
        size={"icon"}
        onClick={handleToggle}
        className="aspect-square min-w-12 shadow-sm md:hidden"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
      >
        G
      </Button>

      <div>Header</div>
    </header>
  );
};

export default Header;
