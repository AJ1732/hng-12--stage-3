"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        const error = variant === "destructive";
        return (
          <Toast
            key={id}
            {...props}
            variant={variant}
            className="relative overflow-hidden"
          >
            <div className="grid gap-1">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 w-2",
                  error ? "bg-red-500" : "bg-primary-100",
                )}
              />
              {title && (
                <ToastTitle className="text-base">
                  {title}{" "}
                  <span
                    className={cn(
                      "inline-block size-4 rounded-full bg-primary-300",
                      error ? "bg-red-500" : "bg-primary-300",
                    )}
                  ></span>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
