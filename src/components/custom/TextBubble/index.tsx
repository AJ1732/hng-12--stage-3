import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLanguageName } from "@/utils/get-lang-name";
import { formatTime } from "@/utils/format-time";
import { cn } from "@/lib/utils";

interface TextBubbleProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  timestamp?: number;
  detectedLanguage?: string;
}

const TextBubble: React.FC<TextBubbleProps> = ({
  children,
  direction = "right",
  timestamp,
  detectedLanguage,
}) => {
  const right = direction === "right";

  return (
    <article
      className={cn(
        "relative flex w-fit max-w-[33.5rem] items-start justify-start gap-4",
        right && "ml-auto flex-row-reverse",
      )}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>T</AvatarFallback>
      </Avatar>

      <p
        className={cn(
          "flex flex-col gap-1 rounded-2xl border bg-white p-3 dark:bg-zinc-900",
          right &&
            "border-accent bg-primary-200 pr-3 text-white dark:bg-primary-200",
        )}
      >
        {children}

        {/* Chat Timestamp */}
        <span
          className={cn(
            "ml-auto flex items-center gap-2 pr-1.5 text-xs font-medium text-foreground-op dark:text-zinc-400/80",
            right && "text-accent/80 dark:text-zinc-50/60",
          )}
        >
          {formatTime(timestamp)}{" "}
          <span
            className={cn(
              "inline-block size-1.5 rounded-full bg-foreground-op",
              right && "bg-accent/70 dark:bg-zinc-50/60",
            )}
          ></span>
        </span>
      </p>

      {/* Display the detected language */}
      {detectedLanguage && (
        <p
          className={cn(
            "absolute top-full mt-1 text-sm lowercase text-gray-500 dark:text-gray-400",
            right ? "right-16" : "left-16",
          )}
        >
          {getLanguageName(detectedLanguage)}
        </p>
      )}
    </article>
  );
};

export default TextBubble;
