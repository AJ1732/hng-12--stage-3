"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { useChat, ChatMessage } from "@/provider/chat";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  chat: z
    .string()
    .min(2, { message: "Chat must be at least 2 characters." })
    .max(160, { message: "Chat must not be longer than 160 characters." }),
  language: z.string().optional(),
});

const getAIResponse = async (userMessage: string): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`AI reply to: ${userMessage}`), 5000),
  );
};

function ChatBox() {
  const [summarize, setSummarize] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { dispatch } = useChat();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.language);
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: data.chat,
      sender: "user",
      timestamp: Date.now(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    toast({
      title: "Message Sent",
      description: `User: ${data.chat}`,
    });

    form.reset({ chat: "" });

    const placeholderAiMessage: ChatMessage = {
      id: uuidv4(),
      text: "",
      sender: "ai",
      timestamp: Date.now(),
      loading: true,
    };
    dispatch({ type: "ADD_MESSAGE", payload: placeholderAiMessage });

    const aiReplyText = await getAIResponse(data.chat);

    dispatch({
      type: "UPDATE_MESSAGE",
      payload: { id: placeholderAiMessage.id, text: aiReplyText },
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
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                  onKeyDown={(e) => {
                    const isLargeScreen = window.innerWidth >= 640;

                    if (isLargeScreen && e.key === "Enter" && !e.shiftKey) {
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
                    <FormMessage className="px-6 pt-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormItem>
          )}
        />

        <div className="flex w-full justify-between px-4 py-3">
          {/* <div className="flex gap-6"> */}
            <Button
              type="button"
              onClick={() => setSummarize((prev) => !prev)}
              className={cn(
                "bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 font-bold transition-all duration-300",
                summarize ? "text-white" : "bg-clip-text text-transparent",
              )}
            >
              Summarize
            </Button>

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex ml-auto pr-6 items-center justify-center gap-4 space-y-0">
                  <FormLabel>Select</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="English (en)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English (en)</SelectItem>
                      <SelectItem value="fr">French (fr)</SelectItem>
                      <SelectItem value="es">Spanish (es)</SelectItem>
                      <SelectItem value="pt">Portuguese (pt)</SelectItem>
                      <SelectItem value="ru">Russian (ru)</SelectItem>
                      <SelectItem value="tr">Turkish (tr)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          {/* </div> */}

          <Button type="submit">
            Translate <SendHorizontal />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChatBox;
