"use client";

import { useTheme } from "@/provider/theme";
import { cn } from "@/lib/utils";

const Main = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { theme } = useTheme();

  return (
    <main
      className={cn("", theme === "light" ? "chats" : "chat-dark", className)}
    >
      {children}
    </main>
  );
};

export default Main;
