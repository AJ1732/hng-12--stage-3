"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/provider/sidebar";

const Header = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  console.log(isOpen);

  return (
    <header className="fixed z-50 flex w-full items-center gap-6 border-b bg-background px-4 py-3.5 transition-all duration-500 ease-in-out md:z-40 md:py-5">
      <Button
        size={"icon"}
        variant={"default"}
        onClick={toggleSidebar}
        className="aspect-square min-w-12 shadow-sm md:hidden"
      >
        G
      </Button>

      <div>Header</div>
    </header>
  );
};

export default Header;
