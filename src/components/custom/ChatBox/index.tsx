"use client";

import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { SendHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useTranslateFlow } from "@/hooks/use-translation-flow";
import { useSummarizeFlow } from "@/hooks/use-summarizer-flow";

import { type FormData, FormSchema } from "@/schema/chatbox";
import { languages } from "@/constants/lang";
import { cn } from "@/lib/utils";

function ChatBox() {
  // To hold the desired action ("translate" or "summarize")
  const actionRef = useRef<"translate" | "summarize">("translate");

  const { handleTranslateFlow } = useTranslateFlow();
  const { handleSummarizeFlow } = useSummarizeFlow();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { chat: "", language: "en" },
  });
  const {
    watch,
    formState: { isSubmitting },
  } = form;
  const chatValue = watch("chat");
  const tooLong = chatValue.length > 150;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Reset the form.
    form.reset({ chat: "", language: data.language });

    if (actionRef.current === "translate") {
      // TRANSLATION FLOW:
      await handleTranslateFlow(data);
    } else if (actionRef.current === "summarize") {
      // SUMMARIZATION FLOW:
      await handleSummarizeFlow(data);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-3xl border border-t-0 border-border bg-white shadow-custom"
      >
        {/* Chat Box */}
        <FormField
          control={form.control}
          name="chat"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                  onKeyDown={(e) => {
                    if (
                      window.innerWidth >= 640 &&
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                />
              </FormControl>

              <AnimatePresence mode="wait">
                {form.formState.isSubmitted && fieldState.error && (
                  <motion.div
                    key={fieldState.error.message}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormMessage className="px-6 pt-3" />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormItem>
          )}
        />

        <div className="grid w-full grid-cols-2 items-center justify-between gap-4 px-4 py-3 md:flex">
          {/* Summarize button */}
          <Button
            type="button"
            disabled={isSubmitting || !tooLong}
            onClick={() => {
              actionRef.current = "summarize";
              form.handleSubmit(onSubmit)();
            }}
            className={cn(
              "w-fit justify-self-end bg-gradient-to-r from-purple-500 via-primary-100 to-primary-300 font-bold transition-all duration-300 max-md:col-start-2 max-md:row-start-1",
              tooLong ? "animate-gradient" : "bg-clip-text text-transparent",
            )}
          >
            Summarize ✨
          </Button>

          {/* Translation language options */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0 md:ml-auto md:mr-6">
                <FormLabel>Select</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="English (en)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent side="top">
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Translate button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="max-md:col-span-2"
            onClick={() => {
              actionRef.current = "translate";
            }}
          >
            Translate
            <SendHorizontal />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChatBox;
