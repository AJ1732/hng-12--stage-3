"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

const FormSchema = z.object({
  chat: z
    .string()
    .min(10, {
      message: "Chat must be at least 10 characters.",
    })
    .max(160, {
      message: "Chat must not be longer than 30 characters.",
    }),
});

function ChatBox() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-3xl border border-t-0 border-border bg-white shadow-custom"
      >
        <FormField
          control={form.control}
          name="chat"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-0">
              <FormControl className="">
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <AnimatePresence mode="wait">
                {fieldState.error && (
                  <motion.div
                    key={fieldState.error.message}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormMessage className="px-6 pt-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end p-4">
          <Button type="submit">
            Send
            <SendHorizontal />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChatBox;
