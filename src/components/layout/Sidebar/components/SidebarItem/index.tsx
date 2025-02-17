"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-ismobile";
import { useSidebar } from "@/provider/sidebar";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ icon, label }: SidebarItemProps) => {
  const { isOpen } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "flex aspect-square min-w-8 items-center justify-center rounded-md bg-zinc-100",
        )}
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
            className="overflow-hidden whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarItem;
