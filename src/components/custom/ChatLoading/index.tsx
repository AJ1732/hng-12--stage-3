"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const dotTransition = {
  duration: 0.6,
  repeat: Infinity,
  ease: "easeInOut",
};

interface ChatLoadingProps {
  user?: boolean;
}

const ChatLoading: React.FC<ChatLoadingProps> = ({ user }) => {
  return (
    <span className="flex max-w-xs items-center space-x-1 rounded-2xl py-2">
      <motion.span
        className={cn(
          "h-2 w-2 rounded-full",
          user ? "bg-zinc-100" : "bg-zinc-500",
        )}
        animate={{ y: [0, -5, 0] }}
        transition={{ ...dotTransition, delay: 0 }}
      />
      <motion.span
        className={cn(
          "h-2 w-2 rounded-full",
          user ? "bg-zinc-300" : "bg-zinc-700",
        )}
        animate={{ y: [0, -5, 0] }}
        transition={{ ...dotTransition, delay: 0.2 }}
      />
      <motion.span
        className={cn(
          "h-2 w-2 rounded-full",
          user ? "bg-white" : "bg-foreground",
        )}
        animate={{ y: [0, -5, 0] }}
        transition={{ ...dotTransition, delay: 0.4 }}
      />
    </span>
  );
};

export default ChatLoading;
