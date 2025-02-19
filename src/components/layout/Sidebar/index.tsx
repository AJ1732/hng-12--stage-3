"use client";
import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/provider/sidebar";
import { useIsMobile } from "@/hooks/use-ismobile";
import { cn } from "@/lib/utils";
// import { SidebarItem } from "./components";

// const ITEMS = [
//   { id: 1, label: "Dashboard", icon: "D" },
//   { id: 2, label: "Settings", icon: "S" },
//   { id: 3, label: "Profile", icon: "P" },
// ];

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle focus trap on mobile screens
  useEffect(() => {
    if (!isMobile) return;

    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    if (!isOpen) {
      sidebar.setAttribute("inert", "");
    } else {
      sidebar.removeAttribute("inert");
    }
  }, [isOpen, isMobile]);

  const SIDEBAR_VARIANTS = {
    open: {
      x: 0,
      width: "20rem",
      transition: {
        x: { duration: 0.5, ease: "easeInOut" },
        width: { delay: isMobile ? 0.3 : 0, duration: 0.5, ease: "easeInOut" },
      },
    },
    closed: {
      x: isMobile ? "-100%" : 0,
      width: isMobile ? "0rem" : "5rem",
      transition: {
        x: { duration: 0.5, ease: "easeInOut" },
        width: { duration: 0.5, ease: "easeInOut" },
      },
    },
  };

  return (
    <motion.aside
      className={cn(
        "z-40 h-svh min-w-20 space-y-8 border-r bg-white p-4 max-md:absolute md:z-50 md:space-y-4",
        !isOpen && isMobile && "pointer-events-none",
      )}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={SIDEBAR_VARIANTS}
      role="navigation"
      aria-label="Main navigation"
      tabIndex={-1}
    >
      <header>
        <Button
          size={"icon"}
          variant={"default"}
          onClick={toggleSidebar}
          className="aspect-square min-w-12 shadow-sm"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isOpen}
        >
          G
        </Button>
      </header>

      <menu
        className={cn(
          "flex flex-col items-start justify-start gap-2 px-2",
          isOpen && "md:items-start",
        )}
        role="menu"
      >
        {/* {ITEMS.map((item) => (
          <li key={item.id} className="w-full">
            <SidebarItem icon={item.icon} label={item.label} />
          </li>
        ))} */}
        <AnimatePresence>
          {isOpen && (
            <motion.li
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: "auto",
                transition: { duration: 0.3, delay: 0.5 },
              }}
              exit={{
                opacity: 0,
                width: 0,
                transition: { duration: 0.3 },
              }}
              className={cn("overflow-hidden whitespace-nowrap")}
            >
              Chat history coming soon...
            </motion.li>
          )}
        </AnimatePresence>
      </menu>
    </motion.aside>
  );
};

export default Sidebar;
