"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

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
import { useLanguageDetection } from "@/hooks/use-language-detection";
import { useTranslation } from "@/hooks/use-translation";
import { toast } from "@/hooks/use-toast";
import { languages } from "@/constants/lang";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  chat: z
    .string()
    .min(2, { message: "Chat must be at least 2 characters." })
    .max(150, {
      message:
        "Chat must not be longer than 150 characters. Please Summarize ✨",
    }),
  language: z.string().optional(),
});

const getAIResponse = async (userMessage: string): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`${userMessage}`), 1000),
  );
};

function ChatBox() {
  const [summarize, setSummarize] = useState(false);

  const { dispatch } = useChat();
  const { detectLanguage, error: detectionError } = useLanguageDetection();
  const { translateText, error: translationError } = useTranslation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chat: "",
      language: "en",
    },
  });

  const {
    watch,
    formState: { errors, isDirty },
  } = form;
  const chatValue = watch("chat");
  const tooLong = chatValue.length > 150;

  // TO HIGHLIGHT THE SUMMARIZE BUTTON
  useEffect(() => {
    if (isDirty && tooLong) {
      setSummarize(true);
    }
  }, [tooLong, isDirty]);

  // TO TRIGGER TOAST TO SUMMARIZE
  // useEffect(() => {
  //   if (errors.chat) {
  //     toast({
  //       title: "Validation Error",
  //       description: errors.chat.message,
  //       variant: "destructive",
  //     });
  //   }
  // }, [errors.chat]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const sourceLanguage = await detectLanguage(data.chat);

    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: data.chat,
      sender: "user",
      timestamp: Date.now(),
      detectedLanguage: sourceLanguage || undefined,
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    // RESET THE FORM AFTER SUBMISSION
    form.reset({
      chat: "",
      language: data.language,
    });
    // SET SUMMARIZE TO FALSE
    setSummarize(false);

    // PLACEHOLDER TEXT FOR CHAT LOADING IN TEX BUBBLE
    const placeholderAiMessage: ChatMessage = {
      id: uuidv4(),
      text: "",
      sender: "ai",
      timestamp: Date.now(),
      loading: true,
    };
    dispatch({ type: "ADD_MESSAGE", payload: placeholderAiMessage });

    try {
      // SOURCE LANGUAGE
      if (!sourceLanguage) return;

      // AWAIT AI RESPONSE
      const aiReplyText = await getAIResponse(data.chat);
      // console.log(sourceLanguage);

      // TRANSLATE THE AI RESPONSE if the selected language is valid and not the source text language
      if (data.language && data.language !== sourceLanguage) {
        const translatedText = await translateText(
          aiReplyText,
          sourceLanguage,
          data.language,
        );
        // console.log(translatedText);

        if (translatedText) {
          dispatch({
            type: "UPDATE_MESSAGE",
            payload: {
              id: placeholderAiMessage.id,
              text: translatedText,
              detectedLanguage: data.language,
            },
          });
          return;
        }
      }

      // IF NO TRANSLATION NEEDED...
      dispatch({
        type: "UPDATE_MESSAGE",
        payload: {
          id: placeholderAiMessage.id,
          text: aiReplyText,
          detectedLanguage: sourceLanguage,
        },
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: "Translation Error",
        description:
          translationError || detectionError || "Failed to translate message",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full rounded-3xl border border-t-0 border-border bg-white shadow-custom"
      >
        {/* CHAT BOX */}
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

              {/* ANIMATE ERROR MESSAGE */}
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
          {/* SUMMARIZE BUTTON */}
          <Button
            type="button"
            disabled={!tooLong}
            onClick={() => setSummarize(true)}
            className={cn(
              "w-fit justify-self-end bg-gradient-to-r from-purple-500 via-primary-100 to-primary-300 font-bold transition-all duration-300",
              summarize ? "text-white" : "bg-clip-text text-transparent",
              tooLong && "animate-gradient",
            )}
          >
            Summarize ✨
          </Button>

          {/* TRANSLATION LANGUAGE OPTIONS */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0 max-md:col-start-1 max-md:row-start-1 md:ml-auto md:mr-6">
                <FormLabel>Select</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
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

          {/* SUBMIT */}
          <Button type="submit" className="max-md:col-span-2">
            Translate <SendHorizontal />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ChatBox;
