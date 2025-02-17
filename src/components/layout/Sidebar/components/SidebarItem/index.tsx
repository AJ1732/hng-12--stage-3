"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-ismobile";
import { useSidebar } from "@/provider/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ icon, label }: SidebarItemProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { isOpen } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <Button
      type="button"
      variant={"ghost"}
      className="h-auto w-full justify-start gap-4 rounded-md p-0 py-2 pr-4 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      aria-label={label}
      role="menuitem"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <span
        className={cn(
          "flex aspect-square min-w-8 items-center justify-center rounded-md bg-zinc-100",
          isFocused && "text-primary-300 ring-2 ring-primary-300",
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: 1,
              width: "auto",
              transition: { duration: 0.3, delay: isMobile ? 0.5 : 0 },
            }}
            exit={{
              opacity: 0,
              width: 0,
              transition: { duration: 0.3 },
            }}
            className={cn(
              "overflow-hidden whitespace-nowrap",
              isFocused && "font-semibold text-primary-300",
            )}
            aria-hidden={!isOpen}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default SidebarItem;
