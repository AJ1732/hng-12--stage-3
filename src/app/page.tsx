"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  return (
    <div className="content-grid space-y-8 py-8">
      <h1>Hello, World!</h1>

      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
            variant: "destructive"
          });
        }}
      >
        Hello
      </Button>
    </div>
  );
}
