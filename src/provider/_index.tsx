import { SidebarProvider } from "./sidebar";
import { ThemeProvider } from "./theme";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
};

