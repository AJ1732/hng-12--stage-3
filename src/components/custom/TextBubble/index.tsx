import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TextBubbleProps {
  children: React.ReactNode;
  direction?: "left" | "right";
}

const TextBubble: React.FC<TextBubbleProps> = ({
  children,
  direction = "right",
}) => {
  const right = direction === "right";

  return (
    <article
      className={cn(
        "flex max-w-[33.5rem] items-start justify-start gap-4",
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
          right && "border-accent bg-primary-200 pl-5 pr-2 text-white",
        )}
      >
        {children}
        <span
          className={cn(
            "ml-auto flex items-center gap-2 pr-2 text-xs font-medium text-foreground-op",
            right && "text-accent/50",
          )}
        >
          1:25{" "}
          <span
            className={cn(
              "inline-block size-1.5 rounded-full bg-foreground-op",
              right && "bg-accent/50",
            )}
          ></span>
        </span>
      </p>
    </article>
  );
};

export default TextBubble;
