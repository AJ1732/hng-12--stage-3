import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TextBubbleProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  timestamp?: number;
}

const TextBubble: React.FC<TextBubbleProps> = ({
  children,
  direction = "right",
  timestamp,
}) => {
  const right = direction === "right";

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <article
      className={cn(
        "relative flex w-fit max-w-[33.5rem] items-start justify-start gap-4",
        right && "ml-auto flex-row-reverse",
      )}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>SL</AvatarFallback>
      </Avatar>

      <p
        className={cn(
          "flex flex-col gap-1 rounded-2xl border bg-white p-3",
          right && "border-accent bg-primary-200 pr-3.5 text-white",
        )}
      >
        {children}
        <span
          className={cn(
            "ml-auto flex items-center gap-2 pr-2 text-xs font-medium text-foreground-op",
            right && "text-accent/50",
          )}
        >
          {formatTime(timestamp)}{" "}
          <span
            className={cn(
              "inline-block size-1.5 rounded-full bg-foreground-op",
              right && "bg-accent/50",
            )}
          ></span>
        </span>
      </p>

      <p
        className={cn(
          "absolute top-full text-sm",
          right ? "left-4" : "right-4",
        )}
      >
        es
      </p>
    </article>
  );
};

export default TextBubble;
