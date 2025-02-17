import * as React from "react";

import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <div className="relative rounded-3xl">
      <Paperclip className="absolute left-4 top-4 size-6 text-icon-fade" />
      <textarea
        className={cn(
          "flex min-h-[9rem] w-full rounded-3xl border border-border bg-white p-4 pl-12 text-base shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
