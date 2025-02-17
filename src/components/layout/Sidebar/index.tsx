"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/provider/sidebar";
import { useIsMobile } from "@/hooks/use-ismobile";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./components";

const ITEMS = [
  { id: 1, label: "Dashboard", icon: "D" },
  { id: 2, label: "Settings", icon: "S" },
  { id: 3, label: "Profile", icon: "P" },
];

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

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
      )}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={SIDEBAR_VARIANTS}
    >
      <header>
        <Button
          size={"icon"}
          variant={"default"}
          onClick={toggleSidebar}
          className="aspect-square min-w-12 shadow-sm"
        >
          G
        </Button>
      </header>

      <menu
        className={cn(
          "flex flex-col items-start justify-start gap-6 px-2",
          isOpen && "md:items-start",
        )}
      >
        {/* {[1, 2, 3].map((item) => (
          <li
            key={item}
            className={cn(
              "flex aspect-square min-w-8 items-center justify-center rounded-md bg-zinc-100",
            )}
          >
            {item}
          </li>
        ))} */}
        {ITEMS.map((item) => (
          <li key={item.id}>
            <SidebarItem icon={item.icon} label={item.label} />
          </li>
        ))}
      </menu>
    </motion.aside>
  );
};

export default Sidebar;
